import { Router } from 'express'
import type { Request, Response } from 'express'
import { generatePlaybook } from '../services/gemini.js'
import { savePlaybook, getPlaybooks, getPlaybookById } from '../services/firestore.js'

const router: ReturnType<typeof Router> = Router()

// Webhook from Bindplane/Dynatrace alerts
router.post('/webhooks/alert', async (req, res) => {
  const payload = req.body
  console.log('Alert received:', JSON.stringify(payload, null, 2))

  try {
    const playbook = await generatePlaybook({
      alertTitle: payload.title || 'Unknown Alert',
      alertSeverity: payload.severity || 'WARNING',
      alertDetails: payload.details || payload,
      timestamp: new Date().toISOString(),
    })

    const saved = await savePlaybook(playbook)
    res.status(202).json({ status: 'accepted', playbookId: saved.id })
  } catch (error) {
    console.error('Error processing alert:', error)
    res.status(500).json({ error: 'Failed to process alert' })
  }
})

// Get all playbooks
router.get('/playbooks', async (_req, res) => {
  try {
    const playbooks = await getPlaybooks()
    res.json({ playbooks })
  } catch (error) {
    console.error('Error fetching playbooks:', error)
    res.json({ playbooks: [] })
  }
})

// Get single playbook
router.get('/playbooks/:id', async (req, res) => {
  try {
    const playbook = await getPlaybookById(req.params.id)
    if (!playbook) {
      res.status(404).json({ error: 'Playbook not found' })
      return
    }
    res.json(playbook)
  } catch (error) {
    console.error('Error fetching playbook:', error)
    res.status(500).json({ error: 'Failed to fetch playbook' })
  }
})

// Get agents list
router.get('/agents', (_req, res) => {
  res.json({
    agents: [
      { id: 'code-review-agent', name: 'Code Review Agent', status: 'active', lastSeen: '2026-06-11T10:30:00Z', totalTokens: 42300, errorRate: 0.02, avgLatency: 1200 },
      { id: 'deploy-agent', name: 'Deploy Agent', status: 'degraded', lastSeen: '2026-06-11T10:28:00Z', totalTokens: 98400, errorRate: 0.12, avgLatency: 4500 },
      { id: 'research-agent', name: 'Research Agent', status: 'active', lastSeen: '2026-06-11T10:32:00Z', totalTokens: 67800, errorRate: 0.01, avgLatency: 2100 },
      { id: 'onboarding-agent', name: 'Onboarding Agent', status: 'active', lastSeen: '2026-06-11T10:25:00Z', totalTokens: 15200, errorRate: 0.0, avgLatency: 800 },
      { id: 'support-agent', name: 'Support Agent', status: 'inactive', lastSeen: '2026-06-10T18:00:00Z', totalTokens: 0, errorRate: 0.0, avgLatency: 0 },
    ],
  })
})

// Get traces
router.get('/traces', (_req, res) => {
  res.json({
    traces: [
      { traceId: 'tr-a1b2c3d4', agentName: 'Deploy Agent', operation: 'deploy.run', status: 'error', duration: 4523, timestamp: '2026-06-11T10:28:12Z', spans: 8 },
      { traceId: 'tr-e5f6g7h8', agentName: 'Code Review Agent', operation: 'review.analyze', status: 'ok', duration: 1204, timestamp: '2026-06-11T10:30:45Z', spans: 5 },
      { traceId: 'tr-i9j0k1l2', agentName: 'Research Agent', operation: 'research.search', status: 'ok', duration: 2134, timestamp: '2026-06-11T10:32:01Z', spans: 6 },
      { traceId: 'tr-m3n4o5p6', agentName: 'Deploy Agent', operation: 'deploy.rollback', status: 'error', duration: 8901, timestamp: '2026-06-11T10:27:33Z', spans: 12 },
      { traceId: 'tr-q7r8s9t0', agentName: 'Onboarding Agent', operation: 'onboard.welcome', status: 'ok', duration: 789, timestamp: '2026-06-11T10:25:10Z', spans: 3 },
      { traceId: 'tr-u1v2w3x4', agentName: 'Code Review Agent', operation: 'review.suggest', status: 'ok', duration: 1567, timestamp: '2026-06-11T10:29:55Z', spans: 4 },
      { traceId: 'tr-y5z6a7b8', agentName: 'Deploy Agent', operation: 'deploy.validate', status: 'error', duration: 12340, timestamp: '2026-06-11T10:26:00Z', spans: 15 },
    ],
    total: 1247,
  })
})

