'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
import { Project } from '@/types/project'
import Image from 'next/image'
import { Button } from './button'

interface ProgressCardProps {
  project: Project
  className?: string
  onDonate?: () => void
}

export function ProgressCard({ project, className, onDonate }: ProgressCardProps) {
  const progress = (project.raisedAmount / project.targetAmount) * 100

  return (
    <Card className={cn('overflow-hidden', className)}>
      <div className="relative h-48 w-full bg-muted">
        {project.imageUrl && (
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}
      </div>
      <CardHeader>
        <CardTitle>{project.title}</CardTitle>
        <CardDescription>{project.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Progress value={progress} />
          <div className="flex justify-between text-sm">
            <span>{project.raisedAmount}€ récoltés</span>
            <span>Objectif : {project.targetAmount}€</span>
          </div>
          <Button onClick={onDonate} className="w-full">
            Faire un don
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
