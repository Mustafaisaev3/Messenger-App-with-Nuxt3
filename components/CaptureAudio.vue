<template>
  <div class="flex text-2xl w-full justify-center items-center bg-[#1b2439] p-4 rounded-lg shadow-lg">
    <div class="pt-1 flex items-center justify-center">
      <IconCSS name="mdi:delete" class="text-[#ff5151] cursor-pointer" @click="hide" />
    </div>
    <div class="mx-4 py-2 px-4 text-white text-lg flex gap-3 justify-center items-center bg-[#202a41] rounded-full drop-shadow-lg">
      <div v-if="isRecording" class="text-[#ff4f8f] animate-pulse text-center">
        Recording <span>{{ recordingDuration }}s</span>
      </div>
      <div v-else>
        <div v-if="recordedAudio" class="flex items-center justify-center">
          <IconCSS v-if="!isPlaying" name="mdi:play" class="cursor-pointer text-[#ff4f8f]" @click="handlePlayRecording" />
          <IconCSS v-else name="mdi:stop" class="cursor-pointer text-[#ff4f8f]" @click="handlePauseRecording" />
        </div>
      </div>
      <div class="w-60" ref="waveFormRef" :hidden="isRecording"></div>
      <span v-if="recordedAudio && isPlaying" class="text-[#ff4f8f]">{{ formatTime(currentPlaybackTime) }}</span>
      <span v-if="recordedAudio && !isPlaying" class="text-[#ff4f8f]">{{ formatTime(totalDuration) }}</span>
      <audio ref="audioRef" hidden></audio>
      <div class="mr-2 flex items-center justify-center">
        <IconCSS v-if="!isRecording" name="mdi:microphone" class="text-[#ff4f8f] cursor-pointer" @click="handleStartRecording" />
        <IconCSS v-else name="mdi:pause-circle" class="text-[#ff4f8f] cursor-pointer" @click="handleStopRecording" />
      </div>
      <div class="flex items-center justify-center">
        <IconCSS name="mdi:send" class="text-[#ff4f8f] cursor-pointer mr-4" @click="sendRecording" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import WaveSurfer from 'wavesurfer.js'

const props = defineProps({
  hide: Function
})

const isRecording = ref(false)
const recordedAudio = ref(null)
const waveform = ref(null)
const recordingDuration = ref(0)
const currentPlaybackTime = ref(0)
const totalDuration = ref(0)
const isPlaying = ref(false)
const renderedAudio = ref(null)

const audioRef = ref(null)
const mediaRecorderRef = ref(null)
const waveFormRef = ref(null)

let interval

onMounted(() => {
  const wavesurfer = WaveSurfer.create({
    container: waveFormRef.value,
    waveColor: "#ccc",
    progressColor: "#4a9eff",
    cursorColor: "#ff4f8f",
    barWidth: 2,
    height: 30,
    responsive: true
  })

  waveform.value = wavesurfer

  wavesurfer.on("finish", () => {
    isPlaying.value = false
  })

  if (waveform.value) handleStartRecording()
})

onUnmounted(() => {
  waveform.value.destroy()
  clearInterval(interval)
})

watch(isRecording, (newVal) => {
  if (newVal) {
    interval = setInterval(() => {
      recordingDuration.value += 1
      totalDuration.value += 1
    }, 1000)
  } else {
    clearInterval(interval)
  }
})

const handleStartRecording = () => {
  recordingDuration.value = 0
  currentPlaybackTime.value = 0
  totalDuration.value = 0
  isRecording.value = true
  navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.value = mediaRecorder
      audioRef.value.srcObject = stream

      const chunks = []
      mediaRecorder.ondataavailable = (e) => chunks.push(e.data)
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" })
        const audioURL = URL.createObjectURL(blob)
        const audio = new Audio(audioURL)
        recordedAudio.value = audio

        console.log(audio, 'audio', audioURL)

        waveform.value.load(audioURL)
      }

      mediaRecorder.start()
    })
    .catch((error) => {
      console.error("Error accessing microphone:", error)
    })
}

const handleStopRecording = () => {
  if (mediaRecorderRef.value && isRecording.value) {
    mediaRecorderRef.value.stop()
    isRecording.value = false
    waveform.value.stop()

    const audioChunks = []
    mediaRecorderRef.value.addEventListener("dataavailable", (event) => {
      audioChunks.push(event.data)
    })

    mediaRecorderRef.value.addEventListener("stop", () => {
      const audioBlob = new Blob(audioChunks, { type: "audio/mp3" })
      const audioFile = new File([audioBlob], 'recording.mp3')
      renderedAudio.value = audioFile
    })
  }
}

watch(recordedAudio, (newVal) => {
  if (newVal) {
    const updatePlaybackTime = () => {
      currentPlaybackTime.value = newVal.currentTime
    }

    newVal.addEventListener("timeupdate", updatePlaybackTime)

    return () => {
      newVal.removeEventListener("timeupdate", updatePlaybackTime)
    }
  }
})

const handlePlayRecording = () => {
  if (recordedAudio.value) {
    waveform.value.stop()
    waveform.value.play()
    recordedAudio.value.play()
    isPlaying.value = true
  }
}

const handlePauseRecording = () => {
  waveform.value.stop()
  recordedAudio.value.pause()
  isPlaying.value = false
}

const sendRecording = async () => {
    // Нужно реализовать отправку аудиозаеписи
}

const formatTime = (time) => {
  if (isNaN(time)) return "00:00"

  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time % 60)

  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
}
</script>

<style scoped>
.animate-pulse {
  animation: pulse 1s infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
</style>