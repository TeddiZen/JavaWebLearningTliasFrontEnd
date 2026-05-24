import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/views/layout/index.vue'
import Emp from '@/views/emp/index.vue'
import Dept from '@/views/dept/index.vue'
import Login from '@/views/login/index.vue'
import Index from '@/views/index/index.vue'
import Stu from '@/views/stu/index.vue'
import Clazz from '@/views/clazz/index.vue'
import EmpReport from '@/views/report/emp/index.vue'
import StuReport from '@/views/report/stu/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/layout',
      redirect: '/index',
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/layout',
      component: Layout,
      children: [
        {
          path: '/index',
          name: 'index',
          component: Index,
        },
        {
          path: '/emp',
          name: 'emp',
          component: Emp,
        },
        {
          path: '/dept',
          name: 'dept',
          component: Dept,
        },
        {
          path: '/stu',
          name: 'stu',
          component: Stu,
        },
        {
          path: '/clazz',
          name: 'clazz',
          component: Clazz,
        },
        {
          path: '/empReport',
          name: 'empReport',
          component: EmpReport,
        },
        {
          path: '/stuReport',
          name: 'stuReport',
          component: StuReport,
        },
      ]
    }
  ],
})

export default router
