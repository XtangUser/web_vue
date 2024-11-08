<template>
  <!-- 引入面包屑 -->
  <bread_crumb ref="breadCrumb" :item="item"></bread_crumb>
  <div class="module-common-wrapped">
    <div class="module-common-content">
      <el-tabs v-model="activeName" class="demo-tabs">
        <!-- 产品列表 -->
        <el-tab-pane label="产品列表" name="first">
          <div class="pane-content">
            <div class="pane-top">
              <div class="module-common-header">
                <!-- 搜索框 -->
                <div class="search-wrapped">
                  <el-input
                    v-model="productId"
                    style="width: 240px"
                    placeholder="输入入库编号进行搜索"
                  >
                    <template #append>
                      <el-button :icon="Search" @click="search_Product" />
                    </template>
                  </el-input>
                </div>
                <!-- 添加按钮 -->
                <div class="button-wrapped">
                  <el-button type="primary" plain @click="showInProduct">产品入库</el-button>
                </div>
              </div>
              <!-- 表格数据 -->
              <div class="module-common-table">
                <el-table :data="product_Data" border style="width: 100%" scrollbar-always-on>
                  <el-table-column type="index" />
                  <el-table-column prop="product_id" label="入库编号" width="200" />
                  <el-table-column prop="product_name" label="产品名称" width="160" />
                  <el-table-column prop="product_category" label="产品类别" width="100" />
                  <el-table-column prop="product_unit" label="单位" />
                  <el-table-column prop="product_inwarehouse_number" label="库存数量" width="100" />
                  <el-table-column prop="product_single_price" label="产品单价" width="150" />
                  <el-table-column prop="product_all_price" label="库存总价" width="100" />
                  <el-table-column prop="product_status" label="库存状态" width="100">
                    <template #default="{ row }">
                      <el-tag type="primary" v-if="row.product_inwarehouse_number>50&&row.product_inwarehouse_number<200">库存正常</el-tag>
                      <el-tag type="warning" v-else-if="row.product_inwarehouse_number<50&&row.product_inwarehouse_number>20">库存较少</el-tag>
                      <el-tag type="danger" v-else>库存紧急</el-tag>
                    </template>
                  </el-table-column>
                  <el-table-column prop="product_create_person" label="入库负责人" width="100" />
                  <el-table-column prop="product_create_time" label="入库时间" width="200">
                    <template #default="{ row }">
                      {{ row.product_create_time.slice(0, 10) }}
                    </template>
                  </el-table-column>
                  <el-table-column prop="product_update_time" label="最后修改时间" width="200">
                    <template #default="{ row }">
                      {{
                        row.product_update_time ? row.product_update_time.slice(0, 10) : '暂无更新'
                      }}
                    </template>
                  </el-table-column>
                  <el-table-column prop="in_memo" label="入库备注" width="200" />
                  <el-table-column label="操作" width="300" fixed="right">
                    <template #default="{ row }">
                      <el-button type="primary" plain @click="showOutProduct(row)" :disabled="row.product_out_status == '申请出库'">申请出库</el-button>
                      <el-button type="success" plain @click="EditProduct(row)" :disabled="row.product_out_status == '申请出库'">修改</el-button>
                      <el-button type="danger" plain @click="delete_Product(row.product_id)" :disabled="row.product_out_status == '申请出库'">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
            <!-- 分页 -->
            <div class="table-footer">
      <el-pagination 
        background
        layout="prev, pager, next"
        :pager-count=7
        :total="ProductTatal"
        :page-count="paginationData.Product_pageCount"
        :current-page="paginationData.Product_currentPage"
        @current-change="Product_pageCurrentChange"
        :page-size=1
      />
            </div>
          </div>
        </el-tab-pane>
        <!-- 审核列表 -->
        <el-tab-pane label="审核列表" name="second">
          <div class="pane-content">
            <div class="pane-top">
              <div class="module-common-header">
                <!-- 搜索框 -->
                <div class="search-wrapped">
                  <el-input
                    v-model="outproductId"
                    style="width: 240px"
                    placeholder="输入出库编号进行搜索"
                  >
                    <template #append>
                      <el-button :icon="Search" @click="searchApply_Product" />
                    </template>
                  </el-input>
                </div>
                <!-- 添加按钮--保留弹性布局 -->
                <div class="button-wrapped"></div>
              </div>
              <!-- 表格数据 -->
              <div class="module-common-table">
                <el-table :data="apply_product_Data" border style="width: 100%" scrollbar-always-on>
                  <el-table-column type="index" />
                  <el-table-column prop="product_out_id" label="申请出库编号" width="200" />
                  <el-table-column prop="product_name" label="产品名称" width="160" />
                  <el-table-column prop="product_out_number" label="申请出库数量" width="160" />
                  <el-table-column prop="product_out_price" label="申请出库总价" width="160"  />
                  <el-table-column prop="product_out_apply_person" label="申请人" width="100" />
                  <el-table-column prop="product_apply_time" label="申请出库时间" width="150">
                    <template #default="{ row }">
                      {{
                        row.product_apply_time ? row.product_apply_time.slice(0, 10) : '暂无更新'
                      }}
                    </template>
                  </el-table-column>
                  <el-table-column prop="product_out_audit_person" label="审核人" width="100" />
                  <el-table-column prop="product_audit_time" label="审核时间" width="100">
                    <template #default="{ row }">
                      {{
                        row.product_audit_time ? row.product_audit_time.slice(0, 10) : '暂无更新'
                      }}
                    </template>
                  </el-table-column>
                  <el-table-column prop="product_out_status" label="审核状态" width="200" />
                  <el-table-column prop="apply_memo" label="申请出库备注" width="200" />
                  <el-table-column prop="audit_memo" label="审核备注" width="200" />
                  <el-table-column label="操作" width="300" fixed="right">
                    <template #default="{ row }">
                      <el-button type="primary" plain @click="showauditProduct(row)" :disabled="row.product_out_status != '申请出库'">审核</el-button>
                      <el-button type="success" plain @click="RetryApply(row)" :disabled="row.product_out_status == '申请出库'">再次申请</el-button>
                      <el-button type="danger" plain @click="withdraw_Product(row.id)">撤回申请</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
            <!-- 分页 -->
            <div class="table-footer">
              <!-- 出库列表分页 -->
               <el-pagination
        background 
        layout="prev, pager, next"
        pager-count=7
        :total="ApplyTatal"
        :page-count="paginationData.apply_pageCount"
        :current-page="paginationData.apply_currentPage"
        @current-change="Apply_pageCurrentChange"
        :page-size=1
      />
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
  <product_inwarehouse ref="inProduct" @success="getFirstPageList()"></product_inwarehouse>
  <apply_product ref="out_Product" @success="getPFirstPageList()"></apply_product>
  <edit_product ref="editProduct" @success="getFirstPageList()"></edit_product>
  <audit_product ref="auditProduct" @success="getPFirstPageList()"></audit_product>
