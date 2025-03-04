'use client'

import { Project } from '@/types/project'
import { ProgressCard } from './ui/progress-card'

interface ProjectCardWrapperProps {
  project: Project
}

export function ProjectCardWrapper({ project }: ProjectCardWrapperProps) {
  return (
    <ProgressCard 
      project={project} 
      onDonate={() => {
        // TODO: Intégration HelloAsso
        console.log('Donation clicked', project.id)
      }} 
    />
  )
}
