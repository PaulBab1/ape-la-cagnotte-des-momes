'use client'

import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Project } from '@/types/project'
import Image from 'next/image'
import { convertGoogleDriveUrl } from '@/lib/utils'
import { ProgressBar } from '@/components/ui/progress-bar'
import { Button } from '@/components/ui/button'

interface ProjectDialogProps {
  project: Project
  open: boolean
  onOpenChange: (open: boolean) => void
  onDonate?: () => void
}

export function ProjectDialog({ project, open, onOpenChange, onDonate }: ProjectDialogProps) {
  const imageUrl = convertGoogleDriveUrl(project.imageUrl || '')
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl p-0 overflow-hidden">
        <div className="bg-gradient-to-r from-pink-800/80 via-pink-700/50 to-pink-600/30 px-4 py-3">
          <h2 className="text-3xl font-bold text-white drop-shadow-lg [text-shadow:_0_1px_3px_rgb(0_0_0_/_50%)]">
            {project.title}
          </h2>
        </div>
        
        <div className="relative aspect-video">
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 1200px) 100vw, 75vw"
            />
          )}
        </div>

        <div className="p-6 space-y-6">
          <p className="text-base">{project.description}</p>

          <div className="space-y-3">
            <ProgressBar 
              value={project.raisedAmount}
              max={project.targetAmount}
              currentAmount={project.raisedAmount}
              targetAmount={project.targetAmount}
            />

            <Button 
              onClick={onDonate} 
              variant="vibrant"
              size="lg"
              className="w-full"
            >
              Faire un don
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
