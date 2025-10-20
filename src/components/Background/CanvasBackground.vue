<script setup lang="ts">
import { useRafFn } from '@vueuse/core'
import { onMounted, onUnmounted, ref } from 'vue'

interface ParticleInterface {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  life: number
  reset: () => void
  update: () => void
}

const canvasRef = ref<HTMLCanvasElement | null>(null)
let ctx: CanvasRenderingContext2D | null = null
let particles: Particle[] = []

class Particle implements ParticleInterface {
  x: number = 0
  y: number = 0
  vx: number = 0
  vy: number = 0
  radius: number = 0
  life: number = 0
  constructor() {
    this.reset()
  }

  reset() {
    this.x = Math.random() * window.innerWidth
    this.y = Math.random() * window.innerHeight
    this.vx = -1 + Math.random() * 2
    this.vy = -1 + Math.random() * 2
    this.radius = 1 + Math.random() * 2
    this.life = 20 + Math.random() * 40
  }

  update() {
    if (this.life > 0) {
      this.x += this.vx
      this.y += this.vy
      this.life--
    }
    else {
      this.reset()
    }
  }
}

function init() {
  ctx = canvasRef.value!.getContext('2d')
  particles = Array.from({ length: 100 }, () => new Particle())
}

function draw() {
  ctx!.clearRect(0, 0, canvasRef.value!.width, canvasRef.value!.height)

  particles.forEach((particle) => {
    particle.update()
    ctx!.beginPath()
    ctx!.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
    ctx!.fillStyle = `rgba(99, 102, 241, ${particle.life / 100})`
    ctx!.fill()
  })
}

const { pause, resume } = useRafFn(() => {
  draw()
}, { immediate: false })

function resize() {
  canvasRef.value!.width = window.innerWidth
  canvasRef.value!.height = window.innerHeight
}

onMounted(() => {
  init()
  resize()
  window.addEventListener('resize', resize)
  resume()
})

onUnmounted(() => {
  window.removeEventListener('resize', resize)
  pause()
})
</script>

<template>
  <canvas
    ref="canvasRef"
    class="pointer-events-none fixed inset-0 z--1"
    aria-hidden="true"
  />
</template>
