import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from './prisma';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Email Demo Login',
      credentials: {
        email: { label: "Email", type: "email", placeholder: "student@example.com" },
        name: { label: "Name", type: "text", placeholder: "John Doe" }
      },
      async authorize(credentials) {
        if (!credentials?.email) return null;
        
        // Find or create user
        let user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });
        
        if (!user) {
          user = await prisma.user.create({
            data: {
              email: credentials.email,
              name: credentials.name || credentials.email.split('@')[0],
              role: credentials.email === 'rakeshraut.dev@gmail.com' ? 'ADMIN' : 'USER'
            }
          });
        }
        
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        };
      }
    })
  ],
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.sub;
      }
      return session;
    }
  },
  pages: {
    signIn: '/auth/signin',
  },
  session: {
    strategy: 'jwt'
  }
};
