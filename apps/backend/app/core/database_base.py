from sqlalchemy.orm import DeclarativeBase

class Base(DeclarativeBase):
    """
    The Base class for all SQLAlchemy models.
    Every model you create must inherit from this.
    """
    pass