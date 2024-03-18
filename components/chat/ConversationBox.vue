<template>
    <div class=" w-full relative flex items-center space-x-3 space-y-2 p-3 bg-[#1b2439] rounded-md transition cursor-pointer">
        <Avatar />
        <div class="min-w-0 flex-1">
            <div class="focus:outline-none">
                <!-- <span class="absolute inset-0" aria-hidden="true" /> -->
                <div class="flex justify-between items-center mb-1">
                    <p class="text-md font-medium text-white">
                    Test User
                    </p>
                </div>
                <div class="flex items-center gap-4">
                    <p class="truncate text-sm text-[#cacaca94]">
                      last Message Text last Message Text last Message Text
                    </p>
                    <p class="text-xs text-[#686868bb] font-light text-nowrap">
                      3:30 pm
                    </p>
                </div>
            </div>
        </div>
        <div class="flex items-center">
            <span class="block rounded-full bg-green-400 ring-0ring-white top-0 right-0 h-1 w-1 md:h-2 md:w-2" />
        </div>
    </div>
</template>
<script setup lang="ts">
import Avatar from '../Avatar.vue';
</script>