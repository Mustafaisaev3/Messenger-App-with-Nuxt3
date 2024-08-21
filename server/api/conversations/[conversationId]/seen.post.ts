import prisma from '~/lib/prismadb';
import getCurrentUser from "~/server/actions/getCurrentUser"


export default defineEventHandler(async (event) => {
  const { conversationId } = event.context.params
  const currentUser = await getCurrentUser(event);

  try {

    if (!currentUser?.id || !currentUser?.email) {
        throw createError({
          statusCode: 400,
          statusMessage: 'Unauthorized',
        })
      }   

    // Find existing conversation
    const conversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        messages: {
          include: {
            seen: true
          },
        },
        users: true,
      },
    });

    if (!conversation) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid ID',
      })
    }

    // Find last message
    const lastMessage = conversation.messages[conversation.messages.length - 1];

    if (!lastMessage) {
      return conversation;
    }

    // Update seen of last message
    const updatedMessage = await prisma.message.update({
      where: {
        id: lastMessage.id
      },
      include: {
        sender: true,
        seen: true,
      },
      data: {
        seen: {
          connect: {
            id: currentUser.id
          }
        }
      }
    });

    return updatedMessage;
  } catch (error: any) {
    console.log(error, 'SERVER_ERROR')
    return null;
  }
})