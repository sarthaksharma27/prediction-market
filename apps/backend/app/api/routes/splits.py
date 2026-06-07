from fastapi import APIRouter, Depends
from app.schemas.splits import SplitRequest
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.security import get_current_user
from app.services.splits_service import create_split_in_db

router = APIRouter()

@router.post("/markets/{marketId}/split",status_code=201)
async def split_position(
    marketId: str,
    payload: SplitRequest,
    db: Session = Depends(get_db),
    current_user_id: str = Depends(get_current_user)
):
    
    position = await create_split_in_db(market_id=marketId, amount=payload.amount, user_id=current_user_id, db=db)
    return position