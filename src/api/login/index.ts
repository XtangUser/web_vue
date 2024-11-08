// 导入axios
import instance from "@/http/axios";
// 定义一个类型
type dataLogin={
  account?:string,
  password?:string,
  newPassword?:string
  email?:string
}
// 注册接口
export const register=(data:dataLogin) =>{
  // 解构赋值，拿到账号和密码
  const{account,password}=data
  return instance({
    // 后端接口
    url:'/api/register',
    // 方法
    method:'POST',
    // 数据
    data:{
      account,
      password
    }

  })
}

// 登录接口
export const login=(data:dataLogin) =>{
  // 解构赋值，拿到账号和密码
  const{account,password}=data
  return instance({
    // 后端接口
    url:'/api/login',
    // 方法
    method:'POST',
    // 数据
    data:{
      account,
      password
    }

  })
}
// 忘记密码验证接口
export const vertify=(data:dataLogin) =>{
  // 解构赋值，拿到账号和密码
  const{account,email}=data
  return instance({
    // 后端接口
    url:'/user/forgetPassword',
    // 方法
    method:'POST',
    // 数据
    data:{
      account,
      email
    }

  })
}

// 忘记密码重置
// 忘记密码验证接口
export const resetPassword=(data:dataLogin) =>{
  // 解构赋值，拿到账号和密码
  const{newPassword,account}=data
  return instance({
    // 后端接口
    url:'/user/changePlogin',
    // 方法
    method:'POST',
    // 数据
    data:{
      account,
      newPassword
    }

  })
}