from decimal import Decimal
from pydantic import BaseModel, Field, field_validator

class SplitRequest(BaseModel):
    amount: Decimal = Field(gt=0)

    @field_validator("amount")
    @classmethod
    def validate_amount(cls, value: Decimal):
        if value > Decimal("100000"):
            raise ValueError(
                "Maximum deposit is 100000"
            )

        return value