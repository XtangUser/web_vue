import { defineStore } from 'pinia'
import { getUserinfo } from '@/api/userinfo'

interface UserInfoData {
  imageUrl: string
  account: string
  password: string
  name: string
  sex: string
  identify: string
  department: string
  email: string
  id: number
}
export const useUserinfo = defineStore('userinfo', {
  // 使用 reactive 来定义响应式状态
  state: (): UserInfoData => {
    return {
      imageUrl: '',
      account: '',
      password: '',
      name: '',
      sex: '',
      identify: '',
      department: '',
      email: '',
      id: 0,
    }
  },

  actions: {
    async userInfo(id: number) {
      const res = await getUserinfo(id)
      this.imageUrl = res.data[0].image_url
      this.account = res.data[0].account
      this.name = res.data[0].name
      this.sex = res.data[0].sex
      this.identify = res.data[0].identify
      this.department = res.data[0].department
      this.email = res.data[0].email
      this.id = res.data[0].id
      // 注意：这里没有设置 password 和 rePassword，因为通常这些不会从 API 返回
    }
  },
  persist: true
})
