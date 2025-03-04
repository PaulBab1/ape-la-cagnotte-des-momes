'use client'

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
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
      <div className="relative aspect-video bg-slate-200">
        {project.imageUrl ? (
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-slate-200">
            <svg
              className="w-12 h-12 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}
      </div>
      <CardHeader>
        <CardTitle>{project.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
        <div className="space-y-4">
          <Progress value={progress} />
          <div className="flex justify-between text-sm">
            <span>{project.raisedAmount}€ récoltés</span>
            <span>Objectif : {project.targetAmount}€</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={onDonate} className="w-full">
          Faire un don
        </Button>
      </CardFooter>
    </Card>
  )
}
