import getCurrentUser from "~/server/actions/getCurrentUser"
import prisma from '~/lib/prismadb';

export default defineEventHandler(async (event) => {
  try {
    const currentUser = await getCurrentUser(event)
    const {  
        message,
        image,
        conversationId
    } = await readBody(event);

    if (!currentUser?.id || !currentUser?.email) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Unauthorized',
      })
    }

    const newMessage = await prisma.message.create({
      include: {
        seen: true,
        sender: true
      },
      data: {
        body: message,
        image: image,
        conversation: {
          connect: { id: conversationId }
        },
        sender: {
          connect: { id: currentUser.id }
        },
        seen: {
          connect: {
            id: currentUser.id
          }
        },
      }
    });

    
    const updatedConversation = await prisma.conversation.update({
      where: {
        id: conversationId
      },
      data: {
        lastMessageAt: new Date(),
        messages: {
          connect: {
            id: newMessage.id
          }
        }
      },
      include: {
        users: true,
        messages: {
          include: {
            seen: true
          }
        }
      }
    });

    return newMessage

  } catch (error) {
    console.log(error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Error',
    })
  }
})