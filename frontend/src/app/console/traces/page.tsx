import { Route } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { getTraces } from '@/lib/api'

export const metadata = { title: 'Traces — Bruce' }

export default async function TracesPage() {
  let traces: { traceId: string; agentName: string; operation: string; status: string; duration: number; timestamp: string; spans: number }[] = []
  let total = 0

  try {
    const data = await getTraces()
    traces = data.traces
    total = data.total
  } catch {
    // API unavailable
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold md:text-3xl">Traces</h1>
          <p className="text-muted-foreground mt-1">Distributed traces across all agents.</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Route className="h-4 w-4" />
          <span>{total.toLocaleString()} total today</span>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Traces</CardTitle>
          <CardDescription>Latest distributed traces with status and duration.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="hidden sm:grid grid-cols-6 gap-4 text-xs font-medium text-muted-foreground border-b pb-2">
              <span>Trace ID</span>
              <span>Agent</span>
              <span>Operation</span>
              <span>Duration</span>
              <span>Spans</span>
              <span>Status</span>
            </div>
            {traces.map((trace) => (
              <div key={trace.traceId} className="grid grid-cols-1 sm:grid-cols-6 gap-2 sm:gap-4 items-center py-2 border-b last:border-0">
                <span className="font-mono text-xs">{trace.traceId}</span>
                <span className="text-sm">{trace.agentName}</span>
                <span className="text-sm text-muted-foreground">{trace.operation}</span>
                <span className="text-sm">{trace.duration}ms</span>
                <span className="text-sm">{trace.spans}</span>
                <Badge variant={trace.status === 'error' ? 'destructive' : 'default'}>
                  {trace.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
