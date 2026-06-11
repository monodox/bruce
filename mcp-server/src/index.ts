import { Server } from '@modelcontextprotocol/sdk/server/index.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import {
  ListToolsRequestSchema,
  CallToolRequestSchema,
} from '@modelcontextprotocol/sdk/types.js'

const DYNATRACE_ENV_URL = process.env.DYNATRACE_ENV_URL || ''
const DYNATRACE_API_TOKEN = process.env.DYNATRACE_API_TOKEN || ''

// Dynatrace API helper
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

// Initialize the MCP Server
const server = new Server(
  {
    name: 'bruce-dynatrace-mcp-server',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
)

// Define available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'get_failing_traces',
        description: 'Retrieve OpenTelemetry traces for agent runs that ended in errors within a given timeframe.',
        inputSchema: {
          type: 'object',
          properties: {
            timeframe: {
              type: 'string',
              description: 'Timeframe to query (e.g., "now-15m", "now-1h", "now-24h")',
            },
          },
        },
      },
      {
        name: 'get_token_metrics',
        description: 'Retrieve LLM token spend metrics for a specific agent, including input/output tokens and cost.',
        inputSchema: {
          type: 'object',
          properties: {
            agentId: {
              type: 'string',
              description: 'The ID or name of the agent to query metrics for',
            },
            timeframe: {
              type: 'string',
              description: 'Timeframe to query (e.g., "now-1h", "now-24h")',
            },
          },
          required: ['agentId'],
        },
      },
      {
        name: 'get_problems',
        description: 'Retrieve active problems and anomalies detected by Dynatrace for AI agent workloads.',
        inputSchema: {
          type: 'object',
          properties: {
            status: {
              type: 'string',
              description: 'Problem status filter: "OPEN" or "CLOSED"',
              enum: ['OPEN', 'CLOSED'],
            },
          },
        },
      },
      {
        name: 'get_agent_health',
        description: 'Get the health status and recent activity summary for a specific agent.',
        inputSchema: {
          type: 'object',
          properties: {
            agentId: {
              type: 'string',
              description: 'The ID or name of the agent to check health for',
            },
          },
          required: ['agentId'],
        },
      },
    ],
  }
})

// Handle tool execution
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params

  if (name === 'get_failing_traces') {
    const timeframe = (args?.timeframe as string) || 'now-15m'

    if (!DYNATRACE_ENV_URL || !DYNATRACE_API_TOKEN) {
      return {
        content: [{
          type: 'text',
          text: JSON.stringify({
            error: 'Dynatrace not configured',
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
          }, null, 2),
        }],
      }
    }

    const data = await queryDynatrace('/api/v2/metrics/query', {
      metricSelector: 'builtin:span.error_rate',
      from: timeframe,
    })

    return {
      content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
    }
  }

  if (name === 'get_token_metrics') {
    const agentId = args?.agentId as string
    const timeframe = (args?.timeframe as string) || 'now-24h'

    if (!DYNATRACE_ENV_URL || !DYNATRACE_API_TOKEN) {
      return {
        content: [{
          type: 'text',
          text: JSON.stringify({
            error: 'Dynatrace not configured',
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
          }, null, 2),
        }],
      }
    }

    const data = await queryDynatrace('/api/v2/metrics/query', {
      metricSelector: `ext:llm.token.usage:filter(eq("agent.id","${agentId}"))`,
      from: timeframe,
    })

    return {
      content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
    }
  }

  if (name === 'get_problems') {
    const status = (args?.status as string) || 'OPEN'

    if (!DYNATRACE_ENV_URL || !DYNATRACE_API_TOKEN) {
      return {
        content: [{
          type: 'text',
          text: JSON.stringify({
            error: 'Dynatrace not configured',
            mock: true,
            data: {
              problems: [
                { id: 'P-2024001', title: 'High error rate on code-review-agent', severity: 'ERROR', status: 'OPEN', startTime: new Date().toISOString() },
                { id: 'P-2024002', title: 'Token spend anomaly on deploy-agent', severity: 'RESOURCE', status: 'OPEN', startTime: new Date().toISOString() },
              ],
              totalCount: 2,
            },
          }, null, 2),
        }],
      }
    }

    const data = await queryDynatrace('/api/v2/problems', {
      problemSelector: `status("${status}")`,
    })

    return {
      content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
    }
  }

  if (name === 'get_agent_health') {
    const agentId = args?.agentId as string

    if (!DYNATRACE_ENV_URL || !DYNATRACE_API_TOKEN) {
      return {
        content: [{
          type: 'text',
          text: JSON.stringify({
            error: 'Dynatrace not configured',
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
          }, null, 2),
        }],
      }
    }

    const data = await queryDynatrace('/api/v2/entities', {
      entitySelector: `type("SERVICE"),entityName("${agentId}")`,
    })

    return {
      content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
    }
  }

  throw new Error(`Unknown tool: ${name}`)
})

// Start the server
async function run() {
  const transport = new StdioServerTransport()
  await server.connect(transport)
  console.error('Bruce Dynatrace MCP Server running on stdio')
}

run().catch(console.error)
