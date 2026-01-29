<script setup lang="ts">
import { ref } from 'vue'
import { NForm, NFormItem, NInput, NButton, useMessage } from 'naive-ui'
import GrowthHeader from './GrowthHeader.vue'

const message = useMessage()
const formValue = ref({
  name: '',
  email: '',
  message: ''
})

const handleSubmit = (e: Event) => {
  e.preventDefault()
  // Simulate form submission
  message.success('Message sent successfully! (Demo)')
  formValue.value = { name: '', email: '', message: '' }
}
</script>

<template>
  <section id="contact" class="py-24 px-6 md:px-12 bg-dark relative">
    <div class="max-w-4xl mx-auto text-center mb-12">
      <div class="mb-4 flex justify-center">
        <GrowthHeader text="Get In Touch" highlight="Touch" />
      </div>
      <p class="text-gray-400 mb-8">Feel free to reach out for collaborations or just a friendly hello!</p>
      
      <div class="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
        <a href="mailto:abdul.rochimx@gmail.com" class="flex items-center gap-2 hover:text-teal-400 transition-colors">
            <span class="text-teal-400">📧</span> abdul.rochimx@gmail.com
        </a>
        <a href="tel:+628777964864" class="flex items-center gap-2 hover:text-teal-400 transition-colors">
            <span class="text-teal-400">📞</span> +62-8777-964-864
        </a>
        <div class="flex items-center gap-2">
            <span class="text-teal-400">📍</span> Sidoarjo, East Java
        </div>
      </div>
    </div>

    <div class="max-w-2xl mx-auto bg-gray-900/50 p-8 rounded-2xl border border-gray-800">
      <n-form :model="formValue" @submit="handleSubmit">
        <n-form-item label="Name" path="name">
           <n-input v-model:value="formValue.name" placeholder="John Doe" class="!bg-gray-800 !text-white !border-gray-700" />
        </n-form-item>
        
        <n-form-item label="Email" path="email">
           <n-input v-model:value="formValue.email" placeholder="john@example.com" class="!bg-gray-800 !text-white !border-gray-700" />
        </n-form-item>
        
        <n-form-item label="Message" path="message">
           <n-input
             v-model:value="formValue.message"
             type="textarea"
             placeholder="Your message..."
             :autosize="{ minRows: 4 }"
             class="!bg-gray-800 !text-white !border-gray-700"
           />
        </n-form-item>

        <div class="flex justify-center mt-6">
          <n-button attr-type="submit" type="primary" size="large" class="w-full md:w-auto min-w-[200px]" @click="handleSubmit">
            Send Message
          </n-button>
        </div>
      </n-form>
    </div>

    <footer class="mt-20 text-center text-gray-500 border-t border-gray-800 pt-8">
       <p>&copy; {{ new Date().getFullYear() }} Abdul Rochim. Built with Vue 3 & Naive UI.</p>
       <div class="flex justify-center gap-6 mt-4">
          <a href="https://github.com/achmadrofich" target="_blank" class="hover:text-teal-400 transition-colors">GitHub</a>
          <a href="https://linkedin.com/in/achmadrofich" target="_blank" class="hover:text-teal-400 transition-colors">LinkedIn</a>
          <a href="https://x.com/achmadrofich" target="_blank" class="hover:text-teal-400 transition-colors">Twitter</a>
       </div>
    </footer>
  </section>
</template>

<style scoped>
:deep(.n-form-item-label) {
  color: #d1d5db !important; /* gray-300 */
}
</style>
