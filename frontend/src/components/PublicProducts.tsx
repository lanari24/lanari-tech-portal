import React, { useState, useEffect } from "react";
import { ArrowRight, Sparkles, HardDrive, Compass, ServerCrash, Share2, CheckCircle2, ChevronRight } from "lucide-react";
import Reveal from "./Reveal";

interface PublicProductsProps {
  onShowNotification: (msg: string) => void;
  mouseCoords: { x: number; y: number };
}

export default function PublicProducts({ onShowNotification, mouseCoords }: PublicProductsProps) {
  const [latency, setLatency] = useState<string>("0.044");
  const [activeModule, setActiveModule] = useState<number | null>(0);
  const [demoRequested, setDemoRequested] = useState<boolean>(false);
  const [demoEmail, setDemoEmail] = useState<string>("");

  // Periodically fluctuate latency to mimic real-time network conditions
  useEffect(() => {
    const interval = setInterval(() => {
      const val = (0.040 + Math.random() * 0.007).toFixed(3);
      setLatency(val);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const systemModules = [
    {
      id: "01",
      title: "LOGISTICS_ENGINE",
      desc: "Global-standard supply chain optimization software tailored for regional transport, cargo consolidation, and custom-house clearance integrations."
    },
    {
      id: "02",
      title: "TREASURY_MGMT",
      desc: "Automated multi-currency ledger reconciliation, tax reporting compliant with local regulations, and instant financial transaction statements."
    },
    {
      id: "03",
      title: "ANALYTICS_CORE",
      desc: "Predictive machine modules modeling regional trade indexes, operational route bottlenecks, and warehouse inventory demand forecasting."
    }
  ];

  const handleRequestDemo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!demoEmail) {
      onShowNotification("Please provide a valid operator email address.");
      return;
    }
    setDemoRequested(true);
    onShowNotification(`SaaS Demo credentials dispatched to ${demoEmail} [NOMINAL]`);
  };

  return (
    <div className="relative">
      <div className="absolute inset-0 blueprint-grid opacity-10 z-0"></div>
      
      <div className="relative z-10 px-6 md:px-16 pt-12 pb-32 max-w-7xl mx-auto space-y-32">
        
        {/* Header section with live stats */}
        <Reveal as="section" className="grid grid-cols-12 gap-8 items-end">
          <div className="col-span-12 lg:col-span-8 space-y-4">
            <span className="font-mono text-xs text-secondary-fixed uppercase tracking-widest block font-bold">
              Architectural Engineering // Systems v4.3
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold uppercase text-white leading-none tracking-tight">
              SaaS Products
            </h1>
            <p className="text-on-surface-variant font-sans text-base md:text-lg max-w-3xl leading-relaxed">
              We develop our own scalable software-as-a-service products that address everyday challenges for African businesses — affordable, locally relevant tools built with global standards, designed for accessibility and mobile-first usage.
            </p>
          </div>

          <div className="col-span-12 lg:col-span-4 flex justify-end">
            <div className="border border-outline-variant p-6 bg-surface-container-lowest flex flex-col justify-center min-w-[220px] architectural-border">
              <span className="font-mono text-xs text-outline mb-2">NETWORK_LATENCY</span>
              <div className="text-3xl font-mono font-bold text-secondary-fixed tracking-tight">
                {latency}ms
              </div>
              <div className="mt-4 w-full h-[3px] bg-outline-variant relative">
                <div className="absolute top-0 left-0 h-full bg-secondary-fixed" style={{ width: "84%" }}></div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Product Gallery Grid */}
        <Reveal as="section" className="space-y-16">
          
          {/* LanariFlow ERP Highlight */}
          <div className="border border-outline-variant bg-surface-container-low architectural-border overflow-hidden">
            <div className="grid grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-outline-variant">
              
              {/* Left Column: Visuals & Metrics */}
              <div className="col-span-12 lg:col-span-7 p-8 md:p-12 space-y-12">
                <div className="flex flex-wrap justify-between items-start gap-4">
                  <div>
                    <span className="font-mono text-xs text-secondary-fixed font-bold tracking-wider">
                      CORE OPERATING SYSTEM
                    </span>
                    <h2 className="text-3xl md:text-5xl font-extrabold text-white uppercase tracking-tight mt-1">
                      LanariFlow ERP
                    </h2>
                  </div>
                  <span className="font-mono text-xs text-outline border border-outline-variant px-3 py-1 bg-surface-container-lowest">
                    SKU: LF-ERP-01
                  </span>
                </div>

                {/* Dashboard Image Mockup */}
                <div className="aspect-video relative overflow-hidden bg-primary-container border border-outline-variant group">
                  <img 
                    alt="LanariFlow ERP Interface Layout Dashboard" 
                    className="w-full h-full object-cover opacity-65 group-hover:scale-[1.02] transition-all duration-700" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCSDD_b73ZX0XHF2IpcaqokygxkFCKefOqDwbCbFL8MycxShZ3pe0m0V7F_RsJCByMsm23OTe6qM6K9yljjA5ESXypZ1dKB85RvKX0IoNc3NBe198Oigm67HdHkqiH789lx4ooXkKw6_G7aAGqFqKbYi6uxxMlDGjzLbu6u3eZQ3vtsiQR2s89VhnUcSHT103-bXI5YQXx-uimAObCmGjj0VbHMsKvxrM5wq2SM42TJLakxey71mZ1U45kQnBQ527Ww6n11hpTpUf0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-container to-transparent opacity-60 pointer-events-none"></div>
                </div>

                {/* Precision Numbers */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="border-l border-outline-variant pl-4">
                    <span className="font-mono text-xs text-outline block mb-2">PRECISION_METRIC</span>
                    <div className="text-2xl font-bold text-white font-mono">
                      99.99<span className="text-xs text-secondary-fixed ml-1 font-bold">% UPTIME</span>
                    </div>
                  </div>
                  <div className="border-l border-outline-variant pl-4">
                    <span className="font-mono text-xs text-outline block mb-2">IO_LATENCY</span>
                    <div className="text-2xl font-bold text-white font-mono">&lt;2ms</div>
                  </div>
                  <div className="border-l border-outline-variant pl-4">
                    <span className="font-mono text-xs text-outline block mb-2">SCALABILITY_INDEX</span>
                    <div className="text-2xl font-bold text-white font-mono">
                      10.0<span className="text-xs text-outline ml-1 font-mono">PB</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Engineering Specs Module Accordion */}
              <div className="col-span-12 lg:col-span-5 bg-surface-container-lowest/50 p-8 md:p-12 flex flex-col justify-between">
                <div>
                  <h3 className="font-mono text-xs text-secondary-fixed mb-8 uppercase tracking-widest border-b border-outline-variant pb-4 font-bold">
                    Engineering Specs
                  </h3>
                  
                  <div className="space-y-4">
                    {systemModules.map((sm, index) => (
                      <div 
                        key={sm.id} 
                        onClick={() => setActiveModule(index)}
                        className={`p-4 border transition-all cursor-pointer ${
                          activeModule === index 
                            ? "border-secondary-fixed bg-surface-container-high/40 shadow-[0_0_15px_rgba(86,255,168,0.05)]" 
                            : "border-outline-variant bg-surface-container/20 hover:border-outline"
                        }`}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-mono text-xs font-bold text-white">[{sm.id}] {sm.title}</span>
                          <span className={`w-2 h-2 rounded-full ${activeModule === index ? "bg-secondary-fixed animate-ping" : "bg-outline-variant"}`}></span>
                        </div>
                        {activeModule === index && (
                          <p className="text-xs text-on-surface-variant leading-relaxed animate-fade-in mt-2 font-sans">
                            {sm.desc}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <a 
                  href="#whitepapers"
                  className="w-full mt-12 bg-secondary-fixed text-on-secondary px-6 py-4 font-mono text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all flex justify-between items-center text-[#002110]"
                >
                  <span>VIEW_SYSTEM_DOCS.MD</span>
                  <ChevronRight size={16} />
                </a>
              </div>

            </div>
          </div>

          {/* Ubumwe Connect Inter-Org */}
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 lg:col-span-7">
              <div className="border border-outline-variant bg-surface-container-low p-8 md:p-10 h-full flex flex-col justify-between architectural-border">
                <div className="flex justify-between items-start mb-8 gap-4">
                  <div>
                    <span className="font-mono text-xs text-secondary-fixed font-bold tracking-wider">
                      INTER-ORG PROTOCOL
                    </span>
                    <h2 className="text-2xl md:text-4xl font-extrabold text-white uppercase tracking-tight mt-1">
                      Ubumwe Connect
                    </h2>
                  </div>
                  <div className="w-12 h-12 border border-secondary-fixed flex items-center justify-center text-secondary-fixed">
                    <Share2 size={24} className="stroke-1" />
                  </div>
                </div>

                <div className="grid grid-cols-12 gap-8 mb-8">
                  {/* Connectivity Map */}
                  <div className="col-span-12 md:col-span-8 relative border border-outline-variant overflow-hidden group min-h-[220px]">
                    <img 
                      alt="Ubumwe Connectivity Map" 
                      className="absolute inset-0 w-full h-full object-cover grayscale brightness-[0.4] group-hover:grayscale-0 transition-all duration-700" 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDlk0A7G6mUnwrD1ryZpDjBBwPDFeRnAKhaE2Fqm1WK0WzfLRrZjQvi7XvCd23niE3ouvTb0WuLtG8Sm26fwh9Apy_0fMGqnR3kFTVa5YVfFx3xrYEzhgXM8RozSg_MRO1FGTU8BxNox6POHjTho7MAVif2ExSpocEMwkm6xsaDA--j0ei18i2SZJeXoCWoEjIKyCYvBqxu3xW7nfbrOSKFWWYbCdaRgAmfgwXC5U9RKj3aVI9u7NZ5GWiBMnU36su2vfFMWtjQVWo"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 blueprint-accent opacity-20 pointer-events-none"></div>
                    <div className="absolute bottom-4 left-4 font-mono text-[9px] bg-background/85 px-2 py-1 border border-outline-variant">
                      LIVE_MAP_V2.0
                    </div>
                  </div>

                  {/* Encryption modules list */}
                  <div className="col-span-12 md:col-span-4 space-y-4">
                    <div className="bg-surface-container-lowest border border-outline-variant p-4">
                      <span className="font-mono text-[10px] text-outline block mb-1">ENCRYPTION</span>
                      <span className="font-mono text-xs text-white font-bold">AES-256-GCM</span>
                    </div>
                    <div className="bg-surface-container-lowest border border-outline-variant p-4">
                      <span className="font-mono text-[10px] text-outline block mb-1">THROUGHPUT</span>
                      <span className="font-mono text-xs text-white font-bold">2.4 TB/S</span>
                    </div>
                    <div className="bg-surface-container-lowest border border-outline-variant p-4">
                      <span className="font-mono text-[10px] text-outline block mb-1">NODES_ACTIVE</span>
                      <span className="font-mono text-xs text-white font-bold">4,289</span>
                    </div>
                  </div>
                </div>

                <p className="font-sans text-on-surface-variant text-sm md:text-base leading-relaxed mb-8">
                  A locally relevant, high-speed bridge designed for the unique regulatory landscape of pan-African trade, built to global security standards to integrate businesses instantly.
                </p>

                <div className="pt-6 border-t border-outline-variant flex justify-between items-center mt-auto">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-secondary-fixed animate-pulse"></span>
                    <span className="font-mono text-[10px] text-secondary-fixed font-bold tracking-wider">
                      PROTOCOL_STABLE
                    </span>
                  </div>
                  <a 
                    href="#ubumwe-docs" 
                    className="font-mono text-xs text-white hover:text-secondary-fixed transition-colors underline decoration-outline-variant"
                  >
                    EXPLORE_ARCHITECTURE
                  </a>
                </div>
              </div>
            </div>

            {/* Health index stats & Subscription */}
            <div className="col-span-12 lg:col-span-5 flex flex-col justify-between gap-8">
              
              {/* System health index visual */}
              <div className="border border-outline-variant bg-surface-container-low p-8 flex-grow space-y-6 architectural-border">
                <span className="font-mono text-xs text-outline mb-6 block border-b border-outline-variant pb-2">
                  SYSTEM_HEALTH_INDEX
                </span>

                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-sans text-white">Pan-African Node Mesh</span>
                      <span className="font-mono text-xs text-secondary-fixed">99.98%</span>
                    </div>
                    <div className="h-1 bg-outline-variant">
                      <div className="h-full bg-secondary-fixed" style={{ width: "99%" }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-sans text-white">Security Perimeter Integrity</span>
                      <span className="font-mono text-xs text-secondary-fixed font-bold">ACTIVE</span>
                    </div>
                    <div className="h-1 bg-outline-variant">
                      <div className="h-full bg-secondary-fixed" style={{ width: "100%" }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-sans text-white">Data Redundancy Clusters</span>
                      <span className="font-mono text-xs text-secondary-fixed">SYNCING</span>
                    </div>
                    <div className="h-1 bg-outline-variant">
                      <div className="h-full bg-secondary-fixed" style={{ width: "88%" }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Request demo trigger panel */}
              <div className="bg-secondary-fixed p-8 flex justify-between items-center group cursor-pointer transition-all duration-300">
                <form onSubmit={handleRequestDemo} className="w-full flex justify-between items-center">
                  <div className="space-y-1">
                    <span className="font-mono text-[10px] text-on-secondary-fixed opacity-70 block font-bold">
                      SYSTEM_ACCESS
                    </span>
                    {demoRequested ? (
                      <span className="font-sans text-xl font-bold uppercase tracking-tight text-[#002110] flex items-center gap-2 animate-pulse">
                        <CheckCircle2 size={20} /> ACCESS REQUISITION DISPATCHED
                      </span>
                    ) : (
                      <span className="font-sans text-2xl font-extrabold uppercase tracking-tighter text-[#002110]">
                        Request Demo
                      </span>
                    )}
                    
                    {!demoRequested && (
                      <input 
                        type="email"
                        value={demoEmail}
                        onChange={(e) => setDemoEmail(e.target.value)}
                        placeholder="ENTER OPERATOR EMAIL..."
                        onClick={(e) => e.stopPropagation()}
                        className="mt-2 bg-[#101415]/25 border border-outline-variant text-[#002110] font-mono text-xs p-2 placeholder:text-[#002110]/50 focus:outline-none focus:border-white w-full pr-8 max-w-sm"
                      />
                    )}
                  </div>
                  
                  <button 
                    type="submit" 
                    className="p-3 hover:translate-x-2 transition-transform cursor-pointer text-[#002110]"
                  >
                    <ArrowRight size={32} />
                  </button>
                </form>
              </div>

            </div>
          </div>

          {/* Integrity Section block */}
          <div className="border border-outline-variant bg-surface-container-low overflow-hidden flex flex-col md:flex-row min-h-[380px] architectural-border">
            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center space-y-6">
              <span className="font-mono text-xs text-secondary-fixed uppercase tracking-wider block font-bold">
                ENGINEERING_PRINCIPLE
              </span>
              <h3 className="text-3xl md:text-4xl font-extrabold text-white leading-tight uppercase">
                Structural Integrity by Design.
              </h3>
              <p className="text-on-surface-variant font-sans text-sm md:text-base leading-relaxed">
                Our products are built on a modular architecture that prevents systemic failure. Each component operates in a sandboxed environment with rigorous validation protocols, ensuring the highest standards of reliability for African enterprises.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <button 
                  onClick={() => onShowNotification("Whitepaper compilation requested...")}
                  className="border border-outline px-6 py-3 font-mono text-xs font-bold hover:bg-white hover:text-[#101415] transition-all cursor-pointer text-white"
                >
                  VIEW_WHITEPAPER.PDF
                </button>
                <span className="border border-outline-variant px-6 py-3 font-mono text-xs text-outline bg-surface-container-low select-none">
                  TECH_STACK_V4.0
                </span>
              </div>
            </div>

            <div className="w-full md:w-1/2 relative min-h-[250px] bg-surface-container">
              <img 
                alt="Engineering Structural Visual" 
                className="absolute inset-0 w-full h-full object-cover brightness-50 opacity-80" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD83meY7wvF9iti4I2zPjxOcrdcj-VxIlQSKUrA7uO9rCIhfXck-29q79CCAr8xStPUbugpPWFloYE-1Td3AKfz-jmg9nfz4QTZTqmFVUEi0ujn3DlmBUu85uvK7VLlnT-ozUeT-8SXxuIhAcKGVKrlOkUO1wYOzc5xqQKI7RdRL5gmp47O0d42UOQe15zkQnFpDljb0oheb52RqSCoarocYqr4OSN1jo7D7DoyAcrOI1XPZRVT02gCgI4I6G7z31kRefbWshroiws"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-surface-container/80 to-transparent pointer-events-none"></div>
            </div>
          </div>

        </Reveal>
      </div>
    </div>
  );
}
