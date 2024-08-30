<template>
  <div class="w-full h-full relative grow">
    <div class="w-full h-full absolute left-0 top-0 flex flex-col items-center justify-center gap-4 transition z-10">
      <div class="bg-[#ff4f907a] p-5 flex items-center justify-center rounded-full">
          <IconCSS name="mdi:android-messages" class="text-[50px] text-white"/>
      </div>
      <h4 class="text-2xl text-white">Welcome to Chat</h4>
      <Button variant="primary" class="mt-2">Get started</Button>
    </div>
    <div class="chat-pattern"></div>
  </div>
</template>

<script setup lang="ts">
import Button from './ui/button/Button.vue';

</script>