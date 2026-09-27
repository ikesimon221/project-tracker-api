from fastapi import FastAPI
from app.database import Base, engine
from app.models import user, project, task
from app.routes import auth, projects, tasks

app = FastAPI(title="Project Tracker API")

Base.metadata.create_all(bind=engine)

app.include_router(auth.router)
app.include_router(projects.router)
app.include_router(tasks.router)

@app.get("/")
def root():
    return {"message": "API is running"}