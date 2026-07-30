from typing import List
import uuid
from fastapi import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.repositories.postgres.course_repository import (
    LanguageRepository, CourseRepository, UnitRepository,
    LessonRepository, VocabularyRepository, ExerciseRepository, QuizRepository
)
from app.schemas.course import (
    LanguageResponse, CourseResponse, CourseDetailResponse,
    UnitResponse, LessonResponse, VocabularyResponse,
    ExerciseResponse, QuizResponse
)

class LanguageService:
    def __init__(self, session: AsyncSession):
        self.repo = LanguageRepository(session)
        
    async def get_all(self) -> List[LanguageResponse]:
        languages = await self.repo.get_multi()
        return [LanguageResponse.model_validate(l) for l in languages]
        
    async def get_by_id(self, id: uuid.UUID) -> LanguageResponse:
        language = await self.repo.get(id)
        if not language:
            raise HTTPException(status_code=404, detail="Language not found")
        return LanguageResponse.model_validate(language)

class CourseService:
    def __init__(self, session: AsyncSession):
        self.course_repo = CourseRepository(session)
        self.unit_repo = UnitRepository(session)
        
    async def get_all(self) -> List[CourseResponse]:
        courses = await self.course_repo.get_multi()
        return [CourseResponse.model_validate(c) for c in courses]
        
    async def get_by_id(self, id: uuid.UUID) -> CourseDetailResponse:
        course = await self.course_repo.get_with_relations(id)
        if not course:
            raise HTTPException(status_code=404, detail="Course not found")
        return CourseDetailResponse.model_validate(course)

    async def get_unit(self, id: uuid.UUID) -> UnitResponse:
        unit = await self.unit_repo.get(id)
        if not unit:
            raise HTTPException(status_code=404, detail="Unit not found")
        return UnitResponse.model_validate(unit)

class LessonService:
    def __init__(self, session: AsyncSession):
        self.lesson_repo = LessonRepository(session)
        self.vocab_repo = VocabularyRepository(session)
        self.exercise_repo = ExerciseRepository(session)
        self.quiz_repo = QuizRepository(session)
        
    async def get_lesson(self, id: uuid.UUID) -> LessonResponse:
        lesson = await self.lesson_repo.get(id)
        if not lesson:
            raise HTTPException(status_code=404, detail="Lesson not found")
        return LessonResponse.model_validate(lesson)

    async def get_vocabulary(self, lesson_id: uuid.UUID) -> List[VocabularyResponse]:
        await self.get_lesson(lesson_id) # ensure lesson exists
        vocab = await self.vocab_repo.get_by_lesson(lesson_id)
        return [VocabularyResponse.model_validate(v) for v in vocab]

    async def get_exercises(self, lesson_id: uuid.UUID) -> List[ExerciseResponse]:
        await self.get_lesson(lesson_id)
        exercises = await self.exercise_repo.get_by_lesson(lesson_id)
        return [ExerciseResponse.model_validate(e) for e in exercises]

    async def get_quizzes(self, lesson_id: uuid.UUID) -> List[QuizResponse]:
        await self.get_lesson(lesson_id)
        quizzes = await self.quiz_repo.get_by_lesson(lesson_id)
        return [QuizResponse.model_validate(q) for q in quizzes]
