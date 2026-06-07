from sqlalchemy.orm import Session
from sqlalchemy.exc import NoResultFound, InvalidRequestError
from app.db.repositories.splits import create_wallet_transaction, debit_wallet, get_market_by_id, get_wallet_by_user_id, upsert_position

async def create_split_in_db(
    market_id: str,
    amount: int,
    user_id: str,
    db: Session
):
    try:
        market = get_market_by_id(db, market_id)

        if not market:
            raise NoResultFound("Market Not Found")

        if market.status != "ACTIVE":
            raise InvalidRequestError("Market is not active")

        wallet = get_wallet_by_user_id(db, user_id)

        if wallet.balance < amount:
            raise InvalidRequestError("Insufficient funds")

        debit_wallet(
            db,
            user_id=user_id,
            amount=amount
        )

        create_wallet_transaction(
            db,
            user_id=user_id,
            amount=amount,
            transaction_type="SPLIT",
            reference_id=market_id,
        )

        yes_position = upsert_position(
            db=db,
            user_id=user_id,
            market_id=market_id,
            outcome="YES",
            quantity=amount,
        )

        no_position = upsert_position(
            db=db,
            user_id=user_id,
            market_id=market_id,
            outcome="NO",
            quantity=amount,
        )

        db.commit()

        db.refresh(yes_position)
        db.refresh(no_position)

        return {
            "market_id": market_id,
            "yes_quantity": float(yes_position.quantity),
            "no_quantity": float(no_position.quantity),
        }

    except Exception:
        db.rollback()
        raise