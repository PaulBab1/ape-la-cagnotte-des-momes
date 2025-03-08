import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(date)
}

export function formatEuro(amount: number) {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR'
  }).format(amount)
}

/**
 * Convertit une URL de partage Google Drive en URL d'image directe
 * @param url URL de partage Google Drive (ex: https://drive.google.com/file/d/ID/view?usp=sharing)
 * @returns URL d'image directe (ex: https://drive.google.com/uc?id=ID)
 */
export function convertGoogleDriveUrl(url: string): string {
  if (!url) return ''
  
  try {
    // Si c'est déjà une URL uc, on la retourne telle quelle
    if (url.includes('/uc?')) return url
    
    // Extrait l'ID du fichier de l'URL
    const match = url.match(/\/file\/d\/([^/]+)/)
    if (!match) return url
    
    const fileId = match[1]
    return `https://drive.google.com/uc?id=${fileId}`
  } catch {
    return url
  }
}
