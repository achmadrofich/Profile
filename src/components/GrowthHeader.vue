<script setup lang="ts">
import { onMounted, ref } from 'vue'
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

onMounted(() => {
  if (!containerRef.value || !pathRef.value) return

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: containerRef.value,
      start: 'top 80%', // Animation starts when top of header hits 80% of viewport height
      toggleActions: 'play none none reverse'
    }
  })

  // Text appearance
  tl.from(containerRef.value.querySelectorAll('.char'), {
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.05,
    ease: 'back.out(1.7)'
  })

  // Vine Drawing
  const length = pathRef.value.getTotalLength()
  gsap.set(pathRef.value, { strokeDasharray: length, strokeDashoffset: length })
  
  tl.to(pathRef.value, {
    strokeDashoffset: 0,
    duration: 1.5,
    ease: 'power2.out'
  }, "-=0.5")

  // Leaf growing
  if (leafRef.value) {
      tl.from(leafRef.value, {
          scale: 0,
          opacity: 0,
          duration: 0.5,
          ease: 'elastic.out(1, 0.5)'
      }, "-=0.5")
  }
})
</script>

<template>
  <div ref="containerRef" class="relative inline-block py-4">
    <!-- SVG Element for the vine -->
    <svg 
      class="absolute -bottom-2 -left-4 w-[110%] h-[60px] pointer-events-none overflow-visible z-0" 
      viewBox="0 0 300 60" 
      preserveAspectRatio="none"
    >
      <!-- Vine Path -->
      <path
        ref="pathRef"
        d="M10,25 Q80,55 150,25 T290,25"
        fill="none"
        stroke="#2DD4BF"
        stroke-width="3"
        stroke-linecap="round"
        class="filter drop-shadow-[0_0_5px_rgba(45,212,191,0.5)]"
      />
      
      <!-- Leaf/Bloom at the end -->
      <g ref="leafRef" transform="translate(290, 25)">
         <circle r="4" fill="#2DD4BF" class="filter drop-shadow-[0_0_8px_rgba(45,212,191,0.8)]" />
         <path d="M0,0 C5,-5 10,-5 12,0 C10,5 5,5 0,0" fill="#ccfbf1" transform="rotate(-45) translate(2,-2)" />
         <path d="M0,0 C-5,5 -10,5 -12,0 C-10,-5 -5,-5 0,0" fill="#14b8a6" transform="rotate(-45) translate(-2,2)" />
      </g>
    </svg>

    <!-- Text Header -->
    <h2 class="relative z-10 text-3xl md:text-5xl font-bold text-white tracking-tight flex gap-3">
       <span v-for="(word, i) in text.split(' ')" :key="i" class="inline-block whitespace-nowrap mb-1">
           <!-- Split word into characters for animation -->
          <span 
            v-for="(char, j) in word" 
            :key="j" 
            class="char inline-block"
             :class="{ 'text-teal-400': highlight.includes(word) }"
          >
            {{ char }}
          </span>
          <span class="inline-block w-2"></span> <!-- Space -->
       </span>
       
       <!-- Handle Separate Highlight Prop specifically for whole words logic if needed, 
            but for now the loop above handles basic "if word is in highlight string" logic roughly.
            Better approach: Just render text and let CSS or manual span splitting handle colors? 
            Let's keep it simple: Render the main text. Highlight logic in template is tricky with char splitting.
            
            Revised simpler text rendering for robustness:
       -->
    </h2>
  </div>
</template>

<style scoped>
/* Ensure the svg scales nicely */
svg path {
    vector-effect: non-scaling-stroke; 
}
</style>
