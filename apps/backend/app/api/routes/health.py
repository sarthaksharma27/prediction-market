from fastapi import APIRouter
from app.services.health_service import check_db

router = APIRouter()

@router.get("/health")
async def health():
    db_status = await check_db()

    return {
        "db_status": db_status
    }