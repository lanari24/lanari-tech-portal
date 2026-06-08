import React, { useState } from "react";
import { Terminal, Database, Code, ShieldCheck, Cpu, ArrowRight, Activity, CloudLightning } from "lucide-react";
import Reveal from "./Reveal";

interface PublicServicesProps {
  onShowNotification: (msg: string) => void;
  mouseCoords: { x: number; y: number };
}

export default function PublicServices({ onShowNotification, mouseCoords }: PublicServicesProps) {
  const [activeStep, setActiveStep] = useState<number>(3); // Default highlighted on step 4 (Deployment) like in the design

  const services = [
    {
      ref: "01",
      icon: <Terminal className="text-secondary-fixed text-2xl" />,
      title: "Websites & Web Apps",
      desc: "Fast, easy-to-use websites and online tools that help your business run and grow."
    },
    {
      ref: "02",
      icon: <Cpu className="text-secondary-fixed text-2xl" />,
      title: "Mobile Apps (Android & iPhone)",
      desc: "Smooth, reliable apps your customers can use anywhere, on any phone."
    },
    {
      ref: "03",
      icon: <ShieldCheck className="text-secondary-fixed text-2xl" />,
      title: "Connecting Your Systems",
      desc: "We link your different tools and apps so they share information and work together automatically."
    },
    {
      ref: "04",
      icon: <Database className="text-secondary-fixed text-2xl" />,
      title: "Organising Your Data",
      desc: "We set up safe, well-organised databases so your information is easy to find and always secure."
    },
    {
      ref: "05",
      icon: <CloudLightning className="text-secondary-fixed text-2xl" />,
      title: "Hosting & Maintenance",
      desc: "We keep your software online, up to date, and running smoothly, so you don't have to worry about it."
    },
    {
      ref: "06",
      icon: <Activity className="text-secondary-fixed text-2xl" />,
      title: "Tech Advice & Support",
      desc: "Not sure where to start? We'll help you plan, modernise old systems, and make the right tech choices."
    }
  ];

  const steps = [
    {
      num: "01.",
      title: "Plan",
      badge: "01_PLAN",
      desc: "We listen to what you need, check what's possible, and agree on a clear plan together."
    },
    {
      num: "02.",
      title: "Design",
      badge: "02_DESIGN",
      desc: "We map out how everything will look and work before we start building."
    },
    {
      num: "03.",
      title: "Build",
      badge: "03_BUILD",
      desc: "We build your software step by step, testing carefully as we go."
    },
    {
      num: "04.",
      title: "Launch",
      badge: "04_LAUNCH",
      desc: "We go live, make sure everything works, and keep an eye on it around the clock."
    }
  ];

  return (
    <div className="relative">
      <div className="absolute inset-0 blueprint-grid opacity-10 z-0"></div>

      <div className="relative z-10 px-6 md:px-16 pt-12 pb-32 max-w-7xl mx-auto space-y-32">
        
        {/* Services Hero Header */}
        <Reveal as="section" className="grid grid-cols-12 gap-8 items-end relative min-h-[300px]">
          <div className="col-span-12 md:col-span-8 space-y-4">
            <span className="font-mono text-xs text-secondary-fixed uppercase tracking-[0.2em] block font-bold">
              What We Do
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold uppercase text-white leading-none tracking-tight">
              SOFTWARE BUILT THE <span className="text-gradient-accent">RIGHT WAY.</span>
            </h1>
            <p className="text-on-surface-variant font-sans text-base md:text-lg max-w-2xl leading-relaxed">
              We build websites, apps, and software that are fast, dependable, and made to fit exactly what your business needs.
            </p>
          </div>

          <div className="col-span-12 md:col-span-4 flex flex-col items-end gap-12">
            {/* Precision Icon block */}
            <div className="w-24 h-24 md:w-32 md:h-32 border border-outline-variant flex items-center justify-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-secondary-fixed opacity-0 group-hover:opacity-10 transition-opacity"></div>
              <Terminal size={36} className="text-secondary-fixed stroke-1" />
            </div>

            <div className="text-right w-full">
              <p className="font-mono text-xs text-outline uppercase tracking-widest mb-2">Our Services</p>
              <div className="h-px w-48 bg-outline-variant ml-auto"></div>
            </div>
          </div>

          {/* Background vector SVG */}
          <div className="absolute top-0 right-0 w-1/2 h-full -z-10 opacity-20 pointer-events-none hidden lg:block">
            <svg className="w-full h-full" fill="none" viewBox="0 0 400 400">
              <path d="M0 0H400V400H0V0Z" stroke="#909096" strokeWidth="0.5"></path>
              <path d="M400 0L0 400" stroke="#909096" strokeWidth="0.5"></path>
              <circle cx="400" cy="0" r="100" stroke="#56ffa8" strokeWidth="0.5"></circle>
              <circle cx="200" cy="200" r="50" stroke="#56ffa8" strokeDasharray="4 4" strokeWidth="0.5"></circle>
            </svg>
          </div>
        </Reveal>

        {/* Services technical modules grid */}
        <Reveal as="section" className="space-y-12">
          <div className="max-w-4xl space-y-4">
            <h2 className="text-3xl md:text-5xl font-extrabold uppercase text-white tracking-tight">
              How We Can Help
            </h2>
            <p className="text-on-surface-variant text-base md:text-lg leading-relaxed">
              We work with startups, small businesses, non-profits, and large organisations to design, build, and look after software made just for them.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-outline-variant">
            {services.map((srv) => (
              <div 
                key={srv.ref}
                onClick={() => onShowNotification(`We'd love to help with: ${srv.title}. Get in touch!`)}
                className="border-r border-b border-outline-variant p-6 md:p-8 flex flex-col relative group hover:bg-surface-container-low/30 transition-all duration-300 cursor-pointer min-h-[300px]"
              >
                <div className="absolute top-4 right-4 font-mono text-xs text-outline opacity-40">
                  {srv.ref}
                </div>
                
                <div className="w-12 h-12 bg-primary-container border border-outline-variant flex items-center justify-center mb-8">
                  {srv.icon}
                </div>

                <h3 className="text-xl font-bold uppercase text-white mb-4 group-hover:text-secondary-fixed transition-colors tracking-tight leading-snug">
                  {srv.title}
                </h3>
                
                <p className="text-on-surface-variant text-sm leading-relaxed font-sans">
                  {srv.desc}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Development Sequence Sequence Diagram component */}
        <Reveal as="section" className="space-y-8">
          <div className="border border-outline-variant p-6 md:p-12 relative overflow-hidden bg-surface-container-lowest architectural-border">
            <div className="absolute top-0 right-0 p-4 font-mono text-[9px] text-outline rotate-90 origin-top-right tracking-widest select-none">
              Step by step
            </div>

            <h2 className="text-2xl md:text-3xl font-extrabold uppercase text-white mb-16 tracking-[0.2em] text-center">
              How We Work
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
              
              {/* Connector line on desktop */}
              <div className="hidden md:block absolute top-8 left-0 w-full h-[1px] bg-outline-variant -z-10"></div>

              {steps.map((st, i) => (
                <div 
                  key={st.num}
                  onClick={() => setActiveStep(i)}
                  className={`flex flex-col items-center md:items-start group cursor-pointer transition-all duration-300`}
                >
                  <div className={`w-16 h-16 border flex items-center justify-center mb-6 transition-all duration-300 select-none ${
                    activeStep === i 
                      ? "bg-secondary-fixed border-secondary-fixed text-on-secondary shadow-[0_0_25px_rgba(86,255,168,0.3)] scale-105" 
                      : "bg-surface border-outline-variant text-secondary-fixed group-hover:border-secondary-fixed"
                  }`}>
                    <span className="font-mono text-lg font-bold">{st.num}</span>
                  </div>

                  <h4 className={`font-mono text-xs mb-2 uppercase tracking-tighter ${activeStep === i ? "text-secondary-fixed font-bold" : "text-white"}`}>
                    {st.title}
                  </h4>
                  
                  <p className="text-center md:text-left text-xs text-on-surface-variant leading-relaxed font-sans">
                    {st.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Technical Showcase: Bento Grid Grid */}
        <Reveal as="section" className="space-y-8">
          <div className="grid grid-cols-12 gap-8">
            
            {/* Large feature image and banner */}
            <div className="col-span-12 md:col-span-8 bg-surface-container-lowest border border-outline-variant h-[350px] md:h-[400px] relative p-8 md:p-12 overflow-hidden group architectural-border">
              <img 
                alt="Server hardware integration blueprint diagram" 
                className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCh5K1Dy6Xga1e01w6VPn-lr8QC4uC-lusD5NVk-GGLANnjpK9Ln2TKlCIliYe0Xi9McXW803YgRSL0l3PkP1V0u_BasjEzThaO2kN9hH9BeiLpR12ZLiP3Qr47PZ2WZsFoOzT-ExK-kwAeXJqwKpuyNFvVTQILJjbF_TJkKO3zmqPAiq58yEEkzas_RMtAn8aWD7VSHoQTiUBYjKq7_F19nzH6V3JFUqsbIbyqQTpUa-7u90YVhqkaByp5I4Ri8F81T-VOzKU4u_0"
                referrerPolicy="no-referrer"
              />
              <div className="relative z-10 h-full flex flex-col justify-end">
                <div className="w-fit mb-6">
                  <span className="font-mono text-xs text-secondary-fixed mb-2 block uppercase tracking-widest font-bold">
                    What we're great at
                  </span>
                  <div className="h-px w-full bg-secondary-fixed/40"></div>
                </div>
                <h2 className="text-3xl md:text-5xl font-extrabold uppercase leading-none tracking-tighter text-white">
                  Safe & Secure <br />from Day One.
                </h2>
              </div>

              <div className="absolute top-6 right-6 border border-secondary-fixed px-3 py-1 font-mono text-[10px] text-secondary-fixed bg-[#101415]/80 backdrop-blur-sm">
                Always protected
              </div>
            </div>

            {/* Secondary features cards loadout */}
            <div className="col-span-12 md:col-span-4 flex flex-col gap-8">
              <div className="flex-grow bg-surface-container-lowest border border-outline-variant p-8 flex flex-col justify-center relative overflow-hidden group architectural-border">
                <h4 className="font-mono text-xs text-outline uppercase mb-2 tracking-widest font-bold">
                  Speed
                </h4>
                <div className="flex items-end gap-2 mb-4">
                  <span className="text-4xl md:text-5xl font-extrabold text-[#56ffa8] leading-none font-sans">
                    Fast
                  </span>
                </div>
                <p className="text-on-surface-variant text-xs leading-relaxed font-sans">
                  Quick to load for your customers, wherever they are.
                </p>
              </div>

              <div className="flex-grow bg-surface-container-lowest border border-outline-variant p-8 flex flex-col justify-center relative overflow-hidden group architectural-border">
                <h4 className="font-mono text-xs text-outline uppercase mb-2 tracking-widest font-bold">
                  Reliability
                </h4>
                <div className="flex items-end gap-2 mb-4">
                  <span className="text-4xl md:text-5xl font-extrabold text-white leading-none font-sans">
                    99.9
                  </span>
                  <span className="font-mono text-xs pb-2 text-outline">%</span>
                </div>
                <p className="text-on-surface-variant text-xs leading-relaxed font-sans">
                  Your tools stay online, with backups ready if anything goes wrong.
                </p>
              </div>
            </div>

          </div>
        </Reveal>

      </div>
    </div>
  );
}
