import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'layout',
      component: () => import('../components/Layout.vue'),
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('../components/HelloWorld.vue')
        }
      ]
    }
  ]
}) 

export default router