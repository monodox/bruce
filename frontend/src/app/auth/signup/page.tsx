import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { AppIcon } from '@/components/shared/app-icon'

export const metadata = { title: 'Sign Up' }

export default function SignupPage() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-3 text-center">
          <div className="flex justify-center">
            <AppIcon size={40} />
          </div>
          <CardTitle className="text-2xl">Create your account</CardTitle>
          <CardDescription>Get started with Bruce. Monitor your AI agents in minutes.</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="firstName" className="text-sm font-medium">
                First name
              </label>
              <Input
                id="firstName"
                type="text"
                placeholder="Jane"
                autoComplete="given-name"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="lastName" className="text-sm font-medium">
                Last name
              </label>
              <Input
                id="lastName"
                type="text"
                placeholder="Doe"
                autoComplete="family-name"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Work email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="you@company.com"
              autoComplete="email"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="workspace" className="text-sm font-medium">
              Workspace name
            </label>
            <Input
              id="workspace"
              type="text"
              placeholder="My Company"
            />
            <p className="text-xs text-muted-foreground">
              This will be your team&apos;s workspace on Bruce.
            </p>
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="Create a strong password"
              autoComplete="new-password"
            />
            <p className="text-xs text-muted-foreground">
              Minimum 8 characters with at least one number and one special character.
            </p>
          </div>

          <Button className="w-full" size="lg" asChild>
            <Link href="/console/overview">
              Create account
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            By creating an account, you agree to our{' '}
            <Link href="/legal/terms" className="text-primary hover:underline">Terms of Service</Link>
            {' '}and{' '}
            <Link href="/legal/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
          </p>
        </CardContent>

        <CardFooter className="justify-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-primary font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
