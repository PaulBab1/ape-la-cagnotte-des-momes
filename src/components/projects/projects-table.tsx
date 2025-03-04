import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Project } from "@prisma/client"
import { formatDate } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { formatEuro } from "@/lib/utils"

interface ProjectsTableProps {
  projects: (Project & {
    _count: {
      donations: number
    }
  })[]
}

export function ProjectsTable({ projects }: ProjectsTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Titre</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Objectif</TableHead>
            <TableHead>Collecté</TableHead>
            <TableHead>Dons</TableHead>
            <TableHead>Créé le</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project) => (
            <TableRow key={project.id}>
              <TableCell className="font-medium">{project.title}</TableCell>
              <TableCell>
                <Badge variant={project.isActive ? "warning" : "secondary"}>
                  {project.isActive ? "Actif" : "Inactif"}
                </Badge>
              </TableCell>
              <TableCell>{formatEuro(project.targetAmount)}</TableCell>
              <TableCell>{formatEuro(project.raisedAmount)}</TableCell>
              <TableCell>{project._count.donations}</TableCell>
              <TableCell>{formatDate(project.createdAt)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
