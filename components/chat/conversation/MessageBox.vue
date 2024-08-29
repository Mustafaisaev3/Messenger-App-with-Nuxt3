<template>
  <div class="flex gap-3 p-4" :class="{'justify-end': isOwn}">
    <div :class="{'order-2': isOwn}">
      <Avatar />
    </div>
    <div>
      <div class="flex flex-col gap-2 p-2 rounded-xl rounded-bl-none bg-[#1b2439] text-white" :class="{'items-end bg-[#ff4f9030] rounded-bl-xl rounded-br-none text-white': isOwn}">
        <div class="flex items-center gap-1">
          <MessageAudio v-if="data.audioUrl" :audioUrl="data.audioUrl" />
          <div v-else class="text-sm">
            {{ data.body }}
          </div>
        </div>
        <div class="text-sm w-fit overflow-hidden">
          <!-- Отображение изображений -->
          <div v-if="data.image" class="flex items-center gap-1">
            <img
              :src="data.image"
              alt="Image"
              class="object-cover cursor-pointer hover:scale-110 transition translate"
              @click="openMediaModal(data.image, 'image')"
            />
          </div>
          <!-- Отображение Медиа файлов -->
          <div v-if="mediaFiles && mediaFiles.length > 0" :class="gridClasses">
            <div v-for="file in mediaFiles" :key="file.id" class="relative col-span-1">
              <template v-if="file.type.startsWith('image/')">
                <img
                  :src="file.url"
                  alt="Image"
                  class="w-full max-h-[150px] object-cover h-auto rounded cursor-pointer"
                  @click="openMediaModal(file.url, 'image')"
                />
              </template>
              <template v-else-if="file.type.startsWith('video/')">
                <video
                  :src="file.url"
                  class="w-full max-h-[150px] h-auto rounded cursor-pointer"
                  @click="openMediaModal(file.url, 'video')"
                ></video>
              </template>
            </div>
          </div>
          <!-- Отображение других файлов -->
          <div v-if="otherFiles && otherFiles.length > 0" class="mt-2">
            <div v-for="file in otherFiles" :key="file.id" class="pb-1">
              <div class="flex items-center gap-2 py-1 px-2 bg-gray-800 rounded">
                <IconCSS :name="getFileIconName(file.name)" class="text-[#ff4f8f] group-hover:text-[white] text-2xl" />
                <div class="flex flex-col">
                  <div class="text-white text-sm">{{ file.name }}</div>
                  <div class="text-gray-400 text-xs">{{ formatFileSize(file.size) }}</div>
                </div>
                <a :href="file.url" target="_blank" class="ml-auto text-blue-500 cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="isOwn" class="flex items-end gap-2 pt-1 text-right">
        <div class="text-[12px] font-light text-gray-300">
          {{ data.sender.name }}
        </div>
        <div class="text-[10px] font-light text-gray-400">
          {{ format(new Date(data.createdAt), 'p') }}
        </div>
      </div>
      <div v-else class="flex items-end gap-2 pt-1 text-left">
        <div class="text-[12px] font-light text-gray-300">
          {{ data.sender.name }}
        </div>
        <div class="text-[10px] font-light text-gray-400">
          {{ format(new Date(data.createdAt), 'p') }}
        </div>
      </div>
    </div>
  </div>

  <!-- Модальное окно для просмотра медиа -->
  <div v-if="isModalOpen" class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
    <div class="bg-[#202a41] rounded-lg shadow-lg w-[500px] max-w-md p-6 max-h-[80vh] flex flex-col relative">
      <button @click="closeModal" class="absolute top-2 right-2 text-white">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <div class="flex-1 overflow-y-auto mb-4">
        <img v-if="mediaType === 'image'" :src="mediaUrl" alt="Image" class="w-full h-auto rounded" />
        <video v-else-if="mediaType === 'video'" :src="mediaUrl" controls class="w-full h-auto rounded"></video>
      </div>
      <button @click="downloadMedia" class="mt-2 text-blue-500 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import Avatar from '~/components/Avatar.vue';
import type { FullMessageType } from '~/types';
import { format } from "date-fns";
import { formatFileSize, getFileIconName } from '@/lib/utils.ts'
import MessageAudio from './MessageAudio.vue';

interface MessageBoxTypes {
  data: FullMessageType
}

const { data: session } = useAuth();

const { data } = defineProps<MessageBoxTypes>();

const isOwn = computed(() => session?.value?.user?.email === data?.sender?.email);

const isModalOpen = ref(false);
const mediaUrl = ref('');
const mediaType = ref('');

const openMediaModal = (url: string, type: string) => {
  mediaUrl.value = url;
  mediaType.value = type;
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  mediaUrl.value = '';
  mediaType.value = '';
};

const downloadMedia = () => {
  const link = document.createElement('a');
  link.href = mediaUrl.value;
  link.download = mediaUrl.value.split('/').pop() || '';
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const gridClasses = computed(() => {
  if (data.files.length === 1) {
    return 'grid grid-cols-1 gap-4';
  } else {
    return 'grid grid-cols-2 gap-4';
  }
});

const mediaFiles = computed(() => {
  return data.files.filter(file => file.type.startsWith('image/') || file.type.startsWith('video/'));
});

const otherFiles = computed(() => {
  return data.files.filter(file => !file.type.startsWith('image/') && !file.type.startsWith('video/'));
});

console.log(mediaFiles, otherFiles, isOwn, 'message');
</script>