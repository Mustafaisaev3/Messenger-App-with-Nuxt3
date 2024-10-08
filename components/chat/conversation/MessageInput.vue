<template>
    <form v-if="messageInputMode === MessageInputMode.MESSAGE" enctype="multipart/form-data" accept-charset="UTF-8" class="w-full h-[60px] mt-2 relative flex justify-between gap-2 items-center px-4 py-3 bg-[#1b2439] rounded-md transition" @submit="onSubmit">
      <Dropup />
      <input
        placeholder="Type a message..."
        class="
          font-light
          py-2
          px-4 bg-transparent
          text-white
          w-full 
          focus:outline-none
        "
        v-model="message"
        name="message"
      />
      <NuxtEmoji @on-select="handleEmojiSelect">
        <template v-slot:button>
          <IconCSS name="mdi:emoticon-happy-outline" class="text-[gray] text-2xl"/>
        </template>
      </NuxtEmoji>
      <button class="w-[40px] h-[40px] flex items-center justify-center rounded-sm ml-2" @click="activateAudioMessageMode">
        <IconCSS name="mdi:microphone" class="text-white text-xl"/>
      </button>
      <button class="bg-[#ff4f8f] w-[40px] h-[40px] flex items-center justify-center rounded-sm ml-2">
        <IconCSS name="mdi:send-outline" class="text-white text-xl"/>
      </button>
    </form>
    <CaptureAudio v-if="messageInputMode === MessageInputMode.AUDIO_MESSAGE" :conversationId="conversationId" :hide="activateMessageMode" />
</template>
<script setup lang="ts">
import { ref } from 'vue'
import * as zod from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import { useField, useForm } from 'vee-validate'
import { sendMessage } from '@/lib/api/messages.ts'
import Dropup from './Dropup'
import CaptureAudio from '@/components/CaptureAudio'

enum MessageInputMode {
  MESSAGE = 'MESSAGE',
  AUDIO_MESSAGE = 'AUDIO_MESSAGE'
}

interface MessageInputProps {
  conversationId: string
}

const { conversationId } = defineProps<MessageInputProps>()
const messageInputMode = ref<MessageInputMode>(MessageInputMode.MESSAGE);

const activateMessageMode = () => {
  messageInputMode.value = MessageInputMode.MESSAGE
}

const activateAudioMessageMode = () => {
  messageInputMode.value = MessageInputMode.AUDIO_MESSAGE
}


// Обработка сообщения
const isSubmitting = ref(false);

const validationSchema = toTypedSchema(
  zod.object({
    message: zod.string().nonempty('This is required'),
  })
)

const { handleSubmit, errors } = useForm({
  validationSchema
});

const { value: message } = useField('message');

const onSubmit = handleSubmit(async (values) => {
  isSubmitting.value = true;

  try {
    const response = await sendMessage({
      message: values.message,
      conversationId,
    });

    console.log(values.message)

  } catch (error) {
    alert(error);
  } finally {
    isSubmitting.value = false;
  }
});

const handleEmojiSelect = (emoji: string) => {
  console.log(message.value += emoji)
}
</script>
