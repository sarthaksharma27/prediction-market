from fastapi import APIRouter, Depends
from app.schemas.markets import MarketCreate
from app.core.security import get_current_user

router = APIRouter()

@router.post("/market")
async def create_market(
    market_data: MarketCreate,
    current_user_id: str = Depends(get_current_user)
    ):
    return {"message": "Market created successfully"}