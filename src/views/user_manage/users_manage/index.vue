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
            style="width: 240px"
            placeholder="输入账号进行搜索"
          >
            <template #append>
              <el-button :icon="Search" @click="searchPUser" />
            </template>
          </el-input>
        </div>
        <!-- 按钮 -->
        <div class="button-wrapped">
          <el-button type="primary" plain @click="openAdduser(3)">添加用户管理员</el-button>
        </div>
      </div>
    </div>
    <!-- 表格内容 -->
    <div class="table-content" style="height: 100%">
      <el-table :data="tableData" style="display: flex" border>
        <el-table-column type="index" />
        <el-table-column prop="account" label="账号" width="140px" />
        <el-table-column prop="name" label="姓名" width="140px" />
        <el-table-column prop="department" label="部门" width="160px" />
        <el-table-column prop="email" label="邮箱" width="180px" />
        <el-table-column prop="update_time" label="更新时间" width="160px">
          <template #default="{ row }">
       {{ row.update_time ? row.update_time.slice(0,10) : '暂无更新'  }}
          </template>
          </el-table-column>
        <el-table-column label="操作" width="180px">
          <template #default="{ row }">
            <div class="button-table">
              <el-button type="success" plain @click="openEdit(row.id)">编辑</el-button>
              <el-button type="danger" plain @click="deletePUser(row)">删除</el-button>
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
        :pager-count="7"
        :total="adminTatal"
        :page-count="paginationData.pageCount"
        :current-page="paginationData.currentPage"
        @current-change="currentChange"
        :page-size="1"
      />
    </div>
  </div>
  <create_Amin ref="createData" @success="getPuser()"></create_Amin>
  <edit_Admin ref="Edit" @success="getPuser()"></edit_Admin>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import bread_crumb from '@/components/bread_crumb.vue'
import { Search } from '@element-plus/icons-vue'
import { bus } from '@/utils/mitt.js'
import create_Amin from '@/views/user_manage/product_manage/components/create_Amin.vue'
import edit_Admin from '@/views/user_manage/product_manage/components/edit_Admin.vue'
import { deletePuser, searchPuser, getPuserListLength, returnListData } from '@/api/userinfo/index'
import { ElMessage, ElMessageBox } from 'element-plus'
import { tracking } from '@/utils/operation'
// 面包屑参数
const item = reactive({
  first: '用户管理',
  second: '用户管理员'
})
// 搜索框
const adminUser = ref()
// 获取管理员列表
// 表格数据
let tableData= ref()
// 搜索用户的功能
const searchPUser = async() => {
  const res = await searchPuser(adminUser.value)
  if (adminUser.value) {
    tableData.value= res.data
    adminUser.value = ''
  } else {
    getPuser()
  }
}
// 拿去插件方法
const createData = ref()
// 添加管理员点击方法
const openAdduser = (Id: number) => {
  createData.value.open()
  // 事件总线发送
  bus.emit('createId', Id)
}
// 编辑弹窗
const Edit = ref()
const openEdit = (id: number) => {
  bus.emit('EditId', id)
  bus.emit('titleId', 3)
  Edit.value.open()
}
// 删除用户 account,id
const deletePUser = (row: any) => {
  ElMessageBox.confirm('是否确认删除', 'WARNING', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
    center: true
  })
    .then(async() => {
      const res = await deletePuser(row)
      if (res.data.status == 0) {
        ElMessage({
          message: '删除成功',
          type: 'success'
        })
        getPuser()
        // 操作日志埋点
        await tracking('deletePUser',row.account, '中级')
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
  const res = await getPuserListLength('用户管理员')
  adminTatal.value = res.data.length
  // 每页都是1一条数据
  paginationData.value.pageCount = Math.ceil(res.data.length / 2)
}
getListLength()
// 默认获取第一页的数据
const getFirstPageList = async() => {
  const res = await returnListData('用户管理员', 1)
  tableData.value= res.data
}
getFirstPageList()
// 监听页面改变页数
const currentChange = async(value: number) => {
  paginationData.value.currentPage=value
  const res = await returnListData('用户管理员', paginationData.value.currentPage)
  tableData.value = res.data
}
// 获取管理员列表，添加以后更新管理员列表
const getPuser = async() => {
  try {
    const res = await returnListData('用户管理员', paginationData.value.currentPage);
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
</script>

<style scoped lang="scss">
.table-wrapped {
  padding: 8px;
  height: calc(100vh - 101px);
  background: #f5f5f5;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
      width: 180px;
    }
  }
  .bable-footer {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
