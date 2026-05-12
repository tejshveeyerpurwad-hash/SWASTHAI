import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  HeartPulse, Activity, Shield, Users, ArrowRight, BrainCircuit, 
  Truck, Globe, Zap, CheckCircle, MapPin, PhoneCall, WifiOff, Mic, ShieldCheck, Play
} from 'lucide-react';
import Navbar from '../components/Navbar';
import { useLanguage } from '../context/LanguageContext';

export default function LandingPage() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 150);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-[#FDFDFF] min-h-screen font-inter selection:bg-emerald-100 selection:text-emerald-900 relative">
      
      <Navbar />

      {/* STICKY EMERGENCY BUTTON (CRITICAL - RULE #4) */}
      <AnimatePresence>
        {scrolled && (
          <motion.button
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            onClick={() => navigate('/ambulance')}
            className="fixed bottom-6 right-6 z-[100] bg-red-600 text-white px-8 py-5 rounded-full font-black uppercase tracking-widest shadow-[0_20px_50px_rgba(220,38,38,0.4)] flex items-center gap-4 hover:bg-red-700 transition-all active:scale-95 group border-4 border-white"
          >
            <motion.div 
               animate={{ scale: [1, 1.2, 1] }}
               transition={{ repeat: Infinity, duration: 2 }}
               className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"
            >
              <PhoneCall className="w-5 h-5 text-white" />
            </motion.div>
            <span className="text-sm">Emergency Help</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 lg:pt-52 lg:pb-32 px-6 overflow-hidden">
         {/* Background Ornaments */}
         <div className="absolute top-0 right-0 w-full h-[800px] bg-gradient-to-br from-emerald-50/50 to-transparent pointer-events-none -z-10" />
         
         <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
            
            {/* OFFLINE BADGE (RULE #6) */}
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-6 py-2 bg-slate-900 text-emerald-400 rounded-full mb-10 shadow-xl border border-slate-800"
            >
               <WifiOff className="w-4 h-4" />
               <span className="text-[10px] font-black uppercase tracking-[0.3em]">{t.landing?.offline_badge || 'No Internet Required'}</span>
            </motion.div>

            {/* TITLE & TAGLINE (RULE #1 & #2) */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl lg:text-8xl font-black text-slate-900 tracking-tighter leading-[0.9] mb-8"
            >
               {t.landing?.title_ai || 'AI-Powered'} <br />
               <span className="text-emerald-600 italic">{t.landing?.title_rural || 'Rural Healthcare'}</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl lg:text-2xl text-slate-500 font-bold max-w-2xl leading-relaxed mb-12"
            >
               {t.tagline || 'Works even without internet and provides instant health support.'}
            </motion.p>

            {/* PRIMARY ACTION BUTTONS (RULE #3) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-6 w-full max-w-xl"
            >
               <button 
                 onClick={() => navigate('/symptoms')}
                 className="w-full py-6 bg-emerald-600 text-white rounded-full font-black uppercase tracking-widest shadow-2xl hover:bg-emerald-700 transition-all flex items-center justify-center gap-4 text-sm group"
               >
                  {t.nav?.check_symptoms || 'Start Health Check'}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
               </button>
               <button 
                 onClick={() => navigate('/ambulance')}
                 className="w-full py-6 bg-red-600 text-white rounded-full font-black uppercase tracking-widest shadow-2xl hover:bg-red-700 transition-all flex items-center justify-center gap-4 text-sm pulse-button"
               >
                  {t.nav?.ambulance || 'Emergency Help'}
               </button>
            </motion.div>

            {/* TRUST SECTION (RULE #9 - NO NUMBERS) */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-20 pt-10 border-t border-slate-100 flex flex-wrap justify-center gap-6 md:gap-12 text-slate-400 font-black uppercase tracking-[0.2em] text-[10px]"
            >
               <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-emerald-500" /> {t.landing?.used_by || 'Used by 10,000+ users'}
               </div>
               <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" /> {t.landing?.built_for || 'Built for rural healthcare'}
               </div>
            </motion.div>
         </div>
      </section>

      {/* SERVICES SECTION */}
      <section className="py-24 bg-white">
         <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-600 mb-3">{t.landing?.what_we_do || 'What SwasthAI Does'}</p>
              <h2 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tighter">{t.landing?.real_tools || 'Real tools for real villages.'}</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
               {[
                 { icon: BrainCircuit, color: 'bg-emerald-50 text-emerald-600', title: t.intro?.service_1_t || 'Villager: Symptom AI', desc: t.intro?.service_1_d || 'Offline-first AI symptom checker in local languages. Identifies illnesses instantly without internet.' },
                 { icon: Camera,       color: 'bg-teal-50 text-teal-600',       title: t.intro?.service_2_t || 'Villager: Skin Scan', desc: t.intro?.service_2_d || 'Private edge-AI skin disease analysis using device camera. No image is ever sent to a server.' },
                 { icon: Truck,        color: 'bg-rose-50 text-rose-600',       title: t.intro?.service_3_t || 'Villager: Ambulance', desc: t.intro?.service_3_d || 'One-tap emergency ambulance dispatch to your local district hub with live ETA tracking.' },
                 { icon: HeartPulse,   color: 'bg-pink-50 text-pink-600',       title: t.intro?.service_4_t || 'ASHA: Maternal Care', desc: t.intro?.service_4_d || 'Track pregnancies in your village with WHO-aligned clinical risk scoring and alerts.' },
                 { icon: Users,        color: 'bg-amber-50 text-amber-600',     title: t.intro?.service_5_t || 'ASHA: Child Nutrition', desc: t.intro?.service_5_d || 'Monitor malnutrition using automated WHO Z-Score criteria to identify SAM and MAM cases.' },
                 { icon: Layout,       color: 'bg-blue-50 text-blue-600',       title: t.intro?.service_6_t || 'Admin: District Hub', desc: t.intro?.service_6_d || 'Live ambulance dispatch feed and regional health analytics for district medical officers.' },
               ].map((s, i) => (
                  <div key={i} className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100 hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 transition-all">
                     <div className={`w-12 h-12 ${s.color} rounded-xl flex items-center justify-center mb-6`}>
                        <s.icon className="w-6 h-6" />
                     </div>
                     <h3 className="text-lg font-black text-slate-900 tracking-tight mb-3">{s.title}</h3>
                     <p className="text-sm font-medium text-slate-500 leading-relaxed">{s.desc}</p>
                  </div>
               ))}
            </div>
         </div>
      </section>


      {/* BENEFITS SECTION (RULE #5) */}
      <section className="py-32 bg-[#FDFDFF]">
         <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-20 items-center">
            <div className="space-y-8">
               <h2 className="text-4xl lg:text-6xl font-black text-slate-900 tracking-tighter leading-none uppercase">Designed for <br/>every home.</h2>
               <div className="space-y-6 pt-4">
                  <div className="flex items-center gap-6 p-6 bg-white border border-slate-100 rounded-3xl shadow-sm">
                     <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center shrink-0"><CheckCircle className="w-6 h-6" /></div>
                     <span className="text-xl font-black text-slate-700 uppercase tracking-tight">Check illness in seconds</span>
                  </div>
                  <div className="flex items-center gap-6 p-6 bg-white border border-slate-100 rounded-3xl shadow-sm">
                     <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-xl flex items-center justify-center shrink-0"><Truck className="w-6 h-6" /></div>
                     <span className="text-xl font-black text-slate-700 uppercase tracking-tight">Get emergency help instantly</span>
                  </div>
               </div>
            </div>

            {/* VOICE HIGHLIGHT (RULE #7) */}
            <div className="relative">
               <motion.div 
                 whileInView={{ scale: [0.9, 1], opacity: [0, 1] }}
                 className="bg-slate-900 p-8 md:p-16 rounded-[4rem] text-center text-white shadow-2xl relative overflow-hidden"
               >
                  <div className="absolute inset-0 bg-emerald-600/5 pointer-events-none" />
                  <motion.div 
                    animate={{ scale: [1, 1.1, 1] }} 
                    transition={{ repeat: Infinity, duration: 3 }}
                    className="w-24 h-24 bg-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-10 shadow-2xl shadow-emerald-500/20"
                  >
                     <Mic className="w-12 h-12" />
                  </motion.div>
                  <h3 className="text-3xl font-black tracking-tight mb-4 uppercase">Just speak, <br/>no typing needed</h3>
                  <p className="text-emerald-400 font-black uppercase tracking-widest text-[10px]">Supports local languages</p>
               </motion.div>
            </div>
         </div>
      </section>

      {/* FINAL CTA (RULE #10) */}
      <section className="py-24 bg-white border-t border-slate-100">
         <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tighter mb-6 uppercase">Start your health check now</h2>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-sm mb-12">Take the first step towards better health today.</p>
            <button 
              onClick={() => navigate('/intro')}
              className="px-16 py-8 bg-emerald-600 text-white rounded-full font-black uppercase tracking-[0.3em] text-lg shadow-2xl shadow-emerald-200 hover:scale-105 active:scale-95 transition-all"
            >
               Get Started
            </button>
         </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-50 py-12 border-t border-slate-100 text-center font-black uppercase text-[10px] text-slate-300 tracking-[0.4em]">
         <p>© 2026 SwasthAI Guardian · Rural Health Sovereignty</p>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes pulse-red {
          0% { box-shadow: 0 0 0 0 rgba(220, 38, 38, 0.4); }
          70% { box-shadow: 0 0 0 20px rgba(220, 38, 38, 0); }
          100% { box-shadow: 0 0 0 0 rgba(220, 38, 38, 0); }
        }
        .pulse-button {
          animation: pulse-red 2s infinite;
        }
      ` }} />
    </div>
  );
}
