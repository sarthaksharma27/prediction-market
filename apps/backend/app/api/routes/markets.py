from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.schemas.markets import MarketCreate, MarketResponse
from app.core.security import get_current_user
from app.services.markets_service import create_market_in_db
from app.core.database import get_db

router = APIRouter()

@router.post("/market", response_model=MarketResponse, status_code=201)
async def create_market(
    market_data: MarketCreate,
    db: Session = Depends(get_db),
    current_user_id: str = Depends(get_current_user)
    ):

    new_market = await create_market_in_db(market_data, current_user_id, db)

    return new_market
