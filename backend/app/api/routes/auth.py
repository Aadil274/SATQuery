from fastapi import APIRouter, HTTPException, Depends, status
from pydantic import BaseModel, EmailStr
from backend.app.core.security import verify_password, get_password_hash, create_access_token

router = APIRouter(prefix="/auth", tags=["auth"])

# In-memory mock accounts for instant SIH judging/evaluator login
USERS_DB = {
    "analyst@isro.gov.in": {
        "email": "analyst@isro.gov.in",
        "name": "ISRO/SAC Remote Sensing Analyst",
        "hashed_password": get_password_hash("isro2026"),
        "role": "analyst"
    },
    "evaluator@sih.gov.in": {
        "email": "evaluator@sih.gov.in",
        "name": "SIH Evaluator / Dept of Space",
        "hashed_password": get_password_hash("sih2026"),
        "role": "admin"
    }
}

class LoginRequest(BaseModel):
    email: str
    password: str

class RegisterRequest(BaseModel):
    email: str
    password: str
    name: str
    role: str = "analyst"

class AuthResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: dict

@router.post("/login", response_model=AuthResponse)
def login(creds: LoginRequest):
    user = USERS_DB.get(creds.email)
    if not user or not verify_password(creds.password, user["hashed_password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials. Hint: use analyst@isro.gov.in / isro2026"
        )
    token = create_access_token({"sub": user["email"], "role": user["role"], "name": user["name"]})
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {"email": user["email"], "name": user["name"], "role": user["role"]}
    }

@router.post("/register", response_model=AuthResponse)
def register(req: RegisterRequest):
    if req.email in USERS_DB:
        raise HTTPException(status_code=400, detail="User already registered")
    USERS_DB[req.email] = {
        "email": req.email,
        "name": req.name,
        "hashed_password": get_password_hash(req.password),
        "role": req.role
    }
    token = create_access_token({"sub": req.email, "role": req.role, "name": req.name})
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {"email": req.email, "name": req.name, "role": req.role}
    }
