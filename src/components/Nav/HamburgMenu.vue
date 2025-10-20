<script setup lang="ts">
defineProps<{
  links: {
    name: string
    path: string
  }[]
}>()
const isOpen = ref(false)
</script>

<template>
  <button
    class="p-2 -mr-2"
    @click="isOpen = !isOpen"
  >
    <div class="space-y-1.5">
      <span
        class="block h-0.5 w-6 origin-center bg-gray-900 transition-transform duration-300 dark:bg-gray-100"
        :class="{ 'rotate-45 translate-y-2': isOpen }"
      />
      <span
        class="block h-0.5 w-6 bg-gray-900 transition-opacity duration-300 dark:bg-gray-100"
        :class="{ 'opacity-0': isOpen }"
      />
      <span
        class="block h-0.5 w-6 origin-center bg-gray-900 transition-transform duration-300 dark:bg-gray-100"
        :class="{ '-rotate-45 -translate-y-2': isOpen }"
      />
    </div>
  </button>

  <!-- 移动端下拉菜单 -->
  <transition
    enter-active-class="transition-all duration-300 ease-out"
    leave-active-class="transition-all duration-200 ease-in"
    enter-from-class="opacity-0 scale-95"
    enter-to-class="opacity-100 scale-100"
    leave-from-class="opacity-100 scale-100"
    leave-to-class="opacity-0 scale-95"
  >
    <div
      v-if="isOpen"
      class="absolute inset-x-0 top-16 z-1 bg-white md:hidden dark:bg-dark-900"
    >
      <div class="px-4 py-4 space-y-4">
        <router-link
          v-for="link in links"
          :key="link.path"
          :to="link.path"
          class="block rounded-lg px-4 py-2 text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-dark-700"
          @click="isOpen = false"
        >
          {{ link.name }}
        </router-link>
      </div>
    </div>
  </transition>
</template>
