import React, { useState, useEffect } from "react";
import { PortalSidebarTab } from "../types";
import {
  projectsApi,
  resourcesApi,
  eventsApi,
  documentsApi,
  settingsApi,
  openTelemetryStream,
  type ProjectDTO,
  type ResourceDTO,
  type EventDTO,
  type DocumentDTO,
  type SettingsDTO,
} from "../lib/endpoints";
import { ApiError } from "../lib/api";
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

  // Live workspace data (loaded from the API)
  const [documents, setDocuments] = useState<DocumentDTO[]>([]);
  const [syncEvents, setSyncEvents] = useState<EventDTO[]>([]);
  const [resources, setResources] = useState<ResourceDTO[]>([]);
  const [projects, setProjects] = useState<ProjectDTO[]>([]);
  const [telemetryLogs, setTelemetryLogs] = useState<string[]>([]);

  // Forms State
  const [newProjectName, setNewProjectName] = useState<string>("");
  const [newProjectClient, setNewProjectClient] = useState<string>("");
  const [newProjectLead, setNewProjectLead] = useState<string>("Alex Mugisha");

  const [newDocTitle, setNewDocTitle] = useState<string>("");
  const [newDocFile, setNewDocFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const [settingsLoad, setSettingsLoad] = useState<number>(24.8);
  const [settingsHealth, setSettingsHealth] = useState<boolean>(true);

  // Initial data load from the API.
  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const [proj, res, evs, docs, settings] = await Promise.all([
          projectsApi.list(),
          resourcesApi.list(),
          eventsApi.list(),
          documentsApi.list(),
          settingsApi.get(),
        ]);
        if (!active) return;
        setProjects(proj);
        setResources(res);
        setSyncEvents(evs);
        setDocuments(docs);
        setSettingsLoad(settings.loadCapacity);
        setSettingsHealth(settings.uplinkActive);
      } catch (err) {
        if (active) {
          onShowNotification(
            `We couldn't load your data: ${err instanceof ApiError ? err.message : "connection problem"}`,
          );
        }
      }
    })();
    return () => {
      active = false;
    };
  }, [onShowNotification]);

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

  // Live telemetry stream (SSE from the API over Redis pub/sub).
  useEffect(() => {
    const es = openTelemetryStream((evt) => {
      const line = `[${evt.level}] ${evt.text}`;
      setTelemetryLogs((prev) => {
        const sliced = prev.length > 7 ? prev.slice(1) : prev;
        return [...sliced, line];
      });
    });
    return () => es?.close();
  }, []);

  const reportError = (err: unknown, fallback: string) =>
    onShowNotification(err instanceof ApiError ? err.message : fallback);

  // Create Project Callback
  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjectName || !newProjectClient) {
      onShowNotification("Please fill in all the fields.");
      return;
    }
    try {
      const project = await projectsApi.create({
        name: newProjectName,
        client: newProjectClient,
        leadEngineer: newProjectLead,
      });
      setProjects((prev) => [project, ...prev]);
      setNewProjectName("");
      setNewProjectClient("");
      onShowNotification(`Project "${project.name}" has been added.`);
    } catch (err) {
      reportError(err, "We couldn't add the project. Please try again.");
    }
  };

  // Upload/Add Resource Document (optional real file -> MinIO)
  const handleAddDocument = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDocTitle) {
      onShowNotification("Please enter a title for your file.");
      return;
    }
    setIsUploading(true);
    try {
      const doc = await documentsApi.create(newDocTitle, newDocFile ?? undefined);
      setDocuments((prev) => [...prev, doc]);
      setNewDocTitle("");
      setNewDocFile(null);
      onShowNotification(`"${doc.title}" has been uploaded.`);
    } catch (err) {
      reportError(err, "We couldn't upload your file. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  // Delete a document (removes the MinIO object too)
  const handleDeleteDocument = async (id: string) => {
    try {
      await documentsApi.remove(id);
      setDocuments((prev) => prev.filter((d) => d.id !== id));
      onShowNotification("File deleted.");
    } catch (err) {
      reportError(err, "We couldn't delete the file. Please try again.");
    }
  };

  // Download a document's attached file (authenticated blob fetch)
  const handleDownloadDocument = async (id: string, fileRef: string) => {
    try {
      await documentsApi.download(id, fileRef);
    } catch (err) {
      reportError(err, "We couldn't download the file. Please try again.");
    }
  };

  // Sync request callback
  const handleRequestSync = async () => {
    try {
      const event = await eventsApi.create();
      setSyncEvents((prev) => [...prev, event]);
      onShowNotification("Your session request has been sent.");
    } catch (err) {
      reportError(err, "We couldn't send your request. Please try again.");
    }
  };

  // Delete SystemResource
  const handleDeleteResource = async (id: string) => {
    try {
      await resourcesApi.remove(id);
      setResources((prev) => prev.filter((r) => r.id !== id));
      onShowNotification(`Item removed.`);
    } catch (err) {
      reportError(err, "We couldn't remove the item. Please try again.");
    }
  };

  // Change resource allocation status (server cycles Active -> Sync_Wait -> Terminated)
  const handleToggleResourceStatus = async (id: string) => {
    try {
      const updated = await resourcesApi.toggle(id);
      setResources((prev) => prev.map((r) => (r.id === id ? updated : r)));
      onShowNotification(`${updated.resourceCode} is now: ${updated.status}`);
    } catch (err) {
      reportError(err, "We couldn't update the status. Please try again.");
    }
  };

  // Command Input Submit
  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!terminalInput) return;
    const commandText = terminalInput.trim().toUpperCase();
    let logOutput = "";
    if (commandText === "REFRESH" || commandText === "RESTAGE" || commandText === "RESET") {
      logOutput = `[OK] Refreshing your data...`;
      resourcesApi.list().then(setResources).catch(() => undefined);
    } else if (commandText.startsWith("PING")) {
      logOutput = `[OK] Connection is good — response time ${latencyFluct()}`;
    } else if (commandText.startsWith("HELP")) {
      logOutput = `[INFO] You can type: refresh, ping, status, help`;
    } else {
      logOutput = `[OK] Done: '${commandText}'`;
    }
    setTelemetryLogs((prev) => [...prev, logOutput]);
    setTerminalInput("");
    onShowNotification(`Command '${commandText}' done.`);
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
              Your workspace
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
              <span>Activity Log</span>
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
              <span>Management</span>
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
            <p className="font-mono text-[9px] text-outline uppercase font-bold text-left mb-1">Signed in as:</p>
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
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* MAIN SYSTEM OPERATIONS CANVAS */}
      <main className="flex-grow flex flex-col min-w-0">
        
        {/* Top Header tracking statuses */}
        <header className="h-20 bg-surface-container border-b border-outline-variant flex items-center justify-between px-6 md:px-12 z-20 shrink-0">
          <div className="flex items-center gap-6">
            <span className="text-xl font-extrabold text-white tracking-widest uppercase">
              {activeTab === "console" ? "MANAGEMENT" : `MY WORKSPACE`}
            </span>
            <div className="hidden md:flex items-center bg-[#101415]/80 border border-outline-variant px-3 py-1.5 focus-within:border-secondary-fixed">
              <Search size={14} className="text-outline mr-2" />
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="bg-transparent border-none focus:ring-0 text-mono text-xs font-mono text-white outline-none w-48"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-right select-none space-y-1">
              <p className="font-mono text-[9px] text-outline font-bold">Local time</p>
              <p className="font-mono text-sm text-[#16ff9e] font-bold tabular-nums">
                {systemTime}
              </p>
            </div>

            <div className="flex items-center gap-3 border-l border-outline-variant pl-6 select-none">
              <div className="text-right hidden sm:block">
                <p className="font-mono text-xs text-white font-bold">{userRef}</p>
                <p className="font-mono text-[9px] text-outline capitalize text-right">{role} account</p>
              </div>
              <div className="w-10 h-10 border border-outline-variant rounded-full overflow-hidden grayscale bg-surface-container-high relative">
                {/* Embedded admin avatar asset */}
                <img
                  alt="Profile photo"
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
                    Welcome back
                  </span>
                  <p className="text-2xl md:text-3xl font-extrabold text-white uppercase mt-1">
                    Your Dashboard
                  </p>
                </div>
                <div className="font-mono text-xs text-outline space-y-1 text-right">
                  <p>Uptime: <span className="text-white font-bold">99.9%</span></p>
                  <p>Response: <span className="text-secondary-fixed font-bold">14ms</span></p>
                </div>
              </div>

              {/* Progress sequence tracker layout */}
              <section className="bg-surface-container-low border border-outline-variant p-6 md:p-8 select-none">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="font-mono text-xs text-outline uppercase tracking-widest font-bold">
                    Project Progress
                  </h3>
                  <span className="font-mono text-xs text-secondary-fixed font-bold">
                    In progress
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="relative p-2 border-l border-secondary-fixed">
                    <div className="h-1 bg-secondary-fixed mb-4 shadow-[0_0_10px_rgba(86,227,139,0.5)]"></div>
                    <span className="font-mono text-[9px] text-secondary-fixed uppercase font-bold font-bold">
                      01 / COMPLETE
                    </span>
                    <h4 className="font-mono text-xs font-bold text-white uppercase mt-1">Plan</h4>
                    <p className="text-[11px] text-on-surface-variant font-sans mt-2">
                      We gathered your needs and agreed on the plan.
                    </p>
                  </div>

                  <div className="relative p-2 border-l border-secondary-fixed">
                    <div className="h-1 bg-secondary-fixed mb-4 shadow-[0_0_10px_rgba(86,227,139,0.5)]"></div>
                    <span className="font-mono text-[9px] text-secondary-fixed uppercase font-bold">
                      02 / COMPLETE
                    </span>
                    <h4 className="font-mono text-xs font-bold text-white uppercase mt-1">Design</h4>
                    <p className="text-[11px] text-on-surface-variant font-sans mt-2">
                      We mapped out how everything will look and work.
                    </p>
                  </div>

                  <div className="relative p-2 border-l border-secondary-fixed/50">
                    <div className="h-1 bg-secondary-fixed-dim/30 mb-4 overflow-hidden relative">
                      <div className="h-full bg-secondary-fixed animate-pulse" style={{ width: "75%" }}></div>
                    </div>
                    <span className="font-mono text-[9px] text-secondary-fixed-dim uppercase font-bold">
                      03 / PROCESSING
                    </span>
                    <h4 className="font-mono text-xs font-bold text-white uppercase mt-1">Build</h4>
                    <p className="text-[11px] text-on-surface-variant font-sans mt-2">
                      We're building and testing it right now.
                    </p>
                  </div>

                  <div className="relative p-2 border-l border-outline-variant">
                    <div className="h-1 bg-outline-variant mb-4"></div>
                    <span className="font-mono text-[9px] text-outline opacity-40 uppercase font-bold">
                      04 / PENDING
                    </span>
                    <h4 className="font-mono text-xs font-bold text-white uppercase opacity-40 mt-1">Launch</h4>
                    <p className="text-[11px] text-on-surface-variant/40 font-sans mt-2">
                      Going live soon.
                    </p>
                  </div>
                </div>
              </section>

              {/* Bento Grid Analytics */}
              <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Bar chart mockup */}
                <div className="lg:col-span-8 bg-surface-container-low border border-outline-variant p-6 md:p-8 relative">
                  <div className="absolute top-4 right-4 font-mono text-[9px] text-outline uppercase select-none">
                    Live
                  </div>
                  <h3 className="font-mono text-xs text-secondary-fixed font-bold tracking-wider mb-6">
                    Activity Overview
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
                        <span className="font-mono text-[9px] text-outline block mb-1">Active users</span>
                        <p className="text-2xl font-extrabold text-white font-sans">
                          72.4<span className="text-xs text-outline ml-1 font-mono">k</span>
                        </p>
                      </div>

                      <div>
                        <span className="font-mono text-[9px] text-outline block mb-1">Server load</span>
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
                        Mentor Sessions
                      </h3>
                      <Users size={16} className="text-secondary-fixed" />
                    </div>

                    <div className="space-y-4">
                      {syncEvents.slice(0, 3).map((ev) => (
                        <div key={ev.id} className="border-l-2 border-secondary-fixed pl-4 py-1">
                          <p className="font-mono text-[9px] text-secondary-fixed uppercase font-bold">{ev.timeLabel}</p>
                          <p className="font-sans text-xs font-bold text-white mt-0.5">{ev.title}</p>
                          <p className="font-sans text-[10px] text-on-surface-variant">Mentor: {ev.instructor}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={handleRequestSync}
                    className="w-full mt-8 border border-outline-variant py-2 font-mono text-xs uppercase text-white hover:bg-surface-container-highest cursor-pointer tracking-widest"
                  >
                    Request a Session
                  </button>
                </div>

              </section>

              {/* Resource Documents with image previews */}
              <section className="bg-surface-container-low border border-[#1d2022] p-6 md:p-8 space-y-8">
                <div className="flex justify-between items-center border-b border-outline-variant pb-4 flex-wrap gap-4 select-none">
                  <h3 className="font-mono text-xs text-white uppercase tracking-widest font-bold">
                    Files & Resources
                  </h3>

                  {/* Upload a document (optional real file -> MinIO) */}
                  <form onSubmit={handleAddDocument} className="flex gap-2 flex-wrap items-center">
                    <input
                      type="text"
                      required
                      value={newDocTitle}
                      onChange={(e) => setNewDocTitle(e.target.value)}
                      placeholder="File title..."
                      className="bg-surface-container-lowest border border-outline-variant text-white font-mono text-xs p-2 focus:border-secondary-fixed focus:ring-0 max-w-xs"
                    />
                    <label className="border border-outline-variant text-on-surface-variant hover:text-white hover:border-white px-3 py-2 font-mono text-[10px] uppercase tracking-wider cursor-pointer max-w-max truncate">
                      {newDocFile ? newDocFile.name.slice(0, 16) : "Choose file"}
                      <input
                        type="file"
                        className="hidden"
                        onChange={(e) => setNewDocFile(e.target.files?.[0] ?? null)}
                      />
                    </label>
                    <button
                      type="submit"
                      disabled={isUploading}
                      className="bg-secondary-fixed hover:brightness-110 text-[#002110] px-4 py-2 font-mono text-xs uppercase tracking-wider font-bold flex items-center gap-1.5 cursor-pointer max-w-max"
                    >
                      <UploadCloud size={14} />
                      {isUploading ? "Saving..." : "Upload"}
                    </button>
                  </form>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {filteredDocuments.map((doc) => (
                    <div key={doc.id} className="group">
                      <div className="aspect-video mb-4 overflow-hidden border border-outline-variant relative bg-surface-container-high/40">
                        {doc.imageUrl ? (
                          <img
                            alt={doc.imageAlt ?? doc.title}
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-105 group-hover:scale-100"
                            src={doc.imageUrl}
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-outline">
                            <Database size={22} />
                            <span className="font-mono text-[9px] uppercase tracking-widest">{doc.category}</span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-secondary-fixed/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      </div>
                      <p className="font-mono text-[9px] text-secondary-fixed font-bold mb-1">
                        {doc.fileRef}
                      </p>
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="font-sans text-xs font-bold text-white uppercase truncate">
                          {doc.title}
                        </h4>
                        <div className="flex items-center gap-2 shrink-0">
                          {doc.hasFile && (
                            <button
                              onClick={() => handleDownloadDocument(doc.id, doc.fileRef)}
                              className="text-outline hover:text-secondary-fixed cursor-pointer"
                              title="Download asset"
                            >
                              <UploadCloud size={13} className="rotate-180" />
                            </button>
                          )}
                          <button
                            onClick={() => handleDeleteDocument(doc.id)}
                            className="text-outline hover:text-error cursor-pointer"
                            title="Delete document"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Add document manual card click option */}
                  <div 
                    onClick={() => onShowNotification("Type a title in the box above, then tap Upload to add a file.")}
                    className="border border-dashed border-outline-variant hover:border-secondary-fixed flex flex-col items-center justify-center p-6 bg-[#121516]/50 transition-colors cursor-pointer"
                  >
                    <Plus size={24} className="text-outline mb-2" />
                    <p className="font-mono text-[10px] text-outline uppercase font-bold">Add a file</p>
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
                    Your Projects
                  </span>
                  <h2 className="text-3xl font-extrabold uppercase text-white tracking-tight mt-1">
                    Projects
                  </h2>
                </div>
                <span className="font-mono text-xs text-outline hidden sm:block">{projects.length} total</span>
              </div>

              {/* Form to Add Project */}
              <div className="bg-surface-container-low border border-outline-variant p-6 md:p-8 space-y-6">
                <h3 className="font-sans text-lg font-bold text-white uppercase border-b border-outline-variant pb-2">
                  Add a New Project
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
                    <label className="font-mono text-[10px] text-outline block uppercase font-bold">Client Name</label>
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
                    <label className="font-mono text-[10px] text-outline block uppercase font-bold">Project Lead</label>
                    <select
                      value={newProjectLead}
                      onChange={(e) => setNewProjectLead(e.target.value)}
                      className="w-full bg-[#191c1e] border border-outline-variant text-white font-sans text-xs p-3 rounded-sm focus:border-secondary-fixed focus:ring-0 outline-none"
                    >
                      <option value="Alex Mugisha">Alex Mugisha (Developer)</option>
                      <option value="Diane Umutoni">Diane Umutoni (Full Stack Developer)</option>
                      <option value="Dr. Aris Thorne">Dr. Aris Thorne (Security Lead)</option>
                      <option value="Robert Kamanzi">Robert Kamanzi (Senior Developer)</option>
                    </select>
                  </div>

                  <div className="col-span-1 md:col-span-3 flex justify-end">
                    <button 
                      type="submit"
                      className="bg-secondary-fixed text-on-secondary px-8 py-3 font-mono text-xs font-bold uppercase tracking-widest cursor-pointer text-[#002110]"
                    >
                      Add Project
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
                        <p className="text-on-surface-variant"><span className="font-mono text-[10px] text-outline block sm:inline-block sm:w-24">LEAD:</span> {proj.leadEngineer}</p>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-outline-variant/30 space-y-2">
                      <div className="flex justify-between items-center text-xs font-mono font-bold">
                        <span className="text-outline">PROGRESS</span>
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
                    Activity & Updates
                  </span>
                  <h2 className="text-3xl font-extrabold uppercase text-white tracking-tight mt-1">
                    Activity Log
                  </h2>
                </div>
                <span className="text-xs text-outline hidden sm:block">Live</span>
              </div>

              {/* Streaming Logs component block */}
              <div className="bg-[#0b0f10] border border-outline-variant p-6 relative">
                <div className="absolute top-2 right-4 text-[9px] text-outline select-none">
                  Live
                </div>
                <h3 className="font-mono text-xs text-white uppercase border-b border-outline-variant/30 pb-3 mb-6 font-bold flex items-center gap-2">
                  <Activity size={14} className="text-secondary-fixed animate-pulse" /> Live Updates
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
                    placeholder="Type a command (try: refresh, ping, help)"
                    className="bg-transparent border-none focus:ring-0 text-white font-mono text-xs flex-grow outline-none lowercase"
                  />
                  <button type="submit" className="text-secondary-fixed font-bold text-xs uppercase hover:underline cursor-pointer">
                    Send
                  </button>
                </form>
              </div>

              {/* Terminal instruction panel */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs text-on-surface-variant leading-relaxed">
                <div className="border border-outline-variant p-6 space-y-4">
                  <h4 className="font-bold text-white uppercase">Commands you can type:</h4>
                  <ul className="space-y-2 pl-4 list-disc font-sans">
                    <li><code className="text-secondary-fixed font-mono font-bold">refresh</code> - Reload your latest data.</li>
                    <li><code className="text-secondary-fixed font-mono font-bold">ping</code> - Check your connection speed.</li>
                    <li><code className="text-secondary-fixed font-mono font-bold">help</code> - Show the list of commands.</li>
                  </ul>
                </div>

                <div className="border border-outline-variant p-6 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h4 className="font-bold text-white uppercase">Your Connection is Secure</h4>
                    <p className="font-sans">
                      Your connection is fully encrypted and private. Security keys are refreshed automatically every couple of hours to keep your account safe.
                    </p>
                  </div>
                  <div className="pt-4 font-mono text-[10px] text-outline text-right">
                    Secure
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
                    Management
                  </span>
                  <h2 className="text-3xl font-extrabold uppercase text-white tracking-tight mt-1">
                    Team Dashboard
                  </h2>
                </div>
                <span className="text-xs text-outline hidden sm:block">Kigali, Rwanda</span>
              </div>

              {/* Bento Grid Metrics Header */}
              <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 select-none">
                
                <div className="p-6 bg-surface-container border border-outline-variant relative">
                  <div className="absolute top-2 right-4 text-[9px] text-outline font-bold">01</div>
                  <div className="space-y-4">
                    <span className="text-secondary-fixed font-bold block uppercase text-xs tracking-wider">System Uptime</span>
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
                  <div className="absolute top-2 right-4 text-[9px] text-outline font-bold">02</div>
                  <div className="space-y-4">
                    <span className="text-primary font-bold block uppercase text-xs tracking-wider">Student Retention</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-extrabold text-white">94.2</span>
                      <span className="text-xs text-outline">%</span>
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
                  <div className="absolute top-2 right-4 text-[9px] text-outline font-bold">03</div>
                  <div className="space-y-4">
                    <span className="text-[#b7c8e1] font-bold block uppercase text-xs tracking-wider">Products Delivered</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-5xl font-extrabold text-white font-sans">1,208</span>
                      <span className="text-xs text-outline">TOTAL</span>
                    </div>
                    <div className="flex justify-between border-t border-outline-variant/30 pt-2 text-[10px] text-outline">
                      <span>New: 402</span>
                      <span>Returning: 806</span>
                    </div>
                  </div>
                </div>

              </section>

              {/* Management Terminal Datatable */}
              <section className="space-y-6">
                <div className="flex items-center justify-between border-b border-outline-variant pb-4 flex-wrap gap-4 select-none">
                  <h3 className="font-mono text-xs uppercase text-white font-bold">Team Resources</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => onShowNotification("Exporting your data...")}
                      className="px-4 py-1.5 border border-outline-variant text-[10px] uppercase font-bold hover:bg-surface-container-high text-white cursor-pointer"
                    >
                      Export
                    </button>
                    <button
                      onClick={() => onShowNotification("Showing live updates.")}
                      className="px-4 py-1.5 border border-outline-variant text-[10px] uppercase font-bold hover:bg-surface-container-high text-white cursor-pointer"
                    >
                      View Logs
                    </button>
                  </div>
                </div>

                <div className="bg-surface-container border border-outline-variant overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[650px]">
                    <thead>
                      <tr className="bg-primary-container border-b border-outline-variant">
                        <th className="p-4 text-xs font-mono font-bold uppercase text-[#56ffa8]">Code</th>
                        <th className="p-4 text-xs font-mono font-bold uppercase text-[#56ffa8]">Name</th>
                        <th className="p-4 text-xs font-mono font-bold uppercase text-[#56ffa8]">Priority</th>
                        <th className="p-4 text-xs font-mono font-bold uppercase text-[#56ffa8]">Status</th>
                        <th className="p-4 text-xs font-mono font-bold uppercase text-[#56ffa8] text-right">Last active</th>
                        <th className="p-4 text-xs font-mono font-bold uppercase text-outline text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="text-xs">
                      {resources.map((res) => (
                        <tr key={res.id} className="border-b border-outline-variant hover:bg-[#272a2c] transition-colors">
                          <td className="p-4 font-bold text-white font-mono">{res.resourceCode}</td>
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
                              onClick={() => handleDeleteResource(res.id)}
                              className="text-outline hover:text-error hover:scale-105 transition-all p-1.5 cursor-pointer bg-transparent"
                              title="Remove"
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
                      Student Growth
                    </h4>
                    <span className="font-mono text-[9px] text-[#56ffa8]">Live</span>
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
                      System Status
                    </h4>
                    <div className="space-y-1.5 text-xs text-outline font-mono">
                      <p>&gt; checking connection...</p>
                      <p>&gt; connected to the Kigali office [OK]</p>
                      <p>&gt; everything is running [ACTIVE]</p>
                      <p className="text-[#56ffa8]">&gt; all systems are working well [OK]</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-outline-variant/30 flex justify-between items-center text-[10px] text-outline">
                    <span>Live</span>
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
                    Settings
                  </span>
                  <h2 className="text-3xl font-extrabold uppercase text-white tracking-tight mt-1">
                    Settings
                  </h2>
                </div>
                <span className="text-xs text-outline hidden sm:block">Saved automatically</span>
              </div>

              {/* Adjust load slider mock and settings checkboxes */}
              <div className="border border-outline-variant bg-surface-container-low p-8 space-y-8">
                <div className="space-y-4">
                  <h3 className="text-white text-sm font-bold uppercase tracking-wider">
                    System load (demo)
                  </h3>
                  <div className="flex items-center gap-6">
                    <input 
                      type="range"
                      min="10"
                      max="100"
                      step="1"
                      value={settingsLoad}
                      onChange={(e) => setSettingsLoad(Number(e.target.value))}
                      onMouseUp={(e) => {
                        const v = Number((e.target as HTMLInputElement).value);
                        settingsApi.update({ loadCapacity: v }).catch(() => undefined);
                        onShowNotification(`Load level set to ${v}%.`);
                      }}
                      className="flex-grow accent-[#16ff9e] bg-primary-container h-1"
                    />
                    <span className="text-lg font-bold text-secondary-fixed">{settingsLoad}%</span>
                  </div>
                  <p className="text-xs text-on-surface-variant font-sans">
                    Note: setting this above 90% may show warning messages in the Activity Log.
                  </p>
                </div>

                <div className="h-px bg-outline-variant/30"></div>

                <div className="space-y-6">
                  <h3 className="text-white text-sm font-bold uppercase tracking-wider">
                    Preferences
                  </h3>

                  <div className="space-y-4 font-sans text-xs">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input 
                        type="checkbox"
                        checked={settingsHealth}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          setSettingsHealth(checked);
                          settingsApi.update({ uplinkActive: checked }).catch(() => undefined);
                          onShowNotification(`Status updates: ${checked ? "on" : "off"}.`);
                        }}
                        className="bg-[#191c1e] border-outline-variant text-[#16ff9e] focus:ring-0"
                      />
                      <span className="text-white font-mono font-bold tracking-wide">Show system status updates</span>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        defaultChecked
                        onChange={(e) => {
                          onShowNotification(`Email alerts: ${e.target.checked ? "on" : "off"}.`);
                        }}
                        className="bg-[#191c1e] border-outline-variant text-[#16ff9e] focus:ring-0"
                      />
                      <span className="text-white font-mono font-bold tracking-wide">Email me important alerts</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Developer specifications read-only sheet */}
              <div className="border border-outline-variant p-6 space-y-4">
                <span className="text-white text-xs block font-bold uppercase select-none">
                  About this app:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-on-surface-variant">
                  <div>
                    <span className="text-outline block mb-1">Hosting</span>
                    <strong className="text-white">Secure cloud</strong>
                  </div>
                  <div>
                    <span className="text-outline block mb-1">Version</span>
                    <strong className="text-white">2.0</strong>
                  </div>
                  <div>
                    <span className="text-outline block mb-1">Support</span>
                    <strong className="text-white">hello@lanari.tech</strong>
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Footer info terminal log */}
        <footer className="h-16 border-t border-outline-variant bg-surface-container-lowest flex items-center justify-between px-6 md:px-12 z-20 select-none shrink-0 text-[10px] font-mono text-outline uppercase tracking-wider">
          <span>All systems running</span>
          <span className="hidden sm:inline-block">Kigali, Rwanda</span>
        </footer>

      </main>
    </div>
  );
}
