'use client'

import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Project } from '@/types/project'
import Image from 'next/image'
import { Button } from './button'
import { ProgressBar } from './progress-bar'
import { Badge } from './badge'
import { PartyPopper } from 'lucide-react'
import { cn, convertGoogleDriveUrl } from '@/lib/utils'

interface ProgressCardProps {
  project: Project
  className?: string
  onDonate?: () => void
}

export function ProgressCard({ project, className, onDonate }: ProgressCardProps) {
  const progress = (project.raisedAmount / project.targetAmount) * 100
  const imageUrl = convertGoogleDriveUrl(project.imageUrl || '')
  const isFullyFunded = project.raisedAmount >= project.targetAmount

  return (
    <Card className={cn('overflow-hidden flex flex-col [box-shadow:4px_4px_10px_rgba(0,0,0,0.1)] p-0', className)}>
      <div className="bg-gradient-to-r from-pink-800/80 via-pink-700/50 to-pink-600/30 px-3 py-2">
        <h3 className="text-2xl font-bold text-white drop-shadow-lg line-clamp-2 [text-shadow:_0_1px_3px_rgb(0_0_0_/_50%)]">
          {project.title}
        </h3>
      </div>
      <div className="relative aspect-video bg-slate-200">
        {imageUrl ? (
          <Image
            src={imageUrl}
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
      <CardContent className="flex flex-col gap-4 flex-1 p-4">
        <div className="min-h-[4.5rem]">
          <p className="text-sm text-muted-foreground line-clamp-3">{project.description}</p>
        </div>
        
        {isFullyFunded ? (
          <div className="flex flex-col items-center gap-2 py-2">
            <Badge className="bg-green-500 hover:bg-green-600 text-white gap-2 px-4 py-2 text-base">
              <PartyPopper className="w-5 h-5 -scale-x-100" />
              Projet financé !
              <PartyPopper className="w-5 h-5" />
            </Badge>
            <p className="text-sm text-green-600 font-medium">
              {project.targetAmount.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })} récoltés
            </p>
          </div>
        ) : (
          <ProgressBar 
            value={project.raisedAmount}
            max={project.targetAmount}
            currentAmount={project.raisedAmount}
            targetAmount={project.targetAmount}
          />
        )}
      </CardContent>
      
      {!isFullyFunded && (
        <CardFooter className="p-4">
          <Button 
            onClick={onDonate} 
            variant="vibrant"
            className="w-full"
          >
            Faire un don
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}
