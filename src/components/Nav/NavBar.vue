<script setup lang="ts">
const links = [
  { name: '文章', path: '/posts' },
  // { name: '随笔', path: '/essays' },
  { name: '好文', path: '/recommendations' },
  { name: '关于', path: '/about' },
]
</script>

<template>
  <nav z-50 class="h-$nav-height">
    <div
      mx-auto h-full px-6
      class="h-full flex items-center justify-between <sm:px-$sm-px"
    >
      <!-- Logo -->
      <Logo
        pointer-events-none op0
        class="<md:pointer-events-auto <md:op100"
      />
      <!-- 桌面导航 -->
      <div hidden items-center md:flex space-x-8>
        <router-link
          v-for="link in links"
          :key="link.path"
          :to="link.path"
          class="relative text-sm text-gray-600 font-medium transition-colors before:absolute before:left-0 before:h-px before:w-0 before:bg-indigo-500 dark:text-gray-300 hover:text-indigo-500 before:transition-all before:-bottom-1 hover:before:w-full dark:hover:text-indigo-400"
        >
          {{ link.name }}
        </router-link>
        <ToggleBtn />
      </div>

      <div flex items-center md:hidden>
        <ToggleBtn />
        <!-- 移动端汉堡菜单 -->
        <HamburgMenu :links="links" />
      </div>
    </div>
  </nav>
</template>
