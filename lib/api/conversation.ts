

// Функция для создания нового чата
export const createNewConversation = (
  userId: string,
) => {
  return $fetch('/api/conversations/conversations', {
    method: 'POST',
    body: { 
      userId
    },
  });
};

// Функция для получения всех чатов
export const getAllConversations = () => {
  return $fetch('/api/conversations/conversations', {
    method: 'get',
  });
};