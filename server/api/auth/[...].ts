// file: ~/server/api/auth/[...].ts
import { NuxtAuthHandler } from '#auth'

import bcrypt from "bcrypt"
import CredentialsProvider from "next-auth/providers/credentials"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from '@prisma/client'
import { AuthOptions } from "next-auth"

const prisma = new PrismaClient();

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    // @ts-ignore
    GithubProvider.default({
        clientId: useRuntimeConfig().githubId,
        clientSecret: useRuntimeConfig().githubSecret
    }),
    // @ts-ignore
    GoogleProvider.default({
        clientId: useRuntimeConfig().googleId,
        clientSecret: useRuntimeConfig().googleSecret
    }),
    // @ts-ignore
    CredentialsProvider.default({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' }
      },
      async authorize(credentials: any) {
        if (!credentials?.email || !credentials?.password) {
            throw createError({
                statusCode: 401,
                statusMessage: 'Invalid Credentials'
            })
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        });

        if (!user || !user?.hashedPassword) {
            throw createError({
                statusCode: 401,
                statusMessage: 'Invalid Credentials'
            })
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isCorrectPassword) {
            throw createError({
                statusCode: 401,
                statusMessage: 'Invalid Credentials'
            })
        }

        return user;
      }
    })
  ],
  debug: process.env.NODE_ENV === 'development',
  pages: {
    signIn: '/'
  },
  session: {
    strategy: "jwt",
  },
  secret: useRuntimeConfig().authSecret,
}

export default NuxtAuthHandler(authOptions)
