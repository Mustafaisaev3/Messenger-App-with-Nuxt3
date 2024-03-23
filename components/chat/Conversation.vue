<template>
    <div class="w-full relative flex flex-col py-6 px-8 transition">
        <Header />
        <Body />
        <MessageInput />
    </div>
</template>
<script setup lang="ts">
import Header from './conversation/Header.vue';
import Body from './conversation/Body.vue';
import MessageInput from './conversation/MessageInput.vue';
</script>