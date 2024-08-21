import prisma from '~/lib/prismadb';

const getConversations = async (
  currentUserEmail?: string | null | undefined
) => {
  try {

    const currentUser = await prisma.user.findUnique({
        where: {
          email: currentUserEmail as string
        }
      });

    if (!currentUser) {
      return null;
    }
  
    const conversations = await prisma.conversation.findMany({
      orderBy: {
        lastMessageAt: 'desc',
      },
      where: {
        userIds: {
          has: currentUser.id
        }
      },
      include: {
        users: true,
        messages: {
          include: {
            sender: true,
            seen: true,
          }
        },
      }
    });
  
    return conversations;
  } catch (error: any) {
    console.log(error, 'SERVER_ERROR')
    return [];
  }
};

export default getConversations;