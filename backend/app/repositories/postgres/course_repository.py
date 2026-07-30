from typing import List, Optional
import uuid
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload

from app.repositories.postgres.base import PostgresRepository
from app.models.course import Language, Course, Unit, Lesson, Vocabulary, Exercise, Quiz
from pydantic import BaseModel

# Mock schemas since we only need GET operations for Phase 7B.2
class DummyCreate(BaseModel): pass
class DummyUpdate(BaseModel): pass

class LanguageRepository(PostgresRepository[Language, DummyCreate, DummyUpdate]):
    def __init__(self, session: AsyncSession):
        super().__init__(model=Language, session=session)

class CourseRepository(PostgresRepository[Course, DummyCreate, DummyUpdate]):
    def __init__(self, session: AsyncSession):
        super().__init__(model=Course, session=session)
        
    async def get_with_relations(self, id: uuid.UUID) -> Optional[Course]:
        query = (
            select(Course)
            .options(selectinload(Course.language), selectinload(Course.units))
            .where(Course.id == id)
        )
        result = await self.session.execute(query)
        return result.scalar_one_or_none()

class UnitRepository(PostgresRepository[Unit, DummyCreate, DummyUpdate]):
    def __init__(self, session: AsyncSession):
        super().__init__(model=Unit, session=session)

class LessonRepository(PostgresRepository[Lesson, DummyCreate, DummyUpdate]):
    def __init__(self, session: AsyncSession):
        super().__init__(model=Lesson, session=session)

class VocabularyRepository(PostgresRepository[Vocabulary, DummyCreate, DummyUpdate]):
    def __init__(self, session: AsyncSession):
        super().__init__(model=Vocabulary, session=session)
        
    async def get_by_lesson(self, lesson_id: uuid.UUID) -> List[Vocabulary]:
        query = select(Vocabulary).where(Vocabulary.lesson_id == lesson_id)
        result = await self.session.execute(query)
        return list(result.scalars().all())

class ExerciseRepository(PostgresRepository[Exercise, DummyCreate, DummyUpdate]):
    def __init__(self, session: AsyncSession):
        super().__init__(model=Exercise, session=session)
        
    async def get_by_lesson(self, lesson_id: uuid.UUID) -> List[Exercise]:
        query = select(Exercise).where(Exercise.lesson_id == lesson_id)
        result = await self.session.execute(query)
        return list(result.scalars().all())

class QuizRepository(PostgresRepository[Quiz, DummyCreate, DummyUpdate]):
    def __init__(self, session: AsyncSession):
        super().__init__(model=Quiz, session=session)
        
    async def get_by_lesson(self, lesson_id: uuid.UUID) -> List[Quiz]:
        query = select(Quiz).where(Quiz.lesson_id == lesson_id)
        result = await self.session.execute(query)
        return list(result.scalars().all())
