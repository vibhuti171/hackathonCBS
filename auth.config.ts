import { NextAuthConfig, DefaultSession } from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { prisma } from './prisma';
import { compare } from 'bcryptjs';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      firstName: string;
      lastName: string;
      image: string;
    } & DefaultSession['user'];
  }
}

const authConfig = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? '',
      clientSecret: process.env.GOOGLE_SECRET ?? ''
    }),
    CredentialProvider({
      credentials: {
        email: {
          type: 'email'
        },
        password: {
          type: 'password'
        }
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email as string
          }
        });

        if (!user || !user.password) {
          return null;
        }

        const isPasswordValid = await compare(credentials.password as string, user.password as string);

        if (isPasswordValid) {
          return {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            image: user.image
          };
        }
        return null;
      }
    })
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          // Split the name into firstName and lastName
          const nameParts = (user.name || '').split(' ');
          const firstName = nameParts[0];
          const lastName = nameParts.slice(1).join(' ');

          // Use upsert to create or update the user
          await prisma.user.upsert({
            where: { 
              email: user.email || '' 
            },
            update: {
              firstName,
              lastName,
              image: user.image || '',
              googleId: user.id
            },
            create: {
              email: user.email || '',
              firstName,
              lastName,
              image: user.image || '',
              googleId: user.id
            }
          });
        } catch (error) {
          console.error("Error during Google sign in:", error);
          return false;
        }
      }
      return true;
    },
    async session({ session, token }) {
      if (session.user) {
        const user = await prisma.user.findUnique({
          where: { email: session.user.email || '' }
        });
        
        if (user) {
          session.user.id = user.id;
          session.user.firstName = user.firstName;
        }
      }
      return session;
    },
    async jwt({ token, user, account }) { 
      if (user) {
        token.id = user.id;
      }
      return token;
    }
  },
  pages: {
    signIn: '/'
  },
  secret: process.env.AUTH_SECRET
} satisfies NextAuthConfig;

export default authConfig;