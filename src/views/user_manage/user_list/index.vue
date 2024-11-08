<template>
  <bread_crumb ref="breadCrumb" :item="item"></bread_crumb>
  <!-- 外壳 -->
  <div class="table-wrapped">
    <!-- 顶部 -->
    <div class="table-top">
      <!-- 表格顶部 -->
      <div class="table-header">
        <!-- 搜索框 -->
        <div class="search-wrapped">
          <el-input
            v-model="adminUser"
            style="width: 240px;"
            placeholder="输入账号进行搜索"
            @change="searchPUser"
            clearable
          >
          <template #append>
        <el-button :icon="Search" />
      </template>
    </el-input>
    <el-input
            v-model="addepartment"
            style="width: 240px;margin-left: 10px"
            placeholder="根据部门进行筛选"
            @change="searchPdepartment"
            clearable
          >
          <template #append>
        <el-button :icon="Search" />
      </template>
    </el-input>
        </div>
        <!-- 按钮 -->
        <div class="button-wrapped">
          <el-button type="primary" plain @click="geticePUser">筛选冻结用户</el-button>
          <el-button type="primary" plain @click="getPuser">显示全部用户</el-button>
        </div>
      </div>
    </div>
    <!-- 表格内容 -->
    <div class="table-content" style="height: 100%">
      <el-table :data="tableData" border style="display: flex" @row-dblclick="openUser">
        <el-table-column type="index" width="40" />
        <el-table-column prop="account" label="账号" width="100x"/>
        <el-table-column prop="name" label="姓名" width="80px"/>
        <el-table-column prop="sex" label="性别" width="80px" />
        <el-table-column prop="identify" label="身份" width="80px"/>
        <el-table-column prop="department" label="部门" width="80px" />
        <el-table-column prop="email" label="邮箱" width="110px" />
        <el-table-column prop="status" label="状态" width="80px" >
        <template #default="{ row }">
          <el-tag type="success" v-if="row.status == 0">正常</el-tag>
          <el-tag type="info" v-else>冻结</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="create_time" label="创建时间" width="110px" >
        <template #default="{ row }">
       {{ row.create_time.slice(0,10) }}
          </template>
          </el-table-column>
        <el-table-column prop="update_time" label="更新时间" width="110px" >
          <template #default="{ row }">
       {{ row.update_time ? row.update_time.slice(0,10) : '暂无更新' }}
          </template>
          </el-table-column>
        <el-table-column label="操作" width="150px">
          <template #default="{ row }">
            <div class="button-table">
              <el-button type="primary" plain @click="iceuser(row.id)" :disabled="row.status != 0">冻结</el-button>
              <el-button type="success" plain  @click="ProtectUser(row.id)" :disabled="row.status != 1">解冻</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 表格底部 -->
    <div class="bable-footer">
      <el-pagination
        background
        layout="prev, pager, next"
        pager-count="7"
        :total="adminTatal"
        :page-count="paginationData.pageCount"
        :current-page="paginationData.currentPage"
        @current-change="currentChange"
        page-size="1"
      />
    </div>
  </div>
  <userInfo ref="userDetail" ></userInfo>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import bread_crumb from '@/components/bread_crumb.vue'
import { Search } from '@element-plus/icons-vue'
import userInfo from './components/userInfo.vue'
import { searchPuser,searchDepartuser,getPuserListLength, returnListData,geticePuser,icePuser,ProtectPuser  } from '@/api/userinfo/index'
import { ElMessage} from 'element-plus'
import { bus } from '@/utils/mitt'
import { tracking } from '@/utils/operation'
// 导入仓库
import { useUserinfo } from '@/stores/userinfo'
const store = useUserinfo()
// 用户详情弹窗
const userDetail=ref()
// 面包屑参数
const item = reactive({
  first: '用户管理',
  second: '用户列表'
})
// 搜索框
const adminUser = ref()
// 获取管理员列表
// 表格数据
const tableData = ref([])
// 搜索用户的功能
const searchPUser = async() => {
  const res = await searchPuser(adminUser.value)
  if(adminUser.value){
    tableData.value = res.data
    adminUser.value=''
  }
  else{
    getPuser()
  }
  
}
// 监听赋权操作进行页面更新
bus.on('offUpdate',(num)=>{
  if(num==1){
    // 更新页面
    getPuser()
    // 关闭弹窗
    userDetail.value.close()
  }
  else{
    getPuser()
    userDetail.value.closeEdituser()
  }
})
// 根据部门进行筛选
const addepartment=ref()
const searchPdepartment= async() => {
  const res = await searchDepartuser(addepartment.value)
  if(addepartment.value){
    tableData.value = res.data
    addepartment.value=''
  }
  else{
    getPuser()
  }
  
}
// 分页逻辑
const paginationData = ref({
  // 总页数
  pageCount: 1,
  // 当前页数
  currentPage: 1
})
const adminTatal = ref<number>(0)
// 获取筛选状态总人数
const getListLength = async() => {
  const res = await getPuserListLength('用户')
  adminTatal.value = res.data.length
  // 每页都是1一条数据
  paginationData.value.pageCount = Math.ceil(res.data.length / 2)
}
getListLength()
// 默认获取第一页的数据
const getFirstPageList = async() => {
  const res = await returnListData('用户', 1)
  tableData.value= res.data
}
getFirstPageList()
// 监听页面改变页数
const currentChange = async(value: number) => {
  paginationData.value.currentPage=value
  const res = await returnListData('用户', paginationData.value.currentPage)
  tableData.value = res.data
}
//获取管理员列表，添加以后更新管理员列表
const getPuser = async() => {
  try {
    const res = await returnListData('用户', paginationData.value.currentPage);
    tableData.value = res.data;
    
    let currentPage = paginationData.value.currentPage;
    
    if (tableData.value.length === 0) {
      // 如果当前页已经是第一页，则不再减一
      if (currentPage > 1) {
        paginationData.value.currentPage = currentPage - 1;
        getFirstPageList();
        getListLength();
      }
    }
  } catch (error) {
    console.error('获取管理员列表失败:', error);
    // 可以在这里添加其他错误处理逻辑
  }
}
getPuser()
// 获取冻结用户列表
const geticePUser=async()=>{
 const res=await geticePuser()
 tableData.value=res.data
 }
//冻结操作
const iceuser=async(id:number)=>{
const res=await icePuser(id)
if(res.data.status == 0){
  ElMessage({
          message: '冻结用户成功',
          type: 'success'
        })
   await tracking('iceuser',store.name, '中级')
   getFirstPageList()
}
else{
  ElMessage({
          message:'冻结失败',
          type: 'error'
        })
}

}
// 解冻操作
const ProtectUser=async(id:number)=>{
  const res=await ProtectPuser(id)
if(res.data.status==0){
  ElMessage({
          message: '解冻用户成功',
          type: 'success'
        })
        getFirstPageList()
        // 添加日志
  await tracking('ProtectUser',store.name, '中级')
}

else{
  ElMessage({
          message: '解冻失败',
          type: 'error'
        })
}
}
// 双击显示用户详情弹窗
const openUser=(row:any)=>{
  bus.emit('UdetailId',row)
userDetail.value.open()
}
</script>
<style scoped lang="scss">
.table-wrapped {
  padding: 8px;
  height: calc(100vh - 101px);
  background: #f5f5f5;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  .table-top {
    .table-header {
      padding: 0 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 48px;
      background-color: #fff;
    }
  }
  .table-content {
    :deep(.el-table .cell) {
      text-align: center;
    }

    :deep(.button-table) {
      width: 135px;
    }
  }
  .bable-footer {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
