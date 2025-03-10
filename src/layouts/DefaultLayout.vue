<script setup lang="ts">
import AppHeader from '@/components/header/AppHeader.vue'
</script>

<template>
  <div class="flex h-screen flex-col bg-[#ffffff] text-black">
    <AppHeader />

    <main class="flex justify-center">
      <slot />
    </main>
  </div>
</template>
