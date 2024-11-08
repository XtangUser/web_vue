// 导入axios
import instance from '@/http/axios'

interface login_Data {
  account?: string | null
  name?: string | null
  email?: string | null
  login_time?: string | null
  id?: number | null
}
// 登录日志
export const loginLog = (dataList: login_Data) => {
  const { account, name, email } = dataList
  return instance({
    url: '/login/loginLog',
    method: 'POST',
    data: {
      account, name, email
    },
  })
}
// 获取登录日志
export const getLoginLog = () => {
  return instance({
    url: '/login/getLoginLog',
    method: 'POST',
  })
}
// 返回登陆日志列表长度
export const getLoginLog_length = () =>
  instance({
    url: '/login/getLoginLog_length',
    method: 'POST',
  })
// 监听换页返回数据
export const getLoginLog_page = (limit: number, page: number) =>
  instance({
    url: '/login/getLoginLog_page',
    method: 'POST',
    data: {
      limit, page
    },
  })
// 清空日志表
export const clearLoginLog = () =>
  instance({
    url: '/login/clearLoginLog',
    method: 'POST',
  })
// 根据账号搜最近10条登陆记录
export const getLoginLog_search = (account: string) =>
  instance({
    url: '/login/getLoginLog_account',
    method: 'POST',
    data: {
      account
    },
  })