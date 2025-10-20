<script setup lang="ts">
withDefaults(defineProps<{
  title?: string
  description?: string
}>(), {
  title: '空空如也',
})
</script>

<template>
  <div class="cyber-empty">
    <div class="empty-icon">
      <div class="cube-icon">
        ∅
      </div>
    </div>
    <span class="empty-title">
      {{ title }}
    </span>
    <p class="empty-desc">
      {{ description }}
    </p>
  </div>
</template>

<style scoped lang="scss">
.cyber-empty {
  @apply flex flex-col items-center justify-center p-8;

  .empty-icon {
    @apply relative mb-5;

    .cube-icon {
      @apply absolute inset-0 flex items-center justify-center text-4xl font-mono;
      color: #6e42ff;
      text-shadow: 0 0 15px rgba(110, 66, 255, 0.3);
      animation: cube-float 3s ease-in-out infinite;
    }
  }

  .empty-title {
    @apply text-gray-400! my-2;
  }

  .empty-desc {
    @apply text-gray-400 m-0;
  }
}

@keyframes cube-float {
  0%,
  100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-8px) rotate(2deg);
  }
}
</style>
