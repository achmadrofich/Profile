<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { NTag } from 'naive-ui'
import { SchoolOutline, TrendingUpOutline, StorefrontOutline, CodeSlashOutline, GridOutline, BriefcaseOutline, BusinessOutline } from '@vicons/ionicons5'
import GrowthHeader from './GrowthHeader.vue'
import MemoryModal from './MemoryModal.vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Modal state
const showModal = ref(false)
const selectedEvent = ref<typeof events[0] | null>(null)

const openMemory = (event: typeof events[0]) => {
  selectedEvent.value = event
  showModal.value = true
}

const closeMemory = () => {
  showModal.value = false
  selectedEvent.value = null
  // Restore body scroll - NModal sometimes doesn't properly restore this
  // Naive UI adds overflow:hidden to BOTH html and body elements
  nextTick(() => {
    document.documentElement.style.overflow = ''
    document.body.style.overflow = ''
    document.body.style.paddingRight = ''
  })
}

const events = [
  // 1. Education - Start of the journey (2016-2022)
  {
    type: 'education',
    title: 'Bachelor of Informatics',
    time: '2016 - 2022',
    org: 'Univ. Muhammadiyah Sidoarjo',
    description: 'Graduated with GPA 3.30. Focused on Software Engineering methodologies, Database Systems, and organized multiple tech community events on campus.',
    icon: SchoolOutline,
    color: '#9CA3AF',
    tags: ['Software Engineering', 'Database Design', 'Leadership', 'Algorithms']
  },
  // 2. First Business Venture (2018-Present)
  {
    type: 'business',
    title: 'Brand Owner',
    time: '2018 - Present',
    org: 'Shopee E-commerce',
    description: 'Founder and operator of 3 successful Shopee stores. Specialized in digital branding, social media marketing, and content creation to drive organic traffic and sales growth.',
    icon: StorefrontOutline,
    color: '#FBBF24',
    tags: ['Digital Marketing', 'Branding', 'E-commerce Management', 'Content Creation']
  },
  // 3. Crypto Journey (2020-Present)
  {
    type: 'work',
    title: 'Crypto Analyst & Manager',
    time: '2020 - Present',
    org: 'Binance Square & BingX',
    description: 'Managing a active crypto community of 3,000+ members. Achieved Top 3 Global Leaderboard on BingX. Regularly publishing in-depth technical analysis and market insights regarding DeFi and Web3 trends.',
    icon: TrendingUpOutline,
    color: '#60A5FA',
    tags: ['Community Management', 'Technical Analysis', 'DeFi', 'Trading Strategies']
  },
  // 4. Current Focus - AI & Development (2020-Present)
  {
    type: 'work',
    title: 'AI & Fullstack Freelancer',
    time: '2020 - Present',
    org: 'Freelance & Projects',
    description: 'Developing high-performance applications using Laravel and Vue.js ecosystem. Integrating Solana blockchain for NFT marketplaces and GameFi projects. Leveraging AI tools (LLMs) to optimize coding workflows and automate systems.',
    icon: CodeSlashOutline,
    color: '#2DD4BF',
    tags: ['Laravel', 'Vue.js', 'Solana', 'AI Agents', 'System Architecture']
  }
]

// Filter categories
const filterCategories = [
  { id: 'all', label: 'All', icon: GridOutline },
  { id: 'work', label: 'Work', icon: BriefcaseOutline },
  { id: 'education', label: 'Education', icon: SchoolOutline },
  { id: 'business', label: 'Business', icon: BusinessOutline }
]

// Active filter state
const activeFilter = ref('all')

// Filtered events based on active filter
const filteredEvents = computed(() => {
  if (activeFilter.value === 'all') return events
  return events.filter(e => e.type === activeFilter.value)
})

// Refs for animation
const iconRefs = ref<(HTMLElement | null)[]>([])
const cardRefs = ref<(HTMLElement | null)[]>([])
const timelineLineRef = ref<HTMLElement | null>(null)

const setIconRef = (el: any, index: number) => {
  iconRefs.value[index] = el
}

const setCardRef = (el: any, index: number) => {
  cardRefs.value[index] = el
}

