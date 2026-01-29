<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { NCard, NProgress } from 'naive-ui'
import { CloseCircleOutline } from '@vicons/ionicons5'

interface Skill {
  type: 'skill'
  name: string
  icon: string
  proficiency: number
  experience: string
  description: string
  projects: string[]
  techStack?: { name: string, icon: string }[]
}

interface DetailItem {
  type: 'detail'
  skill: Skill
}

type GridItem = Skill | DetailItem

const rawSkills: Skill[] = [
  { 
    type: 'skill', 
    name: 'Laravel & MySQL', 
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg', 
    proficiency: 95, 
    experience: '4+ Years', 
    description: 'Fullstack development using Laravel ecosystem (Sanctum, Eloquent) optimized with MySQL complex queries and Redis caching.', 
    projects: ['Enterprise ERP', 'SaaS Platforms'],
    techStack: [
      { name: 'Laravel', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg' },
      { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
      { name: 'Redis', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg' },
      { name: 'PHP', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg' }
    ]
  },
  { 
    type: 'skill', 
    name: 'Next.js Stack', 
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg', 
    proficiency: 90, 
    experience: '3 Years', 
    description: 'Modern serverless architecture using Next.js (App Router), Prisma ORM, and TiDB for scalable data solutions.', 
    projects: ['DeFi Dashboard', 'NFT Marketplace'],
    techStack: [
      { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
      { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
      { name: 'Prisma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg' },
      { name: 'Tailwind', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' }
    ]
  },
  { 
    type: 'skill', 
    name: 'MERN Stack', 
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', 
    proficiency: 88, 
    experience: '3 Years', 
    description: 'Full JavaScript stack (MongoDB, Express, React, Node) for building dynamic real-time applications and RESTful APIs.', 
    projects: ['Social Network', 'Task Management'],
    techStack: [
      { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
      { name: 'Express', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
      { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
      { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' }
    ]
  },
  { 
    type: 'skill', 
    name: 'Web3 & Blockchain', 
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ethereum/ethereum-original.svg', 
    proficiency: 90, 
    experience: '3+ Years', 
    description: 'Smart Contract development (Solidity), dApp integration (Wagmi/Ethers), and EVM architecture.', 
    projects: ['Web3 Wallet', 'Token Staking'],
    techStack: [
      { name: 'Solidity', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/solidity/solidity-original.svg' },
      { name: 'Hardhat', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/hardhat/hardhat-original.svg' },
      { name: 'Ethers.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' }, 
      { name: 'Metamask', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/metamask/metamask-original.svg' }
    ]
  },
  { 
    type: 'skill', 
    name: 'AI Engineering', 
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', 
    proficiency: 85, 
    experience: '3 Years', 
    description: 'Building AI/ML models with Python, TensorFlow, and PyTorch for predictive analytics and automation.', 
    projects: ['Chatbot RAG', 'Market Prediction'],
    techStack: [
      { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
      { name: 'TensorFlow', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg' },
      { name: 'PyTorch', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg' },
      { name: 'Pandas', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg' }
    ]
  },
  { 
    type: 'skill', 
    name: 'Vue.js Ecosystem', 
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg', 
    proficiency: 92, 
    experience: '4 Years', 
    description: 'Advanced frontend development with Vue 3, Nuxt.js, Pinia, and Tailwind CSS for performant UIs.', 
    projects: ['Crypto Dashboard', 'Portfolio Site'],
    techStack: [
      { name: 'Vue.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg' },
      { name: 'Nuxt', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nuxtjs/nuxtjs-original.svg' },
      { name: 'Pinia', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg' }, // No pinia specific icon in devicon standard sometimes, reuse vue or generic
      { name: 'Vite', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vite/vite-original.svg' }
    ]
  },
  { 
    type: 'skill', 
    name: 'Cloud & DevOps', 
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', 
    proficiency: 80, 
    experience: '2 Years', 
    description: 'Containerization (Docker), CI/CD pipelines (GitHub Actions), and Cloud deployment (AWS/Vercel).', 
    projects: ['Microservices API', 'Auto-Deployment'],
    techStack: [
      { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
      { name: 'AWS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg' },
      { name: 'GitHub Actions', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
      { name: 'Nginx', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg' }
    ]
  },
  { 
    type: 'skill', 
    name: 'UI/UX Design', 
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg', 
    proficiency: 75, 
    experience: '2 Years', 
    description: 'Translating concepts into high-fidelity prototypes and design systems using Figma.', 
    projects: ['App Mockups', 'Design Systems'],
    techStack: [
      { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
      { name: 'Sketch', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sketch/sketch-original.svg' },
      { name: 'Photoshop', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-original.svg' }
    ]
  },
]

const selectedSkillName = ref<string | null>(null)
const cols = ref(4)
const animatedProficiency = ref(0) // For animating the bar

const updateCols = () => {
  if (window.innerWidth < 640) cols.value = 2
  else if (window.innerWidth < 1024) cols.value = 3
  else cols.value = 4
}

// Animate proficiency when selection changes
watch(selectedSkillName, (newVal) => {
  if (newVal) {
    animatedProficiency.value = 0
    const skill = rawSkills.find(s => s.name === newVal)
    if (skill) {
      setTimeout(() => {
        animatedProficiency.value = skill.proficiency
      }, 100)
    }
  }
})

onMounted(() => {
  updateCols()
  window.addEventListener('resize', updateCols)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateCols)
})

const displayList = computed(() => {
  if (!selectedSkillName.value) return rawSkills

  const index = rawSkills.findIndex(s => s.name === selectedSkillName.value)
  if (index === -1) return rawSkills

  // Calculate where to insert the detail row (end of the current row)
  const currentRowEnd = Math.ceil((index + 1) / cols.value) * cols.value
  
  const width = cols.value // span full width
  const before = rawSkills.slice(0, currentRowEnd)
  const after = rawSkills.slice(currentRowEnd)

  const detailItem: DetailItem = {
    type: 'detail',
    skill: rawSkills[index]
  }

  return [...before, detailItem, ...after]
})

const toggleSkill = (skill: Skill) => {
  if (selectedSkillName.value === skill.name) {
    selectedSkillName.value = null
  } else {
    selectedSkillName.value = skill.name
  }
}
</script>

<template>
  <section id="skills" class="py-24 px-6 md:px-12 bg-black/20 relative" data-aos="fade-up">
    <div class="max-w-6xl mx-auto">
      <div class="flex items-center gap-4 mb-16 justify-center" data-aos="zoom-in">
         <h2 class="text-3xl md:text-5xl font-bold text-white text-center tracking-tight">My <span class="text-teal-400">Skills</span></h2>
      </div>

      <!-- Custom Grid Implementation for easier col-span control -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 relative">
        <template v-for="(item) in displayList" :key="item.type === 'skill' ? item.name : 'detail-' + item.skill.name">
          
          <!-- Regular Skill Card -->
          <div 
            v-if="item.type === 'skill'" 
            class="relative group"
            data-aos="fade-up"
          >
           <n-card 
              class="h-full hover:border-teal-400/50 hover:bg-gray-800/80 transition-all duration-300 bg-gray-900/40 border-gray-800 backdrop-blur-sm cursor-pointer hover:-translate-y-2 hover:shadow-xl hover:shadow-teal-500/10" 
              :class="{ '!border-teal-500 !bg-gray-800': selectedSkillName === item.name }"
              :bordered="true"
              @click="toggleSkill(item as Skill)"
            >
              <div class="flex flex-col items-center justify-center gap-6 py-6">
                <img 
                  :src="item.icon" 
                  :alt="item.name" 
                  class="w-16 h-16 group-hover:scale-110 transition-transform duration-300 drop-shadow-lg" 
                  :class="{ 'invert brightness-200': ['Next.js Stack', 'Express'].includes(item.name) }"
                />
                <span class="font-semibold text-gray-200 text-lg group-hover:text-teal-400 transition-colors">{{ item.name }}</span>
              </div>
              <div v-if="selectedSkillName !== item.name" class="absolute inset-0 bg-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-2">
                  <span class="text-xs text-teal-300 font-medium">Click for details</span>
              </div>
            </n-card>
            <!-- Connector Arrow (Triangle) -->
             <div v-if="selectedSkillName === item.name" class="absolute -bottom-9 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[12px] border-b-teal-500/30 z-10"></div>
             <div v-if="selectedSkillName === item.name" class="absolute -bottom-[34px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[10px] border-b-gray-900 z-10"></div>
          </div>

          <!-- Expanded Detail Panel -->
          <div 
            v-else 
            class="col-span-2 lg:col-span-4 w-full"
            data-aos="fade-in"
          >
            <div class="bg-gray-800 border border-teal-500/50 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden backdrop-blur-xl">
               <!-- Close Button -->
               <button @click="selectedSkillName = null" class="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
                  <CloseCircleOutline class="w-6 h-6" />
               </button>

               <div class="flex flex-col md:flex-row gap-8 items-start">
                  <!-- Icon & Basic Info -->
                  <div class="flex-shrink-0 flex flex-col items-center gap-4 min-w-[200px]">
                      <div class="p-4 bg-white/5 rounded-2xl border border-white/10">
                        <img 
                          :src="(item as DetailItem).skill.icon" 
                          class="w-20 h-20 drop-shadow-lg" 
                          :class="{ 'invert brightness-200': ['Next.js Stack', 'Deep Learning'].includes((item as DetailItem).skill.name) }" 
                        />
                      </div>
                      <div class="text-center">
                        <h3 class="text-xl font-bold text-white">{{ (item as DetailItem).skill.name }}</h3>
                        <span class="inline-block mt-2 px-3 py-1 bg-teal-500/10 text-teal-400 text-xs rounded-full border border-teal-500/20">
                          {{ (item as DetailItem).skill.experience }} Exp
                        </span>
                      </div>
                  </div>

                  <!-- Details Grid -->
                  <div class="flex-grow grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                      <!-- Progress & Description -->
                      <div>
                        <div class="flex justify-between text-sm text-gray-400 mb-2">
                             <span>Proficiency</span>
                             <span class="text-teal-400 font-mono">{{ animatedProficiency }}%</span>
                        </div>
                        <n-progress 
                          type="line" 
                          :percentage="animatedProficiency" 
                          :height="8" 
                          color="#2dd4bf" 
                          rail-color="rgba(255, 255, 255, 0.1)"
                        />
                         <p class="mt-6 text-gray-400 leading-relaxed text-sm">
                           {{ (item as DetailItem).skill.description }}
                         </p>

                         <!-- Inner Stacks Icons -->
                         <div v-if="(item as DetailItem).skill.techStack" class="mt-6">
                            <h4 class="text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">Tech Stack</h4>
                            <div class="flex flex-wrap gap-2">
                              <div 
                                v-for="tech in (item as DetailItem).skill.techStack" 
                                :key="tech.name"
                                class="flex items-center gap-2 px-2 py-1.5 bg-black/40 rounded-lg border border-white/5"
                                title="tech.name"
                              >
                                <img :src="tech.icon" class="w-4 h-4 opacity-80" :class="{ 'invert': ['Next.js', 'Express', 'Flask', 'GitHub Actions'].includes(tech.name) }"/>
                                <span class="text-xs text-gray-300">{{ tech.name }}</span>
                              </div>
                            </div>
                         </div>
                      </div>

                      <!-- Projects -->
                      <div>
                         <h4 class="text-sm font-bold text-gray-300 mb-4 uppercase tracking-wider flex items-center gap-2">
                           <span class="w-1 h-4 bg-teal-500 rounded-full"></span> Featured In
                         </h4>
                         <div class="flex flex-wrap gap-3">
                            <div 
                              v-for="proj in (item as DetailItem).skill.projects" 
                              :key="proj"
                              class="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm rounded-lg border border-white/5 transition-colors cursor-default"
                            >
                               {{ proj }}
                            </div>
                         </div>
                      </div>
                  </div>
               </div>
            </div>
          </div>

        </template>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Smooth transition for list moves if using transition-group (not used here for simplicity of grid) */
</style>


<style scoped>
.n-card {
  border-radius: 12px;
  background-color: rgba(17, 24, 39, 0.5);
}
</style>
