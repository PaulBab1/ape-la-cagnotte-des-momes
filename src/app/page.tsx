import { ProgressCard } from '@/components/ui/progress-card'
import { prisma } from '@/lib/prisma'
import { Project } from '@/types/project'

async function getProjects(): Promise<Project[]> {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: 'desc' },
    where: { isActive: true }
  })
  
  return projects.map(project => ({
    ...project,
    imageUrl: project.imageUrl ?? undefined,
  }))
}

export default async function Home() {
  const projects = await getProjects()

  return (
    <main className="container mx-auto py-8">
      <h1 className="mb-8 text-4xl font-bold">Projets de l&apos;école</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProgressCard 
            key={project.id}
            project={project} 
            onDonate={() => {
              // TODO: Intégration HelloAsso
              console.log('Donation clicked')
            }} 
          />
        ))}
        {projects.length === 0 && (
          <p className="col-span-full text-center text-muted-foreground">
            Aucun projet actif pour le moment.
          </p>
        )}
      </div>
    </main>
  )
}
