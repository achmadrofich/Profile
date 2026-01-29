<script setup lang="ts">
import { ref, computed } from 'vue'
import { NCard, NTabs, NTabPane, NGrid, NGridItem, NTag, NButton, NTooltip } from 'naive-ui'
import { LogoGithub, GlobeOutline } from '@vicons/ionicons5'

const activeTab = ref('all')

const projects = [
  {
    id: 1,
    title: 'My Web Portfolio',
    description: 'Personal portfolio website showcasing my skills and projects in AI & Blockchain.',
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=800&auto=format&fit=crop',
    tags: [
      { name: 'Vue.js', detail: 'v3.4 + Composition API' },
      { name: 'Vercel', detail: 'Automated CI/CD & Analytics' },
      { name: 'Tailwind', detail: 'v3.4 + Custom Design System' }
    ],
    category: 'frontend',
    link: 'https://rexweb3.vercel.app/'
  },
  {
    id: 2,
    title: 'Web3 Wallet Auth',
    description: 'Backend services to interact with smart contracts and handle transaction lifecycles.',
    image: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?q=80&w=800&auto=format&fit=crop',
    tags: [
      { name: 'Backend', detail: 'Node.js + Express' },
      { name: 'Web3', detail: 'Ethers.js & Wagmi' },
      { name: 'EVM', detail: 'Ethereum & BSC Support' }
    ],
    category: 'blockchain'
  },
  {
    id: 3,
    title: 'Smart Contract Interaction',
    description: 'Implemented read/write operations via ABI and gas awareness mechanisms.',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=800&auto=format&fit=crop',
    tags: [
      { name: 'Solidity', detail: 'v0.8.20 + Optimization' },
      { name: 'ABI', detail: 'Dynamic Interface Parsing' },
      { name: 'Security', detail: 'Re-entrancy Guard Implementation' }
    ],
    category: 'blockchain'
  },
  {
    id: 4,
    title: 'Blockchain Event Indexer',
    description: 'Listener for on-chain events normalizing data into structured SQL format.',
    image: 'https://images.unsplash.com/photo-1644361566696-3d442b5b482a?q=80&w=800&auto=format&fit=crop',
    tags: [
      { name: 'SQL', detail: 'PostgreSQL + Normalization' },
      { name: 'Indexer', detail: 'Real-time Block Listening' },
      { name: 'Analytics', detail: 'Grafana Dashboard Integration' }
    ],
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
        <n-tab-pane name="blockchain" tab="Blockchain" />
        <n-tab-pane name="backend" tab="Backend" />
        <n-tab-pane name="frontend" tab="Frontend" />
      </n-tabs>

      <n-grid x-gap="32" y-gap="32" cols="1 m:2 l:3" responsive="screen">
        <n-grid-item v-for="(project, index) in filteredProjects" :key="project.id" :data-aos="'fade-up'" :data-aos-delay="index * 100">
          <n-card class="bg-gray-900/40 backdrop-blur-md border border-gray-800 hover:border-teal-500/50 transition-all duration-500 h-full flex flex-col group overflow-hidden rounded-2xl hover:bg-gray-800/60 hover:-translate-y-2 hover:shadow-2xl hover:shadow-teal-900/20" content-style="padding: 0;">
            <template #cover>
              <div class="relative overflow-hidden h-52">
                 <img :src="project.image" class="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" />
                 <div class="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent opacity-80 decoration-clone pointer-events-none"></div>
                 
                 <!-- Category Badge -->
                 <div class="absolute top-4 right-4 px-3 py-1 bg-black/60 backdrop-blur-md text-xs font-bold text-teal-400 rounded-full border border-teal-500/30 uppercase tracking-widest">
                    {{ project.category }}
                 </div>
              </div>
            </template>
            <div class="p-6 flex flex-col flex-grow relative">
              <h3 class="text-2xl font-bold text-white mb-3 group-hover:text-teal-400 transition-colors">{{ project.title }}</h3>
              <p class="text-gray-400 mb-6 flex-grow leading-relaxed font-light text-sm">{{ project.description }}</p>
              
              <div class="flex flex-wrap gap-2 mb-8">
                <n-tooltip trigger="hover" placement="top" v-for="tag in project.tags" :key="tag.name">
                  <template #trigger>
                    <n-tag :bordered="false" class="!bg-teal-500/10 !text-teal-300 !rounded-full px-3 !font-medium cursor-help hover:!bg-teal-500/20 transition-colors">
                      #{{ tag.name }}
                    </n-tag>
                  </template>
                  {{ tag.detail }}
                </n-tooltip>
              </div>

              <div class="flex gap-4 mt-auto">
                 <n-button secondary type="primary" class="flex-1 hover:!bg-teal-500/20" strong>
                    <template #icon><LogoGithub /></template>
                    Code
                 </n-button>
                 <n-button type="primary" class="flex-1 shadow-lg shadow-teal-500/20" icon-placement="right" v-if="project.link" tag="a" :href="project.link" target="_blank">
                    <template #icon><GlobeOutline /></template>
                    Demo
                 </n-button>
                 <n-button type="primary" class="flex-1 shadow-lg shadow-teal-500/20" icon-placement="right" v-else disabled>
                    <template #icon><GlobeOutline /></template>
                    Demo
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
