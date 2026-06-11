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

// API functions
export async function getOverview(): Promise<OverviewMetrics> {
  return apiFetch<OverviewMetrics>('/overview')
}

export async function getAgents(): Promise<{ agents: Agent[] }> {
  return apiFetch<{ agents: Agent[] }>('/agents')
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

// User & Workspace
export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
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

export async function getUser(): Promise<{ user: User; workspace: Workspace }> {
  return apiFetch<{ user: User; workspace: Workspace }>('/user')
}
