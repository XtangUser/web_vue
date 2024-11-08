// 导入axios
import instance from '@/http/axios'

interface operation_Data {
  operation_person?: string | null
  operation_content?: string | null
  operation_level?: string | null
  operation_time?: string | null
  id?: number | null
}

// 操作日志
export const operationLog = (dataList: operation_Data) => {
  const { operation_person, operation_content, operation_level } = dataList
  return instance({
    url: '/operation/operationLog',
    method: 'POST',
    data: {
      operation_person,
      operation_content,
      operation_level
    }
  })
}
// 获取操作日志getoperationLog
export const getoperationLog = () =>
  instance({
    url: '/operation/getoperationLog',
    method: 'POST'
  })
// 返回操作日志列表长度getoperationLog_length
export const getoperationLog_length = () =>
  instance({
    url: '/operation/getoperationLog_length',
    method: 'POST'
  })
// 监听换页返回数据getoperationLog_page
export const getoperationLog_page = (limit: number, page: number) =>
  instance({
    url: '/operation/getoperationLog_page',
    method: 'POST',
    data: {
      limit,
      page
    }
  })
// 清空日志表clearoperationLog
export const clearoperationLog = () =>
  instance({
    url: '/operation/clearoperationLog',
    method: 'POST'
  })
// 搜索最近10条操作记录getoperationLog_search
export const getoperationLog_search = (operation_person: string) =>instance({
    url: '/operation/getoperationLog_search',
    method: 'POST',
    data: {
      operation_person
    }})

