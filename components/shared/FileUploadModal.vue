<template>
  <!-- <div class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50"> -->
    <div class="bg-[#202a41] rounded-lg shadow-lg w-[500px] max-w-md p-6 max-h-[80vh] flex flex-col relative">
      <div v-if="loading" class="w-full h-full absolute top-0 left-0 flex items-center justify-center bg-[#000000a9] rounded-lg z-10">
        <div role="status">
          <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 38.2158C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
          </svg>
      </div>
      </div>
      <div class="mb-4">
        <h2 class="text-white text-xl font-bold">Выбрано {{ selectedFiles.length }} файлов</h2>
      </div>
      <div class="flex-1 overflow-y-auto mb-4" :class="gridClasses">
        <!-- Отображение изображений и видео -->
        <div v-for="(file, index) in mediaFiles" :key="index" class="relative col-span-1">
          <img v-if="file.type.startsWith('image/')" :src="fileUrls[index]" alt="Preview" class="w-full max-h-[150px] object-cover h-auto rounded">
          <video v-else-if="file.type.startsWith('video/')" :src="fileUrls[index]" controls class="w-full max-h-[150px] h-auto rounded"></video>
          <div class="absolute top-2 right-2 px-3 py-1 rounded-md bg-[#00000067]">
            <button @click="removeFile(index)" class=" bg-red-500 text-white rounded-full p-1">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <!-- Отображение других типов файлов -->
      <div class="flex-1 overflow-y-auto mb-4">
        <div v-for="(file, index) in otherFiles" :key="index" class="relative col-span-1 mb-2">
          <div class="flex items-center gap-2 py-1 px-2 bg-gray-800 rounded">
            <IconCSS :name="getFileIconName(file.name)" class="text-[#ff4f8f] group-hover:text-[white] text-2xl" />
            <div class="flex flex-col">
              <div class="text-white text-sm">{{ file.name }}</div>
              <div class="text-gray-400 text-xs">{{ formatFileSize(file.size) }}</div>
            </div>
          </div>
          <div class="absolute top-2 right-2 rounded-md">
            <button @click="removeFile(index + mediaFiles.length)" class=" bg-red-500 text-white rounded-full p-1">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div class="mb-4">
        <Input
          v-model="messageText"
          type="text"
          placeholder="Type a message"
        />
      </div>
      <div class="flex justify-between">
        <button
          class="mr-2 px-4 py-2 bg-red-500 text-white rounded"
          @click="closeModal"
        >
          Cancel
        </button>
        <button
          class="px-4 py-2 bg-[#ff4f907a] hover:bg-[#ff4f8f] text-white rounded"
          @click="handleSendMessage"
        >
          Send
        </button>
      </div>
    </div>
  <!-- </div> -->
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { uiStore } from '@/stores/ui';
import { sendMessage } from '@/lib/api/messages.ts'
import { useConversationId } from '@/composables/useConversationId'
import { Input } from '@/components/ui/input'
import { formatFileSize, getFileIconName } from '@/lib/utils.ts'

const { closeModal } = uiStore()
const { modalData: selectedFiles } = storeToRefs(uiStore())

const { conversationId } = useConversationId()
const loading = ref(false)
const messageText = ref('')
const fileUrls = ref([])

// Создаем URL-объекты для файлов и сохраняем их в массиве
watch(selectedFiles, (newFiles) => {
  fileUrls.value = newFiles.map((file: File) => URL.createObjectURL(file));
}, { immediate: true });

const handleSendMessage = async () => {
  try {
    loading.value = true
    const response = await sendMessage({
      message: messageText.value,
      files: selectedFiles.value,
      conversationId,
    });

    if (response) {
      loading.value = false
      closeModal()
    }

  } catch (error) {
    alert(error);
  } finally {
    loading.value = false
  }
};

const removeFile = (index: number) => {
  selectedFiles.value.splice(index, 1);
};

const gridClasses = computed(() => {
  if (selectedFiles.value.length === 1) {
    return 'grid grid-cols-1 gap-4';
  } else if (selectedFiles.value.length === 2) {
    return 'grid grid-cols-1 gap-4';
  } else if (selectedFiles.value.length === 3) {
    return 'grid grid-cols-2 gap-4';
  } else {
    return 'grid grid-cols-2 gap-4';
  }
});

const mediaFiles = computed(() => {
  return selectedFiles.value.filter(file => file.type.startsWith('image/') || file.type.startsWith('video/'));
});

const otherFiles = computed(() => {
  return selectedFiles.value.filter(file => !file.type.startsWith('image/') && !file.type.startsWith('video/'));
});

</script>
  