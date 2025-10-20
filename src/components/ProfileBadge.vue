<script setup lang="ts">
defineProps<{
  mbti: string
  mbitLink: string
  birthday?: string
  tooltipContent: string
  tag?: string
}>()
</script>

<template>
  <div class="my-8 flex flex-wrap gap-4">
    <div class="group relative flex items-center rounded-full bg-indigo-5/10 px-3 py-1">
      <div class="i-carbon-user-activity mr-2 text-indigo-5" />
      <a :href="mbitLink" target="_blank">{{ mbti }}</a>
      <div
        class="absolute bottom-full mb-1 hidden transform rounded bg-dark-7 px-3 py-1 text-sm text-white group-hover:block"
        w-140px
      >
        {{ tooltipContent }}
      </div>
    </div>

    <div class="flex items-center rounded-full bg-purple-5/10 px-3 py-1">
      <div class="i-carbon-calendar mr-2 text-purple-5" />
      天蝎座
    </div>

    <div
      v-if="tag"
      class="flex items-center rounded-full bg-green-5/10 px-3 py-1"
    >
      <div class="i-carbon-tag mr-2 text-green-5" />
      {{ tag }}
    </div>
  </div>
</template>
