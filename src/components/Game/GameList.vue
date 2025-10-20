<script setup lang="ts">
import type { IGameCard } from './types'

const gameList: IGameCard[] = [
  {
    uid: '22835637',
    state: 'playing',
    name: '白荆回廊',
    image: '/assets/images/games/seed.webp',
    platforms: ['pc', 'mobile'],
    link: 'https://seed.qq.com/act/a20220931yuyue/index.html#/index',
  },
  {
    uid: '808677',
    state: 'playing',
    name: '少女前线2：追放',
    image: '/assets/images/games/gf2.png',
    platforms: ['pc', 'mobile'],
    link: 'https://gf2.sunborngame.com',
  },
]
</script>

<template>
  <div class="grid gap-8 sm:grid-cols-2">
    <GameCard
      v-for="(game, index) in gameList"
      :key="index"
      :game
    />
  </div>
</template>
