import { BookOpen, Plus } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

export const metadata = { title: 'Playbooks' }

export default function PlaybooksPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold md:text-3xl">Playbooks</h1>
          <p className="text-muted-foreground mt-1">Automated response playbooks and workflows.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Playbook
        </Button>
      </div>

      <div className="grid gap-4 grid-cols-2 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Playbooks</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-12" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Enabled</CardTitle>
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-12" />
          </CardContent>
        </Card>
        <Card className="col-span-2 md:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Triggers</CardTitle>
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-12" />
            <Skeleton className="mt-1 h-3 w-20" />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Playbooks</CardTitle>
          <CardDescription>Manage your automated response workflows.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-4 w-48 hidden sm:block" />
                <Skeleton className="h-5 w-16 rounded-full" />
                <Skeleton className="h-4 w-8" />
                <Skeleton className="ml-auto h-4 w-16" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
