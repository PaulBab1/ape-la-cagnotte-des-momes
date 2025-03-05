import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { authOptions } from '../auth/[...nextauth]/route'

const projectSchema = z.object({
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
  isActive: z.boolean().default(true),
})

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const json = await request.json()
    const body = projectSchema.parse(json)

    const project = await prisma.project.create({
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

    console.error('Error creating project:', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(projects)
  } catch (error) {
    console.error('Error fetching projects:', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
