from fastapi.testclient import TestClient
import uuid

from app.main import app
from app.api.dependencies import get_current_user
from app.api.v1.settings import get_settings_service
from app.models.user import User
from app.schemas.settings import UserSettingsResponse

client = TestClient(app)

mock_user_id = uuid.uuid4()
mock_settings_id = uuid.uuid4()

class MockSettingsService:
    def __init__(self):
        self.settings = UserSettingsResponse(
            id=mock_settings_id,
            user_id=mock_user_id,
            theme="dark",
            language_preference="fr",
            notifications_enabled=True,
            daily_goal_xp=100,
            learning_reminder=True,
            audio_speed=1.2,
            reduced_motion=False
        )

    async def get_settings(self, user_id: uuid.UUID):
        return self.settings

    async def update_settings(self, user_id: uuid.UUID, settings_in):
        update_dict = settings_in.model_dump(exclude_unset=True)
        for k, v in update_dict.items():
            setattr(self.settings, k, v)
        return self.settings

mock_service = MockSettingsService()
app.dependency_overrides[get_settings_service] = lambda: mock_service
app.dependency_overrides[get_current_user] = lambda: User(id=mock_user_id, email="test@test.com", is_guest=False)

def test_get_settings():
    res = client.get("/api/v1/settings")
    assert res.status_code == 200
    data = res.json()["data"]
    assert data["theme"] == "dark"
    assert data["daily_goal_xp"] == 100

def test_update_settings():
    res = client.put("/api/v1/settings", json={"theme": "light", "daily_goal_xp": 200})
    assert res.status_code == 200
    data = res.json()["data"]
    assert data["theme"] == "light"
    assert data["daily_goal_xp"] == 200
