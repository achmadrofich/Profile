<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { NTag } from 'naive-ui'
import { SchoolOutline, TrendingUpOutline, StorefrontOutline, CodeSlashOutline } from '@vicons/ionicons5'
import GrowthHeader from './GrowthHeader.vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const events = [
  {
    type: 'work',
    title: 'AI & Fullstack Freelancer',
    time: '2020 - Present',
    org: 'Freelance & Projects',
    description: 'Developing high-performance applications using Laravel and Vue.js ecosystem. Integrating Solana blockchain for NFT marketplaces and GameFi projects. Leveraging AI tools (LLMs) to optimize coding workflows and automate systems.',
    icon: CodeSlashOutline,
    color: '#2DD4BF',
    tags: ['Laravel', 'Vue.js', 'Solana', 'AI Agents', 'System Architecture']
  },
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
  {
    type: 'education',
    title: 'Bachelor of Informatics',
    time: '2016 - 2022',
    org: 'Univ. Muhammadiyah Sidoarjo',
    description: 'Graduated with GPA 3.30. Focused on Software Engineering methodologies, Database Systems, and organized multiple tech community events on campus.',
    icon: SchoolOutline,
    color: '#9CA3AF',
    tags: ['Software Engineering', 'Database Design', 'Leadership', 'Algorithms']
  }
]

// Refs for animation
const timelinePath = ref<SVGPathElement | null>(null)
const iconRefs = ref<(HTMLElement | null)[]>([])
const cardRefs = ref<(HTMLElement | null)[]>([])
const dotRefs = ref<(SVGCircleElement | null)[]>([])

const setIconRef = (el: any, index: number) => {
  iconRefs.value[index] = el
}

const setCardRef = (el: any, index: number) => {
  cardRefs.value[index] = el
}

const setDotRef = (el: any, index: number) => {
  dotRefs.value[index] = el
}

onMounted(() => {
  // Animation setup will be added in Phase 2
})

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

      <!-- Timeline Wrapper -->
      <div class="timeline-wrapper relative">
        <!-- SVG Line Layer -->
        <svg class="timeline-svg absolute left-0 md:left-12 top-0 h-full pointer-events-none" width="120" :height="events.length * 280">
          <!-- Main connecting line -->
          <path 
            ref="timelinePath"
            :d="`M60,40 L60,${events.length * 280 - 40}`"
            class="timeline-path"
            stroke="url(#timelineGradient)"
            stroke-width="3"
            fill="none"
          />
          
          <!-- Gradient definition -->
          <defs>
            <linearGradient id="timelineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#2DD4BF" stop-opacity="0.3" />
              <stop offset="50%" stop-color="#2DD4BF" stop-opacity="0.5" />
              <stop offset="100%" stop-color="#2DD4BF" stop-opacity="0.3" />
            </linearGradient>
          </defs>
          
          <!-- Dots at connection points -->
          <circle 
            v-for="(event, index) in events"
            :key="`dot-${index}`"
            :ref="el => setDotRef(el, index)"
            :cx="60"
            :cy="40 + (index * 280)"
            r="6"
            class="timeline-dot"
            :fill="event.color"
          />
        </svg>

        <!-- Timeline Items -->
        <div 
          v-for="(event, index) in events" 
          :key="index"
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

          <!-- Content Card (Right side) -->
          <div 
            :ref="el => setCardRef(el, index)"
            class="timeline-card ml-16 md:ml-32"
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
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Timeline Wrapper */
.timeline-wrapper {
  position: relative;
  padding: 2rem 0;
}

/* SVG Layer */
.timeline-svg {
  z-index: 0;
}

.timeline-path {
  filter: drop-shadow(0 0 4px rgba(45, 212, 191, 0.3));
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
}

.timeline-dot {
  opacity: 0;
  transform-origin: center;
  transition: opacity 0.3s, transform 0.3s;
}

/* Icon Box */
.timeline-icon-box {
  width: 80px;
  height: 80px;
  border-radius: 1rem;
  background: rgba(17, 24, 39, 0.9);
  border: 2px solid rgba(75, 85, 99, 0.5);
  display: flex;
  align-items: center;
  justify-center;
  transition: all 0.3s;
  z-index: 10;
  position: relative;
}

.timeline-icon-box svg {
  color: #6B7280;
  transition: color 0.3s, filter 0.3s;
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
  border-color: rgba(45, 212, 191, 0.3);
  background: rgba(31, 41, 55, 0.6);
  transform: translateY(-2px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
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
}
</style>
