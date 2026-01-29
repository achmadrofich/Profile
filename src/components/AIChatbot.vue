<script setup lang="ts">
import { ref } from 'vue'
import { NCard, NInput, NButton, NAvatar, NScrollbar } from 'naive-ui'
import { PaperPlaneOutline, ChatbubbleEllipsesOutline } from '@vicons/ionicons5'

// Simple mock AI response logic for demo purposes (Client-side RAG simulation)
const getAIResponse = async (query: string) => {
  // Simulate network delay
  await new Promise(r => setTimeout(r, 1000))
  
  const lowerQuery = query.toLowerCase()
  if (lowerQuery.includes('experience') || lowerQuery.includes('work')) {
      return "I have experience as a Crypto Analyst and Community Manager at Binance Square & BingX since 2020. I also work as a freelance Fullstack Developer specializing in Laravel and Vue.js."
  }
  if (lowerQuery.includes('skill') || lowerQuery.includes('stack')) {
      return "My tech stack includes Blockchain (Web3, Smart Contracts), AI (TensorFlow, Python), and Fullstack (Laravel, Vue.js, Node.js)."
  }
  if (lowerQuery.includes('contact') || lowerQuery.includes('email')) {
      return "You can reach me at abdul.rochimx@gmail.com or call me at +62-8777-964-864."
  }
  if (lowerQuery.includes('project') || lowerQuery.includes('built')) {
      return "I've built several projects including a Web3 Wallet Authentication system, Smart Contract Interactions, and a Blockchain Event Indexer. Check out the Projects section!"
  }
  return "I'm Abdul's AI Assistant. I can tell you about his experience, skills, projects, or how to contact him. What would you like to know?"
}

const messages = ref([
  { role: 'assistant', content: "Hi! I'm Abdul's AI Assistant. Ask me anything about his professional background!" }
])
const input = ref('')
const isLoading = ref(false)

const handleSubmit = async () => {
  if (!input.value.trim() || isLoading.value) return
  
  const userMsg = input.value
  messages.value.push({ role: 'user', content: userMsg })
  input.value = ''
  isLoading.value = true

  try {
    const response = await getAIResponse(userMsg)
    messages.value.push({ role: 'assistant', content: response })
  } catch (e) {
    messages.value.push({ role: 'assistant', content: "Sorry, I'm having trouble connecting right now." })
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <n-card class="fixed bottom-6 right-6 w-96 max-w-[calc(100vw-3rem)] h-[500px] flex flex-col shadow-2xl border-teal-500/20 bg-gray-900/95 backdrop-blur-md z-50 rounded-2xl overflow-hidden" content-style="padding: 0; display: flex; flex-direction: column; height: 100%;">
    <!-- Header -->
    <div class="p-4 bg-teal-500/10 border-b border-white/10 flex items-center gap-3">
       <div class="relative">
         <n-avatar round size="small" src="/images/profile.png" class="border filter brightness-110" />
         <div class="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-gray-900"></div>
       </div>
       <div>
         <h4 class="font-bold text-white text-sm">Chat with Abdul AI</h4>
         <p class="text-xs text-teal-400">Powered by RAG</p>
       </div>
    </div>

    <!-- Messages -->
    <div class="flex-grow overflow-hidden relative bg-black/20">
       <n-scrollbar class="px-4 py-4">
          <div v-for="(msg, i) in messages" :key="i" class="mb-4 flex" :class="msg.role === 'user' ? 'justify-end' : 'justify-start'">
             <div 
               class="max-w-[85%] rounded-2xl p-3 text-sm leading-relaxed"
               :class="msg.role === 'user' ? 'bg-teal-600 text-white rounded-tr-none' : 'bg-gray-800 text-gray-200 rounded-tl-none border border-white/5'"
             >
                {{ msg.content }}
             </div>
          </div>
          <div v-if="isLoading" class="flex justify-start mb-4">
             <div class="bg-gray-800 rounded-2xl rounded-tl-none p-3 border border-white/5 flex gap-1">
                <div class="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce"></div>
                <div class="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce delay-75"></div>
                <div class="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce delay-150"></div>
             </div>
          </div>
       </n-scrollbar>
    </div>

    <!-- Input -->
    <div class="p-3 border-t border-white/10 bg-gray-900/50">
       <form @submit.prevent="handleSubmit" class="relative">
          <input 
            v-model="input" 
            placeholder="Ask about my skills..." 
            class="w-full bg-gray-800 text-white placeholder-gray-500 rounded-full py-3 pl-4 pr-12 focus:outline-none focus:ring-1 focus:ring-teal-500/50 border border-white/5 text-sm"
          />
          <button 
            type="submit" 
            :disabled="!input.trim() || isLoading"
            class="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-teal-500 text-white hover:bg-teal-400 disabled:opacity-50 disabled:hover:bg-teal-500 transition-colors"
          >
             <PaperPlaneOutline class="w-4 h-4" />
          </button>
       </form>
    </div>
  </n-card>
</template>
