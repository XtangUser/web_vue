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
                    v-model="loginAccount"
                    style="width: 240px"
                    placeholder="输入登录账号进行搜索"
                  >
                    <template #append>
                      <el-button :icon="Search" @click="search_Account" />
                    </template>
                  </el-input>
                </div>
                <!-- 添加按钮 -->
                <div class="button-wrapped">
                  <el-button type="danger" plain @click="ClearLog">清除登录日志</el-button>
                </div>
              </div>
          <!-- 表格数据 -->
          <div class="module-common-table">
            <el-table :data="Message_Data"  style="width: 100%">
              <el-table-column type="index" />
              <el-table-column prop="account" label="账号"/>
              <el-table-column prop="name" label="姓名"/>
              <el-table-column prop="email" label="联系方式"/>
              <el-table-column prop="login_time" label="登录时间">
                <template #default="{ row }">
                  {{ row.login_time?row.login_time.slice(0, 16) : '暂无' }}
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
import { clearLoginLog,  getLoginLog_length, getLoginLog_page, getLoginLog_search } from '@/api/login_log/login_log';

// 面包屑参数
const item: Object = reactive({
  first: '登录日志',
})
interface dataFile{
  account?: string | null
  name?: string | null
  email?: string | null
  login_time?: string | null
  id?: number | null
}
let Message_Data = ref<dataFile[]>([{}])
//搜索框
const loginAccount = ref('')
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
  const res = await getLoginLog_length()
  Tatal.value  = res.data.length
  // 每页都是10一条数据
  paginationData.pageCount = Math.ceil(Tatal.value / 10)
}
get_ListLength()
// 默认获取第一页的数据
const getFirstPageList = async() => {
  const res = await getLoginLog_page(10, 1)
  Message_Data.value = res.data
}
getFirstPageList()
// 搜索框
const search_Account = async() => {
 const res = await getLoginLog_search(loginAccount.value)
 if(res.data.length){
   Message_Data.value = res.data
   loginAccount.value = ''
 }
 else if(loginAccount.value == ''){
  getFirstPageList()
 }
else{
   ElMessage({
      type: 'error',
      message: '暂无该用户登录记录！'
    })
    loginAccount.value = ''
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
    const res=await clearLoginLog()
    if(res.data.status==0){
      get_ListLength()
  getFirstPageList()
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
// 监听页面改变页数
const pageCurrentChange = async(value: number) => {
  paginationData.currentPage = value
  // 第一个参数limit，第二个参数page
  const res = await getLoginLog_page(10,paginationData.currentPage)
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
