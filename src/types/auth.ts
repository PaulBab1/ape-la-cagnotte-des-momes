export interface User {
  id: number
  username: string
  password_hash: string
  created_at: Date
}

export interface Session {
  user: {
    id: number
    username: string
  }
}
