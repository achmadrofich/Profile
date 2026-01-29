import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import AOS from 'aos'

const app = createApp(App)
app.mount('#app')

// Initialize AOS
AOS.init({
    duration: 800,
    easing: 'ease-out-cubic',
    once: true,
    offset: 50,
    delay: 100,
})

