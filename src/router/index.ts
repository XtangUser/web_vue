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
      redirect:'/login'
  
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
      {
        path: '/set',
        name: 'set',
        // 懒加载
        component: ()=>import('@/views/set/index.vue')
      },
      {
        path: '/overview',
        name: 'overview',
        // 懒加载
        component: ()=>import('@/views/overview/index.vue')
      },
      {
        path: '/product_manage',
        name: 'product_manage',
        // 懒加载
        component: ()=>import('@/views/user_manage/product_manage/index.vue')
      },
      {
        path: '/user_list',
        name: 'user_list',
        // 懒加载
        component: ()=>import('@/views/user_manage/user_list/index.vue')
      },
      {
        path: '/users_manage',
        name: 'users_manage',
        // 懒加载
        component: ()=>import('@/views/user_manage/users_manage/index.vue')
      },
      {
        path: '/message_manage',
        name: 'message_manage',
        // 懒加载
        component: ()=>import('@/views/user_manage/message_manage/index.vue')
      },
      {
        path: '/product_list',
        name: 'product_list',
        // 懒加载
       component:()=> import('@/views/product/product_list/index.vue')
      },
      {
        path: '/out_productList',
        name: 'out_productList',
        // 懒加载
       component:()=> import('@/views/product/out_productList/index.vue')
      },
      {
        path: '/out_productList',
        name: 'out_productList',
        // 懒加载
       component:()=> import('@/views/product/out_productList/index.vue')
      },
      {
        path: '/message_list',
        name: '/message_list',
        // 懒加载
       component:()=> import('@/views/message/message_List.vue')
      },
      {
        path: '/recycle_list',
        name: '/recycle_list',
        // 懒加载
       component:()=> import('@/views/message/recycle_list.vue')
      },
      {
        path: '/files',
        name: '/files',
        // 懒加载
       component:()=> import('@/views/files/index.vue')
      },
      {
        path: '/login_log',
        name: '/login_log',
        // 懒加载
       component:()=> import('@/views/login_log/login_log.vue')
      },
      {
        path: '/operation_log',
        name: '/operation_log',
        // 懒加载
       component:()=> import('@/views/operation_log/operation_log.vue')
      },
     ] 
    },

  ]
})

export default router
