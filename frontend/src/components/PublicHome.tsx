import React, { useState } from "react";
import { ArrowRight, Cpu, Shield, TrendingUp } from "lucide-react";
import Reveal from "./Reveal";

interface PublicHomeProps {
  onInitialize: () => void;
  mouseCoords: { x: number; y: number };
}

export default function PublicHome({ onInitialize, mouseCoords }: PublicHomeProps) {
  const [activeValueIndex, setActiveValueIndex] = useState<number | null>(null);

  const coreValues = [
    { num: "01", name: "EXCELLENCE", desc: "Setting the absolute highest benchmark of digital craftsmanship, type safety, and error prevention." },
    { num: "02", name: "PRACTICALITY", desc: "No larping. We deliver clean, simple, highly operational products tailored to real market constraints." },
    { num: "03", name: "GROWTH", desc: "Accelerating local expertise by integrating elite training bootcamps directly into professional agency pipelines." },
    { num: "04", name: "INTEGRITY", desc: "Standard alignment evaluated at 100%. Faultless code execution and robust security standards." },
    { num: "05", name: "LOCAL IMPACT", desc: "Headquartered in Kigali, Rwanda, to power economic growth and technological sovereignty across Africa." }
  ];

  return (
    <div className="relative">
      {/* Background Interactive Overlays */}
      <div className="absolute inset-0 grid-overlay z-0 pointer-events-none"></div>
      <div 
        className="absolute w-[500px] h-[500px] growth-glow z-0 rounded-full transition-transform duration-300 ease-out pointer-events-none"
        style={{
          transform: `translate(${mouseCoords.x * 25}px, ${mouseCoords.y * 25}px)`,
          left: "35%",
          top: "10%"
        }}
      ></div>

      {/* Subtle Grid Lines for CAD aesthetic */}
      <div className="absolute inset-0 z-0 opacity-15 pointer-events-none">
        <div className="absolute top-0 left-[20%] bottom-0 w-px bg-outline-variant"></div>
        <div className="absolute top-0 left-[40%] bottom-0 w-px bg-outline-variant"></div>
        <div className="absolute top-0 left-[60%] bottom-0 w-px bg-outline-variant"></div>
        <div className="absolute top-0 left-[80%] bottom-0 w-px bg-outline-variant"></div>
        <div className="absolute top-[25%] left-0 right-0 h-px bg-outline-variant"></div>
        <div className="absolute top-[50%] left-0 right-0 h-px bg-outline-variant"></div>
        <div className="absolute top-[75%] left-0 right-0 h-px bg-outline-variant"></div>
      </div>

      <div className="relative z-10 px-6 md:px-16 pt-12 pb-32 max-w-7xl mx-auto space-y-40">
        
        {/* ================= HERO SECTION ================= */}
        <Reveal as="section" className="space-y-10">
          {/* Active State Sub-indicator */}
          <div className="flex items-center gap-4 select-none">
            <span className="font-mono text-xs text-[#16ff9e] uppercase tracking-[0.3em] font-bold">
              SYSTEM_V4.402.0 // #ACTIVE_STATE
            </span>
            <div className="h-[1px] flex-grow bg-outline-variant/40"></div>
          </div>

          {/* Hero Grid Wrapper */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left copy column */}
            <div className="lg:col-span-7 space-y-8">
              <h1 className="font-sans text-4xl md:text-5xl lg:text-7xl font-extrabold uppercase leading-[1.02] tracking-tight text-white">
                BUILDING SOFTWARE. <br />
                BUILDING DEVELOPERS. <br />
                <span className="text-outline-refined block md:inline">BUILDING AFRICA'S</span> <br className="hidden md:inline" />
                <span className="text-gradient-accent font-extrabold tracking-tight drop-shadow-[0_0_15px_rgba(22,255,158,0.2)]">
                  DIGITAL FUTURE
                </span>
              </h1>

              {/* Dynamic Initialization Button row */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-4 select-none">
                <button 
                  onClick={onInitialize}
                  className="bg-[#16ff9e] text-[#002110] px-8 py-4 font-mono text-xs font-bold uppercase tracking-[0.2em] transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-[0_0_20px_rgba(22,255,158,0.25)] hover:bg-[#56ffa8]"
                >
                  INITIALIZE PROTOCOL
                </button>
                <div className="flex items-center gap-2.5 font-mono text-[10px] text-outline uppercase tracking-wider">
                  <span className="w-2.5 h-2.5 bg-[#16ff9e] rounded-full animate-pulse shadow-[0_0_8px_#16ff9e]"></span>
                  <span>WAITING FOR OPERATOR INPUT...</span>
                </div>
              </div>
            </div>

            {/* Right Interactive Graphical Node Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative w-full aspect-[4/3] md:h-[350px] border border-outline-variant bg-surface-container-lowest architectural-border overflow-hidden group">
                {/* Embedded High-tech corridor background visualization with filters */}
                <img 
                  alt="High tech server room visualization" 
                  className="w-full h-full object-cover grayscale contrast-150 brightness-[0.35] group-hover:scale-[1.03] transition-transform duration-1000 ease-out" 
                  src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#101415]/90 via-transparent to-[#101415]/70 pointer-events-none"></div>
                <div className="absolute inset-0 blueprint-accent opacity-20 pointer-events-none"></div>

                {/* Floating badge top-left: System Status metrics */}
                <div className="absolute top-4 left-4 bg-[#101415]/85 border border-outline-variant/60 p-3 font-mono text-[9px] text-[#e0e3e5] space-y-1.5 backdrop-blur-md select-none z-10 min-w-32">
                  <div className="flex justify-between gap-4">
                    <span className="text-outline uppercase">SYSTEM</span> 
                    <span className="text-[#16ff9e] font-bold">100%</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-outline uppercase">LATENCY</span> 
                    <span className="text-[#16ff9e] font-bold">4.8ms</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-outline uppercase">NODES</span> 
                    <span className="text-[#16ff9e] font-bold">1,024</span>
                  </div>
                </div>

                {/* Concentric Target Core visualization in Center */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-36 h-36 rounded-full border border-[#16ff9e]/5 flex items-center justify-center animate-ping [animation-duration:4s]">
                    <div className="w-24 h-24 rounded-full border border-[#16ff9e]/15 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full border border-[#16ff9e]/25 flex items-center justify-center bg-[#101415]/50 backdrop-blur-sm shadow-[0_0_20px_rgba(22,255,158,0.1)]">
                        {/* Custom Central Server Node SVG Icon */}
                        <svg className="w-8 h-8 text-[#16ff9e] [filter:drop-shadow(0_0_6px_#16ff9e)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="3" fill="#16ff9e" />
                          <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12" fill="none" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating badge bottom-right: Uptime & Ping metrics */}
                <div className="absolute bottom-4 right-4 bg-[#101415]/85 border border-outline-variant/60 p-3 font-mono text-[9px] text-[#e0e3e5] space-y-1.5 backdrop-blur-md select-none z-10 min-w-32">
                  <div className="flex justify-between gap-4">
                    <span className="text-outline uppercase">UPTIME</span> 
                    <span className="text-[#16ff9e] font-bold">99.98%</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-outline uppercase">PING</span> 
                    <span className="text-[#16ff9e] font-bold">14.2ms</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Grid Coordinate info strip */}
          <div className="flex justify-between border-t border-outline-variant/30 pt-6 text-[10px] uppercase font-mono text-outline select-none">
            <span>ELEV: 1567M_KALI</span>
            <span>REF_GRID: RR_PRT_01</span>
          </div>
        </Reveal>

        {/* ================= OUR MISSION SECTION ================= */}
        <Reveal as="section" className="bg-surface-container-lowest/40 border border-outline-variant p-8 md:p-16 architectural-border">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left title column */}
            <div className="lg:col-span-5 space-y-5">
              <span className="font-mono text-xs text-[#16ff9e] uppercase tracking-widest block font-bold">
                01 // VISION_SCOPE
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-white uppercase tracking-tight leading-none">
                OUR MISSION
              </h2>
              {/* Solid thick structural bar below heading */}
              <div className="w-16 h-1.5 bg-[#16ff9e] shadow-[0_0_10px_rgba(22,255,158,0.3)]"></div>
            </div>
            
            {/* Right descriptive column */}
            <div className="lg:col-span-7 space-y-8">
              <p className="font-sans text-2xl md:text-3xl text-white font-bold leading-tight">
                We engineer the physical and digital frameworks that power regional sovereignty.
              </p>
              <p className="text-on-surface-variant font-sans text-sm md:text-base leading-relaxed">
                Lanari Tech Ltd is a technology company headquartered in Kigali, Rwanda, on a mission to accelerate digital transformation in Rwanda and across Africa. We design and build custom software, web and mobile applications, and SaaS products for businesses of all sizes — while running hands-on training programs that turn aspiring developers into job-ready professionals.
              </p>

              {/* Robustness & Sovereignty Columns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8 border-t border-outline-variant/40">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 select-none">
                    <span className="font-mono text-[10px] text-[#16ff9e] font-bold tracking-wider">STRUC_01</span>
                    <div className="h-px flex-grow bg-outline-variant/20"></div>
                  </div>
                  <h4 className="font-sans font-extrabold text-lg text-white uppercase tracking-tight">Robustness</h4>
                  <p className="text-on-surface-variant font-sans text-xs leading-relaxed uppercase">
                    Lanari Tech Ltd is a technology company headquartered in Kigali, Rwanda, on a mission to accelerate digital transformation in Rwanda and across Africa. We design and build custom software, web and mobile applications, and SaaS products for businesses of all sizes — while running hands-on training programs that turn aspiring developers into job-ready professionals.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 select-none">
                    <span className="font-mono text-[10px] text-[#16ff9e] font-bold tracking-wider">STRUC_02</span>
                    <div className="h-px flex-grow bg-outline-variant/20"></div>
                  </div>
                  <h4 className="font-sans font-extrabold text-lg text-white uppercase tracking-tight">Sovereignty</h4>
                  <p className="text-on-surface-variant font-sans text-xs leading-relaxed uppercase">
                    Lanari Tech Ltd is a technology company headquartered in Kigali, Rwanda, on a mission to accelerate digital transformation in Rwanda and across Africa. We design and build custom software, web and mobile applications, and SaaS products for businesses of all sizes — while running hands-on training programs that turn aspiring developers into job-ready professionals.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ================= INTEGRATED ECOSYSTEM SECTION ================= */}
        <Reveal as="section" className="space-y-12">
          {/* Section Header */}
          <div className="flex justify-between items-end border-b border-outline-variant/40 pb-6 select-none">
            <div>
              <span className="font-mono text-outline uppercase tracking-[0.4em] text-[10px]">
                TECHNICAL_ECOSYSTEM_MAP
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold uppercase text-white mt-1.5 leading-none">
                INTEGRATED ECOSYSTEM
              </h2>
            </div>
            <div className="font-mono text-[10px] text-outline text-right space-y-1 hidden sm:block">
              <p>ACTIVE_NOD: 1024</p>
              <p>LIC: AGENT_889</p>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-12 gap-8">
            {/* Card 1: Precision Infrastructure (SYS_CORE_01) */}
            <div className="col-span-12 md:col-span-8 group relative border border-outline-variant bg-surface-container-low p-8 md:p-12 transition-all hover:bg-surface-container-high architectural-border overflow-hidden">
              <div className="absolute top-0 right-0 p-3.5 font-mono text-[10px] text-outline border-l border-b border-outline-variant/40">
                SYS_CORE_01
              </div>
              <div className="mb-10 text-[#16ff9e]">
                <Cpu size={44} className="stroke-[1.5]" />
              </div>
              <h3 className="font-sans text-2xl md:text-3xl font-extrabold text-white mb-4 uppercase tracking-tight">
                PRECISION INFRASTRUCTURE
              </h3>
              <p className="text-on-surface-variant max-w-xl mb-10 text-sm md:text-base leading-relaxed">
                Our integrated model creates a self-reinforcing ecosystem: our services fund our products, our products showcase our capabilities, and our training pipeline supplies the talent that builds both.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-1.5 border border-outline-variant/60 font-mono text-[10px] text-on-surface-variant uppercase select-none">
                  MODULE_LNT-01
                </span>
                <span className="px-4 py-1.5 border border-outline-variant/60 font-mono text-[10px] text-on-surface-variant uppercase select-none">
                  MODULE_LNT-02
                </span>
              </div>
              
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-outline-variant/30"></div>
              <div className="absolute bottom-0 left-0 h-[2px] bg-[#16ff9e] w-0 group-hover:w-full transition-all duration-700 ease-in-out"></div>
            </div>

            {/* Card 2: Secure Protocol (PROT_X) */}
            <div className="col-span-12 md:col-span-4 group relative border border-outline-variant bg-surface-container-low p-8 md:p-11 transition-all hover:bg-surface-container-high architectural-border flex flex-col justify-between overflow-hidden">
              <div className="absolute top-0 right-0 p-3.5 font-mono text-[10px] text-outline border-l border-b border-outline-variant/40">
                PROT_X
              </div>
              <div>
                <div className="mb-10 text-[#16ff9e]">
                  <Shield size={44} className="stroke-[1.5]" />
                </div>
                <h3 className="font-sans text-xl md:text-2xl font-extrabold text-white mb-4 uppercase tracking-tight">
                  SECURE PROTOCOL
                </h3>
                <p className="text-on-surface-variant text-xs md:text-sm leading-relaxed">
                  End-to-end encryption and decentralized data governance for enterprise security and regional compliance.
                </p>
              </div>
              <div className="h-px bg-outline-variant/30 w-full mt-8"></div>
            </div>

            {/* Card 3: Network Status (NET_OPS) */}
            <div className="col-span-12 md:col-span-4 group relative border border-[#46464c] bg-surface-container-low p-8 md:p-11 transition-all hover:bg-surface-container-high architectural-border flex flex-col justify-between overflow-[#hidden]">
              <div className="absolute top-0 right-0 p-3.5 font-mono text-[10px] text-outline border-l border-b border-outline-variant/40">
                NET_OPS
              </div>
              <div>
                <div className="mb-10 text-[#16ff9e]">
                  <TrendingUp size={44} className="stroke-[1.5]" />
                </div>
                <h3 className="font-sans text-xl md:text-2xl font-extrabold text-white mb-4 uppercase tracking-tight">
                  NETWORK STATUS
                </h3>
                <p className="text-on-surface-variant text-xs md:text-sm leading-relaxed">
                  Real-time telemetry and predictive maintenance for regional deployments. AI-driven fault detection.
                </p>
              </div>
              <div className="h-px bg-outline-variant/30 w-full mt-8"></div>
            </div>

            {/* Card 4: Regional Deployment (EXPANSION_LOG_02) */}
            <div className="col-span-12 md:col-span-8 group relative border border-outline-variant bg-surface-container-low overflow-hidden min-h-[350px] architectural-border">
              {/* Cable patch panel background image */}
              <img 
                alt="Complex tech cabling network panel" 
                className="absolute inset-0 w-full h-full object-cover grayscale contrast-150 brightness-[0.25] group-hover:scale-105 transition-transform duration-1000 ease-out" 
                src="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#101415] via-[#101415]/45 to-transparent"></div>
              <div className="absolute inset-0 blueprint-accent opacity-20"></div>

              {/* Inline layout content */}
              <div className="relative z-10 p-8 md:p-10 h-full flex flex-col justify-end pt-32">
                <span className="font-mono text-[9px] text-[#16ff9e] mb-2 uppercase tracking-widest font-bold">
                  EXPANSION_LOG_02
                </span>
                <h3 className="font-sans text-2xl md:text-3xl font-extrabold text-white mb-2.5 uppercase tracking-tight">
                  REGIONAL DEPLOYMENT
                </h3>
                <p className="text-on-surface-variant font-mono text-[10px] uppercase max-w-xl leading-relaxed tracking-wider">
                  OUR INTEGRATED MODEL CREATES A SELF-REINFORCING ECOSYSTEM: OUR SERVICES FUND OUR PRODUCTS, OUR PRODUCTS SHOWCASE OUR CAPABILITIES, AND OUR TRAINING PIPELINE SUPPLIES THE TALENT THAT BUILDS BOTH.
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ================= CORE VALUES SECTION ================= */}
        <Reveal as="section" className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-12 border-t border-outline-variant/40">
          {/* Left Title and Specs column */}
          <div className="lg:col-span-4 space-y-6">
            <h2 className="font-sans text-4xl md:text-5xl font-extrabold text-white uppercase leading-none">
              CORE VALUES
            </h2>
            <div className="p-4 border border-outline-variant/50 inline-block bg-surface-container-low/40 select-none">
              <p className="text-on-surface-variant font-mono text-[10px] uppercase tracking-tighter leading-tight">
                SPEC_SHEET_V1.0<br />
                INTEGRITY_CHECK: PASSED<br />
                VALUE_ALIGNMENT: 100%
              </p>
            </div>
          </div>

          {/* Right Core Values Accordion list */}
          <div className="lg:col-span-8">
            <ul className="divide-y divide-outline-variant/30 border-t border-b border-outline-variant/30">
              {coreValues.map((val, idx) => (
                <li 
                  key={val.num}
                  className="group py-6 md:py-7 flex flex-col hover:bg-surface-container-low/20 transition-all duration-300 px-4 md:px-6 cursor-pointer"
                  onClick={() => setActiveValueIndex(activeValueIndex === idx ? null : idx)}
                >
                  <div className="flex justify-between items-center select-none">
                    <div className="flex items-center gap-8 md:gap-16">
                      <span className="font-mono text-[11px] text-[#16ff9e] font-bold">{val.num}</span>
                      <span className="font-sans text-lg md:text-xl font-extrabold uppercase text-white group-hover:text-[#16ff9e] transition-colors tracking-tight">
                        {val.name}
                      </span>
                    </div>
                    <ArrowRight 
                      className={`text-outline-variant group-hover:text-[#16ff9e] group-hover:translate-x-2 transition-all duration-300 stroke-[1.5] ${activeValueIndex === idx ? "rotate-90 text-[#16ff9e]" : ""}`} 
                      size={20}
                    />
                  </div>
                  {activeValueIndex === idx && (
                    <div className="pl-12 md:pl-20 pr-4 mt-4 text-on-surface-variant font-sans text-xs md:text-sm leading-relaxed animate-fade-in uppercase">
                      {val.desc}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* ================= FINAL CTA SECTION ================= */}
        <Reveal as="section" className="relative overflow-hidden select-none">
          <div className="absolute inset-0 blueprint-accent opacity-15 pointer-events-none"></div>
          <div className="relative z-10 max-w-5xl mx-auto py-20 border border-outline-variant/60 bg-[#0b0f10]/90 text-center backdrop-blur-sm px-6 md:px-12 architectural-border space-y-10">
            <span className="font-mono text-xs text-[#16ff9e] block tracking-[0.4em] uppercase font-bold">
              READY TO COMMENCE?
            </span>
            <h2 className="font-sans text-3xl md:text-5xl font-extrabold text-white uppercase leading-none max-w-3xl mx-auto tracking-tight">
              SYSTEM INITIALIZATION <br className="hidden sm:inline" /> REQUIRED.
            </h2>
            <div className="flex flex-col items-center gap-6">
              <button 
                onClick={onInitialize}
                className="bg-[#16ff9e] text-[#002110] px-12 py-5 font-mono text-sm font-bold uppercase tracking-[0.15em] hover:bg-[#56ffa8] hover:shadow-[0_0_30px_rgba(22,255,158,0.25)] active:scale-95 transition-all duration-250 cursor-pointer"
              >
                INITIALIZE PROTOCOL
              </button>
              <div className="flex items-center gap-2.5 font-mono text-[10px] text-outline uppercase tracking-wider">
                <span className="w-2.5 h-2.5 bg-[#16ff9e] rounded-full animate-ping"></span>
                <span>WAITING FOR OPERATOR INPUT...</span>
              </div>
            </div>
          </div>
        </Reveal>

      </div>
    </div>
  );
}
