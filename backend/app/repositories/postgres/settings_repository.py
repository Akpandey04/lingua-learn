from typing import Optional
import uuid
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.repositories.postgres.base import PostgresRepository
from app.models.user import UserSettings
from app.schemas.settings import UserSettingsUpdate
from pydantic import BaseModel

class DummyCreate(BaseModel): pass

class SettingsRepository(PostgresRepository[UserSettings, DummyCreate, UserSettingsUpdate]):
    def __init__(self, session: AsyncSession):
        super().__init__(model=UserSettings, session=session)
        
    async def get_by_user_id(self, user_id: uuid.UUID) -> Optional[UserSettings]:
        query = select(UserSettings).where(UserSettings.user_id == user_id)
        result = await self.session.execute(query)
        return result.scalar_one_or_none()
