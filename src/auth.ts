import NextAuth, { 
  type DefaultSession,
  type User as NextAuthUser
} from 'next-auth'
import type { JWT } from 'next-auth/jwt'
import CredentialsProvider from 'next-auth/providers/credentials'
import * as bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { z } from 'zod';

const CredentialsSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(8)
});

interface User extends NextAuthUser {
  username: string;
}

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      username: string;
      isAdmin: boolean;
    } & DefaultSession['user']
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    username?: string;
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24 * 7, // 7 jours
  },
  pages: {
    signIn: '/admin/login',
  },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: { label: "Nom d'utilisateur", type: 'text' },
        password: { label: 'Mot de passe', type: 'password' },
      },
      async authorize(
        credentials: Partial<Record<"username" | "password", unknown>>,
        request: Request
      ): Promise<User | null> {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        const result = CredentialsSchema.safeParse({
          username: credentials.username,
          password: credentials.password
        });

        if (!result.success) return null;

        const { username, password } = result.data;

        const user = await prisma.user.findUnique({
          where: { username },
        });

        if (!user) {
          return null;
        }

        const isPasswordValid = await bcrypt.compare(
          password,
          user.passwordHash
        );

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id,
          username: user.username,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.username = (user as User).username;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.username) {
        session.user.username = token.username;
      }
      return session;
    },
  },
})
