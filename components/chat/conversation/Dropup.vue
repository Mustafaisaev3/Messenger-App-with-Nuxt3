<template>
  <div class="dropup-container" @mouseover="showDropup = true" @mouseleave="showDropup = false">
    <IconCSS name="mdi:plus" class="text-[#ff4f8f] text-[25px]" />
    <transition name="fade">
      <div v-if="showDropup" class="dropup-content absolute left-0 right-0 bottom-[100%] pb-2 flex flex-col gap-2 items-center">

        <div class="w-10 h-10 group rounded-full bg-[#1b2439] border border-[#ff4f8f] cursor-pointer hover:bg-[#ff4f8f] flex items-center justify-center">
          <IconCSS name="mdi:camera-outline" class="text-[#ff4f8f] group-hover:text-[white]"/>
        </div>
        <div class="w-10 h-10 group rounded-full bg-[#1b2439] border border-[#ff4f8f] cursor-pointer hover:bg-[#ff4f8f] flex items-center justify-center">
          <IconCSS name="mdi:file-outline" class="text-[#ff4f8f] group-hover:text-[white]"/>
        </div>

      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showDropup: false
    };
  }
};
</script>

<style scoped>
.dropup-container {
  position: relative;
  display: inline-block;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>