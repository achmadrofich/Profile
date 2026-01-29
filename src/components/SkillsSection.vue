<script setup lang="ts">
import { NCard, NGrid, NGridItem } from 'naive-ui'

const skills = [
  { name: 'Blockchain', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/solidity/solidity-original.svg' }, // Placeholder icon for Blockchain
  { name: 'Laravel', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg' },
  { name: 'Vue.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg' },
  { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'TensorFlow', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg' },
  { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
  { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
]
</script>

<template>
  <section id="skills" class="py-24 px-6 md:px-12 bg-black/20 relative" data-aos="fade-up">
    <div class="max-w-6xl mx-auto">
      <div class="flex items-center gap-4 mb-16 justify-center" data-aos="zoom-in">
         <h2 class="text-3xl md:text-5xl font-bold text-white text-center tracking-tight">My <span class="text-teal-400">Skills</span></h2>
      </div>

      <n-grid x-gap="24" y-gap="24" cols="2 s:3 m:4 l:4" responsive="screen">
        <n-grid-item v-for="(skill, index) in skills" :key="skill.name" :data-aos="'fade-up'" :data-aos-delay="index * 50">
          <n-card class="hover:border-teal-400/50 hover:bg-gray-800/80 transition-all duration-300 bg-gray-900/40 border-gray-800 backdrop-blur-sm group" :bordered="true">
            <div class="flex flex-col items-center justify-center gap-6 py-6">
              <img :src="skill.icon" :alt="skill.name" class="w-16 h-16 group-hover:scale-110 transition-transform duration-300 drop-shadow-lg" />
              <span class="font-semibold text-gray-200 text-lg group-hover:text-teal-400 transition-colors">{{ skill.name }}</span>
            </div>
          </n-card>
        </n-grid-item>
      </n-grid>
    </div>
  </section>
</template>


<style scoped>
.n-card {
  border-radius: 12px;
  background-color: rgba(17, 24, 39, 0.5);
}
</style>
