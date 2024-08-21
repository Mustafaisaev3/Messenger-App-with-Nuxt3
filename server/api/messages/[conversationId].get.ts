import prisma from '~/lib/prismadb';
import getCurrentUser from "~/server/actions/getCurrentUser"


export default defineEventHandler(async (event) => {
  const { conversationId } = event.context.params
  const currentUser = await getCurrentUser(event);
  
  if (!currentUser?.id) {
    return [];
  }

  try {
    const messages = await prisma.message.findMany({
      where: {
        conversationId: conversationId
      },
      include: {
        sender: true,
        seen: true,
      },
      orderBy: {
        createdAt: 'asc'
      }
    });

    return messages;

  } catch (error: any) {
    return [];
  }
})
