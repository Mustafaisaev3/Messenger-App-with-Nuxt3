<template>
  <div class="w-full h-full flex">
    <UserList :users="users" :loading="loading" :error="error" />
    <!-- <Conversation :loading="true" /> -->
  </div>
    
</template>

<script setup lang="ts">
import Conversation from '~/components/chat/Conversation.vue';
import UserList from '~/components/users/UserList.vue'
import { type SafeUser } from '~/types/index'
import { USERS_API_URL } from '~/lib/api/users-api'


const { data: users, pending: loading, error } = await useFetch(USERS_API_URL.getUsers)
</script>