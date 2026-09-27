from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models.project import Project
from app.models.user import User
from app.schemas.project import ProjectCreate, ProjectUpdate, ProjectOut
from app.utils.auth import get_current_user

router = APIRouter(prefix="/projects", tags=["projects"])

@router.post("/", response_model=ProjectOut)
def create_project(
    project: ProjectCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    new_project = Project(
        user_id=current_user.id,
        name=project.name,
        client=project.client,
        status=project.status,
        deadline=project.deadline
    )
    db.add(new_project)
    db.commit()
    db.refresh(new_project)
    return new_project