<template lang="">
  <NuxtScrollbar tag="div" class="flex-1"> 
    <div class="flex-1 overflow-y-auto">
        <MessageBox
          v-for="(message, i) in initialMessages"
          :isLast="i === initialMessages.length - 1"
          :key="message.id"
          :data="message"
        />
        <!-- <MessageBox 
          :isOwn="true"
          key="message.id"
          data="message"
        />
        <MessageBox 
          :isOwn="false"
          key="message.id"
          data="message"
        />
        <MessageBox 
          :isOwn="true"
          key="message.id"
          data="message"
        />
        <MessageBox 
          :isOwn="false"
          key="message.id"
          data="message"
        />
        <MessageBox 
          :isOwn="true"
          key="message.id"
          data="message"
        />
        <MessageBox 
          :isOwn="false"
          key="message.id"
          data="message"
        />
        <MessageBox 
          :isOwn="true"
          key="message.id"
          data="message"
        />
        <MessageBox 
          :isOwn="false"
          key="message.id"
          data="message"
        />
        <MessageBox 
          :isOwn="true"
          key="message.id"
          data="message"
        />
        <MessageBox 
          :isOwn="false"
          key="message.id"
          data="message"
        />
        <MessageBox 
          :isOwn="true"
          key="message.id"
          data="message"
        />
        <MessageBox 
          :isOwn="false"
          key="message.id"
          data="message"
        />
        <MessageBox 
          :isOwn="true"
          key="message.id"
          data="message"
        /> -->
      <div className="pt-24" />
    </div>
  </NuxtScrollbar>
</template>
<script setup lang="ts">
import type { FullMessageType } from '~/types';
import MessageBox from './MessageBox.vue';

interface BodyProps {
  initialMessages: FullMessageType[];
}

// const markAsSeen = () => {
//   axios.post(`/api/conversations/${conversationId.value}/seen`);
// };

const { initialMessages } = defineProps<BodyProps>()
console.log(initialMessages, 'initial messages')
</script>
