<template>
  <div class="relative h-11 w-11">
    <div
      v-for="(user, index) in slicedUsers"
      :key="user.id"
      :class="[
        'absolute',
        'inline-block',
        'rounded-full',
        'overflow-hidden',
        'h-[21px]',
        'w-[21px]',
        positionMap[index]
      ]"
    >
      <img
        :src="user?.image || '/images/placeholder1.jpg'"
        alt="Avatar"
        class="object-cover w-full h-full"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { User } from "@prisma/client";

interface AvatarGroupProps {
  users?: User[];
}

const props = defineProps<AvatarGroupProps>();

const slicedUsers = computed(() => props.users?.slice(0, 3) || []);

const positionMap = {
  0: 'top-0 left-[12px]',
  1: 'bottom-0',
  2: 'bottom-0 right-0'
}
</script>
