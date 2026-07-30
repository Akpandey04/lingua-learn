from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
import uuid

from app.schemas.common import ApiResponse
from app.schemas.progress import MistakeResponse, MistakeCreate, MistakeUpdate
from app.core.database import get_db
from app.api.dependencies import get_current_user
from app.models.user import User
from app.services.progress_service import MistakeService

router = APIRouter()

def get_mistake_service(session: AsyncSession = Depends(get_db)) -> MistakeService:
    return MistakeService(session)

@router.get("/", response_model=ApiResponse[List[MistakeResponse]])
async def get_mistakes(
    current_user: User = Depends(get_current_user),
    mistake_service: MistakeService = Depends(get_mistake_service)
):
    mistakes = await mistake_service.get_all_by_user(current_user.id)
    return ApiResponse(success=True, data=mistakes, message="Mistakes retrieved")

@router.post("/", response_model=ApiResponse[MistakeResponse], status_code=201)
async def create_mistake(
    request: MistakeCreate,
    current_user: User = Depends(get_current_user),
    mistake_service: MistakeService = Depends(get_mistake_service)
):
    mistake = await mistake_service.create(current_user.id, request)
    return ApiResponse(success=True, data=mistake, message="Mistake created")

@router.put("/{id}", response_model=ApiResponse[MistakeResponse])
async def update_mistake(
    id: uuid.UUID,
    request: MistakeUpdate,
    current_user: User = Depends(get_current_user),
    mistake_service: MistakeService = Depends(get_mistake_service)
):
    mistake = await mistake_service.update(id, current_user.id, request)
    return ApiResponse(success=True, data=mistake, message="Mistake updated")

@router.delete("/{id}", response_model=ApiResponse[dict])
async def delete_mistake(
    id: uuid.UUID,
    current_user: User = Depends(get_current_user),
    mistake_service: MistakeService = Depends(get_mistake_service)
):
    await mistake_service.delete(id, current_user.id)
    return ApiResponse(success=True, data={}, message="Mistake deleted")
