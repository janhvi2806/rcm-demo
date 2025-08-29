from database import SessionLocal
from models import Patient, Encounter

db = SessionLocal()

p1 = Patient(name="Fatima", insurance="Daman Insurance")
p2 = Patient(name="Asad", insurance="AXA Gulf")

db.add_all([p1, p2])
db.commit()

e1 = Encounter(patient_id=p1.id, note="Type 2 diabetes, prescribed Metformin")
e2 = Encounter(patient_id=p2.id, note="Hypertension, BP 150/90, prescribed Amlodipine")

db.add_all([e1, e2])
db.commit()

print("✅ Seed data added")
