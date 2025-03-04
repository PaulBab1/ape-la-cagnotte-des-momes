import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Création de l'utilisateur admin
  const adminPassword = 'APE@SuperSecure2024!'
  const hashedPassword = await bcrypt.hash(adminPassword, 10)
  
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
      title: 'Sortie au Zoo de Beauval',
      description: 'Aidez-nous à financer la sortie scolaire au Zoo de Beauval pour les classes de CE1 et CE2.',
      targetAmount: 1500,
      raisedAmount: 0,
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
