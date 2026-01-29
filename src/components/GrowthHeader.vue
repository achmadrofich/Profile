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

    // Vine Setup
    const length = pathRef.value!.getTotalLength() + 5 // Extra buffer
    gsap.set(pathRef.value, { strokeDasharray: length, strokeDashoffset: length, opacity: 1 })
    
    // Leaf setup
    if (leafRef.value) gsap.set(leafRef.value, { scale: 0, opacity: 0, rotation: -15 })

    // Timeline
    tl
      // 1. Vine draws naturally (Organic flow)
      .to(pathRef.value, {
        strokeDashoffset: 0,
        duration: 1.2,
        ease: 'power2.inOut' // Smooth accel/decel
      })
      // 2. Text flows in
      .from(containerRef.value!.querySelectorAll('.char'), {
        y: 15,
        opacity: 0,
        duration: 0.8,
        stagger: 0.04,
        ease: 'power2.out'
      }, "-=0.8")
      // 3. Bloom gently gently pop
      .to(leafRef.value, {
        scale: 1,
        opacity: 1,
        rotation: 0,
        duration: 0.6,
        ease: 'back.out(1.5)'
      }, "-=0.3")
    
    // Subtle breathing glow
    gsap.to(leafRef.value, {
        filter: 'drop-shadow(0 0 6px rgba(45,212,191,0.6))',
        scale: 1.05,
        duration: 2.5,
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
  <div ref="containerRef" class="relative inline-block pb-3">
    <svg 
      class="absolute bottom-0 left-0 w-full h-[36px] pointer-events-none overflow-visible z-0 opacity-0 transition-opacity duration-500" 
      :class="{ '!opacity-100': true }" 
      viewBox="0 0 300 36" 
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="premiumVine" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#2DD4BF" />
          <stop offset="50%" stop-color="#2DD4BF" />
          <stop offset="100%" stop-color="#5EEAD4" /> <!-- Lighter tail -->
        </linearGradient>
      </defs>

      <!-- Smooth Organic Cubic Bezier Curve -->
      <path
        ref="pathRef"
        d="M5,28 C80,38 220,38 295,24"
        fill="none"
        stroke="url(#premiumVine)"
        stroke-width="3"
        stroke-linecap="round"
        class="filter drop-shadow-[0_0_2px_rgba(45,212,191,0.3)]"
      />
      
      <!-- Bloom at (295, 24) -->
      <g ref="leafRef" transform="translate(295, 24)">
         <circle r="3.5" fill="#5EEAD4" />
         <!-- Organic Asymmetric Petals -->
         <path d="M0,0 C2,-5 8,-6 9,0 C7,5 2,4 0,0" fill="#ccfbf1" transform="rotate(-30) translate(2,-2)" />
         <path d="M0,0 C-3,5 -8,4 -9,0 C-7,-5 -2,-5 0,0" fill="#14b8a6" transform="rotate(-30) translate(-2,2)" />
         <!-- Particle -->
         <circle r="1.5" fill="#fff" transform="translate(4, -4)" class="animate-pulse" />
      </g>
    </svg>

    <h2 class="relative z-10 text-3xl md:text-5xl font-bold text-white tracking-tight flex gap-3 flex-wrap justify-center">
       <span v-for="(word, i) in text.split(' ')" :key="i" class="inline-block whitespace-nowrap">
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
.char {
    /* No initial opacity 0 to prevent FOUC/Invisible text bug */
}
</style>
