import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { getProjects } from '@/lib/actions/projects'
import { ProjectsTable } from '@/components/projects/projects-table'
import { AdminHeader } from '@/components/admin/admin-header'

export default async function AdminPage() {
  const session = await auth()

  if (!session) {
    redirect('/admin/login')
  }

  const projects = await getProjects()

  return (
    <div className="min-h-screen flex flex-col">
      <AdminHeader />
      <div className="flex-1 flex flex-col items-center py-8 px-4">
        <div className="w-full max-w-6xl space-y-8">
          <h1 className="text-4xl font-bold">Projets</h1>
          <ProjectsTable projects={projects} />
        </div>
      </div>
    </div>
  )
}
