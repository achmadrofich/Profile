<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const scrollProgress = ref(0)

const updateProgress = () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
  const progress = (scrollTop / scrollHeight) * 100
  scrollProgress.value = progress
}

onMounted(() => {
  window.addEventListener('scroll', updateProgress, { passive: true })
  updateProgress() // Initial calculation
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateProgress)
})
</script>

<template>
  <div class="fixed top-0 left-0 right-0 h-1 bg-gray-900/50 z-[100] backdrop-blur-sm">
    <div 
      class="h-full bg-gradient-to-r from-teal-400 via-teal-500 to-blue-500 transition-all duration-150 ease-out shadow-[0_0_10px_rgba(45,212,191,0.5)]"
      :style="{ width: `${scrollProgress}%` }"
    >
      <!-- Animated shimmer effect -->
      <div class="h-full w-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
    </div>
  </div>
</template>

<style scoped>
@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.animate-shimmer {
  animation: shimmer 2s ease-in-out infinite;
}
</style>