onMounted(() => {
  // Phase 3: Icon Activation (Glow Effect)
  iconRefs.value.forEach((icon, index) => {
    if (!icon) return
    
    ScrollTrigger.create({
      trigger: icon,
      start: 'top 70%',
      end: 'bottom 30%',
      onEnter: () => activateIcon(icon, index),
      onLeaveBack: () => deactivateIcon(icon)
    })
  })
  
  // Phase 4: Card Transitions (Fade-in from left)
  cardRefs.value.forEach((card) => {
    if (!card) return
    
    // Initial state: hidden
    gsap.set(card, {
      opacity: 0,
      x: -50
    })
    
    // Animate in
    gsap.to(card, {
      opacity: 1,
      x: 0,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: card,
        start: 'top 75%',
        toggleActions: 'play none none reverse'
      }
    })
    
    // Label slide-in with delay
    const label = card.querySelector('.timeline-label')
    if (label) {
      gsap.from(label, {
        opacity: 0,
        x: -30,
        duration: 0.6,
        delay: 0.3,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 75%',
          toggleActions: 'play none none reverse'
        }
      })
    }
  })
  
  // Phase 5: Progressive Line Drawing
  nextTick(() => {
    const lineEl = timelineLineRef.value
    if (lineEl) {
      // Set initial state via GSAP
      gsap.set(lineEl, { scaleY: 0, transformOrigin: 'top' })
      
      // Animate scaleY on scroll
      gsap.to(lineEl, {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: '.timeline-wrapper',
          start: 'top 80%',
          end: 'bottom 40%',
          scrub: 1.5
        }
      })
    }
  })
})

// Helper: Activate icon with glow
const activateIcon = (icon: HTMLElement, index: number) => {
  icon.classList.add('active')
  
  gsap.to(icon, {
    scale: 1.1,
    duration: 0.5,
    ease: 'back.out(1.7)'
  })
  
  // Animate icon svg color
  const iconSvg = icon.querySelector('svg')
  if (iconSvg && events[index]) {
    gsap.to(iconSvg, {
      color: events[index].color,
      duration: 0.4
    })
  }
}

// Helper: Deactivate icon
const deactivateIcon = (icon: HTMLElement) => {
  icon.classList.remove('active')
  
  gsap.to(icon, {
    scale: 1,
    duration: 0.3
  })
  
  const iconSvg = icon.querySelector('svg')
  if (iconSvg) {
    gsap.to(iconSvg, {
      color: '#6B7280',
      duration: 0.3
    })
  }
}

onUnmounted(() => {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill())
})
</script>

<template>
  <section id="timeline" class="py-24 px-6 md:px-12 bg-black/20 relative overflow-hidden" data-aos="fade-up">
    <div class="max-w-5xl mx-auto relative z-10">
      <div class="flex flex-col items-center mb-20 text-center">
         <GrowthHeader text="Journey & Experience" highlight="Experience" />
      </div>

      <!-- Filter Pills -->
      <div class="filter-pills flex flex-wrap justify-center gap-3 mb-12">
        <button
          v-for="cat in filterCategories"
          :key="cat.id"
          @click="activeFilter = cat.id"
          class="filter-pill"
          :class="{ 'active': activeFilter === cat.id }"
        >
          <component :is="cat.icon" class="w-4 h-4" />
          <span>{{ cat.label }}</span>
        </button>
      </div>

      <!-- Timeline Wrapper with CSS line -->
      <div class="timeline-wrapper relative">
        <!-- Progressive Vertical Line -->
        <div ref="timelineLineRef" class="timeline-line-progressive" />

        <!-- Timeline Items -->
        <TransitionGroup name="timeline-fade" tag="div">
          <div 
            v-for="(event, index) in filteredEvents" 
            :key="event.title"
            class="timeline-item relative mb-8"
            :style="{ minHeight: '280px' }"
          >
          <!-- Icon Box (Left side) -->
          <div 
            :ref="el => setIconRef(el, index)"
            class="timeline-icon-box absolute left-0 md:left-12 transform -translate-x-1/2"
            :style="{ top: '20px' }"
          >
            <component :is="event.icon" class="w-10 h-10" />
          </div>

          <!-- Content Card (Right side) - Clickable for Memory -->
          <div 
            :ref="el => setCardRef(el, index)"
            class="timeline-card ml-16 md:ml-32 cursor-pointer group"
            @click="openMemory(event)"
            role="button"
            :aria-label="`View details for ${event.title}`"
          >
            <!-- Period Label -->
            <span class="timeline-label">
              {{ event.time }}
            </span>

            <!-- Title & Organization -->
            <div class="mb-4">
              <h3 class="text-2xl font-bold text-white mb-2">{{ event.title }}</h3>
              <span class="text-sm font-medium text-gray-400">{{ event.org }}</span>
            </div>

            <!-- Description -->
            <p class="text-gray-400 leading-relaxed mb-6 font-light">
              {{ event.description }}
            </p>

            <!-- Tags -->
            <div class="flex flex-wrap gap-2">
              <n-tag 
                v-for="tag in event.tags" 
                :key="tag" 
                size="small" 
                :bordered="false" 
                class="!bg-black/40 !text-gray-400 !rounded-md px-2"
              >
                #{{ tag }}
              </n-tag>
            </div>
          </div>
        </div>
        </TransitionGroup>
      </div>
    </div>
    
    <!-- Memory Modal -->
    <MemoryModal 
      :show="showModal" 
      :event="selectedEvent" 
      @close="closeMemory" 
    />
  </section>
