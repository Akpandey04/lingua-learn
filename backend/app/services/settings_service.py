import uuid
from sqlalchemy.ext.asyncio import AsyncSession
from app.repositories.postgres.settings_repository import SettingsRepository
from app.models.user import UserSettings
from app.schemas.settings import UserSettingsResponse, UserSettingsUpdate

class SettingsService:
    def __init__(self, session: AsyncSession):
        self.session = session
        self.settings_repo = SettingsRepository(session)
        
    async def get_settings(self, user_id: uuid.UUID) -> UserSettingsResponse:
        settings = await self.settings_repo.get_by_user_id(user_id)
        if not settings:
            settings = UserSettings(user_id=user_id)
            self.session.add(settings)
            await self.session.commit()
            await self.session.refresh(settings)
        return UserSettingsResponse.model_validate(settings)

    async def update_settings(self, user_id: uuid.UUID, settings_in: UserSettingsUpdate) -> UserSettingsResponse:
        settings = await self.settings_repo.get_by_user_id(user_id)
        if not settings:
            settings = UserSettings(user_id=user_id)
            self.session.add(settings)
            await self.session.flush()

        update_data = settings_in.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(settings, field, value)

        self.session.add(settings)
        await self.session.commit()
        await self.session.refresh(settings)
        return UserSettingsResponse.model_validate(settings)
