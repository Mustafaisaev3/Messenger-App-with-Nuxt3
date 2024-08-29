import { computed } from 'vue';
import type { FullConversationType } from "../types";

export const useOtherUser = (conversation: FullConversationType) => {
  const { data } = useAuth()

  console.log(conversation, 'other user con')
  const otherUser = computed(() => {
    const currentUserEmail = data.value?.user?.email;

    if (!conversation.users) {
      console.error('conversation.users is undefined');
      return null;
    }

    const otherUser = conversation.users.filter((user) => user.email !== currentUserEmail);

    return otherUser[0];
  });

  return otherUser;
};