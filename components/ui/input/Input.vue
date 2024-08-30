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