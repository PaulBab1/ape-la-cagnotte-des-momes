import { prisma } from '@/lib/prisma'
import { auth } from '@/auth'
import { NextRequest, NextResponse } from 'next/server'
import * as z from 'zod'

const updateProjectSchema = z.object({
  title: z.string(),
  description: z.string(),
  imageUrl: z.string().nullable(),
  targetAmount: z.number(),
  raisedAmount: z.number(),
  isActive: z.boolean(),
})

interface RouteParams {
  params: { id: string }
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  const { id } = params
  
  try {
    const project = await prisma.project.findUnique({
      where: { id },
      include: { donations: true }
    })

    if (!project) {
      return NextResponse.json(
        { error: 'Projet non trouvé' },
        { status: 404 }
      )
    }

    return NextResponse.json(project)
  } catch (error) {
    console.error('Error fetching project:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération du projet' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth()
  if (!session) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  try {
    const body = await request.json()
    const validatedData = updateProjectSchema.parse(body)
    const { id } = params

    const project = await prisma.project.update({
      where: { id },
      data: {
        title: validatedData.title,
        description: validatedData.description,
        imageUrl: validatedData.imageUrl || null,
        targetAmount: validatedData.targetAmount,
        raisedAmount: validatedData.raisedAmount,
        isActive: validatedData.isActive,
      },
    })

    return NextResponse.json(project)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues },
        { status: 422 }
      )
    }

    console.error('Error updating project:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la modification du projet' },
      { status: 500 }
    )
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth()
  if (!session) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  const { id } = params
  const json = await request.json()
  
  // Si c'est juste une mise à jour du statut
  if (Object.keys(json).length === 1 && 'isActive' in json) {
    const body = z.object({
      isActive: z.boolean(),
    }).parse(json)

    const project = await prisma.project.update({
      where: {
        id,
      },
      data: {
        isActive: body.isActive,
      },
    })

    return NextResponse.json(project)
  }
  
  // Sinon c'est une mise à jour complète
  const body = updateProjectSchema.parse(json)

  const project = await prisma.project.update({
    where: {
      id,
    },
    data: {
      title: body.title,
      description: body.description,
      imageUrl: body.imageUrl || null,
      targetAmount: body.targetAmount,
      raisedAmount: body.raisedAmount,
      isActive: body.isActive,
    },
  })

  return NextResponse.json(project)
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth()
  if (!session) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  const { id } = params

  try {
    await prisma.project.delete({
      where: { id },
    })

    return NextResponse.json(null, { status: 204 })
  } catch (error) {
    console.error('Error deleting project:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la suppression du projet' },
      { status: 500 }
    )
  }
}
