import getCurrentUser from "~/server/actions/getCurrentUser"
import prisma from '~/lib/prismadb';
import { ConversationExistingType } from "~/types";

export default defineEventHandler(async (event) => {
  try {
    const currentUser = await getCurrentUser(event)
    const {  
      userId,
      isGroup, 
      members,
      name
    } = await readBody(event);

    if (!currentUser?.id || !currentUser?.email) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Unauthorized',
      })
    }

    if (isGroup && (!members || members.length < 2 || !name)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid data',
      })
    }

    if (isGroup) {
      const newConversation = await prisma.conversation.create({
        data: {
          name,
          isGroup,
          users: {
            connect: [
              ...members.map((member: { value: string }) => ({
                id: member.value
              })),
              {
                id: currentUser.id
              }
            ]
          }
        },
        include: {
          users: true
        }
      })

      return {
        existType: ConversationExistingType.NEW,
        conversation: newConversation
      };
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
      return {
        existType: ConversationExistingType.EXISTED,
        conversation: singleConversation
      };
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


    return {
      existType: ConversationExistingType.NEW,
      conversation: newConversation
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Error',
    })
  }
})


    