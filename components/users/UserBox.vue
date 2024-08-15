<template>
    <div 
      class=" w-full relative flex items-center space-x-3 py-3 px-2 bg-[#1b2439] rounded-md transition cursor-pointer"
      @click="handleUserClick"
    >
        <Avatar />
        <div class="flex-1">
            <div class="focus:outline-none flex flex-col justify-center">
                <div class="flex justify-between items-center">
                    <p class="text-sm font-medium text-white leading-none">
                      {{  user?.name  }}
                    </p>
                </div>
                <div class="flex items-center gap-4">
                    <p class="truncate text-[10px] text-[#cacaca94]">
                      Online: 3:30 pm
                    </p>
                </div>
            </div>
        </div>
        <div class="flex items-center">
            <IconCSS name="mdi:dots-vertical" class="text-lg hover:text-[#ff4f8f]" />
            <!-- <span class="block rounded-full bg-[#ff4f8f] ring-0ring-white top-0 right-0 h-1 w-1 md:h-2 md:w-2" /> -->
        </div>
    </div>
</template>
<script setup lang="ts">
import { toast } from 'vue3-toastify';
import Avatar from '../Avatar.vue';
import { ConversationExistingType, type SafeUser } from '~/types';
import { beginConversation } from '~/lib/api/conversation'

const loading = ref(false)

interface UserBoxProps {
  user: SafeUser | null
}

const { user } = defineProps<UserBoxProps>()

const handleUserClick = async () => {
  const { existType, conversation } = await beginConversation(user!.id)  

  if (existType == ConversationExistingType.NEW) {
    toast.success('Новый чат!', {
      position: toast.POSITION.TOP_CENTER,
      theme: 'dark'
    })
  } else if (existType == ConversationExistingType.EXISTED) {
    toast.success('Существующий чат!', {
      position: toast.POSITION.TOP_CENTER,
      theme: 'dark'
    })
  }
} 


</script>