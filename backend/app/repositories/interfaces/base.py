from typing import Generic, TypeVar, List, Optional
import uuid
from pydantic import BaseModel

ModelType = TypeVar("ModelType")
CreateSchemaType = TypeVar("CreateSchemaType", bound=BaseModel)
UpdateSchemaType = TypeVar("UpdateSchemaType", bound=BaseModel)

class IRepository(Generic[ModelType, CreateSchemaType, UpdateSchemaType]):
    async def get(self, id: uuid.UUID) -> Optional[ModelType]:
        raise NotImplementedError
    
    async def get_multi(self, skip: int = 0, limit: int = 100) -> List[ModelType]:
        raise NotImplementedError
    
    async def create(self, obj_in: CreateSchemaType) -> ModelType:
        raise NotImplementedError
    
    async def update(self, db_obj: ModelType, obj_in: UpdateSchemaType) -> ModelType:
        raise NotImplementedError
    
    async def remove(self, id: uuid.UUID) -> ModelType:
        raise NotImplementedError