</template>

<style scoped>
/* Filter Pills */
.filter-pill {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1.25rem;
  border-radius: 9999px;
  background: rgba(17, 24, 39, 0.8);
  border: 1px solid rgba(75, 85, 99, 0.4);
  color: #9CA3AF;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.filter-pill:hover {
  border-color: rgba(45, 212, 191, 0.4);
  color: #D1D5DB;
  transform: translateY(-2px);
}

.filter-pill.active {
  background: rgba(45, 212, 191, 0.15);
  border-color: rgba(45, 212, 191, 0.6);
  color: #2DD4BF;
  box-shadow: 
    0 0 15px rgba(45, 212, 191, 0.3),
    inset 0 0 10px rgba(45, 212, 191, 0.1);
}

.filter-pill.active svg {
  filter: drop-shadow(0 0 4px currentColor);
}

/* Timeline Transition Animations */
.timeline-fade-enter-active,
.timeline-fade-leave-active {
  transition: all 0.4s ease;
}

.timeline-fade-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.timeline-fade-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.timeline-fade-move {
  transition: transform 0.4s ease;
}

/* Timeline Wrapper with connecting line */
.timeline-wrapper {
  position: relative;
  padding: 2rem 0;
}

/* Progressive Vertical Line */
.timeline-line-progressive {
  position: absolute;
  left: 40px;
  top: 60px;
  bottom: 340px;
  width: 3px;
  background: linear-gradient(
    to bottom,
    rgba(45, 212, 191, 0.2) 0%,
    rgba(45, 212, 191, 0.6) 10%,
    rgba(45, 212, 191, 1) 50%,
    rgba(45, 212, 191, 0.6) 90%,
    rgba(45, 212, 191, 0.2) 100%
  );
  border-radius: 2px;
  box-shadow: 
    0 0 10px rgba(45, 212, 191, 0.5),
    0 0 20px rgba(45, 212, 191, 0.3),
    0 0 30px rgba(45, 212, 191, 0.2);
  z-index: 1;
  transform-origin: top;
  /* Will be animated via GSAP */
}

/* Remove old ::before line since using div now */
.timeline-wrapper::before {
  display: none;
}

/* Responsive: Adjust line position on mobile */
@media (max-width: 768px) {
  .timeline-line-progressive {
    left: 30px;
  }
}

