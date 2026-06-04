from sqlalchemy.orm import Session
from app.schemas.markets import MarketCreate
from app.db.repositories import market_repo

async def create_market_in_db(data: MarketCreate, user_id: str, db: Session):
    # 1. Business Logic: Pre-processing
    # Example: Ensure title is unique or apply default settings
    
    # 2. Persistence: Delegate to repository
    # This keeps your service from becoming a list of SQL queries
    new_market = await market_repo.create(db, data, user_id)
    
    # 3. Post-processing: e.g., trigger emails/events
    return new_market