<template>
  <main
    class="cyberpunk-bg"
    relative h-screen w-full overflow-hidden
  >
    <RouterView />
  </main>
</template>

<style lang="scss" scoped>
.dark .cyberpunk-bg {
  --dot-t: 0.1;
}
.cyberpunk-bg {
  --dot-t: 0.3;
  &::before {
    @apply absolute inset-0 opacity-20;
    content: '';
    background: repeating-linear-gradient(
        0deg,
        transparent 0px,
        transparent 2px,
        rgba(0, 255, 255, var(--dot-t)) 3px,
        rgba(0, 255, 255, var(--dot-t)) 5px
      ),
      repeating-linear-gradient(
        90deg,
        transparent 0px,
        transparent 2px,
        rgba(0, 255, 255, var(--dot-t)) 3px,
        rgba(0, 255, 255, var(--dot-t)) 5px
      );
  }
}
</style>
