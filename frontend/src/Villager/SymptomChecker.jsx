import { useState, useRef } from 'react';
import { Mic, Activity, AlertCircle, Volume2, ShieldCheck, HeartPulse, Scan, Upload } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import api from '../services/api';

const AI_SERVICE_URL = import.meta.env.VITE_AI_URL || 'http://localhost:8000';

export default function SymptomChecker() {
  const { t, language } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [skinImage, setSkinImage] = useState(null);
  const [skinPreview, setSkinPreview] = useState(null);
  const fileInputRef = useRef(null);

  const symptomList = [
    { id: 'fever', label: t.diseaseChecker?.fever || 'Fever / High Temperature', severe: false },
    { id: 'cough', label: t.diseaseChecker?.cough || 'Continuous Cough', severe: false },
    { id: 'chest_pain', label: t.diseaseChecker?.chest_pain || 'Severe Chest Pain', severe: true },
    { id: 'breathing', label: t.diseaseChecker?.breathing || 'Difficulty Breathing', severe: true },
    { id: 'bleeding', label: t.diseaseChecker?.bleeding || 'Heavy Bleeding', severe: true },
    { id: 'headache', label: t.diseaseChecker?.headache || 'Strong Headache', severe: false },
    { id: 'vomiting', label: t.diseaseChecker?.vomiting || 'Vomiting / Nausea', severe: false },
    { id: 'weakness', label: t.diseaseChecker?.weakness || 'Extreme Weakness', severe: false },
  ];

  const handleSymptomChange = (id) => {
    setSelectedSymptoms((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSkinImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setSkinPreview(reader.result);
      reader.readAsDataURL(file);
      setResult(null);
    }
  };

  const handleAnalyze = async () => {
    if (selectedSymptoms.length === 0 && !skinImage) return;
    setLoading(true);
    setResult(null);

    // --- SKIN IMAGE: call real FastAPI /predict/skin endpoint ---
    if (skinImage) {
      try {
        const formData = new FormData();
        formData.append('file', skinImage);
        const res = await fetch(`${AI_SERVICE_URL}/predict/skin`, {
          method: 'POST',
          body: formData,
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setResult({
          type: data.severity === 'severe' ? 'severe' : 'mild',
          prediction: data.prediction,
          confidence: Math.round(data.confidence * 100),
          markers: data.markers,
          source: 'skin',
        });
      } catch (err) {
        console.error('Skin AI error:', err);
        setResult({
          type: 'error',
          message: 'Skin analysis service unavailable. Please try again.',
        });
      }
      setLoading(false);
      return;
    }

    // --- SYMPTOM CHECKBOXES: call real backend /villager/symptoms ---
    const symptomText = selectedSymptoms
      .map((id) => symptomList.find((s) => s.id === id)?.label || id)
      .join(', ');

    try {
      const res = await api.post('/villager/symptoms', { symptoms: symptomText });
      const { prediction, confidence, alert: outbreakAlert } = res.data;
      const isSevere = selectedSymptoms.some((id) => symptomList.find((s) => s.id === id)?.severe);
      setResult({
        type: isSevere ? 'severe' : 'mild',
        prediction,
        confidence: confidence ? Math.round(confidence * 100) : null,
        alert: outbreakAlert,
        message: isSevere
          ? t.diseaseChecker?.severe_msg || 'CRITICAL: Severe symptoms detected. Go to hospital immediately.'
          : t.diseaseChecker?.mild_msg || 'Mild condition. Rest and monitor. See a doctor if it worsens.',
        source: 'symptom',
      });
    } catch (err) {
      console.error('Symptom AI error:', err);
      // Graceful offline fallback — rule-based only if API is down
      const isSevere = selectedSymptoms.some((id) => symptomList.find((s) => s.id === id)?.severe);
      setResult({
        type: isSevere ? 'severe' : 'mild',
        prediction: isSevere ? 'Possible Emergency' : 'Mild Condition',
        message: isSevere
          ? t.diseaseChecker?.severe_msg || 'CRITICAL: Severe symptoms detected. Go to hospital immediately.'
          : t.diseaseChecker?.mild_msg || 'Mild condition. Rest and monitor.',
        source: 'offline',
      });
    }
    setLoading(false);
  };

  return (
    <div className="bg-white rounded-[50px] shadow-2xl p-8 lg:p-12 w-full translate-y-[-20px] animate-in fade-in slide-in-from-bottom-10 duration-1000 max-h-[85vh] overflow-y-auto">
      <div className="flex items-center gap-4 mb-10 overflow-hidden relative group">
        <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-indigo-700 text-white rounded-[24px] flex items-center justify-center p-4 shadow-xl shadow-indigo-100 group-hover:scale-110 transition-transform">
          <HeartPulse className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">{t.diseaseChecker?.ai_axis || 'Smart Health Checker'}</h2>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mt-1">AI Powered · Real-time Analysis</p>
        </div>
      </div>

      <div className="space-y-10 relative z-10 p-2">
        {/* SYMPTOM CHECKBOXES */}
        <div className="p-8 bg-slate-50 rounded-[40px] border border-slate-100">
          <div className="flex items-center gap-3 mb-6">
            <Scan className="w-6 h-6 text-indigo-500" />
            <label className="text-sm font-black uppercase tracking-[0.1em] text-slate-800">
              {t.diseaseChecker?.choose_symptoms || 'Select Your Symptoms'}
            </label>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {symptomList.map((symp) => (
              <label
                key={symp.id}
                className={`flex items-start gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                  selectedSymptoms.includes(symp.id)
                    ? 'bg-indigo-50 border-indigo-500 shadow-md transform scale-[1.02]'
                    : 'bg-white border-slate-200 hover:border-indigo-300'
                }`}
              >
                <input
                  type="checkbox"
                  className="mt-1 w-6 h-6 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500 transition-all"
                  checked={selectedSymptoms.includes(symp.id)}
                  onChange={() => handleSymptomChange(symp.id)}
                />
                <span className={`font-bold text-lg leading-tight ${selectedSymptoms.includes(symp.id) ? 'text-indigo-900' : 'text-slate-700'}`}>
                  {symp.label}
                  {symp.severe && <span className="ml-2 text-xs text-red-500 font-black uppercase">⚠ Critical</span>}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* SKIN DISEASE UPLOAD */}
        <div className="p-8 bg-teal-50 rounded-[40px] border border-teal-100">
          <div className="flex items-center gap-3 mb-6">
            <Scan className="w-6 h-6 text-teal-600" />
            <label className="text-sm font-black uppercase tracking-[0.1em] text-teal-900">
              {t.diseaseChecker?.title || 'Check Skin Disease (AI Pixel Analysis)'}
            </label>
          </div>
          {!skinPreview ? (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="w-full h-48 border-4 border-dashed border-teal-300 bg-white hover:bg-teal-100/50 transition-colors rounded-3xl flex flex-col items-center justify-center cursor-pointer group"
            >
              <Upload className="w-12 h-12 text-teal-400 mb-4 group-hover:-translate-y-2 transition-transform duration-300" />
              <span className="text-lg font-bold text-teal-700">{t.diseaseChecker?.scanner_desc || 'Tap here to upload a skin photo'}</span>
              <p className="text-sm font-medium text-teal-500 mt-2">Real AI pixel analysis · JPG, PNG, WEBP</p>
              <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
            </div>
          ) : (
            <div className="w-full h-64 rounded-3xl overflow-hidden relative border-4 border-teal-500 shadow-lg">
              <img src={skinPreview} alt="Skin Upload" className="w-full h-full object-cover" />
              <button
                onClick={() => { setSkinPreview(null); setSkinImage(null); setResult(null); }}
                className="absolute top-4 right-4 bg-slate-900/80 hover:bg-red-600 px-4 py-2 rounded-xl text-white font-bold text-sm backdrop-blur-md transition-all flex items-center gap-2"
              >
                <AlertCircle className="w-4 h-4" /> Remove
              </button>
            </div>
          )}
        </div>

        {/* ANALYZE BUTTON */}
        <div className="flex flex-col gap-6 pt-4">
          <button
            onClick={handleAnalyze}
            disabled={loading || (selectedSymptoms.length === 0 && !skinImage)}
            className="w-full py-6 bg-slate-900 hover:bg-indigo-600 disabled:bg-slate-300 disabled:text-slate-500 text-white rounded-[28px] text-[14px] font-black tracking-[0.2em] uppercase transition-all shadow-xl disabled:shadow-none flex items-center justify-center gap-4 group"
          >
            {loading ? (
              <div className="flex items-center gap-4">
                <div className="w-6 h-6 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin" />
                <span className="text-emerald-300 animate-pulse">
                  {skinImage ? 'Analyzing skin pixels...' : 'Running AI diagnosis...'}
                </span>
              </div>
            ) : (
              <>
                <Activity className="w-6 h-6 group-hover:scale-125 transition-transform" />
                {t.diseaseChecker?.init_scan || 'Analyze Now'}
              </>
            )}
          </button>

          {/* RESULT OUTPUT */}
          {result && result.type !== 'error' && (
            <div
              className={`p-8 rounded-[40px] shadow-2xl relative overflow-hidden border-2 animate-in slide-in-from-bottom-8 duration-700 ${
                result.type === 'severe'
                  ? 'bg-red-600 border-red-500 shadow-red-200'
                  : 'bg-emerald-500 border-emerald-400 shadow-emerald-200'
              }`}
            >
              <div className="absolute right-[-20px] top-[-20px] bg-white opacity-10 w-64 h-64 rounded-full blur-3xl" />
              <div className="flex items-start md:items-center gap-6 relative z-10 flex-col md:flex-row">
                <div className="p-5 bg-white/20 backdrop-blur-xl rounded-[24px] border border-white/30 shrink-0">
                  <ShieldCheck className="w-10 h-10 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-2 h-2 rounded-full bg-white animate-ping" />
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/90">
                      {result.source === 'skin' ? 'Pixel AI Analysis' : result.source === 'offline' ? 'Offline Triage' : 'AI Diagnosis'}
                      {result.confidence ? ` · ${result.confidence}% confidence` : ''}
                    </p>
                  </div>
                  {result.prediction && (
                    <h3 className="text-2xl font-black text-white mb-1">{result.prediction}</h3>
                  )}
                  <p className="text-lg font-bold text-white/90 leading-relaxed">{result.message}</p>
                  {result.markers && (
                    <div className="mt-3 flex gap-4 flex-wrap">
                      <span className="text-xs text-white/70 font-semibold">Redness: {result.markers.inflammation?.toFixed(2)}</span>
                      <span className="text-xs text-white/70 font-semibold">Texture: {result.markers.texture?.toFixed(2)}</span>
                      <span className="text-xs text-white/70 font-semibold">Irregularity: {result.markers.irregularity?.toFixed(2)}</span>
                    </div>
                  )}
                  {result.alert && (
                    <div className="mt-3 bg-yellow-400 text-yellow-900 rounded-xl p-3 text-sm font-black">
                      {result.alert}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {result?.type === 'error' && (
            <div className="p-6 bg-orange-50 border-2 border-orange-300 rounded-[32px] flex items-center gap-4">
              <AlertCircle className="w-8 h-8 text-orange-500 shrink-0" />
              <p className="text-orange-800 font-bold">{result.message}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
