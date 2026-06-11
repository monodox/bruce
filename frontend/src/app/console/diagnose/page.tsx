'use client'

import { useState } from 'react'
import { Stethoscope, Search, Loader2 } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api'

interface DiagnosisResult {
  playbookId: string
  status: string
}

export default function DiagnosePage() {
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<DiagnosisResult[]>([])
  const [error, setError] = useState<string | null>(null)

  async function handleDiagnose() {
    if (!query.trim()) return
    setLoading(true)
    setError(null)

    try {
      const res = await fetch(`${API_URL}/webhooks/alert`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: query,
          severity: 'WARNING',
          details: { userQuery: query, source: 'manual-diagnosis' },
        }),
      })

      if (!res.ok) throw new Error('Failed to trigger diagnosis')

      const data = await res.json()
      setResults((prev) => [data, ...prev])
      setQuery('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold md:text-3xl">Diagnose</h1>
        <p className="text-muted-foreground mt-1">Describe an issue and let Gemini analyze the root cause.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Run Diagnosis</CardTitle>
          <CardDescription>
            Enter a symptom or alert description. Bruce will query Dynatrace via MCP and generate a fix playbook using gemini-3.5-flash.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                className="pl-9"
                placeholder="e.g. High token spend on code-review-agent..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleDiagnose()}
                disabled={loading}
              />
            </div>
            <Button onClick={handleDiagnose} disabled={loading || !query.trim()}>
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Stethoscope className="mr-2 h-4 w-4" />
              )}
              {loading ? 'Diagnosing...' : 'Diagnose'}
            </Button>
          </div>
          {error && (
            <p className="text-sm text-red-600 mt-2">{error}</p>
          )}
        </CardContent>
      </Card>

      {results.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Diagnosis Results</CardTitle>
            <CardDescription>Playbooks generated from your queries.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {results.map((result, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Playbook generated</p>
                      <p className="text-xs text-muted-foreground font-mono">ID: {result.playbookId}</p>
                    </div>
                    <Badge variant="default">{result.status}</Badge>
                  </div>
                  {i < results.length - 1 && <Separator className="mt-4" />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardContent className="py-8 text-center">
          <Stethoscope className="mx-auto h-10 w-10 text-muted-foreground mb-3" />
          <h3 className="text-sm font-medium">How it works</h3>
          <p className="text-xs text-muted-foreground mt-1 max-w-md mx-auto">
            Your query is sent as an alert to the backend. The backend calls the Gemini agent (gemini-3.5-flash) 
            which uses the MCP server to query Dynatrace for relevant traces and metrics, then generates a fix playbook 
            stored in Firestore.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
