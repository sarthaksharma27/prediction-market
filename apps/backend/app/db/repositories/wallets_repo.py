from sqlalchemy.orm import Session
from app.models.wallets import WalletModel

async def add(amount: int, user_id: str, db: Session):
    wallet = (
        db.query(WalletModel)
        .filter(WalletModel.user_id == user_id)
        .first()
    )

    if wallet:
        wallet.balance += amount
    else:
        wallet = WalletModel(
            user_id=user_id,
            balance=amount
        )
        db.add(wallet)

    db.commit()
    db.refresh(wallet)

    return wallet