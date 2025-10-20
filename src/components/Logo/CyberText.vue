<script setup lang="ts">
defineProps<{
  text?: string
}>()
</script>

<template>
  <span class="cyber-text">
    <span class="glitch-layer">{{ text || "CyberBlog" }}</span>
    <span class="flicker-layer">{{ text || "CyberBlog" }}</span>
  </span>
</template>

<style lang="scss" scoped>
.cyber-text {
  @apply relative inline-block font-mono font-bold;
  text-shadow: 0 0 5px #815bfb;
}

.glitch-layer {
  @apply absolute inset-0 text-light;
  animation: glitch 2s infinite;
  clip-path: inset(0 0 0 0);
}

.flicker-layer {
  @apply text-amber;
  background-clip: text;
  -webkit-background-clip: text;
}

@keyframes glitch {
  0% {
    transform: translate(0);
  }
  20% {
    transform: translate(-1px, 1px);
    clip-path: inset(10% 0 30% 0);
  }
  30% {
    transform: translate(2px, -1px);
  }
  40% {
    transform: translate(-1px, 1px);
  }
  50% {
    transform: translate(0);
  }
  100% {
    transform: translate(0);
  }
}

@keyframes flicker {
  0%,
  19%,
  21%,
  23%,
  25%,
  54%,
  56%,
  100% {
    opacity: 1;
  }
  20%,
  24%,
  55% {
    opacity: 0.2;
  }
}
</style>
