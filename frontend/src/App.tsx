import React, { useState } from "react";
import { PublicViewTab } from "./types";
import PublicHome from "./components/PublicHome";
import PublicProducts from "./components/PublicProducts";
import PublicServices from "./components/PublicServices";
import PublicTraining from "./components/PublicTraining";
import PortalGateway from "./components/PortalGateway";
import PortalDashboard from "./components/PortalDashboard";
import { Terminal, Shield, AlertCircle, X, HelpCircle } from "lucide-react";

export default function App() {
  // Navigation State
  const [currentTab, setCurrentTab] = useState<PublicViewTab>("systems");
  
  // Gateways
  const [isInPortalGate, setIsInPortalGate] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<"client" | "student">("client");
  const [userRef, setUserRef] = useState<string>("");

  // Interactive Coordinates
  const [mouseCoords, setMouseCoords] = useState<{ x: number; y: number }>({ x: 0.5, y: 0.5 });

  // Customized Alerts
  const [notification, setNotification] = useState<string | null>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMouseCoords({ x, y });
  };

  const triggerNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification((prev) => (prev === msg ? null : prev));
    }, 4500);
  };

  const handleLoginSuccess = (role: "client" | "student", identifier: string) => {
    setUserRole(role);
    setUserRef(identifier);
    setIsAuthenticated(true);
    setIsInPortalGate(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsInPortalGate(false);
    setUserRef("");
    triggerNotification("Cryptographic uplink terminated. Returning operator to public stream.");
  };

  return (
    <div 
      className="min-h-screen bg-[#101415] text-[#e0e3e5] relative font-sans selection:bg-[#56ffa8] selection:text-[#002110]"
      onMouseMove={handleMouseMove}
    >
      
      {/* Toast message panel popup */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1d2022] border-l-4 border-[#16ff9e] p-4 text-xs font-mono w-80 md:w-96 shadow-[0_15px_30px_rgba(0,0,0,0.5)] flex justify-between items-start animate-fade-in architectural-border select-none">
          <div className="flex gap-3">
            <AlertCircle className="text-[#16ff9e] shrink-0" size={16} />
            <div className="space-y-1">
              <p className="text-white font-bold uppercase tracking-wider">SYSTEM_NOTIFICATION</p>
              <p className="text-on-surface-variant leading-relaxed">{notification}</p>
            </div>
          </div>
          <button 
            onClick={() => setNotification(null)}
            className="text-outline hover:text-white p-0.5 cursor-pointer"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* RENDER LOGGED IN PORTAL WORKSPACE */}
      {isAuthenticated ? (
        <PortalDashboard 
          role={userRole} 
          userRef={userRef} 
          onLogout={handleLogout}
          onShowNotification={triggerNotification}
        />
      ) : (
        /* PUBLIC & PORTAL LOGIN CANVAS LOBBY */
        <div className="flex flex-col min-h-screen">
          
          {/* Main Top Header Navigation */}
          <header className="h-20 border-b border-outline-variant bg-[#101415]/90 backdrop-blur-md sticky top-0 z-40 px-6 md:px-16 flex items-center justify-between transition-all select-none">
            
            {/* Logo Link Brand */}
            <div 
              className="flex items-center gap-3 group cursor-pointer"
              onClick={() => { setIsInPortalGate(false); setCurrentTab("systems"); }}
            >
              <div className="w-8 h-8 border border-secondary-fixed flex items-center justify-center relative">
                <span className="text-secondary-fixed font-mono text-sm font-bold [text-shadow:0_0_8px_rgba(86,255,168,0.3)]">L</span>
                <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-secondary-fixed"></div>
              </div>
              <span className="font-sans font-extrabold uppercase text-white tracking-widest text-sm group-hover:text-secondary-fixed transition-colors">
                Lanari.Tech
              </span>
            </div>

            {/* Public Links Tabs */}
            {!isInPortalGate && (
              <nav className="hidden lg:flex items-center gap-1">
                {(["systems", "infrastructure", "protocol", "archive"] as PublicViewTab[]).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setCurrentTab(tab)}
                    className={`px-5 py-2 font-mono text-[11px] uppercase tracking-[0.2em] transition-all cursor-pointer ${
                      currentTab === tab 
                        ? "text-secondary-fixed font-bold border-b-2 border-secondary-fixed" 
                        : "text-on-surface-variant hover:text-white"
                    }`}
                  >
                    [ {tab} ]
                  </button>
                ))}
              </nav>
            )}

            {/* Portal Requisition initialization trigger */}
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 font-mono text-[9px] text-[#56ffa8]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#16ff9e] animate-ping"></span>
                <span className="font-bold">UPLINK_ACTIVE</span>
              </div>

              {isInPortalGate ? (
                <button 
                  onClick={() => setIsInPortalGate(false)}
                  className="border border-[#e0e3e5] px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-white hover:bg-white hover:text-black transition-all cursor-pointer font-bold"
                >
                  Return
                </button>
              ) : (
                <button 
                  onClick={() => setIsInPortalGate(true)}
                  className="bg-secondary-fixed text-on-secondary px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-widest transition-all hover:scale-105 active:scale-95 text-[#002110] cursor-pointer inline-flex items-center gap-1 shadow-[0_0_15px_rgba(86,255,168,0.15)]"
                >
                  <Shield size={12} />
                  Initialize
                </button>
              )}
            </div>
          </header>

          {/* DYNAMIC CONTENT REGION */}
          <main className="flex-grow">
            {isInPortalGate ? (
              <PortalGateway 
                onLoginSuccess={handleLoginSuccess}
                onShowNotification={triggerNotification}
              />
            ) : (
              <div>
                {currentTab === "systems" && (
                  <PublicHome 
                    onInitialize={() => setIsInPortalGate(true)} 
                    mouseCoords={mouseCoords}
                  />
                )}
                {currentTab === "infrastructure" && (
                  <PublicProducts 
                    onShowNotification={triggerNotification} 
                    mouseCoords={mouseCoords}
                  />
                )}
                {currentTab === "protocol" && (
                  <PublicServices 
                    onShowNotification={triggerNotification} 
                    mouseCoords={mouseCoords}
                  />
                )}
                {currentTab === "archive" && (
                  <PublicTraining 
                    onShowNotification={triggerNotification}
                    onInitialize={() => setIsInPortalGate(true)}
                    mouseCoords={mouseCoords}
                  />
                )}
              </div>
            )}
          </main>

          {/* Public Global footer with precise details */}
          <footer className="border-t border-outline-variant bg-[#0b0f10] py-16 px-6 md:px-16 text-xs text-on-surface-variant font-mono select-none">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              
              <div className="md:col-span-5 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 border border-secondary-fixed flex items-center justify-center relative">
                    <span className="text-[#16ff9e] font-mono text-xs font-bold">L</span>
                  </div>
                  <span className="text-white font-extrabold font-sans uppercase tracking-widest text-[13px]">LANARI.TECH</span>
                </div>
                <div className="space-y-1 text-[11px] text-outline">
                  <p>© 2016 LANARI TECH LTD // KIGALI, RWANDA</p>
                  <p>EMAIL: [EMAIL_PLACEHOLDER] // PHONE: [PHONE_PLACEHOLDER]</p>
                  <p>WEBSITE: [WEBSITE_PLACEHOLDER]</p>
                </div>
              </div>

              <div className="col-span-1 md:col-span-2 space-y-3">
                <p className="text-[#16ff9e] font-sans font-bold text-[11px] uppercase tracking-wider">CONTROL</p>
                <div className="space-y-1.5 flex flex-col text-[11px] text-outline">
                  <span className="hover:text-white transition-colors cursor-pointer">[ Operations ]</span>
                  <span className="hover:text-white transition-colors cursor-pointer">[ Security ]</span>
                  <span className="hover:text-white transition-colors cursor-pointer">[ Compliance ]</span>
                </div>
              </div>

              <div className="col-span-1 md:col-span-2 space-y-3">
                <p className="text-[#16ff9e] font-sans font-bold text-[11px] uppercase tracking-wider">SYSTEM</p>
                <div className="space-y-1.5 flex flex-col text-[11px] text-outline">
                  <span className="hover:text-white transition-colors cursor-pointer">[ Terms ]</span>
                  <span className="hover:text-white transition-colors cursor-pointer">[ Network_status ]</span>
                  <span className="hover:text-white transition-colors cursor-pointer">[ Registry ]</span>
                </div>
              </div>

              <div className="md:col-span-3 space-y-3 text-left md:text-right flex flex-col md:items-end">
                <p className="text-white font-bold font-sans text-[11px] uppercase tracking-wider">CLUSTER_ALPHA // #REGION_PRIMARY</p>
                
                {/* Node visualizer visual bar indicator matching footer */}
                <div className="flex items-center gap-1.5 py-1">
                  <span className="w-4 h-1 bg-outline-variant/30 rounded-sm"></span>
                  <span className="w-4 h-1 bg-outline-variant/30 rounded-sm"></span>
                  <span className="w-4 h-1 bg-[#16ff9e] rounded-sm shadow-[0_0_8px_#16ff9e]"></span>
                  <span className="w-4 h-1 bg-outline-variant/30 rounded-sm"></span>
                  <span className="w-4 h-1 bg-outline-variant/30 rounded-sm"></span>
                </div>
                
                <p className="text-[10px] text-outline mt-1 uppercase">LAT: -1.9441° S LON: 30.0619° E</p>
              </div>

            </div>
          </footer>

        </div>
      )}

    </div>
  );
}
