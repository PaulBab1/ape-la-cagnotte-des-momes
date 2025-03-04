import { z } from 'zod'

export const projectSchema = z.object({
  title: z.string().min(1, 'Le titre est requis'),
  description: z.string().min(1, 'La description est requise'),
  imageUrl: z.string().url('URL invalide').optional(),
  targetAmount: z.number().min(0, 'Le montant cible doit être positif'),
  isActive: z.boolean().default(true),
})

export type ProjectCreateInput = z.infer<typeof projectSchema>
