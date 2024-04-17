<template>
    <div 
      class=" w-full relative flex items-center space-x-3 py-3 px-2 bg-[#1b2439] rounded-md transition cursor-pointer"
    >
        <AnimatedPlaceholder 
          height="44px"
          width="44px"
          borderRadius="50%"
        />
        <div class="flex-1">
            <div class="focus:outline-none flex flex-col gap-1 justify-center">
                <AnimatedPlaceholder height="16px" width="100px" borderRadius="20px" />
                <AnimatedPlaceholder height="12px" width="60px" borderRadius="20px" />
            </div>
        </div>
        <div class="flex items-center">
            <AnimatedPlaceholder height="12px" width="10px" borderRadius="5px" />
        </div>
    </div>
</template>
<script setup lang="ts">
import AnimatedPlaceholder from '../shared/AnimatedPlaceholder.vue';


</script>