<template>
  <div class="w-full lg:w-[calc(100%-80px)] h-[80px] bg-[#1b2439] fixed top-0 p-4 px-8 flex items-center justify-between">
    <div class="w-auto h-full flex items-center gap-3 text-[gray] cursor-pointer hover:text-[white]">
        <IconCSS name="mdi:magnify" class="text-[25px]" />
        <span class="text-[14px]">Search Here </span>
    </div>
    <div class="w-auto h-full flex items-center gap-7">
        <IconCSS name="mdi:bell-outline" class="text-[25px] text-white" />

        <DropdownMenu>
          <DropdownMenuTrigger>
            <div class="flex items-center gap-2 text-white">
                <div class="w-[30px] h-[30px] rounded-full bg-cyan-300"></div>
                <div>Test User</div>
                <IconCSS name="mdi:chevron-down" class="text-[20px] text-white" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent class="bg-[#1b2439] text-white border-[#394c79]">
            <!-- <DropdownMenuLabel>My Account</DropdownMenuLabel> -->
            <!-- <DropdownMenuSeparator /> -->
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
    </div>
  </div>
</template>
<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
</script>



function returnBetweens (a,b) {
    const result = []
    for (let i=a; i < b; i++ ) {
        result.push(i)
    }

    return result
}