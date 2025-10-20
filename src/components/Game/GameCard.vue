<script setup lang="ts">
import type { IGameCard } from './types'

const props = defineProps<{
  game: IGameCard
}>()

function copyUID(e: MouseEvent) {
  e.stopPropagation()
  navigator.clipboard.writeText(props.game.uid!)
}
</script>

<template>
  <a
    class="bg-gray-400/10 border-b-0! dark:bg-gray-600/10 transition-transform-150!"
    relative flex flex-col cursor-pointer border-b-0 rounded-lg p-5 hover:scale-102
    :href="game.link" target="_blank"
  >
    <div relative flex-shrink-0>
      <img
        :src="game.image"
        :alt="game.name"
        class="my-0!"

        h-36 rounded object-fill object-left
      >
      <div
        v-if="game.state"
        class="absolute right-2 top-2 rounded-full px-3 py-1 text-xs"
        flex items-center gap-x-1
        text-light-7
        :class="{
          'bg-green-500/40': game.state === 'playing',
          'bg-red-500/40': game.state === 'quit',
        }"
      >
        <span
          :class="{
            'i-carbon-play': game.state === 'playing',
            'i-carbon-close': game.state === 'quit',
          }"
        />
        {{ game.state === 'playing' ? '在玩中' : '已退坑' }}
      </div>
    </div>
    <div class="text-md mt-3 flex flex-1 flex-col gap-1">
      <div flex items-center gap-x-5>
        <div
          text-xl text-indigo-5
          font-bold dark:text-indigo-4
        >
          {{ game.name }}
        </div>
        <div class="flex items-center gap-1 text-2xl">
          <span
            v-for="p in game.platforms" :key="p" :class="{
              'i-carbon-laptop': p === 'pc',
              'i-carbon-mobile': p === 'mobile',
            }"
            class="text-xl text-gray-5"
          />
        </div>
      </div>

      <div
        flex items-center gap-x-3
      >
        <span text-gray-5>
          UID：{{ game.uid }}
        </span>
        <div
          v-if="game.uid" i-carbon:copy
          class="icon-btn"
          title="复制"
          @click.stop="copyUID"
        />
      </div>

      <div
        class="flex-1 text-gray-5"
        v-html="game.description"
      />
    </div>
  </a>
</template>
