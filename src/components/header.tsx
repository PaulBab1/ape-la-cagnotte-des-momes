"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { signOut } from "next-auth/react"
import { useSession } from "next-auth/react"

export function Header() {
  const { data: session } = useSession()

  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative w-12 h-12">
            <Image
              src="/ape-logo.jpg"
              alt="Logo APE"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div>
            <h1 className="font-bold text-xl">APE la Cagnotte des Mômes</h1>
            <p className="text-sm text-muted-foreground">École d&apos;Épinay-sur-Odon</p>
          </div>
        </Link>
        <nav className="hidden md:block">
          {session ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => signOut({ callbackUrl: "/" })}
              className="text-muted-foreground hover:text-foreground cursor-pointer"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Déconnexion
            </Button>
          ) : (
            <Link 
              href="/admin/login" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Administration
            </Link>
          )}
        </nav>
      </div>
    </header>
  )
}
