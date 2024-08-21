import prisma from '~/lib/prismadb';
import getCurrentUser from "~/server/actions/getCurrentUser"


export default defineEventHandler(async (event) => {
  const { conversationId } = event.context.params
  const currentUser = await getCurrentUser(event);

  try {

    if (!currentUser?.id) {
        return [];
      }    
  
    const conversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId
      },
      include: {
        users: true,
      },
    });

    console.log(conversationId, conversation, 'some')

    return conversation;
  } catch (error: any) {
    console.log(error, 'SERVER_ERROR')
    return null;
  }
})