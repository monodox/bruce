import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

export const metadata = { title: 'Terms of Service' }

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl py-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Terms of Service</CardTitle>
          <p className="text-sm text-muted-foreground">Last updated: January 1, 2024</p>
        </CardHeader>
        <CardContent className="prose prose-sm dark:prose-invert space-y-6">
          <section className="space-y-2">
            <h2 className="text-lg font-semibold">1. Acceptance of Terms</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              By accessing or using Bruce, you agree to be bound by these Terms of Service and all applicable laws and regulations.
            </p>
          </section>
          <Separator />
          <section className="space-y-2">
            <h2 className="text-lg font-semibold">2. Use License</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Permission is granted to temporarily use Bruce for personal or commercial monitoring purposes, subject to the restrictions outlined in these terms.
            </p>
          </section>
          <Separator />
          <section className="space-y-2">
            <h2 className="text-lg font-semibold">3. Limitations</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              You may not modify, reverse engineer, or redistribute any portion of Bruce without express written permission.
            </p>
          </section>
          <Separator />
          <section className="space-y-2">
            <h2 className="text-lg font-semibold">4. Disclaimer</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Bruce is provided &quot;as is&quot; without warranties of any kind. We do not guarantee uninterrupted or error-free service.
            </p>
          </section>
        </CardContent>
      </Card>
    </div>
  )
}
