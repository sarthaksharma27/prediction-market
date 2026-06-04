from sqlalchemy.orm import Session
from app.schemas.markets import MarketCreate
from app.models.market import MarketModel

async def create(db: Session, data: MarketCreate, user_id: str):
    
    new_market = MarketModel(
        title=data.title,
        description=data.description,
        expires_at=data.expires_at,
        creator_id=user_id
    )

    db.add(new_market)
    db.commit()
    db.refresh(new_market)

    return new_market