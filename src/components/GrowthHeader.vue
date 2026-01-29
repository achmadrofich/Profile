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

  // Use gsap.context for easy cleanup
  ctx = gsap.context(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.value,
        start: 'top 95%', // Trigger even earlier (when just entering viewport)
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    })

    // Init state (prevent flash)
    gsap.set(containerRef.value!.querySelectorAll('.char'), { y: 30, opacity: 0 })
    
    // Vine Setup
    const length = pathRef.value!.getTotalLength()
    gsap.set(pathRef.value, { strokeDasharray: length, strokeDashoffset: length, opacity: 1 })
    if (leafRef.value) gsap.set(leafRef.value, { scale: 0, opacity: 0 })

    // Animation Flow
    tl
      // 1. Vine draws
      .to(pathRef.value, {
        strokeDashoffset: 0,
        duration: 1.2,
        ease: 'power2.out'
      })
      // 2. Text staggers in (slightly overlapping with vine)
      .to(containerRef.value!.querySelectorAll('.char'), {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.03,
        ease: 'back.out(1.5)'
      }, "-=0.8")
      // 3. Leaf blooms
      .to(leafRef.value, {
        scale: 1,
        opacity: 1,
        duration: 0.4,
        ease: 'elastic.out(1.2, 0.5)'
      }, "-=0.4")

    // Continuous pulse effect for the leaf (independent of scroll)
    gsap.to(leafRef.value, {
        filter: 'drop-shadow(0 0 12px rgba(45,212,191,1))',
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    })
  }, containerRef.value) // Scope to container
})

onUnmounted(() => {
  ctx?.revert() // Cleanup GSAP to prevent memory leaks/conflicts
})
</script>

<template>
  <div ref="containerRef" class="relative inline-block py-4">
    <!-- SVG Element for the vine -->
    <svg 
      class="absolute -bottom-2 -left-8 w-[120%] h-[80px] pointer-events-none overflow-visible z-0 opacity-0 transition-opacity duration-300" 
      :class="{ '!opacity-100': true }" 
      viewBox="0 0 300 60" 
      preserveAspectRatio="none"
    >
      <!-- Vine Path with Glow -->
      <path
        ref="pathRef"
        d="M10,35 Q80,65 150,35 T290,35"
        fill="none"
        stroke="#2DD4BF"
        stroke-width="3"
        stroke-linecap="round"
        class="filter drop-shadow-[0_0_5px_rgba(45,212,191,0.5)]"
      />
      
      <!-- Leaf/Bloom at the end -->
      <g ref="leafRef" transform="translate(290, 35)">
         <circle r="4" fill="#2DD4BF" class="filter drop-shadow-[0_0_8px_rgba(45,212,191,0.8)]" />
         <path d="M0,0 C6,-6 12,-6 14,0 C12,6 6,6 0,0" fill="#ccfbf1" transform="rotate(-45) translate(2,-2)" />
         <path d="M0,0 C-6,6 -12,6 -14,0 C-12,-6 -6,-6 0,0" fill="#14b8a6" transform="rotate(-45) translate(-2,2)" />
         <!-- Extra glowing particles -->
         <circle r="1" fill="#fff" transform="translate(8, -8)" class="animate-ping" />
      </g>
    </svg>

    <!-- Text Header -->
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
          <span class="inline-block w-2"></span> <!-- Space -->
       </span>
    </h2>
  </div>
</template>

<style scoped>
svg path {
    vector-effect: non-scaling-stroke; 
}
.char {
    /* Initial state fallback if JS fails (optional, but GSAP overwrites this anyway) */
    opacity: 0; 
}
</style>
