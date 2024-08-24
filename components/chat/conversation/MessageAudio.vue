<template>
  <div class="flex text-2xl w-[400px] justify-center items-center bg-[#1b2439] p-4 rounded-lg shadow-lg">
    <audio controls class="w-full">
      <source :src="audioUrl" type="audio/mpeg">
    </audio>
  </div>
</template>
<!-- <template>
  <div class="flex text-2xl w-full justify-center items-center bg-[#1b2439] p-4 rounded-lg shadow-lg">
    <div ref="waveFormRef" class="waveform w-full h-[100px] mb-4"></div>
    <div class="controls flex items-center justify-center w-full">
      <div class="play-pause-button flex items-center justify-center mr-2 text-white rounded cursor-pointer">
        <IconCSS v-if="!isPlaying" name="mdi:play" class="text-[#ff4f8f]" @click="handlePlayPauseAudio" />
        <IconCSS v-else name="mdi:pause" class="text-[#ff4f8f]" @click="handlePlayPauseAudio" />
      </div>
      <div class="time-display text-gray-700">
        <span>{{ formatTime(currentPlaybackTime) }}</span> /
        <span>{{ formatTime(totalDuration) }}</span>
      </div>
    </div>
  </div>
</template> -->

<script setup lang="ts">
import { ref, onMounted, watch, onBeforeUnmount } from 'vue'
import { formatTime } from '@/lib/utils.ts'
import WaveSurfer from 'wavesurfer.js';

interface MessageAudioProps {
  audioUrl: string
}

const { audioUrl } = defineProps<MessageAudioProps>()

// const audioMessage = ref()
// const currentPlaybackTime = ref(0)
// const totalDuration = ref(0)
// const isPlaying = ref(false)

// const waveFormRef = ref()
// const waveform = ref()

// onMounted(() => {
//   if (!waveform.value) {
//     waveform.value = WaveSurfer.create({
//       container: waveFormRef.value,
//       waveColor: "#ccc",
//       progressColor: "#4a9eff",
//       cursorColor: "#ff4f8f",
//       barWidth: 2,
//       height: 30,
//       // responsive: true
//     })

//     console.log(waveform.value, 'value wave')

//     waveform.value.on("finish", () => {
//       isPlaying.value = false
//     })

//     waveform.value.on("ready", () => {
//       totalDuration.value = waveform.value.getDuration()
//     })

//     waveform.value.on("error", (error) => {
//       console.error("WaveSurfer error:", error)
//     })
//   }

//   const audio = new Audio(audioUrl)
//   audioMessage.value = audio
//   waveform.value.load(audioUrl).catch((error) => {
//     console.error("Failed to load audio:", error)
//   })
// })

// watch(audioMessage.value, (newVal) => {
//   if (newVal) {
//     const updatePlaybackTime = () => {
//       currentPlaybackTime.value = newVal.currentTime
//     }

//     newVal.addEventListener("timeupdate", updatePlaybackTime)

//     return () => {
//       newVal.removeEventListener("timeupdate", updatePlaybackTime)
//     }
//   }
// })

// const handlePlayPauseAudio = () => {
//   if (isPlaying.value) {
//     waveform.value.pause()
//     audioMessage.value.pause()
//   } else {
//     waveform.value.play()
//     audioMessage.value.play()
//   }
//   isPlaying.value = !isPlaying.value
// }

// onBeforeUnmount(() => {
//   if (waveform.value) {
//     waveform.value.destroy()
//   }
// })
</script>

<style scoped>
.audio-player {
  background-color: #1b2439;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.waveform {
  width: 100%;
  margin-bottom: 1rem;
}

.controls {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.play-pause-button {
  padding: 0.5rem 1rem;
  margin-right: 0.5rem;
  background-color: #3b82f6;
  color: white;
  border-radius: 0.375rem;
  cursor: pointer;
}

.play-pause-button:hover {
  background-color: #2563eb;
}

.time-display {
  color: #cbd5e0;
}
</style>