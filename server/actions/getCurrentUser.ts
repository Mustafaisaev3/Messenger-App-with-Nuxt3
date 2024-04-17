import prisma from '~/lib/prismadb';
import { getServerSession } from '#auth'

const getCurrentUser = async (event: any) => {
  try {
    const session = await getServerSession(event)

    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string
      },
    //   include: {
    //     images: true
    //   }
    });

    if (!currentUser) {
      return null;
    }

    return currentUser;
    
  } catch (error: any) {
    return null;
  }
};

export default getCurrentUser;