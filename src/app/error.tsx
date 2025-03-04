'use client'

import { Button } from '@/components/ui/button'
import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className="container mx-auto flex min-h-[50vh] flex-col items-center justify-center py-8">
      <h2 className="mb-4 text-2xl font-bold">Une erreur est survenue</h2>
      <p className="mb-8 text-muted-foreground">
        Impossible de charger les projets. Veuillez réessayer.
      </p>
      <Button onClick={reset}>Réessayer</Button>
    </main>
  )
}
