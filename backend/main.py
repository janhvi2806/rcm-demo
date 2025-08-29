from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For demo, allow all. To be replaced with Vercel URL later.
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from backend.routers import patients, encounters, claims, agents
from backend.database import Base, engine, SessionLocal
from backend.models import Patient, Encounter

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

@app.post("/seed")
def seed_data():
    db = SessionLocal()

    # check if already seeded
    if db.query(Patient).count() > 0:
        return {"message": "Database already seeded ✅"}

    # Patients
    p1 = Patient(name="Fatima", insurance="Daman Insurance")
    p2 = Patient(name="Ahmed", insurance="AXA Gulf")
    db.add_all([p1, p2])
    db.commit()

    # Encounters
    e1 = Encounter(patient_id=p1.id, note="Type 2 diabetes, prescribed Metformin")
    e2 = Encounter(patient_id=p2.id, note="Hypertension, BP 150/90, prescribed Amlodipine")
    db.add_all([e1, e2])
    db.commit()

    return {"message": "✅ Seed data inserted successfully"}