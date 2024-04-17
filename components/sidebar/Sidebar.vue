<template>
    <nav class="hidden lg:flex lg:w-[80px] lg:z-40 h-screen p-4 bg-[#1b2439] fixed left-0 top-0">
      <div class="w-full h-full flex flex-col justify-between">
      <!-- Sidebar TOP -->
      <ul class="w-full h-auto flex flex-col items-center gap-5" role="list">
          <NuxtLink href="/chat" class="w-full flex items-center justify-center cursor-pointer">
              <Logo />
          </NuxtLink >
          <div class="w-full h-auto flex flex-col items-center gap-5 pt-10">
            <Sidebaritem v-for="item in sidebarLinks" :key="item.label" :item="item" />
          </div>
      </ul>

      <!-- Sidebar BOTTOM -->
      <div class="w-full h-auto">
      <TooltipProvider :delay-duration="100">
          <Tooltip>
              <TooltipTrigger as-child>
                  <div class="w-full flex flex-col items-center cursor-pointer py-2">
                      <IconCSS name="mdi:logout" class="text-white text-[30px]" />
                  </div>
              </TooltipTrigger>
              <TooltipContent side="right" class="ml-2 p-2 py-0">
                  <p>Выйти</p>
              </TooltipContent>
          </Tooltip>
      </TooltipProvider>
      </div>
    
      </div>
    </nav>
</template>
<script setup lang="ts">
import Logo from '../shared/Logo.vue'
import Sidebaritem from './SidebarItem.vue';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip'

const sidebarLinks = [
  {
    label: "Чат",
    icon: 'mdi:message-outline',
    path: "/chat",
  },
  {
    label: "Группы",
    icon: 'ci:chat-conversation',
    path: "/groups",
  },
  {
    label: "Друзья",
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
