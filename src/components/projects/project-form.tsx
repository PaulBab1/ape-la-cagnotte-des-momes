"use client"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useRouter } from "next/navigation"
import { Project } from "@prisma/client"

const formSchema = z.object({
  title: z.string().min(2, 'Le titre doit faire au moins 2 caractères'),
  description: z.string().min(10, 'La description doit faire au moins 10 caractères'),
  imageUrl: z.string().nullable(),
  targetAmount: z.coerce.number().min(1),
  raisedAmount: z.coerce.number().min(0),
  isActive: z.boolean().default(true),
})

type FormValues = z.infer<typeof formSchema>

interface ProjectFormProps {
  project?: Project
  onSubmit: (data: FormValues) => Promise<void>
}

export function ProjectForm({ project, onSubmit }: ProjectFormProps) {
  const router = useRouter()
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: project?.title || "",
      description: project?.description || "",
      imageUrl: project?.imageUrl || "",
      targetAmount: project?.targetAmount || 0,
      raisedAmount: project?.raisedAmount || 0,
      isActive: project?.isActive ?? true,
    },
  })

  async function handleSubmit(data: FormValues) {
    try {
      const response = await fetch(project ? `/api/projects/${project.id}` : "/api/projects", {
        method: project ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        console.error('Erreur serveur:', result)
        throw new Error(result.error || "Une erreur est survenue")
      }

      router.push("/admin")
      router.refresh()
    } catch (error) {
      console.error("Erreur:", error)
      // TODO: Ajouter un toast ou une notification pour l'utilisateur
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Titre</FormLabel>
              <FormControl>
                <Input placeholder="Sortie au Zoo de Beauval" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Une journée inoubliable à la découverte des animaux..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image (URL)</FormLabel>
              <FormControl>
                <Input
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  {...field}
                  value={field.value || ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="targetAmount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Objectif (€)</FormLabel>
                <FormControl>
                  <Input type="number" min={1} step={1} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="raisedAmount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Montant récolté (€)</FormLabel>
                <FormControl>
                  <Input type="number" min={0} step={1} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit">
          {project ? 'Mettre à jour' : 'Créer le projet'}
        </Button>
      </form>
    </Form>
  )
}
