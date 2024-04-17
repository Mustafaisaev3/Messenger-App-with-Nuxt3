<template>
  <div class="w-[400px] h-full flex flex-col py-6 px-8 border-r-2 border-[#1b2439] text-[#ffffff] overflow-hidden">
    <div class="w-full h-auto flex gap-2 pb-2">
      <div 
        class="w-full h-10 rounded-sm border border-[#ff4f8f] flex items-center justify-center cursor-pointer"
        :class="{'text-white bg-[#ff4f8f]': activeTab == 'FRIENDS'}"
        @click="setActiveTab('FRIENDS')"
      >
        Friends
      </div>
      <div 
        class="w-full h-10 rounded-sm border border-[#ff4f8f] flex items-center justify-center cursor-pointer"
        :class="{'text-white bg-[#ff4f8f]': activeTab == 'USERS'}"
        @click="setActiveTab('USERS')"
      >
        Users
      </div>
    </div>
    
    <Input placeholder="Search user" leftIcon="mdi:magnify"  />

    <NuxtScrollbar tag="div">
    <ul v-if="loading"  class="w-full h-auto flex-1 overflow-y-auto mt-4 flex flex-col gap-2">
      <UserBoxSkeleton v-for="item in 10" :key="item"/>
    </ul>
    <ul v-else class="w-full h-auto flex-1 overflow-y-auto mt-4 flex flex-col gap-2">
      <UserBox v-for="user in users" :id="user.id" :user="user" />
    </ul>
    </NuxtScrollbar>
  </div>
</template>

<script setup lang="ts">
import { type SafeUser } from '~/types';
import UserBox from './UserBox.vue'
import UserBoxSkeleton from './UserBoxSkeleton.vue'

interface UserListProps {
  users: SafeUser[] | undefined,
  loading: boolean,
  error: any
}

const { users, loading, error } = defineProps<UserListProps>()

const activeTab = ref('FRIENDS')
const setActiveTab = (type: string) => {
  activeTab.value = type
}

</script>