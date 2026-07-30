from fastapi.testclient import TestClient
from fastapi import HTTPException
import uuid
import pytest
from datetime import datetime

from app.main import app
from app.api.v1.progress import get_progress_service
from app.api.v1.review import get_review_service
from app.api.v1.mistakes import get_mistake_service
from app.api.dependencies import get_current_user
from app.models.user import User
from app.schemas.progress import (
    LessonProgressResponse, ReviewItemResponse, MistakeResponse
)

client = TestClient(app)

mock_uuid = uuid.uuid4()
mock_user_id = uuid.uuid4()
mock_lesson_id = uuid.uuid4()

class MockProgressService:
    async def get_all_by_user(self, user_id: uuid.UUID):
        return [LessonProgressResponse(
            id=mock_uuid, user_id=user_id, lesson_id=mock_lesson_id, status="completed", score=100,
            created_at=datetime.now(), updated_at=datetime.now()
        )]
        
    async def complete_lesson(self, user: User, request):
        return LessonProgressResponse(
            id=mock_uuid, user_id=user.id, lesson_id=request.lesson_id, status="completed", score=request.score,
            created_at=datetime.now(), updated_at=datetime.now()
        )

class MockReviewService:
    async def get_due_reviews(self, user_id: uuid.UUID):
        return [ReviewItemResponse(
            id=mock_uuid, user_id=user_id, concept_id="concept_1", interval=1, ease_factor=2.5,
            next_review_date=datetime.now()
        )]
        
    async def submit_result(self, user_id: uuid.UUID, request):
        if request.concept_id == "not_found":
            raise HTTPException(status_code=404, detail="Review item not found")
        # Simulate spaced repetition
        return ReviewItemResponse(
            id=mock_uuid, user_id=user_id, concept_id=request.concept_id,
            interval=3 if request.is_correct else 1, ease_factor=2.6 if request.is_correct else 2.3,
            next_review_date=datetime.now()
        )

class MockMistakeService:
    async def get_all_by_user(self, user_id: uuid.UUID):
        return [MistakeResponse(
            id=mock_uuid, user_id=user_id, mistake_type="grammar", data={},
            created_at=datetime.now(), updated_at=datetime.now()
        )]

    async def create(self, user_id: uuid.UUID, request):
        return MistakeResponse(
            id=mock_uuid, user_id=user_id, mistake_type=request.mistake_type, data=request.data,
            lesson_id=request.lesson_id, created_at=datetime.now(), updated_at=datetime.now()
        )

    async def update(self, id: uuid.UUID, user_id: uuid.UUID, request):
        if str(id) == str(uuid.UUID(int=0)):
            raise HTTPException(status_code=404, detail="Mistake not found")
        if str(id) == str(uuid.UUID(int=1)):
            raise HTTPException(status_code=403, detail="Not authorized to update this mistake")
        return MistakeResponse(
            id=id, user_id=user_id, mistake_type=request.mistake_type, data=request.data,
            lesson_id=request.lesson_id, created_at=datetime.now(), updated_at=datetime.now()
        )

    async def delete(self, id: uuid.UUID, user_id: uuid.UUID):
        if str(id) == str(uuid.UUID(int=0)):
            raise HTTPException(status_code=404, detail="Mistake not found")

# Overrides
app.dependency_overrides[get_progress_service] = lambda: MockProgressService()
app.dependency_overrides[get_review_service] = lambda: MockReviewService()
app.dependency_overrides[get_mistake_service] = lambda: MockMistakeService()
app.dependency_overrides[get_current_user] = lambda: User(id=mock_user_id, email="test@test.com", is_guest=False)

# --- TESTS ---

def test_get_progress():
    res = client.get("/api/v1/progress")
    assert res.status_code == 200
    assert res.json()["success"] == True

def test_complete_lesson():
    res = client.post("/api/v1/progress/complete", json={"lesson_id": str(mock_lesson_id), "score": 90})
    assert res.status_code == 201
    assert res.json()["data"]["score"] == 90

def test_get_reviews():
    res = client.get("/api/v1/review")
    assert res.status_code == 200

def test_submit_review_correct():
    res = client.post("/api/v1/review/result", json={"concept_id": "concept_1", "is_correct": True})
    assert res.status_code == 200
    assert res.json()["data"]["interval"] == 3

def test_submit_review_incorrect():
    res = client.post("/api/v1/review/result", json={"concept_id": "concept_1", "is_correct": False})
    assert res.status_code == 200
    assert res.json()["data"]["interval"] == 1

def test_submit_review_404():
    res = client.post("/api/v1/review/result", json={"concept_id": "not_found", "is_correct": True})
    assert res.status_code == 404

def test_get_mistakes():
    res = client.get("/api/v1/mistakes")
    assert res.status_code == 200

def test_create_mistake():
    res = client.post("/api/v1/mistakes", json={"mistake_type": "vocab", "data": {"word": "hola"}})
    assert res.status_code == 201

def test_update_mistake():
    res = client.put(f"/api/v1/mistakes/{mock_uuid}", json={"mistake_type": "grammar", "data": {}})
    assert res.status_code == 200

def test_update_mistake_404():
    res = client.put(f"/api/v1/mistakes/{uuid.UUID(int=0)}", json={"mistake_type": "grammar", "data": {}})
    assert res.status_code == 404

def test_update_mistake_403():
    res = client.put(f"/api/v1/mistakes/{uuid.UUID(int=1)}", json={"mistake_type": "grammar", "data": {}})
    assert res.status_code == 403

def test_delete_mistake():
    res = client.delete(f"/api/v1/mistakes/{mock_uuid}")
    assert res.status_code == 200
