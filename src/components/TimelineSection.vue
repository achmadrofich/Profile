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
        <n-timeline-item
          type="success"
          class="mb-8"
        >
          <template #header>
            <span class="text-xl font-bold text-white" data-aos="fade-left">Senior Frontend Developer</span>
          </template>
          <div class="text-teal-400 font-mono text-sm mb-2" data-aos="fade-left" data-aos-delay="100">2023 - Present | Tech Solutions Inc.</div>
          <p class="text-gray-400 mt-2 leading-relaxed max-w-2xl" data-aos="fade-up" data-aos-delay="200">
            Leading the frontend team, architecting React applications, and improving performance by 40%. Implemented CI/CD pipelines and mentored junior developers.
          </p>
        </n-timeline-item>
        
        <n-timeline-item
          type="info"
          class="mb-8"
        >
          <template #header>
             <span class="text-xl font-bold text-white" data-aos="fade-left">Full Stack Developer</span>
          </template>
          <div class="text-blue-400 font-mono text-sm mb-2" data-aos="fade-left" data-aos-delay="100">2021 - 2023 | Digital Agency</div>
           <p class="text-gray-400 mt-2 leading-relaxed" data-aos="fade-up" data-aos-delay="200">
            Built responsive websites and internal tools using Vue.js and Laravel. Integrated payment gateways and optimized database queries.
          </p>
        </n-timeline-item>
        
        <n-timeline-item
          type="warning"
        >
          <template #header>
             <span class="text-xl font-bold text-white" data-aos="fade-left">B.Tech in Computer Science</span>
          </template>
          <div class="text-yellow-500 font-mono text-sm mb-2" data-aos="fade-left" data-aos-delay="100">2017 - 2021 | University of Technology</div>
           <p class="text-gray-400 mt-2 leading-relaxed" data-aos="fade-up" data-aos-delay="200">
            Graduated with honors (3.8 GPA). Active member of the coding club and organized 3 hackathons.
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
