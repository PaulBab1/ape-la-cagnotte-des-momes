"use client"

import { Badge } from "@/components/ui/badge"
import { TableCell, TableRow } from "@/components/ui/table"
import { formatEuro, formatDate } from "@/lib/utils"
import { Project } from "@prisma/client"
import { useRouter } from "next/navigation"
import { ProjectActions } from "./project-actions"

interface ProjectTableRowProps {
  project: Project & {
    _count: {
      donations: number
    }
  }
}

export function ProjectTableRow({ project }: ProjectTableRowProps) {
  const router = useRouter()

  return (
    <TableRow 
      className="cursor-pointer hover:bg-muted/50"
      onClick={() => router.push(`/admin/projects/${project.id}`)}
    >
      <TableCell className="font-medium">{project.title}</TableCell>
      <TableCell>
        <Badge variant={project.isActive ? "success" : "secondary"}>
          {project.isActive ? "Actif" : "Inactif"}
        </Badge>
      </TableCell>
      <TableCell>{formatEuro(project.targetAmount)}</TableCell>
      <TableCell>{formatEuro(project.raisedAmount)}</TableCell>
      <TableCell>{project._count.donations}</TableCell>
      <TableCell>{formatDate(project.createdAt)}</TableCell>
      <TableCell>
        <ProjectActions projectId={project.id} isActive={project.isActive} />
      </TableCell>
    </TableRow>
  )
}