/* Icon Box */
.timeline-icon-box {
  width: 80px;
  height: 80px;
  border-radius: 1rem;
  background: #111827; /* Solid gray-900 color to hide the line behind */
  border: 2px solid rgba(75, 85, 99, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  z-index: 10;
  position: relative;
}

.timeline-icon-box svg {
  color: #6B7280;
  transition: color 0.3s, filter 0.3s;
}

/* Active State (Premium Glow Effect) */
.timeline-icon-box.active {
  border-color: var(--teal-400);
  background: linear-gradient(135deg, #0f1820 0%, #111827 100%); /* Solid dark with subtle teal tint */
  box-shadow: 
    0 0 20px rgba(45, 212, 191, 0.4),
    0 0 40px rgba(45, 212, 191, 0.2),
    0 0 60px rgba(45, 212, 191, 0.1),
    inset 0 0 20px rgba(45, 212, 191, 0.15);
  animation: pulse-glow 2s ease-in-out infinite;
}

.timeline-icon-box.active svg {
  filter: drop-shadow(0 0 8px currentColor);
}

/* Pulse Glow Animation */
@keyframes pulse-glow {
  0%, 100% {
    box-shadow: 
      0 0 20px rgba(45, 212, 191, 0.4),
      0 0 40px rgba(45, 212, 191, 0.2),
      0 0 60px rgba(45, 212, 191, 0.1),
      inset 0 0 20px rgba(45, 212, 191, 0.15);
  }
  50% {
    box-shadow: 
      0 0 30px rgba(45, 212, 191, 0.6),
      0 0 60px rgba(45, 212, 191, 0.3),
      0 0 90px rgba(45, 212, 191, 0.15),
      inset 0 0 30px rgba(45, 212, 191, 0.2);
  }
}

/* Timeline Card */
.timeline-card {
  background: rgba(17, 24, 39, 0.6);
  border: 1px solid rgba(75, 85, 99, 0.3);
  border-radius: 1rem;
  padding: 2rem;
  backdrop-filter: blur(10px);
  transition: all 0.3s;
  position: relative;
  z-index: 5;
}

.timeline-card:hover {
  border-color: rgba(45, 212, 191, 0.4);
  background: rgba(31, 41, 55, 0.8);
  transform: translateY(-4px) scale(1.01);
  box-shadow: 
    0 12px 40px rgba(0, 0, 0, 0.4),
    0 0 20px rgba(45, 212, 191, 0.1);
}

/* Click hint on hover */
.timeline-card::after {
  content: 'Click to explore →';
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  font-size: 0.75rem;
  color: rgba(45, 212, 191, 0);
  transition: color 0.3s;
}

.timeline-card:hover::after {
  color: rgba(45, 212, 191, 0.6);
}

/* Period Label */
.timeline-label {
  display: inline-block;
  padding: 0.5rem 1rem;
  background: rgba(45, 212, 191, 0.1);
  color: var(--teal-400);
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 600;
  border: 1px solid rgba(45, 212, 191, 0.2);
  margin-bottom: 1rem;
}

/* Mobile Adjustments */
@media (max-width: 768px) {
  .timeline-svg {
    left: 0 !important;
  }
  
  .timeline-icon-box {
    width: 60px;
    height: 60px;
    left: 0 !important;
  }
  
  .timeline-icon-box svg {
    width: 30px;
    height: 30px;
  }
  
  .timeline-card {
    margin-left: 80px !important;
  }
  
  /* Reduce glow intensity on mobile for performance */
  .timeline-icon-box.active {
    box-shadow: 
      0 0 15px rgba(45, 212, 191, 0.3),
      0 0 30px rgba(45, 212, 191, 0.15),
      inset 0 0 15px rgba(45, 212, 191, 0.1);
  }
  
  @keyframes pulse-glow {
    0%, 100% {
      box-shadow: 
        0 0 15px rgba(45, 212, 191, 0.3),
        0 0 30px rgba(45, 212, 191, 0.15),
        inset 0 0 15px rgba(45, 212, 191, 0.1);
    }
    50% {
      box-shadow: 
        0 0 20px rgba(45, 212, 191, 0.4),
        0 0 40px rgba(45, 212, 191, 0.2),
        inset 0 0 20px rgba(45, 212, 191, 0.15);
    }
  }
}

/* Performance Optimizations */
.timeline-icon-box.active {
  will-change: transform, box-shadow;
}

.timeline-card {
  will-change: transform, opacity;
  transform: translateZ(0); /* Force GPU acceleration */
}

.timeline-path {
  will-change: stroke-dashoffset;
}

/* Tag Hover Enhancement */
.timeline-card :deep(.n-tag) {
  transition: all 0.3s ease;
}

.timeline-card:hover :deep(.n-tag) {
  opacity: 1 !important;
  transform: translateY(-2px);
}
</style>

