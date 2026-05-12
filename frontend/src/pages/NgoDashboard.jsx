import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { 
  HeartPulse, UserPlus, Users, PlusCircle, Package, AlertTriangle, 
  ArrowRight, Zap, RefreshCw, Activity, ShieldCheck, Layout,
  Droplets, Baby, Calendar, Clipboard, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import PregnancyTracker from '../NGO/PregnancyTracker';
import MalnutritionForm from '../NGO/MalnutritionForm';

export default function NgoDashboard() {
  const navigate = useNavigate();
  const [showPregForm, setShowPregForm] = useState(false);
  const [showMalForm, setShowMalForm] = useState(false);
  // Store the last saved record to display in the live table
  const [maternalRecords, setMaternalRecords] = useState([
    { name: 'Sunita Devi', phase: 'Week 32 / T3', status: 'High Risk', color: 'rose' },
    { name: 'Meena Kumari', phase: 'Week 18 / T2', status: 'Low Risk', color: 'emerald' },
    { name: 'Pooja Singh', phase: 'Week 12 / T1', status: 'Medium Risk', color: 'amber' },
  ]);
  const [malRecords, setMalRecords] = useState([
    { name: 'Raju Kumar', age: '24 Months', status: 'Mild Underweight', color: 'amber' },
    { name: 'Priya Sharma', age: '36 Months', status: 'Normal', color: 'emerald' },
  ]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  // Called when PregnancyTracker saves a new record
  const handleMaternalSave = (data) => {
    const trimesterMap = { 1: 'T1', 2: 'T2', 3: 'T3' };
    const riskColor = data.riskLevel === 'High Risk' ? 'rose' : data.riskLevel === 'Medium Risk' ? 'amber' : 'emerald';
    setMaternalRecords(prev => [
      { name: data.name || 'New Patient', phase: `${trimesterMap[data.trimester] || 'T1'}`, status: data.riskLevel || 'Assessed', color: riskColor },
      ...prev,
    ]);
    setShowPregForm(false);
  };

  // Called when MalnutritionForm saves a new record
  const handleMalResult = (data) => {
    const statusColor = data.status?.includes('Severe') ? 'rose' : data.status?.includes('Moderate') ? 'amber' : 'emerald';
    setMalRecords(prev => [
      { name: 'New Child', age: `${data.age_months || '?'} Months`, status: data.status || 'Assessed', color: statusColor },
      ...prev,
    ]);
    setShowMalForm(false);
  };

  return (
    <div className="flex bg-[#F8FAFC] min-h-screen font-inter selection:bg-rose-100 selection:text-rose-900">
      <Sidebar role="ngo" />
      
      <main className="flex-1 p-4 sm:p-8 lg:p-12 overflow-y-auto w-full max-w-[1700px] mx-auto">
        
        {/* NGO EXECUTIVE HEADER */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 flex flex-col md:flex-row justify-between items-end gap-8 pb-10 border-b border-slate-200"
        >
          <div className="space-y-2">
            <div className="flex items-center gap-3 text-rose-600 font-black uppercase tracking-[0.4em] text-[10px]">
               <Activity className="w-4 h-4" /> LOCAL SURVEILLANCE: ACTIVE
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase leading-none">
               ASHA <span className="text-rose-600 italic">Terminal.</span>
            </h1>
            <p className="text-slate-400 font-bold text-lg uppercase tracking-widest">Village Field Oversight & Maternal Records</p>
          </div>

          <div className="flex gap-4 w-full md:w-auto">
            <button 
              onClick={() => { setShowPregForm(true); setShowMalForm(false); }} 
              className="protocol-btn bg-rose-600 hover:bg-rose-700 shadow-rose-200 flex-1 md:flex-none"
            >
              <PlusCircle className="w-5 h-5" /> Maternal Entry
            </button>
            <button 
              onClick={() => { setShowMalForm(true); setShowPregForm(false); }} 
              className="protocol-btn bg-slate-900 flex-1 md:flex-none"
            >
              <PlusCircle className="w-5 h-5" /> Child Entry
            </button>
          </div>
        </motion.header>

        {/* STRATEGIC KPIS */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
        >
          {[
            { label: 'Active Maternal Nodes', value: maternalRecords.length, icon: HeartPulse, color: 'rose', trend: '+2', trendType: 'pos' },
            { label: 'Paediatric Registered', value: malRecords.length, icon: Baby, color: 'indigo', trend: 'Tracked', trendType: 'pos' },
            { label: 'High-Risk Interventions', value: maternalRecords.filter(r => r.color === 'rose').length, icon: AlertTriangle, color: 'amber', trend: 'Urgent', trendType: 'crit' },
          ].map(m => (
            <motion.div 
              key={m.label} 
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="stat-card p-6 md:p-10 flex flex-col justify-between"
            >
               <div className="flex justify-between items-start mb-8">
                  <div className={`p-4 bg-slate-50 text-slate-900 rounded-2xl border border-slate-100`}>
                    <m.icon className="w-7 h-7" />
                  </div>
                  <span className={`text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest ${
                    m.trendType === 'pos' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                  }`}>
                    {m.trend}
                  </span>
               </div>
               <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">{m.label}</p>
                  <h3 className="text-4xl font-black text-slate-900 tracking-tighter leading-none">{m.value}</h3>
               </div>
            </motion.div>
          ))}
        </motion.div>

        {/* LIVE HEALTH RECORDS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10 mb-12">
          
          <motion.div variants={itemVariants} className="premium-card p-6 md:p-10 shadow-2xl shadow-slate-200/50">
            <h2 className="text-2xl font-black mb-6 flex items-center justify-between text-slate-900 uppercase tracking-tighter">
              <span className="flex items-center gap-4">
                <div className="p-3 bg-rose-50 text-rose-600 rounded-2xl border border-rose-100"><Calendar className="w-6 h-6" /></div> 
                Maternal Health Matrix
              </span>
              <button onClick={() => navigate('/ngo/maternal')} className="text-[10px] font-black text-rose-500 hover:text-rose-700 uppercase tracking-widest flex items-center gap-1 transition-colors">
                View All <ArrowRight className="w-3 h-3" />
              </button>
            </h2>
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-300 text-[10px] font-black uppercase tracking-[0.3em]">
                    <th className="pb-6">Patient Name</th>
                    <th className="pb-6">Phase</th>
                    <th className="pb-6">AI Risk Level</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {maternalRecords.map((row, i) => (
                    <tr key={i} className="border-b border-slate-50 group hover:bg-slate-50 transition-colors">
                      <td className="py-6 font-black text-slate-900 uppercase tracking-tight">{row.name}</td>
                      <td className="py-6 font-bold text-slate-400 text-[10px] uppercase tracking-widest">{row.phase}</td>
                      <td className="py-6">
                        <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border-2 ${
                          row.color === 'rose' ? 'bg-rose-50 text-rose-600 border-rose-100' : 
                          row.color === 'emerald' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                          'bg-amber-50 text-amber-600 border-amber-100'
                        }`}>{row.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="premium-card p-6 md:p-10 shadow-2xl shadow-slate-200/50">
            <h2 className="text-2xl font-black mb-6 flex items-center justify-between text-slate-900 uppercase tracking-tighter">
              <span className="flex items-center gap-4">
                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl border border-indigo-100"><Activity className="w-6 h-6" /></div>
                Child Malnutrition Records
              </span>
              <button onClick={() => navigate('/ngo/child-nutrition')} className="text-[10px] font-black text-indigo-500 hover:text-indigo-700 uppercase tracking-widest flex items-center gap-1 transition-colors">
                View All <ArrowRight className="w-3 h-3" />
              </button>
            </h2>
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-300 text-[10px] font-black uppercase tracking-[0.3em]">
                    <th className="pb-6">Child Name</th>
                    <th className="pb-6">Age</th>
                    <th className="pb-6">AI Assessment</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {malRecords.map((row, i) => (
                    <tr key={i} className="border-b border-slate-50 group hover:bg-slate-50 transition-colors">
                      <td className="py-6 font-black text-slate-900 uppercase tracking-tight">{row.name}</td>
                      <td className="py-6 font-bold text-slate-400 text-[10px] uppercase tracking-widest">{row.age}</td>
                      <td className="py-6">
                        <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border-2 ${
                          row.color === 'rose' ? 'bg-rose-50 text-rose-600 border-rose-100' :
                          row.color === 'emerald' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                          'bg-amber-50 text-amber-600 border-amber-100'
                        }`}>{row.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>

        {/* ── DATA ENTRY MODALS (Real Forms) ── */}
        <AnimatePresence>
          {(showPregForm || showMalForm) && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-xl z-50 flex items-center justify-center p-6"
              onClick={(e) => { if (e.target === e.currentTarget) { setShowPregForm(false); setShowMalForm(false); }}}
            >
              <motion.div 
                initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
                className="relative w-full max-w-2xl"
              >
                {/* Close Button */}
                <button
                  onClick={() => { setShowPregForm(false); setShowMalForm(false); }}
                  className="absolute -top-4 -right-4 z-10 w-12 h-12 bg-white rounded-full shadow-2xl flex items-center justify-center text-slate-400 hover:text-rose-600 transition-colors border border-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Real PregnancyTracker Component */}
                {showPregForm && (
                  <PregnancyTracker onSave={handleMaternalSave} />
                )}

                {/* Real MalnutritionForm Component */}
                {showMalForm && (
                  <MalnutritionForm onResult={handleMalResult} />
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
