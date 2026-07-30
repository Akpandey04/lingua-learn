from fastapi.testclient import TestClient
import uuid

from app.main import app
from app.api.dependencies import get_current_user
from app.api.v1.dashboard import get_dashboard_service
from app.models.user import User
from app.schemas.auth import UserResponse
from app.schemas.dashboard import DashboardOverviewResponse

client = TestClient(app)

mock_user_id = uuid.uuid4()

class MockDashboardService:
    async def get_user_dashboard(self, user: User):
        return DashboardOverviewResponse(
            user=UserResponse(id=user.id, email=user.email, is_guest=user.is_guest),
            current_language={"id": "lang_fr", "code": "fr", "name": "French"},
            current_course={"id": "course_fr_a1", "level": "A1"},
            current_unit={"id": "unit_1", "title": "Basics & Greetings"},
            current_lesson={"id": "lesson_1", "title": "Common Expressions"},
            overall_progress_percentage=25.0,
            completed_lessons=3,
            completed_exercises=15,
            completed_quizzes=3,
            xp=150,
            streak=3,
            study_time_minutes=45,
            pending_reviews_count=4,
            mistake_count=2,
            recent_activity=[],
            today_progress={"xp_earned": 50, "daily_goal_xp": 50, "completed": True},
            upcoming_reviews=[]
        )

app.dependency_overrides[get_dashboard_service] = lambda: MockDashboardService()
app.dependency_overrides[get_current_user] = lambda: User(id=mock_user_id, email="test@test.com", is_guest=False)

def test_get_dashboard_success():
    res = client.get("/api/v1/dashboard")
    assert res.status_code == 200
    json_data = res.json()
    assert json_data["success"] == True
    assert json_data["data"]["user"]["email"] == "test@test.com"
    assert json_data["data"]["xp"] == 150
    assert json_data["data"]["streak"] == 3
