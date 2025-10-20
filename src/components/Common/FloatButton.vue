<script setup lang="ts">
const { visible } = withDefaults(defineProps<{
  title: string
  bg?: string
  hoverBg?: string
  visible?: boolean
}>(), {
  visible: undefined,
})

const show = ref(false)

function checkScroll() {
  show.value = window.scrollY > 300
}

const isShow = computed(() => visible === undefined ? show.value : visible)

onMounted(() => {
  window.addEventListener('scroll', checkScroll)
  checkScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', checkScroll)
})
</script>

<template>
  <button
    class="float-btn"
    :class="{ show: isShow }"
    :title="title"
  >
    <slot />
  </button>
</template>

<style scoped lang="scss">
.float-btn {
  @apply w-12 h-12 rounded-full flex items-center justify-center cursor-pointer shadow-lg;
  @apply translate-y-5 op0;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  &.show {
    @apply op100 translate-y-0;
  }
  background: v-bind('bg');

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 0 20px v-bind('hoverBg');

    &::after {
      @apply opacity-100;
    }
  }

  & + & {
    @apply mt-4;
  }

  svg {
    @apply text-white;
  }
}
</style>
