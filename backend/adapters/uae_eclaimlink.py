def generate_xml(encounter):
    return f"<Claim><Patient>{encounter.patient_id}</Patient><Note>{encounter.note}</Note></Claim>"
