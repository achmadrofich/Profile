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
const pathRef1 = ref<SVGPathElement | null>(null)
const pathRef2 = ref<SVGPathElement | null>(null)
const leafRef = ref<SVGGElement | null>(null)
let ctx: gsap.Context | null = null

onMounted(async () => {
  await nextTick()
  if (!containerRef.value || !pathRef1.value || !pathRef2.value) return

  ctx = gsap.context(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.value,
        start: 'top 95%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    })

    gsap.set(containerRef.value!.querySelectorAll('.char'), { y: 30, opacity: 0 })
    
    // Setup Lines
    const len1 = pathRef1.value!.getTotalLength()
    const len2 = pathRef2.value!.getTotalLength()
    gsap.set(pathRef1.value, { strokeDasharray: len1, strokeDashoffset: len1, opacity: 1 })
    gsap.set(pathRef2.value, { strokeDasharray: len2, strokeDashoffset: len2, opacity: 1 })
    
    if (leafRef.value) gsap.set(leafRef.value, { scale: 0, opacity: 0 })

    tl
      // 1. Double Helix draws simultaneously
      .to([pathRef1.value, pathRef2.value], {
        strokeDashoffset: 0,
        duration: 1.4,
        ease: 'power2.inOut',
        stagger: 0.1
      })
      // 2. Text appears
      .to(containerRef.value!.querySelectorAll('.char'), {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.03,
        ease: 'back.out(1.5)'
      }, "-=1.0")
      // 3. Bloom
      .to(leafRef.value, {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: 'elastic.out(1.2, 0.5)'
      }, "-=0.5")

    // Pulse
    gsap.to(leafRef.value, {
        filter: 'drop-shadow(0 0 15px rgba(45,212,191,1))',
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
      class="absolute -bottom-1 -left-10 w-[125%] h-[90px] pointer-events-none overflow-visible z-0 opacity-0 transition-opacity duration-300" 
      :class="{ '!opacity-100': true }" 
      viewBox="0 0 300 60" 
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="vineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#2DD4BF" stop-opacity="0" />
          <stop offset="50%" stop-color="#2DD4BF" />
          <stop offset="100%" stop-color="#3B82F6" />
        </linearGradient>
      </defs>

      <!-- Path 1 (Helix A) -->
      <path
        ref="pathRef1"
        d="M0,35 C50,55 100,15 150,35 C200,55 250,15 300,35"
        fill="none"
        stroke="url(#vineGradient)"
        stroke-width="2"
        stroke-linecap="round"
        class="filter drop-shadow-[0_0_3px_rgba(45,212,191,0.3)]"
      />

      <!-- Path 2 (Helix B - Inverted Control Points) -->
      <path
        ref="pathRef2"
        d="M0,35 C50,15 100,55 150,35 C200,15 250,55 300,35"
        fill="none"
        stroke="url(#vineGradient)"
        stroke-width="2"
        stroke-linecap="round"
        class="filter drop-shadow-[0_0_3px_rgba(59,130,246,0.3)] opacity-70"
      />
      
      <!-- Bloom -->
      <g ref="leafRef" transform="translate(300, 35)">
         <circle r="5" fill="#2DD4BF" class="filter drop-shadow-[0_0_10px_rgba(45,212,191,0.8)]" />
         <!-- Organic Petals -->
         <path d="M0,0 C6,-8 14,-8 16,0 C14,8 6,8 0,0" fill="#ccfbf1" transform="rotate(-45) translate(3,-3)" />
         <path d="M0,0 C-6,8 -14,8 -16,0 C-14,-8 -6,-8 0,0" fill="#3B82F6" transform="rotate(-45) translate(-3,3)" />
         <path d="M0,0 C8,6 8,14 0,16 C-8,14 -8,6 0,0" fill="#14b8a6" transform="rotate(-45)" />
         
         <circle r="2" fill="#fff" class="animate-ping" />
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
.char {
    opacity: 0; 
}
</style>
