

interface ISendMessage {
  message?: string,
  audioUrl?: string,
  files?: File[],
  conversationId: string
}

// Функция для получения Сообщений конкретного чата
export const getMessages = (conversationId: string) => {
    return $fetch(`/api/messages/${conversationId}`, {
      method: 'get',
    });
  };


// Функция для отправки Сообщения
export const sendMessage = async ({ message, audioUrl, files, conversationId }: ISendMessage) => {
  if (!conversationId) {
    throw new Error('Conversation ID is required');
  }

  if (!message && !audioUrl && (!files || files.length === 0)) {
    throw new Error('At least one of message, audioUrl, or files is required');
  }

  const formData = new FormData();

  console.log('message:', message);
  console.log('audioUrl:', audioUrl);
  console.log('files:', files);
  console.log('conversationId:', conversationId);

  if (message) {
    formData.append('message', message);
  }

  if (audioUrl) {
    formData.append('audioUrl', audioUrl);
  }

  if (files && files.length > 0) {
    files.forEach(file => {
      formData.append('files', file, encodeURIComponent(file.name)); // Кодирование имени файла
    });
  }

  formData.append('conversationId', conversationId);

  // Вывод FormData для отладки
  formData.forEach((value, key) => {
    console.log(`${key}: ${value}`);
  });

  return $fetch(`/api/messages/messages`, {
    method: 'post',
    body: formData
  });
};