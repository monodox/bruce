import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

export const metadata = { title: 'Privacy Policy' }

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl py-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Privacy Policy</CardTitle>
          <p className="text-sm text-muted-foreground">Last updated: January 1, 2024</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <section className="space-y-2">
            <h2 className="text-lg font-semibold">Information We Collect</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We collect information you provide directly, such as your name, email address, and workspace data. We also collect usage data including telemetry, agent metrics, and system logs.
            </p>
          </section>
          <Separator />
          <section className="space-y-2">
            <h2 className="text-lg font-semibold">How We Use Your Information</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your information is used to provide, maintain, and improve Bruce services. We do not sell your data to third parties.
            </p>
          </section>
          <Separator />
          <section className="space-y-2">
            <h2 className="text-lg font-semibold">Data Retention</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We retain your data for as long as your account is active or as needed to provide services. You may request deletion at any time.
            </p>
          </section>
          <Separator />
          <section className="space-y-2">
            <h2 className="text-lg font-semibold">Contact Us</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              For privacy-related questions, contact us at privacy@bruce.dev.
            </p>
          </section>
        </CardContent>
      </Card>
    </div>
  )
}
