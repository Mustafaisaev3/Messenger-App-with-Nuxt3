<template>
  <div class="w-full h-full flex">
    <ConversationList :initialItems="conversations" />
    <!-- <Conversation /> -->
  </div>
    
</template>

<script setup lang="ts">
import { getAllConversations } from '~/lib/api/conversation'
import ConversationList from '~/components/chat/ConversationList.vue'
// import Conversation from '~/components/chat/Conversation.vue';

const conversations = await getAllConversations()
console.log(conversations, 'conversations')
</script>