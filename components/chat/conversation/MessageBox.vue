<template>
  <div class="flex gap-3 p-4" :class="{'justify-end': isOwn}">
    <div :class="{'order-2': isOwn}">
      <Avatar />
    </div>
    <div>
        <div class="flex flex-col gap-2 p-2 rounded-xl rounded-bl-none bg-[#1b2439] text-white" :class="{'items-end bg-[#ff4f906e] rounded-bl-xl rounded-br-none text-white': isOwn}">
          <div class="flex items-center gap-1">
            <div class="text-sm">
              {{ data.body }}
            </div>
          </div>
          <div class="text-sm w-fit overflow-hidden">
            <!-- <ImageModal src={data.image} isOpen={imageModalOpen} onClose={() => setImageModalOpen(false)} />
            {data.image ? (
              <Image
                alt="Image"
                height="288"
                width="288"
                onClick={() => setImageModalOpen(true)} 
                src={data.image} 
                class="
                  object-cover 
                  cursor-pointer 
                  hover:scale-110 
                  transition 
                  translate
                "
              />
            ) : (
              <div>{data.body}</div>
            )} -->
          </div>
        </div>
        <div v-if="isOwn" class="flex items-end gap-2 pt-1 text-right">
          <div class=" text-[12px] font-light text-gray-300">
            {{ data.sender.name }}
          </div>
          <div class="text-[10px] font-light text-gray-400">
            {{ format(new Date(data.createdAt), 'p') }}
          </div>
        </div>
        <div v-else="isOwn" class="flex items-end gap-2 pt-1 text-left">
          <div class=" text-[12px] font-light text-gray-300">
            {{ data.sender.name }}
          </div>
          <div class="text-[10px] font-light text-gray-400">
            {{ format(new Date(data.createdAt), 'p') }}
          </div>
        </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import Avatar from '~/components/Avatar.vue';
import type { FullMessageType } from '~/types';
import { format } from "date-fns";

interface MessageBoxTypes {
  data: FullMessageType
}

const { data: session } = useAuth()

const { data } = defineProps<MessageBoxTypes>()

const isOwn = computed(() => session?.value?.user?.email === data?.sender?.email);

console.log(data,isOwn,'message')
</script>