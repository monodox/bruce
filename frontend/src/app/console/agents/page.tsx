import { Bot, Plus, CircleDot } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { getAgents } from '@/lib/api'

export const metadata = { title: 'Agents — Bruce' }

export default async function AgentsPage() {
  let agents: { id: string; name: string; status: string; lastSeen: string; totalTokens: number; errorRate: number; avgLatency: number }[] = []

  try {
    const data = await getAgents()
    agents = data.agents
  } catch {
    // API unavailable
  }

  const active = agents.filter((a) => a.status === 'active').length
  const degraded = agents.filter((a) => a.status === 'degraded').length
  const inactive = agents.filter((a) => a.status === 'inactive').length

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold md:text-3xl">Agents</h1>
          <p className="text-muted-foreground mt-1">Manage and monitor your AI agents.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Agent
        </Button>
      </div>

      <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total</CardTitle>
            <Bot className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{agents.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{active}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Degraded</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{degraded}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Inactive</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-muted-foreground">{inactive}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Agents</CardTitle>
          <CardDescription>Registered agents with health metrics from Dynatrace.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="hidden md:grid grid-cols-6 gap-4 text-xs font-medium text-muted-foreground border-b pb-2">
              <span>Agent</span>
              <span>Status</span>
              <span>Tokens Today</span>
              <span>Error Rate</span>
              <span>Avg Latency</span>
              <span>Last Seen</span>
            </div>
            {agents.map((agent) => (
              <div key={agent.id} className="grid grid-cols-1 md:grid-cols-6 gap-2 md:gap-4 items-center py-3 border-b last:border-0">
                <div className="flex items-center gap-2">
                  <CircleDot className={`h-3 w-3 ${
                    agent.status === 'active' ? 'text-green-500' :
                    agent.status === 'degraded' ? 'text-yellow-500' : 'text-muted-foreground'
                  }`} />
                  <div>
                    <p className="text-sm font-medium">{agent.name}</p>
                    <p className="text-xs text-muted-foreground font-mono md:hidden">{agent.id}</p>
                  </div>
                </div>
                <Badge variant={
                  agent.status === 'active' ? 'default' :
                  agent.status === 'degraded' ? 'secondary' : 'outline'
                }>
                  {agent.status}
                </Badge>
                <span className="text-sm">{agent.totalTokens.toLocaleString()}</span>
                <span className="text-sm">{(agent.errorRate * 100).toFixed(1)}%</span>
                <span className="text-sm">{agent.avgLatency}ms</span>
                <span className="text-xs text-muted-foreground">{new Date(agent.lastSeen).toLocaleTimeString()}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
