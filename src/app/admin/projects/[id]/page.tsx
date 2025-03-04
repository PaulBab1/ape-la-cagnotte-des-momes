import { prisma } from "@/lib/prisma"
import { ProjectForm } from "@/components/projects/project-form"
import { notFound } from "next/navigation"

interface ProjectPageProps {
  params: {
    id: string
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params
  
  const project = await prisma.project.findUnique({
    where: {
      id
    }
  })

  if (!project) {
    notFound()
  }

  return (
    <div className="container max-w-2xl py-8 mx-auto">
      <h1 className="text-2xl font-bold mb-8 text-center">Modifier le projet</h1>
      <ProjectForm project={project} />
    </div>
  )
}
