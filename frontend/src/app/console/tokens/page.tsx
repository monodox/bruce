import { Key, Plus } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { getTokens } from '@/lib/api'

export const metadata = { title: 'Tokens — Bruce' }

export default async function TokensPage() {
  let tokens: { id: string; name: string; prefix: string; status: string; createdAt: string; lastUsed: string; expiresAt: string | null }[] = []

  try {
    const data = await getTokens()
    tokens = data.tokens
  } catch {
    // API unavailable
  }

  const active = tokens.filter((t) => t.status === 'active').length
  const expired = tokens.filter((t) => t.status === 'expired').length

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold md:text-3xl">Tokens</h1>
          <p className="text-muted-foreground mt-1">Manage API tokens and access keys.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Generate Token
        </Button>
      </div>

      <div className="grid gap-4 grid-cols-2 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total</CardTitle>
            <Key className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tokens.length}</div>
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
        <Card className="col-span-2 md:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Expired</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-muted-foreground">{expired}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>API Tokens</CardTitle>
          <CardDescription>Your tokens for authenticating with Bruce APIs.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="hidden sm:grid grid-cols-5 gap-4 text-xs font-medium text-muted-foreground border-b pb-2">
              <span>Name</span>
              <span>Key</span>
              <span>Last Used</span>
              <span>Expires</span>
              <span>Status</span>
            </div>
            {tokens.map((token) => (
              <div key={token.id} className="grid grid-cols-1 sm:grid-cols-5 gap-2 sm:gap-4 items-center py-2 border-b last:border-0">
                <span className="text-sm font-medium">{token.name}</span>
                <span className="font-mono text-xs text-muted-foreground">{token.prefix}</span>
                <span className="text-xs text-muted-foreground">{new Date(token.lastUsed).toLocaleDateString()}</span>
                <span className="text-xs text-muted-foreground">{token.expiresAt ? new Date(token.expiresAt).toLocaleDateString() : 'Never'}</span>
                <Badge variant={token.status === 'active' ? 'default' : 'outline'}>
                  {token.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
