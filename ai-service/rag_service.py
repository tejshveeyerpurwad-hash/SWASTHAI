"""
RAG-Powered Sakhi — Retrieval-Augmented Generation for verified health guidance.
Uses sentence-transformers (multilingual — Hindi, Tamil, Marathi, Bengali, English).
Vector store: pure-Python numpy cosine similarity (no C++ build tools needed).
Knowledge base: WHO / ASHA / MoHFW guidelines for maternal, menstrual, child health.
"""
import os
import numpy as np
from groq import Groq

# ── Knowledge Base Chunks (WHO / ASHA / MoHFW guidelines) ──────────────────────
HEALTH_KNOWLEDGE = [
    "Pregnant women should attend at least 8 antenatal care (ANC) visits. First visit before 12 weeks. Tests include blood pressure, haemoglobin, blood sugar, urine protein.",
    "Gestational hypertension: Blood pressure ≥140/90 mmHg after 20 weeks. Severe hypertension (≥160/110) is a medical emergency requiring immediate hospital referral.",
    "Gestational diabetes: All pregnant women screened at 24-28 weeks. Fasting blood sugar >5.1 mmol/L or 2-hour post-load >8.5 mmol/L confirms diagnosis.",
    "Iron-Folic Acid (IFA) tablets: take daily from 12 weeks until 6 months after delivery. Prevents anaemia and neural tube defects.",
    "Pregnancy warning signs needing immediate hospital: heavy bleeding, severe headache, blurred vision, severe abdominal pain, no fetal movement after 28 weeks.",
    "ASHA workers should do home visits at 3, 7, 28, and 42 days after delivery to check mother and newborn.",
    "Normal menstrual cycle: 21-35 days. Normal flow: 2-7 days. Soaking more than one pad per hour for several hours indicates heavy bleeding (menorrhagia) — see a doctor.",
    "Severe period pain that interferes with daily life may indicate endometriosis or fibroids — consult a doctor.",
    "Sanitary hygiene: change pads every 4-6 hours to prevent infection and odour. Menstrual cups safe for up to 8-12 hours.",
    "Iron-rich foods during periods: jaggery (gud), spinach, lentils, dates, sesame seeds replenish lost iron.",
    "See a doctor if: periods stopped 3+ months (not pregnant), bleeding between periods, pain during urination or sex, unusual discharge with odour.",
    "Severe Acute Malnutrition (SAM): MUAC < 11.5 cm. Requires therapeutic feeding and hospital admission immediately.",
    "Moderate Acute Malnutrition (MAM): MUAC 11.5-12.5 cm. Enroll in community-based supplementary feeding program. ASHA follow-up weekly.",
    "Exclusive breastfeeding for first 6 months provides complete nutrition and protects against diarrhoea and respiratory infections.",
    "Childhood immunisation (India): BCG at birth, OPV at birth, Hepatitis B at birth, DPT-1 at 6 weeks, Measles-Rubella at 9-12 months.",
    "ORS for diarrhoea: 1 litre clean water + 6 teaspoons sugar + half teaspoon salt. Give after every loose stool. Prevents dehydration deaths.",
    "Tuberculosis: cough >2 weeks, blood in sputum, night fever, unexplained weight loss. Free diagnosis and treatment at government hospitals.",
    "Dengue: high fever, severe headache, pain behind eyes, joint pain, rash. No specific treatment — hydration and rest. Hospital if bleeding or severe abdominal pain.",
    "Malaria prevention: sleep under insecticide-treated nets. Symptoms: fever with chills every 2-3 days. Free treatment at PHCs.",
    "Hypertension: BP >140/90 mmHg. Often no symptoms. Reduce salt intake, exercise 30 min/day, take prescribed medications regularly.",
    # ── Added: high-impact rural India conditions ────────────────────────────────
    "Heatstroke emergency: body temperature above 40°C (104°F), confusion, no sweating, hot dry skin. Move to shade, cool body with wet cloth, give water if conscious. Rush to hospital immediately — can be fatal within hours.",
    "Heat exhaustion vs heatstroke: heat exhaustion has heavy sweating and cool skin — give fluids and rest. Heatstroke has NO sweating and hot skin — this is life-threatening, go to hospital now.",
    "Snakebite first aid: Keep victim still and calm. Immobilize the bitten limb below heart level. Remove rings and tight clothing. Do NOT cut, suck, or apply tourniquet. Reach hospital within 1 hour for antivenom. All snakebite cases need hospital evaluation.",
    "Anti-Snake Venom (ASV) is available free at government district hospitals in India. Signs of systemic envenomation: swelling spreading up limb, drooping eyelids, difficulty swallowing or breathing, bleeding gums, dark urine.",
    "Child diarrhoea: give ORS after every loose stool. For children under 5, continue breastfeeding. Zinc tablet 20mg daily for 14 days reduces severity. Visit ASHA or PHC if child has blood in stool, is vomiting everything, or has sunken eyes.",
    "Dehydration danger signs in children: sunken eyes, dry mouth, no urine for 8 hours, skin pinch returns slowly, lethargy. These require immediate hospital treatment — IV fluids may be needed.",
    "Typhoid prevention: drink only boiled or treated water. Eat fresh hot food. Wash hands before eating. Typhoid vaccine available at government hospitals. Typhoid is treated with antibiotics — do not stop before completing course.",
    "Cholera: profuse watery rice-water stools. Can cause fatal dehydration within hours. Immediate ORS and hospital admission needed. Cholera spreads through contaminated water — report to ASHA immediately.",
    "Anaemia in pregnancy: haemoglobin below 11 g/dL. Take daily IFA tablets, eat iron-rich foods (green leafy vegetables, jaggery, lentils), avoid tea/coffee 1 hour before and after meals as they block iron absorption.",
    "Skin infections in villages: ringworm (round scaly patch), scabies (intense night itching between fingers), impetigo (crusty sores). Keep skin clean and dry. Antifungal cream for ringworm. See PHC doctor for scabies treatment for whole family.",
    "ASHA emergency referral: refer to PHC or district hospital for — unconscious patient, convulsions, severe difficulty breathing, heavy bleeding, suspected snakebite, heatstroke, severe dehydration, any child not feeding for 24 hours.",
    "Fever above 103°F (39.4°C) lasting more than 3 days needs medical evaluation. Do not use aspirin for fever in children — use paracetamol only. Tepid sponging helps reduce high temperature.",
    "Respiratory infections: wash hands frequently, cover mouth when coughing. Most viral respiratory infections resolve in 7-10 days with rest and fluids. See doctor if breathing becomes difficult, lips turn blue, or fever doesn't break.",
    "Safe drinking water: boil water for 1 minute or use chlorine tablets (1 tablet per 10 litres, wait 30 minutes). Filter water through clean cloth before boiling. Store in covered clean container.",
    "Mental health in villages: stress, anxiety, and sadness after childbirth (postpartum depression) are medical conditions, not weakness. ASHA workers are trained to identify and refer. Talking to a trusted person helps. Free counselling available at district hospitals.",
]

