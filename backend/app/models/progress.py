from sqlalchemy import String, Integer, ForeignKey, JSON, DateTime
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.models.base import BaseModel
import uuid
from datetime import datetime

class LessonProgress(BaseModel):
    __tablename__ = "lesson_progress"
    
    user_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("users.id"), index=True)
    lesson_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("lessons.id"), index=True)
    status: Mapped[str] = mapped_column(String) # e.g. "completed", "in_progress"
    score: Mapped[int] = mapped_column(Integer, nullable=True)

class ReviewItem(BaseModel):
    __tablename__ = "review_items"
    
    user_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("users.id"), index=True)
    concept_id: Mapped[str] = mapped_column(String, index=True) # Could link to Vocabulary or Exercise ID
    interval: Mapped[int] = mapped_column(Integer, default=1)
    ease_factor: Mapped[float] = mapped_column(default=2.5)
    next_review_date: Mapped[datetime] = mapped_column(DateTime(timezone=True))
    
class Mistake(BaseModel):
    __tablename__ = "mistakes"
    
    user_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("users.id"), index=True)
    lesson_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("lessons.id"), index=True, nullable=True)
    mistake_type: Mapped[str] = mapped_column(String)
    data: Mapped[dict] = mapped_column(JSON)
