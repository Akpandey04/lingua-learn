from pydantic import BaseModel, ConfigDict, Field
from typing import Optional
import uuid

class UserSettingsResponse(BaseModel):
    id: uuid.UUID
    user_id: uuid.UUID
    theme: str = "system"
    language_preference: str = "en"
    notifications_enabled: bool = True
    daily_goal_xp: int = 50
    learning_reminder: bool = True
    audio_speed: float = 1.0
    reduced_motion: bool = False

    model_config = ConfigDict(from_attributes=True)

class UserSettingsUpdate(BaseModel):
    theme: Optional[str] = Field(None, description="UI theme: light, dark, or system")
    language_preference: Optional[str] = Field(None, description="Preferred UI language code")
    notifications_enabled: Optional[bool] = None
    daily_goal_xp: Optional[int] = Field(None, ge=1, le=1000, description="Daily XP goal")
    learning_reminder: Optional[bool] = None
    audio_speed: Optional[float] = Field(None, ge=0.5, le=2.0)
    reduced_motion: Optional[bool] = None
