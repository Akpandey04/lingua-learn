from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
import uuid

from app.schemas.common import ApiResponse
from app.schemas.course import LessonResponse, VocabularyResponse, ExerciseResponse, QuizResponse
from app.core.database import get_db
from app.services.course_service import LessonService

router = APIRouter()

def get_lesson_service(session: AsyncSession = Depends(get_db)) -> LessonService:
    return LessonService(session)

@router.get("/{id}", response_model=ApiResponse[LessonResponse])
async def get_lesson(id: uuid.UUID, lesson_service: LessonService = Depends(get_lesson_service)):
    lesson = await lesson_service.get_lesson(id)
    return ApiResponse(success=True, data=lesson, message="Lesson retrieved")

@router.get("/{id}/vocabulary", response_model=ApiResponse[List[VocabularyResponse]])
async def get_vocabulary(id: uuid.UUID, lesson_service: LessonService = Depends(get_lesson_service)):
    vocab = await lesson_service.get_vocabulary(id)
    return ApiResponse(success=True, data=vocab, message="Vocabulary retrieved")

@router.get("/{id}/exercises", response_model=ApiResponse[List[ExerciseResponse]])
async def get_exercises(id: uuid.UUID, lesson_service: LessonService = Depends(get_lesson_service)):
    exercises = await lesson_service.get_exercises(id)
    return ApiResponse(success=True, data=exercises, message="Exercises retrieved")

@router.get("/{id}/quiz", response_model=ApiResponse[List[QuizResponse]])
async def get_quiz(id: uuid.UUID, lesson_service: LessonService = Depends(get_lesson_service)):
    quizzes = await lesson_service.get_quizzes(id)
    return ApiResponse(success=True, data=quizzes, message="Quizzes retrieved")
