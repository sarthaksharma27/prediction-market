from fastapi import FastAPI
from app.api.routes.health import router as health_router
from app.api.routes.markets import router as market_router
from app.api.routes.wallets import router as wallet_router

app = FastAPI()

app.include_router(health_router)
app.include_router(market_router)
app.include_router(wallet_router)