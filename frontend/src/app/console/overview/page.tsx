import { Activity, Bot, Bell, Route, Coins, Timer } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { getOverview } from '@/lib/api'

export const metadata = { title: 'Overview — Bruce' }

export default async function OverviewPage() {
  let metrics = { totalAgents: 0, activeAlerts: 0, totalTraces: 0, tokenSpendToday: 0, errorRate: 0, avgLatency: 0 }

  try {
    metrics = await getOverview()
  } catch {
    // API unavailable — show zeros
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold md:text-3xl">Overview</h1>
        <p className="text-muted-foreground mt-1">System health and metrics at a glance.</p>
      </div>

      <div className="grid gap-4 grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Agents</CardTitle>
            <Bot className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalAgents}</div>
            <p className="text-xs text-muted-foreground">monitored</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alerts</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.activeAlerts}</div>
            <p className="text-xs text-muted-foreground">active</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Traces</CardTitle>
            <Route className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalTraces.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tokens</CardTitle>
            <Coins className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(metrics.tokenSpendToday / 1000).toFixed(1)}k</div>
            <p className="text-xs text-muted-foreground">spent today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Error Rate</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(metrics.errorRate * 100).toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">of requests</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Latency</CardTitle>
            <Timer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(metrics.avgLatency / 1000).toFixed(1)}s</div>
            <p className="text-xs text-muted-foreground">avg response</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
            <CardDescription>Current status of connected services</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Dynatrace</span>
              <Badge variant="default">Connected</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Bindplane Collector</span>
              <Badge variant="default">Receiving</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Gemini Agent</span>
              <Badge variant="default">Ready</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Firestore</span>
              <Badge variant="default">Online</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common operations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <a href="/console/diagnose" className="block rounded-md border p-3 hover:bg-accent transition-colors">
              <p className="text-sm font-medium">Run Diagnosis</p>
              <p className="text-xs text-muted-foreground">Analyze a failing agent with Gemini</p>
            </a>
            <a href="/console/playbooks" className="block rounded-md border p-3 hover:bg-accent transition-colors">
              <p className="text-sm font-medium">View Playbooks</p>
              <p className="text-xs text-muted-foreground">Check generated fix recommendations</p>
            </a>
            <a href="/console/agents" className="block rounded-md border p-3 hover:bg-accent transition-colors">
              <p className="text-sm font-medium">Manage Agents</p>
              <p className="text-xs text-muted-foreground">View agent health and configuration</p>
            </a>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
