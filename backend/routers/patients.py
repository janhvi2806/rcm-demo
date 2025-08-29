from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from backend.database import SessionLocal
from backend.models import Patient

router = APIRouter(prefix="/patients", tags=["Patients"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/")
def list_patients(db: Session = Depends(get_db)):
    return db.query(Patient).all()

@router.post("/")
def add_patient(name: str, insurance: str, db: Session = Depends(get_db)):
    patient = Patient(name=name, insurance=insurance)
    db.add(patient)
    db.commit()
    db.refresh(patient)
    return patient
