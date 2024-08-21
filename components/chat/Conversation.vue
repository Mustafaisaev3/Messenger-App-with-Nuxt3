<template>
  <div class="w-full relative">
    <!-- <div class="w-full h-full absolute left-0 top-0 flex flex-col items-center justify-center gap-4 transition z-10">
      <div class="bg-[#ff4f907a] p-5 flex items-center justify-center rounded-full">
          <IconCSS name="mdi:android-messages" class="text-[50px] text-white"/>
      </div>
      <h4 class="text-2xl text-white">Welcome to Chat</h4>
      <Button variant="primary" class="mt-2">Get started</Button>
    </div> -->
    <div class="w-full h-full absolute left-0 top-0 flex flex-col py-6 px-8 transition z-10">
      <Header :conversation="conversation" />
      <Body :initialMessages="messages" />
      <MessageInput :conversationId="conversationId" />
    </div>

    <!-- <div v-if="loading" class="w-full h-full absolute top-0 left-0 flex items-center justify-center bg-[#80808050] z-50">
      Loading
    </div> -->
    <div class="chat-pattern"></div>
  </div>
</template>
<script setup lang="ts">
import Header from './conversation/Header.vue';
import Body from './conversation/Body.vue';
import MessageInput from './conversation/MessageInput.vue';
import { getConversationById } from '~/lib/api/conversation'
import { getMessages } from '~/lib/api/messages'
import Button from '../ui/button/Button.vue';

interface ConversationItemProps {
  conversationId: string,
  loading?: boolean
}

const { conversationId, loading } = defineProps<ConversationItemProps>()
const { data: sessionData } = useAuth()

const conversation = await getConversationById(conversationId)
const messages = await getMessages(conversationId)

console.log(conversation, 'sjsjlalla;la;;a')

</script>

<style scoped>
.chat-pattern:before {
  content: ' ';
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0.5;
  background-image: url('/public/chat-pattern.png');
}
</style>