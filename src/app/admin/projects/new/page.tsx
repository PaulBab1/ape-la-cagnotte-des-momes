import { ProjectForm } from "@/components/projects/project-form"

export default function NewProjectPage() {
  return (
    <div className="container max-w-2xl py-8 mx-auto">
      <h1 className="text-2xl font-bold mb-8 text-center">Créer un nouveau projet</h1>
      <ProjectForm />
    </div>
  )
}
