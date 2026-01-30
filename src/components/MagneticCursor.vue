<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'

const cursorDot = ref<HTMLElement | null>(null)
const cursorOutline = ref<HTMLElement | null>(null)

let quickX: ((val: number) => void) | null = null
let quickY: ((val: number) => void) | null = null
let quickOutlineX: ((val: number) => void) | null = null
let quickOutlineY: ((val: number) => void) | null = null

onMounted(() => {
  if (!cursorDot.value || !cursorOutline.value) return

  // GSAP quickTo for ultra-smooth performance
  quickX = gsap.quickTo(cursorDot.value, 'x', { duration: 0.3, ease: 'power3' })
  quickY = gsap.quickTo(cursorDot.value, 'y', { duration: 0.3, ease: 'power3' })
  quickOutlineX = gsap.quickTo(cursorOutline.value, 'x', { duration: 0.8, ease: 'power3' })
  quickOutlineY = gsap.quickTo(cursorOutline.value, 'y', { duration: 0.8, ease: 'power3' })

  const handleMouseMove = (e: MouseEvent) => {
    quickX?.(e.clientX)
    quickY?.(e.clientY)
    quickOutlineX?.(e.clientX)
    quickOutlineY?.(e.clientY)
  }

  const handleMouseEnter = () => {
    gsap.to([cursorDot.value, cursorOutline.value], {
      scale: 2,
      duration: 0.3,
      ease: 'back.out(1.7)'
    })
  }

  const handleMouseLeave = () => {
    gsap.to([cursorDot.value, cursorOutline.value], {
      scale: 1,
      duration: 0.3,
      ease: 'power2.out'
    })
  }

  // Apply to interactive elements
  const interactiveElements = document.querySelectorAll('a, button, .n-button, .project-card, [role="button"]')
  
  interactiveElements.forEach((el) => {
    el.addEventListener('mouseenter', handleMouseEnter as EventListener)
    el.addEventListener('mouseleave', handleMouseLeave as EventListener)
  })

  window.addEventListener('mousemove', handleMouseMove)

  onUnmounted(() => {
    window.removeEventListener('mousemove', handleMouseMove)
    interactiveElements.forEach((el) => {
      el.removeEventListener('mouseenter', handleMouseEnter as EventListener)
      el.removeEventListener('mouseleave', handleMouseLeave as EventListener)
    })
  })
})
</script>

<template>
  <div class="cursor-wrapper hidden md:block">
    <!-- Dot -->
    <div 
      ref="cursorDot" 
      class="cursor-dot"
    ></div>
    
    <!-- Outline -->
    <div 
      ref="cursorOutline" 
      class="cursor-outline"
    ></div>
  </div>
</template>

<style scoped>
.cursor-wrapper {
  pointer-events: none;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
}

.cursor-dot,
.cursor-outline {
  position: fixed;
  pointer-events: none;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  mix-blend-mode: difference;
}

.cursor-dot {
  width: 8px;
  height: 8px;
  background: #2DD4BF;
  box-shadow: 0 0 10px rgba(45, 212, 191, 0.8);
}

.cursor-outline {
  width: 32px;
  height: 32px;
  border: 2px solid rgba(45, 212, 191, 0.5);
  background: transparent;
}

/* Hide on touch devices */
@media (hover: none) and (pointer: coarse) {
  .cursor-wrapper {
    display: none !important;
  }
}
</style>
