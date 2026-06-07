import React, { useState, useEffect } from "react";
import { 
  PortalSidebarTab, 
  SystemResource, 
  ResourceDocument, 
  MentorshipSyncEvent, 
  ProjectEntry, 
  TerminalLogLine 
} from "../types";
import { 
  Activity, 
  Database, 
  LayoutDashboard, 
  LineChart, 
  Network, 
  Plus, 
  Power, 
  Search, 
  Settings, 
  Trash2, 
  UploadCloud, 
  Users, 
  AlertTriangle,
  FolderDot,
  Wrench,
  Sparkles,
  RefreshCw
} from "lucide-react";

interface PortalDashboardProps {
  role: "client" | "student";
  userRef: string;
  onLogout: () => void;
  onShowNotification: (msg: string) => void;
}

export default function PortalDashboard({ role, userRef, onLogout, onShowNotification }: PortalDashboardProps) {
  const [activeTab, setActiveTab] = useState<PortalSidebarTab>("overview");
  const [systemTime, setSystemTime] = useState<string>("06:24:35");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Resource Documents State
  const [documents, setDocuments] = useState<ResourceDocument[]>([
    {
      id: "doc-1",
      title: "System Scalability Protocols",
      fileRef: "CORE_INFRA_V4.PDF",
      imageAlt: "Infrastructure Documentation Layout",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuADrtC091vVu4aDnZxGJU5dj4XL9Z86r-c3ZPKJZqpF-xqn6HjDN4OJ_IzLD-sd5q8CUxRSalqKRQL3GsuLd3Zx2zDc0lSLqKQE_3_xZOHfjTgESa6T_Gvpn-8Ri_CmzDUtYJyp7OXRrb1ogWrZ0InwFxEGxDt7lJWr1L-4YXLQuJriReOj_-YPUoVbjBikATUlxNspy-nn7g0rU0GjmKL4MUKs7yR7fvVpBY4CjrkoyL75o2G8d4wFAIvb3ZV8n9kpJsBKXP9fwrg",
      category: "infrastructure"
    },
    {
      id: "doc-2",
      title: "Encryption Layer Standards",
      fileRef: "AUTH_MOD_22.DOC",
      imageAlt: "Circuit Documentation Board",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCN8a04qvoEXWiGuGIt6mCHtSJKpFDbY3X-HmdzDE2Jf7ay3AauWie8GbS6bdnv_sTDpZ9eS2ePxi4zGepsEbTpDIUuOrAo0gBLPiEdNaaIin66eLjvqrtrDV_NHZlJpurcN-gQPW3J4GuaM8TEwiwUVBhxj-i09dUoYi3Hr0EyOSx0M9ZKv5YbXKgogqz5-jg9sSE6maED-IqGMosoddPiKPaWxiwgbhtxBqbvtGchNggBs8vEyJ59AOsBXe0Vk117aGpg4Z7H9M8",
      category: "cryptography"
    },
    {
      id: "doc-3",
      title: "Global Topology Mapping",
      fileRef: "NET_MAP_GBL.SVG",
      imageAlt: "Digital Topology Sphere",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCOt_4WHlXBVXWBG7stYnZR0HwruLAs1K1I2XubZ2SsGbXZyE3P5WvW0jOl0TQsLYhPhg4VL26IoAQoOIKVOr2vlhTUcd653w56OQbIBc-jlFy_7CL56Pd_Vwnn2EX5i5Vr7lHWbYL6jhA4dI4TVhtDcwe2ew8hOv1tA38FXsXyQxvt-nTxBNkY23eeKrpsARoD8gn_HX9so6zBvZKmSZFEGEHPeyNe6UzT0ZOkuT5uwfx4Jfz0IoA4LBlO9_IFYgAe9c-lU1pCPoM",
      category: "topology"
    }
  ]);

  // Mentorship Synchronizations
  const [syncEvents, setSyncEvents] = useState<MentorshipSyncEvent[]>([
    {
      id: "ev-1",
      timeLabel: "14:00 - TODAY",
      timeSub: "14:00",
      title: "Code Review: Edge Runtime",
      instructor: "Dr. Aris Thorne"
    },
    {
      id: "ev-2",
      timeLabel: "10:00 - TOMORROW",
      timeSub: "10:00",
      title: "Architecture Deep Dive",
      instructor: "Senior Specialist"
    },
    {
      id: "ev-3",
      timeLabel: "16:30 - WEDNESDAY",
      timeSub: "16:30",
      title: "Security Audit Briefing",
      instructor: "Compliance Team"
    }
  ]);

  // Cluster Allocation resources table
  const [resources, setResources] = useState<SystemResource[]>([
    {
      id: "RES_LN_7782",
      name: "Global Central Neural Hub",
      allocationNode: "NODE-7",
      priority: "CRITICAL",
      status: "Active",
      activity: "12.2ms"
    },
    {
      id: "RES_LN_0911",
      name: "Satellite Uplink Station 4",
      allocationNode: "UPLINK-SEC-4",
      priority: "STANDARD",
      status: "Active",
      activity: "44.8ms"
    },
    {
      id: "RES_LN_2210",
      name: "Research & Dev Cloud Cluster",
      allocationNode: "DEV-CLUSTER-9",
      priority: "HIGH",
      status: "Sync_Wait",
      activity: "--"
    },
    {
      id: "RES_LN_5541",
      name: "Logistics Automation Grid",
      allocationNode: "GRID-WEST-A",
      priority: "STANDARD",
      status: "Active",
      activity: "18.1ms"
    }
  ]);

  // Projects Master Database
  const [projects, setProjects] = useState<ProjectEntry[]>([
    { id: "p-1", name: "LanariFlow ERP Integration", codeName: "LNT-FLOW", client: "Rwanda Logistics S.A.", leadEngineer: "Alex Mugisha", progress: 78, status: "active" },
    { id: "p-2", name: "Ubumwe Connect API Mesh", codeName: "UBUMWE-M", client: "Pan-African Trade union", leadEngineer: "Diane Umutoni", progress: 95, status: "active" },
    { id: "p-3", name: "SecureGrid Decoupled Vault", codeName: "SECURE-V", client: "Kigali National Bank", leadEngineer: "Dr. Aris Thorne", progress: 15, status: "pipeline" },
    { id: "p-4", name: "DataCore African Ledger", codeName: "CORE-LEDG", client: "Sovereignty Group", leadEngineer: "Robert Kamanzi", progress: 100, status: "completed" }
  ]);

  // Terminal telemetry log list
  const [telemetryLogs, setTelemetryLogs] = useState<string[]>([
    "[OK] DB_INITIALIZED :: NODE_WEST_ALPHA",
    "[OK] AUTH_PROXY_HANDSHAKE :: USER_ADMIN_01",
    "[WARN] LATENCY_SPIKE :: RES_LN_2210 (144ms)",
    "[OK] ASSET_DEPLOYMENT_COMPLETE :: BUILD_v.3.2",
    "[OK] COMPUTE_ALLOCATION_OPTIMIZED :: HUB_04"
  ]);

  // Forms State
  const [newProjectName, setNewProjectName] = useState<string>("");
  const [newProjectClient, setNewProjectClient] = useState<string>("");
  const [newProjectLead, setNewProjectLead] = useState<string>("Alex Mugisha");

  const [newDocTitle, setNewDocTitle] = useState<string>("");
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const [settingsLoad, setSettingsLoad] = useState<number>(24.8);
  const [settingsHealth, setSettingsHealth] = useState<boolean>(true);

  // Custom CLI command state
  const [terminalInput, setTerminalInput] = useState<string>("");

  // Live timer tick
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, "0");
      const m = String(now.getMinutes()).padStart(2, "0");
      const s = String(now.getSeconds()).padStart(2, "0");
      setSystemTime(`${h}:${m}:${s}`);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Periodic random console log tick
  useEffect(() => {
    const randomLogs = [
      "PACKET_TRANSFER_SUCCESS :: NODE_7_ACTIVE",
      "MEMORY_PURGE_EXECUTED :: REGISTRY_SYNC [OK]",
      "ENCRYPTION_ROTATION_COMPLETED :: AES-256",
      "SYNC_TARGET_REACHED :: CLUSTER_INTEGRITY_INDEX_100",
      "THERMAL_CONTROL_STABLE :: FAN_RPM_3400",
      "MONITORING :: HEALTH_STATUS_NOMINAL"
    ];
    
    const logger = setInterval(() => {
      const indicator = Math.random() > 0.15 ? "[OK]" : "[WARN]";
      const parsedLogLabel = `${indicator} ${randomLogs[Math.floor(Math.random() * randomLogs.length)]}`;
      setTelemetryLogs((prev) => {
        const sliced = prev.length > 7 ? prev.slice(1) : prev;
        return [...sliced, parsedLogLabel];
      });
    }, 5500);

    return () => clearInterval(logger);
  }, []);

  // Create Project Callback
  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjectName || !newProjectClient) {
      onShowNotification("Initialization parameters incomplete.");
      return;
    }
    const codes = ["ALPHA", "DELTA", "ZETA", "SIGMA", "KIGALI", "RW"];
    const randomizedCode = `${codes[Math.floor(Math.random() * codes.length)]}-${Math.floor(Math.random() * 900 + 100)}`;
    const newPrj: ProjectEntry = {
      id: `p-${Date.now()}`,
      name: newProjectName,
      codeName: randomizedCode,
      client: newProjectClient,
      leadEngineer: newProjectLead,
      progress: 0,
      status: "pipeline"
    };
    setProjects((prev) => [newPrj, ...prev]);
    setNewProjectName("");
    setNewProjectClient("");
    onShowNotification(`Project code block [${randomizedCode}] compiled into register [OK]`);
  };

  // Upload/Add Resource Document
  const handleAddDocument = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDocTitle) {
      onShowNotification("Document reference title invalid.");
      return;
    }
    setIsUploading(true);
    setTimeout(() => {
      const fileRefs = ["SYS_NET_COMP.PDF", "CR_CRYPT_V2.DOC", "TOPOL_GEO_R.SVG", "KRN_LOCK_CONF.PDF"];
      const randomizedFile = fileRefs[Math.floor(Math.random() * fileRefs.length)];
      const docImages = [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuADrtC091vVu4aDnZxGJU5dj4XL9Z86r-c3ZPKJZqpF-xqn6HjDN4OJ_IzLD-sd5q8CUxRSalqKRQL3GsuLd3Zx2zDc0lSLqKQE_3_xZOHfjTgESa6T_Gvpn-8Ri_CmzDUtYJyp7OXRrb1ogWrZ0InwFxEGxDt7lJWr1L-4YXLQuJriReOj_-YPUoVbjBikATUlxNspy-nn7g0rU0GjmKL4MUKs7yR7fvVpBY4CjrkoyL75o2G8d4wFAIvb3ZV8n9kpJsBKXP9fwrg",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCN8a04qvoEXWiGuGIt6mCHtSJKpFDbY3X-HmdzDE2Jf7ay3AauWie8GbS6bdnv_sTDpZ9eS2ePxi4zGepsEbTpDIUuOrAo0gBLPiEdNaaIin66eLjvqrtrDV_NHZlJpurcN-gQPW3J4GuaM8TEwiwUVBhxj-i09dUoYi3Hr0EyOSx0M9ZKv5YbXKgogqz5-jg9sSE6maED-IqGMosoddPiKPaWxiwgbhtxBqbvtGchNggBs8vEyJ59AOsBXe0Vk117aGpg4Z7H9M8",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCOt_4WHlXBVXWBG7stYnZR0HwruLAs1K1I2XubZ2SsGbXZyE3P5WvW0jOl0TQsLYhPhg4VL26IoAQoOIKVOr2vlhTUcd653w56OQbIBc-jlFy_7CL56Pd_Vwnn2EX5i5Vr7lHWbYL6jhA4dI4TVhtDcwe2ew8hOv1tA38FXsXyQxvt-nTxBNkY23eeKrpsARoD8gn_HX9so6zBvZKmSZFEGEHPeyNe6UzT0ZOkuT5uwfx4Jfz0IoA4LBlO9_IFYgAe9c-lU1pCPoM"
      ];
      const randomizedImg = docImages[Math.floor(Math.random() * docImages.length)];
      const newD: ResourceDocument = {
        id: `doc-${Date.now()}`,
        title: newDocTitle,
        fileRef: randomizedFile,
        imageAlt: "Uploaded User Asset",
        imageUrl: randomizedImg,
        category: "infrastructure"
      };
      setDocuments((prev) => [...prev, newD]);
      setNewDocTitle("");
      setIsUploading(false);
      onShowNotification(`Resource ${randomizedFile} structural upload verified [OK]`);
    }, 1200);
  };

  // Sync assessed callback
  const handleRequestSync = () => {
    const syncSubjects = [
      "Database Optimization Sync",
      "Network Load Telemetry review",
      "Ubumwe API Compliance review",
      "Kigali SEZ Node diagnostics check"
    ];
    const newS: MentorshipSyncEvent = {
      id: `ev-${Date.now()}`,
      timeLabel: "15:30 - THURSDAY",
      timeSub: "15:30",
      title: syncSubjects[Math.floor(Math.random() * syncSubjects.length)],
      instructor: "Assigned Lead Engineer"
    };
    setSyncEvents((prev) => [...prev, newS]);
    onShowNotification("Mentorship parameter synchronized, queued in Node-07 registry.");
  };

  // Delete SystemResource
  const handleDeleteResource = (id: string, name: string) => {
    setResources((prev) => prev.filter((r) => r.id !== id));
    onShowNotification(`Resource Node Reference ${id} disconnected from network.`);
  };

  // Change resource allocation status
  const handleToggleResourceStatus = (id: string) => {
    setResources((prev) => 
      prev.map((r) => {
        if (r.id === id) {
          const nextStatusValue = r.status === "Active" ? "Sync_Wait" : r.status === "Sync_Wait" ? "Terminated" : "Active";
          onShowNotification(`Resource ${id} status toggled: ${nextStatusValue}`);
          return {
            ...r,
            status: nextStatusValue,
            activity: nextStatusValue === "Active" ? "12.2ms" : nextStatusValue === "Sync_Wait" ? "99ms" : "--"
          };
        }
        return r;
      })
    );
  };

  // Command Input Submit
  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!terminalInput) return;
    const commandText = terminalInput.trim().toUpperCase();
    let logOutput = "";
    if (commandText === "RESTAGE" || commandText === "RESET") {
      logOutput = `[OK] RESET_PROTOCOL_SUCCESS :: SYSTEM CLEAR`;
      setResources([
        { id: "RES_LN_7782", name: "Global Central Neural Hub", allocationNode: "NODE-7", priority: "CRITICAL", status: "Active", activity: "12.2ms" },
        { id: "RES_LN_0911", name: "Satellite Uplink Station 4", allocationNode: "UPLINK-SEC-4", priority: "STANDARD", status: "Active", activity: "44.8ms" }
      ]);
    } else if (commandText.startsWith("PING")) {
      logOutput = `[OK] TELEMETRY PING :: NODE RESPONSE IN LATENCY ${latencyFluct()}`;
    } else if (commandText.startsWith("HELP")) {
      logOutput = `[INFO] VALID COMMANDS :: 'RESTAGE', 'PING', 'STATUS', 'HEALTH'`;
    } else {
      logOutput = `[OK] EXECUTED COMMAND: '${commandText}' :: MOCKED OUTPUT VALUE NOMINAL`;
    }
    setTelemetryLogs((prev) => [...prev, logOutput]);
    setTerminalInput("");
    onShowNotification(`CLI command '${commandText}' dispatch validated.`);
  };

  const latencyFluct = () => `${(10 + Math.random() * 20).toFixed(1)}ms`;

  const filteredDocuments = documents.filter((doc) => 
    doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.fileRef.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-background">
      
      {/* SIDEBAR NAVIGATION PANEL */}
      <aside className="w-full lg:w-64 bg-surface-container-low border-r border-outline-variant flex flex-col justify-between shrink-0">
        <div>
          <div className="p-6 border-b border-outline-variant space-y-2">
            <h1 className="text-2xl font-extrabold text-white uppercase tracking-tighter">
              Lanari Portal
            </h1>
            <p className="font-mono text-[10px] uppercase text-outline tracking-widest font-bold">
              V2.0.4-Engineering
            </p>
          </div>

          <nav className="p-4 space-y-2 select-none">
            
            <button 
              onClick={() => setActiveTab("overview")}
              className={`w-full flex items-center gap-3 px-4 py-3 transition-colors text-left font-mono text-xs font-bold uppercase tracking-widest ${
                activeTab === "overview" 
                  ? "bg-[#16ff9e] text-[#002110]" 
                  : "text-on-surface-variant hover:text-white hover:bg-[#272a2c]"
              }`}
            >
              <LayoutDashboard size={16} />
              <span>Overview</span>
            </button>

            <button 
              onClick={() => setActiveTab("projects")}
              className={`w-full flex items-center gap-3 px-4 py-3 transition-colors text-left font-mono text-xs font-bold uppercase tracking-widest ${
                activeTab === "projects" 
                  ? "bg-[#16ff9e] text-[#002110]" 
                  : "text-on-surface-variant hover:text-white hover:bg-[#272a2c]"
              }`}
            >
              <FolderDot size={16} />
              <span>Projects</span>
            </button>

            <button 
              onClick={() => setActiveTab("resources")}
              className={`w-full flex items-center gap-3 px-4 py-3 transition-colors text-left font-mono text-xs font-bold uppercase tracking-widest ${
                activeTab === "resources" 
                  ? "bg-[#16ff9e] text-[#002110]" 
                  : "text-on-surface-variant hover:text-white hover:bg-[#272a2c]"
              }`}
            >
              <Wrench size={16} />
              <span>Terminal & Log</span>
            </button>

            <button 
              onClick={() => setActiveTab("console")}
              className={`w-full flex items-center gap-3 px-4 py-3 transition-colors text-left font-mono text-xs font-bold uppercase tracking-widest ${
                activeTab === "console" 
                  ? "bg-[#16ff9e] text-[#002110]" 
                  : "text-on-surface-variant hover:text-white hover:bg-[#272a2c]"
              }`}
            >
              <LineChart size={16} />
              <span>HQ Console</span>
            </button>

            <button 
              onClick={() => setActiveTab("settings")}
              className={`w-full flex items-center gap-3 px-4 py-3 transition-colors text-left font-mono text-xs font-bold uppercase tracking-widest ${
                activeTab === "settings" 
                  ? "bg-[#16ff9e] text-[#002110]" 
                  : "text-on-surface-variant hover:text-white hover:bg-[#272a2c]"
              }`}
            >
              <Settings size={16} />
              <span>Settings</span>
            </button>

          </nav>
        </div>

        {/* Sidebar Footer Logout and mock button */}
        <div className="p-4 border-t border-outline-variant space-y-4">
          <div className="p-3 bg-[#101415] border border-outline-variant rounded-sm text-center">
            <p className="font-mono text-[9px] text-outline uppercase font-bold text-left mb-1">Authenticated via:</p>
            <p className="font-mono text-xs text-secondary-fixed text-left font-bold truncate">
              {role.toUpperCase()} // {userRef}
            </p>
          </div>

          <button 
            type="button"
            onClick={onLogout}
            className="w-full bg-[#93000a] text-white py-3 font-mono text-xs uppercase tracking-widest font-bold hover:brightness-115 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Power size={14} />
            <span>TERMINATE HANDSHAKE</span>
          </button>
        </div>
      </aside>

      {/* MAIN SYSTEM OPERATIONS CANVAS */}
      <main className="flex-grow flex flex-col min-w-0">
        
        {/* Top Header tracking statuses */}
        <header className="h-20 bg-surface-container border-b border-outline-variant flex items-center justify-between px-6 md:px-12 z-20 shrink-0">
          <div className="flex items-center gap-6">
            <span className="text-xl font-extrabold text-white tracking-widest uppercase">
              {activeTab === "console" ? "HQ CONSOLE" : `NODE WORKSPACE: 07`}
            </span>
            <div className="hidden md:flex items-center bg-[#101415]/80 border border-outline-variant px-3 py-1.5 focus-within:border-secondary-fixed">
              <Search size={14} className="text-outline mr-2" />
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="CMD_SEARCH..."
                className="bg-transparent border-none focus:ring-0 text-mono text-xs font-mono text-white outline-none w-48"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-right select-none space-y-1">
              <p className="font-mono text-[9px] text-outline font-bold">SYSTEM_TIME_UTC</p>
              <p className="font-mono text-sm text-[#16ff9e] font-bold tabular-nums">
                {systemTime}
              </p>
            </div>

            <div className="flex items-center gap-3 border-l border-outline-variant pl-6 select-none">
              <div className="text-right hidden sm:block">
                <p className="font-mono text-xs text-white font-bold">{userRef}</p>
                <p className="font-mono text-[9px] text-outline capitalize text-right">{role} Node Mode</p>
              </div>
              <div className="w-10 h-10 border border-outline-variant rounded-full overflow-hidden grayscale bg-surface-container-high relative">
                {/* Embedded admin avatar asset */}
                <img 
                  alt="Assigned Operator avatar" 
                  className="w-full h-full object-cover" 
                  src={role === "client" 
                    ? "https://lh3.googleusercontent.com/aida-public/AB6AXuAbYZnsGPqHlYKhXL_AZS_NUzMkm_uEn2QcKRiI-DP2IjTiV1IL0hXan-zMK1mOYleBP3pK61WYbmuRoIKYZ3NYkL26wH8uo2go9h1JI_BFtCC6rp8JxpQk1o9Fx64-Fin-uRId0sEkUpiQvgKI3VGW3PUYAdmanDRxcK89DgEqs7nRvG2Rg32ybRP-Mmor0ZJHx5UicGXe_jziEi7OCGuVvnoBrPxDd_115M4L18cv4RoALerLgIUZddma6DkXg7ud-MFNtA9UL-0"
                    : "https://lh3.googleusercontent.com/aida-public/AB6AXuAsjX98V56vNb0tzQzfa6zPtnLyuWeJLE8lbOEDlsgMB3otC3uNk1IGdEaR0cAkDDra3w_T93aTGFvYEgCMD8Vg_pCNIoZZ4ZFH_xh9fyU4pr6Wpu78P4J9OGG8GP1cAJY7_xIe4lBt8f4QXncSXkcnSdeKxblQUzjHicsmlm9lwJae6qWqzUN3oywrFkYLtkWfChUtxaAtSm6YUfVUTJP2ImE6fmwL0cXY6yc99Bn3Ceg2n6k5vYxYtRnXyFYLpu1kOlxr86JTpfs"
                  }
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </header>

        {/* DYNAMIC SCROLL CONTAINER VIEW ROUTED BY ACTIVE TAB */}
        <div className="flex-grow overflow-y-auto p-6 md:p-12 space-y-12 relative">
          
          <div className="absolute top-[300px] left-0 right-0 h-px bg-[#1d2022] pointer-events-none opacity-25"></div>
          <div className="absolute top-0 bottom-0 left-[200px] w-px bg-[#1d2022] pointer-events-none opacity-25"></div>

          {/* TAB 1: OVERVIEW SCREEN */}
          {activeTab === "overview" && (
            <div className="space-y-12 animate-fade-in">
              <div className="flex justify-between items-end border-l-4 border-secondary-fixed pl-4 mb-4">
                <div>
                  <span className="font-mono text-xs text-secondary-fixed uppercase tracking-widest font-bold">
                    SYSTEM OPERATIONAL
                  </span>
                  <p className="text-2xl md:text-3xl font-extrabold text-white uppercase mt-1">
                    Node Performance Metrics
                  </p>
                </div>
                <div className="font-mono text-xs text-outline space-y-1 text-right">
                  <p>NODE_UPTIME: <span className="text-white font-bold">99.998%</span></p>
                  <p>TUNNEL_RESP: <span className="text-secondary-fixed font-bold">14ms</span></p>
                </div>
              </div>

              {/* Progress sequence tracker layout */}
              <section className="bg-surface-container-low border border-outline-variant p-6 md:p-8 select-none">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="font-mono text-xs text-outline uppercase tracking-widest font-bold">
                    Development Sequence Progress
                  </h3>
                  <span className="font-mono text-xs text-secondary-fixed font-bold">
                    SEQ_REF: LN-9920
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="relative p-2 border-l border-secondary-fixed">
                    <div className="h-1 bg-secondary-fixed mb-4 shadow-[0_0_10px_rgba(86,227,139,0.5)]"></div>
                    <span className="font-mono text-[9px] text-secondary-fixed uppercase font-bold font-bold">
                      01 / COMPLETE
                    </span>
                    <h4 className="font-mono text-xs font-bold text-white uppercase mt-1">Initialization</h4>
                    <p className="text-[11px] text-on-surface-variant font-sans mt-2">
                      Environment config orchestration and dependency limits finalized.
                    </p>
                  </div>

                  <div className="relative p-2 border-l border-secondary-fixed">
                    <div className="h-1 bg-secondary-fixed mb-4 shadow-[0_0_10px_rgba(86,227,139,0.5)]"></div>
                    <span className="font-mono text-[9px] text-secondary-fixed uppercase font-bold">
                      02 / COMPLETE
                    </span>
                    <h4 className="font-mono text-xs font-bold text-white uppercase mt-1">Architecture</h4>
                    <p className="text-[11px] text-on-surface-variant font-sans mt-2">
                      Schema mapping and structural type verification confirmed.
                    </p>
                  </div>

                  <div className="relative p-2 border-l border-secondary-fixed/50">
                    <div className="h-1 bg-secondary-fixed-dim/30 mb-4 overflow-hidden relative">
                      <div className="h-full bg-secondary-fixed animate-pulse" style={{ width: "75%" }}></div>
                    </div>
                    <span className="font-mono text-[9px] text-secondary-fixed-dim uppercase font-bold">
                      03 / PROCESSING
                    </span>
                    <h4 className="font-mono text-xs font-bold text-white uppercase mt-1">Compilation</h4>
                    <p className="text-[11px] text-on-surface-variant font-sans mt-2">
                      Optimizing build assets for high-performance scale.
                    </p>
                  </div>

                  <div className="relative p-2 border-l border-outline-variant">
                    <div className="h-1 bg-outline-variant mb-4"></div>
                    <span className="font-mono text-[9px] text-outline opacity-40 uppercase font-bold">
                      04 / PENDING
                    </span>
                    <h4 className="font-mono text-xs font-bold text-white uppercase opacity-40 mt-1">Deployment</h4>
                    <p className="text-[11px] text-on-surface-variant/40 font-sans mt-2">
                      Active state compilation on edge nodes.
                    </p>
                  </div>
                </div>
              </section>

              {/* Bento Grid Analytics */}
              <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Bar chart mockup */}
                <div className="lg:col-span-8 bg-surface-container-low border border-outline-variant p-6 md:p-8 relative">
                  <div className="absolute top-4 right-4 font-mono text-[9px] text-outline uppercase select-none">
                    DATA_STREAM_01
                  </div>
                  <h3 className="font-mono text-xs text-secondary-fixed font-bold tracking-wider mb-6">
                    Performance Analytics // Real-time Load
                  </h3>

                  <div className="flex flex-col sm:flex-row gap-12 items-end">
                    
                    {/* Visual Bars layout and interactivity */}
                    <div className="flex-1 h-48 flex items-end gap-3 w-full bg-primary-container p-4 border border-outline-variant">
                      <div className="flex-1 bg-outline-variant hover:bg-[#16ff9e] transition-all duration-300 h-[45%] pointer-events-auto cursor-pointer" title="Load: 45%"></div>
                      <div className="flex-1 bg-outline-variant hover:bg-[#16ff9e] transition-all duration-300 h-[60%] pointer-events-auto cursor-pointer" title="Load: 60%"></div>
                      <div className="flex-1 bg-outline-variant hover:bg-[#16ff9e] transition-all duration-300 h-[52%] pointer-events-auto cursor-pointer" title="Load: 52%"></div>
                      <div className="flex-1 bg-outline-variant hover:bg-[#16ff9e] transition-all duration-300 h-[83%] pointer-events-auto cursor-pointer" title="Load: 83%"></div>
                      <div className="flex-1 bg-outline-variant hover:bg-[#16ff9e] transition-all duration-300 h-[70%] pointer-events-auto cursor-pointer" title="Load: 70%"></div>
                      <div className="flex-1 bg-outline-variant hover:bg-[#16ff9e] transition-all duration-300 h-[92%] pointer-events-auto cursor-pointer" title="Load: 92%"></div>
                      <div className="flex-1 bg-[#16ff9e] h-full shadow-[0_0_15px_rgba(22,255,158,0.5)] cursor-pointer" title="Peak Active: 100%"></div>
                    </div>

                    <div className="w-full sm:w-1/3 space-y-6">
                      <div>
                        <span className="font-mono text-[9px] text-outline block mb-1">Network Load</span>
                        <p className="text-2xl font-extrabold text-white font-sans">
                          72.4<span className="text-xs text-outline ml-1 font-mono">gbps</span>
                        </p>
                      </div>

                      <div>
                        <span className="font-mono text-[9px] text-outline block mb-1">CPU Cycles</span>
                        <p className="text-2xl font-extrabold text-white font-sans">
                          12.1<span className="text-xs text-outline ml-1 font-mono">%</span>
                        </p>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Mentorship sync logs */}
                <div className="lg:col-span-4 bg-primary-container border border-outline-variant p-6 flex flex-col justify-between">
                  <div className="space-y-6">
                    <div className="flex justify-between items-start">
                      <h3 className="font-mono text-xs uppercase tracking-widest text-white font-bold">
                        Mentorship Sync
                      </h3>
                      <Users size={16} className="text-secondary-fixed" />
                    </div>

                    <div className="space-y-4">
                      {syncEvents.slice(0, 3).map((ev) => (
                        <div key={ev.id} className="border-l-2 border-secondary-fixed pl-4 py-1">
                          <p className="font-mono text-[9px] text-secondary-fixed uppercase font-bold">{ev.timeLabel}</p>
                          <p className="font-sans text-xs font-bold text-white mt-0.5">{ev.title}</p>
                          <p className="font-sans text-[10px] text-on-surface-variant">Lead: {ev.instructor}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button 
                    onClick={handleRequestSync}
                    className="w-full mt-8 border border-outline-variant py-2 font-mono text-xs uppercase text-white hover:bg-surface-container-highest cursor-pointer tracking-widest"
                  >
                    Request Sync
                  </button>
                </div>

              </section>

              {/* Resource Documents with image previews */}
              <section className="bg-surface-container-low border border-[#1d2022] p-6 md:p-8 space-y-8">
                <div className="flex justify-between items-center border-b border-outline-variant pb-4 flex-wrap gap-4 select-none">
                  <h3 className="font-mono text-xs text-white uppercase tracking-widest font-bold">
                    Resource Repository
                  </h3>
                  
                  {/* Form to mock upload document reference */}
                  <form onSubmit={handleAddDocument} className="flex gap-2 flex-wrap">
                    <input 
                      type="text"
                      required
                      value={newDocTitle}
                      onChange={(e) => setNewDocTitle(e.target.value)}
                      placeholder="NEW_RESOURCE_TITLE..."
                      className="bg-surface-container-lowest border border-outline-variant text-white font-mono text-xs p-2 focus:border-secondary-fixed focus:ring-0 max-w-xs"
                    />
                    <button 
                      type="submit" 
                      disabled={isUploading}
                      className="bg-secondary-fixed hover:brightness-110 text-[#002110] px-4 py-2 font-mono text-xs uppercase tracking-wider font-bold flex items-center gap-1.5 cursor-pointer max-w-max"
                    >
                      <UploadCloud size={14} />
                      {isUploading ? "SAVING..." : "UPLOAD"}
                    </button>
                  </form>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {filteredDocuments.map((doc) => (
                    <div key={doc.id} className="group cursor-pointer">
                      <div className="aspect-video mb-4 overflow-hidden border border-outline-variant relative bg-surface-container-high/40">
                        <img 
                          alt={doc.imageAlt} 
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-105 group-hover:scale-100" 
                          src={doc.imageUrl}
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-secondary-fixed/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      </div>
                      <p className="font-mono text-[9px] text-secondary-fixed font-bold mb-1">
                        {doc.fileRef}
                      </p>
                      <h4 className="font-sans text-xs font-bold text-white uppercase truncate">
                        {doc.title}
                      </h4>
                    </div>
                  ))}

                  {/* Add document manual card click option */}
                  <div 
                    onClick={() => onShowNotification("Enter text in 'NEW_RESOURCE_TITLE' above to upload custom doc asset.")}
                    className="border border-dashed border-outline-variant hover:border-secondary-fixed flex flex-col items-center justify-center p-6 bg-[#121516]/50 transition-colors cursor-pointer"
                  >
                    <Plus size={24} className="text-outline mb-2" />
                    <p className="font-mono text-[10px] text-outline uppercase font-bold">Upload Resource</p>
                  </div>
                </div>
              </section>

            </div>
          )}

          {/* TAB 2: PROJECTS REGISTER DATABASE */}
          {activeTab === "projects" && (
            <div className="space-y-12 animate-fade-in font-sans">
              
              <div className="flex justify-between items-end border-l-4 border-secondary-fixed pl-4">
                <div>
                  <span className="font-mono text-xs text-secondary-fixed uppercase tracking-widest block font-bold">
                    SYSTEMS REGISTRY DATABASE
                  </span>
                  <h2 className="text-3xl font-extrabold uppercase text-white tracking-tight mt-1">
                    Projects Compilation
                  </h2>
                </div>
                <span className="font-mono text-xs text-outline hidden sm:block">COUNT: {projects.length} RECORDS</span>
              </div>

              {/* Form to Add Project */}
              <div className="bg-surface-container-low border border-outline-variant p-6 md:p-8 space-y-6">
                <h3 className="font-sans text-lg font-bold text-white uppercase border-b border-outline-variant pb-2">
                  Compile New Project Block
                </h3>
                
                <form onSubmit={handleCreateProject} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="font-mono text-[10px] text-outline block uppercase font-bold">Project Name</label>
                    <input 
                      type="text"
                      required
                      value={newProjectName}
                      onChange={(e) => setNewProjectName(e.target.value)}
                      placeholder="e.g. SecureGrid API Gateway (GCP)"
                      className="w-full bg-[#191c1e] border border-outline-variant text-white font-sans text-xs p-3 rounded-sm focus:border-secondary-fixed focus:ring-0"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="font-mono text-[10px] text-outline block uppercase font-bold">Client Entity</label>
                    <input 
                      type="text"
                      required
                      value={newProjectClient}
                      onChange={(e) => setNewProjectClient(e.target.value)}
                      placeholder="e.g. Kigali Transit Ltd"
                      className="w-full bg-[#191c1e] border border-outline-variant text-white font-sans text-xs p-3 rounded-sm focus:border-secondary-fixed focus:ring-0"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="font-mono text-[10px] text-outline block uppercase font-bold">Assigned Lead Engineer</label>
                    <select 
                      value={newProjectLead}
                      onChange={(e) => setNewProjectLead(e.target.value)}
                      className="w-full bg-[#191c1e] border border-outline-variant text-white font-sans text-xs p-3 rounded-sm focus:border-secondary-fixed focus:ring-0 outline-none"
                    >
                      <option value="Alex Mugisha">Alex Mugisha (Node Developer)</option>
                      <option value="Diane Umutoni">Diane Umutoni (Full Stack)</option>
                      <option value="Dr. Aris Thorne">Dr. Aris Thorne (SecOps Lead)</option>
                      <option value="Robert Kamanzi">Robert Kamanzi (Rust architect)</option>
                    </select>
                  </div>

                  <div className="col-span-1 md:col-span-3 flex justify-end">
                    <button 
                      type="submit"
                      className="bg-secondary-fixed text-on-secondary px-8 py-3 font-mono text-xs font-bold uppercase tracking-widest cursor-pointer text-[#002110]"
                    >
                      Compile Project
                    </button>
                  </div>
                </form>
              </div>

              {/* Projects List Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {projects.map((proj) => (
                  <div 
                    key={proj.id} 
                    className="border border-outline-variant bg-surface-container-low p-6 flex flex-col justify-between relative group hover:border-[#16ff9e] transition-colors"
                  >
                    <div className="absolute top-4 right-4 font-mono text-[9px] text-outline bg-surface-container px-2 py-1 select-none font-bold">
                      {proj.codeName}
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-1">
                        <span className={`px-2 py-0.5 text-[9px] font-mono font-bold uppercase ${
                          proj.status === "completed" 
                            ? "bg-secondary-fixed text-[#002110]" 
                            : proj.status === "active" 
                              ? "bg-primary-container text-secondary-fixed border border-secondary-fixed" 
                              : "border border-outline-variant text-outline-variant"
                        }`}>
                          {proj.status.toUpperCase()}
                        </span>
                        <h4 className="text-lg font-bold text-white uppercase pt-1 tracking-tight truncate max-w-[260px]">
                          {proj.name}
                        </h4>
                      </div>

                      <div className="space-y-1 text-xs">
                        <p className="text-on-surface-variant"><span className="font-mono text-[10px] text-outline block sm:inline-block sm:w-24">CLIENT:</span> {proj.client}</p>
                        <p className="text-on-surface-variant"><span className="font-mono text-[10px] text-outline block sm:inline-block sm:w-24">LEAD_ENG:</span> {proj.leadEngineer}</p>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-outline-variant/30 space-y-2">
                      <div className="flex justify-between items-center text-xs font-mono font-bold">
                        <span className="text-outline">COMPILATION_INTEGRITY</span>
                        <span className="text-white">{proj.progress}%</span>
                      </div>
                      <div className="h-1.5 bg-[#101415] w-full">
                        <div className="h-full bg-secondary-fixed transition-all duration-500" style={{ width: `${proj.progress}%` }}></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* TAB 3: TERMINAL & SYSTEM LOGS */}
          {activeTab === "resources" && (
            <div className="space-y-12 animate-fade-in font-mono">
              
              <div className="flex justify-between items-end border-l-4 border-secondary-fixed pl-4">
                <div>
                  <span className="font-mono text-xs text-secondary-fixed uppercase tracking-widest block font-bold">
                    SECURE SHELL GATEWAY // CMD_NODE_07
                  </span>
                  <h2 className="text-3xl font-extrabold uppercase text-white tracking-tight mt-1">
                    System Operations Terminal
                  </h2>
                </div>
                <span className="text-xs text-outline hidden sm:block">STATUS: ONLINE LISTENING</span>
              </div>

              {/* Streaming Logs component block */}
              <div className="bg-[#0b0f10] border border-outline-variant p-6 relative">
                <div className="absolute top-2 right-4 text-[9px] text-outline select-none">
                  PORT 3000 // EMULATED_REDUCER
                </div>
                <h3 className="font-mono text-xs text-white uppercase border-b border-outline-variant/30 pb-3 mb-6 font-bold flex items-center gap-2">
                  <Activity size={14} className="text-secondary-fixed animate-pulse" /> Telemetry Stream Alerts Output
                </h3>

                <div className="space-y-2 text-xs text-on-surface-variant max-h-64 overflow-y-auto mb-6">
                  {telemetryLogs.map((log, index) => {
                    const isWarn = log.includes("[WARN]") || log.includes("[ERROR]");
                    return (
                      <p key={index} className="leading-relaxed">
                        <span className={`${isWarn ? "text-error font-bold" : "text-secondary-fixed font-bold"}`}>
                          {isWarn ? "● WARNING" : "● OK"}
                        </span>{" "}
                        {log.replace("[WARN]", "").replace("[ERROR]", "").replace("[OK]", "").trim()}
                      </p>
                    );
                  })}
                </div>

                {/* Simulated CLI inputs form */}
                <form onSubmit={handleTerminalSubmit} className="border-t border-outline-variant/30 pt-4 flex">
                  <span className="text-secondary-fixed font-bold mr-3 select-none">&gt;&gt;</span>
                  <input 
                    type="text"
                    value={terminalInput}
                    onChange={(e) => setTerminalInput(e.target.value)}
                    placeholder="ENTER COMMAND REFERENCE... (e.g. RESTAGE, PING, HELP)"
                    className="bg-transparent border-none focus:ring-0 text-white font-mono text-xs flex-grow outline-none lowercase"
                  />
                  <button type="submit" className="text-secondary-fixed font-bold text-xs uppercase hover:underline cursor-pointer">
                    EXECUTE
                  </button>
                </form>
              </div>

              {/* Terminal instruction panel */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs text-on-surface-variant leading-relaxed">
                <div className="border border-outline-variant p-6 space-y-4">
                  <h4 className="font-bold text-white uppercase">Valid CLI Directives:</h4>
                  <ul className="space-y-2 pl-4 list-disc font-sans">
                    <li><code className="text-secondary-fixed font-mono font-bold">RESTAGE</code> - Re-initialize database matrix schema allocation list.</li>
                    <li><code className="text-secondary-fixed font-mono font-bold">PING</code> - Trigger a manual ICMP latency verification query.</li>
                    <li><code className="text-secondary-fixed font-mono font-bold">HELP</code> - Print console directory instructions.</li>
                  </ul>
                </div>

                <div className="border border-outline-variant p-6 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h4 className="font-bold text-white uppercase">Uplink Encryption Signal</h4>
                    <p className="font-sans">
                      Encryption parameter: <code className="text-white font-mono font-bold">SHA-512_EXTENDED</code> handshake verified. Cryptographic keys are rotated automatically on 120-minute offsets.
                    </p>
                  </div>
                  <div className="pt-4 font-mono text-[10px] text-outline text-right">
                    TUNN_LOCK: SECURE_STATE // NOMINAL
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 4: HQ CONSOLE / MANAGEMENT TERMINAL */}
          {activeTab === "console" && (
            <div className="space-y-12 animate-fade-in font-mono">
              
              <div className="flex justify-between items-end border-l-4 border-secondary-fixed pl-4 select-none">
                <div>
                  <span className="font-mono text-xs text-secondary-fixed uppercase tracking-widest block font-bold">
                    HQ CORE SYSTEM MANAGEMENT
                  </span>
                  <h2 className="text-3xl font-extrabold uppercase text-white tracking-tight mt-1">
                    Integrated Ecosystem Panel
                  </h2>
                </div>
                <span className="text-xs text-outline hidden sm:block">CLUSTER: EMEA-PRIMARY</span>
              </div>

              {/* Bento Grid Metrics Header */}
              <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 select-none">
                
                <div className="p-6 bg-surface-container border border-outline-variant relative">
                  <div className="absolute top-2 right-4 text-[9px] text-outline font-bold">#NW_001</div>
                  <div className="space-y-4">
                    <span className="text-secondary-fixed font-bold block uppercase text-xs tracking-wider">Network Status</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-extrabold text-[#56ffa8]">99.8</span>
                      <span className="text-xs text-outline">% UPTIME</span>
                    </div>
                    <div className="w-full bg-primary-container h-1">
                      <div className="bg-secondary-fixed h-full" style={{ width: "99.8%" }}></div>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-surface-container border border-outline-variant relative">
                  <div className="absolute top-2 right-4 text-[9px] text-outline font-bold">#TC_042</div>
                  <div className="space-y-4">
                    <span className="text-primary font-bold block uppercase text-xs tracking-wider">Cohort Retention</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-extrabold text-white">94.2</span>
                      <span className="text-xs text-outline">AVG_RET</span>
                    </div>
                    <div className="flex gap-1 h-8 items-end">
                      <div className="bg-secondary-fixed/20 h-4 flex-grow"></div>
                      <div className="bg-secondary-fixed/30 h-6 flex-grow"></div>
                      <div className="bg-secondary-fixed/40 h-8 flex-grow animate-pulse"></div>
                      <div className="bg-secondary-fixed/50 h-5 flex-grow"></div>
                      <div className="bg-secondary-fixed h-7 flex-grow"></div>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-surface-container border border-outline-variant relative">
                  <div className="absolute top-2 right-4 text-[9px] text-outline font-bold">#PD_882</div>
                  <div className="space-y-4">
                    <span className="text-[#b7c8e1] font-bold block uppercase text-xs tracking-wider">Product Deployments</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-extrabold text-white font-sans">1,208</span>
                      <span className="text-xs text-outline">UNITS</span>
                    </div>
                    <div className="flex justify-between border-t border-outline-variant/30 pt-2 text-[10px] text-outline">
                      <span>ALPHA: 402</span>
                      <span>BETA: 806</span>
                    </div>
                  </div>
                </div>

              </section>

              {/* Management Terminal Datatable */}
              <section className="space-y-6">
                <div className="flex items-center justify-between border-b border-outline-variant pb-4 flex-wrap gap-4 select-none">
                  <h3 className="font-mono text-xs uppercase text-white font-bold">Management Terminal Database</h3>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => onShowNotification("Exporting data node matrix to local host... [OK]")}
                      className="px-4 py-1.5 border border-outline-variant text-[10px] uppercase font-bold hover:bg-surface-container-high text-white cursor-pointer"
                    >
                      Export_CSV
                    </button>
                    <button 
                      onClick={() => onShowNotification("Live data log streaming is active.")}
                      className="px-4 py-1.5 border border-outline-variant text-[10px] uppercase font-bold hover:bg-surface-container-high text-white cursor-pointer"
                    >
                      Logs_Stream
                    </button>
                  </div>
                </div>

                <div className="bg-surface-container border border-outline-variant overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[650px]">
                    <thead>
                      <tr className="bg-primary-container border-b border-outline-variant">
                        <th className="p-4 text-xs font-mono font-bold uppercase text-[#56ffa8]">Resource_ID</th>
                        <th className="p-4 text-xs font-mono font-bold uppercase text-[#56ffa8]">Allocation_Node</th>
                        <th className="p-4 text-xs font-mono font-bold uppercase text-[#56ffa8]">Priority</th>
                        <th className="p-4 text-xs font-mono font-bold uppercase text-[#56ffa8]">Status</th>
                        <th className="p-4 text-xs font-mono font-bold uppercase text-[#56ffa8] text-right">Activity</th>
                        <th className="p-4 text-xs font-mono font-bold uppercase text-outline text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="text-xs">
                      {resources.map((res) => (
                        <tr key={res.id} className="border-b border-outline-variant hover:bg-[#272a2c] transition-colors">
                          <td className="p-4 font-bold text-white font-mono">{res.id}</td>
                          <td className="p-4 font-sans">{res.name} <span className="opacity-40 text-[10px] font-mono block">[{res.allocationNode}]</span></td>
                          <td className="p-4">
                            <span className={`px-2 py-0.5 border text-[9px] font-bold ${
                              res.priority === "CRITICAL" 
                                ? "border-[#ffda9a] text-[#ffda9a]" 
                                : res.priority === "HIGH" 
                                  ? "border-secondary-fixed text-secondary-fixed" 
                                  : "border-outline text-outline"
                            }`}>
                              {res.priority}
                            </span>
                          </td>
                          <td className="p-4">
                            <button 
                              type="button" 
                              onClick={() => handleToggleResourceStatus(res.id)}
                              className="flex items-center gap-2 font-mono hover:underline cursor-pointer bg-transparent text-left"
                            >
                              <span className={`w-2 h-2 rounded-full ${
                                res.status === "Active" 
                                  ? "bg-secondary-fixed shadow-[0_0_8px_rgba(86,255,168,0.5)]" 
                                  : res.status === "Sync_Wait" 
                                    ? "bg-[#ffb4ab] animate-pulse" 
                                    : "bg-outline-variant"
                              }`}></span>
                              <span>{res.status}</span>
                            </button>
                          </td>
                          <td className="p-4 text-right font-mono text-outline">{res.activity}</td>
                          <td className="p-4 text-center">
                            <button 
                              onClick={() => handleDeleteResource(res.id, res.name)}
                              className="text-outline hover:text-error hover:scale-105 transition-all p-1.5 cursor-pointer bg-transparent"
                              title="Disconnect Resource Node"
                            >
                              <Trash2 size={14} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Sparkline growth simulator chart */}
              <section className="grid grid-cols-1 md:grid-cols-2 gap-8 select-none">
                <div className="p-6 bg-surface-container-low border border-outline-variant relative h-[280px]">
                  <div className="flex justify-between items-start mb-6">
                    <h4 className="font-mono text-xs uppercase tracking-widest text-primary font-bold">
                      Cohort Growth Analysis
                    </h4>
                    <span className="font-mono text-[9px] text-[#56ffa8]">UPLINK_LIVE</span>
                  </div>

                  {/* Sparkline SVG display */}
                  <div className="absolute inset-x-6 bottom-6 top-20 flex items-end">
                    <div className="w-full h-full relative overflow-hidden bg-primary-container p-2 border border-outline-variant/30">
                      <svg className="w-full h-full" viewBox="0 0 400 150" fill="none" preserveAspectRatio="none">
                        <path 
                          d="M  0,130 L  50,110 L 100,120 L 150,70 L 200,85 L 250,40 L 300,50 L 350,10 L 400,20" 
                          stroke="#16ff9e" 
                          strokeWidth="2"
                          strokeLinecap="round"
                        ></path>
                        <path 
                          d="M  0,130 L  50,110 L 100,120 L 150,70 L 200,85 L 250,40 L 300,50 L 350,10 L 400,20 L 400,150 L 0,150 Z" 
                          fill="url(#sparkline-grad)"
                          className="opacity-15"
                        ></path>
                        <defs>
                          <linearGradient id="sparkline-grad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#16ff9e" stopOpacity="1" />
                            <stop offset="100%" stopColor="#16ff9e" stopOpacity="0" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-surface-container-low border border-outline-variant flex flex-col justify-between">
                  <div>
                    <h4 className="font-mono text-xs uppercase tracking-widest text-[#b7c8e1] mb-4 font-bold">
                      Emulated Handshake Output
                    </h4>
                    <div className="space-y-1.5 text-xs text-outline font-mono">
                      <p>&gt; initializing routing system_check...</p>
                      <p>&gt; telemetry verified inside Kigali Node Hub [OK]</p>
                      <p>&gt; monitoring port 3000 mapping parameters [ACTIVE]</p>
                      <p className="text-[#56ffa8]">&gt; all clusters operational within specs [OK]</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-outline-variant/30 flex justify-between items-center text-[10px] text-outline">
                    <span>LISTENING ON PORT 3000...</span>
                    <RefreshCw size={12} className="animate-spin text-secondary-fixed" />
                  </div>
                </div>
              </section>

            </div>
          )}

          {/* TAB 5: SETTINGS & PARAMETERS */}
          {activeTab === "settings" && (
            <div className="space-y-12 animate-fade-in font-mono">
              <div className="flex justify-between items-end border-l-4 border-secondary-fixed pl-4 select-none">
                <div>
                  <span className="font-mono text-xs text-secondary-fixed uppercase tracking-widest block font-bold">
                    PORTAL CONFIGURATION SCREEN
                  </span>
                  <h2 className="text-3xl font-extrabold uppercase text-white tracking-tight mt-1">
                    System Parameters Settings
                  </h2>
                </div>
                <span className="text-xs text-outline hidden sm:block">SAVE: AUTOSAVED</span>
              </div>

              {/* Adjust load slider mock and settings checkboxes */}
              <div className="border border-outline-variant bg-surface-container-low p-8 space-y-8">
                <div className="space-y-4">
                  <h3 className="text-white text-sm font-bold uppercase tracking-wider">
                    Simulate System load capacity
                  </h3>
                  <div className="flex items-center gap-6">
                    <input 
                      type="range"
                      min="10"
                      max="100"
                      step="1"
                      value={settingsLoad}
                      onChange={(e) => {
                        setSettingsLoad(Number(e.target.value));
                        onShowNotification(`System target load simulated index adjusted to ${e.target.value}%`);
                      }}
                      className="flex-grow accent-[#16ff9e] bg-primary-container h-1"
                    />
                    <span className="text-lg font-bold text-secondary-fixed">{settingsLoad}%</span>
                  </div>
                  <p className="text-xs text-on-surface-variant font-sans">
                    Warning: Placing loads above 90% may trigger ICMP warning nodes spikes inside the terminal logs.
                  </p>
                </div>

                <div className="h-px bg-outline-variant/30"></div>

                <div className="space-y-6">
                  <h3 className="text-white text-sm font-bold uppercase tracking-wider">
                    Governance & Protocol Parameters
                  </h3>

                  <div className="space-y-4 font-sans text-xs">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input 
                        type="checkbox"
                        checked={settingsHealth}
                        onChange={(e) => {
                          setSettingsHealth(e.target.checked);
                          onShowNotification(`Uplink nodes active reporting: ${e.target.checked ? "NOMINAL" : "DISSOLVED"}`);
                        }}
                        className="bg-[#191c1e] border-outline-variant text-[#16ff9e] focus:ring-0"
                      />
                      <span className="text-white font-mono font-bold tracking-wide">UPLINK_STATUS_ACTIVE (EMBA-NORTH-04)</span>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer">
                      <input 
                        type="checkbox"
                        defaultChecked
                        onChange={(e) => {
                          onShowNotification(`Local telemetry audio handshake signal: ${e.target.checked ? "ENABLED" : "MUTED"}`);
                        }}
                        className="bg-[#191c1e] border-outline-variant text-[#16ff9e] focus:ring-0"
                      />
                      <span className="text-white font-mono font-bold tracking-wide">COMPLIANCE_ALERTS_TELEMETRY</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Developer specifications read-only sheet */}
              <div className="border border-outline-variant p-6 space-y-4">
                <span className="text-white text-xs block font-bold uppercase select-none">
                  Registry System Node Specs:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-on-surface-variant">
                  <div>
                    <span className="text-outline block mb-1">Target Platform container</span>
                    <strong className="text-white">Cloud Run Standalone</strong>
                  </div>
                  <div>
                    <span className="text-outline block mb-1">Host reverse proxy</span>
                    <strong className="text-white">Nginx Route 3000 ingress</strong>
                  </div>
                  <div>
                    <span className="text-outline block mb-1">Framework bundler version</span>
                    <strong className="text-white">Vite HMR disabled_edit</strong>
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Footer info terminal log */}
        <footer className="h-16 border-t border-outline-variant bg-surface-container-lowest flex items-center justify-between px-6 md:px-12 z-20 select-none shrink-0 text-[10px] font-mono text-outline uppercase tracking-wider">
          <span>PORTAL_ACTIVE_SIGNAL: NOMINAL</span>
          <span className="hidden sm:inline-block">Kigali Special Economic Zone (SEZ) HQ</span>
        </footer>

      </main>
    </div>
  );
}
