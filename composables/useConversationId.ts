import { useRoute } from 'vue-router';

export function useConversationId() {
  const route = useRoute();
  const conversationId = route.params.id;

  return {
    conversationId
  };
}