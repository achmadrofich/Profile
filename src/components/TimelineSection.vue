<script setup lang="ts">
import { NTimeline, NTimelineItem } from 'naive-ui'
</script>

<template>
  <section id="timeline" class="py-24 px-6 md:px-12 bg-black/20 relative" data-aos="fade-up">
    <!-- Decorative Line -->
    <div class="absolute left-0 top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-teal-500/20 to-transparent"></div>

    <div class="max-w-4xl mx-auto">
      <div class="flex items-center gap-4 mb-16" data-aos="fade-right">
         <h2 class="text-3xl md:text-5xl font-bold text-white tracking-tight">Experience & Education</h2>
         <div class="h-1 w-20 bg-gradient-to-r from-teal-400 to-blue-500 rounded-full"></div>
      </div>

      <n-timeline size="large">
        <n-timeline-item type="success" class="mb-8">
          <template #header>
            <span class="text-xl font-bold text-white" data-aos="fade-left">AI & Fullstack Freelancer</span>
          </template>
          <div class="text-teal-400 font-mono text-sm mb-2" data-aos="fade-left" data-aos-delay="100">2020 - Present | Freelance</div>
          <p class="text-gray-400 mt-2 leading-relaxed max-w-2xl" data-aos="fade-up" data-aos-delay="200">
            Developing applications using Laravel, Vue.js. Integrating Solana blockchain for NFT & GameFi. Using AI tools to optimize coding workflows.
          </p>
        </n-timeline-item>
        
        <n-timeline-item type="info" class="mb-8">
          <template #header>
             <span class="text-xl font-bold text-white" data-aos="fade-left">Crypto Analyst & Manager</span>
          </template>
          <div class="text-blue-400 font-mono text-sm mb-2" data-aos="fade-left" data-aos-delay="100">2020 - Present | Binance Square & BingX</div>
           <p class="text-gray-400 mt-2 leading-relaxed" data-aos="fade-up" data-aos-delay="200">
            Managing 3,000+ member crypto community. Achieved Top 3 BingX Global Leaderboard. Writing educational crypto analysis.
          </p>
        </n-timeline-item>

        <n-timeline-item type="warning" class="mb-8">
          <template #header>
             <span class="text-xl font-bold text-white" data-aos="fade-left">Brand Owner</span>
          </template>
          <div class="text-yellow-500 font-mono text-sm mb-2" data-aos="fade-left" data-aos-delay="100">2018 - Present | Shopee Store</div>
           <p class="text-gray-400 mt-2 leading-relaxed" data-aos="fade-up" data-aos-delay="200">
            Managed 3 Shopee stores. Focused on digital branding, marketing, and content creation.
          </p>
        </n-timeline-item>
        
        <n-timeline-item type="error">
          <template #header>
             <span class="text-xl font-bold text-white" data-aos="fade-left">Bachelor of Informatics</span>
          </template>
          <div class="text-gray-400 font-mono text-sm mb-2" data-aos="fade-left" data-aos-delay="100">2016 - 2022 | Univ. Muhammadiyah Sidoarjo</div>
           <p class="text-gray-400 mt-2 leading-relaxed" data-aos="fade-up" data-aos-delay="200">
            GPA: 3.30. Focused on software engineering and community leadership.
          </p>
        </n-timeline-item>
      </n-timeline>
    </div>
  </section>
</template>


<style scoped>
:deep(.n-timeline-item-content__title) {
  color: white;
  font-weight: bold;
  font-size: 1.125rem;
}
:deep(.n-timeline-item-content__time) {
  color: #2DD4BF;
}
:deep(.n-timeline-item-content__content) {
  margin-top: 4px;
}
</style>
