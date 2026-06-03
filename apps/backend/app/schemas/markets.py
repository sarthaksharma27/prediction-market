from pydantic import BaseModel
from datetime import datetime

class MarketCreate(BaseModel):
    title: str
    description: str
    expires_at: datetime