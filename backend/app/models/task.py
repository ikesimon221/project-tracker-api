from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey
from app.database import Base

class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("projects.id"), nullable=False)
    title = Column(String, nullable=False)
    is_done = Column(Boolean, default=False)
    due_date = Column(DateTime(timezone=True))