<template>
  <div class="dropup-container" @mouseover="showDropup = true" @mouseleave="showDropup = false">
    <IconCSS name="mdi:plus" class="text-[#ff4f8f] text-[25px]" />
    <transition name="fade">
      <div v-if="showDropup" class="dropup-content absolute left-0 right-0 bottom-[100%] pb-2 flex flex-col gap-2 items-center">

        <label for="image-video-upload">
          <div class="w-10 h-10 group rounded-full bg-[#1b2439] border border-[#ff4f8f] cursor-pointer hover:bg-[#ff4f8f] flex items-center justify-center">
            <input id="image-video-upload" type="file" ref="fileInput" multiple accept="image/*,video/*" class="hidden" @change="handleImageAndVideoChange" />
            <IconCSS name="mdi:camera-outline" class="text-[#ff4f8f] group-hover:text-[white]"/>
          </div>
        </label>
        <label for="file-upload">
          <div class="w-10 h-10 group rounded-full bg-[#1b2439] border border-[#ff4f8f] cursor-pointer hover:bg-[#ff4f8f] flex items-center justify-center">
            <input id="file-upload" type="file" ref="fileInput" multiple class="hidden" @change="handleImageAndVideoChange" />
            <IconCSS name="mdi:file-outline" class="text-[#ff4f8f] group-hover:text-[white]"/>
          </div>
        </label>

      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { uiStore, ModalViewType } from '~/stores/ui'

const selectedFiles = ref<File[]>([]);

const handleImageAndVideoChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files) {
    selectedFiles.value = Array.from(target.files);
  }
}

watch(selectedFiles, (newFiles, oldFiles) => {
  console.log('files change', newFiles)
  openModal(ModalViewType.PhotoAndVideoUploadView, newFiles)
});

const { openModal } = uiStore()

const showDropup = ref(false)

</script>

<style scoped>
.dropup-container {
  position: relative;
  display: inline-block;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>