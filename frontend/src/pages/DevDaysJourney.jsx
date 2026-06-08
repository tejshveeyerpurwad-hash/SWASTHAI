import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BrainCircuit, WifiOff, Globe, Github, Activity, HeartPulse,
  Cpu, Brain, Sparkles, HardDrive, Users, Lock, Webhook,
  Database, Zap, Smartphone, AppWindow, BookOpen, TrendingUp,
  Languages, Mic, Map, Eye, Menu, Smile, GitBranch, Code,
  FileText, GitMerge, GitCommit, Code2, UserCheck, Terminal, Book,
  BarChart3, Crosshair, Stethoscope, ShieldCheck, Heart, ArrowRight,
  Server
} from 'lucide-react';
import Navbar from '../components/Navbar';


const DevDaysJourney = () => {
  const [activeStage, setActiveStage] = useState(0);

  const architectureStages = [
    {
      id: 0,
      title: "User Tiers & Client Access",
      subtitle: "Villager / NGO / Admin Interfaces",
      tech: "React 18 / Lucide",
      icon: Users,
      color: "from-emerald-500 to-teal-500",
      layers: ["Voice Processing Layer"],
      logs: [
        " Villager voice input: 'Bukhar aur sir dard hai...'",
        " STT Node: Transcribing audio into text...",
        " Language detected: Hindi (hi)",
        " Routing query to Frontend Controller..."
      ]
    },
    {
      id: 1,
      title: "React + Vite Frontend (PWA)",
      subtitle: "Offline First User Client",
      tech: "Vite / Workbox / Tailwind",
      icon: Smartphone,
      color: "from-blue-500 to-indigo-500",
      layers: ["Offline PWA Layer", "Voice Processing Layer"],
      logs: [
        " Service Worker: Intercepting fetch requests...",
        " Cache status: HIT (core UI assets served offline)",
        " Network status: DEGRADED (Switching to edge fallback)",
        " Local Storage: Synced local health logs cache"
      ]
    },
    {
      id: 2,
      title: "Node.js + Express Backend",
      subtitle: "API Gateway & Security Proxy",
      tech: "Express / JWT / bcryptjs",
      icon: Server,
      color: "from-purple-500 to-pink-500",
      layers: ["Authentication Layer"],
      logs: [
        " POST /api/auth/login-otp - 200 OK",
        " JWT: Issued 7-day token for ASHA worker (NGO)",
        " DISHA Validator: Consent flag found in payload",
        " CORS: Origin http://localhost:5173 authorized"
      ]
    },
    {
      id: 3,
      title: "FastAPI AI Service",
      subtitle: "Algorithmic Diagnostic Engine",
      tech: "FastAPI / PyTorch / Groq",
      icon: BrainCircuit,
      color: "from-amber-500 to-orange-500",
      layers: ["Sakhi RAG Engine", "Disease Prediction Engine", "Outbreak Detection Agent"],
      logs: [
        " PyTorch: SymptomNet neural confidence score: 0.88",
        " Prediction: 'Viral Fever' (Neural verification PASSED)",
        " RAG matching: Cosine similarity 0.76 with WHO Reproductive Health Chunks",
        " Outbreak Agent: 5 cases of Cholera detected in village ID: 412"
      ]
    },
    {
      id: 4,
      title: "SQLite Database",
      subtitle: "Offline-First Healthcare Storage",
      tech: "SQLite",
      icon: Database,
      color: "from-rose-500 to-red-500",
      layers: [],
      logs: [
        " SQLite: Active journal mode: WAL",
        " Query: SELECT * FROM symptoms WHERE villageId = 'v101'",
        " Index scan: idx_symptoms_villageId - COST: 0.01",
        " Transaction: Write completed (WAL checkpoint passed)"
      ]
    }
  ];
  // Animation presets
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    }
  };

  const timelineMilestones = [
    {
      num: 1,
      title: "Core Platform Architecture",
      icon: Cpu,
      color: "from-emerald-500 to-teal-500",
      bgLight: "bg-emerald-50/50",
      items: ["React Frontend", "Express Backend", "FastAPI AI Service"],
      desc: "Constructed the high-performance unified full-stack system designed to operate with high availability and minimal network overhead."
    },
    {
      num: 2,
      title: "AI Healthcare Engine",
      icon: Brain,
      color: "from-blue-500 to-indigo-500",
      bgLight: "bg-blue-50/50",
      items: ["Disease Prediction", "Symptom Intelligence", "Rural Health Analytics"],
      desc: "Engineered localized diagnostic model integrations delivering fast inference on rural medical concerns and regional analytics."
    },
    {
      num: 3,
      title: "Sakhi Women's Health AI",
      icon: Sparkles,
      color: "from-purple-500 to-pink-500",
      bgLight: "bg-purple-50/50",
      items: ["Grounded RAG", "Clinical Knowledge Base", "Voice Assistance"],
      desc: "Built a dedicated, highly private maternal and women's health voice companion using clinical guidance documents and offline RAG context."
    },
    {
      num: 4,
      title: "Offline First Optimization",
      icon: HardDrive,
      color: "from-amber-500 to-orange-500",
      bgLight: "bg-amber-50/50",
      items: ["PWA Support", "Local Caching", "Network Resilience"],
      desc: "Integrated Progressive Web App service workers and aggressive edge caching to maintain complete symptom checking offline."
    },
    {
      num: 5,
      title: "Multi-Role Ecosystem",
      icon: Users,
      color: "from-teal-500 to-cyan-500",
      bgLight: "bg-teal-50/50",
      items: ["Villager Dashboard", "NGO Dashboard", "Admin Dashboard"],
      desc: "Engineered customized dashboards tailored to distinct stakeholders, streamlining district health tracking and citizen reporting."
    },
    {
      num: 6,
      title: "Security & Compliance",
      icon: Lock,
      color: "from-rose-500 to-red-500",
      bgLight: "bg-rose-50/50",
      items: ["JWT Authentication", "Role Based Access", "Consent Framework"],
      desc: "Secured transmission protocols and integrated an audit-ready national clinical data consent system complying with DISHA requirements."
    }
  ];

  const techImprovements = [
    { title: "AI Service Optimization", icon: Cpu, desc: "Refactored python model loading to execute lazily, resulting in minimal initialization lag and optimal serverless memory footprint." },
    { title: "API Improvements", icon: Webhook, desc: "Standardized all API payloads and errors using structured responses, reducing interface communication payload sizes by 40%." },
    { title: "Database Improvements", icon: Database, desc: "Implemented smart composite indexing and transactional isolation levels to ensure conflict-free synchronization." },
    { title: "Performance Optimization", icon: Zap, desc: "Leveraged hardware-accelerated code and tree-shaking frontend modules to achieve high Google Lighthouse scores." },
    { title: "Responsive Design", icon: Smartphone, desc: "Used mobile-first grid systems to support layout flows seamlessly across varied resolution devices." },
    { title: "Mobile Experience", icon: AppWindow, desc: "Eliminated tap delays and optimized gestures to support smooth interactions even on entry-level Android devices." }
  ];

  const aiImprovements = [
    { title: "Hybrid Disease Prediction", icon: HeartPulse, desc: "Blends on-device decision-trees with server-side LLMs to provide dynamic clinical prediction paths." },
    { title: "Sakhi RAG Engine", icon: BookOpen, desc: "Grounds conversational responses strictly within authenticated clinical books to eliminate model hallucinations." },
    { title: "Outbreak Detection", icon: TrendingUp, desc: "Aggregates symptoms dynamically on NGO maps to identify spatial infection clusters before they expand." },
    { title: "Multilingual Support", icon: Languages, desc: "Performs real-time local translation of diagnostic prompts into 6 regional Indian languages." },
    { title: "Voice Interaction", icon: Mic, desc: "Applies speech-to-text adapters allowing villagers to describe symptoms vocally in their local tongue." }
  ];

  const uiImprovements = [
    { title: "Rural Friendly Design", icon: Map, desc: "Employs high-contrast typography, descriptive illustrations, and minimal text to ensure intuitive operation." },
    { title: "Accessibility", icon: Eye, desc: "Adheres to WCAG 2.1 guidelines including high color-contrast ratios and screen-reader friendly label tags." },
    { title: "Mobile Optimization", icon: Smartphone, desc: "Engineered single-handed bottom navigators and quick-action thumbs areas for high mobile comfort." },
    { title: "Improved Navigation", icon: Menu, desc: "Streamlined hierarchical page routing into a consolidated role-aware navigation flow." },
    { title: "Better User Experience", icon: Smile, desc: "Polished response loaders and confirmation states to build patient trust and reduce interaction anxiety." }
  ];

  const githubWorkflows = [
    { title: "Version Control", icon: GitBranch, desc: "Enforced semantic branch structures and modular pull requests to maintain clear project codebases." },
    { title: "Feature Development", icon: Code, desc: "Utilized strict sandbox-driven prototyping to iterate and validate user-stories without regressions." },
    { title: "Documentation Updates", icon: FileText, desc: "Maintained clear markdown records of system endpoints, schema models, and deploy workflows." },
    { title: "Continuous Improvements", icon: GitMerge, desc: "Adopted automated lint checking and integration pipelines to guarantee production-ready code." }
  ];

  const stats = [
    { label: "Commits", value: "70+", icon: GitCommit, color: "text-emerald-600 bg-emerald-50" },
    { label: "Contributors", value: "2", icon: Users, color: "text-blue-600 bg-blue-50" },
    { label: "Languages", value: "JS + Python", icon: Code2, color: "text-purple-600 bg-purple-50" },
    { label: "Roles", value: "3", icon: UserCheck, color: "text-amber-600 bg-amber-50" },
    { label: "Supported Languages", value: "6", icon: Globe, color: "text-teal-600 bg-teal-50" }
  ];

  const docImprovements = [
    { title: "README Enhancement", icon: FileText, desc: "Reformatted setup guides, added features summaries, and introduced architectural graphics for instant clarity." },
    { title: "Architecture Documentation", icon: Map, desc: "Visualized flow mechanics across layers, describing edge synchronization, offline fallbacks, and backend API routing." },
    { title: "Setup Guides", icon: Terminal, desc: "Created copy-paste instructions for spinning up frontend, API gateway, and model services locally." },
    { title: "Feature Documentation", icon: Book, desc: "Authored detailed guides explaining maternal nutrition metrics, skin model thresholds, and ambulance routing logic." }
  ];

  const roadmapItems = [
    { title: "Advanced Rural Analytics", icon: BarChart3, desc: "Integrating predictive models to forecast seasonal disease outbreaks based on real-time villager telemetry." },
    { title: "Healthcare Expansion", icon: Crosshair, desc: "Onboarding telemedicine connectivity to connect local health workers with remote district specialist consultants." },
    { title: "Smart Diagnostics", icon: Stethoscope, desc: "Expanding visual diagnostic capabilities to support early screening of nutritional deficiencies via cameras." },
    { title: "Wider Regional Deployment", icon: Globe, desc: "Extending custom dialect translation mapping and building offline networks across three additional Indian states." }
  ];

  const impactMetrics = [
    { title: "AI Driven Healthcare", value: "Clinically Grounded", desc: "Diagnostic intelligence built to empower remote rural health workers with immediate medical assessment support.", icon: Activity },
    { title: "Offline First Access", value: "Zero Connection Ready", desc: "Allows full diagnostic functionality deep inside signal-degraded zones without data costs.", icon: WifiOff },
    { title: "Multi Language Support", value: "6 Regional Tongues", desc: "Removes literacy barriers by translating advanced clinical insights into conversational vernacular.", icon: Languages },
    { title: "Community Health Empowerment", value: "Sovereignty & Security", desc: "Puts patient data custody and emergency tools in local hands, bolstering grassroot community resilience.", icon: Heart }
  ];

  return (
    <div className="bg-[#F8FAFC] min-h-screen text-slate-800 font-inter relative overflow-hidden">
      <Navbar />
      {/* Decorative Blur Orbs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-200/30 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute top-[20%] right-1/4 w-[600px] h-[600px] bg-blue-200/20 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-[20%] left-1/3 w-[500px] h-[500px] bg-purple-200/20 rounded-full blur-[100px] pointer-events-none -z-10" />

      {/* HERO SECTION */}
      <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 px-4 max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          <span className="px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-black uppercase tracking-widest mb-6">
            GitHub DevDays Hackathon Showcase
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-slate-900 tracking-tighter leading-tight max-w-5xl mb-6">
            GitHub DevDays <br/>
            <span className="text-emerald-600 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 bg-clip-text text-transparent">
              Development Journey
            </span>
          </h1>
          <p className="text-base md:text-xl text-slate-500 font-medium max-w-3xl leading-relaxed mb-10">
            Building AI-powered rural healthcare infrastructure for Bharat through rapid innovation, open-source collaboration, and AI-assisted development.
          </p>

          {/* Badges */}
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl">
            {[
              { text: "AI Powered", icon: BrainCircuit, color: "bg-purple-50 text-purple-700 border-purple-200" },
              { text: "Offline First", icon: WifiOff, color: "bg-blue-50 text-blue-700 border-blue-200" },
              { text: "Multilingual", icon: Globe, color: "bg-teal-50 text-teal-700 border-teal-200" },
              { text: "Open Source", icon: Github, color: "bg-slate-50 text-slate-700 border-slate-200" },
              { text: "Healthcare Innovation", icon: Activity, color: "bg-emerald-50 text-emerald-700 border-emerald-200" }
            ].map((badge, idx) => (
              <motion.div
                key={badge.text}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className={`flex items-center gap-2 px-4 py-2 rounded-2xl border text-xs font-black uppercase tracking-wide shadow-sm hover:scale-105 transition-transform ${badge.color}`}
              >
                <badge.icon className="w-4 h-4" />
                {badge.text}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* TIMELINE SECTION */}
      <section className="py-20 bg-white border-y border-slate-100 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase mb-4">
              Development Milestones
            </h2>
            <div className="h-1.5 w-24 bg-emerald-600 mx-auto rounded-full" />
            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs mt-4">
              Chronological progress through the rapid development phase
            </p>
          </div>

          <div className="relative border-l-2 border-slate-100 md:border-l-0 md:grid md:grid-cols-2 md:gap-x-12 md:gap-y-16 pl-6 md:pl-0 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-slate-100 md:before:left-1/2 md:before:-translate-x-1/2">
            {timelineMilestones.map((milestone, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <motion.div
                  key={milestone.title}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                  className={`relative mb-12 md:mb-0 ${isEven ? 'md:text-right md:pr-6' : 'md:col-start-2 md:pl-6'}`}
                >
                  {/* Circle dot marker */}
                  <div className="absolute -left-[35px] top-6 w-7 h-7 bg-white border-4 border-emerald-500 rounded-full flex items-center justify-center z-10 md:left-auto md:right-auto md:left-1/2 md:-translate-x-1/2">
                    <span className="text-[10px] font-bold text-emerald-600">{milestone.num}</span>
                  </div>

                  {/* Card Container */}
                  <div className="bg-slate-50 border border-slate-100 rounded-[2rem] p-6 hover:shadow-xl hover:shadow-slate-100 hover:border-emerald-100 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
                    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${milestone.color} opacity-5 group-hover:opacity-10 rounded-bl-full transition-opacity duration-300`} />
                    
                    <div className={`flex items-center gap-3 mb-4 ${isEven ? 'md:flex-row-reverse' : ''}`}>
                      <div className={`p-3 rounded-2xl bg-gradient-to-br ${milestone.color} text-white shadow-md`}>
                        <milestone.icon className="w-5 h-5" />
                      </div>
                      <h3 className="text-xl font-black text-slate-900 tracking-tight">
                        {milestone.title}
                      </h3>
                    </div>

                    <p className="text-sm font-medium text-slate-500 mb-6 leading-relaxed">
                      {milestone.desc}
                    </p>

                    <div className={`flex flex-wrap gap-2 ${isEven ? 'md:justify-end' : ''}`}>
                      {milestone.items.map(item => (
                        <span 
                          key={item} 
                          className="px-3 py-1 bg-white border border-slate-200 text-slate-600 text-[10px] font-black uppercase tracking-wider rounded-xl"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* VISUAL ARCHITECTURE PIPELINE */}
      <section className="py-20 bg-slate-50 border-b border-slate-100 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-emerald-600 font-black uppercase tracking-[0.2em] text-xs">
              System Topography
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase mt-2 mb-4">
              Full-Stack Resilient Architecture
            </h2>
            <div className="h-1.5 w-24 bg-emerald-600 mx-auto rounded-full" />
            <p className="text-slate-500 font-medium max-w-2xl mx-auto mt-4 text-sm md:text-base">
              A high-availability, layered health data flow designed for extreme rural operational resilience, voice-directed UI access, and local AI capabilities.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Flow track (Interactive Tiers) */}
            <div className="lg:col-span-5 flex flex-col gap-4 relative">
              {/* Vertical connecting line */}
              <div className="absolute left-8 top-12 bottom-12 w-0.5 bg-slate-200 pointer-events-none hidden sm:block" />

              {architectureStages.map((stage, idx) => {
                const IsActive = activeStage === stage.id;
                return (
                  <motion.div
                    key={stage.title}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setActiveStage(stage.id)}
                    className={`p-6 rounded-[2rem] border transition-all duration-305 cursor-pointer flex gap-4 items-start relative sm:pl-16 ${
                      IsActive
                        ? "bg-white border-emerald-500 shadow-xl shadow-emerald-500/5 ring-1 ring-emerald-500/20"
                        : "bg-slate-50/50 border-slate-100 hover:bg-white hover:border-slate-300"
                    }`}
                  >
                    {/* Circle timeline indicator */}
                    <div className={`absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-2 flex items-center justify-center z-10 transition-colors duration-300 hidden sm:flex ${
                      IsActive 
                        ? "bg-emerald-600 border-emerald-600 text-white shadow-lg shadow-emerald-500/30" 
                        : "bg-white border-slate-200 text-slate-400"
                    }`}>
                      <span className="text-xs font-bold">{idx + 1}</span>
                    </div>

                    <div className={`p-3 rounded-2xl bg-gradient-to-br ${stage.color} text-white shadow-md`}>
                      <stage.icon className="w-5 h-5" />
                    </div>

                    <div className="space-y-1 flex-1">
                      <div className="flex justify-between items-start flex-wrap gap-2">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          {stage.tech}
                        </span>
                        {IsActive && (
                          <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[8px] font-black uppercase tracking-wider rounded-md">
                            Active Stream
                          </span>
                        )}
                      </div>
                      <h3 className="text-base font-black text-slate-900 tracking-tight leading-tight">
                        {stage.title}
                      </h3>
                      <p className="text-xs font-semibold text-slate-500">
                        {stage.subtitle}
                      </p>
                    </div>
                    {IsActive && (
                      <div className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 text-emerald-500 font-bold">
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Right Terminal Console (Stage Details) */}
            <div className="lg:col-span-7 flex flex-col">
              <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-6 sm:p-8 text-slate-100 flex flex-col justify-between shadow-2xl relative overflow-hidden flex-1 group min-h-[480px]">
                {/* Decorative background grid */}
                <div className="absolute inset-0 bg-[radial-gradient(rgba(16,185,129,0.05)_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

                {/* Console header */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6 relative z-10">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500" />
                    <span className="w-3 h-3 rounded-full bg-amber-500" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500" />
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">
                      swasthai-telemetry-proxy
                    </span>
                  </div>
                  <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[9px] font-black uppercase tracking-widest rounded-full">
                    status: operational
                  </span>
                </div>

                {/* Console Content */}
                <div className="space-y-6 relative z-10 flex-1 flex flex-col justify-between">
                  <div className="space-y-4">
                    <h3 className="text-xl font-black text-white tracking-tight uppercase">
                      {architectureStages[activeStage].title}
                    </h3>
                    <p className="text-sm font-semibold text-emerald-400">
                      {architectureStages[activeStage].subtitle}
                    </p>
                  </div>

                  {/* Grid of requested architecture layers */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Voice Processing Layer */}
                    <div className={`p-4 rounded-2xl border transition-all duration-300 ${
                      architectureStages[activeStage].layers.includes("Voice Processing Layer")
                        ? "bg-emerald-950/35 border-emerald-500/40 text-emerald-100 shadow-lg shadow-emerald-500/5"
                        : "bg-slate-950/40 border-slate-850/80 text-slate-600"
                    }`}>
                      <div className="flex items-center gap-2 mb-1.5">
                        <Mic className={`w-4.5 h-4.5 ${architectureStages[activeStage].layers.includes("Voice Processing Layer") ? "text-emerald-400" : "text-slate-650"}`} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Voice Processing Layer</span>
                      </div>
                      <p className="text-[10px] font-semibold leading-relaxed">
                        Provides multilingual speech synthesis and speech-to-text transcriptions on-device.
                      </p>
                    </div>

                    {/* Offline PWA Layer */}
                    <div className={`p-4 rounded-2xl border transition-all duration-300 ${
                      architectureStages[activeStage].layers.includes("Offline PWA Layer")
                        ? "bg-blue-950/35 border-blue-500/40 text-blue-100 shadow-lg shadow-blue-500/5"
                        : "bg-slate-950/40 border-slate-850/80 text-slate-600"
                    }`}>
                      <div className="flex items-center gap-2 mb-1.5">
                        <WifiOff className={`w-4.5 h-4.5 ${architectureStages[activeStage].layers.includes("Offline PWA Layer") ? "text-blue-400" : "text-slate-655"}`} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Offline PWA Layer</span>
                      </div>
                      <p className="text-[10px] font-semibold leading-relaxed">
                        Forces complete page offline viability using Workbox service worker caching.
                      </p>
                    </div>

                    {/* Authentication Layer */}
                    <div className={`p-4 rounded-2xl border transition-all duration-300 ${
                      architectureStages[activeStage].layers.includes("Authentication Layer")
                        ? "bg-purple-950/35 border-purple-500/40 text-purple-100 shadow-lg shadow-purple-500/5"
                        : "bg-slate-950/40 border-slate-850/80 text-slate-600"
                    }`}>
                      <div className="flex items-center gap-2 mb-1.5">
                        <Lock className={`w-4.5 h-4.5 ${architectureStages[activeStage].layers.includes("Authentication Layer") ? "text-purple-400" : "text-slate-655"}`} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Authentication Layer</span>
                      </div>
                      <p className="text-[10px] font-semibold leading-relaxed">
                        Guarantees role-restricted API access with token validations and crypt passes.
                      </p>
                    </div>

                    {/* Sakhi RAG Engine */}
                    <div className={`p-4 rounded-2xl border transition-all duration-300 ${
                      architectureStages[activeStage].layers.includes("Sakhi RAG Engine")
                        ? "bg-amber-950/35 border-amber-500/40 text-amber-100 shadow-lg shadow-amber-500/5"
                        : "bg-slate-950/40 border-slate-850/80 text-slate-600"
                    }`}>
                      <div className="flex items-center gap-2 mb-1.5">
                        <Sparkles className={`w-4.5 h-4.5 ${architectureStages[activeStage].layers.includes("Sakhi RAG Engine") ? "text-amber-400" : "text-slate-655"}`} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Sakhi RAG Engine</span>
                      </div>
                      <p className="text-[10px] font-semibold leading-relaxed">
                        Locks AI outputs strictly inside clinical modules via RAG similarity searches.
                      </p>
                    </div>

                    {/* Disease Prediction Engine */}
                    <div className={`p-4 rounded-2xl border transition-all duration-300 ${
                      architectureStages[activeStage].layers.includes("Disease Prediction Engine")
                        ? "bg-orange-950/35 border-orange-500/40 text-orange-100 shadow-lg shadow-orange-500/5"
                        : "bg-slate-950/40 border-slate-850/80 text-slate-600"
                    }`}>
                      <div className="flex items-center gap-2 mb-1.5">
                        <BrainCircuit className={`w-4.5 h-4.5 ${architectureStages[activeStage].layers.includes("Disease Prediction Engine") ? "text-orange-400" : "text-slate-655"}`} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Disease Prediction Engine</span>
                      </div>
                      <p className="text-[10px] font-semibold leading-relaxed">
                        Combines Transformer embeddings with random forest safety backup models.
                      </p>
                    </div>

                    {/* Outbreak Detection Agent */}
                    <div className={`p-4 rounded-2xl border transition-all duration-300 ${
                      architectureStages[activeStage].layers.includes("Outbreak Detection Agent")
                        ? "bg-rose-950/35 border-rose-500/40 text-rose-100 shadow-lg shadow-rose-500/5"
                        : "bg-slate-950/40 border-slate-850/80 text-slate-600"
                    }`}>
                      <div className="flex items-center gap-2 mb-1.5">
                        <TrendingUp className={`w-4.5 h-4.5 ${architectureStages[activeStage].layers.includes("Outbreak Detection Agent") ? "text-rose-400" : "text-slate-655"}`} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Outbreak Detection Agent</span>
                      </div>
                      <p className="text-[10px] font-semibold leading-relaxed">
                        Performs automated telemetry analytics every 30 minutes to detect infection nodes.
                      </p>
                    </div>
                  </div>

                  {/* Simulated Telemetry Log Console */}
                  <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800/80 font-mono text-[10px] text-slate-400 space-y-1.5 overflow-hidden">
                    <div className="flex items-center justify-between text-slate-600 border-b border-slate-900 pb-1 mb-2 font-black uppercase tracking-widest text-[8px]">
                      <span>Live Terminal Activity</span>
                      <span className="animate-pulse text-emerald-500">● Live</span>
                    </div>
                    {architectureStages[activeStage].logs.map((log, idx) => (
                      <div key={idx} className="flex gap-2 items-start">
                        <span className="text-emerald-500 shrink-0 select-none">➜</span>
                        <span className="break-all">{log}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TECHNICAL IMPROVEMENTS */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-emerald-600 font-black uppercase tracking-[0.2em] text-xs">
            Infrastructure & Core Stack
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase mt-2 mb-4">
            Technical Improvements
          </h2>
          <div className="h-1.5 w-24 bg-emerald-600 mx-auto rounded-full" />
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {techImprovements.map((tech) => (
            <motion.div
              key={tech.title}
              variants={itemVariants}
              className="p-8 bg-white border border-slate-100 rounded-[2rem] shadow-sm hover:shadow-2xl hover:shadow-slate-200/50 hover:border-emerald-100 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <tech.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-slate-900 tracking-tight mb-3">
                  {tech.title}
                </h3>
                <p className="text-sm font-medium text-slate-500 leading-relaxed">
                  {tech.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* AI IMPROVEMENTS */}
      <section className="py-20 bg-slate-900 text-white border-y border-slate-800 px-4 relative">
        <div className="absolute inset-0 bg-emerald-950/20 pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <span className="text-emerald-400 font-black uppercase tracking-[0.2em] text-xs">
              Algorithmic Innovation
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase mt-2 mb-4">
              AI Improvements
            </h2>
            <div className="h-1.5 w-24 bg-emerald-500 mx-auto rounded-full" />
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {aiImprovements.map((ai) => (
              <motion.div
                key={ai.title}
                variants={itemVariants}
                className="p-8 bg-emerald-950/30 backdrop-blur-md border border-emerald-900/40 rounded-[2.5rem] hover:border-emerald-500/50 hover:bg-emerald-950/50 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <ai.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-black text-emerald-50 tracking-tight mb-3">
                    {ai.title}
                  </h3>
                  <p className="text-sm font-medium text-slate-400 leading-relaxed">
                    {ai.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* UI/UX IMPROVEMENTS */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-emerald-600 font-black uppercase tracking-[0.2em] text-xs">
            Human Centered Design
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase mt-2 mb-4">
            UI/UX Improvements
          </h2>
          <div className="h-1.5 w-24 bg-emerald-600 mx-auto rounded-full" />
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {uiImprovements.map((ui) => (
            <motion.div
              key={ui.title}
              variants={itemVariants}
              className="p-8 bg-white border border-slate-100 rounded-[2rem] shadow-sm hover:shadow-2xl hover:shadow-slate-200/50 hover:border-emerald-100 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <ui.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-slate-900 tracking-tight mb-3">
                  {ui.title}
                </h3>
                <p className="text-sm font-medium text-slate-500 leading-relaxed">
                  {ui.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* GITHUB WORKFLOW & STATS */}
      <section className="py-20 bg-slate-50 border-y border-slate-100 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-emerald-600 font-black uppercase tracking-[0.2em] text-xs">
              Collaboration & Standards
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase mt-2 mb-4">
              GitHub Development Workflow
            </h2>
            <div className="h-1.5 w-24 bg-emerald-600 mx-auto rounded-full" />
          </div>

          {/* Dynamic Statistics Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-16"
          >
            {stats.map((stat, idx) => (
              <div 
                key={stat.label}
                className="bg-white border border-slate-200/60 rounded-3xl p-6 text-center hover:shadow-lg transition-shadow duration-300 flex flex-col items-center justify-center"
              >
                <div className={`p-3 rounded-2xl ${stat.color} mb-3`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <span className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                  {stat.value}
                </span>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>

          {/* Workflow Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {githubWorkflows.map((flow) => (
              <div
                key={flow.title}
                className="bg-white border border-slate-100 rounded-3xl p-6 hover:shadow-xl hover:border-emerald-100 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 bg-slate-100 text-slate-700 rounded-xl flex items-center justify-center mb-4">
                    <flow.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-black text-slate-900 tracking-tight mb-2">
                    {flow.title}
                  </h3>
                  <p className="text-xs font-semibold text-slate-500 leading-relaxed">
                    {flow.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DOCUMENTATION IMPROVEMENTS */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-emerald-600 font-black uppercase tracking-[0.2em] text-xs">
            Knowledge Base
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase mt-2 mb-4">
            Documentation Improvements
          </h2>
          <div className="h-1.5 w-24 bg-emerald-600 mx-auto rounded-full" />
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {docImprovements.map((doc) => (
            <motion.div
              key={doc.title}
              variants={itemVariants}
              className="p-6 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-xl hover:border-emerald-100 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="w-10 h-10 bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <doc.icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-black text-slate-900 tracking-tight mb-2">
                  {doc.title}
                </h3>
                <p className="text-xs font-semibold text-slate-500 leading-relaxed">
                  {doc.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* FUTURE ROADMAP */}
      <section className="py-20 bg-emerald-950 text-white px-4 relative">
        <div className="absolute inset-0 bg-[radial-gradient(at_0%_0%,rgba(16,185,129,0.1)_0,transparent_50%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <span className="text-emerald-400 font-black uppercase tracking-[0.2em] text-xs">
              Vision & Beyond
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase mt-2 mb-4">
              Future Roadmap
            </h2>
            <div className="h-1.5 w-24 bg-emerald-500 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {roadmapItems.map((road, idx) => (
              <motion.div
                key={road.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="p-6 bg-emerald-900/20 backdrop-blur-sm border border-emerald-800/40 rounded-[2rem] hover:border-emerald-500/50 hover:bg-emerald-900/30 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 bg-emerald-500/10 text-emerald-400 rounded-xl flex items-center justify-center mb-4">
                    <road.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-black text-emerald-100 tracking-tight mb-2">
                    {road.title}
                  </h3>
                  <p className="text-xs font-semibold text-emerald-300/80 leading-relaxed">
                    {road.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL IMPACT SECTION */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-emerald-600 font-black uppercase tracking-[0.2em] text-xs">
            Mission Fulfilled
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase mt-2 mb-4">
            Final Impact
          </h2>
          <div className="h-1.5 w-24 bg-emerald-600 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {impactMetrics.map((metric, idx) => (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.6 }}
              className="p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm hover:shadow-2xl hover:shadow-slate-200/50 hover:border-emerald-100 transition-all duration-500 flex gap-6 items-start group"
            >
              <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-600 shrink-0 group-hover:scale-110 transition-transform">
                <metric.icon className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">
                  {metric.value}
                </span>
                <h3 className="text-xl font-black text-slate-900 tracking-tight">
                  {metric.title}
                </h3>
                <p className="text-sm font-medium text-slate-500 leading-relaxed">
                  {metric.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action Box */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 p-8 md:p-12 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-[3rem] text-white text-center relative overflow-hidden shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />
          <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tight mb-4">
            Advancing Bharat's Healthcare Sovereignty
          </h3>
          <p className="text-sm md:text-base text-emerald-50/80 max-w-2xl mx-auto font-medium mb-8">
            Providing digital equity and clinical access where it is needed most. Explore the full suite of SwasthAI Guardian tools today.
          </p>
          <div className="flex justify-center">
            <a 
              href="/home" 
              className="px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-full font-black uppercase text-xs tracking-[0.2em] shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3"
            >
              Enter Dashboard <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default DevDaysJourney;
