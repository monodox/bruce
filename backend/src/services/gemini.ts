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

export async function generatePlaybook(alert: AlertContext): Promise<Playbook> {
  if (!GEMINI_API_KEY) {
    // Return a mock playbook when Gemini is not configured
    return {
      title: `Fix: ${alert.alertTitle}`,
      severity: alert.alertSeverity,
      rootCause: 'Unable to determine root cause (Gemini API not configured)',
      steps: [
        'Check agent logs for error details',
        'Review recent code changes',
        'Verify external service connectivity',
        'Restart the affected agent',
        'Monitor for recurrence',
      ],
      generatedAt: new Date().toISOString(),
      alertContext: alert,
    }
  }

  const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY })

  const prompt = `You are Bruce, an AI Observability Copilot. Analyze this alert and generate a fix playbook.

Alert: ${alert.alertTitle}
Severity: ${alert.alertSeverity}
Details: ${JSON.stringify(alert.alertDetails)}
Time: ${alert.timestamp}

Generate a JSON response with:
- title: A concise title for the playbook
- rootCause: Your diagnosis of what went wrong
- steps: An array of step-by-step remediation instructions

Respond ONLY with valid JSON, no markdown.`

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
      steps: ['Review the raw Gemini output above for guidance'],
      generatedAt: new Date().toISOString(),
      alertContext: alert,
    }
  }
}
