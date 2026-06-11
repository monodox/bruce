import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'

export const metadata = { title: 'Cookie Policy' }

const cookies = [
  { name: '_bruce_session', purpose: 'Authentication session', type: 'Essential', duration: '7 days' },
  { name: '_bruce_csrf', purpose: 'CSRF protection', type: 'Essential', duration: 'Session' },
  { name: '_bruce_prefs', purpose: 'User preferences (theme, locale)', type: 'Functional', duration: '1 year' },
  { name: '_bruce_analytics', purpose: 'Usage analytics', type: 'Analytics', duration: '30 days' },
]

export default function CookiesPage() {
  return (
    <div className="mx-auto max-w-3xl py-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Cookie Policy</CardTitle>
          <p className="text-sm text-muted-foreground">Last updated: January 1, 2024</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <section className="space-y-2">
            <h2 className="text-lg font-semibold">What Are Cookies</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Cookies are small text files stored on your device when you visit Bruce. They help us provide a better experience by remembering your preferences and session.
            </p>
          </section>
          <Separator />
          <section className="space-y-2">
            <h2 className="text-lg font-semibold">Cookies We Use</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Purpose</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Duration</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cookies.map((c) => (
                  <TableRow key={c.name}>
                    <TableCell className="font-mono text-xs">{c.name}</TableCell>
                    <TableCell className="text-muted-foreground">{c.purpose}</TableCell>
                    <TableCell><Badge variant="secondary">{c.type}</Badge></TableCell>
                    <TableCell className="text-muted-foreground">{c.duration}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </section>
          <Separator />
          <section className="space-y-2">
            <h2 className="text-lg font-semibold">Managing Cookies</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              You can control cookies through your browser settings. Disabling essential cookies may affect your ability to use Bruce.
            </p>
          </section>
        </CardContent>
      </Card>
    </div>
  )
}
