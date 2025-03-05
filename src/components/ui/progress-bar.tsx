'use client'

import { cn } from "@/lib/utils"

function getProgressColor(percentage: number) {
  if (percentage < 25) return 'bg-slate-500'
  if (percentage < 50) return 'bg-lime-500'
  if (percentage < 75) return 'bg-lime-400'
  return 'bg-lime-300'
}

interface ProgressBarProps {
  value: number
  max: number
  currentAmount: number
  targetAmount: number
  className?: string
}

export function ProgressBar({ value, max, currentAmount, targetAmount, className }: ProgressBarProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)
  const progressColor = getProgressColor(percentage)

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center text-sm">
        <div className="font-medium text-muted-foreground">{currentAmount}€</div>
        <div className="font-bold">{targetAmount}€</div>
      </div>

      <div className="h-3 w-full bg-slate-100 rounded-full">
        <div
          className={cn("h-full rounded-full transition-all duration-300 relative", progressColor)}
          style={{ width: `${percentage}%` }}
        >
          <div 
            className={cn("absolute -top-1 right-0 w-5 h-5 rounded-full transform translate-x-1/2 border-2 border-white shadow-md", progressColor)}
          />
        </div>
      </div>
    </div>
  )
}
