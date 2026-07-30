import uuid
from datetime import datetime, timezone
from typing import List, Dict, Any
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.user import User
from app.schemas.auth import UserResponse
from app.schemas.dashboard import DashboardOverviewResponse
from app.repositories.postgres.progress_repository import ProgressRepository, ReviewRepository, MistakeRepository
from app.repositories.postgres.course_repository import CourseRepository, LanguageRepository
from app.repositories.postgres.settings_repository import SettingsRepository

class DashboardService:
    def __init__(self, session: AsyncSession):
        self.session = session
        self.progress_repo = ProgressRepository(session)
        self.review_repo = ReviewRepository(session)
        self.mistake_repo = MistakeRepository(session)
        self.course_repo = CourseRepository(session)
        self.language_repo = LanguageRepository(session)
        self.settings_repo = SettingsRepository(session)
        
    async def get_user_dashboard(self, user: User) -> DashboardOverviewResponse:
        user_response = UserResponse(id=user.id, email=user.email, is_guest=user.is_guest)
        
        # Aggregate progress
        progress_items = await self.progress_repo.get_all_by_user(user.id)
        completed_lessons_count = len([p for p in progress_items if p.status == "completed"])
        
        # XP Calculation (e.g. 50 XP per completed lesson + scores)
        total_xp = sum([p.score or 50 for p in progress_items if p.status == "completed"])
        
        # Reviews
        due_reviews = await self.review_repo.get_due_for_user(user.id, datetime.now(timezone.utc))
        pending_reviews_count = len(due_reviews)
        
        # Mistakes
        mistakes = await self.mistake_repo.get_by_user(user.id)
        mistake_count = len(mistakes)
        
        # User settings
        settings = await self.settings_repo.get_by_user_id(user.id)
        daily_goal_xp = settings.daily_goal_xp if settings else 50
        
        # Languages & Courses (Default/First active course)
        courses = await self.course_repo.get_multi()
        languages = await self.language_repo.get_multi()
        
        current_language = None
        current_course = None
        if languages:
            current_language = {"id": str(languages[0].id), "code": languages[0].code, "name": languages[0].name}
        if courses:
            current_course = {"id": str(courses[0].id), "level": courses[0].level}
            
        recent_activity = [
            {
                "id": str(p.id),
                "lesson_id": str(p.lesson_id),
                "status": p.status,
                "score": p.score,
                "timestamp": p.updated_at.isoformat() if hasattr(p, "updated_at") and p.updated_at else datetime.now(timezone.utc).isoformat()
            }
            for p in progress_items[:5]
        ]
        
        upcoming_reviews = [
            {
                "id": str(r.id),
                "concept_id": r.concept_id,
                "next_review_date": r.next_review_date.isoformat() if hasattr(r, "next_review_date") and r.next_review_date else datetime.now(timezone.utc).isoformat()
            }
            for r in due_reviews[:5]
        ]

        return DashboardOverviewResponse(
            user=user_response,
            current_language=current_language,
            current_course=current_course,
            current_unit={"id": "unit_1", "title": "Basics & Greetings"},
            current_lesson={"id": "lesson_1", "title": "Common Expressions"},
            overall_progress_percentage=min(100.0, float(completed_lessons_count * 10)),
            completed_lessons=completed_lessons_count,
            completed_exercises=completed_lessons_count * 5,
            completed_quizzes=completed_lessons_count,
            xp=total_xp,
            streak=1 if completed_lessons_count > 0 else 0,
            study_time_minutes=completed_lessons_count * 15,
            pending_reviews_count=pending_reviews_count,
            mistake_count=mistake_count,
            recent_activity=recent_activity,
            today_progress={
                "xp_earned": min(total_xp, daily_goal_xp),
                "daily_goal_xp": daily_goal_xp,
                "completed": total_xp >= daily_goal_xp
            },
            upcoming_reviews=upcoming_reviews
        )
