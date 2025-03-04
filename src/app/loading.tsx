import { Card, CardContent, CardHeader } from '@/components/ui/card'

export default function Loading() {
  return (
    <main className="container mx-auto py-8">
      <div className="mb-8 h-12 w-64 animate-pulse rounded-lg bg-muted" />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <div className="h-48 w-full animate-pulse bg-muted" />
            <CardHeader>
              <div className="h-6 w-3/4 animate-pulse rounded bg-muted" />
              <div className="mt-2 h-4 w-full animate-pulse rounded bg-muted" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="h-2 w-full animate-pulse rounded bg-muted" />
                <div className="flex justify-between">
                  <div className="h-4 w-20 animate-pulse rounded bg-muted" />
                  <div className="h-4 w-24 animate-pulse rounded bg-muted" />
                </div>
                <div className="h-10 w-full animate-pulse rounded bg-muted" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  )
}
