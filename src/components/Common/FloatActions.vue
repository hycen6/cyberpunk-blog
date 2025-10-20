<script setup lang="ts">
const router = useRouter()
const route = useRoute()

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const actionBtnRef = ref<HTMLDivElement>()

watch(() => route.path, async () => {
  actionBtnRef.value?.classList.remove('ani')
  actionBtnRef.value!.style.opacity = '0'
  setTimeout(() => {
    actionBtnRef.value?.classList.add('ani')
  }, 500)
})

function goHome() {
  router.push('/')
}
</script>

<template>
  <div ref="actionBtnRef" class="float-actions">
    <FloatButton
      title="回到顶部"
      bg="rgba(110, 66, 255, 0.8)"
      hover-bg="rgba(110, 66, 255, 0.1)"
      @click="scrollToTop"
    >
      <svg viewBox="0 0 24 24" width="18" height="18">
        <path fill="white" d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6 1.41 1.41z" />
      </svg>
    </FloatButton>
    <FloatButton
      v-if="route.path !== '/'"
      :visible="route.path !== '/'"
      title="返回首页"
      hover-bg="rgba(0, 247, 255, 0.1)"
      bg="rgba(0, 100, 991, 0.8)"
      @click="goHome"
    >
      <svg viewBox="0 0 24 24" width="18" height="18">
        <path fill="white" d="M12 2L2 12h3v8h6v-6h2v6h6v-8h3L12 2z" />
      </svg>
    </FloatButton>
  </div>
</template>

<style scoped>
.float-actions {
  @apply fixed right-6 bottom-6;
  z-index: 999;
}

.ani {
  opacity: 0;
  animation: fade-in 0.5s ease-in-out forwards;
  animation-duration: 1s;
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
