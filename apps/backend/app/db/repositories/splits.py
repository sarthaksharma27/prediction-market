from app.models.market import MarketModel
from app.models.wallets import WalletModel
from app.models.splits import WalletTransaction
from app.models.positions import Position


def get_market_by_id(db, market_id: str):
    return (
        db.query(MarketModel)
        .filter(MarketModel.id == market_id)
        .first()
    )

def get_wallet_by_user_id(db, user_id):
    return (
        db.query(WalletModel)
        .filter(WalletModel.user_id == user_id)
        .first()
    )

def debit_wallet(
    db,
    user_id: str,
    amount: float
):
    wallet = (
        db.query(WalletModel)
        .filter(WalletModel.user_id == user_id)
        .first()
    )

    wallet.balance -= amount

    return wallet

def create_wallet_transaction(
    db,
    user_id: str,
    amount: float,
    transaction_type: str,
    reference_id: str | None = None,
):
    transaction = WalletTransaction(
        user_id=user_id,
        amount=amount,
        transaction_type=transaction_type,
        reference_id=reference_id,
    )

    db.add(transaction)

    return transaction

def upsert_position(
    db,
    user_id: str,
    market_id: str,
    outcome: bool,
    quantity: float,
):
    position = (
        db.query(Position)
        .filter(
            Position.user_id == user_id,
            Position.market_id == market_id,
            Position.outcome == outcome,
        )
        .first()
    )

    if position:
        position.quantity += quantity
    else:
        position = Position(
            user_id=user_id,
            market_id=market_id,
            outcome=outcome,
            quantity=quantity,
        )

        db.add(position)

    return position