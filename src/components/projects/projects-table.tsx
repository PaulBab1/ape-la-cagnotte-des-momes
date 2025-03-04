import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Project } from "@prisma/client"
import Link from "next/link"
import { ProjectTableRow } from "./project-table-row"

interface ProjectsTableProps {
  projects: (Project & {
    _count: {
      donations: number
    }
  })[]
}

export function ProjectsTable({ projects }: ProjectsTableProps) {
  return (
    <div className="space-y-6">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Titre</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Objectif</TableHead>
            <TableHead>Collecté</TableHead>
            <TableHead>Dons</TableHead>
            <TableHead>Créé le</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project) => (
            <ProjectTableRow key={project.id} project={project} />
          ))}
        </TableBody>
      </Table>
      
      <div className="flex justify-center">
        <Button asChild>
          <Link href="/admin/projects/new">Créer un nouveau projet</Link>
        </Button>
      </div>
    </div>
  )
}
