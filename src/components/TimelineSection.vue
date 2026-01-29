<script setup lang="ts">
import { NTimeline, NTimelineItem, NTag } from 'naive-ui'
import { BriefcaseOutline, SchoolOutline, TrendingUpOutline, StorefrontOutline, CodeSlashOutline } from '@vicons/ionicons5'

const events = [
  {
    type: 'work',
    title: 'AI & Fullstack Freelancer',
    time: '2020 - Present',
    org: 'Freelance & Projects',
    description: 'Developing high-performance applications using Laravel and Vue.js ecosystem. Integrating Solana blockchain for NFT marketplaces and GameFi projects. Leveraging AI tools (LLMs) to optimize coding workflows and automate systems.',
    icon: CodeSlashOutline,
    color: '#2DD4BF', // Teal
    tags: ['Laravel', 'Vue.js', 'Solana', 'AI Agents', 'System Architecture']
  },
  {
    type: 'work',
    title: 'Crypto Analyst & Manager',
    time: '2020 - Present',
    org: 'Binance Square & BingX',
    description: 'Managing a active crypto community of 3,000+ members. Achieved Top 3 Global Leaderboard on BingX. Regularly publishing in-depth technical analysis and market insights regarding DeFi and Web3 trends.',
    icon: TrendingUpOutline,
    color: '#60A5FA', // Blue
    tags: ['Community Management', 'Technical Analysis', 'DeFi', 'Trading Strategies']
  },
  {
    type: 'business',
    title: 'Brand Owner',
    time: '2018 - Present',
    org: 'Shopee E-commerce',
    description: 'Founder and operator of 3 successful Shopee stores. Specialized in digital branding, social media marketing, and content creation to drive organic traffic and sales growth.',
    icon: StorefrontOutline,
    color: '#FBBF24', // Amber
    tags: ['Digital Marketing', 'Branding', 'E-commerce Management', 'Content Creation']
  },
  {
    type: 'education',
    title: 'Bachelor of Informatics',
    time: '2016 - 2022',
    org: 'Univ. Muhammadiyah Sidoarjo',
    description: 'Graduated with GPA 3.30. Focused on Software Engineering methodologies, Database Systems, and organized multiple tech community events on campus.',
    icon: SchoolOutline,
    color: '#9CA3AF', // Gray
    tags: ['Software Engineering', 'Database Design', 'Leadership', 'Algorithms']
  }
]
</script>

<template>
  <section id="timeline" class="py-24 px-6 md:px-12 bg-black/20 relative overflow-hidden" data-aos="fade-up">
    <!-- Decorative Line -->
    <div class="absolute left-10 md:left-1/2 top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-teal-500/10 to-transparent"></div>

    <div class="max-w-4xl mx-auto relative z-10">
      <div class="flex flex-col items-center mb-20" data-aos="zoom-in">
         <h2 class="text-3xl md:text-5xl font-bold text-white tracking-tight text-center">Journey & <span class="text-teal-400">Experience</span></h2>
         <div class="h-1 w-24 bg-gradient-to-r from-teal-400 to-blue-500 rounded-full mt-6"></div>
      </div>

      <n-timeline size="large">
        <n-timeline-item 
          v-for="(event, index) in events" 
          :key="index" 
          :color="event.color"
          class="pb-12"
        >
          <template #icon>
            <div class="p-2 rounded-full bg-gray-900 border border-gray-700 shadow-xl relative z-20">
              <component :is="event.icon" class="w-5 h-5" :style="{ color: event.color }" />
            </div>
          </template>

          <!-- Card Content -->
          <div 
            class="ml-4 md:ml-8 p-6 md:p-8 rounded-2xl bg-gray-900/60 border border-gray-800 backdrop-blur-md hover:border-teal-500/30 hover:bg-gray-800 transition-all duration-300 group hover:-translate-y-1 hover:shadow-2xl"
            data-aos="fade-up"
            :data-aos-delay="index * 100"
          >
             <div class="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                <div>
                   <h3 class="text-xl font-bold text-white group-hover:text-teal-400 transition-colors">{{ event.title }}</h3>
                   <span class="text-sm font-medium text-gray-400 block mt-1">{{ event.org }}</span>
                </div>
                <div class="px-3 py-1 bg-white/5 rounded-full border border-white/10 text-xs font-mono text-gray-300 whitespace-nowrap self-start md:self-auto">
                   {{ event.time }}
                </div>
             </div>

             <p class="text-gray-400 leading-relaxed mb-6 font-light">
               {{ event.description }}
             </p>

             <div class="flex flex-wrap gap-2">
               <n-tag 
                 v-for="tag in event.tags" 
                 :key="tag" 
                 size="small" 
                 :bordered="false" 
                 class="!bg-black/40 !text-gray-400 !rounded-md px-2 opacity-80 group-hover:opacity-100 transition-opacity"
               >
                 #{{ tag }}
               </n-tag>
             </div>
          </div>
        </n-timeline-item>
      </n-timeline>
    </div>
  </section>
</template>

<style scoped>
:deep(.n-timeline-item-timeline__line) {
  background-color: rgba(255, 255, 255, 0.1);
}
</style>
