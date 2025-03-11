import type { IUser } from '@/types'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const defaultUsers: IUser[] = [
  {
    id: '123123',
    fio: 'Alex',
    birthday: '10.10.2010',
    phone: '+9999999999',
    email: 'sdf@sdfsd.erd'
  },
  {
    id: '324234234',
    fio: 'Mary',
    birthday: '20.11.2011',
    phone: '+9999999999',
    email: 'sdf@sdfsd.erd'
  }
]

export const useUserStore = defineStore('user', () => {
  const users = ref<IUser[]>([...defaultUsers])

  return {
    users
  }
})
