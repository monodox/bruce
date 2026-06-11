import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

export const metadata = { title: 'Settings' }

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold md:text-3xl">Settings</h1>
        <p className="text-muted-foreground mt-1">Application configuration and preferences.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>General</CardTitle>
          <CardDescription>Manage your workspace settings.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="workspace-name">Workspace Name</Label>
            <Input id="workspace-name" placeholder="My Workspace" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="workspace-url">Workspace URL</Label>
            <Input id="workspace-url" placeholder="my-workspace.bruce.dev" disabled />
            <p className="text-xs text-muted-foreground">Contact support to change your workspace URL.</p>
          </div>
          <Button>Save Changes</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>Configure how you receive notifications.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email-notifications">Email for Notifications</Label>
            <Input id="email-notifications" type="email" placeholder="admin@company.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="slack-webhook">Slack Webhook URL</Label>
            <Input id="slack-webhook" placeholder="https://hooks.slack.com/services/..." />
          </div>
          <Button>Update Notifications</Button>
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
