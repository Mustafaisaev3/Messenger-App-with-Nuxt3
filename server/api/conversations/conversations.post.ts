import getCurrentUser from "~/server/actions/getCurrentUser"
import prisma from '~/lib/prismadb';

export default defineEventHandler(async (event) => {
  try {
    const currentUser = await getCurrentUser(event)
    const {  
      userId,
    } = await readBody(event);

    if (!currentUser?.id || !currentUser?.email) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Unauthorized',
      })
    }
    const existingConversations = await prisma.conversation.findMany({
      where: {
        OR: [
          {
            userIds: {
              equals: [currentUser.id, userId]
            }
          },
          {
            userIds: {
              equals: [userId, currentUser.id]
            }
          }
        ]
      }
    });

    const singleConversation = existingConversations[0];

    if (singleConversation) {
      return singleConversation;
    }

    const newConversation = await prisma.conversation.create({
      data: {
        users: {
          connect: [
            {
              id: currentUser.id
            },
            {
              id: userId
            }
          ]
        }
      },
      include: {
        users: true
      }
    });


    return newConversation
  } catch (error) {
    throw createError({
        statusCode: 500,
        statusMessage: 'Internal Error',
    })
  }
})


    