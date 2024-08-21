import prisma from '~/lib/prismadb';
import { User } from '@prisma/client';

const getConversationById = async (
  conversationId: string,
  currentUserEmail?: string | null | undefined
) => {
  try {

    if (!currentUserEmail) {
      return null;
    }
  
    const conversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId
      },
      include: {
        users: true,
      },
    });

    console.log(conversationId, currentUserEmail, conversation, 'some')

    return conversation;
  } catch (error: any) {
    console.log(error, 'SERVER_ERROR')
    return null;
  }
};

export default getConversationById;