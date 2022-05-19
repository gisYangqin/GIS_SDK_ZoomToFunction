import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

// 路由规则
const routes:RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/home/index.vue')
  },
  {
    path: '/2',
    name: 'home2',
    component: () => import('../views/home/index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(), // 路由模式
  routes
})

export default router
