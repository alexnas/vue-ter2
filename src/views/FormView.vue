<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { useUserStore } from '@/stores/user'
import type { IUser } from '@/types'
import TerButton from '@/components/TerButton.vue'

const router = useRouter()
const userStore = useUserStore()

const userSchema = yup.object({
  fio: yup
    .string()
    .trim()
    .matches(
      /^[а-яА-ЯёЁa-zA-Z]+ [а-яА-ЯёЁa-zA-Z]+ ?[а-яА-ЯёЁa-zA-Z]+$/,
      'Пожалуйста, заполните поле ФИО (хх хх хх)'
    )
    .required('Пожалуйста, заполните поле'),
  birthday: yup
    .string()
    .trim()
    .matches(/^\d{1,2}\.\d{1,2}\.\d{4}$/, 'Пожалуйста, заполните поле даты рождения (12.12.1999)')
    .required('Пожалуйста, заполните поле'),
  phone: yup
    .string()
    .trim()
    .matches(
      /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/,
      'Пожалуйста, заполните поле номера телефона (+71234567890)'
    )
    .required('Пожалуйста, заполните поле')
    .min(5)
    .max(10),
  email: yup
    .string()
    .trim()
    .required('Пожалуйста, заполните поле')
    .email('Пожалуйста, заполните поле email (xxx@xxxx.xx)')
})

const initialFormData = {
  fio: '',
  birthday: '',
  phone: '',
  email: ''
}

const { handleSubmit, defineField, resetForm, meta, errors } = useForm({
  validationSchema: userSchema,
  initialValues: initialFormData
})

const isLoading = ref(false)

const [fio, fioAttrs] = defineField('fio')
const [birthday, birthdayAttrs] = defineField('birthday')
const [phone, phoneAttrs] = defineField('phone')
const [email, emailAttrs] = defineField('email')

const onSubmit = handleSubmit.withControlled((values) => {
  const newUser: IUser = {
    id: String(Date.now()),
    fio: values.fio,
    birthday: values.birthday,
    phone: values.phone,
    email: values.email
  }

  console.log('onSubmit', values)
  userStore.createUser(newUser)

  resetForm({ values: initialFormData })
  router.push({ path: 'data' })
})
</script>

<template>
  <div>
    <h1 class="font-border-l-indigo-800 mb-6 flex justify-center text-xl">Новый пользователь</h1>
    <form @submit.prevent="onSubmit" class="mx-auto flex min-w-sm flex-col gap-4">
      <div class="mb-5">
        <input
          type="text"
          v-model="fio"
          class="block w-full rounded-lg border-2 border-gray-500 p-2.5 text-sm text-gray-900"
          placeholder="Ведите имя"
          required
        />
        <span class="mt-1 flex justify-start text-[12px] text-blue-600">{{ errors.fio }}</span>
      </div>

      <div class="mb-5">
        <input
          type="text"
          v-model="birthday"
          class="block w-full rounded-lg border-2 border-gray-500 p-2.5 text-sm text-gray-900"
          placeholder="Введите день рождения"
          required
        />
        <span class="mt-1 flex justify-start text-[12px] text-blue-600">{{ errors.birthday }}</span>
      </div>

      <div class="mb-5">
        <input
          type="text"
          v-model="phone"
          class="block w-full rounded-lg border-2 border-gray-500 p-2.5 text-sm text-gray-900"
          placeholder="Введите телефон"
          required
        />
        <span class="mt-1 flex justify-start text-[12px] text-blue-600">{{ errors.phone }}</span>
      </div>

      <div class="mb-5">
        <input
          type="text"
          v-model="email"
          class="block w-full rounded-lg border-2 border-gray-500 p-2.5 text-sm text-gray-900"
          placeholder="Введите email"
          required
        />
        <span class="mt-1 flex justify-start text-[12px] text-blue-600">{{ errors.email }}</span>
      </div>

      <TerButton :isButtonDisabled="!meta.dirty || !meta.valid" :loading="isLoading" />
    </form>
  </div>
</template>
