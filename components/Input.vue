<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { useVModel } from '@vueuse/core'
import { cn } from '@/lib/utils'

const props = defineProps<{
  defaultValue?: string | number
  modelValue?: string | number
  class?: HTMLAttributes['class'],
  placeholder?: string,
  leftIcon?: string,
  rightIcon?: string,
  error?: boolean
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', payload: string | number): void
}>()

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue,
})
</script>

<template>
    <div 
      class="input-container h-10 flex items-center bg-[#202a41] border border-[#727272] rounded-sm px-2 py-2 focus-within:border-[#ff4f906c]"
      :class="{
        'border-red-500': error,
        // 'border-[#42d392]': !error
      }"
    >
        <IconCSS v-if="leftIcon" :name="leftIcon" class="left-icon text-[26px] text-[[#727272]]"/>
        <input 
          v-model="modelValue" 
          :placeholder="placeholder" 
          :class="cn(
            'w-full px-2 bg-transparent placeholder:text-[[#727272]] border-[#444444] focus:border-1 text-white outline-none', 
            props.class ?? ''
          )"
        >
        <IconCSS v-if="rightIcon" :name="rightIcon" class="right-icon text-[26px] text-[[#727272]]"/>
    </div>
</template>

<style scoped>
.left-icon:has(+ input:focus) {
  color: white;
}

input:focus + .right-icon {
  color: white;
}

</style>