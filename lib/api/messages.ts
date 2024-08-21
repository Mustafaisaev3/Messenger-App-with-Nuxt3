

// Функция для получения Сообщений конкретного чата
export const getMessages = (conversationId: string) => {
    return $fetch(`/api/messages/${conversationId}`, {
      method: 'get',
    });
  };

// Функция для отправки сообщения
export const sendMessage = (message: string, conversationId: string) => {
    return $fetch(`/api/messages/messages`, {
      method: 'post',
      body: { 
        message,
        conversationId
      }
    });
  };