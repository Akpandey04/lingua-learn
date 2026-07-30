from pydantic import BaseModel, ConfigDict
from typing import List, Dict, Any, Optional
import uuid
from datetime import datetime

class LessonProgressResponse(BaseModel):
    id: uuid.UUID
    user_id: uuid.UUID
    lesson_id: uuid.UUID
    status: str
    score: Optional[int] = None
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)

class LessonCompleteRequest(BaseModel):
    lesson_id: uuid.UUID
    score: int

class ReviewItemResponse(BaseModel):
    id: uuid.UUID
    user_id: uuid.UUID
    concept_id: str
    interval: int
    ease_factor: float
    next_review_date: datetime

    model_config = ConfigDict(from_attributes=True)

class ReviewResultRequest(BaseModel):
    concept_id: str
    is_correct: bool

class MistakeBase(BaseModel):
    lesson_id: Optional[uuid.UUID] = None
    mistake_type: str
    data: Dict[str, Any]

class MistakeCreate(MistakeBase):
    pass

class MistakeUpdate(MistakeBase):
    pass

class MistakeResponse(MistakeBase):
    id: uuid.UUID
    user_id: uuid.UUID
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)
