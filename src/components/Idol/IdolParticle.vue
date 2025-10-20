<script setup lang="ts">
const idols = [
  {
    name: '洛天依',
    image: '/assets/images/idols/luo_tian_yi.jpeg',
    identity: '华夏风韵 洛水天依',
    emphasisColor: '#66CCFF',
  },
  {
    name: 'Akie秋绘',
    image: '/assets/images/idols/Akie.png',
    identity: '人形自走歌姬 从遥远宇宙乘坐飞船而来',
    emphasisColor: '#E35062',
  },
  {
    name: 'ヨルシカ (夜鹿)',
    image: '/assets/images/idols/yorushika.jpg',
    identity: 'n-buna',
    emphasisColor: '#6F96A4',
  },
  {
    name: '初音ミク',
    image: '/assets/images/idols/miku.jpg',
    identity: `公主殿下`,
    emphasisColor: '#397FAE',
  },
]

const container = ref<HTMLElement>()
const positions = ref<Array<{ x: number, y: number }>>([])
const hoverIndex = ref(-1)

const observer = shallowRef<IntersectionObserver>()
const isNeedAnimate = ref(false)
const isNeedTransition = ref(false)

function placeParticles() {
  if (!container.value)
    return

  const { width, height } = container.value.getBoundingClientRect()
  const particleSize = 80
  const positionsArray: Array<{ x: number, y: number }> = []

  let index = 0

  function processNext() {
    const startTime = performance.now()

    while (index < idols.length) {
      let attempts = 0
      let newPos: { x: number, y: number }

      do {
        newPos = {
          x: Math.random() * (width - particleSize),
          y: Math.random() * (height - particleSize),
        }
        attempts++
      } while (
        attempts < 100
        && positionsArray.some(
          pos =>
            Math.abs(pos.x - newPos.x) < particleSize
            && Math.abs(pos.y - newPos.y) < particleSize,
        )
      )

      positionsArray.push(newPos)
      index++
      if (!isNeedAnimate.value)
        isNeedAnimate.value = true

      // 限制每帧计算时间，避免阻塞 UI
      if (performance.now() - startTime > 5) {
        requestIdleCallback(processNext)
        return
      }
    }

    positions.value = positionsArray
  }

  requestIdleCallback(processNext)

  if (observer.value) {
    observer.value.disconnect()
  }
}

onMounted(async () => {
  const { clientWidth, clientHeight } = container.value!
  // 从底部过度
  positions.value = idols.map(() => ({
    x: clientWidth / 2 - 40,
    y: clientHeight - 80,
  }))
  await nextTick()
  isNeedTransition.value = true
  observer.value = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        placeParticles()
        window.addEventListener('resize', placeParticles)
      }
    })
  }, {
    threshold: 0.1,
  })

  if (container.value) {
    observer.value.observe(container.value)
  }
})

onUnmounted(() => {
  window.removeEventListener('resize', placeParticles)
})

function shouldAdjustPosition(index: number) {
  if (!container.value) {
    return {
      r: false,
      l: false,
    }
  }
  const item = container.value.children[index] as HTMLElement
  if (!item) {
    return {
      r: false,
      l: false,
    }
  }

  const itemRect = item.getBoundingClientRect()
  const bodyRect = document.body.getBoundingClientRect()

  // 当元素右侧距离容器右侧不足 80px(每一个Idol的宽度) 时
  return {
    r: (bodyRect.right - itemRect.right) < 80,
    l: itemRect.left < 80,
  }
}
</script>

<template>
  <div
    ref="container"
    class="particle-container"
    :class="{ animate: isNeedAnimate }"
  >
    <Idol
      v-for="(idol, i) of idols"
      :key="i"
      :need-transition="isNeedTransition"
      :is-active="hoverIndex === i"
      :should-adjust-position="shouldAdjustPosition(i)"
      :idol="idol"
      :style="{
        '--delay': `${i * 0.1}s`,
        '--emphasis-color': idol.emphasisColor,
        '--x': `${positions[i]?.x}px`,
        '--y': `${positions[i]?.y}px`,
      }"
      @mouseenter="hoverIndex = i"
      @mouseleave="hoverIndex = -1"
    />
  </div>
</template>

<style lang="scss" scoped>
.particle-container {
  @apply relative w-full h-60 <sm:h-80 rounded;

  &::after {
    content: '';
    @apply absolute z--1 bottom-0 left-1/2 -translate-x-1/2 translate-y-10;
    @apply w-full h-full select-none;
    @apply <sm:h-60% op0;
    background: radial-gradient(
      ellipse at center bottom,
      rgba(211, 177, 228, 0.5) 10%,
      rgba(211, 177, 228, 0.5) 30%,
      rgba(211, 177, 228, 0.2) 50%,
      rgba(230, 183, 254, 0.1) 70%
    );
    @apply dark:bg-[radial-gradient(ellipse_at_center_bottom,rgba(230,183,254,0.3)_10%,rgba(80,73,194,0.4)_30%,rgba(87,78,255,0.2)_50%,rgba(87,78,255,0)_70%)];
    filter: blur(30px);
  }
  &.animate::after {
    animation: fade 3200ms ease-in-out forwards;
  }
}

@keyframes fade {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
