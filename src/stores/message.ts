import {
  defineStore
} from 'pinia'
import {
  getReadListAndStatus,
  getDepartmentMsgList
} from '@/api/department_msg/department_msg'
import { ref } from 'vue'
import { useUserinfo } from '@/stores/userinfo'

const infoStore = useUserinfo()

// 使用了setup写法
export const useMsg = defineStore('messageinfor', () => {
  const read_list = ref<number[]>([])
  const msg_list = ref<any[]>([])

  const returnReadList = async() => {
    try {
      const res = await getReadListAndStatus(infoStore.id) as any
      const department = infoStore.department
      // 确保 `read_list` 是一个数组
      let parsedReadList: number[]
      if (res.data && res.data[0] && res.data[0].read_list) {
        parsedReadList = JSON.parse(res.data[0].read_list) as number[]
      } else {
        parsedReadList = []
      }

      read_list.value = parsedReadList
      const res02= await getDepartmentMsgList(department as string) as any
			msg_list.value = res02.data
    } catch (error) {
      console.error('Error parsing JSON:', error)
    }
  }

  return {
    read_list,
    msg_list,
    returnReadList
  }
}, {
  persist: true,
})