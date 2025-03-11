<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()
const { users } = storeToRefs(userStore)
</script>

<template>
  <div class="relative overflow-x-auto">
    <table class="w-full text-left text-sm text-gray-500">
      <thead class="text-gray-700">
        <tr>
          <th scope="col" class="px-6 py-3">ФИО</th>
          <th scope="col" class="px-6 py-3">Дата рождения</th>
          <th scope="col" class="px-6 py-3">Номер телефона</th>
          <th scope="col" class="px-6 py-3">Электронная почта</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="{ id, fio, birthday, phone, email } in users" :key="id" scope="col">
          <th scope="row" class="px-6 py-4 font-medium whitespace-nowrap text-gray-900">
            {{ fio }}
          </th>
          <td class="px-6 py-4">{{ birthday }}</td>
          <td class="px-6 py-4">{{ phone }}</td>
          <td class="px-6 py-4">{{ email }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
