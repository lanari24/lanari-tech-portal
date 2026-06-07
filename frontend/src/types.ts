/**
 * Types and structures for Lanari Tech Ltd Portal
 */

export type PublicViewTab = "systems" | "infrastructure" | "protocol" | "archive";

export type PortalSidebarTab = "overview" | "projects" | "resources" | "settings" | "console";

export interface SystemResource {
  id: string;
  name: string;
  allocationNode: string;
  priority: "CRITICAL" | "STANDARD" | "HIGH";
  status: "Active" | "Sync_Wait" | "Terminated";
  activity: string; // Latency string like '12.2ms' or '--'
}

export interface ResourceDocument {
  id: string;
  title: string;
  fileRef: string;
  imageAlt: string;
  imageUrl: string;
  category: "infrastructure" | "cryptography" | "topology" | "other";
}

export interface MentorshipSyncEvent {
  id: string;
  timeLabel: string;
  timeSub: string;
  title: string;
  instructor: string;
}

export interface ProjectEntry {
  id: string;
  name: string;
  codeName: string;
  client: string;
  leadEngineer: string;
  progress: number; // 0 to 100
  status: "active" | "pipeline" | "completed";
}

export interface TerminalLogLine {
  id: string;
  timestamp: string;
  type: "success" | "warn" | "info" | "error";
  text: string;
}
