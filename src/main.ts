import { createApp } from 'vue'
import  pinia  from '@/stores/index'
// 导入svg图标
import 'virtual:svg-icons-register'
import App from './App.vue'
// 导入路由
import router from './router'
// 导入elment-plus和css
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 全局导入icon图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
// Element Plus 组件 默认 使用英语，如果你希望使用其他语言
import zhCn from 'element-plus/es/locale/lang/zh-cn'
// 挂载路由以及状态管理库和element
app.use(ElementPlus, {
  locale: zhCn,
})
app.use(pinia)
app.use(router)
app.mount('#app')
