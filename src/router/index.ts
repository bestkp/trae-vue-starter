import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'layout',
      component: () => import('@/components/Layout.vue'),
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('@/components/HelloWorld.vue')
        },
        {
          path: 'fireworks',
          name: 'fireworks',
          component: () => import('@/components/Fireworks.vue')
        }
      ]
    }
  ]
}) 

export default router