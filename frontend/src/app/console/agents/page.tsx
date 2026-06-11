import { Bot, Plus, CircleDot } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { getAgents } from '@/lib/api'

export const metadata = { title: 'Agents — Bruce' }

export default async function AgentsPage() {
  let agents: { id: string; name: string; status: string }[] = []

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
          <CardDescription>Registered agents and their current health status.</CardDescription>
        </CardHeader>
        <CardContent>
          {agents.length === 0 ? (
            <p className="text-sm text-muted-foreground py-8 text-center">No agents registered yet. Add your first agent to get started.</p>
          ) : (
            <div className="space-y-4">
              {agents.map((agent) => (
                <div key={agent.id} className="flex items-center gap-4 rounded-md border p-4">
                  <CircleDot className={`h-4 w-4 ${
                    agent.status === 'active' ? 'text-green-500' :
                    agent.status === 'degraded' ? 'text-yellow-500' : 'text-muted-foreground'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{agent.name}</p>
                    <p className="text-xs text-muted-foreground font-mono">{agent.id}</p>
                  </div>
                  <Badge variant={
                    agent.status === 'active' ? 'default' :
                    agent.status === 'degraded' ? 'secondary' : 'outline'
                  }>
                    {agent.status}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
