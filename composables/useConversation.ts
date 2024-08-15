import { useRoute } from 'vue-router';
import { computed } from 'vue';

const useConversation = () => {
  const route = useRoute();

  const conversationId = computed(() => {
    if (!route.params.conversationId) {
      return '';
    }

    return route.params.conversationId as string;
  });

  const isOpen = computed(() => !!conversationId.value);

  return {
    isOpen,
    conversationId
  };
};

export default useConversation;