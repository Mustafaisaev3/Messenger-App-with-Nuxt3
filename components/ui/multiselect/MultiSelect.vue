<template>
  <div class="relative">
    <div
      class="relative w-full cursor-default bg-gray-800 text-white border border-gray-700 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#ff4f8f] focus:border-transparent"
      @click="toggleDropdown"
    >
      <div class="flex items-center justify-between">
        <div class="flex flex-wrap items-center gap-1">
          <span
            v-if="selectedOptions.length === 0"
            class="text-gray-400"
          >
           {{ label || 'Select options' }}
          </span>
          <span
            v-for="option in selectedOptions"
            :key="option.value"
            class="inline-flex items-center rounded-full bg-gray-700 px-2 py-1 text-xs font-medium text-white"
          >
            {{ option.label }}
            <button
              type="button"
              class="ml-1 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full text-gray-400 hover:bg-gray-600 hover:text-gray-300 focus:outline-none focus:bg-gray-600 focus:text-gray-300"
              @click.stop="removeOption(option)"
            >
              <span class="sr-only">Remove</span>
              <svg class="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                <path stroke-linecap="round" stroke-width="1.5" d="M1 1l6 6m0-6L1 7" />
              </svg>
            </button>
          </span>
        </div>
        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <IconCSS :name="iconName" class="text-[#ff4f8f] cursor-pointer transition-transform duration-300" :class="{ 'rotate-0': isOpen }" />
        </div>
      </div>
      <div v-if="isOpen" class="absolute left-0 z-10 mt-2 w-full rounded-md bg-gray-800 shadow-lg">
        <ul class="max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
          <li
            v-for="option in props.options"
            :key="option.value"
            class="cursor-pointer select-none relative py-2 pl-10 pr-4 hover:bg-gray-700"
            @click="selectOption(option)"
          >
            <div class="flex items-center">
              <input
                :id="option.value"
                type="checkbox"
                class="h-4 w-4 rounded border-gray-600 text-indigo-600 focus:ring-indigo-500"
                :checked="isSelected(option)"
              />
              <label :for="option.value" class="ml-3 block truncate text-white">{{ option.label }}</label>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';

interface Option {
  value: string;
  label: string;
}

const props = defineProps<{
  options: Option[];
  label: string;
}>();

const selectedOptions = ref<Option[]>([]);
const isOpen = ref(false);

const iconName = computed(() => (isOpen.value ? 'mdi:chevron-up' : 'mdi:chevron-down'));

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const selectOption = (option: Option) => {
  if (isSelected(option)) {
    removeOption(option);
  } else {
    selectedOptions.value.push(option);
  }
  isOpen.value = false;
};

const removeOption = (option: Option) => {
  selectedOptions.value = selectedOptions.value.filter((opt) => opt.value !== option.value);
};

const isSelected = (option: Option) => {
  return selectedOptions.value.some((opt) => opt.value === option.value);
};
</script>
