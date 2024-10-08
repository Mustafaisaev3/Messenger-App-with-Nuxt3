import type { FullConversationType } from '@/types'

// Функция для создания нового чата
export const beginConversation = (
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
  return $fetch<FullConversationType[]>('/api/conversations/conversations', {
    method: 'get',
  });
};

// Функция для конкретного чата по ID
export const getConversationById = (conversationId: string) => {
  return $fetch<FullConversationType>(`/api/conversations/${conversationId}`, {
    method: 'get',
  });
};