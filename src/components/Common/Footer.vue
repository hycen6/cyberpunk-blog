<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<template>
  <footer class="cyber-footer">
    © {{ year }} 祸妍聪. All circuits reserved.
  </footer>
</template>

<style scoped>
.cyber-footer {
  @apply py-3 text-center text-sm text-gray-400 h-$footer-height box-border;
}

@keyframes glow-flow {
  0% {
    opacity: 0.3;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.3;
  }
}
</style>
