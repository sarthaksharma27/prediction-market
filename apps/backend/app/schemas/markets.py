from uuid import UUID
from pydantic import BaseModel
from datetime import datetime

class MarketCreate(BaseModel):
    title: str
    description: str
    expires_at: datetime

class MarketResponse(MarketCreate):
    id: UUID
    created_at: datetime
    creator_id: UUID

    class Config:
        from_attributes = True