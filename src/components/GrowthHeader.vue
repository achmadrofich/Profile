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

    // Init chars: Guarantee visibility first, then animate FROM hidden state
    const chars = containerRef.value!.querySelectorAll('.char')
    gsap.set(chars, { opacity: 1, y: 0 }) // Immediate visibility guarantee
    
    // Vine Setup
    const length = pathRef.value!.getTotalLength() + 5 // Extra buffer
    gsap.set(pathRef.value, { strokeDasharray: length, strokeDashoffset: length, opacity: 1 })
    
    // Bloom setup - Multi-stage organic growth
    if (leafRef.value) {
      const bloomCore = leafRef.value.querySelector('circle')
      const petals = leafRef.value.querySelectorAll('.petal')
      const particles = leafRef.value.querySelectorAll('.particle')
      
      gsap.set(leafRef.value, { scale: 0, opacity: 0 })
      gsap.set(bloomCore, { scale: 0 })
      gsap.set(petals, { scaleY: 0, transformOrigin: 'center bottom' })
      gsap.set(particles, { opacity: 0, y: 0 })
    }

    // Timeline - Enhanced 3-stage bloom
    tl
      // 1. Vine draws naturally
      .to(pathRef.value, {
        strokeDashoffset: 0,
        duration: 1.2,
        ease: 'power2.inOut'
      })
      // 2. Text "types" along the vine (safe animation)
      .from(chars, {
        y: 15,
        opacity: 0,
        duration: 0.8,
        stagger: 0.03,
        ease: 'power2.out'
      }, "-=0.8")
      // 3a. Seed appears
      .to(leafRef.value, {
        scale: 1,
        opacity: 1,
        duration: 0.2,
        ease: 'power1.out'
      }, "-=0.2")
      // 3b. Core expands
      .to(leafRef.value.querySelector('circle'), {
        scale: 1,
        duration: 0.3,
        ease: 'back.out(2)'
      }, "-=0.1")
      // 3c. Petals unfold sequentially
      .to(leafRef.value.querySelectorAll('.petal'), {
        scaleY: 1,
        duration: 0.4,
        stagger: 0.08,
        ease: 'back.out(1.7)'
      }, "-=0.2")
      // 3d. Particles float up
      .to(leafRef.value.querySelectorAll('.particle'), {
        opacity: 1,
        y: -15,
        duration: 1.5,
        stagger: 0.2,
        ease: 'power1.out'
      }, "-=0.3")
      .to(leafRef.value.querySelectorAll('.particle'), {
        opacity: 0,
        duration: 0.5
      }, "-=0.5")
    
    // Subtle breathing glow (continuous)
    gsap.to(leafRef.value, {
        filter: 'drop-shadow(0 0 8px rgba(45,212,191,0.7))',
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

      <!-- Full-width Organic Cubic Bezier Curve (0 to 300) -->
      <path
        ref="pathRef"
        d="M0,28 C75,40 225,40 300,24"
        fill="none"
        stroke="url(#premiumVine)"
        stroke-width="3"
        stroke-linecap="round"
        class="filter drop-shadow-[0_0_2px_rgba(45,212,191,0.3)]"
      />
      
      <!-- Bloom at exact endpoint (300, 24) -->
      <g ref="leafRef" transform="translate(300, 24)">
         <!-- Core -->
         <circle r="3.5" fill="#5EEAD4" />
         
         <!-- Petals (4 organic asymmetric petals) -->
         <path class="petal" d="M0,0 C2,-5 8,-6 9,0 C7,5 2,4 0,0" fill="#ccfbf1" transform="rotate(0)" />
         <path class="petal" d="M0,0 C2,-5 8,-6 9,0 C7,5 2,4 0,0" fill="#99f6e4" transform="rotate(90)" />
         <path class="petal" d="M0,0 C2,-5 8,-6 9,0 C7,5 2,4 0,0" fill="#5eead4" transform="rotate(180)" />
         <path class="petal" d="M0,0 C2,-5 8,-6 9,0 C7,5 2,4 0,0" fill="#2dd4bf" transform="rotate(270)" />
         
         <!-- Floating Particles (3 pollen dots) -->
         <circle class="particle" r="1.2" fill="#f0fdfa" transform="translate(-3, 0)" />
         <circle class="particle" r="1" fill="#f0fdfa" transform="translate(3, 0)" />
         <circle class="particle" r="1.5" fill="#f0fdfa" transform="translate(0, -3)" />
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
