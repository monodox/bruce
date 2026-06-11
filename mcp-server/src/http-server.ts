import express from 'express'
import cors from 'cors'

const DYNATRACE_ENV_URL = process.env.DYNATRACE_ENV_URL || ''
const DYNATRACE_API_TOKEN = process.env.DYNATRACE_API_TOKEN || ''
const PORT = process.env.PORT || 8080

async function queryDynatrace(endpoint: string, params?: Record<string, string>) {
  const url = new URL(endpoint, DYNATRACE_ENV_URL)
  if (params) {
    Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, value))
  }

  const response = await fetch(url.toString(), {
    headers: {
      'Authorization': `Api-Token ${DYNATRACE_API_TOKEN}`,
      'Accept': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error(`Dynatrace API error: ${response.status} ${response.statusText}`)
  }

  return response.json()
}

const app = express()
app.use(cors())
app.use(express.json())

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'bruce-mcp-server', version: '1.0.0' })
})

// List available tools
app.get('/tools', (_req, res) => {
  res.json({
    tools: [
      { name: 'get_failing_traces', description: 'Retrieve error traces from Dynatrace' },
      { name: 'get_token_metrics', description: 'Retrieve LLM token metrics for an agent' },
      { name: 'get_problems', description: 'Retrieve active problems/anomalies' },
      { name: 'get_agent_health', description: 'Get agent health status' },
    ],
  })
})

// Execute tool calls via HTTP
app.post('/tools/:toolName', async (req, res) => {
  const { toolName } = req.params
  const args = req.body

  try {
    if (toolName === 'get_failing_traces') {
      const timeframe = args?.timeframe || 'now-15m'

      if (!DYNATRACE_ENV_URL || !DYNATRACE_API_TOKEN) {
        res.json({
          mock: true,
          data: {
            traces: [
              { traceId: 'abc123', agentName: 'code-review-agent', error: 'ToolCallTimeout: GitHub API exceeded 30s', timestamp: new Date().toISOString() },
              { traceId: 'def456', agentName: 'deploy-agent', error: 'HallucinationLoop: repeated identical tool calls (5x)', timestamp: new Date().toISOString() },
              { traceId: 'ghi789', agentName: 'research-agent', error: 'ContextOverflow: input exceeded 128k token limit', timestamp: new Date().toISOString() },
            ],
            timeframe,
            total: 3,
          },
        })
        return
      }

      const data = await queryDynatrace('/api/v2/metrics/query', {
        metricSelector: 'builtin:span.error_rate',
        from: timeframe,
      })
      res.json(data)
      return
    }

    if (toolName === 'get_token_metrics') {
      const agentId = args?.agentId
      const timeframe = args?.timeframe || 'now-24h'

      if (!DYNATRACE_ENV_URL || !DYNATRACE_API_TOKEN) {
        res.json({
          mock: true,
          data: {
            agentId,
            timeframe,
            metrics: {
              totalTokens: 154200,
              inputTokens: 98400,
              outputTokens: 55800,
              avgLatencyMs: 2340,
              requestCount: 47,
              errorRate: 0.064,
              estimatedCost: '$0.23',
            },
          },
        })
        return
      }

      const data = await queryDynatrace('/api/v2/metrics/query', {
        metricSelector: `ext:llm.token.usage:filter(eq("agent.id","${agentId}"))`,
        from: timeframe,
      })
      res.json(data)
      return
    }

    if (toolName === 'get_problems') {
      const status = args?.status || 'OPEN'

      if (!DYNATRACE_ENV_URL || !DYNATRACE_API_TOKEN) {
        res.json({
          mock: true,
          data: {
            problems: [
              { id: 'P-2024001', title: 'High error rate on code-review-agent', severity: 'ERROR', status: 'OPEN', startTime: new Date().toISOString() },
              { id: 'P-2024002', title: 'Token spend anomaly on deploy-agent', severity: 'RESOURCE', status: 'OPEN', startTime: new Date().toISOString() },
            ],
            totalCount: 2,
          },
        })
        return
      }

      const data = await queryDynatrace('/api/v2/problems', {
        problemSelector: `status("${status}")`,
      })
      res.json(data)
      return
    }

    if (toolName === 'get_agent_health') {
      const agentId = args?.agentId

      if (!DYNATRACE_ENV_URL || !DYNATRACE_API_TOKEN) {
        res.json({
          mock: true,
          data: {
            agentId,
            status: 'DEGRADED',
            lastSeen: new Date().toISOString(),
            uptime: '4h 23m',
            recentErrors: 3,
            avgResponseTime: '2.3s',
            tokenBudgetUsed: '67%',
          },
        })
        return
      }

      const data = await queryDynatrace('/api/v2/entities', {
        entitySelector: `type("SERVICE"),entityName("${agentId}")`,
      })
      res.json(data)
      return
    }

    res.status(404).json({ error: `Unknown tool: ${toolName}` })
  } catch (error) {
    console.error(`Tool ${toolName} error:`, error)
    res.status(500).json({ error: `Tool execution failed: ${error}` })
  }
})

app.listen(PORT, () => {
  console.log(`Bruce MCP HTTP Server listening on port ${PORT}`)
})
