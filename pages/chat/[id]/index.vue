<template>
  <div class="w-full h-full flex">
    <ConversationList :initialItems="conversations" />
    <Conversation :conversationId="conversationId" />
  </div>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router'
import { getAllConversations } from '~/lib/api/conversation'
import ConversationList from '@/components/chat/ConversationList.vue'
import Conversation from '@/components/chat/Conversation.vue'

const route = useRoute()

const conversationId = route.params.id as string;

const conversations = await getAllConversations()
</script>
