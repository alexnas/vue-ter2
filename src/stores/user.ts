import type { IUser } from '@/types'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  let users = ref<IUser[]>([])

  const fetchUsers = () => {
    users.value = JSON.parse(localStorage.getItem('usersData') || '[]')
  }

  const createUser = (newUser: IUser) => {
    users.value.push(newUser)
    localStorage.setItem('usersData', JSON.stringify(users.value))
  }

  return {
    users,
    createUser,
    fetchUsers
  }
})
