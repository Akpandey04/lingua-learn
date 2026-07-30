from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.schemas.common import ApiResponse
from app.schemas.settings import UserSettingsResponse, UserSettingsUpdate
from app.core.database import get_db
from app.api.dependencies import get_current_user
from app.models.user import User
from app.services.settings_service import SettingsService

router = APIRouter()

def get_settings_service(session: AsyncSession = Depends(get_db)) -> SettingsService:
    return SettingsService(session)

@router.get("/", response_model=ApiResponse[UserSettingsResponse])
async def get_settings(
    current_user: User = Depends(get_current_user),
    settings_service: SettingsService = Depends(get_settings_service)
):
    settings = await settings_service.get_settings(current_user.id)
    return ApiResponse(success=True, data=settings, message="Settings retrieved successfully")

@router.put("/", response_model=ApiResponse[UserSettingsResponse])
async def update_settings(
    settings_in: UserSettingsUpdate,
    current_user: User = Depends(get_current_user),
    settings_service: SettingsService = Depends(get_settings_service)
):
    settings = await settings_service.update_settings(current_user.id, settings_in)
    return ApiResponse(success=True, data=settings, message="Settings updated successfully")
