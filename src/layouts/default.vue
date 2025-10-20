<template>
  <div class="mx-auto min-h-screen">
    <Logo class="fixed left-6 top-2.25 <md:hidden" />
    <CanvasBackground />
    <NavBar />
    <main
      class="min-h-[calc(100vh-var(--nav-height)-var(--footer-height))] <sm:px-$sm-px"
      mx-auto px-6 pt-8 xl:max-w-7xl
    >
      <RouterView />
    </main>
    <FloatActions />
    <Footer />
  </div>
</template>
