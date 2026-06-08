import React, { useState } from "react";
import { ArrowRight, Terminal, GraduationCap, Code2, ShieldAlert, CheckSquare } from "lucide-react";
import Reveal from "./Reveal";

interface PublicTrainingProps {
  onShowNotification: (msg: string) => void;
  onInitialize: () => void;
  mouseCoords: { x: number; y: number };
}

export default function PublicTraining({ onShowNotification, onInitialize, mouseCoords }: PublicTrainingProps) {
  const [cohortName, setCohortName] = useState<string>("");
  const [cohortSubmitted, setCohortSubmitted] = useState<boolean>(false);

  const foundationCurriculum = [
    "SYSTEM_ARCHITECTURE_BASIC",
    "RUST_MEMORY_SAFETY_MODELS",
    "DISTRIBUTED_DATA_CONSENSUS",
    "LINUX_KERNEL_OPTIMIZATION"
  ];

  const pressureCurriculum = [
    "HIGH_CONCURRENCY_LOAD_TESTING",
    "FAULT_TOLERANT_SYSTEM_DESIGN",
    "NETWORK_LATENCY_REDUCTION",
    "CRYPTOGRAPHIC_SECURITY_STORES"
  ];

  const outcomeCurriculum = [
    "STAFF_ENGINEER_TRAINEE",
    "SECURITY_PROTOCOL_OFFICER",
    "CORE_INFRASTRUCTURE_BUILDER",
    "CONTRACT_INTEGRITY_AUDITOR"
  ];

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cohortName) {
      onShowNotification("Please insert full candidate name for indexing.");
      return;
    }
    setCohortSubmitted(true);
    onShowNotification(`Candidate ${cohortName} registered for Cohort IV screening. [NOMINAL]`);
  };

  return (
    <div className="relative">
      <div className="absolute inset-0 blueprint-grid opacity-10 z-0"></div>

      <div className="relative z-10 px-6 md:px-16 pt-12 pb-32 max-w-7xl mx-auto space-y-32">
        
        {/* Training Hero Section */}
        <Reveal as="section" className="grid grid-cols-12 gap-8 items-center">
          <div className="col-span-12 md:col-span-8 flex flex-col justify-center space-y-6">
            <span className="font-mono text-xs text-secondary-fixed uppercase tracking-[0.2em] block font-bold">
              [ TRAINING_PROTOCOL_2024 ]
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold uppercase text-white leading-none tracking-tight">
              Developer Training <br />& Mentorship
            </h1>
            <p className="text-on-surface-variant font-sans text-base md:text-lg max-w-2xl leading-relaxed">
              We train and mentor software developers through practical, project-based programs that bridge the gap between academic theory and high-end industry delivery. Our best graduates join our own teams — closing the loop between training and delivery.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <a 
                href="#apply-cohort" 
                className="bg-secondary-fixed text-on-secondary px-6 md:px-8 py-4 font-mono text-xs font-bold uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all text-[#002110]"
              >
                Apply for Cohort IV
              </a>
              <button 
                onClick={() => onShowNotification("Fetching Curriculum Matrix in metadata registry... [OK]")}
                className="border border-outline-variant text-on-surface-variant px-6 md:px-8 py-4 font-mono text-xs font-bold uppercase tracking-widest hover:border-secondary-fixed hover:text-white transition-all cursor-pointer background-transparent"
              >
                View Curriculum
              </button>
            </div>
          </div>

          <div className="col-span-12 md:col-span-4 relative border-l border-outline-variant p-6 md:p-8">
            <div className="absolute top-0 right-0 p-4 font-mono text-[9px] text-outline opacity-40 select-none">
              LNRI_SYST_MAP_01
            </div>
            
            <div className="w-full relative overflow-hidden bg-primary-container border border-outline-variant group">
              <img 
                alt="Technical precision server hardware close-up" 
                className="w-full h-auto grayscale opacity-80 border border-outline-variant group-hover:scale-[1.02] transition-transform duration-700" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBRQkPh6_ImpfTPuwj5GqXQHFmel078muxpsGnu-KY17wmgHyVuRGEFNoSgUKLmaxClRmxKkJtC6ViFe3XB2IEKzaDMCS_PAkeNXIPbo4taxtpe6AgSifqchs3LUMjGdzVhmlT3DfyFBnX3BxPQCj6annFC1YvffQsdeLn54oOHn9fzncrb7sNwGeKkdK6Y4rXG5AmITMTm4A8pNqipT9mlNMG-5_XiXE3sx_UcyRPj8z0gtKrFoX3vF-vsQiOo08QjAhmBDeMh28Q"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#101415]/75 to-transparent opacity-60 pointer-events-none"></div>
            </div>
          </div>
        </Reveal>

        {/* The Roadmap Journey Timeline */}
        <Reveal as="section" className="space-y-16">
          <div className="flex justify-between items-end border-b border-outline-variant pb-4">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white uppercase tracking-tight">
              The Developer Journey
            </h2>
            <span className="font-mono text-xs text-outline opacity-60 hidden sm:block">[ PHASE_01_TO_DEPLOY ]</span>
          </div>

          <div className="relative py-12">
            {/* Center Vertical Timeline Line on desktop */}
            <div className="absolute left-[50%] top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[#56ffa8]/40 to-transparent -translate-x-[50%] hidden md:block"></div>

            {/* Container for Steps */}
            <div className="space-y-24 md:space-y-40">
              
              {/* Step 1: Ingestion */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative">
                <div className="col-span-12 md:col-span-5 md:text-right space-y-4">
                  <span className="font-mono text-xs text-secondary-fixed uppercase tracking-wider block font-bold">
                    01_INGESTION
                  </span>
                  <h3 className="text-2xl md:text-3xl font-extrabold text-white uppercase">
                    Hands-on bootcamps
                  </h3>
                  <p className="text-on-surface-variant text-sm md:text-base leading-relaxed max-w-lg md:ml-auto">
                    Mastering internal microservices tooling, memory-safe languages (TypeScript/Rust), and proprietary architectural standards. No shortcuts, just pure structural engineering.
                  </p>
                </div>
                
                {/* Center marker */}
                <div className="col-span-12 md:col-span-2 flex justify-center relative z-10 py-4 md:py-0">
                  <div className="w-14 h-14 bg-[#101415] border border-secondary-fixed/50 flex items-center justify-center rounded-sm">
                    <Terminal className="text-secondary-fixed" size={24} />
                  </div>
                </div>

                {/* Grid spec sheets */}
                <div className="col-span-12 md:col-span-5 p-6 bg-surface-container-low border border-outline-variant">
                  <div className="font-mono text-[10px] text-outline mb-4 flex justify-between items-center bg-surface-container-lowest p-2">
                    <span>CURRICULUM_BLOCK_FOUNDATION</span>
                    <span className="opacity-50">v4.0.2</span>
                  </div>
                  <ul className="font-mono text-xs space-y-2 text-on-tertiary-container pl-2 border-l border-outline-variant">
                    {foundationCurriculum.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <span className="text-secondary-fixed opacity-75">&gt;</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Step 2: Execution */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative">
                <div className="col-span-12 md:col-span-5 order-last md:order-first p-6 bg-surface-container-low border border-outline-variant">
                  <div className="font-mono text-[10px] text-outline mb-4 flex justify-between items-center bg-surface-container-lowest p-2">
                    <span>CURRICULUM_BLOCK_PRESSURE</span>
                    <span className="opacity-50">v4.0.2</span>
                  </div>
                  <ul className="font-mono text-xs space-y-2 text-on-tertiary-container pl-2 border-l border-outline-variant">
                    {pressureCurriculum.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <span className="text-secondary-fixed opacity-75">&gt;</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Center marker */}
                <div className="col-span-12 md:col-span-2 flex justify-center relative z-10 py-4 md:py-0">
                  <div className="w-14 h-14 bg-[#101415] border border-secondary-fixed/50 flex items-center justify-center rounded-sm">
                    <GraduationCap className="text-secondary-fixed" size={24} />
                  </div>
                </div>

                <div className="col-span-12 md:col-span-5 space-y-4">
                  <span className="font-mono text-xs text-secondary-fixed uppercase tracking-wider block font-bold">
                    02_EXECUTION
                  </span>
                  <h3 className="text-2xl md:text-3xl font-extrabold text-white uppercase">
                    Real-world project experience
                  </h3>
                  <p className="text-on-surface-variant text-sm md:text-base leading-relaxed max-w-lg">
                    Building under fire. Candidate developers will manage simulated high-traffic servers and load scenarios where every millisecond of latency represents compliance degradation.
                  </p>
                </div>
              </div>

              {/* Step 3: Integration */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative">
                <div className="col-span-12 md:col-span-5 md:text-right space-y-4">
                  <span className="font-mono text-xs text-secondary-fixed uppercase tracking-wider block font-bold">
                    03_INTEGRATION
                  </span>
                  <h3 className="text-2xl md:text-3xl font-extrabold text-white uppercase">
                    Mentorship from senior engineers
                  </h3>
                  <p className="text-on-surface-variant text-sm md:text-base leading-relaxed max-w-lg md:ml-auto">
                    Graduates don't just "apply" to Lanari Tech; they are integrated directly into our infrastructure. The final assessments feature compiling a live production feature release.
                  </p>
                </div>

                {/* Center marker */}
                <div className="col-span-12 md:col-span-2 flex justify-center relative z-10 py-4 md:py-0">
                  <div className="w-14 h-14 bg-secondary-fixed border border-secondary-fixed flex items-center justify-center rounded-sm shadow-[0_0_20px_rgba(86,255,168,0.25)]">
                    <Code2 className="text-[#002110]" size={24} />
                  </div>
                </div>

                <div className="col-span-12 md:col-span-5 p-6 bg-surface-container-low border border-outline-variant">
                  <div className="font-mono text-[10px] text-outline mb-4 flex justify-between items-center bg-surface-container-lowest p-2">
                    <span>RESULT_PATH_CAREER</span>
                    <span className="opacity-50">ACTIVE_RECRUITMENT</span>
                  </div>
                  <ul className="font-mono text-xs space-y-2 text-on-tertiary-container pl-2 border-l border-outline-variant">
                    {outcomeCurriculum.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <span className="text-secondary-fixed opacity-75">&gt;</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>
          </div>
        </Reveal>

        {/* Bento Stats & Geography integrations */}
        <Reveal as="section" className="bg-surface-container-lowest/50 border border-outline-variant p-6 md:p-12 h-auto space-y-8 architectural-border">
          <div className="grid grid-cols-12 gap-8">
            {/* Kigali HQ large map mockup */}
            <div className="col-span-12 lg:col-span-7 border border-outline-variant p-6 md:p-8 flex flex-col justify-end relative overflow-hidden group min-h-[350px] md:min-h-[450px]">
              <img 
                alt="Minimalist architectural office interior SEZ" 
                className="absolute inset-0 w-full h-full object-cover opacity-25 grayscale group-hover:scale-[1.03] group-hover:opacity-35 transition-all duration-1000" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDWk2wPrCHwZm08k7TPRXTTwlKIbg024ZpAayfC0cJ1WSnQ6OScvBQeC_NvC88mhNXPE14nstweDJ1M-m52vayPf37zjIcEMcCA_RudV9wuFGYsZLlnvpJCdQ192HvtyzdL2XF647QGAjVqoznT4ZYvwKatca0XXY_Vbu2_EMXlitTe-cqA2K6ftW5Gz1mTEv2HFxn5oJFZPHvhCHGgFFQbi-0H--EcRBCduRM4G00iJ2PPm9Jj0ETTRv3Nh-Lqv7q9lX60W21AiNw"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#101415] via-[#101415]/30 to-transparent pointer-events-none"></div>
              
              <div className="relative z-10 pt-20 space-y-4">
                <span className="font-mono text-xs text-secondary-fixed uppercase tracking-widest block font-bold">
                  GEOGRAPHIC_HUB
                </span>
                <h3 className="text-2xl md:text-4xl font-extrabold text-white uppercase leading-tight max-w-sm">
                  Kigali HQ Integration
                </h3>
                <p className="text-on-surface-variant text-sm md:text-base max-w-md font-sans">
                  Train in the heart of the Special Economic Zone (SEZ), directly alongside our senior lead developers in a high-focus studio layout.
                </p>
              </div>
            </div>

            {/* Right side stats blocks vertical stack */}
            <div className="col-span-12 lg:col-span-5 flex flex-col justify-between gap-8">
              
              <div className="grid grid-cols-2 gap-8 flex-grow">
                <div className="border border-outline-variant p-6 bg-surface-container flex flex-col justify-center text-left">
                  <span className="text-4xl md:text-5xl font-extrabold text-secondary-fixed mb-1 font-sans">
                    94%
                  </span>
                  <span className="font-mono text-[10px] text-outline uppercase tracking-widest">
                    Retention Rate
                  </span>
                </div>

                <div className="border border-outline-variant p-6 bg-secondary-fixed flex flex-col justify-center text-left select-none">
                  <span className="text-4xl md:text-5xl font-extrabold text-[#002110] mb-1 font-sans">
                    06
                  </span>
                  <span className="font-mono text-[10px] text-[#00391f] uppercase tracking-widest font-bold">
                    Months Duration
                  </span>
                </div>
              </div>

              <div className="border border-outline-variant p-6 md:p-8 bg-surface-container flex flex-col justify-between h-auto">
                <div>
                  <GraduationCap className="text-secondary-fixed mb-4 stroke-1" size={32} />
                  <h4 className="text-lg md:text-xl font-bold text-white mb-2 uppercase">
                    Career preparation
                  </h4>
                  <p className="text-on-surface-variant text-xs md:text-sm leading-relaxed font-sans">
                    We provide comprehensive career placement preparation with local technology consortia and software partner ecosystems. Every assessment ensures readiness from deployment day one.
                  </p>
                </div>
                
                <div className="pt-6 mt-6 border-t border-outline-variant/30">
                  <button 
                    onClick={() => onShowNotification("Fetching career placement logs registry... [OK]")}
                    className="font-mono text-xs text-secondary-fixed flex items-center gap-2 group hover:gap-4 transition-all uppercase tracking-widest bg-transparent cursor-pointer font-bold border-none"
                  >
                    EXPLORE_BENEFITS <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

            </div>
          </div>
        </Reveal>

        {/* Dynamic Apply Widget form section */}
        <Reveal as="section" id="apply-cohort" className="bg-[#101415] border border-outline-variant py-12 px-6 md:px-16 flex flex-col lg:flex-row items-center justify-between gap-12 architectural-border">
          <div className="max-w-2xl text-center lg:text-left space-y-4">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white uppercase leading-tight">
              Start Your Engineering Lifecycle.
            </h2>
            <p className="text-on-surface-variant font-sans text-sm md:text-base">
              Applications for the Autumn Cohort IV close soon. Ensure your candidate profile is indexed and compiled before the evaluation deadline expires.
            </p>
          </div>

          <div className="w-full lg:w-auto flex flex-col gap-4 items-center">
            {cohortSubmitted ? (
              <div className="bg-surface-container border border-secondary-fixed/50 p-6 text-center max-w-sm">
                <p className="text-secondary-fixed font-mono text-xs uppercase font-bold animate-pulse">
                  Candidate indexing complete [OK]
                </p>
                <p className="text-on-surface-variant text-xs font-sans mt-1">
                  We have queued your registration.
                </p>
              </div>
            ) : (
              <form onSubmit={handleApply} className="flex flex-col sm:flex-row gap-2 w-full max-w-md">
                <input 
                  type="text"
                  required
                  value={cohortName}
                  onChange={(e) => setCohortName(e.target.value)}
                  placeholder="CANDIDATE_NAME..."
                  className="bg-surface-container-low border border-outline-variant text-white font-mono text-xs p-4 rounded-sm outline-none w-full sm:w-60 focus:border-secondary-fixed focus:ring-0"
                />
                <button 
                  type="submit"
                  className="bg-secondary-fixed text-on-secondary px-8 py-4 font-mono text-xs font-bold uppercase tracking-widest cursor-pointer text-[#002110]"
                >
                  Initiate Application
                </button>
              </form>
            )}

            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary-fixed opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-secondary-fixed"></span>
              </span>
              <span className="font-mono text-[10px] text-on-surface-variant uppercase tracking-widest">
                System Status: Recruiting Open
              </span>
            </div>
          </div>
        </Reveal>

      </div>
    </div>
  );
}
