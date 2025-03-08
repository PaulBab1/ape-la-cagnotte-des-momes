'use client'

import { Project } from '@/types/project'
import { ProgressCard } from './ui/progress-card'

interface ProjectCardWrapperProps {
  project: Project
  className?: string
}

export function ProjectCardWrapper({ project, className }: ProjectCardWrapperProps) {
  return (
    <ProgressCard 
      project={project}
      className={className}
      onDonate={() => {
        // TODO: Intégration HelloAsso
        console.log('Donation clicked', project.id)
      }}
    />
  )
}
