'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { signIn } from 'next-auth/react'

export default function SignIn() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Connexion Administration</CardTitle>
          <CardDescription>
            Connectez-vous pour gérer les projets de l&apos;APE
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            className="w-full"
            onClick={() => signIn('google', { callbackUrl: '/admin' })}
          >
            Connexion avec Google
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
