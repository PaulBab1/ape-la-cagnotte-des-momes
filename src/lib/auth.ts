import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'

// Liste des emails autorisés pour l'accès administrateur
const AUTHORIZED_EMAILS: string[] = [
  // TODO: Ajouter les emails des administrateurs
]

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  callbacks: {
    async signIn({ user }) {
      // Vérifier si l'email est autorisé
      return AUTHORIZED_EMAILS.includes(user.email?.toLowerCase() ?? '')
    },
    async session({ session }) {
      if (session.user) {
        session.user.isAdmin = AUTHORIZED_EMAILS.includes(session.user.email?.toLowerCase() ?? '')
      }
      return session
    },
  },
})
