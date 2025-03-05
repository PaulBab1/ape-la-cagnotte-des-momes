import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { authOptions } from '../../auth/[...nextauth]/route'

const updateProjectSchema = z.object({
  title: z.string().min(2).max(100),
  description: z.string().min(10).max(1000),
  imageUrl: z
    .string()
    .refine((url) => url === '' || /^https?:\/\/.+/.test(url), {
      message: "L'URL doit être vide ou commencer par http:// ou https://",
    })
    .optional()
    .nullable(),
  targetAmount: z.number().min(1),
  raisedAmount: z.number().min(0),
  isActive: z.boolean().optional(),
})

export const runtime = 'nodejs'

export async function PUT(
  request: Request,
  { params }: { params: { projectId: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const json = await request.json()
    const body = updateProjectSchema.parse(json)

    const project = await prisma.project.update({
      where: {
        id: params.projectId,
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
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify(error.issues), { status: 422 })
    }

    console.error('Error updating project:', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { projectId: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const { projectId } = params
    const json = await request.json()
    
    // Si c'est juste une mise à jour du statut
    if (Object.keys(json).length === 1 && 'isActive' in json) {
      const body = z.object({
        isActive: z.boolean(),
      }).parse(json)

      const project = await prisma.project.update({
        where: {
          id: projectId,
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
        id: projectId,
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
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify(error.issues), { status: 422 })
    }

    console.error('Error updating project:', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { projectId: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const { projectId } = params
    await prisma.project.delete({
      where: {
        id: projectId,
      },
    })

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error('Error deleting project:', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
