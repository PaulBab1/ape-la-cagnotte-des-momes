import { prisma } from '@/lib/prisma'

export async function getProjects() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        _count: {
          select: { donations: true }
        }
      }
    })

    return projects
  } catch (error) {
    console.error('Error fetching projects:', error)
    throw new Error('Failed to fetch projects')
  }
}
