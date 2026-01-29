<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'


import { NTooltip, NIcon } from 'naive-ui'
import { 
  HomeOutline, 
  PersonOutline, 
  FlashOutline, 
  BriefcaseOutline, 
  CalendarOutline, 
  MailOutline,
  LogoGithub
} from '@vicons/ionicons5'


const activeSection = ref('hero')

const navItems = [
  { id: 'hero', icon: HomeOutline, label: 'Home' },
  { id: 'about', icon: PersonOutline, label: 'About' },
  { id: 'skills', icon: FlashOutline, label: 'Skills' },
  { id: 'projects', icon: BriefcaseOutline, label: 'Projects' },
  { id: 'timeline', icon: CalendarOutline, label: 'Timeline' },
  { id: 'contact', icon: MailOutline, label: 'Contact' },
]



const scrollTo = (id: string) => {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

// Scroll Spy
const observerCallback = (entries: IntersectionObserverEntry[]) => {
  entries.forEach((entry) => {
     if (entry.isIntersecting) {
        activeSection.value = entry.target.id
     }
  })
}

let observer: IntersectionObserver | null = null

onMounted(() => {
  observer = new IntersectionObserver(observerCallback, {
     threshold: 0.5
  })
  
  navItems.forEach(item => {
     const section = document.getElementById(item.id)
     if (section) observer?.observe(section)
  })
})

onUnmounted(() => {
  if (observer) observer.disconnect()
})
</script>

<template>
  <nav class="fixed left-0 top-0 h-full w-20 hidden md:flex flex-col items-center justify-between py-8 bg-dark/80 backdrop-blur-xl border-r border-teal-500/10 z-50 transition-all duration-300">
    <!-- Logo -->
    <div class="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-500 cursor-pointer hover:scale-110 transition-transform duration-300" @click="scrollTo('hero')">
      AR
    </div>

    <!-- Navigation Links -->
    <div class="flex flex-col gap-8">
       <n-tooltip v-for="item in navItems" :key="item.id" placement="right" trigger="hover">
          <template #trigger>
            <div 
              class="w-10 h-10 flex items-center justify-center rounded-xl cursor-pointer transition-all duration-300 relative group"
              :class="activeSection === item.id ? 'bg-teal-500/10 text-teal-400 shadow-[0_0_15px_rgba(45,212,191,0.3)]' : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'"
              @click="scrollTo(item.id)"
            >
               <n-icon size="20" class="transform group-hover:scale-110 transition-transform duration-200">
                 <component :is="item.icon" />
               </n-icon>
               
               <!-- Active Indicator Dot -->
               <div v-if="activeSection === item.id" class="absolute -right-1 w-1.5 h-1.5 bg-teal-400 rounded-full shadow-[0_0_10px_#2dd4bf]"></div>
            </div>
          </template>
          <span class="font-outfit text-sm tracking-wide">{{ item.label }}</span>
       </n-tooltip>
    </div>

    <!-- Socials / Theme Toggle (Placeholder) -->
    <div class="flex flex-col gap-4">
       <a href="https://github.com/achmadrofich" target="_blank" class="text-gray-500 hover:text-white transition-colors hover:scale-110 duration-200">
          <n-icon size="22">
            <LogoGithub />
          </n-icon>
       </a>
    </div>

  </nav>

  <!-- Mobile Nav -->
  <nav class="fixed bottom-4 left-4 right-4 md:hidden bg-dark/80 backdrop-blur-xl border border-teal-500/10 rounded-2xl p-4 z-50 flex justify-around shadow-2xl">
    <div 
      v-for="item in navItems" 
      :key="item.id"
      class="text-2xl cursor-pointer transition-all duration-300 flex items-center"
      :class="activeSection === item.id ? 'text-teal-400 -translate-y-1 drop-shadow-[0_0_8px_rgba(45,212,191,0.5)]' : 'text-gray-500'"
      @click="scrollTo(item.id)"
    >
       <n-icon size="24">
         <component :is="item.icon" />
       </n-icon>
    </div>

  </nav>
</template>

