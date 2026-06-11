import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { getUser } from '@/lib/api'

export const metadata = { title: 'Settings — Bruce' }

export default async function SettingsPage() {
  let user = { firstName: '', lastName: '', email: '', role: '', createdAt: '' }
  let workspace = { name: '', slug: '', plan: '', region: '', gcpProject: '', dynatraceEnv: '' }

  try {
    const data = await getUser()
    user = data.user
    workspace = data.workspace
  } catch {
    // API unavailable
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold md:text-3xl">Settings</h1>
        <p className="text-muted-foreground mt-1">Account and workspace configuration.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Your personal account details.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">First name</label>
              <Input defaultValue={user.firstName} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Last name</label>
              <Input defaultValue={user.lastName} />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <Input defaultValue={user.email} type="email" />
          </div>
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium">Role</label>
            <Badge>{user.role || 'admin'}</Badge>
          </div>
          <Button>Save Profile</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Workspace</CardTitle>
          <CardDescription>Your team workspace settings.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Workspace Name</label>
            <Input defaultValue={workspace.name} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Slug</label>
            <Input defaultValue={workspace.slug} disabled />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Plan</label>
              <div className="flex items-center gap-2">
                <Input defaultValue={workspace.plan} disabled />
                <Badge variant="secondary">{workspace.plan}</Badge>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Region</label>
              <Input defaultValue={workspace.region} disabled />
            </div>
          </div>
          <Button>Update Workspace</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Integrations</CardTitle>
          <CardDescription>Connected services and credentials.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">GCP Project</label>
            <Input defaultValue={workspace.gcpProject} disabled />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Dynatrace Environment</label>
            <Input defaultValue={workspace.dynatraceEnv ? `${workspace.dynatraceEnv}.live.dynatrace.com` : ''} disabled />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Gemini Model</label>
            <Input defaultValue="gemini-3.5-flash" disabled />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Danger Zone</CardTitle>
          <CardDescription>Irreversible and destructive actions.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Separator />
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium">Delete Workspace</p>
              <p className="text-xs text-muted-foreground">Permanently delete this workspace and all its data.</p>
            </div>
            <Button variant="destructive">Delete Workspace</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
