<script setup lang="ts">
import { NConfigProvider, NGlobalStyle, darkTheme, NMessageProvider, NDialogProvider } from 'naive-ui'
import type { GlobalThemeOverrides } from 'naive-ui'
import HeroSection from './components/HeroSection.vue'
import AboutSection from './components/AboutSection.vue'
import SkillsSection from './components/SkillsSection.vue'
import ProjectsSection from './components/ProjectsSection.vue'
import TimelineSection from './components/TimelineSection.vue'
import ContactSection from './components/ContactSection.vue'
import SideNavigation from './components/SideNavigation.vue'
import ScrollProgress from './components/ScrollProgress.vue'

// Custom Theme Overrides to match the design
const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#2DD4BF',
    primaryColorHover: '#5EEAD4',
    primaryColorPressed: '#14B8A6',
    bodyColor: '#0B0E14',
    cardColor: '#111827',
  },
  Button: {
    textColor: '#2DD4BF',
  }
}
</script>

<template>
  <n-config-provider :theme="darkTheme" :theme-overrides="themeOverrides">
    <n-message-provider>
      <n-dialog-provider>
        <n-global-style />
        
        <div class="bg-dark min-h-screen text-white font-sans selection:bg-teal-500/30 font-inter">
          <ScrollProgress />
          <SideNavigation />
          <main class="relative z-10 w-full overflow-hidden md:pl-20 pb-24 md:pb-0"> <!-- Padding left for sidebar, Padding bottom for mobile nav -->
            <HeroSection />
            <AboutSection />
            <SkillsSection />
            <ProjectsSection />
            <TimelineSection />
            <ContactSection />
          </main>
        </div>
        
      </n-dialog-provider>
    </n-message-provider>
  </n-config-provider>
</template>
