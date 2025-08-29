from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from backend.database import SessionLocal
from backend.models import Encounter

router = APIRouter(prefix="/encounters", tags=["Encounters"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/")
def list_encounters(db: Session = Depends(get_db)):
    return db.query(Encounter).all()

@router.post("/")
def add_encounter(patient_id: int, note: str, db: Session = Depends(get_db)):
    encounter = Encounter(patient_id=patient_id, note=note)
    db.add(encounter)
    db.commit()
    db.refresh(encounter)
    return encounter
