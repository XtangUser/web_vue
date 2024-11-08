import { ElMessage } from 'element-plus';
import router from './router/index';

// 全局前置守卫
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  if (to.name != 'login' && !token) {
    router.push('/login');
    ElMessage.warning('请先登录');
    // 确保不再继续当前导航
    return;
  }

  next();
});