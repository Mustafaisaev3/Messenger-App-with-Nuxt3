<template lang="">
    <div 
      class="
        fixed 
        justify-between 
        w-full 
        bottom-0 
        z-40 
        flex 
        items-center 
        bg-[#1b2439]
        border-[#5a5a5a]
        border-t-[1px] 
        lg:hidden
      "
    >
      <MobileItem v-for="item in sidebarLinks" :key="item.label" :item="item" />
    </div>
</template>
<script setup lang="ts">
import MobileItem from './MobileItem.vue';

const sidebarLinks = [
  {
    label: "Чат",
    icon: 'mdi:message-outline',
    path: "/chat",
  },
  {
    label: "Группы",
    icon: 'mdi:account-supervisor-outline',
    path: "/users",
  },
  {
    label: "Файлы",
    icon: 'system-uicons:files-stack',
    path: "/storage",
  },
];
</script>