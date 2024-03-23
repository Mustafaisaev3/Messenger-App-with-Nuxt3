<template>
    <div class="w-full h-[60px] relative flex justify-between gap-2 items-center px-4 py-3 bg-[#1b2439] rounded-md transition">
      <Dropup />
      <input
        placeholder="Type a message..."
        class="
          font-light
          py-2
          px-4 bg-transparent
          text-white
          w-full 
          focus:outline-none
        "
        v-model="inputText"
      />
      <NuxtEmoji @on-select="handleEmojiSelect">
        <template v-slot:button>
          <IconCSS name="mdi:emoticon-happy-outline" class="text-[gray] text-2xl"/>
        </template>
      </NuxtEmoji>
      <button class="bg-[#ff4f8f] w-[40px] h-[40px] flex items-center justify-center rounded-sm ml-2">
        <IconCSS name="mdi:send-outline" class="text-white text-xl"/>
      </button>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import Dropup from './Dropup'

let inputText = ref('')

const handleEmojiSelect = (emoji: string) => {
  console.log(inputText.value += emoji)
}
</script>
