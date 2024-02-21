<template>
    <div class="w-full h-screen text-xxl text-amber-700">
        Users <button class="text-[red]" @click="signOut()">Log Out</button>
    </div>
</template>
<script setup lang="ts">
// import { useAuth } from '@sidebase/nuxt-auth'
const { signOut } = useAuth()

definePageMeta({
    layout: 'users'
})
</script>
