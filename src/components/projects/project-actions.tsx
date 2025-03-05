"use client"

import { Button } from "@/components/ui/button"
import { Trash2, Power, PowerOff } from "lucide-react"
import { useRouter } from "next/navigation"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface ProjectActionsProps {
  projectId: string
  isActive: boolean
}

export function ProjectActions({ projectId, isActive }: ProjectActionsProps) {
  const router = useRouter()

  const toggleActive = async (e: React.MouseEvent) => {
    e.stopPropagation()
    try {
      const response = await fetch(`/api/projects/${projectId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isActive: !isActive }),
      })

      if (!response.ok) {
        throw new Error("Erreur lors de la modification du projet")
      }

      router.refresh()
    } catch (error) {
      console.error("Erreur:", error)
    }
  }

  const deleteProject = async () => {
    try {
      const response = await fetch(`/api/projects/${projectId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Erreur lors de la suppression du projet")
      }

      router.refresh()
    } catch (error) {
      console.error("Erreur:", error)
    }
  }

  return (
    <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleActive}
        title={isActive ? "Désactiver" : "Activer"}
        className="cursor-pointer"
      >
        {isActive ? (
          <PowerOff className="h-4 w-4 text-danger" />
        ) : (
          <Power className="h-4 w-4 text-success" />
        )}
      </Button>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="text-destructive hover:text-destructive cursor-pointer"
            title="Supprimer"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Supprimer le projet ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action est irréversible. Le projet et tous ses dons seront supprimés définitivement.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="cursor-pointer">Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={deleteProject} className="bg-danger text-danger-foreground hover:bg-danger/90 cursor-pointer">
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
