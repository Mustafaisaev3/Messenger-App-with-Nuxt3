<template>
  <div class="w-full h-[80px] relative flex justify-between items-center px-4 py-3 bg-[#1b2439] rounded-md transition">
      <div class="flex items-center gap-3">
          <Avatar :user="otherUser" />
          <div>
              <p class="text-md font-medium text-white">
                {{ conversation.name || otherUser.value.name }}
              </p>
              <p class="truncate text-sm text-[#cacaca94]">
                {{  statusText  }}
              </p>
          </div>
      </div>
      <div class="flex items-center gap-4">
          <IconCSS name="mdi:video-outline" class="text-[#ff4f8f] text-[30px] cursor-pointer" />
          <IconCSS name="mdi:phone-outline" class="text-[#ff4f8f] text-[23px] cursor-pointer" />
      </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useOtherUser } from '@/composables/useOtherUser.ts'
import type { FullConversationType } from '@/types'
import Avatar from '~/components/Avatar.vue';

interface HeaderProps {
conversation: FullConversationType
}

const { conversation } = defineProps<HeaderProps>()

const otherUser = computed(() => useOtherUser(conversation))
const isActive = ref(false);

const statusText = computed(() => {
if (conversation.isGroup && conversation.users) {
  return `${conversation.users.length} members`;
}
return isActive.value ? 'Active' : 'Offline';
});
</script>ы