# ── Lazy-Loaded Embeddings (loaded once on first request) ──────────────────────
_embedder = None
_kb_embeddings = None

def _get_embedder():
    global _embedder
    if _embedder is None:
        from sentence_transformers import SentenceTransformer
        print("[RAG] Loading multilingual embedding model (one-time)...")
        _embedder = SentenceTransformer("paraphrase-multilingual-MiniLM-L12-v2")
        print("[RAG] Embedding model loaded.")
    return _embedder

def _get_kb_embeddings():
    global _kb_embeddings
    if _kb_embeddings is None:
        embedder = _get_embedder()
        _kb_embeddings = embedder.encode(HEALTH_KNOWLEDGE, normalize_embeddings=True)
        print(f"[RAG] Knowledge base embedded: {len(HEALTH_KNOWLEDGE)} chunks.")
    return _kb_embeddings

def _retrieve(query: str, top_k: int = 3) -> list[str]:
    """Cosine similarity retrieval using numpy — no C++ build tools needed."""
    embedder = _get_embedder()
    kb_embs = _get_kb_embeddings()
    query_emb = embedder.encode([query], normalize_embeddings=True)[0]
    # Cosine similarity (dot product of normalized vectors = cosine)
    scores = np.dot(kb_embs, query_emb)
    top_indices = np.argsort(scores)[-top_k:][::-1]
    return [HEALTH_KNOWLEDGE[i] for i in top_indices]

# ── RAG Chat Function ───────────────────────────────────────────────────────────
def rag_chat(user_message: str, groq_api_key: str) -> str:
    """
    Retrieves top-3 verified WHO/ASHA/MoHFW health guideline chunks via
    cosine similarity, injects them as grounded context into Groq prompt.
    Works in Hindi, Tamil, Marathi, Bengali, English (multilingual model).
    """
    try:
        chunks = _retrieve(user_message, top_k=3)
        context = "\n".join([f"- {chunk}" for chunk in chunks])
    except Exception as e:
        print(f"[RAG] Retrieval error: {e}")
        context = "No specific guidelines retrieved. Use general safe health advice."

    system_prompt = f"""You are Sakhi, a trusted Women's & Family Health Assistant for rural India.
You MUST base your answers on the verified health guidelines below. If the guidelines don't fully cover the question, say so and recommend consulting a doctor.

VERIFIED HEALTH GUIDELINES (WHO / ASHA / MoHFW):
{context}

RULES:
- Reply in the SAME language as the user's message
- Never diagnose — always recommend a doctor for serious symptoms
- Be warm, empathetic, non-judgmental
- Keep responses to 3-5 sentences maximum
- For severe symptoms (heavy bleeding, high fever, chest pain), urgently advise immediate hospital visit"""

    client = Groq(api_key=groq_api_key)
    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_message},
        ],
        temperature=0.4,
        max_tokens=350,
    )
    return response.choices[0].message.content
