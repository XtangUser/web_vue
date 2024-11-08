// 导入axios
import instance from '@/http/axios'
// 获取用户信息
export const getUserinfo = (id: unknown) => {
  return instance({
    // 后端接口
    url: '/user/getUserinfo',
    // 方法
    method: 'POST',
    // 数据
    data: {
      id
    }
  })
}

// 修改用户信息
export const changeUserinfo = (userdata: Object) => {
  return instance({
    // 后端接口
    url: '/user/changeUser',
    // 方法
    method: 'POST',
    // 数据
    data: {
      ...userdata
    }
  })
}
// 修改密码
export const changePassword = (id: number, oldPassword: String, newPassword: String) => {
  return instance({
    // 后端接口
    url: '/user/changePassword ',
    // 方法
    method: 'POST',
    // 数据
    data: {
      id,
      newPassword,
      oldPassword
    }
  })
}
// 上传头像
export const uploadAvatar = (id: number) => {
  return instance({
    // 后端接口
    url: '/user/uploadAvatar',
    // 方法
    method: 'POST',
    // 数据
    data: {
      id
    }
  })
}
// 绑定账号
export const bindAccount = (account: String, onlyId: String, url: String) => {
  return instance({
    // 后端接口
    url: '/user/bindAccount',
    // 方法
    method: 'POST',
    // 数据
    data: {
      onlyId,
      account,
      url
    }
  })
}
// ------------------------------------------用户管理-------------------------------------
// 添加用户管理员
export const addPUser = (data: {
  account: string
  password: string
  name: string
  sex: string
  department: string
  email: string
  identify: string
}) => {
  const { account, password, name, sex, department, email, identify } = data
  return instance({
    // 后端接口
    url: '/user/addPUser',
    // 方法
    method: 'POST',
    // 数据
    data: {
      account,
      password,
      name,
      sex,
      department,
      email,
      identify
    }
  })
}
// 获取管理员列表
export const getPUser = (identify: string) => {
  return instance({
    // 后端接口
    url: '/user/getPUser',
    // 方法
    method: 'POST',
    // 数据
    data: {
      identify
    }
  })
}
//编辑管理员信息
export const editPUser = (data: {
  id: number
  name: string
  sex: string
  email: string
  department: string,
  identify:string
}) => {
  const {id, name, sex, email, department, identify }=data
  return instance({
    // 后端接口
    url: '/user/editPUser',
    // 方法
    method: 'POST',
    // 数据
    data: {
      id,
      name,
      sex,
      email,
      department,
      identify
    }
  })
}

//对管理员取消赋权
export const cancelPuser = (data: {
  id: number
}) => {
  const {id}=data
  return instance({
    // 后端接口
    url: '/user/cancelPuser',
    // 方法
    method: 'POST',
    // 数据
    data: {
      id,
  }})
}
//对管理员进行赋权
export const  givePuser= (
  id: number,identify:string
) => {
  return instance({
    // 后端接口
    url: '/user/givePuser',
    // 方法
    method: 'POST',
    // 数据
    data: {
      id,
      identify
  }})
}
//对用户进行搜索
export const  searchPuser= (account:string) => {
  return instance({
    // 后端接口
    url: '/user/searchPuser',
    // 方法
    method: 'POST',
    // 数据
    data: {
      account
  }})
}
//通过department进行搜索
export const searchDepartuser= (department:string) => {
  return instance({
    // 后端接口
    url: '/user/searchDepartuser',
    // 方法
    method: 'POST',
    // 数据
    data: {
      department
  }})
}
//冻结用户
export const  icePuser= (
 id:number
) => {
  return instance({
    // 后端接口
    url: '/user/icePuser',
    // 方法
    method: 'POST',
    // 数据
    data: {
      id
  }})
}
//解冻用户
export const ProtectPuser = (
  id:number) => {
   return instance({
     // 后端接口
     url: '/user/ProtectPuser',
     // 方法
     method: 'POST',
     // 数据
     data: {
       id
   }})
 }
 //获取冻结用户列表
 export const geticePuser = () => {
   return instance({
     // 后端接口
     url: '/user/geticePuser',
     // 方法
     method: 'POST',
     
    })
 }
 //删除用户列表
 export const  deletePuser= (data: {
  account:string,
  id:number
}) => {
  const {account,id}=data
  return instance({
    // 后端接口
    url: '/user/deletePuser',
    // 方法
    method: 'POST',
    // 数据
    data: {
      account,
      id
  }})
}
//获取对应身份的一个总人数identify
export const getPuserListLength= (identify:string) => {
  return instance({
    // 后端接口
    url: '/user/getPuserListLength',
    // 方法
    method: 'POST',
    // 数据
    data: {
      identify
  }})
}
//监听换页返回的数据 页码pager，identify
export const returnListData= (identify:string,pager:number) => {
  return instance({
    // 后端接口
    url: '/user/returnListData',
    // 方法
    method: 'POST',
    // 数据
    data: {
      identify,
      pager
  }})
}