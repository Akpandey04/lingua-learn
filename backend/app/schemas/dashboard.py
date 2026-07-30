from pydantic import BaseModel, ConfigDict
from typing import List, Dict, Any, Optional
import uuid
from datetime import datetime
from app.schemas.auth import UserResponse

class DashboardOverviewResponse(BaseModel):
    user: UserResponse
    current_language: Optional[Dict[str, Any]] = None
    current_course: Optional[Dict[str, Any]] = None
    current_unit: Optional[Dict[str, Any]] = None
    current_lesson: Optional[Dict[str, Any]] = None
    overall_progress_percentage: float = 0.0
    completed_lessons: int = 0
    completed_exercises: int = 0
    completed_quizzes: int = 0
    xp: int = 0
    streak: int = 0
    study_time_minutes: int = 0
    pending_reviews_count: int = 0
    mistake_count: int = 0
    recent_activity: List[Dict[str, Any]] = []
    today_progress: Dict[str, Any] = {"xp_earned": 0, "daily_goal_xp": 50, "completed": False}
    upcoming_reviews: List[Dict[str, Any]] = []

    model_config = ConfigDict(from_attributes=True)
