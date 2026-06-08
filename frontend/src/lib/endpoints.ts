import { apiRequest, apiUrl, tokenStore } from "./api";

// ---- Shared DTOs (mirror backend responses) ----
export type Role = "CLIENT" | "STUDENT" | "ADMIN";

export interface AuthUser {
  id: string;
  email: string;
  name: string | null;
  phone: string | null;
  role: Role;
  ref: string;
  createdAt: string;
}

export interface AuthResult {
  user: AuthUser;
  accessToken: string;
  refreshToken: string;
}

export interface ProjectDTO {
  id: string;
  name: string;
  codeName: string;
  client: string;
  leadEngineer: string;
  progress: number;
  status: "active" | "pipeline" | "completed";
}

export interface ResourceDTO {
  id: string;
  resourceCode: string;
  name: string;
  allocationNode: string;
  priority: "CRITICAL" | "STANDARD" | "HIGH";
  status: "Active" | "Sync_Wait" | "Terminated";
  activity: string;
}

export interface EventDTO {
  id: string;
  timeLabel: string;
  timeSub: string;
  title: string;
  instructor: string;
}

export interface DocumentDTO {
  id: string;
  title: string;
  fileRef: string;
  category: "infrastructure" | "cryptography" | "topology" | "other";
  imageUrl: string | null;
  imageAlt: string | null;
  hasFile: boolean;
}

export interface SettingsDTO {
  loadCapacity: number;
  uplinkActive: boolean;
  complianceAlerts: boolean;
}

// ---- Auth ----
export const authApi = {
  register: (input: { email: string; password: string; name: string; phone: string; role: "client" | "student" }) =>
    apiRequest<AuthResult>("/auth/register", { method: "POST", body: input, auth: false }),
  login: (input: { identifier: string; password: string }) =>
    apiRequest<AuthResult>("/auth/login", { method: "POST", body: input, auth: false }),
  me: () => apiRequest<{ user: AuthUser }>("/auth/me"),
  logout: (refreshToken: string) =>
    apiRequest<void>("/auth/logout", { method: "POST", body: { refreshToken }, auth: false }),
};

// ---- Projects ----
export const projectsApi = {
  list: () => apiRequest<{ projects: ProjectDTO[] }>("/projects").then((r) => r.projects),
  create: (input: { name: string; client: string; leadEngineer: string }) =>
    apiRequest<{ project: ProjectDTO }>("/projects", { method: "POST", body: input }).then((r) => r.project),
};

// ---- Resources ----
export const resourcesApi = {
  list: () => apiRequest<{ resources: ResourceDTO[] }>("/resources").then((r) => r.resources),
  create: (input: { name: string; allocationNode: string; priority?: string }) =>
    apiRequest<{ resource: ResourceDTO }>("/resources", { method: "POST", body: input }).then((r) => r.resource),
  toggle: (id: string) =>
    apiRequest<{ resource: ResourceDTO }>(`/resources/${id}/toggle`, { method: "POST" }).then((r) => r.resource),
  remove: (id: string) => apiRequest<void>(`/resources/${id}`, { method: "DELETE" }),
};

// ---- Events ----
export const eventsApi = {
  list: () => apiRequest<{ events: EventDTO[] }>("/events").then((r) => r.events),
  create: (input: { title?: string } = {}) =>
    apiRequest<{ event: EventDTO }>("/events", { method: "POST", body: input }).then((r) => r.event),
};

// ---- Documents ----
export const documentsApi = {
  list: () => apiRequest<{ documents: DocumentDTO[] }>("/documents").then((r) => r.documents),
  create: (title: string, file?: File) => {
    const fd = new FormData();
    fd.append("title", title);
    if (file) fd.append("file", file);
    return apiRequest<{ document: DocumentDTO }>("/documents", { method: "POST", body: fd, form: true }).then(
      (r) => r.document,
    );
  },
  remove: (id: string) => apiRequest<void>(`/documents/${id}`, { method: "DELETE" }),
  /** Fetches the file with auth and triggers a browser download. */
  download: async (id: string, fileRef: string) => {
    const res = await fetch(apiUrl(`/documents/${id}/download`), {
      headers: tokenStore.access ? { Authorization: `Bearer ${tokenStore.access}` } : {},
    });
    if (!res.ok) throw new Error(`Download failed (${res.status})`);
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileRef;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  },
};

// ---- Settings ----
export const settingsApi = {
  get: () => apiRequest<{ settings: SettingsDTO }>("/settings").then((r) => r.settings),
  update: (patch: Partial<SettingsDTO>) =>
    apiRequest<{ settings: SettingsDTO }>("/settings", { method: "PATCH", body: patch }).then((r) => r.settings),
};

// ---- AI ----
export const aiApi = {
  chat: (messages: { role: "user" | "assistant"; content: string }[]) =>
    apiRequest<{ reply: string; model: string }>("/ai/chat", { method: "POST", body: { messages } }),
};

// ---- Telemetry (SSE) ----
export interface TelemetryEvent {
  level: "OK" | "WARN" | "ERROR" | "INFO";
  text: string;
  ts: string;
}

/** Opens an EventSource for the live telemetry stream. Caller closes it. */
export function openTelemetryStream(onEvent: (e: TelemetryEvent) => void): EventSource | null {
  const token = tokenStore.access;
  if (!token) return null;
  const es = new EventSource(apiUrl(`/telemetry/stream?token=${encodeURIComponent(token)}`));
  es.onmessage = (msg) => {
    try {
      onEvent(JSON.parse(msg.data) as TelemetryEvent);
    } catch {
      /* ignore */
    }
  };
  return es;
}
