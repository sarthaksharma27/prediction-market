from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import jwt
from app.config import settings

JWKS_URL = f"{settings.SUPABASE_PROJECT_URL}/auth/v1/.well-known/jwks.json"
EXPECTED_ISSUER = f"{settings.SUPABASE_PROJECT_URL}/auth/v1"

jwks_client = jwt.PyJWKClient(JWKS_URL)

security = HTTPBearer()

def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    try:
        signing_key = jwks_client.get_signing_key_from_jwt(token)
        
        payload = jwt.decode(
            token, 
            signing_key.key, 
            algorithms=["ES256"],
            audience="authenticated",
            issuer=EXPECTED_ISSUER
        )
        
        user_id = payload.get("sub")
        if not user_id:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED, 
                detail="Invalid token: missing sub"
            )
        print(f"Authenticated user ID: {user_id}")
        return user_id 
        
    except jwt.ExpiredSignatureError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, 
            detail="Token expired"
        )
    except jwt.InvalidTokenError as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, 
            detail=f"Invalid token: {str(e)}"
        )