from fastapi import APIRouter

router = APIRouter(prefix="/agents", tags=["AI Agents"])

@router.get("/eligibility/{patient_id}")
def check_eligibility(patient_id: int):
    return {"patient_id": patient_id, "eligible": True, "payer": "Daman Insurance"}

@router.get("/coding/{encounter_id}")
def suggest_codes(encounter_id: int):
    return {
        "encounter_id": encounter_id,
        "codes": [
            {"system": "ICD-10", "code": "E11.9", "desc": "Type 2 Diabetes"},
            {"system": "CPT", "code": "99213", "desc": "Office Visit"}
        ]
    }