</template>

<script setup lang="ts">
import product_inwarehouse from '@/views/product/components/product_inwarehouse.vue'
import apply_product from '../components/apply_product.vue'
import edit_product from '../components/edit_product.vue'
import bread_crumb from '@/components/bread_crumb.vue'
import { onBeforeUnmount, reactive, ref } from 'vue'
import audit_product from '../components/audit_product.vue'
import {deleteProduct,searchProduct,searchProductAudit, recallProduct,outProduct, getProductLength, getProduct, getProductAuditLength, getProductAudit} from '@/api/product/product'
import { Search } from '@element-plus/icons-vue'
import { bus } from '@/utils/mitt'
import { ElMessage, ElMessageBox } from 'element-plus'
// 面包屑参数
const item: Object = reactive({
  first: '产品管理',
  second: '产品列表'
})
// tab页
const activeName = ref('first')
const breadCrumb = ref()
let product_Data:any= ref([])
// 审核列表
let apply_product_Data:any= ref([])
// 入库弹窗
const inProduct = ref()
const showInProduct = () => {
  inProduct.value.open()
}

// 申请出库弹窗
const out_Product = ref()
const showOutProduct = (row:Object) => {
bus.emit('outAuitProductId',row)
  out_Product.value.open()
}
// 编辑产品
const editProduct = ref()
const EditProduct = (row:Object) => {
  bus.emit('editAuitProductId',row)
  editProduct.value.open()
}
// 删除
const delete_Product = (product_id: string) => {
  ElMessageBox.confirm('是否确认删除', 'WARNING', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
    center: true
  })
    .then(async() => {
      const res = await deleteProduct(product_id)
      if (res.data.status == 0) {
        ElMessage({
          message: '删除成功',
          type: 'success'
        })
        updatePlist()
      } else {
        ElMessage.error(res.data.message)
      }
    })
    .catch(() => {
      ElMessage({
        type: 'error',
        message: '删除失败！'
      })
    })
}
// 产品列表
const productId = ref('')
// 产品搜索
const search_Product= async() => {
  const res = await searchProduct(productId.value)
  if (res.data[0]) {
    product_Data.value= res.data
    productId.value = ''
  }  
  else {
    updatePlist()
    ElMessage({
        type: 'error',
        message: '编号不存在'
      })
  }
}
// 出库id
const outproductId = ref<string>('')
const searchApply_Product=async()=>{
const res=await searchProductAudit(outproductId.value)
if (res.data[0]) {
  apply_product_Data.value= res.data
  outproductId.value = ''
}   else {
   updateOutPlist()
    ElMessage({
        type: 'error',
        message: '编号不存在'
      })
  }
}
// 产品审核
const auditProduct=ref()
const showauditProduct = (row:Object) => {
  bus.emit('auditProductId',row)
  auditProduct.value.open()
}
// 撤回申请
const withdraw_Product = (id:number) => {
  ElMessageBox.confirm('是否确认撤回申请', 'WARNING', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
    center: true
  })
    .then(async() => {
      const res = await recallProduct(id)
      if (res.data.status == 0) {
        ElMessage({
          message: '撤回成功',
          type: 'success'
        })
        updatePlist()
        updateOutPlist()
      } else {
        ElMessage.error(res.data.message)
      }
    })
    .catch(() => {
      ElMessage({
        type: 'error',
        message: '撤回失败！'
      })
    })
}
// 再次申请
const RetryApply = async(row:Object) => {
  ElMessageBox.confirm('是否再次申请', 'WARNING', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
    center: true
  })
    .then(async() => {
      const res = await outProduct(row)
      if (res.data.status == 0) {
        ElMessage({
          message: '再次申请成功',
          type: 'success'
        })
        updateOutPlist()
      } else {
        ElMessage.error(res.data.message)
      }
    })
    .catch(() => {
      ElMessage({
        type: 'error',
        message: '再次申请失败！'
      })
    })
  
}
// 分页逻辑
const paginationData =reactive({
  //产品列表数据
  Product_pageCount: 1,
  Product_currentPage: 1,
  // 申请列表
  apply_pageCount: 1,
  apply_currentPage: 1
})
//产品总数
const ProductTatal = ref<number>(0)
// 申请总数
const ApplyTatal = ref<number>(0)
// 获取筛选状态总人数
const getProcuctListLength = async() => {
  const res = await getProductLength()
  ProductTatal.value = res.data.length
  // 每页都是1一条数据
  paginationData.Product_pageCount = Math.ceil(res.data.length / 10)
}
getProcuctListLength()
// 默认获取第一页的数据
const getFirstPageList = async() => {
  const res = await getProduct(1)
  product_Data.value=res.data
}
getFirstPageList()
// 监听页面改变页数
const Product_pageCurrentChange= async(value: number) => {
  paginationData.Product_currentPage=value
  const res = await getProduct(paginationData.Product_currentPage)
  product_Data.value=res.data
}
//---------------------出库列表--------------------------
// 获取出库列表总数据
const getApplyListLength = async() => {
  const res = await getProductAuditLength()
  ApplyTatal.value = res.data.length
  // 每页都是1条数据
  paginationData.apply_pageCount = Math.ceil(res.data.length / 10)
}
getApplyListLength()
// 默认获取第一页的数据
const getApplyFirstPageList = async() => {
  const res = await getProductAudit(1)
  apply_product_Data.value=res.data
}
getApplyFirstPageList()
// 监听页面
const Apply_pageCurrentChange= async(value: number) => {
  paginationData.apply_currentPage=value
  const res = await getProductAudit(paginationData.apply_currentPage)
  apply_product_Data.value=res.data
}
// 更新产品列表
const updatePlist =async() => {
  getFirstPageList()
  getProcuctListLength()
}
updatePlist()
// 更新审核列表
const updateOutPlist =async() => {
  getApplyFirstPageList()
}
updateOutPlist()
const getPFirstPageList=() => {
  getApplyFirstPageList()
  getFirstPageList()
}
// 取消订阅/监听
onBeforeUnmount(() => {
  bus.all.clear()
})
</script>

<style lang="scss" scoped>
// 公共样式外壳
.module-common-wrapped {
  padding: 10px;
  background-color: #f5f5f5;
  height: calc(100vh - 101px);

  .module-common-content {
    padding: 0 10px;
    height: 100%;
    background-color: #fff;
  }
  .pane-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: calc(100vh - 166px);
    background: #fff;
    .pane-top {
      .module-common-table {
        min-height: 10px;
        padding: 10px 10px 20px;
        margin-bottom: 8px;
        background: #fff;
      }
    }
    .table-footer {
      display: flex;
      justify-content: flex-end;
      background: #fff;
    }
  }
}
.module-common-header {
  padding: 0 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
// 表格样式
:deep(.el-table .cell) {
  font-weight: 400;
  text-align: center;
}
</style>
