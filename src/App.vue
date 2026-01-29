<script setup lang="ts">
import { ref } from 'vue'
import { darkTheme, GlobalThemeOverrides, NConfigProvider, NMessageProvider, NGlobalStyle, NDialogProvider } from 'naive-ui'
import HeroSection from './components/HeroSection.vue'
import AboutSection from './components/AboutSection.vue'
import SkillsSection from './components/SkillsSection.vue'
import ProjectsSection from './components/ProjectsSection.vue'
import TimelineSection from './components/TimelineSection.vue'
import ContactSection from './components/ContactSection.vue'
import SideNavigation from './components/SideNavigation.vue'
import AIChatbot from './components/AIChatbot.vue'
import { ChatbubbleEllipsesOutline, CloseOutline } from '@vicons/ionicons5'

const showChat = ref(false)

// Custom Theme Overrides to match the design
const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#14b8a6', // Teal 500
    primaryColorHover: '#2dd4bf', // Teal 400
    primaryColorPressed: '#0f766e', // Teal 700
    bodyColor: '#0B0E14',
    cardColor: '#111827',
  },
  Button: {
    textColor: '#14b8a6',
  }
}
</script>

<template>
  <n-config-provider :theme="darkTheme" :theme-overrides="themeOverrides">
    <n-message-provider>
      <n-dialog-provider>
        <n-global-style />
        
        <div class="bg-dark min-h-screen text-white font-sans selection:bg-teal-500/30 font-inter">
          <div class="flex flex-col md:flex-row min-h-screen">
            <SideNavigation />
            <main class="flex-1 transition-all duration-300 relative z-0 pb-24 md:pb-0">
              <HeroSection id="home" />
              <AboutSection id="about" />
              <SkillsSection id="skills" />
              <ProjectsSection id="projects" />
              <TimelineSection id="timeline" />
              <ContactSection id="contact" />
            </main>
          </div>

          <!-- AI Chatbot Toggle & Window -->
          <div class="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
            <transition 
              enter-active-class="transform transition ease-out duration-300"
              enter-from-class="translate-y-10 opacity-0 scale-95"
              enter-to-class="translate-y-0 opacity-100 scale-100"
              leave-active-class="transform transition ease-in duration-200"
              leave-from-class="translate-y-0 opacity-100 scale-100"
              leave-to-class="translate-y-10 opacity-0 scale-95"
            >
              <AIChatbot v-if="showChat" />
            </transition>

            <button 
              @click="showChat = !showChat" 
              class="w-14 h-14 rounded-full bg-teal-500 hover:bg-teal-400 text-white shadow-lg shadow-teal-500/30 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 group"
            >
              <CloseOutline v-if="showChat" class="w-8 h-8" />
              <ChatbubbleEllipsesOutline v-else class="w-8 h-8 animate-pulse group-hover:animate-none" />
            </button>
          </div>
        </div>
      </n-dialog-provider>
    </n-message-provider>
  </n-config-provider>
</template>
```
