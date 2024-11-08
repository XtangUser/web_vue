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
                </div>
                <!-- 添加按钮 -->
                <div class="button-wrapped">
    <el-upload
    class="upload-demo"
    action="http://127.0.0.1:3007/files/uploadFile"
    multiple
    :limit="3"
    :on-success="handleSuccess"
    :on-error="handleError"
    :show-file-list="false"
  >
  <el-button type="primary" plain >上传文件</el-button>
  </el-upload>
        
                </div>
              </div>
          <!-- 表格数据 -->
          <div class="module-common-table">
            <el-table :data="Message_Data"  style="width: 100%">
              <el-table-column type="index" />
              <el-table-column prop="file_name" label="文件名" width="160px"/>
              <el-table-column prop="file_size" label="文件大小"/>
              <el-table-column prop="upload_person" label="上传者"/>
              <el-table-column prop="download_number" label="下载次数" />
              <el-table-column prop="upload_time" label="上传时间">
                <template #default="{ row }">
                  {{ row.upload_time? row.upload_time.slice(0, 16) : '暂无' }}
                </template>
              </el-table-column>
              <el-table-column label="操作" width="200">
                <template #default="{ row }">
                  <el-button type="primary" plain @click="down_files(row)">
                    <template #default>
                      <a :href="row.file_url" style="text-decoration: none; color:black;">下载</a>
                    </template>
                  </el-button>
                  <el-button type="danger" plain @click="delete_file(row)">删除</el-button>
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
// 获取文件列表
import {getFileList, getFileListByPage,bindFile,deleteFile, downloadFiles, updateDownloadNumber} from '@/api/files/files'
// 面包屑参数
const item: Object = reactive({
  first: '合同管理',
})
// 导入仓库
import { useUserinfo } from '@/stores/userinfo'
const store = useUserinfo()
interface dataFile{
  file_name?:string
  file_size?:string
  upload_time?:string
  file_url?:string
  upload_person?:string
  id?:number | null
  download_number?:number | null
}
let Message_Data = ref<dataFile[]>([{}])
// 分页逻辑
const paginationData = reactive({
  //消息列表总数据
  pageCount: 1,
  currentPage: 1
})
//文件总数
const Tatal = ref(0)
// 获取公司消息总数
const get_ListLength = async() => {
  const res = await getFileList()
  Tatal.value  = res.data.length
  // 每页都是10一条数据
  paginationData.pageCount = Math.ceil(Tatal.value / 1)
}
get_ListLength()
// 默认获取第一页的数据
const getFirstPageList = async() => {
  const res = await getFileListByPage(1, 1)
  Message_Data.value = res.data
}
getFirstPageList()
// 上传文件
const handleSuccess = async(response: any) => {
  if(response.status == 1){
    ElMessage({
      message: response.message,
      type: 'error',
    })
  }
  else{
    getFirstPageList()
  // 绑定用户
 await bindFile(store.name,response.url)
  ElMessage({
    message: '上传成功',
    type: 'success',
  })
      // 更新文件总数和分页信息
      get_ListLength()
  }
}
const handleError = () => {
  ElMessage.error('上传失败')
}

// 监听页面改变页数
const pageCurrentChange = async(value: number) => {
  paginationData.currentPage = value
  // 第一个参数limit，第二个参数page
  const res = await getFileListByPage(paginationData.currentPage,1)
  Message_Data.value = res.data
}
// 删除操作
const delete_file = (row: any) => {
  ElMessageBox.confirm('是否确认删除此文件', 'DELETE', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
    center: true
  }).then(async() => {
    const res = await deleteFile(row.id)
    if (res.status == 200) {
      getFirstPageList() // 直接刷新当前页数据
      ElMessage({
        message: '删除成功',
        type: 'success'
      })
      get_ListLength()
    } else {
      ElMessage.error(res.data.message)
    }
  })
}// 下载文件
const down_files =async(row: any) => {
    const res = await downloadFiles(row.id)
    row.file_url=res.data.url
    if (res.status == 200) {
     // 更新下载次数
    const data= await updateDownloadNumber(row.id)
    if(data.status == 200){
      row.download_number=data.data.number
      
      ElMessage({
        message: '下载成功',
        type: 'success'
      })
    } else {
      ElMessage.error(res.data.message)
    }
    }
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
