# SwasthAI Guardian: Integrated Rural Health Platform

> A production-grade, AI-powered healthcare platform built for rural India.
> Connecting remote villagers, ASHA health workers, and district hospitals through real machine learning, offline-first architecture, and regional language support.

---

## Technical Differentiation

Most health applications call a third-party AI API and display the result. SwasthAI owns its intelligence and runs securely.

- **Custom Medical AI**: We trained our own Random Forest disease classifier (91.3% accuracy, 5-fold cross-validated) on a curated corpus of 228 rural India symptom-disease samples covering 12 diseases prevalent in villages.
- **"Sakhi" Women's Health AI**: A dedicated, private conversational AI (powered by Groq) for menstrual health, along with a discreet sanitary pad request system directly linking villagers to their ASHA workers.
- **Edge AI & Privacy**: Edge AI integration ensures that features like the Skin Disease Scanner run securely without uploading sensitive photos to the cloud.
- **Full Native Localization**: The entire platform dynamically supports 5 languages (English, Hindi, Marathi, Tamil, Bengali) natively, allowing non-English speaking users to access complex medical AI.
- **Voice-First Accessibility**: Voice-to-text integration across Symptom Checkers and Ambulance Requests ensures that non-literate users can interact with the platform seamlessly.

---

## System Architecture

```text
+-------------------------+     +--------------------------+     +------------------------+
|   React + Vite Frontend |---->|  Node.js + Express API   |---->|  FastAPI AI Service    |
|   Port 5173             |     |  Port 5000               |     |  Port 8000             |
|                         |     |                          |     |                        |
|  * Emerald Light UI     |     |  * JWT Auth & Bcrypt     |     |  * Disease RF Model    |
|  * 5-language i18n      |     |  * Rate Limiting         |     |  * Pregnancy Risk      |
|  * Edge AI Skin Scan    |     |  * Cluster Load Balance  |     |  * Malnutrition WHO    |
|  * Voice Input          |     |  * SQLite (offline mode) |     |  * Outbreak Alerts     |
|  * Offline fallback UI  |     |  * Secure CORS Policy    |     |  * 91.3% Accuracy      |
+-------------------------+     +--------------------------+     +------------------------+
```

---

## Technology Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 18, Vite, Framer Motion, Lucide Icons, Recharts |
| **Backend** | Node.js, Express, SQLite3, JWT, bcryptjs, express-rate-limit |
| **AI Service** | Python, FastAPI, scikit-learn, pandas, joblib, Groq API (Sakhi) |
| **Styling** | Tailwind CSS ("Luminous Emerald Light" Premium Design System) |
| **AI Model** | Random Forest Classifier + TF-IDF Vectorizer |

---

## AI Model & Training Details

```text
Model        : Random Forest Classifier (300 estimators)
Vectorizer   : TF-IDF (unigrams + bigrams, sublinear_tf)
Dataset      : 228 curated samples (English + transliterated Hindi)
Test Accuracy: 91.3%
CV Accuracy  : 91.7% (5-fold cross-validation)
Classes (12) : Typhoid, Malaria, Dengue, Tuberculosis, Cholera,
               Viral Fever, Pneumonia, Anaemia, Jaundice,
               Dysentery, Chickenpox, Measles
```

To retrain the model:
```bash
cd ai-service
python train_disease_model.py
```
This regenerates `disease_model.pkl` and `model_accuracy.txt`.

---

## Core Functionality

### For Villagers (Citizens / Patients)
- **Women's Health (Menstrual Module)**: Converse privately with "Sakhi" AI regarding menstrual health, perform symptom checks, and discretely request sanitary pads from local ASHA workers.
- **Symptom Checker**: Select symptoms in plain localized languages, get real AI diagnosis with confidence scores and immediate next steps.
- **Follow-Up Health Tracking (Guardian)**: Closed-loop architecture that prompts users to report if they feel better/worse after a few days, routing escalations to ASHA workers based on the AI's Recovery Trajectory Score (RTS).
- **Emergency Ambulance**: GPS-based request with live ETA, voice input in local language, and direct dispatcher calling.
- **Skin Disease Scanner**: Edge AI visual assessment that processes directly on the device for maximum privacy.
- **Health Identity**: Unified, secure view of past health logs and AI predictions.

### For ASHA / NGO Workers
- **Maternal Health Tracker**: WHO-scored pregnancy risk assessment with strict data validation.
- **Child Malnutrition Monitor**: WHO Z-score classification with immediate referral action generation.
- **Village Health Dashboard**: Population stats, pregnancy cases, malnutrition counts, and direct pad request alerts from villagers.

### For Hospital Admins
- **District Analytics**: Realtime KPI dashboard across all registered villages.
- **Outbreak Surveillance**: 24-hour symptom cluster detection per village (auto-alerts if 5+ similar symptom cases originate from one village).
- **Live Ambulance Feed**: Dynamic data fed directly from the emergency tables.

### Security and Reliability
- **Robust Authentication**: Passwords hashed with `bcryptjs`. OTP login fallback with strict rate limiting.
- **Data Privacy**: All sensitive endpoints protected by JWT and role-based access control.
- **Offline-Resilient (Service Workers & IndexedDB)**: UI gracefully degrades when offline. Symptom checks and follow-ups are serialized to local storage when out in the fields, and background synced the moment the device reconnects to a cellular tower.

---

## Local Development Setup

### 1. AI Service (start this first)
```bash
cd ai-service
pip install -r requirements.txt
python train_disease_model.py   # trains and saves disease_model.pkl
uvicorn main:app --reload --port 8000
```

### 2. Backend
```bash
cd backend
npm install
npm run dev
```
*Auto-forks workers per CPU core. SQLite DB created securely on first run.*

### 3. Frontend
```bash
cd frontend
npm install
npm run dev
```
*Opens at http://localhost:5173*

---

## Demo & Credentials

On the login page, a **Demo Credentials banner** is provided at the bottom:
- Use **OTP Mode**: Enter `"1234"` for instant login to any account type.
- **Roles Available**: Villager (Citizen/Patient), NGO (Healthcare Provider), Admin (Management).

---

## Repository Structure

```text
swassthfinal/
|-- frontend/               # React + Vite application
|   |-- src/
|       |-- pages/          # VillagerDashboard, SymptomChecker, Ambulance, MenstrualHealth
|       |-- context/        # AuthContext, LanguageContext (5 Languages)
|-- backend/                # Node.js Express API
|   |-- server.js           # Load balancer, routes, bcrypt auth, outbreak detection
|-- ai-service/             # Python FastAPI AI microservice
|   |-- main.py             # Prediction endpoints
|   |-- train_disease_model.py
|-- .gitignore              # Configured for Node, Python, and env secrets
```

---

## The Development Team

We are a group of developers dedicated to using AI to bridge the healthcare gap in rural India.

*   **Divyansh Gupta (Team Leader)**
*   **Tejshvee Yerpurwad**
*   **Rishabh Agnihotri**

---

*SwasthAI Guardian - Built for Bharat's villages, not just its cities.*
