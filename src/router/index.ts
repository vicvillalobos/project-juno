import { createRouter, createWebHistory } from 'vue-router'

import WindowLayout from '../layout/WindowLayout.vue'

import HomeView from '../views/HomeView.vue'
import AccountingView from '../views/AccountingView.vue'
import AboutView from '../views/AboutView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: WindowLayout,
      children: [
        {
          path: 'dashboard',
          name: 'home',
          component: HomeView
        }, {
          path: 'accounting',
          name: 'accounting',
          component: AccountingView
        },
        {
          path: 'about',
          name: 'about',
          component: AboutView
        }
      ]
    },
  ]
})

export default router
