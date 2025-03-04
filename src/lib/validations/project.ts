import { z } from 'zod'

export const projectSchema = z.object({
  title: z.string().min(1, 'Le titre est requis'),
  description: z.string().min(1, 'La description est requise'),
  imageUrl: z.string().refine((val) => val === "" || /^https?:\/\/.+/.test(val), {
    message: "L'URL de l'image doit être valide ou vide"
  }),
  targetAmount: z.number().min(0, 'Le montant cible doit être positif'),
  isActive: z.boolean().default(true),
})

export type ProjectCreateInput = z.infer<typeof projectSchema>
