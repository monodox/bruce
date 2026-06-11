import { GoogleGenAI } from '@google/genai'

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || ''
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-3.5-flash'

interface AlertContext {
  alertTitle: string
  alertSeverity: string
  alertDetails: unknown
  timestamp: string
}

export interface Playbook {
  id?: string
  title: string
  severity: string
  rootCause: string
  steps: string[]
  generatedAt: string
  alertContext: AlertContext
}

function generateMockPlaybook(alert: AlertContext): Playbook {
  const title = alert.alertTitle.toLowerCase()
  let rootCause = 'Agent experiencing degraded performance due to external service dependency failure.'
  let steps = [
    'Check agent logs for detailed error stack traces',
    'Verify external service connectivity and response times',
    'Review recent configuration or prompt changes',
    'Restart the affected agent with increased timeout thresholds',
    'Set up alerting on the root cause metric to catch recurrence early',
  ]

  if (title.includes('token') || title.includes('spend')) {
    rootCause = 'Agent entered a hallucination loop, repeatedly calling the same tool without processing results. Token budget exhausted in 47 requests over 12 minutes.'
    steps = [
      'Add a max-iterations guard (limit tool calls to 5 per turn)',
      'Implement deduplication check: skip tool calls with identical parameters',
      'Add a token budget cap in the agent configuration (max 10k tokens/request)',
      'Review the system prompt for ambiguous instructions causing repetition',
      'Deploy the fix and monitor token spend for 1 hour to confirm resolution',
    ]
  } else if (title.includes('error') || title.includes('fail')) {
    rootCause = 'External API dependency (GitHub API) returning 503 errors, causing cascading tool call failures. Agent retry logic amplified the issue.'
    steps = [
      'Confirm GitHub API status at status.github.com',
      'Add circuit breaker pattern to tool calls (trip after 3 consecutive failures)',
      'Implement exponential backoff on retries (currently using fixed 1s delay)',
      'Add a fallback response when tool calls fail (graceful degradation)',
      'Update monitoring to alert on external dependency error rates',
    ]
  } else if (title.includes('latency') || title.includes('slow')) {
    rootCause = 'Context window overflow causing increased inference time. Agent accumulating conversation history without truncation.'
    steps = [
      'Implement sliding window for conversation history (keep last 10 turns)',
      'Add context compression: summarize older messages before appending',
      'Set a max context length guard (128k tokens) with graceful truncation',
      'Profile the prompt template for unnecessary verbosity',
      'Monitor p95 latency after fix deployment',
    ]
  }

  return {
    title: `Fix: ${alert.alertTitle}`,
    severity: alert.alertSeverity,
    rootCause,
    steps,
    generatedAt: new Date().toISOString(),
    alertContext: alert,
  }
}

export async function generatePlaybook(alert: AlertContext): Promise<Playbook> {
  if (!GEMINI_API_KEY) {
    console.log('Gemini API key not configured, using mock playbook')
    return generateMockPlaybook(alert)
  }

  try {
    const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY })

    const prompt = `You are Bruce, an AI Observability Copilot. Analyze this alert and generate a fix playbook.

Alert: ${alert.alertTitle}
Severity: ${alert.alertSeverity}
Details: ${JSON.stringify(alert.alertDetails)}
Time: ${alert.timestamp}

Generate a JSON response with:
- title: A concise title for the playbook
- rootCause: Your diagnosis of what went wrong (2-3 sentences)
- steps: An array of 5 step-by-step remediation instructions (specific and actionable)

Respond ONLY with valid JSON, no markdown fences.`

    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: prompt,
    })

    const text = response.text || ''

    try {
      const parsed = JSON.parse(text)
      return {
        title: parsed.title || `Fix: ${alert.alertTitle}`,
        severity: alert.alertSeverity,
        rootCause: parsed.rootCause || 'Unknown',
        steps: parsed.steps || [],
        generatedAt: new Date().toISOString(),
        alertContext: alert,
      }
    } catch {
      return {
        title: `Fix: ${alert.alertTitle}`,
        severity: alert.alertSeverity,
        rootCause: text,
        steps: ['Review the Gemini output above for guidance'],
        generatedAt: new Date().toISOString(),
        alertContext: alert,
      }
    }
  } catch (error) {
    console.error('Gemini API error, falling back to mock:', error)
    return generateMockPlaybook(alert)
  }
}
