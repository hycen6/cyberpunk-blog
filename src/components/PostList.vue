<script setup lang="ts">
import type { IPost } from '~/types'
import { formatDate } from '~/utils/formatDate'

const { type, posts: postList } = defineProps<{
  type: 'posts' | 'essays'
  posts?: IPost[]
}>()

const router = useRouter()
const routes = router.getRoutes()

function isRecentPost(date: Date) {
  const now = new Date()
  const diff = now.getTime() - new Date(date).getTime()
  return diff < 7 * 24 * 60 * 60 * 1000
}

const posts = computed<IPost[]>(() => [
  ...(postList || []),
  ...routes
    .filter(i => i.path.startsWith(`/${type}`) && i.meta?.frontmatter?.date)
    .map((route) => {
      const { path, meta } = route

      const { frontmatter } = meta

      return {
        path,
        title: frontmatter.title,
        date: frontmatter.date,
        description: frontmatter.description || 'No description provided',
        isRecent: isRecentPost(frontmatter.date),
      }
    }),
])

const postGroups = computed(() => {
  return posts.value.reduce((acc, post) => {
    const year = new Date(post.date).getFullYear()
    if (!acc[year])
      acc[year] = []
    acc[year].push(post)
    return acc
  }, {} as Record<string, IPost[]>)
})
</script>

<template>
  <div class="post-groups">
    <div
      v-for="(group, year) in postGroups"
      :key="year"
      class="post-group"
    >
      <div class="year-background">
        {{ year }}
      </div>
      <h3 class="group-year">
        {{ year }} Timeline
      </h3>
      <a
        v-for="p of group"
        :key="p.path"
        :href="p.path"
        class="post-item"
      >
        <div class="flex items-center gap-2 py-2">
          <span
            v-if="p.isRecent"
            class="post-recent"
          >
            近期
          </span>
          <span class="post-title">{{ p.title }}</span>
          <span class="post-date">
            {{ formatDate(new Date(p.date)) }}
          </span>
        </div>
      </a>
    </div>
  </div>

  <Empty
    v-if="!posts.length"
    description="这里什么都没有"
    class="my-20vh!"
  />
</template>

<style lang="scss" scoped>
.post-group {
  @apply relative mb-7;

  &:hover .year-background {
    @apply op20 dark:op30;
  }
}

.year-background {
  @apply absolute top-[calc(50%+20px)] translate-y--1/2 right-0 text-4em font-bold op-9;
  @apply text-#6e42ff z-0 pointer-events-none transform rotate-12 dark:op16;
  transition: opacity 0.3s ease;
}

.group-year {
  @apply relative z-10 my-0 text-xl font-mono text-#8f7fff shadow-indigo-500/30;
  @apply dark:shadow-indigo-500/70-lg;

  &::after {
    @apply block mt-2 w-20 h-1px;
    content: '';
  }
}
.post-item {
  @apply border-0! items-center relative z-10;
  &:hover {
    .post-title {
      @apply text-dark-50 dark:text-light-900;
    }
    .post-date {
      @apply text-gray;
    }
    .post-recent {
      @apply op70;
    }
  }
  .post-title {
    @apply text-dark-50/70 dark:text-light-900/70;
  }

  .post-date {
    @apply text-3 text-gray/70 indent-1;
  }

  .post-recent {
    @apply text-dark rounded-sm op60;
    @apply bg-green-2/70 px-1 text-10px;
  }
}
</style>
