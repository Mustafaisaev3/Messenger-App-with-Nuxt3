import prisma from '@/lib/prismadb'
import { getServerSession } from '#auth'


export default defineEventHandler(async (event) => {
  const session = await getServerSession(event)
  
  if (!session?.user?.email) {
    return [];
  }

  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      where: {
        NOT: {
          email: session.user.email
        }
      }
    });

    return users;
  } catch (error: any) {
    return [];
  }
})