// Get anomalies
router.get('/anomalies', (_req, res) => {
  res.json({
    anomalies: [
      { id: 'anom-001', title: 'Token spend spike on deploy-agent', type: 'token_spike', severity: 'critical', agentId: 'deploy-agent', detectedAt: '2026-06-11T10:15:00Z', status: 'open', metric: '4.5x above baseline' },
      { id: 'anom-002', title: 'Latency degradation on research-agent', type: 'latency', severity: 'warning', agentId: 'research-agent', detectedAt: '2026-06-11T09:45:00Z', status: 'open', metric: 'p95 jumped from 2.1s to 8.2s' },
      { id: 'anom-003', title: 'Error rate increase on deploy-agent', type: 'error_rate', severity: 'critical', agentId: 'deploy-agent', detectedAt: '2026-06-11T10:20:00Z', status: 'open', metric: '12% error rate (baseline: 1%)' },
      { id: 'anom-004', title: 'Repeated tool calls pattern on code-review-agent', type: 'hallucination', severity: 'warning', agentId: 'code-review-agent', detectedAt: '2026-06-11T08:30:00Z', status: 'resolved', metric: '5 identical GitHub API calls in 30s' },
      { id: 'anom-005', title: 'Context overflow on research-agent', type: 'context_overflow', severity: 'info', agentId: 'research-agent', detectedAt: '2026-06-10T22:00:00Z', status: 'resolved', metric: '127k/128k tokens used' },
    ],
    detectedToday: 3,
    avgDetectionTime: '2.3m',
    falsePositiveRate: 0.08,
  })
})

// Get alerts
router.get('/alerts', (_req, res) => {
  res.json({
    alerts: [
      { id: 'alert-001', title: 'Token budget exceeded', severity: 'critical', agentId: 'deploy-agent', triggeredAt: '2026-06-11T10:15:00Z', status: 'firing', rule: 'token_spend > 10000 in 15m' },
      { id: 'alert-002', title: 'Error rate threshold breached', severity: 'critical', agentId: 'deploy-agent', triggeredAt: '2026-06-11T10:20:00Z', status: 'firing', rule: 'error_rate > 5% for 5m' },
      { id: 'alert-003', title: 'High latency detected', severity: 'warning', agentId: 'research-agent', triggeredAt: '2026-06-11T09:45:00Z', status: 'firing', rule: 'p95_latency > 5s for 10m' },
      { id: 'alert-004', title: 'Agent offline', severity: 'warning', agentId: 'support-agent', triggeredAt: '2026-06-10T18:05:00Z', status: 'resolved', rule: 'last_seen > 30m ago' },
      { id: 'alert-005', title: 'Hallucination loop detected', severity: 'info', agentId: 'code-review-agent', triggeredAt: '2026-06-11T08:30:00Z', status: 'resolved', rule: 'repeated_tool_calls > 3 identical in 60s' },
    ],
    totalFiring: 3,
    totalResolved: 2,
  })
})

// Get tokens (API keys)
router.get('/tokens', (_req, res) => {
  res.json({
    tokens: [
      { id: 'tok-001', name: 'Production API Key', prefix: 'bruce_pk_***4f2a', status: 'active', createdAt: '2026-06-01T00:00:00Z', lastUsed: '2026-06-11T10:30:00Z', expiresAt: '2027-06-01T00:00:00Z' },
      { id: 'tok-002', name: 'CI/CD Pipeline', prefix: 'bruce_pk_***8b3c', status: 'active', createdAt: '2026-06-05T00:00:00Z', lastUsed: '2026-06-11T09:00:00Z', expiresAt: '2026-12-05T00:00:00Z' },
      { id: 'tok-003', name: 'Development Key', prefix: 'bruce_pk_***1d7e', status: 'active', createdAt: '2026-06-08T00:00:00Z', lastUsed: '2026-06-11T10:32:00Z', expiresAt: null },
      { id: 'tok-004', name: 'Old Staging Key', prefix: 'bruce_pk_***9a0f', status: 'expired', createdAt: '2024-01-15T00:00:00Z', lastUsed: '2025-12-31T00:00:00Z', expiresAt: '2025-12-31T00:00:00Z' },
    ],
  })
})

// Get overview metrics
router.get('/overview', (_req, res) => {
  res.json({
    totalAgents: 5,
    activeAlerts: 3,
    totalTraces: 1247,
    tokenSpendToday: 223700,
    errorRate: 0.064,
    avgLatency: 2340,
  })
})

// Get current user and workspace
router.get('/user', (_req, res) => {
  res.json({
    user: {
      id: 'usr_demo',
      firstName: 'Alex',
      lastName: 'Chen',
      email: 'alex.chen@acme.io',
      password: 'Password@123',
      role: 'admin',
      avatar: null,
      createdAt: '2024-06-01T00:00:00.000Z',
    },
    workspace: {
      id: 'ws_acme',
      name: 'Acme Corp',
      slug: 'acme-corp',
      plan: 'pro',
      region: 'us-central1',
      gcpProject: 'bruce-499005',
      dynatraceEnv: 'ens66072',
      createdAt: '2024-06-01T00:00:00.000Z',
    },
  })
})

export default router
