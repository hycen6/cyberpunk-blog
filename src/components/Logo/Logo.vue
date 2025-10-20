<template>
  <router-link
    to="/"
    group flex items-center space-x-1
  >
    <!-- <LogoAnimated mr-2 /> -->

    <div flex flex-col>
      <span mb--1 text-2.5 text-indigo>
        祸妍聪の
      </span>
      <div class="flip-container">
        <div class="flipper">
          <div class="front">
            <CyberText text="CyberBlog" text-sm />
          </div>
        </div>
      </div>
    </div>
  </router-link>
</template>

<style scoped>
.flip-container {
  @apply w-full h-30px;
  perspective: 1000px;
}

.flipper {
  @apply relative w-full h-full preserve-3d;
}

.front {
  @apply absolute inset-0 flex items-center;
  backface-visibility: hidden;
}

.flip-text {
  @apply text-12px whitespace-nowrap;
}
</style>
