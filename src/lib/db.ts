import { sql } from '@vercel/postgres'
import { User } from '@/types/auth'
import { Project } from '@/types/project'

export async function createTables() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `

    await sql`
      CREATE TABLE IF NOT EXISTS projects (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        image_url VARCHAR(255),
        target_amount INTEGER NOT NULL,
        raised_amount INTEGER DEFAULT 0,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `

    console.log('Tables créées avec succès')
  } catch (error) {
    console.error('Erreur lors de la création des tables:', error)
    throw error
  }
}

export async function getUserByUsername(username: string): Promise<User | null> {
  try {
    const result = await sql<User>`
      SELECT * FROM users WHERE username = ${username}
    `
    return result.rows[0] || null
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'utilisateur:', error)
    throw error
  }
}

export async function createUser(username: string, passwordHash: string): Promise<User> {
  try {
    const result = await sql<User>`
      INSERT INTO users (username, password_hash)
      VALUES (${username}, ${passwordHash})
      RETURNING *
    `
    return result.rows[0]
  } catch (error) {
    console.error('Erreur lors de la création de l\'utilisateur:', error)
    throw error
  }
}

export async function getProjects(): Promise<Project[]> {
  try {
    const result = await sql<Project>`
      SELECT * FROM projects 
      WHERE is_active = true 
      ORDER BY created_at DESC
    `
    return result.rows
  } catch (error) {
    console.error('Erreur lors de la récupération des projets:', error)
    throw error
  }
}

export async function createProject(project: Omit<Project, 'id' | 'createdAt' | 'updatedAt' | 'raisedAmount'>): Promise<Project> {
  try {
    const result = await sql<Project>`
      INSERT INTO projects (title, description, image_url, target_amount)
      VALUES (${project.title}, ${project.description}, ${project.imageUrl}, ${project.targetAmount})
      RETURNING *
    `
    return result.rows[0]
  } catch (error) {
    console.error('Erreur lors de la création du projet:', error)
    throw error
  }
}
