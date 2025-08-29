from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import SessionLocal
from models import Claim, Encounter
from adapters.uae_eclaimlink import generate_xml
from adapters.ksa_nphies import generate_json

router = APIRouter(prefix="/claims", tags=["Claims"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/submit/{encounter_id}")
def submit_claim(encounter_id: int, country: str = "UAE", db: Session = Depends(get_db)):
    encounter = db.query(Encounter).get(encounter_id)
    if not encounter:
        return {"error": "Encounter not found"}

    if country == "UAE":
        payload = generate_xml(encounter)
    else:
        payload = generate_json(encounter)

    claim = Claim(encounter_id=encounter.id, status="submitted", amount=350, payload=str(payload))
    db.add(claim)
    db.commit()
    db.refresh(claim)
    return claim
