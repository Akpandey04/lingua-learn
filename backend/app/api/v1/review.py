from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
import uuid

from app.schemas.common import ApiResponse
from app.schemas.progress import ReviewItemResponse, ReviewResultRequest
from app.core.database import get_db
from app.api.dependencies import get_current_user
from app.models.user import User
from app.services.progress_service import ReviewService

router = APIRouter()

def get_review_service(session: AsyncSession = Depends(get_db)) -> ReviewService:
    return ReviewService(session)

@router.get("/", response_model=ApiResponse[List[ReviewItemResponse]])
async def get_review_items(
    current_user: User = Depends(get_current_user),
    review_service: ReviewService = Depends(get_review_service)
):
    items = await review_service.get_due_reviews(current_user.id)
    return ApiResponse(success=True, data=items, message="Review items retrieved")

@router.post("/result", response_model=ApiResponse[ReviewItemResponse])
async def post_review_result(
    request: ReviewResultRequest,
    current_user: User = Depends(get_current_user),
    review_service: ReviewService = Depends(get_review_service)
):
    item = await review_service.submit_result(current_user.id, request)
    return ApiResponse(success=True, data=item, message="Review result saved")
