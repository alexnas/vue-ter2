import type { RouteRecordRaw } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import NoPageFoundLayout from '@/layouts/NoPageFoundLayout.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'form',
    component: () => import('@/views/FormView.vue'),
    meta: { layout: DefaultLayout }
  },

  {
    path: '/data',
    name: 'data',
    component: () => import('@/views/DataTableView.vue'),
    meta: { layout: DefaultLayout }
  },

  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFoundView.vue'),
    meta: { layout: NoPageFoundLayout }
  }
]

export default routes
