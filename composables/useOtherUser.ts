import { computed } from 'vue';
import type { FullConversationType } from "../types";


export const useOtherUser = (conversation: FullConversationType) => {
  const { data } = useAuth()

  const otherUser = computed(() => {
    const currentUserEmail = data.value?.user?.email;

    const otherUser = conversation.users.filter((user) => user.email !== currentUserEmail);

    return otherUser[0];
  });

  return otherUser;
};