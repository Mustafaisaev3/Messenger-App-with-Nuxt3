<template>
    <div class="w-full h-[80px] relative flex justify-between items-center px-4 py-3 bg-[#1b2439] rounded-md transition">
        <div class="flex items-center gap-3">
            <Avatar />
            <div>
                <p class="text-md font-medium text-white">
                  Test User
                </p>
                <p class="truncate text-sm text-[#cacaca94]">
                  Online
                </p>
            </div>
        </div>
        <div class="flex items-center gap-4">
            <IconCSS name="mdi:video-outline" class="text-[#ff4f8f] text-[30px] cursor-pointer" />
            <IconCSS name="mdi:phone-outline" class="text-[#ff4f8f] text-[23px] cursor-pointer" />
        </div>
    </div>
</template>
<script setup lang="ts">
import Avatar from '~/components/Avatar.vue';
</script>