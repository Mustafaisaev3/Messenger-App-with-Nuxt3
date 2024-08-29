<template>
  <div v-if="modalStatus" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" @click.self="closeModal">
    <div class="bg-[#202a41] rounded-lg shadow-lg relative w-auto max-w-2xl h-auto">
      <div class="modal__inner h-full overflow-y-auto">
        <!-- <slot /> -->
        <FileUploadModal v-if="modalView === ModalViewType.FileUploadModalView" />
      </div>
      <button @click="closeModal" class="absolute top-[-15px] right-[-15px] w-8 h-8 bg-white rounded-full flex items-center justify-center z-10">
        <IconCSS name="mdi:close" class="text-black text-xl" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { uiStore, ModalViewType } from '~/stores/ui'
import FileUploadModal from '@/components/shared/FileUploadModal.vue'

const { closeModal } = uiStore()
const { modalStatus, modalView } = storeToRefs(uiStore())

</script>
  