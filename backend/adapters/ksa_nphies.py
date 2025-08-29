def generate_json(encounter):
    return {
        "resourceType": "Claim",
        "patient": {"id": encounter.patient_id},
        "note": encounter.note,
        "amount": {"value": 350, "currency": "SAR"}
    }
