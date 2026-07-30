from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
import uuid

from app.schemas.common import ApiResponse
from app.schemas.course import LanguageResponse
from app.core.database import get_db
from app.services.course_service import LanguageService

router = APIRouter()

def get_language_service(session: AsyncSession = Depends(get_db)) -> LanguageService:
    return LanguageService(session)

@router.get("/", response_model=ApiResponse[List[LanguageResponse]])
async def get_languages(language_service: LanguageService = Depends(get_language_service)):
    languages = await language_service.get_all()
    return ApiResponse(success=True, data=languages, message="Languages retrieved")

@router.get("/{id}", response_model=ApiResponse[LanguageResponse])
async def get_language(id: uuid.UUID, language_service: LanguageService = Depends(get_language_service)):
    language = await language_service.get_by_id(id)
    return ApiResponse(success=True, data=language, message="Language retrieved")
