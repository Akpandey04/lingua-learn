from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
import uuid

from app.schemas.common import ApiResponse
from app.schemas.progress import LessonProgressResponse, LessonCompleteRequest
from app.core.database import get_db
from app.api.dependencies import get_current_user
from app.models.user import User
from app.services.progress_service import ProgressService

router = APIRouter()

def get_progress_service(session: AsyncSession = Depends(get_db)) -> ProgressService:
    return ProgressService(session)

@router.get("/", response_model=ApiResponse[List[LessonProgressResponse]])
async def get_progress(
    current_user: User = Depends(get_current_user),
    progress_service: ProgressService = Depends(get_progress_service)
):
    progress = await progress_service.get_all_by_user(current_user.id)
    return ApiResponse(success=True, data=progress, message="Progress retrieved")

@router.post("/complete", response_model=ApiResponse[LessonProgressResponse], status_code=201)
async def complete_lesson(
    request: LessonCompleteRequest,
    current_user: User = Depends(get_current_user),
    progress_service: ProgressService = Depends(get_progress_service)
):
    progress = await progress_service.complete_lesson(current_user, request)
    return ApiResponse(success=True, data=progress, message="Lesson completed")
