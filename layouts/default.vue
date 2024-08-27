<template>
    <div class="w-full h-auto flex bg-[#202a41] ">
        <Sidebar />
        <div class="w-full h-screen lg:pl-[80px]">
            <Header />
            <div class="w-full h-full bg-[#202a41] pt-[80px]">
                <slot></slot>
            </div>
            <MobileFooter />
            <Modal />
        </div>
    </div>
</template>
<script setup lang="ts">
import Sidebar from '~/components/sidebar/Sidebar.vue';
import Header from '~/components/shared/Header.vue';
import MobileFooter from '~/components/sidebar/MobileFooter.vue';
import Modal from '~/components/ui/modal/Modal.vue';
</script>
