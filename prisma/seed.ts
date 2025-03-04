import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Création de l'utilisateur admin
  const adminPassword = 'APE@SuperSecure2024!'
  const hashedPassword = await bcrypt.hash(adminPassword, 12)
  
  const admin = await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      passwordHash: hashedPassword,
    },
  })

  console.log('Admin créé:', admin)

  // Création d'un projet test
  const project = await prisma.project.upsert({
    where: { id: 'test-project' },
    update: {},
    create: {
      id: 'test-project',
      title: 'Sortie scolaire au Zoo',
      description: 'Financement de la sortie scolaire au zoo pour les classes de CE1 et CE2. Les enfants pourront découvrir les animaux et participer à des ateliers pédagogiques.',
      imageUrl: 'https://images.unsplash.com/photo-1503919005314-c3e766db4b1e?q=80&w=1200',
      targetAmount: 1000,
      raisedAmount: 450,
      isActive: true,
    },
  })

  console.log('Projet test créé:', project)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
