import { Bell } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { getAlerts } from '@/lib/api'

export const metadata = { title: 'Alerts — Bruce' }

export default async function AlertsPage() {
  let alerts: { id: string; title: string; severity: string; agentId: string; triggeredAt: string; status: string; rule: string }[] = []
  let totalFiring = 0
  let totalResolved = 0

  try {
    const data = await getAlerts()
    alerts = data.alerts
    totalFiring = data.totalFiring
    totalResolved = data.totalResolved
  } catch {
    // API unavailable
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold md:text-3xl">Alerts</h1>
        <p className="text-muted-foreground mt-1">Active and resolved alert rules.</p>
      </div>

      <div className="grid gap-4 grid-cols-2 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Alerts</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{alerts.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Firing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{totalFiring}</div>
          </CardContent>
        </Card>
        <Card className="col-span-2 md:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Resolved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{totalResolved}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Alert History</CardTitle>
          <CardDescription>All alerts with their trigger rules and status.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {alerts.map((alert, i) => (
              <div key={alert.id}>
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <Badge variant={alert.severity === 'critical' ? 'destructive' : alert.severity === 'warning' ? 'secondary' : 'outline'}>
                    {alert.severity}
                  </Badge>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">{alert.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {alert.agentId} &middot; Rule: <code className="text-xs">{alert.rule}</code>
                    </p>
                  </div>
                  <Badge variant={alert.status === 'firing' ? 'destructive' : 'outline'}>
                    {alert.status}
                  </Badge>
                </div>
                {i < alerts.length - 1 && <Separator className="mt-4" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
