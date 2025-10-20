<script setup lang="ts">
const router = useRouter()
</script>

<template>
  <div class="glitch-container">
    <div class="glitch-text" data-text="404">
      404
    </div>
    <div class="scanline" />
  </div>

  <div class="hologram-text">
    <span class="flicker">PAGE</span>
    <span class="fast-flicker">NOT FOUND</span>
  </div>

  <div class="grid-lines" />

  <button
    class="neon-button"
    @click="router.back"
  >
    <span class="neon-text">返回母体</span>
    <span class="neon-border" />
  </button>
</template>

<route lang="yaml">
meta:
  layout: 404
</route>

<style lang="scss" scoped>
.glitch-container {
  @apply absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2;
}

.glitch-text {
  @apply relative text-15em font-bold text-indigo-8 <sm:text-10em;

  text-shadow:
    0.05em 0 0 rgba(174, 0, 255, 0.5),
    -0.025em -0.05em 0 rgba(0, 255, 60, 0.3),
    0.025em 0.05em 0 rgba(60, 0, 255, 0.5);
  // animation: glitch 1000ms infinite;

  &::before,
  &::after {
    content: attr(data-text);
    @apply absolute inset-0;
  }

  &::before {
    left: 0.05em;
    text-shadow: 0.05em 0 0 rgba(174, 0, 255, 0.5);
    animation: glitch 1200ms infinite;
  }

  &::after {
    left: -0.05em;
    text-shadow: -0.05em 0 0 rgba(0, 255, 60, 0.6);
    animation: glitch 1200ms infinite reverse;
  }
}

.hologram-text {
  @apply absolute left-1/2 top-1/2 -translate-x-1/2 text-4xl text-center;
  span {
    @apply block font-mono uppercase tracking-wider;
    color: #0ff;
    text-shadow: 0 0 5px #0ff;
  }
  .flicker {
    animation: flicker 3s linear infinite;
  }
  .fast-flicker {
    animation: flicker 1s linear infinite;
  }
}

.neon-button {
  @apply absolute bottom-20 left-1/2 -translate-x-1/2 px-8 py-4 bg-transparent border-none cursor-pointer overflow-hidden;
  .neon-text {
    @apply relative text-2xl font-bold dark:text-gray-400 text-light;
    transition: 0.5s;
    z-index: 1;
  }
  .neon-border {
    @apply absolute inset-0;
    &::before {
      content: '';
      @apply absolute top-0 left-0 w-full h-1/2;
      background: linear-gradient(90deg, transparent, #27138c);
    }
    &::after {
      content: '';
      @apply absolute bottom-0 left-0 w-full h-1/2;
      background: linear-gradient(90deg, transparent, #27138c);
    }
  }
  &:hover .neon-text {
    color: #fff;
    text-shadow:
      0 0 5px #00ffae,
      0 0 25px #00ffae,
      0 0 50px #00ffae;
  }
}

@keyframes glitch {
  0% {
    transform: translate(0);
  }
  20% {
    transform: translate(-0.03em, 0.03em);
  }
  40% {
    transform: translate(0.03em, -0.03em);
  }
  60% {
    transform: translate(-0.03em, 0.03em);
  }
  80% {
    transform: translate(0.03em, -0.03em);
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
