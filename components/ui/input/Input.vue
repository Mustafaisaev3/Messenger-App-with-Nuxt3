<!-- <script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { useVModel } from '@vueuse/core'
import { cn } from '@/lib/utils'

const props = defineProps<{
  defaultValue?: string | number
  modelValue?: string | number
  class?: HTMLAttributes['class']
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
  <input v-model="modelValue" :class="cn('flex h-10 w-full text-white rounded-md border border-[#4a5263] outline-none ring-0 bg-background px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50', props.class ?? '')">
</template> -->

<template>
  <div class="flex items-center">
    <input
      type="text"
      v-model="modelValue"
      @input="updateValue"
      class="w-full bg-gray-800 text-white border border-gray-700 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#ff4f8f] focus:border-transparent"
      :placeholder="placeholder"
      />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
    required: false
  },
});

const emit = defineEmits(['update:modelValue']);

const modelValue = ref(props.modelValue);

const updateValue = (event) => {
  modelValue.value = event.target.value;
  emit('update:modelValue', modelValue.value);
};
</script>