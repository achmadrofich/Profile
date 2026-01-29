<script setup lang="ts">
import { ref } from 'vue'
import { NCard, NGrid, NGridItem, NModal, NProgress } from 'naive-ui'
import { CloseCircleOutline } from '@vicons/ionicons5'

interface Skill {
  name: string
  icon: string
  proficiency: number
  experience: string
  description: string
  projects: string[]
}

const skills: Skill[] = [
  { 
    name: 'Blockchain', 
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/solidity/solidity-original.svg',
    proficiency: 90,
    experience: '3+ Years',
    description: 'Specialized in Smart Contract development (Solidity), DeFi protocols, and Web3 integration.',
    projects: ['Web3 Wallet Auth', 'Smart Contract Interactions']
  },
  { 
    name: 'Laravel', 
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg',
    proficiency: 95,
    experience: '4+ Years',
    description: 'Expert in building robust REST APIs, heavy background jobs, and scalable backend architecture.',
    projects: ['E-commerce Backend', 'CRM Systems']
  },
  { 
    name: 'Vue.js', 
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg',
    proficiency: 88,
    experience: '3 Years',
    description: 'Building reactive Single Page Applications (SPA) with Composition API and Pinia.',
    projects: ['My Web Portfolio', 'Crypto Dashboard']
  },
  { 
    name: 'Python', 
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    proficiency: 85,
    experience: '3 Years',
    description: 'Utilized for AI/ML model development, data analysis, and automation scripts.',
    projects: ['AI Chatbot', 'Market Analysis Tool']
  },
  { 
    name: 'TensorFlow', 
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg',
    proficiency: 80,
    experience: '2 Years',
    description: 'Developing and training Neural Networks for predictive text and image recognition.',
    projects: ['Image Classifier', 'Demand Prediction']
  },
  { 
    name: 'Node.js', 
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
    proficiency: 85,
    experience: '3 Years',
    description: 'Server-side JavaScript for real-time applications and microservices.',
    projects: ['Realtime Chat App', 'API Gateway']
  },
  { 
    name: 'MySQL', 
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
    proficiency: 92,
    experience: '5+ Years',
    description: 'Complex query optimization, database design, and normalization for high-performance apps.',
    projects: ['Enterprise ERP', 'User Management System']
  },
  { 
    name: 'Figma', 
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
    proficiency: 75,
    experience: '2 Years',
    description: 'UI/UX prototyping and design systems for web and mobile applications.',
    projects: ['Portfolio Design', 'App Mockups']
  },
]

const showModal = ref(false)
const selectedSkill = ref<Skill | null>(null)

const openSkillDetail = (skill: Skill) => {
  selectedSkill.value = skill
  showModal.value = true
}
</script>

<template>
  <section id="skills" class="py-24 px-6 md:px-12 bg-black/20 relative" data-aos="fade-up">
    <div class="max-w-6xl mx-auto">
      <div class="flex items-center gap-4 mb-16 justify-center" data-aos="zoom-in">
         <h2 class="text-3xl md:text-5xl font-bold text-white text-center tracking-tight">My <span class="text-teal-400">Skills</span></h2>
      </div>

      <n-grid x-gap="24" y-gap="24" cols="2 s:3 m:4 l:4" responsive="screen">
        <n-grid-item v-for="(skill, index) in skills" :key="skill.name" :data-aos="'fade-up'" :data-aos-delay="index * 50">
          <n-card 
            class="hover:border-teal-400/50 hover:bg-gray-800/80 transition-all duration-300 bg-gray-900/40 border-gray-800 backdrop-blur-sm group cursor-pointer hover:-translate-y-2 hover:shadow-xl hover:shadow-teal-500/10" 
            :bordered="true"
            @click="openSkillDetail(skill)"
          >
            <div class="flex flex-col items-center justify-center gap-6 py-6">
              <img :src="skill.icon" :alt="skill.name" class="w-16 h-16 group-hover:scale-110 transition-transform duration-300 drop-shadow-lg" />
              <span class="font-semibold text-gray-200 text-lg group-hover:text-teal-400 transition-colors">{{ skill.name }}</span>
            </div>
            <!-- Hint overlay -->
            <div class="absolute inset-0 bg-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-2">
                <span class="text-xs text-teal-300 font-medium">Click for details</span>
            </div>
          </n-card>
        </n-grid-item>
      </n-grid>

      <!-- Skill Detail Modal -->
      <n-modal v-model:show="showModal" transform-origin="center">
        <n-card
          style="width: 600px; max-width: 90vw;"
          :bordered="false"
          size="huge"
          role="dialog"
          aria-modal="true"
          class="bg-gray-900 border border-teal-500/30 shadow-2xl shadow-teal-500/20"
        >
          <template #header-extra>
            <button @click="showModal = false" class="text-gray-400 hover:text-white transition-colors">
              <CloseCircleOutline class="w-8 h-8" />
            </button>
          </template>

          <div v-if="selectedSkill" class="flex flex-col gap-6">
             <div class="flex items-center gap-6">
                <div class="p-4 bg-gray-800 rounded-2xl border border-white/10">
                   <img :src="selectedSkill.icon" :alt="selectedSkill.name" class="w-20 h-20" />
                </div>
                <div>
                   <h3 class="text-3xl font-bold text-white mb-2">{{ selectedSkill.name }}</h3>
                   <div class="inline-block px-3 py-1 rounded-full bg-teal-500/20 text-teal-400 text-sm font-medium">
                      {{ selectedSkill.experience }} Experience
                   </div>
                </div>
             </div>

             <div class="space-y-4">
                <div>
                   <div class="flex justify-between text-sm text-gray-400 mb-1">
                      <span>Proficiency</span>
                      <span>{{ selectedSkill.proficiency }}%</span>
                   </div>
                   <n-progress 
                      type="line" 
                      :percentage="selectedSkill.proficiency" 
                      :height="8" 
                      color="#2dd4bf" 
                      rail-color="rgba(255, 255, 255, 0.1)"
                      indicator-text-color="#2dd4bf"
                   />
                </div>

                <div class="bg-black/20 p-4 rounded-xl border border-white/5">
                   <h4 class="text-sm font-bold text-gray-300 mb-2 uppercase tracking-wider">Overview</h4>
                   <p class="text-gray-400 leading-relaxed">{{ selectedSkill.description }}</p>
                </div>

                <div>
                   <h4 class="text-sm font-bold text-gray-300 mb-3 uppercase tracking-wider">Related Projects</h4>
                   <div class="flex flex-wrap gap-2">
                      <span v-for="project in selectedSkill.projects" :key="project" class="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded-lg border border-white/10">
                         {{ project }}
                      </span>
                   </div>
                </div>
             </div>
          </div>
        </n-card>
      </n-modal>
    </div>
  </section>
</template>


<style scoped>
.n-card {
  border-radius: 12px;
  background-color: rgba(17, 24, 39, 0.5);
}
</style>
