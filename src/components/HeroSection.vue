<script setup lang="ts">
import { NButton } from 'naive-ui'
import { ref, onMounted, onUnmounted } from 'vue'

const containerRef = ref<HTMLElement | null>(null)
const mousePosition = ref({ x: 0, y: 0 })

const handleMouseMove = (event: MouseEvent) => {
  if (containerRef.value) {
    const rect = containerRef.value.getBoundingClientRect()
    mousePosition.value = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    }
  }
}

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
})
</script>

<template>
  <section ref="containerRef" class="min-h-screen flex flex-col items-center justify-center relative overflow-hidden p-4 bg-dark">
    <!-- Spotlight Effect -->
    <div 
      class="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
      :style="{
        background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(45, 212, 191, 0.15), transparent 40%)`
      }"
    ></div>

    <!-- Grid Background with Mask -->
    <div class="absolute inset-0 z-0 bg-[size:50px_50px] bg-grid-white/[0.05] [mask-image:radial-gradient(ellipse_at_center,black,transparent)]"></div>
    
    <!-- Moving Grid Overlay (Optional Subtle Animation) -->
    <div class="absolute inset-0 z-0 bg-[size:50px_50px] bg-grid-white/[0.02] animate-grid-move opacity-50"></div>

    <!-- Content -->
    <div class="z-10 max-w-7xl w-full grid md:grid-cols-2 gap-12 items-center relative px-4 md:px-8">
      
      <!-- Text Column -->
      <div class="text-center md:text-left order-2 md:order-1 relative">
        <!-- Glowing Orb behind text -->
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-teal-500/20 blur-[100px] rounded-full -z-10"></div>

        <div class="mb-6 inline-block px-4 py-1.5 rounded-full border border-teal-500/30 bg-teal-500/10 text-teal-300 text-sm font-medium tracking-wide backdrop-blur-sm" data-aos="fade-down">
          ✨ Available for opportunities
        </div>
        
        <h1 class="text-5xl md:text-7xl font-bold mb-6 tracking-tighter leading-tight" data-aos="fade-up" data-aos-delay="100">
          <span class="bg-clip-text text-transparent bg-gradient-to-r from-teal-200 via-teal-400 to-blue-500 animate-gradient bg-300%">
            Deepak Prajapati
          </span>
        </h1>
        
        <p class="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed max-w-lg mx-auto md:mx-0 font-light" data-aos="fade-up" data-aos-delay="200">
          Software Developer building <span class="text-teal-400 font-semibold">scalable web apps</span> and <span class="text-blue-400 font-semibold">seamless user experiences</span>.
        </p>
        
        <div class="flex flex-wrap gap-4 justify-center md:justify-start" data-aos="fade-up" data-aos-delay="300">
          <n-button type="primary" size="large" class="!px-8 !py-6 !text-lg !font-bold shadow-lg shadow-teal-500/20 hover:shadow-teal-500/40 transition-shadow">
            Resume
          </n-button>
          <n-button strong secondary type="primary" size="large" class="!px-8 !py-6 !text-lg !font-bold hover:bg-teal-500/10">
            Contact Me
          </n-button>
        </div>
        
        <!-- Stats / Social Proof (Optional Addition to match 'bento' feel) -->
        <div class="mt-12 flex items-center justify-center md:justify-start gap-8 opacity-80" data-aos="fade-up" data-aos-delay="400">
            <div class="text-center md:text-left">
                <h3 class="text-3xl font-bold text-white">5+</h3>
                <p class="text-sm text-gray-400">Years Exp.</p>
            </div>
             <div class="w-px h-10 bg-gray-700"></div>
             <div class="text-center md:text-left">
                <h3 class="text-3xl font-bold text-white">50+</h3>
                <p class="text-sm text-gray-400">Projects</p>
            </div>
             <div class="w-px h-10 bg-gray-700"></div>
             <div class="text-center md:text-left">
                <h3 class="text-3xl font-bold text-white">20+</h3>
                <p class="text-sm text-gray-400">Happy Clients</p>
            </div>
        </div>
      </div>

      <!-- Image Column -->
      <div class="order-1 md:order-2 flex justify-center md:justify-end relative" data-aos="fade-left" data-aos-delay="200">
        <div class="relative w-full max-w-md">
            <!-- Glassmorphic Card Background -->
            <div class="absolute inset-0 bg-gradient-to-br from-gray-800/40 to-black/40 backdrop-blur-xl rounded-3xl border border-white/10 transform rotate-3 scale-105 z-0"></div>
            
            <div class="relative overflow-hidden rounded-3xl border border-teal-500/20 shadow-2xl shadow-teal-900/50 bg-gray-900/50 z-10">
                 <!-- Image Wrapper -->
                <div class="aspect-[3/4] relative">
                     <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10"></div>
                     <img src="/images/profile.png" alt="Profile" class="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700" />
                     
                     <!-- Name Overlay on Image (Like Reference) -->
                     <div class="absolute bottom-6 left-6 z-20">
                         <div class="text-teal-400 text-sm font-bold tracking-widest mb-1 uppercase">Portfolio</div>
                         <h2 class="text-white text-3xl font-bold uppercase tracking-tight">Deepak Prajapati</h2>
                         <p class="text-gray-300 text-sm mt-2 opacity-80">Software Developer</p>
                     </div>
                </div>
            </div>

            <!-- Floating Elements (Like Reference) -->
            <div class="absolute -top-6 -right-6 md:-right-12 p-4 bg-gray-900/80 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl z-20 animate-bounce-slow">
                 <div class="flex items-center gap-3">
                     <div class="w-10 h-10 bg-teal-500/20 rounded-full flex items-center justify-center text-teal-400">
                         <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
                     </div>
                     <div>
                         <div class="text-xs text-gray-400">Location</div>
                         <div class="text-sm font-bold text-white">Indonesia</div>
                     </div>
                 </div>
            </div>

            <div class="absolute -bottom-8 -left-4 md:-left-12 p-4 bg-gray-900/80 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl z-20 animate-bounce-slow" style="animation-delay: 1s;">
                 <div class="flex items-center gap-3">
                     <div class="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                     <div class="text-sm font-bold text-white">Open for Work</div>
                 </div>
            </div>
            
        </div>
      </div>
      
    </div>
  </section>
</template>

<style scoped>
.bg-grid-white\/\[0\.05\] {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='white' stroke-opacity='0.05'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e");
}
.bg-grid-white\/\[0\.02\] {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='white' stroke-opacity='0.02'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e");
}

@keyframes grid-move {
  0% { transform: translateY(0); }
  100% { transform: translateY(32px); }
}

.animate-grid-move {
  animation: grid-move 3s linear infinite;
}

.bg-300\% {
  background-size: 300% 300%;
}

@keyframes gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.animate-gradient {
  animation: gradient 8s ease infinite;
}

@keyframes bounce-slow {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-15px); }
}

.animate-bounce-slow {
  animation: bounce-slow 4s ease-in-out infinite;
}
</style>

