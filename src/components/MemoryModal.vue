<script setup lang="ts">
import { computed } from 'vue'
import { NModal, NTag } from 'naive-ui'
import { CloseOutline, CalendarOutline, LocationOutline, TrophyOutline } from '@vicons/ionicons5'

interface TimelineEvent {
  type: string
  title: string
  time: string
  org: string
  description: string
  icon: any
  color: string
  tags: string[]
  heroImage?: string
  milestones?: string[]
  fullStory?: string
}

const props = defineProps<{
  show: boolean
  event: TimelineEvent | null
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

// Placeholder images based on event type
const getPlaceholderImage = (type: string) => {
  const images: Record<string, string> = {
    education: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80',
    work: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80',
    business: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80'
  }
  return images[type] || images.work
}

const heroImage = computed(() => {
  if (!props.event) return ''
  return props.event.heroImage || getPlaceholderImage(props.event.type)
})

// Default milestones if not provided
const milestones = computed(() => {
  if (!props.event) return []
  if (props.event.milestones) return props.event.milestones
  
  // Auto-generate based on type
  const defaults: Record<string, string[]> = {
    education: ['Completed core curriculum', 'Led campus tech events', 'Graduated with honors'],
    work: ['Delivered multiple projects', 'Expanded skill set', 'Built professional network'],
    business: ['Launched successful stores', 'Grew customer base', 'Established brand identity']
  }
  return defaults[props.event.type] || defaults.work
})
</script>

<template>
  <NModal 
    :show="show" 
    @update:show="$emit('close')"
    class="memory-modal"
    :mask-closable="true"
    transform-origin="center"
  >
    <div v-if="event" class="modal-content">
      <!-- Close Button -->
      <button 
        @click="$emit('close')" 
        class="close-btn"
        aria-label="Close modal"
      >
        <CloseOutline class="w-6 h-6" />
      </button>

      <!-- Hero Image -->
      <div class="hero-section">
        <img 
          :src="heroImage" 
          :alt="event.title"
          class="hero-image"
        />
        <div class="hero-overlay" />
        
        <!-- Floating Badge -->
        <div class="hero-badge" :style="{ borderColor: event.color }">
          <component :is="event.icon" class="w-8 h-8" :style="{ color: event.color }" />
        </div>
      </div>

      <!-- Content -->
      <div class="content-section">
        <!-- Header -->
        <div class="header">
          <span class="time-badge" :style="{ backgroundColor: event.color + '20', color: event.color }">
            <CalendarOutline class="w-4 h-4 mr-1" />
            {{ event.time }}
          </span>
          <h2 class="title">{{ event.title }}</h2>
          <p class="org">
            <LocationOutline class="w-4 h-4 mr-1 inline" />
            {{ event.org }}
          </p>
        </div>

        <!-- Story/Description -->
        <div class="story-section">
          <h3 class="section-title">The Story</h3>
          <p class="story-text">
            {{ event.fullStory || event.description }}
          </p>
        </div>

        <!-- Milestones -->
        <div class="milestones-section">
          <h3 class="section-title">
            <TrophyOutline class="w-5 h-5 mr-2 inline" />
            Key Milestones
          </h3>
          <ul class="milestones-list">
            <li 
              v-for="(milestone, i) in milestones" 
              :key="i"
              class="milestone-item"
            >
              <span class="milestone-dot" :style="{ backgroundColor: event.color }" />
              {{ milestone }}
            </li>
          </ul>
        </div>

        <!-- Tags -->
        <div class="tags-section">
          <NTag 
            v-for="tag in event.tags" 
            :key="tag"
            size="small"
            :bordered="false"
            class="!bg-white/5 !text-gray-300"
          >
            #{{ tag }}
          </NTag>
        </div>
      </div>
    </div>
  </NModal>
</template>

<style scoped>
.modal-content {
  background: linear-gradient(180deg, #0a0f16 0%, #111827 100%);
  border-radius: 1.5rem;
  max-width: 600px;
  width: 90vw;
  max-height: 85vh;
  overflow-y: auto;
  position: relative;
  border: 1px solid rgba(75, 85, 99, 0.3);
  box-shadow: 
    0 25px 50px -12px rgba(0, 0, 0, 0.8),
    0 0 60px rgba(45, 212, 191, 0.1);
}

.close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 50;
  padding: 0.5rem;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
  cursor: pointer;
  transition: all 0.3s;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: rotate(90deg);
}

/* Hero Section */
.hero-section {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent 0%, #0a0f16 100%);
}

.hero-badge {
  position: absolute;
  bottom: -24px;
  left: 2rem;
  width: 56px;
  height: 56px;
  border-radius: 1rem;
  background: #111827;
  border: 2px solid;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
}

/* Content */
.content-section {
  padding: 2.5rem 2rem 2rem;
}

.header {
  margin-bottom: 1.5rem;
}

.time-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.375rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0.75rem;
}

.title {
  font-size: 1.75rem;
  font-weight: 700;
  color: white;
  margin-bottom: 0.5rem;
}

.org {
  color: #9CA3AF;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
}

/* Story */
.story-section {
  margin-bottom: 1.5rem;
}

.section-title {
  color: white;
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;
}

.story-text {
  color: #9CA3AF;
  line-height: 1.7;
  font-size: 0.95rem;
}

/* Milestones */
.milestones-section {
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.milestones-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.milestone-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0;
  color: #D1D5DB;
  font-size: 0.9rem;
}

.milestone-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

/* Tags */
.tags-section {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

/* Scrollbar */
.modal-content::-webkit-scrollbar {
  width: 6px;
}

.modal-content::-webkit-scrollbar-track {
  background: transparent;
}

.modal-content::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
}
</style>
