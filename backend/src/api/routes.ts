import { Router } from 'express'
import { generatePlaybook } from '../services/gemini.js'
import { savePlaybook, getPlaybooks, getPlaybookById } from '../services/firestore.js'

export const apiRoutes = Router()

// Webhook from Bindplane/Dynatrace alerts
apiRoutes.post('/webhooks/alert', async (req, res) => {
  const payload = req.body
  console.log('Alert received:', JSON.stringify(payload, null, 2))

  try {
    // Generate a playbook using Gemini
    const playbook = await generatePlaybook({
      alertTitle: payload.title || 'Unknown Alert',
      alertSeverity: payload.severity || 'WARNING',
      alertDetails: payload.details || payload,
      timestamp: new Date().toISOString(),
    })

    // Save to Firestore
    const saved = await savePlaybook(playbook)

    res.status(202).json({ status: 'accepted', playbookId: saved.id })
  } catch (error) {
    console.error('Error processing alert:', error)
    res.status(500).json({ error: 'Failed to process alert' })
  }
})

// Get all playbooks
apiRoutes.get('/playbooks', async (_req, res) => {
  try {
    const playbooks = await getPlaybooks()
    res.json({ playbooks })
  } catch (error) {
    console.error('Error fetching playbooks:', error)
    res.json({ playbooks: [] })
  }
})

// Get single playbook
apiRoutes.get('/playbooks/:id', async (req, res) => {
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
apiRoutes.get('/agents', (_req, res) => {
  res.json({
    agents: [
      { id: 'code-review-agent', name: 'Code Review Agent', status: 'active' },
      { id: 'deploy-agent', name: 'Deploy Agent', status: 'degraded' },
      { id: 'research-agent', name: 'Research Agent', status: 'active' },
    ],
  })
})

// Get overview metrics
apiRoutes.get('/overview', (_req, res) => {
  res.json({
    totalAgents: 3,
    activeAlerts: 2,
    totalTraces: 1247,
    tokenSpendToday: 154200,
    errorRate: 0.064,
    avgLatency: 2340,
  })
})
