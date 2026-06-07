from sqlalchemy import Column, Text, Numeric, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from sqlalchemy import DateTime
import uuid

from app.core.database_base import Base

class WalletTransaction(Base):
    __tablename__ = "wallet_transactions"

    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4
    )

    user_id = Column(
        UUID(as_uuid=True),
        nullable=False
    )

    amount = Column(
        Numeric(20, 2),
        nullable=False
    )

    transaction_type = Column(
        Text,
        nullable=False
    )

    reference_id = Column(
        UUID(as_uuid=True),
        nullable=True
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False
    )