<script setup lang="ts">
import type { IIdol } from './types'

defineProps<{
  idol: IIdol
  isActive: boolean
  needTransition: boolean
  shouldAdjustPosition: {
    l: boolean
    r: boolean
  }
}>()
</script>

<template>
  <div
    class="particle-item"
    :class="{
      tran: needTransition,
    }"
  >
    <img
      :src="idol.image"
      :alt="idol.name"
      class="avatar"
      :class="{ active: isActive }"
    >
    <transition name="fade">
      <div
        v-if="isActive"
        class="info-card"
        :style="{
          '--is-excursion': shouldAdjustPosition.r
            ? '65%' : shouldAdjustPosition.l ? '30%' : '50%',
          'left': shouldAdjustPosition.r
            ? '-80%' : shouldAdjustPosition.l ? '-10%' : '50%',
          'transform': shouldAdjustPosition.l || shouldAdjustPosition.r
            ? 'translateX(0)'
            : 'translateX(-50%)',
        }"
      >
        <h3
          class="my-0! text-4! text-$emphasis-color!"
        >
          {{ idol.name }}
        </h3>
        <p
          class="text-$emphasis-color op-68 m-0! text-3!"
        >
          {{ idol.identity }}
        </p>
      </div>
    </transition>
  </div>
</template>

<style scoped lang="scss">
.particle-item {
  &.tran {
    @apply duration-3200;
  }
  @apply absolute w-20 h-20 op90;
  @apply ease-[cubic-bezier(0.25,0.1,0.25,1)];
  transform: translate(var(--x), var(--y));

  &:hover {
    @apply op100 z-10;
    transform: translate(var(--x), var(--y)) scale(1.15);
  }

  .avatar {
    @apply w-full h-full rounded-full object-cover select-none m-0!;
    @apply shadow-lg cursor-pointer duration-300;
    animation: float 3s ease-in-out infinite;
    animation-delay: var(--delay);

    &.active {
      filter: drop-shadow(0 0 12px var(--emphasis-color));
    }
  }

  .info-card {
    @apply absolute bottom-full left-1/2 mb-4 -translate-x-1/2;
    @apply p-4 bg-white dark:bg-dark box-border;
    @apply rounded-lg shadow-xl text-center min-w-40 <sm:w-150px!;
    white-space: normal;
    word-break: break-word;
    &::after {
      @apply absolute left-$is-excursion -translate-x-1/2;
      border: 8px solid transparent;
      top: calc(100% - 1px);
      content: '';
      @apply dark:border-t-dark border-t-white;
    }
  }
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-12px);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.3s,
    transform 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
