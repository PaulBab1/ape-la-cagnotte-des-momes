export interface Project {
  id: string
  title: string
  description: string
  imageUrl?: string
  targetAmount: number
  raisedAmount: number
  createdAt: Date
  updatedAt: Date
  isActive: boolean
}

export interface ProjectFormData extends Omit<Project, 'id' | 'createdAt' | 'updatedAt' | 'raisedAmount'> {
  imageFile?: File
}
