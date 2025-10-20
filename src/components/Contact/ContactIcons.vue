<script setup lang="ts">
import type { IContact } from './types'
import { Icon } from '@iconify/vue'

const contacts: IContact[] = [
  {
    name: 'GitHub',
    icon: 'mdi:github',
    url: 'https://github.com/flower-dc',
    color: '',
  },
  {
    name: '哔哩哔哩',
    icon: 'ri:bilibili-fill',
    url: 'https://space.bilibili.com/26130544',
    color: '#fb7299',
  },
  {
    name: '掘金',
    icon: 'tabler:brand-juejin',
    url: 'https://juejin.cn/user/1693713430218254',
    color: '#3F7EF7',
  },
  {
    name: 'Email',
    icon: 'carbon:email',
    url: 'mailto:dconghua@gmail.com',
    color: '#42b883',
  },
]

const hoveredIndex = ref(-1)
</script>

<template>
  <div class="contact-icons py-3">
    <div
      v-for="(contact, index) of contacts"
      :key="contact.name"
      class="contact-icon"
      :style="{
        '--icon-color': contact.color,
        '--animation-delay': `${index * 0.1 + 0.7}s`,
      }"
      @mouseenter="hoveredIndex = index"
      @mouseleave="hoveredIndex = -1"
    >
      <Icon
        class="icon"
        :icon="contact.icon"
        :class="{ 'is-hovered': hoveredIndex === index }"
      />
      <a
        class="text-sm"
        :href="contact.url"
        target="_blank"
        rel="noopener noreferrer"
      >{{ contact.name }}</a>
    </div>
  </div>
</template>

<style scoped lang="scss">
.contact-icons {
  @apply flex flex-wrap gap-10 <sm:gap-6;
}

.contact-icon {
  @apply transition-all duration-300 flex items-center gap-.5;
  animation: fadeIn 0.5s ease-out forwards;
  animation-delay: var(--animation-delay);
  opacity: 0;
}

.icon {
  @apply text-2xl;
  color: var(--icon-color);
  transition: all 0.3s ease;

  &.is-hovered {
    filter: drop-shadow(0 0 15px var(--icon-color, rgba(255, 255, 255, 0.8)));
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
