<template>
  <div class="w-[400px] h-full flex flex-col py-6 px-8 border-r-2 border-[#1b2439] text-[#ffffff] overflow-hidden">
    <div class="w-full h-auto flex items-center justify-between pb-4">
      <h2 class="text-xl font-bold">Chats</h2>
      <div class="w-[25px] h-[25px] flex items-center justify-center rounded-sm bg-[#ff4f907a] hover:bg-[#ff4f8f] transition-all cursor-pointer">+</div>
    </div>
    <Input placeholder="Search here" leftIcon="mdi:magnify"  />
    <NuxtScrollbar tag="aside">
      <ul class="w-full h-auto flex-1 overflow-y-auto mt-4 flex flex-col gap-2">
        <ConversationBox 
          v-for="conversation in initialItems" 
          :key="conversation.id"
          :data="conversation"
          :selected="conversationId === conversation.id"
        />
        
        <!-- <ConversationBox />
        <ConversationBox />
        <ConversationBox />
        <ConversationBox />
        <ConversationBox />
        <ConversationBox />
        <ConversationBox />
        <ConversationBox />
        <ConversationBox />
        <ConversationBox />
        <ConversationBox />
        <ConversationBox />
        <ConversationBox />
        <ConversationBox /> -->
      </ul>
    </NuxtScrollbar>
  </div>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router';
import type { FullConversationType } from '@/types'
import useConversation from '@/composables/useConversation'
import Input from '../Input.vue';
import ConversationBox from './ConversationBox.vue';

interface ConversationListProps {
  initialItems: FullConversationType[]
}

const { initialItems } = defineProps<ConversationListProps>()

const route = useRoute();

const { conversationId, isOpen } = useConversation()

</script>