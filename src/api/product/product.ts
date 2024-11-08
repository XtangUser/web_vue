// 导入axios
import instance from '@/http/axios'
type dataRules = {
  product_id?: string
  product_name?: string
  product_category?: string
  product_unit?: string
  product_inwarehouse_number?: number | null,
  product_single_price?:number | null,
  product_create_person?: string
  in_memo?: string
  id?: number | null,
  product_out_id?:string,
  product_out_number?: number | null,
  product_out_apply_person?: string
  apply_memo?: string
  product_out_status?: string
  product_out_audit_person?: string
  audit_memo?: string,
  product_apply_time?: string | null
}
// 产品入库-创建产品
export const createProduct = (dataForm: dataRules) => {
  const {
    product_id,
    product_name,
    product_category,
    product_unit,
    product_inwarehouse_number,
    product_single_price,
    product_create_person,
    in_memo
  } = dataForm
  return instance({
    // 后端接口
    url: '/pro/createProduct',
    // 方法
    method: 'POST',
    data: {
      product_id,
      product_name,
      product_category,
      product_unit,
      product_inwarehouse_number,
      product_single_price,
      product_create_person,
      in_memo
    }
  })
}
// 删除产品
export const deleteProduct = (product_id: string) => {
  return instance({
    url: '/pro/deleteProduct',
    method: 'POST',
    data: {
      product_id
    }
  })
}
// 编辑产品信息
export const editProduct = (dataForm: dataRules) => {
  const {
    id,
    product_name,
    product_category,
    product_unit,
    product_inwarehouse_number,
    product_single_price,
    in_memo
  } = dataForm
  return instance({
    // 后端接口
    url: '/pro/editProduct',
    // 方法
    method: 'POST',
    data: {
      id,
      product_name,
      product_category,
      product_unit,
      product_inwarehouse_number,
      product_single_price,
      in_memo
    }
  })
}
//获取产品列表
export const getProductList = () => {
  return instance({
    // 后端接口
    url: '/pro/getProductList',
    // 方法
    method: 'POST',
    // 数据
    data: {}
  })
}
// 产品申请出库
export const outProduct = (dataForm: dataRules) => {
  const {
    id,
    product_out_id,
    product_single_price,
    product_inwarehouse_number,
    product_out_number,
    product_out_apply_person,
    apply_memo
  } = dataForm
  return instance({
    // 后端接口
    url: '/pro/outProduct',
    // 方法
    method: 'POST',
    data: {
      id,
      product_out_id,
      product_inwarehouse_number,
      product_single_price,
      product_out_number,
      product_out_apply_person,
      apply_memo
    }
  })
}
// 产品审核列表(产品审核状态分为：申请出库 or 否决)
export const getProductAuditList = () => {
  return instance({
    // 后端接口
    url: '/pro/getProductAuditList',
    // 方法
    method: 'POST',
    // 数据
    data: {}
  })
}
// 产品审核
export const auditProduct = (dataForm: dataRules) => {
  const {
    id,
    product_out_id,
    product_out_status,
    apply_memo,
    product_name,
    product_out_audit_person,
    product_out_apply_person,
    product_inwarehouse_number,
    product_single_price,
    product_out_number,
    product_apply_time,
    audit_memo,
  } = dataForm
  return instance({
    // 后端接口
    url: '/pro/auditProduct',
    // 方法
    method: 'POST',
    data: {
      id,
      product_out_id,
      product_name,
      product_apply_time,
      product_out_status,
      apply_memo,
      product_out_audit_person,
      product_out_apply_person,
      product_inwarehouse_number,
      product_single_price,
      product_out_number,
      audit_memo
    }
  })
}
// 通过入库编号对产品进行搜索
export const searchProduct = (product_id: string) => {
  return instance({
    // 后端接口
    url: '/pro/searchProduct',
    // 方法
    method: 'POST',
    data: {
      product_id
    }
  })
}
//通过出库编号对产品进行搜索
export const searchProductOut = (product_out_id: string) => {
  return instance({
    // 后端接口
    url: '/pro/searchProductOut',
    // 方法
    method: 'POST',
    data: {
      product_out_id
    }
  })
}
// 通过出库申请编号对产品进行搜索
export const searchProductAudit = (product_out_id: string) => {
  return instance({
    // 后端接口
    url: '/pro/searchProductAudit',
    // 方法
    method: 'POST',
    data: {
      product_out_id
    }
  })
}
//  撤回出库申请'
export const recallProduct = (id: number) => {
  return instance({
    // 后端接口
    url: '/pro/recallProduct',
    // 方法
    method: 'POST',
    data: {
      id
    }
  })
}
// 获取产品状态为空产品列表总长度
export const getProductLength = () => {
  return instance({
    // 后端接口
    url: '/pro/getProductLength',
    // 方法
    method: 'POST',
    // 数据
    data: {}
  })
}
//获取产品状态为申请出库产品列表总长度
export const getProductAuditLength = () => {
  return instance({
    // 后端接口
    url: '/pro/getProductAuditLength',
    // 方法
    method: 'POST',
    // 数据
    data: {}
  })
}

//获取出库产品总长度
export const getProductOutLength = () => {
  return instance({
    // 后端接口
    url: '/pro/getProductOutLength',
    // 方法
    method: 'POST',
    // 数据
    data: {}
  })
}
// 返回出库产品对象数据
export const getProductOutnum= () => {
  return instance({
    // 后端接口
    url: '/pro/getProductOutnum',
    // 方法
    method: 'POST',
    // 数据
    data: {}
  })
}
//产品页面根据产品状态为null，监听换页返回数据
export const getProduct = (page: number) => {
  return instance({
    // 后端接口
    url: '/pro/getProduct',
    // 方法
    method: 'POST',
    data: {
      page
    }
  })
}
// 申请出库页面根据产品状态不为null，监听换页返回数据
export const getProductAudit = (page: number) => {
  return instance({
    // 后端接口
    url: '/pro/getProductAudit',
    // 方法
    method: 'POST',
    data: {
      page
    }
  })
}
//出库页面根据产品状态为同意，监听换页返回数据
export const getProductOut = (page: number) => {
  return instance({
    // 后端接口
    url: '/pro/getProductOut',
    // 方法
    method: 'POST',
    data: {
      page
    }
  })
}
