from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class ProjectCreate(BaseModel):
    name: str
    client: Optional[str] = None
    status: Optional[str] = "in_progress"
    deadline: Optional[datetime] = None

class ProjectUpdate(BaseModel):
    name: Optional[str] = None
    client: Optional[str] = None
    status: Optional[str] = None
    deadline: Optional[datetime] = None

class ProjectOut(BaseModel):
    id: int
    name: str
    client: Optional[str]
    status: str
    deadline: Optional[datetime]
    created_at: datetime

    class Config:
        from_attributes = True