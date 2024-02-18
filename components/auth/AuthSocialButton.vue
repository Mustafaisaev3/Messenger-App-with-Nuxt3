<template>
    <button
      type="button"
      class="w-full inline-flexw-full justify-center rounded-md bg-[#202a41] hover:bg-[#26324e] px-4 py-2 text-gray-500 shadow-sm"
    >
      <IconCSS 
        v-if="buttonAuthType == 'GITHUB'"
        name="mdi:github"
        class="text-[20px] text-white"
      />
      <IconCSS 
        v-if="buttonAuthType == 'GOOGLE'"
        name="mdi:google"
        class="text-[20px] text-white"
      />
    </button>
</template>
<script setup lang="ts">
import { defineProps } from 'vue'
import type { PropType } from 'vue'

type AuthButtonTypes =  'GITHUB' | 'GOOGLE'

const { buttonAuthType } = defineProps({
    buttonAuthType: String as PropType<AuthButtonTypes>
})
</script>
