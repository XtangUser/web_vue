// 导入axios
import instance from '@/http/axios'
// 获取所有轮播图
export const getAllSwiper = () => {
  return instance({
    // 后端接口
    url: '/set/getAllSwiper',
    // 方法
    method: 'POST',
  })
}

// 获取公司名称
export const getCompanyName = () => {
  return instance({
    // 后端接口
    url: '/set/getCompanyName',
    // 方法
    method: 'POST',
  })
}

// 修改公司名称
export const changeCompanyName = (companyName: String) => {
  return instance({
    // 后端接口
    url: '/set/changeCompanyName',
    // 方法
    method: 'POST',
    // 数据
    data: {
      companyName
    }
  })
}

// 编辑公司介绍
export const changeCompanyIntroduce = (set_text: String,set_name:String) => {
  return instance({
    // 后端接口
    url: '/set/changeCompanyIntroduce',
    // 方法
    method: 'POST',
    // 数据
    data: {
      set_name,
      set_text
    }
  })
}

//获取公司介绍
export const getCompanyintroce = () => {
  return instance({
    // 后端接口
    url: '/set/getCompanyintroce',
    // 方法
    method: 'POST',
  })
}

// 获取所有公司信息
export const getAllCompanyMsg = () => {
  return instance({
    // 后端接口
    url: '/set/getAllCompanyMsg',
    // 方法
    method: 'POST',
  })
}
//----------------部门设置-------------------------
//更新部门
export const setDepartment = (set_value:any) => {
  return instance({
    // 后端接口
    url: '/set/setDepartment',
    // 方法
    method: 'POST',
    data:{
      set_value
    }
  })
}
//获取所有部门
export const getDepartments = () => {
  return instance({
    // 后端接口
    url: '/set/getDepartments',
    // 方法
    method: 'POST',
  })
}
//---------------------产品设置 ------------------
//更新部门
export const setProducts = (set_value:any) => {
  return instance({
    // 后端接口
    url: '/set/setProducts',
    // 方法
    method: 'POST',
    data:{
      set_value
    }
  })
}
//获取所有部门
export const getProducts = () => {
  return instance({
    // 后端接口
    url: '/set/getProducts',
    // 方法
    method: 'POST',
  })
}