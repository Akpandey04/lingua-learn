from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.schemas.common import ApiResponse
from app.schemas.dashboard import DashboardOverviewResponse
from app.core.database import get_db
from app.api.dependencies import get_current_user
from app.models.user import User
from app.services.dashboard_service import DashboardService

router = APIRouter()

def get_dashboard_service(session: AsyncSession = Depends(get_db)) -> DashboardService:
    return DashboardService(session)

@router.get("/", response_model=ApiResponse[DashboardOverviewResponse])
async def get_dashboard(
    current_user: User = Depends(get_current_user),
    dashboard_service: DashboardService = Depends(get_dashboard_service)
):
    dashboard_data = await dashboard_service.get_user_dashboard(current_user)
    return ApiResponse(success=True, data=dashboard_data, message="Dashboard data retrieved")
