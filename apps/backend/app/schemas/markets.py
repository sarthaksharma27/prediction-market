from uuid import UUID
from pydantic import BaseModel, Field
from datetime import datetime

class MarketCreate(BaseModel):
    title: str = Field(..., min_length=5, max_length=100)
    description: str = Field(..., min_length=10, max_length=1000)
    expires_at: datetime

class MarketResponse(MarketCreate):
    id: UUID
    created_at: datetime
    creator_id: UUID

    class Config:
        from_attributes = True