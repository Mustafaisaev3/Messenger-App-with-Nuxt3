<template>
  <div class="w-full h-full flex">
    <ConversationList />
    <Conversation />
  </div>
    
</template>

<script setup lang="ts">
import ConversationList from '~/components/chat/ConversationList.vue'
import Conversation from '~/components/chat/Conversation.vue';
</script>