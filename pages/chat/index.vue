<template>
  <div class="w-full h-full flex">
    <ConversationList :initialItems="conversations" />
    <div className="h-full w-full flex flex-col grow">
      <EmptyChat />
    </div>
  </div>
</template>

<script setup lang="ts">
import { getAllConversations } from '~/lib/api/conversation'
import ConversationList from '~/components/chat/ConversationList.vue'
import Conversation from '~/components/chat/Conversation.vue';
import EmptyChat from '~/components/EmptyChat.vue';


const conversations = await getAllConversations()
</script>