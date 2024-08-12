import { 
  // 第一个创建路由
  createRouter,
  // 创建路由的历史模式
  createWebHistory } from 'vue-router'
// 创建路由实例
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // 重定向(默认路径去login)
    {
      path: '/',
      redirect:'/menu'
  
    },

    {
      path: '/login',
      name: 'login',
      // 懒加载
      component: ()=>import('@/views/login/index.vue')
    },
    {
      path: '/menu',
      name: 'menu',
      // 懒加载
      component: ()=>import('@/views/menu/index.vue'),
     children:[
      {
        path: '/home',
        name: 'home',
        // 懒加载
        component: ()=>import('@/views/home/index.vue')
      },
     ] 
    },

  ]
})

export default router
