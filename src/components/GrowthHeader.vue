<script setup lang="ts">
import { onMounted, ref, nextTick, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const props = defineProps({
  text: {
    type: String,
    required: true
  },
  highlight: {
    type: String,
    default: ''
  }
})

const containerRef = ref<HTMLElement | null>(null)
const pathRef = ref<SVGPathElement | null>(null)
const leafRef = ref<SVGGElement | null>(null)
let ctx: gsap.Context | null = null

onMounted(async () => {
  await nextTick()
  if (!containerRef.value || !pathRef.value) return

  ctx = gsap.context(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.value,
        start: 'top 95%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    })

    // Init state safely (set opacity 0 via JS only)
    gsap.set(containerRef.value!.querySelectorAll('.char'), { y: 20, opacity: 0 })
    
    // Vine Setup
    const length = pathRef.value!.getTotalLength()
    gsap.set(pathRef.value, { strokeDasharray: length, strokeDashoffset: length, opacity: 1 })
    
    if (leafRef.value) gsap.set(leafRef.value, { scale: 0, opacity: 0 })

    tl
      // 1. Vine draws
      .to(pathRef.value, {
        strokeDashoffset: 0,
        duration: 1.0,
        ease: 'power2.inOut'
      })
      // 2. Text staggers in
      .to(containerRef.value!.querySelectorAll('.char'), {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.03,
        ease: 'back.out(1.5)'
      }, "-=0.6")
      // 3. Bloom
      .to(leafRef.value, {
        scale: 1,
        opacity: 1,
        duration: 0.4,
        ease: 'elastic.out(1.2, 0.5)'
      }, "-=0.2")

    // Pulse
    gsap.to(leafRef.value, {
        filter: 'drop-shadow(0 0 10px rgba(45,212,191,0.8))',
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    })
  }, containerRef.value)
})

onUnmounted(() => {
  ctx?.revert()
})
</script>

<template>
  <div ref="containerRef" class="relative inline-block py-6">
    <svg 
      class="absolute -bottom-2 -left-4 w-[115%] h-[50px] pointer-events-none overflow-visible z-0 opacity-0 transition-opacity duration-300" 
      :class="{ '!opacity-100': true }" 
      viewBox="0 0 300 50" 
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="vineGradientSimple" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#2DD4BF" stop-opacity="0" />
          <stop offset="30%" stop-color="#2DD4BF" stop-opacity="0.8" />
          <stop offset="100%" stop-color="#3B82F6" />
        </linearGradient>
      </defs>

      <!-- Single Elegant Wave -->
      <path
        ref="pathRef"
        d="M10,25 Q150,50 290,25"
        fill="none"
        stroke="url(#vineGradientSimple)"
        stroke-width="3"
        stroke-linecap="round"
        class="filter drop-shadow-[0_0_5px_rgba(45,212,191,0.4)]"
      />
      
      <!-- Refined Bloom -->
      <g ref="leafRef" transform="translate(290, 25)">
         <!-- Center Core -->
         <circle r="3" fill="#3B82F6" class="filter drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
         
         <!-- Petals -->
         <path d="M0,0 C3,-4 6,-4 7,0 C6,4 3,4 0,0" fill="#ccfbf1" transform="rotate(-45) translate(2,-2)" />
         <path d="M0,0 C-3,4 -6,4 -7,0 C-6,-4 -3,-4 0,0" fill="#14b8a6" transform="rotate(-45) translate(-2,2)" />
         
         <!-- Tiny Particles -->
         <circle r="1" fill="#fff" transform="translate(5, -5)" class="animate-pulse" />
         <circle r="1" fill="#fff" transform="translate(-4, 4)" class="animate-pulse" style="animation-delay: 0.5s" />
      </g>
    </svg>

    <h2 class="relative z-10 text-3xl md:text-5xl font-bold text-white tracking-tight flex gap-3 flex-wrap justify-center">
       <span v-for="(word, i) in text.split(' ')" :key="i" class="inline-block whitespace-nowrap mb-1">
          <span 
            v-for="(char, j) in word" 
            :key="j" 
            class="char inline-block will-change-transform"
             :class="{ 'text-teal-400': highlight.includes(word) }"
          >
            {{ char }}
          </span>
          <span class="inline-block w-2"></span> 
       </span>
    </h2>
  </div>
</template>

<style scoped>
svg path {
    vector-effect: non-scaling-stroke; 
}
/* Removed .char opacity: 0 to fallback to visible */
</style>
```
