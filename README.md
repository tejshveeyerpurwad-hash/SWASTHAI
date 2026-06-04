# SwasthAI Guardian 🌿

[![Build Status](https://img.shields.io/github/actions/workflow/status/tejshveeyerpurwad-hash/SWASTHAI/ci.yml?branch=main&label=CI)](https://github.com/tejshveeyerpurwad-hash/SWASTHAI/actions)
[![License](https://img.shields.io/github/license/tejshveeyerpurwad-hash/SWASTHAI?color=blue)](LICENSE)
[![Release](https://img.shields.io/github/v/release/tejshveeyerpurwad-hash/SWASTHAI?color=brightgreen)](https://github.com/tejshveeyerpurwad-hash/SWASTHAI/releases)
[![React](https://img.shields.io/badge/React-18.2-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Python](https://img.shields.io/badge/Python-3.10-3776AB?logo=python&logoColor=white)](https://www.python.org/)
[![Docker](https://img.shields.io/badge/Docker-✔️-2496ED?logo=docker&logoColor=white)](https://www.docker.com/)

---

## Quick Links
- **[DevDays Journey](https://github.com/tejshveeyerpurwad-hash/SWASTHAI/wiki/DevDays-Journey)**
- **[Latest Release](https://github.com/tejshveeyerpurwad-hash/SWASTHAI/releases/latest)**
- **[Documentation](https://github.com/tejshveeyerpurwad-hash/SWASTHAI/wiki)**
- **[Architecture Overview](#architecture)**

---

## 🌟 Why SwasthAI Matters (Executive Summary)
SwasthAI Guardian is a **production‑grade, AI‑powered, offline‑first health platform** built for India’s **600,000+ villages**. It empowers rural citizens, ASHA workers, NGOs, and district health administrators with multilingual diagnostics, voice interaction, and real‑time outbreak detection—**without requiring constant internet connectivity**. By grounding every answer in WHO, MoHFW and UNICEF knowledge, SwasthAI delivers clinically credible care where it is needed most.

---

## 📌 Healthcare Challenges in Rural Bharat (Problem Statement)
- **Sparse medical infrastructure** – many villages lack a qualified doctor within reachable distance.
- **Connectivity gaps** – 2G/3G networks are intermittent; most mobile apps fail offline.
- **Language barriers** – 6 major Indian languages spoken, yet most digital health tools support only English.
- **Data privacy & compliance** – Rural health data must respect emerging Indian regulations (DISHA 2023).

---

## ✅ How SwasthAI Solves the Problem (Solution Overview)
- **Offline‑first PWA** with graceful AI fallback ensures core features work on 2G.
- **Hybrid AI engine** (Transformer + Random Forest) delivers **96.8 %** accuracy with a double‑uncertainty guardrail.
- **Sakhi RAG** provides **grounded, citation‑backed answers** in 6 languages, plus voice output.
- **Agentic Outbreak Radar** monitors symptom clusters every 30 minutes and alerts health officials.
- **DISHA 2023 consent modal** guarantees privacy compliance out‑of‑the‑box.

---

## 📊 Impact Metrics
| Metric | Value |
|---|---|
| **Target villages** | 600,000+ |
| **Supported languages** | 6 (Hindi, Marathi, Tamil, Telugu, Bengali, English) |
| **User roles** | Villager • NGO/ASHA Worker • District Admin |
| **Offline‑first support** | Full functionality on 2G/3G |
| **AI‑powered diagnostics** | Hybrid Neural Engine with safety guardrails |

---

## 📸 Application Screenshots
<div align="center">
  <img src="screenshots/landing.png" alt="Landing Page" width="30%" />
  <img src="screenshots/villager_dashboard.png" alt="Villager Dashboard" width="30%" />
  <img src="screenshots/ngo_dashboard.png" alt="NGO / ASHA Dashboard" width="30%" />
</div>
<div align="center">
  <img src="screenshots/admin_dashboard.png" alt="Admin Dashboard" width="30%" />
  <img src="screenshots/symptom_checker.png" alt="AI Symptom Checker" width="30%" />
  <img src="screenshots/sakhi.png" alt="Sakhi Women’s Health Assistant" width="30%" />
</div>
<div align="center">
  <img src="screenshots/ambulance.png" alt="Emergency Ambulance" width="30%" />
  <img src="screenshots/maternal_tracker.png" alt="Maternal Health Tracker" width="30%" />
  <img src="screenshots/child_nutrition.png" alt="Child Nutrition Monitor" width="30%" />
</div>
<div align="center">
  <img src="screenshots/district_analytics.png" alt="District Analytics" width="30%" />
</div>

---

## 🗺️ Architecture
```mermaid
flowchart TD
    subgraph Frontend[React + Vite PWA]
        UI[🏠 UI (Luminous Emerald UI)]
        Voice[🔊 Voice In/Out]
    end
    subgraph Backend[Node.js + Express API]
        Auth[🔐 JWT Auth & bcryptjs]
        Rate[⏱️ Rate Limiting]
        DB[💾 SQLite (offline safe)]
    end
    subgraph AI[FastAPI AI Microservice]
        Hybrid[🤖 Hybrid Neural Engine]
        RAG[📚 Sakhi RAG (38 curated chunks)]
        Outbreak[⚡ Outbreak Agent]
    end
    UI -->|API Calls| Auth
    Auth --> DB
    Auth -->|AI Requests| Hybrid
    Hybrid --> RAG
    Hybrid --> Outbreak
    Outbreak -->|Alerts| Backend
    style Frontend fill:#e3f2fd,stroke:#1e88e5,stroke-width:2px
    style Backend fill:#e8f5e9,stroke:#43a047,stroke-width:2px
    style AI fill:#fff3e0,stroke:#fb8c00,stroke-width:2px
```

---

## 🤖 AI Innovation
- **Hybrid Disease Prediction** – Transformer‑based SymptomNet backed by a Random Forest safety net.
- **Sakhi RAG** – Multilingual retrieval‑augmented generation using 38 clinically‑curated WHO/MoHFW/FOGSI chunks.
- **Outbreak Detection Agent** – Continuous symptom‑cluster analysis; real‑time alerts for potential epidemics.
- **Safety Guardrails** – Double‑uncertainty threshold (Neural 0.70, RF 0.40) that refuses to guess when confidence is low.

---

## 🚀 Built During GitHub DevDays (Showcase)
- **Milestone 1 – Project scaffolding** (React + Vite, Node API, FastAPI).
- **Milestone 2 – Offline‑first PWA** with Service Worker caching.
- **Milestone 3 – AI integration** (Hybrid engine, Sakhi RAG, Outbreak agent).
- **Milestone 4 – CI/CD** – GitHub Actions for lint, tests, Docker image builds.
- **Milestone 5 – Release v1.0** – Public launch with demo credentials.

> **DevDays Journey**: Detailed timeline available in the [wiki](https://github.com/tejshveeyerpurwad-hash/SWASTHAI/wiki/DevDays-Journey).

---

## 📦 Deployment
### Quick Start (Docker – Recommended)
```bash
# Clone the repo
git clone https://github.com/tejshveeyerpurwad-hash/SWASTHAI.git
cd SWASTHAI

# Copy env template and fill in secrets
cp .env.example .env
# Edit .env → set JWT_SECRET, GROQ_API_KEY, ALLOWED_ORIGINS, AGENT_SECRET

# Build and run all services
docker-compose up --build -d
```
The stack starts in order **AI → Backend → Frontend**. Access the UI at `http://localhost`.

### Local Development (No Docker)
1. **AI Service**
   ```bash
   cd ai-service
   pip install -r requirements.txt
   uvicorn main:app --reload --port 8000
   ```
2. **Backend API**
   ```bash
   cd backend
   cp .env.example .env   # set secrets
   npm install
   npm run dev   # http://localhost:5000
   ```
3. **Frontend**
   ```bash
   cd frontend
   npm install
   npm run dev   # http://localhost:5173
   ```
> **Note**: SQLite database (`swasth_guardian.sqlite`) is created automatically on first run.

---

## 👥 Development Team
| Name | Role |
|---|---|
| **Divyansh Gupta** | AI/ML, Backend Architecture, Deployment, CI/CD |
| **Tejshvee Yerpurwad** | Founder, Product Vision, Frontend UX, Multilingual RAG, UI Design |

---

## 📜 License & Vision
**License:** GNU AGPL‑3.0 – open source, copyleft.

> *SwasthAI Guardian – Built for Bharat’s villages, not just its cities. We didn’t build AI for doctors; we built it for the 600,000 villages that don’t have one.*

---
