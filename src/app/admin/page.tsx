import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { getProjects } from '@/lib/actions/projects'
import { ProjectsTable } from '@/components/projects/projects-table'

export default async function AdminPage() {
  const session = await auth()

  if (!session) {
    redirect('/admin/login')
  }

  const projects = await getProjects()

  return (
    <div className="min-h-screen flex flex-col items-center py-8 px-4">
      <div className="w-full max-w-6xl space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold">Projets</h1>
          <p className="text-muted-foreground">
            Connecté en tant que {session.user?.username}
          </p>
        </div>

        <ProjectsTable projects={projects} />
      </div>
    </div>
  )
}
