const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api'

interface FetchOptions {
  method?: string
  body?: unknown
  headers?: Record<string, string>
}

async function apiFetch<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const { method = 'GET', body, headers = {} } = options

  const res = await fetch(`${API_URL}${endpoint}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
    next: { revalidate: 30 },
  })

  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`)
  }

  return res.json()
}

// Types
export interface Agent {
  id: string
  name: string
  status: 'active' | 'degraded' | 'inactive'
  lastSeen: string
  totalTokens: number
  errorRate: number
  avgLatency: number
}

export interface Trace {
  traceId: string
  agentName: string
  operation: string
  status: 'ok' | 'error'
  duration: number
  timestamp: string
  spans: number
}

export interface Anomaly {
  id: string
  title: string
  type: string
  severity: 'critical' | 'warning' | 'info'
  agentId: string
  detectedAt: string
  status: 'open' | 'resolved'
  metric: string
}

export interface Alert {
  id: string
  title: string
  severity: 'critical' | 'warning' | 'info'
  agentId: string
  triggeredAt: string
  status: 'firing' | 'resolved'
  rule: string
}

export interface Token {
  id: string
  name: string
  prefix: string
  status: 'active' | 'expired'
  createdAt: string
  lastUsed: string
  expiresAt: string | null
}

export interface Playbook {
  id: string
  title: string
  severity: string
  rootCause: string
  steps: string[]
  generatedAt: string
  alertContext: {
    alertTitle: string
    alertSeverity: string
    alertDetails: unknown
    timestamp: string
  }
}

export interface OverviewMetrics {
  totalAgents: number
  activeAlerts: number
  totalTraces: number
  tokenSpendToday: number
  errorRate: number
  avgLatency: number
}

export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  password: string
  role: string
  avatar: string | null
  createdAt: string
}

export interface Workspace {
  id: string
  name: string
  slug: string
  plan: string
  region: string
  gcpProject: string
  dynatraceEnv: string
  createdAt: string
}

// API functions
export async function getOverview(): Promise<OverviewMetrics> {
  return apiFetch<OverviewMetrics>('/overview')
}

export async function getAgents(): Promise<{ agents: Agent[] }> {
  return apiFetch<{ agents: Agent[] }>('/agents')
}

export async function getTraces(): Promise<{ traces: Trace[]; total: number }> {
  return apiFetch<{ traces: Trace[]; total: number }>('/traces')
}

export async function getAnomalies(): Promise<{ anomalies: Anomaly[]; detectedToday: number; avgDetectionTime: string; falsePositiveRate: number }> {
  return apiFetch('/anomalies')
}

export async function getAlerts(): Promise<{ alerts: Alert[]; totalFiring: number; totalResolved: number }> {
  return apiFetch('/alerts')
}

export async function getTokens(): Promise<{ tokens: Token[] }> {
  return apiFetch<{ tokens: Token[] }>('/tokens')
}

export async function getPlaybooks(): Promise<{ playbooks: Playbook[] }> {
  return apiFetch<{ playbooks: Playbook[] }>('/playbooks')
}

export async function getPlaybook(id: string): Promise<Playbook> {
  return apiFetch<Playbook>(`/playbooks/${id}`)
}

export async function triggerAlert(payload: {
  title: string
  severity: string
  details: unknown
}): Promise<{ status: string; playbookId: string }> {
  return apiFetch('/webhooks/alert', { method: 'POST', body: payload })
}

export async function getUser(): Promise<{ user: User; workspace: Workspace }> {
  return apiFetch<{ user: User; workspace: Workspace }>('/user')
}
