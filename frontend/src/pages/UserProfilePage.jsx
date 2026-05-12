import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import { 
  User, ShieldCheck, Clock, MapPin, Activity, 
  Settings, HeartPulse, History, Smartphone, 
  LogOut, PhoneCall, Globe, Key, AlertCircle, Edit3,
  Save, PlusCircle
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';


export default function UserProfilePage() {
  const { t } = useLanguage();
  const { user, logout, updateProfile } = useAuth();
  const [timeSpent, setTimeSpent] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ username: '' });

  useEffect(() => {
    if (user) {
      setEditForm({ username: user.username || '' });
    }
  }, [user]);


  const handleSaveProfile = async () => {
    try {
      await updateProfile(editForm);
      setIsEditing(false);
    } catch (err) {
      alert("Failed to update profile.");
    }
  };

  useEffect(() => {
    // Persistent time spent tracking from localStorage
    const storedTime = parseInt(localStorage.getItem('swasthai_timer') || '0');
    setTimeSpent(storedTime);
    
    const interval = setInterval(() => {
      setTimeSpent(prev => {
        const next = prev + 1;
        localStorage.setItem('swasthai_timer', next.toString());
        return next;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}h ${m}m ${s}s`;
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-6"
        >
          <div className="w-20 h-20 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
          <p className="text-emerald-500 font-black uppercase tracking-[0.4em] text-xs">Synchronizing Identity Node...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-inter pt-14 pb-20 px-6">
      <Navbar />
      
      <main className="max-w-6xl mx-auto space-y-12">
        <motion.header 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-10"
        >
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-4 text-emerald-600 font-black uppercase tracking-[0.2em] md:tracking-[0.4em] text-[10px] md:text-xs"
            >
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              {user?.role === 'ngo' ? (t.loginPage?.ngo_sub || 'ASHA Axis') : user?.role === 'admin' ? (t.loginPage?.admin_sub || 'Admin Axis') : (t.loginPage?.villager_sub || 'Citizen Axis')}
            </motion.div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-slate-900 tracking-tighter leading-none">
              {t.nav?.profile || 'Profile'}<span className="text-emerald-600">.</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-400 font-medium max-w-xl leading-relaxed">
              {t.loginPage?.left_desc || 'Securely access your medical records and manage your health identity.'}
            </p>
          </div>

          <motion.button 
            whileHover={{ scale: 1.05, backgroundColor: "#e11d48" }}
            whileTap={{ scale: 0.95 }}
            onClick={logout} 
            className="px-8 md:px-14 py-4 md:py-6 bg-slate-900 text-white rounded-[24px] md:rounded-[32px] text-[10px] md:text-xs font-black uppercase tracking-[0.2em] md:tracking-[0.4em] transition-all shadow-2xl flex items-center gap-3 md:gap-4 group"
          >
            <LogOut className="w-4 h-4 md:w-5 md:h-5 group-hover:-translate-x-2 transition-transform" /> {t.logout || 'TERMINATE SESSION'}
          </motion.button>

        </motion.header>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-10">
          {/* USER INFO CARD */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="lg:col-span-2 bg-white rounded-[56px] shadow-[0_64px_120px_-32px_rgba(0,0,0,0.1)] border border-slate-100 p-6 md:p-12 md:p-16 space-y-12 relative overflow-hidden group hover:border-emerald-200 transition-colors"
          >
            <div className="absolute right-[-10%] top-[-10%] opacity-[0.03] pointer-events-none group-hover:scale-110 transition-transform duration-1000">
               <User className="w-[600px] h-[600px]" />
            </div>

            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12 relative z-10">
               <motion.div 
                 whileHover={{ rotate: 5, scale: 1.05 }}
                 className="w-48 h-48 bg-slate-100 rounded-[56px] shadow-xl border-4 border-slate-50 flex items-center justify-center relative group overflow-hidden"
               >
                  <User className="w-24 h-24 text-slate-300" />
                  <div onClick={() => setIsEditing(!isEditing)} className="absolute inset-0 bg-emerald-600/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all cursor-pointer backdrop-blur-sm">
                     <Edit3 className="w-10 h-10 text-white" />
                  </div>
               </motion.div>
               <div className="space-y-4 text-center md:text-left flex-1">
                  <div className="flex items-center justify-center md:justify-start gap-4">
                      {isEditing ? (
                        <div className="flex flex-col md:flex-row gap-3">
                          <input 
                            className="text-2xl md:text-3xl font-black text-slate-900 border-b-2 border-emerald-500 bg-transparent focus:outline-none"
                            value={editForm.username}
                            onChange={(e) => setEditForm({...editForm, username: e.target.value})}
                            autoFocus
                          />
                          <div className="flex gap-2">
                             <button onClick={handleSaveProfile} className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-700">{t.save || 'Save'}</button>
                             <button onClick={() => setIsEditing(false)} className="px-4 py-2 bg-slate-200 text-slate-700 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-300">{t.cancel || 'Cancel'}</button>
                          </div>
                        </div>
                      ) : (
                        <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-slate-900 uppercase truncate max-w-[250px] md:max-w-none">{user?.username}</h2>
                      )}
                      {!isEditing && <div className="px-3 md:px-4 py-1 md:py-2 bg-emerald-600 text-white rounded-xl text-[8px] md:text-[9px] font-black uppercase tracking-widest shadow-lg shadow-emerald-200">{t.verified || 'VERIFIED'}</div>}
                   </div>
                   <p className="text-slate-400 font-bold text-sm md:text-lg uppercase tracking-widest flex items-center justify-center md:justify-start gap-3">
                      <ShieldCheck className="w-4 h-4 md:w-5 md:h-5 text-emerald-500" /> {user?.role === 'ngo' ? `NGO-ID: ${user?.id}` : user?.role === 'admin' ? `ADM-ID: ${user?.id}` : `CID: ${user?.id}`}
                   </p>
                  <div className="flex flex-wrap gap-4 justify-center md:justify-start mt-6">
                    <span className="px-6 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                       <MapPin className="w-3 h-3 text-emerald-600" /> Node V-101
                    </span>
                    <span className="px-6 py-3 bg-slate-50 border border-slate-100 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                       <Settings className="w-3 h-3 text-emerald-600" /> {user?.role === 'ngo' ? (t.roles?.ngo || 'Field Response Tier') : user?.role === 'admin' ? (t.roles?.admin || 'System Overseer') : (t.roles?.citizen || 'Citizen Tier')}
                    </span>
                  </div>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
               {[
                  { label: 'Role Axis', val: user?.role?.toUpperCase(), icon: ShieldCheck, color: 'text-emerald-600', bg: 'bg-emerald-50/50' },
                  { label: 'Network Node', val: 'Varanasi Central', icon: Globe, color: 'text-blue-600', bg: 'bg-blue-50/50' },
                  { label: 'System Logic', val: 'V.2.0 Stable', icon: Smartphone, color: 'text-purple-600', bg: 'bg-purple-50/50' }
               ].map((item, idx) => (
                  <motion.div 
                    key={idx} 
                    whileHover={{ y: -10, boxShadow: "0 25px 50px -12px rgba(0,0,0,0.1)" }}
                    className={`p-8 ${item.bg} rounded-[40px] border border-slate-50 transition-all cursor-pointer group`}
                  >
                     <item.icon className={`w-8 h-8 ${item.color} mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all`} />
                     <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">{item.label}</p>
                     <p className="text-xl font-black text-slate-900 leading-none">{item.val}</p>
                  </motion.div>
               ))}
            </div>
          </motion.div>

          {/* ACTIVITY TRACKER */}
          <div className="flex flex-col gap-6 md:gap-10 lg:h-full">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-slate-900 rounded-[56px] p-6 md:p-12 text-white space-y-10 shadow-[0_64px_120px_-32px_rgba(0,0,0,0.4)] relative overflow-hidden flex-1 flex flex-col justify-center group"
            >
               <div className="absolute right-[-10%] top-[-10%] opacity-10 group-hover:rotate-12 transition-transform duration-[2s]">
                  <Clock className="w-64 h-64" />
               </div>
               <div className="space-y-4 relative z-10 text-center">
                  <div className="flex items-center justify-center gap-3">
                     <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_12px_rgba(52,211,153,0.8)]" />
                     <p className="text-[10px] font-black uppercase tracking-[0.5em] text-emerald-400">Live Tele-Health Timer</p>
                  </div>
                  <h3 className="text-6xl font-black tracking-tighter leading-none tabular-nums font-mono">{formatTime(timeSpent)}</h3>
                  <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">Active Care Integration</p>
               </div>
               <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden relative z-10">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                    className="h-full bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.5)]" 
                  />
               </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-emerald-600 rounded-[48px] p-6 md:p-10 text-white space-y-8 shadow-2xl relative overflow-hidden group flex-1"
            >
               <div className="absolute right-[-5%] bottom-[-5%] opacity-10 group-hover:scale-125 transition-transform duration-1000">
                  <HeartPulse className="w-48 h-48" />
               </div>
               <div className="space-y-4 relative z-10">
                  <h4 className="text-2xl font-black uppercase tracking-tighter leading-none tracking-widest">Health Protocol</h4>
                  <p className="text-emerald-100/60 font-black text-[10px] uppercase tracking-widest">Autonomous Sync Axis</p>
               </div>
               <div className="flex items-center gap-6 relative z-10">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-xl rounded-[24px] flex items-center justify-center border border-white/20 shadow-xl">
                     <Activity className="w-8 h-8 animate-bounce-slow" />
                  </div>
                  <div>
                     <p className="text-3xl font-black leading-none">Optimal</p>
                     <p className="text-xs font-bold text-emerald-100 leading-tight mt-2 opacity-80 uppercase tracking-widest italic">All Nodes Responding</p>
                  </div>
               </div>
            </motion.div>
          </div>
        </section>

        {/* SECURITY SETTINGS AXIS */}
        <section className="bg-white rounded-[56px] shadow-xl border border-slate-100 p-6 md:p-12 md:p-16 space-y-12">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
               <div className="space-y-3 text-center md:text-left">
                  <h3 className="text-3xl font-black tracking-tight uppercase">Security & Sovereignty</h3>
                  <p className="text-slate-400 font-bold text-sm tracking-widest uppercase">Guardian Protocol V-12 Data Guard</p>
               </div>
               <div className="flex gap-4">
                  <button className="px-10 py-5 bg-slate-50 text-slate-900 border border-slate-200 rounded-[24px] font-black uppercase text-[10px] tracking-widest hover:bg-slate-100 active:scale-95 transition-all flex items-center gap-4">
                    <Key className="w-4 h-4" /> Reset Credentials
                  </button>
                  <button className="px-10 py-5 bg-slate-900 text-white rounded-[24px] font-black uppercase text-[10px] tracking-widest hover:bg-slate-800 active:scale-95 transition-all flex items-center gap-4">
                    <Settings className="w-4 h-4" /> Global Settings
                  </button>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
               {[
                  { t: 'Offline Sync', d: 'Enable local medical caching axis.', icon: Globe, status: 'Enabled' },
                  { t: 'Biometric Handshake', d: 'Secure device access logic.', icon: ShieldCheck, status: 'Active' },
                  { t: 'Data Export', d: 'Download clinical history payload.', icon: Save, status: 'V-01' },
                  { t: 'Family Link', d: 'Connect child health nodes.', icon: PlusCircle, status: 'Connect+' },
               ].map((item, i) => (
                  <div key={i} className="p-8 bg-slate-50/50 border border-slate-100 rounded-[40px] hover:shadow-lg transition-all group cursor-pointer">
                     <item.icon className="w-8 h-8 text-emerald-600 mb-6 group-hover:scale-110 transition-transform" />
                     <h4 className="text-lg font-black text-slate-900 leading-none mb-2">{item.t}</h4>
                     <p className="text-xs font-medium text-slate-400 leading-relaxed mb-6">{item.d}</p>
                     <div className="inline-block px-4 py-1.5 bg-emerald-50 text-emerald-600 rounded-xl text-[9px] font-black tracking-widest uppercase">{item.status}</div>
                  </div>
               ))}
            </div>
        </section>

        {/* COMPLIANCE WARNING */}
        <div className="p-8 bg-white border border-slate-100 rounded-[40px] flex items-center gap-6 md:gap-10 shadow-sm">
           <AlertCircle className="w-12 h-12 text-slate-200 shrink-0" />
           <p className="text-xs font-bold text-slate-400 leading-relaxed uppercase tracking-widest">
              Emergency Protocol Notice: SwasthAI maintains absolute non-sovereign data privacy. Your medical history nodes are encrypted under the 2026 District Security Axis. All clinical evaluations are autonomous.
           </p>
        </div>
      </main>
    </div>
  );
}
