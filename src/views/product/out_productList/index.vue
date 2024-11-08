<template>
  <!-- 引入面包屑 -->
  <bread_crumb ref="breadCrumb" :item="item"></bread_crumb>
  <div class="table-wrapped">
    <div class="table-top">
      <div class="table-header">
        <!-- 搜索框 -->
        <div class="search-wrapped">
          <el-input
            v-model="out_Product"
            style="width: 240px"
            placeholder="输入出库编号进行搜索"
          >
          <template #append>
                      <el-button :icon="Search"   @click="searchoOut_product" />
                    </template>
          </el-input>
          <el-button type="success" plain @click="get_agree_data" style="margin-left: 10px">显示全部</el-button>
        </div>
 
      </div>      
       <!-- 表格内容 -->
        <div class="table-content">
          <el-table :data="out_product_Data" border style="width: 100%">
            <el-table-column type="index" />
            <el-table-column prop="product_out_id" label="出库编号" width="150" />
            <el-table-column prop="product_name" label="产品名称" width="160" />
            <el-table-column prop="product_out_number" label="申请数量" width="160" />
            <el-table-column prop="product_out_price" label="申请出库总价" width="160" />
            <el-table-column prop="product_out_apply_person" label="申请人" width="100" />
            <el-table-column prop="product_apply_time" label="申请出库时间" width="150">
              <template #default="{ row }">
                {{ row.product_apply_time ? row.product_apply_time.slice(0, 10) : '暂无更新' }}
              </template>
            </el-table-column>
            <el-table-column prop="product_out_audit_person" label="审核人" width="100" />
            <el-table-column prop="product_audit_time" label="审核时间" width="150">
              <template #default="{ row }">
                {{ row.product_audit_time ? row.product_audit_time.slice(0, 10) : '暂无更新' }}
              </template>
            </el-table-column>
            <el-table-column prop="audit_memo" label="审核备注" width="200" />
          </el-table>
        </div>
    </div>
    <!-- 表格底部 -->
    <div class="table-footer">
      <el-pagination
        layout="prev, pager, next"
        :pager-count=7
        :total="outProductTatal"
        :page-count="paginationData.pageCount"
        :current-page="paginationData.currentPage"
        @current-change="outProduct_pageCurrentChange"
        :page-size=1
      />
    </div>
  </div>
  <audit_product @successAudit="get_agree_data"></audit_product>
</template>

<script setup lang="ts">
import bread_crumb from '@/components/bread_crumb.vue'
import { onBeforeUnmount,reactive, ref } from 'vue'
import audit_product from '../components/audit_product.vue'
import {searchProductOut, getProductOutnum, getProductOutLength, getProductOut} from '@/api/product/product'
import { Search } from '@element-plus/icons-vue'
import { bus } from '@/utils/mitt';
import { ElMessage } from 'element-plus'
// 面包屑参数
const item: Object = reactive({
  first: '产品管理',
  second: '出库列表'
})
// 表格数据
let out_product_Data =ref([])
// 获取状态为同意的数据
const get_agree_data =async() => {
  // 获取状态为同意的数据
 const res=await getProductOutnum()
 out_product_Data.value=res.data
 getProcuctListLength()
}
get_agree_data()
// 搜索框
const out_Product = ref('')
const searchoOut_product =async() => {
  // 搜索出库产品
 const res=await searchProductOut(out_Product.value)
  if (res.data[0]) {
    out_product_Data .value= res.data
    out_Product.value = ''
  }  
  else {
    get_agree_data()
    ElMessage({
        type: 'error',
        message: '编号不存在'
      })
  }
}
// 分页逻辑
const paginationData = ref({
  // 总页数
  pageCount: 1,
  // 当前页数
  currentPage: 1
})
const outProductTatal = ref<number>(0)
// 获取筛选状态总人数
const getProcuctListLength = async() => {
  const res = await getProductOutLength()
  outProductTatal.value = res.data.length
  // 每页都是1一条数据
  paginationData.value.pageCount = Math.ceil(res.data.length / 10)
}
getProcuctListLength()
// 默认获取第一页的数据
const getFirstPageList = async() => {
  const res = await getProductOut(1)
  out_product_Data.value=res.data
}
getFirstPageList()
// 监听页面改变页数
const outProduct_pageCurrentChange= async(value: number) => {
  paginationData.value.currentPage=value
  const res = await getProductOut(paginationData.value.currentPage)
  out_product_Data.value=res.data
}
// 取消订阅/监听
onBeforeUnmount(() => {
  bus.all.clear()
})
</script>

<style lang="scss" scoped>
.table-wrapped {
  padding: 8px;
  height: calc(100vh - 101px);
  background: #f5f5f5;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
.search-wrapped{
  margin: 8px;
}
  .table-top {
    height: 100vh;
    display: flex;
    flex-direction: column;
  }
  .table-header {
    padding: 0 24px;
    display: 24px;
    justify-content: space-between;
    align-items: center;
    height: 48px;
    background: #fff;
    width: 100%;
  }
  .table-content {
    min-height: 10px;
    padding: 10px 20px 20px;
    margin-bottom: 8px;
    background: #fff;
  }
  .table-footer {
    display: flex;
    justify-content: flex-end;

  }
}
// 表格样式
:deep(.el-table .cell) {
  font-weight: 400;
  text-align: center;
}
</style>
