import getCurrentUser from "~/server/actions/getCurrentUser";
import prisma from '~/lib/prismadb';
import { storage, ref, uploadBytes, getDownloadURL } from "@/firebase";

interface CreatedFile {
  id: string;
  url: string;
  type: string;
}

export default defineEventHandler(async (event) => {
  try {
    const currentUser = await getCurrentUser(event);
    const formData = await readFormData(event);

    if (!formData) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Data not provided',
      });
    }

    const message = formData.get('message') as string;
    const audioUrl = formData.get('audioUrl') as string;
    const image = formData.get('image') as string;
    const files = formData.getAll('files') as File[];
    const conversationId = formData.get('conversationId') as string;

    if (!currentUser?.id || !currentUser?.email) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Unauthorized',
      });
    }

    if (!conversationId) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Conversation ID is required',
      });
    }

    let createdFiles: CreatedFile[] = [];

    if (files && files.length > 0) {
      const filePromises = files.map(async (file: File) => {
        const storageRef = ref(storage, `files/${file.name}`);
        await uploadBytes(storageRef, file);
        const fileUrl = await getDownloadURL(storageRef);
        const createdFile = await prisma.file.create({
          data: {
            url: fileUrl,
            type: file.type,
          }
        });
        console.log(`Created file: ${createdFile.id}`); // Логирование созданного файла
        return createdFile;
      });

      createdFiles = await Promise.all(filePromises);
    }

    const fileIds = createdFiles.map(file => file.id);

    const newMessage = await prisma.message.create({
      include: {
        seen: true,
        sender: true,
        files: true
      },
      data: {
        body: message,
        image: image,
        audioUrl: audioUrl,
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
        files: {
          connect: fileIds.map(id => ({ id }))
        }
      }
    });

    console.log(`Created message: ${newMessage}`); // Логирование созданного сообщения

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
            seen: true,
            files: true
          }
        }
      }
    });

    return newMessage;

  } catch (error) {
    console.log(error);
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Error',
    });
  }
});