<template>
    <NuxtLink 
      :key="item.label"
      :href="item.path"
      class="w-12 h-12"
    >
      <TooltipProvider :delay-duration="100">
        <Tooltip>
            <TooltipTrigger as-child>
                <div 
                  class="aa w-12 h-12 flex flex-col items-center rounded-md hover:bg-[#ff4f8f] cursor-pointer py-2"
                  :class="{
                    'bg-[#ff4f8f]': currentRoute.path.includes(item.path!),
                  }"
                >
                    <IconCSS 
                      :name="item.icon" 
                      class="text-[30px]" 
                      :style="{color: currentRoute.path.includes(item.path!) ? '#f1f1f1' : '#f1f1f1'}"
                    />
                </div>
            </TooltipTrigger>
            <TooltipContent side="right" class="ml-2 p-2 py-0">
                <p class="text-[12px]">{{ item.label }}</p>
            </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </NuxtLink>
</template>
<script setup lang="ts">
import type { PropType } from 'vue'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip'
import { useRoute } from 'vue-router'

interface ItemProps {
  icon: string;
  label: string;
  path?: string;
}

const currentRoute = useRoute();

const { item } = defineProps({
    item: {
        type: Object as PropType<ItemProps>,
        required: true
    }
})
</script>

<style>
.aa {
  background: rgb(255,139,181);
  background: linear-gradient(90deg, rgba(255,139,181,1) 0%, rgba(255,99,156,1) 35%, rgba(255,79,143,1) 100%);;
}
</style>