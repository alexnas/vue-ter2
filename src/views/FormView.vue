<script setup lang="ts">
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { useUserStore } from '@/stores/user'
import type { IUser } from '@/types'

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
  userStore.createUser(newUser)

  resetForm({ values: initialFormData })
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

      <button
        type="submit"
        :disabled="!meta.dirty || !meta.valid"
        class="w-full rounded-lg bg-green-400 px-5 py-2.5 text-center text-sm font-bold text-white hover:bg-linear-to-r hover:from-green-100 hover:to-green-300"
      >
        Submit
      </button>
    </form>
  </div>
</template>
