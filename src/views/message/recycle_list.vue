<template>
  <!-- 引入面包屑 -->
  <bread_crumb ref="breadCrumb" :item="item"></bread_crumb>
  <div class="module-common-wrapped">
    <div class="module-common-content">
      <div class="pane-content">
        <div class="pane-top">
          <!-- 表格数据 -->
          <div class="module-common-table">
            <el-table :data="Message_Data" border style="width: 100%" scrollbar-always-on>
              <el-table-column type="index" />
              <el-table-column prop="message_title" label="消息主题" width="160" />
              <el-table-column prop="message_category" label="所属类别" width="160" />
              <el-table-column prop="message_publish_department" label="发布部门" width="150" />
              <el-table-column prop="message_publish_name" label="发布人" width="100" />
              <el-table-column prop="message_receipt_object" label="接收对象" width="150" />
              <el-table-column prop="message_delete_time" label="删除日期" width="200">
                <template #default="{ row }">
                  {{ row.message_delete_time ? row.message_delete_time.slice(0, 10) : '暂无' }}
                </template>
              </el-table-column>
              <el-table-column label="操作" width="200" fixed="right">
                <template #default="{ row }">
                  <el-button type="primary" plain @click="delete_MessageBack(row)">还原</el-button>
                  <el-button type="danger" plain @click="delete_Message(row)">彻底删除</el-button>
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
import {
  deleteMessage,
  deleteMessageBack,
  getDeleteMessageList,
  getDeleteMessageListPage
} from '@/api/message'
import {
		useMsg
	} from '@/stores/message'
	const msgStore = useMsg()
import { ElMessage, ElMessageBox } from 'element-plus'
import { changeUserReadList} from '@/api/department_msg/department_msg';
// 面包屑参数
const item: Object = reactive({
  first: '消息管理',
  second: '回收站'
})

//表单数据
interface msgData {
  message_title?: string | null
  message_category?: string | null //varchar(255) null comment '消息类别',
  message_publish_department?: string | null ////varchar(255) null comment '发布消息部门',
  message_publish_name?: string | null //varchar(255) null comment '消息发布者',
  message_receipt_object?: string | null //varchar(255) null comment '消息接收者',
  message_click_number?: string | null //int          null comment '消息查看数量',
  message_content?: string | null //varchar(255) null comment '消息内容',
  message_create_time?: string | null //varchar(255) null comment '消息发布时间',
  message_update?: string | null //varchar(255) null comment '消息更新时间',
  message_level?: string | null // varchar(255) null comment '消息等级',
  message_status?: string | null //int          null comment '默认为0，1在回收站',
  message_delete_time?: string | null // varchar(255) null comment '消息删除时间'
  id?: null | number
}
//公司信息总数
const Tatal = ref(0)
// 获取公司消息总数
const get_ListLength = async() => {
  const res = await getDeleteMessageList()
  Tatal.value  = res.data.length
  // 每页都是10一条数据
  paginationData.pageCount = Math.ceil(Tatal.value / 1)
}
get_ListLength()
let Message_Data = ref<msgData[]>([{}])
// 获取删除消息列表
const getDelete_List = async() => {
  getFirstPageList()
}
getDelete_List()

// 还原操作
const delete_MessageBack = (row: any) => {
  ElMessageBox.confirm('是否确认恢复此条消息', 'BACK', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'success',
    center: true
  }).then(async() => {
    const res = await deleteMessageBack(row.id)
    if (res.status == 200) {
      await changeUserReadList(row.id,row.message_receipt_object)
      await msgStore.returnReadList()
      getFirstPageList()
      ElMessage({
        message: '还原成功',
        type: 'success'
      })
      get_ListLength()
    } else {
      ElMessage.error(res.data.message)
    }
  })
}
// 彻底删除
const delete_Message = (row: any) => {
  ElMessageBox.confirm('是否确认彻底删除此条消息', 'DELETE', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
    center: true
  }).then(async() => {
    const res = await deleteMessage(row.id)
    if (res.status == 200) {
      getFirstPageList()
      ElMessage({
        message: '删除成功',
        type: 'success'
      })
      get_ListLength()
    } else {
      ElMessage.error(res.data.message)
    }
  })
}
// 分页逻辑
const paginationData = reactive({
  //消息列表总数据
  pageCount: 1,
  currentPage: 1
})
// 默认获取第一页的数据
const getFirstPageList = async() => {
  const res = await getDeleteMessageListPage(1, 1)
  Message_Data.value = res.data
}
getFirstPageList()
// 监听页面改变页数
const pageCurrentChange = async(value: number) => {
  paginationData.currentPage = value
  // 第一个参数limit，第二个参数page
  const res = await getDeleteMessageListPage(1, paginationData.currentPage)
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
        padding: 10px 10px 20px;
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
}
// 表格样式
:deep(.el-table .cell) {
  font-weight: 400;
  text-align: center;
}
</style>
