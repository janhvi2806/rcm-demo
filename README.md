# AI-Native RCM Platform (Demo)

This is a full-stack **AI-native Revenue Cycle Management (RCM) platform** built for the GCC healthcare market.  
It reimagines the traditional RCM workflow by embedding **AI agents** for eligibility checks, coding suggestions, and automated claim submission.

---

## 🌍 What is RCM?
Revenue Cycle Management (RCM) is the process hospitals and clinics use to manage the financial side of patient care.  
It covers everything from checking insurance eligibility → coding → claim submission → denial management → reconciliation.

This project shows how RCM can be automated with AI.

---

## ⚡ Features
- **Patients & Encounters**: Store demo patients and their clinical visits.
- **Claims Management**: Auto-generate claims in XML (UAE) or JSON (KSA).
- **AI Agents**:
  - Eligibility checks
  - Coding suggestions
- **Analytics Dashboard**: Track submitted, approved, and denied claims in real-time.
- **End-to-End Workflow**: From patient intake → encounter → claim → analytics.

---
## 🧾 What is Coding Suggestion?  

In healthcare, doctors write **encounter notes** in free text (e.g., *“Type 2 diabetes, prescribed Metformin”*).  
Before a claim can be submitted to insurance, these notes must be converted into **standardized codes**:  

- **ICD-10** → diagnosis codes (e.g., `E11.9` = Type 2 diabetes without complications)  
- **CPT / HCPCS** → procedure codes (e.g., `99213` = office visit, established patient)  

This project includes an **AI Agent for Coding Suggestion** that:  
- Reads the encounter notes  
- Suggests appropriate ICD-10 and CPT codes  
- Embeds those codes into the claim payload (XML for UAE, JSON for KSA)  

⚡ In a real-world system, this would use **NLP/ML models trained on EMRs**.  
For this demo, the coding agent simulates that process and outputs realistic sample codes.  

---

## 🛠️ Tech Stack
- **Backend**: FastAPI (Python) + SQLAlchemy + Supabase Postgres
- **Frontend**: Next.js (React) deployed on Vercel
- **Hosting**: Render (backend) + Vercel (frontend)
- **Database**: Supabase (Postgres)

---

## 🚀 How to Run Locally

### 1. Clone the repo

```bash
git clone https://github.com/your-username/rcm-demo.git
cd rcm-demo
```
### 2. Backend (FastAPI)
```
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```
Backend will start at: http://127.0.0.1:8000/docs

### 3. Frontend (Next.js)
```
cd frontend
npm install
npm run dev
```
Frontend will start at: http://localhost:3000

## 🌐 Live Demo Deployment

Backend (FastAPI on Render): https://rcm-demo-backend.onrender.com/docs

Frontend (Next.js on Vercel): https://rcm-demo-frontend.vercel.app

## 📌 Workflow



<!-- 1. Seed database (POST /seed in backend docs)
2. View patients (GET /patients/)
3. View encounters (GET /encounters/)
4. Submit a claim (POST /claims/submit/{encounter_id})
5. View claims list (GET /claims/)
6. Check AI agents (/agents/eligibility, /agents/coding)
7. Use frontend Work Queue + Analytics Dashboard -->

## 🎥 Live Demo (Video)

👉 [Click here to watch the full demo](https://raw.githubusercontent.com/username/repository/main/path/to/video.mp4)
