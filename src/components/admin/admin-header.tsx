"use client"

import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { signOut } from "next-auth/react"

export function AdminHeader() {
  return (
    <div className="flex items-center justify-between p-4 border-b">
      <p className="text-sm text-muted-foreground">
        Connecté en tant qu&apos;admin
      </p>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => signOut({ callbackUrl: "/" })}
        className="text-muted-foreground hover:text-foreground cursor-pointer"
      >
        <LogOut className="h-4 w-4 mr-2" />
        Déconnexion
      </Button>
    </div>
  )
}
