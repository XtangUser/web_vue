<template>
  <!-- 引入面包屑 -->
  <bread_crumb ref="breadCrumb" :item="item"></bread_crumb>
  <div class="module-common-wrapped">
    <div class="module-common-content">
      <div class="pane-content">

        <div class="pane-top">       
           <div class="module-common-header">
                 <!-- 搜索框 -->
                 <div class="search-wrapped">
                  <el-input
                    v-model="operationPerson"
                    style="width: 240px"
                    placeholder="输入操作人进行搜索"
                  >
                    <template #append>
                      <el-button :icon="Search" @click="search_person" />
                    </template>
                  </el-input>
                </div>
                <!-- 添加按钮 -->
                <div class="button-wrapped">
                  <el-button type="danger" plain @click="ClearLog">清除操作日志</el-button>
                </div>
              </div>
          <!-- 表格数据 -->
          <div class="module-common-table">
            <el-table :data="Message_Data"  style="width: 100%">
              <el-table-column type="index" />
              <el-table-column prop="operation_person" label="操作者"/>
              <el-table-column prop="operation_content" label="操作内容"/>
              <el-table-column prop="operation_level" label="操作等级" width="100">
                    <template #default="{ row }">
                      <el-tag type="danger" v-if="row.operation_level=='高级'">最高级</el-tag>
                      <el-tag type="warning" v-else-if="row.operation_level=='中级'">中级</el-tag>
                      <el-tag type="primary" v-else>低级</el-tag>
                    </template>
                  </el-table-column>
              <el-table-column prop="operation_time" label="操作时间">
                <template #default="{ row }">
                  {{ row.operation_time? row.operation_time.slice(0, 16) : '暂无' }}
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
          :pager-count="7"
          :total="Tatal"
          :page-count="paginationData.pageCount"
          :current-page="paginationData.currentPage"
          @current-change="pageCurrentChange"
          :page-size="1"
        />
      </div>

      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import bread_crumb from '@/components/bread_crumb.vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Search } from '@element-plus/icons-vue'
// 获取日志接口
import {clearoperationLog, getoperationLog, getoperationLog_length, getoperationLog_page, getoperationLog_search} from '@/api/operation_log/operation_log'
// 面包屑参数
const item: Object = reactive({
  first: '操作日志',
})
// // 导入仓库
// import { useUserinfo } from '@/stores/userinfo'
// const store = useUserinfo()
interface dataFile{
  id?:number | null
  operation_person?:string | null
  operation_content?:string | null
  operation_level?:string | null
  operation_time?:string | null
}
let Message_Data = ref<dataFile[]>([{}])
//搜索框
const operationPerson = ref('')
//  获取日志
const get_loglist=async()=>{
  const res=await getoperationLog()
  Message_Data.value = res.data
}
get_loglist()
// 搜索框
const search_person = async() => {
 const res = await getoperationLog_search(operationPerson.value)
 if(res.data.length){
   Message_Data.value = res.data
   operationPerson.value = ''
 } 
 else if(operationPerson.value == ''){
  get_loglist()
 }
 else{
   ElMessage({
      type: 'error',
      message: '暂无该用户操作记录！'
    })
    operationPerson.value = ''
 }

}
// 清除日志
const ClearLog=async()=>{
ElMessageBox.confirm('是否确认清空日志列表?', 'DELETE', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
    center: true
  }).then(async() => {
    const res=await clearoperationLog()
    if(res.data.status==0){
      get_loglist()
  ElMessage({
      type: 'success',
      message: '清除成功！'
    })
}else{
  ElMessage({
      type: 'error',
      message: '清除失败！'
    })
}
  })
}
// 分页逻辑
const paginationData = reactive({
  //消息列表总数据
  pageCount: 1,
  currentPage: 1
})
//文件总数
const Tatal = ref(1)
// 获取总数
const get_ListLength = async() => {
  const res = await getoperationLog_length()
  Tatal.value  = res.data.length
  // 每页都是10一条数据
  paginationData.pageCount = Math.ceil(Tatal.value / 10)
}
get_ListLength()
// 默认获取第一页的数据
const getFirstPageList = async() => {
  const res = await getoperationLog_page(10, 1)
  Message_Data.value = res.data
}
getFirstPageList()
// 监听页面改变页数
const pageCurrentChange = async(value: number) => {
  paginationData.currentPage = value
  // 第一个参数limit，第二个参数page
  const res = await getoperationLog_page(10,paginationData.currentPage)
  Message_Data.value = res.data
}
</script>
<style scoped lang="scss">
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
        margin-bottom: 8px;
        background: #fff;
      }
    }
    .table-footer {
      display: flex;
      justify-content: flex-end;
      justify-items: end;
      background: #fff;
      margin-right: 80px;
    }
  }
}
.module-common-header {
  padding: 0 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  .button-wrapped{
   margin-top: 3px;
   margin-right: -20px;
  }
}
// 表格样式
:deep(.el-table .cell) {
  font-weight: 400;
  text-align: center;
}
</style>
