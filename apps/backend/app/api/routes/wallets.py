from fastapi import APIRouter, Depends
from app.core.database import get_db
from app.schemas.wallets import DepositRequest, DepositSuccessResponse
from app.core.security import get_current_user
from sqlalchemy.orm import Session
from app.services.wallets_service import create_deposit_in_db

router = APIRouter()

@router.post("/wallet/deposit", response_model=DepositSuccessResponse, status_code=201)
async def create_deposit(
    payload: DepositRequest,
    db: Session = Depends(get_db),
    current_user_id: str = Depends(get_current_user) 
):
 
    wallet = await create_deposit_in_db(payload.amount, current_user_id, db)

    return {
        "status": "success",
        "message": "Balance added successfully",
        "data": wallet
    }