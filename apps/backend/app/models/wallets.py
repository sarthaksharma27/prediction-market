from sqlalchemy import Column, DateTime, Numeric, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func

from app.core.database_base import Base


class WalletModel(Base):
    __tablename__ = "wallets"

    user_id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        nullable=False,
    )

    balance = Column(
        Numeric(20, 2),
        nullable=False,
        default=0,
        server_default="0",
    )

    created_at = Column(
        DateTime(timezone=True),
        nullable=False,
        server_default=func.now(),
    )
