from sqlalchemy import (
    Column,
    Numeric,
    ForeignKey,
    UniqueConstraint,
    Text,
    CheckConstraint,
)
from sqlalchemy.dialects.postgresql import UUID
import uuid

from app.core.database_base import Base


class Position(Base):
    __tablename__ = "positions"

    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
    )

    user_id = Column(
        UUID(as_uuid=True),
        nullable=False,
    )

    market_id = Column(
        UUID(as_uuid=True),
        ForeignKey("markets.id"),
        nullable=False,
    )

    outcome = Column(
        Text,
        nullable=False,
    )

    quantity = Column(
        Numeric(20, 2),
        nullable=False,
        default=0,
    )

    __table_args__ = (
        UniqueConstraint(
            "user_id",
            "market_id",
            "outcome",
            name="uq_position_user_market_outcome",
        ),
        CheckConstraint(
            "outcome IN ('YES', 'NO')",
            name="ck_position_outcome",
        ),
    )