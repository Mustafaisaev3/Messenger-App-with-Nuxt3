<template>
    <div class="w-[400px] h-full flex flex-col py-6 px-8 border-r-2 border-[#1b2439] text-[#ffffff] overflow-hidden">
        <h2 class="pb-2">Conversation List</h2>
        <Input placeholder="Search here" leftIcon="mdi:magnify"  />

        <ul class="w-full h-full flex-1 overflow-y-auto mt-4 flex flex-col gap-2 pr-[10px]">
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
            <ConversationBox />
            <ConversationBox />
            <ConversationBox />
        </ul>

    </div>
</template>
<script setup lang="ts">
import Input from '../Input.vue';
import ConversationBox from './ConversationBox.vue';
</script>