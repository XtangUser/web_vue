import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'

const pinia = createPinia()

pinia.use(
    createPersistedState({
        storage: localStorage, //每个声明 persist: true 的 Store 都会默认将数据持久化到 sessionStorage 中
        key: id => `__persisted__${id}`, //store 将保存在 __persisted__store key 下，而不是 store 下
        auto: true, //将会使所有Store持久化存储，并且需要配置persist：false显示禁用持久化
    })
)
// 暴露出去
export default pinia
