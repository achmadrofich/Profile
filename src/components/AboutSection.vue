<template>
  <section id="about" class="py-24 px-6 md:px-12 bg-dark">
    <div class="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
      <!-- Text Content -->
      <div>
        <div class="flex items-center gap-4 mb-6">
          <div class="h-1 w-12 bg-teal-400"></div>
          <h2 class="text-3xl md:text-4xl font-bold text-white">About Me</h2>
        </div>
        
        <p class="text-gray-300 text-lg leading-relaxed mb-6">
          Hello! I'm <span class="text-teal-400 font-semibold">Abdul Rochim</span>, an Informatics graduate and blockchain enthusiast having versatile experience in <span class="text-blue-400">crypto analysis, AI integration, and fullstack engineering</span>.
        </p>
        
        <p class="text-gray-400 leading-relaxed mb-4">
          I specialize in building blockchain projects, managing crypto communities, and developing web & mobile applications. I am recognized as a Top 3 Leaderboard Trader at BingX and have built a community of over 3,000 members.
        </p>

        <p class="text-gray-400 leading-relaxed">
           Proficient in PHP (Laravel), Vue.js, AI tools (TensorFlow, GitHub Copilot), and creative digital content. I combine technical coding skills with creative design to build unique digital brands.
        </p>
      </div>

      <!-- Image/Visual -->
      <div class="relative group" data-aos="fade-left">
         <div class="absolute -inset-1 bg-gradient-to-r from-teal-400 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
         <div class="relative rounded-2xl bg-gray-900 aspect-video overflow-hidden border border-gray-800">
            <img 
              src="https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=2070&auto=format&fit=crop" 
              alt="Coding Setup" 
              class="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" 
            />
         </div>
      </div>

    </div>
  </section>
</template>
