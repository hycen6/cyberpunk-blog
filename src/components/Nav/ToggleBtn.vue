<template>
  <button
    class="toggle-btn"
    @click="toggleDark"
  >
    <div
      class="text-xl max-sm:text-2xl"
      i-carbon-moon dark:i-carbon-sun rotate--15deg
    />
  </button>
</template>

<style lang="scss" scoped>
.toggle-btn {
  @apply rounded-full p-2;
  @apply transition-colors;
  @apply hover:bg-gray-100 dark:hover:bg-dark-700;
}
</style>
