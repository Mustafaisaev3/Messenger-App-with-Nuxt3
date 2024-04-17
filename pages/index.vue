<template>
  <div class="flex h-[100vh] min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 bg-[#1b2439]">
    <div class="sm:mx-auto sm:w-full sm:max-w-md flex flex-col items-center ">
      <img class="mx-auto w-20 h-20" src="/logo.png" alt="Logo" />
      <h2 class="mt-2 text-center text-xl font-bold text-white">
        Войдите в свой аккаунт
      </h2>
    </div>  
    <AuthForm />
  </div>
</template>

<script setup lang="ts">
import AuthForm from '@/components/auth/AuthForm.vue'

definePageMeta({
  layout: 'auth'
})

</script>