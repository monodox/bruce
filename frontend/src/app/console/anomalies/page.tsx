import { Activity, TrendingDown, AlertTriangle } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { getAnomalies } from '@/lib/api'

export const metadata = { title: 'Anomalies — Bruce' }

export default async function AnomaliesPage() {
  let anomalies: { id: string; title: string; type: string; severity: string; agentId: string; detectedAt: string; status: string; metric: string }[] = []
  let detectedToday = 0
  let avgDetectionTime = '—'
  let falsePositiveRate = 0

  try {
    const data = await getAnomalies()
    anomalies = data.anomalies
    detectedToday = data.detectedToday
    avgDetectionTime = data.avgDetectionTime
    falsePositiveRate = data.falsePositiveRate
  } catch {
    // API unavailable
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold md:text-3xl">Anomalies</h1>
        <p className="text-muted-foreground mt-1">Detected anomalies and unusual patterns.</p>
      </div>

      <div className="grid gap-4 grid-cols-2 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Detected Today</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{detectedToday}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Detection</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgDetectionTime}</div>
          </CardContent>
        </Card>
        <Card className="col-span-2 md:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">False Positive</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(falsePositiveRate * 100).toFixed(0)}%</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Anomalies</CardTitle>
          <CardDescription>Anomalies detected by Dynatrace, sorted by recency.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {anomalies.map((anomaly) => (
              <div key={anomaly.id} className="flex flex-col sm:flex-row sm:items-center gap-3 rounded-md border p-4">
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">{anomaly.title}</p>
                  <p className="text-xs text-muted-foreground">{anomaly.metric}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={anomaly.severity === 'critical' ? 'destructive' : anomaly.severity === 'warning' ? 'secondary' : 'outline'}>
                    {anomaly.severity}
                  </Badge>
                  <Badge variant={anomaly.status === 'open' ? 'default' : 'outline'}>
                    {anomaly.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
