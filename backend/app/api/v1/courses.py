from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
import uuid

from app.schemas.common import ApiResponse
from app.schemas.course import CourseResponse, CourseDetailResponse, UnitResponse
from app.core.database import get_db
from app.services.course_service import CourseService

router = APIRouter()

def get_course_service(session: AsyncSession = Depends(get_db)) -> CourseService:
    return CourseService(session)

@router.get("/", response_model=ApiResponse[List[CourseResponse]])
async def list_courses(course_service: CourseService = Depends(get_course_service)):
    courses = await course_service.get_all()
    return ApiResponse(success=True, data=courses, message="Courses retrieved")

@router.get("/{id}", response_model=ApiResponse[CourseDetailResponse])
async def get_course(id: uuid.UUID, course_service: CourseService = Depends(get_course_service)):
    course = await course_service.get_by_id(id)
    return ApiResponse(success=True, data=course, message="Course retrieved")

# Moving unit endpoint to courses router for logical grouping, since units belong to courses
@router.get("/units/{id}", response_model=ApiResponse[UnitResponse])
async def get_unit(id: uuid.UUID, course_service: CourseService = Depends(get_course_service)):
    unit = await course_service.get_unit(id)
    return ApiResponse(success=True, data=unit, message="Unit retrieved")
