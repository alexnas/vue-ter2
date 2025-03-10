<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { reactive } from 'vue'

interface INavbarMenuItem {
  name: string
  label: string
  path: string
}

const navbarMenu: INavbarMenuItem[] = [
  {
    name: 'form',
    label: 'Форма',
    path: '/'
  },
  {
    name: 'data',
    label: 'Данные',
    path: '/data'
  }
]

const activeNavMenuItem =
  'border-b-3 border-b-green-500 text-gray-900 font-bold hover:cursor-default'
const inactiveNavMenuItem = 'cursor-pointer hover:font-medium hover:text-gray-700'
</script>

<template>
  <nav class="mb-6 flex h-20 items-center justify-center gap-3 p-3">
    <div v-for="item in navbarMenu" :key="`${item.name}`">
      <RouterLink
        class="px-6 py-2 text-gray-500"
        :class="[$route.name === item.name ? activeNavMenuItem : inactiveNavMenuItem]"
        aria-current="page"
        :to="item.path"
        >{{ item.label }}</RouterLink
      >
    </div>
  </nav>
</template>
