import { createRouter, createWebHistory } from 'vue-router'

import WindowLayout from '../layout/WindowLayout.vue'

import HomeView from '../views/HomeView.vue'

import AccountingLayout from '../views/accounting/AccountingLayout.vue'
import AccountingHomeView from '../views/accounting/HomeView.vue'
import AccountingAccountsView from '../views/accounting/AccountsView.vue'
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
          component: AccountingLayout,
          children: [
            {
              path: '',
              name: 'accounting',
              component: AccountingHomeView
            },
            {
              path: 'accounts',
              name: 'accounts',
              component: AccountingAccountsView
            }
          ]
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
