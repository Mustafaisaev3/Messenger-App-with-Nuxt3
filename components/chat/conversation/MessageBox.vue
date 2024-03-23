<template>
    <div class="flex gap-3 p-4" :class="{'justify-end': isOwn}">
      <div :class="{'order-2': isOwn}">
        <Avatar />
      </div>
      <div>
          <div class="flex flex-col gap-2 p-2 rounded-xl rounded-bl-none bg-[#1b2439] text-white" :class="{'items-end bg-[#ff4f8f] rounded-bl-xl rounded-br-none text-white': isOwn}">
            <div class="flex items-center gap-1">
              <div class="text-sm">
                Messageasdfsasdfsdfsdfsdfsdfsdfsdf
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
          <div v-if="isOwn" class="pt-1 text-xs text-right font-light text-gray-500">
            Message seen 2:20 pm
          </div>
          <div v-else="isOwn" class="pt-1 text-xs text-left font-light text-gray-500">
            Message sent 2:20 pm
          </div>
      </div>
    </div>
</template>
<script setup lang="ts">
import Avatar from '~/components/Avatar.vue';

interface MessageBoxTypes {
    isOwn: boolean;
}

const { isOwn } = defineProps<MessageBoxTypes>()

</script>