from typing import List
import uuid
from datetime import datetime, timezone, timedelta
from fastapi import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.repositories.postgres.progress_repository import ProgressRepository, ReviewRepository, MistakeRepository
from app.repositories.postgres.user_repository import UserRepository
from app.schemas.progress import (
    LessonProgressResponse, LessonCompleteRequest,
    ReviewItemResponse, ReviewResultRequest,
    MistakeCreate, MistakeUpdate, MistakeResponse
)
from app.models.progress import LessonProgress, ReviewItem, Mistake
from app.models.user import User

class ReviewSchedulerService:
    def calculate_next_review(self, item: ReviewItem, is_correct: bool) -> ReviewItem:
        if is_correct:
            item.interval = max(1, int(item.interval * item.ease_factor))
            item.ease_factor = min(3.0, item.ease_factor + 0.1)
        else:
            item.interval = 1
            item.ease_factor = max(1.3, item.ease_factor - 0.2)
            
        item.next_review_date = datetime.now(timezone.utc) + timedelta(days=item.interval)
        return item

class ProgressService:
    def __init__(self, session: AsyncSession):
        self.session = session
        self.progress_repo = ProgressRepository(session)
        self.user_repo = UserRepository(session)
        
    async def get_all_by_user(self, user_id: uuid.UUID) -> List[LessonProgressResponse]:
        progress = await self.progress_repo.get_all_by_user(user_id)
        return [LessonProgressResponse.model_validate(p) for p in progress]

    async def complete_lesson(self, user: User, request: LessonCompleteRequest) -> LessonProgressResponse:
        progress = await self.progress_repo.get_by_user_and_lesson(user.id, request.lesson_id)
        
        if progress:
            progress.status = "completed"
            progress.score = max(progress.score or 0, request.score)
            self.session.add(progress)
        else:
            progress = LessonProgress(
                user_id=user.id,
                lesson_id=request.lesson_id,
                status="completed",
                score=request.score
            )
            self.session.add(progress)
            
        await self.session.commit()
        await self.session.refresh(progress)
        
        # Future: Trigger ReviewSchedulerService to enqueue concepts from this lesson
        return LessonProgressResponse.model_validate(progress)

class ReviewService:
    def __init__(self, session: AsyncSession):
        self.session = session
        self.review_repo = ReviewRepository(session)
        self.scheduler = ReviewSchedulerService()
        
    async def get_due_reviews(self, user_id: uuid.UUID) -> List[ReviewItemResponse]:
        items = await self.review_repo.get_due_for_user(user_id, datetime.now(timezone.utc))
        return [ReviewItemResponse.model_validate(i) for i in items]

    async def submit_result(self, user_id: uuid.UUID, request: ReviewResultRequest) -> ReviewItemResponse:
        item = await self.review_repo.get_by_user_and_concept(user_id, request.concept_id)
        if not item:
            raise HTTPException(status_code=404, detail="Review item not found")
            
        item = self.scheduler.calculate_next_review(item, request.is_correct)
        self.session.add(item)
        await self.session.commit()
        await self.session.refresh(item)
        
        return ReviewItemResponse.model_validate(item)

class MistakeService:
    def __init__(self, session: AsyncSession):
        self.session = session
        self.mistake_repo = MistakeRepository(session)
        
    async def get_all_by_user(self, user_id: uuid.UUID) -> List[MistakeResponse]:
        mistakes = await self.mistake_repo.get_by_user(user_id)
        return [MistakeResponse.model_validate(m) for m in mistakes]

    async def create(self, user_id: uuid.UUID, request: MistakeCreate) -> MistakeResponse:
        mistake = Mistake(
            user_id=user_id,
            lesson_id=request.lesson_id,
            mistake_type=request.mistake_type,
            data=request.data
        )
        self.session.add(mistake)
        await self.session.commit()
        await self.session.refresh(mistake)
        return MistakeResponse.model_validate(mistake)

    async def update(self, id: uuid.UUID, user_id: uuid.UUID, request: MistakeUpdate) -> MistakeResponse:
        mistake = await self.mistake_repo.get(id)
        if not mistake:
            raise HTTPException(status_code=404, detail="Mistake not found")
        if mistake.user_id != user_id:
            raise HTTPException(status_code=403, detail="Not authorized to update this mistake")
            
        mistake.lesson_id = request.lesson_id or mistake.lesson_id
        mistake.mistake_type = request.mistake_type or mistake.mistake_type
        mistake.data = request.data or mistake.data
        
        self.session.add(mistake)
        await self.session.commit()
        await self.session.refresh(mistake)
        return MistakeResponse.model_validate(mistake)

    async def delete(self, id: uuid.UUID, user_id: uuid.UUID) -> None:
        mistake = await self.mistake_repo.get(id)
        if not mistake:
            raise HTTPException(status_code=404, detail="Mistake not found")
        if mistake.user_id != user_id:
            raise HTTPException(status_code=403, detail="Not authorized to delete this mistake")
            
        await self.mistake_repo.remove(id)
