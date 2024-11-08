// 导入axios
import instance from '@/http/axios'

interface msgData {
  message_title?: string | null
  message_category?: string | null //varchar(255) null comment '消息类别',
  message_publish_department?: string | null ////varchar(255) null comment '发布消息部门',
  message_publish_name?: string | null //varchar(255) null comment '消息发布者',
  message_receipt_object?: string | null //varchar(255) null comment '消息接收者',
  message_click_number?: string | null //int          null comment '消息查看数量',
  message_content?: string | null //varchar(255) null comment '消息内容',
  message_create_time?: string | null //varchar(255) null comment '消息发布时间',
  message_update?: string | null //varchar(255) null comment '消息更新时间',
  message_level?: string | null // varchar(255) null comment '消息等级',
  message_status?: string | null //int          null comment '默认为0，1在回收站',
  message_delete_time?: string | null // varchar(255) null comment '消息删除时间'
  id?: number | null
}
// 添加消息
export const addMessage = (dataList: msgData) => {
  const {
    message_title,
    message_category,
    message_publish_department,
    message_publish_name,
    message_receipt_object,
    message_content,
    message_level
  } = dataList
  return instance({
    url: '/msg/addMessage',
    method: 'POST',
    data: {
      message_title,
      message_category,
      message_publish_department,
      message_publish_name,
      message_receipt_object,
      message_content,
      message_level
    }
  })
}
// 发布系统消息
export const addSystemMessage = (dataList: msgData) => {
  const { message_title, message_category, message_publish_name, message_content } = dataList
  return instance({
    url: '/msg/addSystemMessage',
    method: 'POST',
    data: {
      message_title,
      message_category,
      message_publish_name,
      message_content
    }
  })
}
// 获取公司消息列表
export const getCompanyMessageList = () => {
  return instance({
    url: '/msg/getCompanyMessageList',
    method: 'POST'
  })
}
// 获取系统消息列表
export const getSystemMessageList = () => {
  return instance({
    url: '/msg/getSystemMessageList',
    method: 'POST'
  })
}
// 编辑公司公告
export const editCompanyMessage = (dataList: msgData) => {
  const {
    message_title,
    message_content,
    message_receipt_object,
    message_level,
    message_category,
    message_publish_department,
    message_publish_name,
    id
  } = dataList
  return instance({
    url: '/msg/editCompanyMessage',
    method: 'POST',
    data: {
      message_title,
      message_content,
      message_receipt_object,
      message_level,
      message_category,
      message_publish_department,
      message_publish_name,
      id
    }
  })
}
// 编辑系统公告
export const editSystemMessage = (dataList: msgData) => {
  const {
    message_title,
    message_content,
    message_category,
    message_publish_name,
    id
  } = dataList
  return instance({
    url: '/msg/editSystemMessage',
    method: 'POST',
    data: {
      message_title,
      message_content,
      message_category,
      message_publish_name,
      id
    }
  })
}
// 根据发布部门进行搜索
export const searchMessageByDepartment = (message_publish_department: string) => {
  return instance({
    url: '/msg/searchMessageByDepartment',
    method: 'POST',
    data: {
      message_publish_department
    }
  })
}
// 根据发布等级进行搜索
export const searchMessageByLevel = (message_level: string) => {
  return instance({
    url: '/msg/searchMessageByLevel',
    method: 'POST',
    data: {
      message_level
    }
  })
}
// 根据id获取消息
export const getMessageById = (dataList: msgData) => {
  const { id } = dataList
  return instance({
    url: '/msg/getMessageById',
    method: 'POST',
    data: {
      id
    }
  })
}
// 更新点击数
export const updateClickNumber = (id:number) => {
  return instance({
    url: '/msg/updateClickNumber',
    method: 'POST',
    data: {
      id
    }
  })
}
// 初次删除
export const deleteMessageFirst = (id: number) => {
  return instance({
    url: '/msg/deleteMessageFirst',
    method: 'POST',
    data: {
      id
    }
  })
}
//  还原操作
export const deleteMessageBack = (id: number) => {
  return instance({
    url: '/msg/deleteMessageBack',
    method: 'POST',
    data: {
      id
    }
  })
}
// 获取回收站列表
export const getDeleteMessageList = () => {
  return instance({
    url: '/msg/getDeleteMessageList',
    method: 'POST'
  })
}
// 删除操作
export const deleteMessage = (id: number) => {
  return instance({
    url: '/msg/deleteMessage',
    method: 'POST',
    data: {
      id
    }
  })
}
// 获取公司公告列表总数
export const get_CompanyMessageTotal = () => {
  return instance({
    url: '/msg/get_CompanyMessageTotal',
    method: 'POST'
  })
}
// 获取系统消息总数
export const getSystemMessageTotal= () => {
  return instance({
    url: '/msg/getSystemMessageTotal',
    method: 'POST'
  })
}
//监听换页返回数据，通过创建的时间getMessageList
export const getMessageList = (limit:number,page:number) => {
  return instance({
    url: '/msg/getMessageList',
    method: 'POST',
    data: {
      limit,
      page
    }
  })
}
// 获取系统消息列表(分页)getSystem_MessageList
export const getSystem_MessageList = (limit:number,page:number) => {
  return instance({
    url: '/msg/getSystem_MessageList',
    method: 'POST',
    data: {
      limit,
      page
    }
  })
}
// getDeleteMessageListPage
export const getDeleteMessageListPage = (limit:number,page:number) => {
  return instance({
    url: '/msg/getDeleteMessageListPage',
    method: 'POST',
    data: {
      limit,
      page
    }
  })
}