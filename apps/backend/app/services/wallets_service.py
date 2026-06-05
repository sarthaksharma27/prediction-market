from sqlalchemy.orm import Session
from app.db.repositories import wallets_repo


async def create_deposit_in_db(amount: int, user_id: str, db: Session):
    updated_wallet = await wallets_repo.add(amount, user_id, db)
    return updated_wallet