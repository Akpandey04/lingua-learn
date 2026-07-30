from typing import List, Optional
import uuid
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, and_

from app.repositories.postgres.base import PostgresRepository
from app.models.progress import LessonProgress, ReviewItem, Mistake
from app.schemas.progress import MistakeCreate, MistakeUpdate
from pydantic import BaseModel

class DummyCreate(BaseModel): pass
class DummyUpdate(BaseModel): pass

class ProgressRepository(PostgresRepository[LessonProgress, DummyCreate, DummyUpdate]):
    def __init__(self, session: AsyncSession):
        super().__init__(model=LessonProgress, session=session)
        
    async def get_by_user_and_lesson(self, user_id: uuid.UUID, lesson_id: uuid.UUID) -> Optional[LessonProgress]:
        query = select(LessonProgress).where(
            and_(LessonProgress.user_id == user_id, LessonProgress.lesson_id == lesson_id)
        )
        result = await self.session.execute(query)
        return result.scalar_one_or_none()

    async def get_all_by_user(self, user_id: uuid.UUID) -> List[LessonProgress]:
        query = select(LessonProgress).where(LessonProgress.user_id == user_id)
        result = await self.session.execute(query)
        return list(result.scalars().all())

class ReviewRepository(PostgresRepository[ReviewItem, DummyCreate, DummyUpdate]):
    def __init__(self, session: AsyncSession):
        super().__init__(model=ReviewItem, session=session)

    async def get_due_for_user(self, user_id: uuid.UUID, current_time) -> List[ReviewItem]:
        query = select(ReviewItem).where(
            and_(ReviewItem.user_id == user_id, ReviewItem.next_review_date <= current_time)
        )
        result = await self.session.execute(query)
        return list(result.scalars().all())

    async def get_by_user_and_concept(self, user_id: uuid.UUID, concept_id: str) -> Optional[ReviewItem]:
        query = select(ReviewItem).where(
            and_(ReviewItem.user_id == user_id, ReviewItem.concept_id == concept_id)
        )
        result = await self.session.execute(query)
        return result.scalar_one_or_none()

class MistakeRepository(PostgresRepository[Mistake, MistakeCreate, MistakeUpdate]):
    def __init__(self, session: AsyncSession):
        super().__init__(model=Mistake, session=session)

    async def get_by_user(self, user_id: uuid.UUID) -> List[Mistake]:
        query = select(Mistake).where(Mistake.user_id == user_id)
        result = await self.session.execute(query)
        return list(result.scalars().all())
