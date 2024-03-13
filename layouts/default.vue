<template>
    <div class="w-full h-auto flex">
        <Sidebar />
        <div class="w-full h-screen lg:pl-[80px]">
            <Header />
            <div class="w-full h-auto bg-[#202a41] pt-[100px]">
                <slot></slot>
            </div>
            <MobileFooter />
        </div>
    </div>
</template>
<script setup lang="ts">
import Sidebar from '../components/sidebar/Sidebar.vue';
import Header from '../components/shared/Header.vue';
import MobileFooter from '~/components/sidebar/MobileFooter.vue';
</script>
