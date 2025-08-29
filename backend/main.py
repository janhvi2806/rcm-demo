from fastapi import FastAPI
from routers import patients, encounters, claims, agents
from database import Base, engine

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="AI-Native RCM Demo")

# Routers
app.include_router(patients.router)
app.include_router(encounters.router)
app.include_router(claims.router)
app.include_router(agents.router)

@app.get("/")
def root():
    return {"message": "RCM Demo Backend is running!"}
