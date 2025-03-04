import { createTables, createUser } from '@/lib/db'
import bcrypt from 'bcrypt'

async function main() {
  // Crée les tables si elles n'existent pas
  await createTables()

  // Crée un utilisateur admin
  const username = 'admin'
  const password = 'changez_moi_123' // À changer après la première connexion
  const passwordHash = await bcrypt.hash(password, 10)

  await createUser(username, passwordHash)
  console.log('Utilisateur admin créé avec succès')
  process.exit(0)
}

main().catch((error) => {
  console.error('Erreur:', error)
  process.exit(1)
})
