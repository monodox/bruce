import { Route, Search, Filter } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'

export const metadata = { title: 'Traces' }

export default function TracesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold md:text-3xl">Traces</h1>
        <p className="text-muted-foreground mt-1">View and inspect distributed traces.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Search Traces</CardTitle>
          <CardDescription>Filter traces by service, operation, or trace ID.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input className="pl-9" placeholder="Search by trace ID, service, or operation..." />
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
              <Button>Search</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>Recent Traces</CardTitle>
            <CardDescription>Latest distributed traces across services.</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Route className="h-4 w-4 text-muted-foreground" />
            <Skeleton className="h-4 w-28" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                <Skeleton className="h-4 w-20 font-mono" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-36 hidden md:block" />
                <Skeleton className="h-4 w-14" />
                <Skeleton className="h-5 w-12 rounded-full" />
                <Skeleton className="ml-auto h-3 w-12" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
