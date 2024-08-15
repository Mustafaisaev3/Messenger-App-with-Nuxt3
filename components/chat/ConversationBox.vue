<template>
    <div 
      class=" w-full relative flex items-center space-x-3 p-3 bg-[#1b2439] rounded-md transition cursor-pointer" 
      @click="handleClick"
    >
        <AvatarGroup v-if="data.isGroup" :users="data.users" />
        <Avatar v-else :user="otherUser" />
        <div class="min-w-0 flex-1">
            <div class="focus:outline-none">
                <!-- <span class="absolute inset-0" aria-hidden="true" /> -->
                <div class="flex justify-between items-center mb-1">
                    <p class="text-sm font-medium text-white">
                     {{ data.name || otherUser.name }}
                    </p>
                </div>
                <div class="flex items-center gap-4">
                    <p class="truncate text-[14px] text-[#cacaca94]">
                      {{ lastMessageText }}
                    </p>
                    <p v-if="lastMessage?.createdAt" class="text-[12px] text-[#686868bb] font-light text-nowrap">
                      {{ format(new Date(lastMessage.createdAt), 'p') }}
                    </p>
                </div>
            </div>
        </div>
        <div class="flex items-center">
          <span class="block rounded-full bg-[#ff4f8f] ring-0ring-white top-0 right-0 h-1 w-1 md:h-2 md:w-2" />
        </div>
    </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { format } from "date-fns";
import type { Conversation, Message, User } from '@prisma/client'
import type { FullConversationType } from '~/types';
import Avatar from '../Avatar.vue';
import AvatarGroup from '../AvatarGroup.vue';

interface ConversationBoxProps {
  data: FullConversationType,
  selected?: boolean;
}

const { data, selected } = defineProps<ConversationBoxProps>()

const { data: sessionData } = useAuth();
const otherUser = useOtherUser(data)
const router = useRouter();

console.log(sessionData, 'current user')


const handleClick = () => {
  router.push(`/conversations/${data.id}`);
};

const lastMessage = computed(() => {
  const messages = data.messages || [];

  return messages[messages.length - 1];
});

const userEmail = computed(() => sessionData.value?.user?.email);

const hasSeen = computed(() => {
  if (!lastMessage) {
    return false;
  }

  const seenArray = lastMessage.seen || [];

  if (!userEmail) {
    return false;
  }

  return seenArray
    .filter((user) => user.email === userEmail).length !== 0;
});

const lastMessageText = computed(() => {
  if (lastMessage?.image) {
    return 'Sent an image';
  }

  if (lastMessage?.body) {
    return lastMessage?.body
  }

  return 'Started a conversation';
});


</script>