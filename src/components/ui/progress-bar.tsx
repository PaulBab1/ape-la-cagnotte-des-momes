'use client'

import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'

interface ProgressBarProps {
  value: number
  max: number
  currentAmount: number
  targetAmount: number
  className?: string
}

export function ProgressBar({ value, max, currentAmount, targetAmount, className }: ProgressBarProps) {
  const progress = (value / max) * 100
  const isFullyFunded = currentAmount >= targetAmount

  return (
    <div className={cn("space-y-2", className)}>
      <Progress 
        value={progress} 
        className={cn(
          "h-2",
          isFullyFunded ? "bg-green-100 [&>[role=progressbar]]:bg-green-500" : "bg-pink-100 [&>[role=progressbar]]:bg-pink-500"
        )}
      />
      <div className="flex justify-between text-sm">
        <span className={cn(
          "font-medium",
          isFullyFunded ? "text-green-600" : "text-pink-600"
        )}>
          {currentAmount.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
        </span>
        <span className="text-muted-foreground">
          Objectif : {targetAmount.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}
        </span>
      </div>
    </div>
  )
}
