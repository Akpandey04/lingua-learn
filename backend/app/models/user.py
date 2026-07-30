from sqlalchemy import String, Boolean, ForeignKey, Float, Integer
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.models.base import BaseModel
import uuid

class User(BaseModel):
    __tablename__ = "users"
    
    email: Mapped[str] = mapped_column(String, unique=True, index=True, nullable=True) # Nullable for guest users
    hashed_password: Mapped[str] = mapped_column(String, nullable=True)
    is_guest: Mapped[bool] = mapped_column(Boolean, default=False)
    
    settings: Mapped["UserSettings"] = relationship("UserSettings", back_populates="user", uselist=False, cascade="all, delete-orphan")
    sessions: Mapped[list["Session"]] = relationship("Session", back_populates="user", cascade="all, delete-orphan")

class UserSettings(BaseModel):
    __tablename__ = "user_settings"
    
    user_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("users.id"), unique=True, index=True)
    theme: Mapped[str] = mapped_column(String, default="system")
    language_preference: Mapped[str] = mapped_column(String, default="en")
    notifications_enabled: Mapped[bool] = mapped_column(Boolean, default=True)
    daily_goal_xp: Mapped[int] = mapped_column(Integer, default=50)
    learning_reminder: Mapped[bool] = mapped_column(Boolean, default=True)
    audio_speed: Mapped[float] = mapped_column(Float, default=1.0)
    reduced_motion: Mapped[bool] = mapped_column(Boolean, default=False)
    
    user: Mapped["User"] = relationship("User", back_populates="settings")

class Session(BaseModel):
    __tablename__ = "sessions"
    
    user_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("users.id"), index=True)
    refresh_token: Mapped[str] = mapped_column(String, index=True)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    
    user: Mapped["User"] = relationship("User", back_populates="sessions")
