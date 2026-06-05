from decimal import Decimal
from uuid import UUID
from pydantic import BaseModel, Field, field_validator

class DepositRequest(BaseModel):
    amount: Decimal = Field(gt=0)

    @field_validator("amount")
    @classmethod
    def validate_amount(cls, value: Decimal):
        if value > Decimal("100000"):
            raise ValueError(
                "Maximum deposit is 100000"
            )

        return value
    
class WalletResponse(BaseModel):
    user_id: UUID = Field(..., description="The unique identifier of the wallet owner")
    balance: Decimal = Field(..., description="The exact updated current balance")

    class Config:
        from_attributes = True
    
class DepositSuccessResponse(BaseModel):
    status: str = Field("success", description="The status of the API request")
    message: str = Field("Balance added successfully", description="User-facing success message")
    data: WalletResponse = Field(..., description="The updated wallet information payload")