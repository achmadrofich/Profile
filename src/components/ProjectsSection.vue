<script setup lang="ts">
import { ref, computed } from 'vue'
import { NCard, NTabs, NTabPane, NGrid, NGridItem, NTag, NButton } from 'naive-ui'

const activeTab = ref('all')

const projects = [
  {
    id: 1,
    title: 'Portfolio Website',
    description: 'A personal portfolio website built with Vue 3 and Naive UI.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
    tags: ['Vue 3', 'Naive UI', 'Tailwind'],
    category: 'frontend'
  },
  {
    id: 2,
    title: 'E-commerce Dashboard',
    description: 'Admin dashboard for managing products and orders.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
    tags: ['React', 'Node.js', 'MongoDB'],
    category: 'fullstack'
  },
  {
    id: 3,
    title: 'Weather App',
    description: 'Real-time weather application using OpenWeatherMap API.',
    image: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?q=80&w=800&auto=format&fit=crop',
    tags: ['JavaScript', 'API'],
    category: 'frontend'
  },
  {
    id: 4,
    title: 'Task Manager API',
    description: 'RESTful API for task management with authentication.',
    image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=800&auto=format&fit=crop',
    tags: ['Express', 'PostgreSQL'],
    category: 'backend'
  }
]


const filteredProjects = computed(() => {
  if (activeTab.value === 'all') return projects
  return projects.filter(p => p.category === activeTab.value)
})
</script>

<template>
  <section id="projects" class="py-24 px-6 md:px-12 bg-dark relative overflow-hidden" data-aos="fade-up">
    <!-- Background Glow -->
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-500/5 blur-[120px] rounded-full -z-0 pointer-events-none"></div>

    <div class="max-w-6xl mx-auto relative z-10">
      <h2 class="text-3xl md:text-5xl font-bold text-white mb-12 text-center tracking-tight" data-aos="fade-down">
        Featured <span class="text-teal-400">Projects</span>
      </h2>
      
      <n-tabs v-model:value="activeTab" type="segment" animated class="mb-16 max-w-md mx-auto" data-aos="fade-up" data-aos-delay="100">
        <n-tab-pane name="all" tab="All" />
        <n-tab-pane name="frontend" tab="Frontend" />
        <n-tab-pane name="backend" tab="Backend" />
        <n-tab-pane name="fullstack" tab="Full Stack" />
      </n-tabs>

      <n-grid x-gap="32" y-gap="32" cols="1 m:2 l:3" responsive="screen">
        <n-grid-item v-for="(project, index) in filteredProjects" :key="project.id" :data-aos="'fade-up'" :data-aos-delay="index * 100">
          <n-card class="bg-gray-900/40 backdrop-blur-md border border-gray-800 hover:border-teal-500/50 transition-all duration-500 h-full flex flex-col group overflow-hidden rounded-2xl" content-style="padding: 0;">
            <template #cover>
              <div class="relative overflow-hidden h-52">
                 <img :src="project.image" class="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" />
                 <div class="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
              </div>
            </template>
            <div class="p-6 flex flex-col flex-grow relative">
              <h3 class="text-2xl font-bold text-white mb-3 group-hover:text-teal-400 transition-colors">{{ project.title }}</h3>
              <p class="text-gray-400 mb-6 flex-grow leading-relaxed font-light">{{ project.description }}</p>
              
              <div class="flex flex-wrap gap-2 mb-8">
                <n-tag v-for="tag in project.tags" :key="tag" :bordered="false" class="!bg-teal-500/10 !text-teal-300 !rounded-full px-3 !font-medium">
                  #{{ tag }}
                </n-tag>
              </div>

              <div class="flex gap-4 mt-auto">
                 <n-button secondary type="primary" class="flex-1 hover:!bg-teal-500/20" strong>
                    View Code
                 </n-button>
                 <n-button type="primary" class="flex-1 shadow-lg shadow-teal-500/20" icon-placement="right">
                    Live Demo
                 </n-button>
              </div>
            </div>
          </n-card>
        </n-grid-item>
      </n-grid>
    </div>
  </section>
</template>


<style scoped>
:deep(.n-tabs-rail) {
  background-color: rgba(255, 255, 255, 0.05);
}
:deep(.n-tabs-tab) {
  color: #9ca3af;
}
:deep(.n-tabs-tab--active) {
  color: #2DD4BF;
  font-weight: 600;
}
</style>
