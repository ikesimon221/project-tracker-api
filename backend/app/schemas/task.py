from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class TaskCreate(BaseModel):
    title: str
    due_date: Optional[datetime] = None

class TaskUpdate(BaseModel):
    title: Optional[str] = None
    is_done: Optional[bool] = None
    due_date: Optional[datetime] = None

class TaskOut(BaseModel):
    id: int
    project_id: int
    title: str
    is_done: bool
    due_date: Optional[datetime]

    class Config:
        from_attributes = True