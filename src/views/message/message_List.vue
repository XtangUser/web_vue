<template>
  <!-- 引入面包屑 -->
  <bread_crumb ref="breadCrumb" :item="item"></bread_crumb>
  <div class="module-common-wrapped">
    <div class="module-common-content">
      <el-tabs v-model="activeName" class="demo-tabs">
        <!-- 公告管理 -->
        <el-tab-pane label="公告管理" name="first">
          <div class="pane-content">
            <div class="pane-top">
              <div class="module-common-header">
                <!-- 筛选框 -->
                <div class="search-wrapped">
 <el-select v-model="departmentArr" placeholder="请选择部门进行筛选..."
  style="width: 240px"
  @change="search_Message"
  >
  <el-option 
            v-for="item in departmentData"
             :key="item"
             :value="item"
              />
    </el-select>  
    &nbsp;  &nbsp;  &nbsp; 
    <el-radio-group v-model="radio" @change=" search_Level">
    <el-radio value="一般">一般</el-radio>
    <el-radio value="重要">重要</el-radio>
    <el-radio value="必要">必要</el-radio>
  </el-radio-group>
                </div>
 
                <!-- 添加按钮 -->

                <div class="button-wrapped">
                  <el-button type="primary" plain @click="getAll_Message()">全部公告</el-button>
                  <el-button type="primary"  @click="publish_Message(1)">发布公告</el-button>
                </div>
              </div>
              <!-- 表格数据 -->
              <div class="module-common-table">
                <el-table :data="Message_Data" border style="width: 100%" scrollbar-always-on>
                  <el-table-column type="index" />
                  <el-table-column prop="message_title" label="公告主题" width="160" />
                  <el-table-column prop="message_category" label="消息类别" width="160" />
                  <el-table-column prop="message_publish_department" label="发布部门" width="150"/>
                  <el-table-column prop="message_publish_name" label="发布人" width="100" />
                  <el-table-column prop="message_receipt_object" label="接收对象" width="150" />
                  <el-table-column prop="message_level" label="公告等级" width="100">
                    <template #default="{ row }">
                      <el-tag type="primary" v-if="row.message_level=='一般'">一般</el-tag>
                      <el-tag type="danger" v-else-if="row.message_level=='必要'">必要</el-tag>
                      <el-tag type="dangerwarning" v-else>重要</el-tag>
                    </template>
                  </el-table-column>
                  <el-table-column prop="message_create_time" label="发布时间" width="200">
                    <template #default="{ row }">
                      {{ row.message_create_time? row.message_create_time.slice(0, 10) : '无' }}
                    </template>
                  </el-table-column>
                  <el-table-column prop="message_update" label="最新修改时间" width="200">
                    <template #default="{ row }">
                      {{
                        row.message_update? row.message_update.slice(0, 10) : '暂无更新'
                      }}
                    </template>
                  </el-table-column>
                  <el-table-column prop="message_click_number" label="阅读人数" width="100" />
                  <el-table-column label="操作" width="200" fixed="right">
                    <template #default="{ row }">
                      <el-button type="primary" plain @click="publish_Message(row)">编辑</el-button>
                      <el-button type="danger" plain  @click="delete_Message(row)">删除</el-button>
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
        :total="CompanyTatal"
        :page-count="paginationData.Company_pageCount"
        :current-page="paginationData.Company_currentPage"
        @current-change="Company_pageCurrentChange"
        :page-size=1 
        />
          </div>
          </div>
        </el-tab-pane>
        <!-- x系统消息 -->
        <el-tab-pane label="系统消息" name="second">
          <div class="pane-content">
            <div class="pane-top">
              <div class="module-common-header">
                <div class="search-wrapped"><p></p></div>
                <!-- 添加按钮--保留弹性布局 -->
                <div class="button-wrapped">
                  <el-button type="primary"  @click="publish_Message(3)">发布公告</el-button>
                </div>
              </div>
              <!-- 表格数据 -->
              <div class="module-common-table">
                <el-table :data="SystemData" border style="width: 100%" scrollbar-always-on>
                  <el-table-column type="index" />
                  <el-table-column prop="message_title" label="消息主题" width="260" />
                  <el-table-column prop="message_publish_name" label="发布人" width="200" />
                  <el-table-column prop="message_click_number" label="阅读人数" width="200" />
                  <el-table-column prop="message_create_time" label="发布时间" width="200">
                    <template #default="{ row }">
                      {{ row.message_create_time? row.message_create_time.slice(0, 10) : '无' }}
                    </template>
                  </el-table-column>
                  <el-table-column prop="message_update_time" label="更新时间" width="200">
                    <template #default="{ row }">
                      {{ row.message_update_time? row.message_update_time.slice(0, 10) : '暂无更新' }}
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" width="200" fixed="right">
                    <template #default="{ row } ">
                      <el-button type="primary" plain @click="Edit_systemMessage(row)">编辑</el-button>
                      <el-button type="danger" plain @click="delete_Message(row)" >删除</el-button>
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
        :total="SystemTatal"
        :page-count="paginationData.System_pageCount"
        :current-page="paginationData.System_currentPage"
        @current-change="System__pageCurrentChange"
        :page-size=1 
        />
            </div>
            </div>
        
          </el-tab-pane>
        </el-tabs>
          </div>
    </div>
    <Create ref="CreateValue" @success="getAll_Message()"  @success01="getStyFirstPageList()"></Create>
</template>

<script setup lang="ts">
import { deleteMessageFirst, get_CompanyMessageTotal,getMessageList, getSystem_MessageList, getSystemMessageTotal, searchMessageByDepartment, searchMessageByLevel } from '@/api/message';
import { getDepartments } from '@/api/set/set';
import bread_crumb from '@/components/bread_crumb.vue'
import { bus } from '@/utils/mitt';
import Create from '@/views/message/components/create.vue'
import { ElMessage, ElMessageBox } from 'element-plus';
import {reactive, ref } from 'vue'
import {changeUserReadListButDelete} from '@/api/department_msg/department_msg'
	import {
		useMsg
	} from '@/stores/message'
	const msgStore = useMsg()
// 面包屑参数
const item: Object = reactive({
  first: '消息管理',
  second: '消息列表'
})
// tab页
const activeName = ref('first')
const breadCrumb = ref()
// 筛选框
const radio = ref('')
const departmentArr = ref('')
// 发布公告的弹窗
const CreateValue = ref()
//表单数据
interface msgData {
  message_title?:string | null,
  message_category?:string | null,         //varchar(255) null comment '消息类别',
  message_publish_department?:string | null, ////varchar(255) null comment '发布消息部门',
  message_publish_name?:string | null,      //varchar(255) null comment '消息发布者',
  message_receipt_object?:string | null,     //varchar(255) null comment '消息接收者',
  message_click_number?:string | null,       //int          null comment '消息查看数量',
  message_content?:string | null,           //varchar(255) null comment '消息内容',
  message_create_time?:string | null,        //varchar(255) null comment '消息发布时间',
  message_update?:string | null,            //varchar(255) null comment '消息更新时间',
  message_level?:string | null,            // varchar(255) null comment '消息等级',
  message_status?:string | null,             //int          null comment '默认为0，1在回收站',
  message_delete_time?:string | null,       // varchar(255) null comment '消息删除时间'
  id?:null | number
}
let Message_Data=ref<msgData[]>([{}])
let SystemData=ref<msgData[]>([{
  message_title:'',
  message_publish_name:'',
  message_click_number:'',
  message_create_time:'',
}])
// 获取公司消息总数
const get_CompanyListLength = async() => {
  const res = await get_CompanyMessageTotal()
  CompanyTatal.value = res.data.total
  // 每页都是1一条数据
  paginationData.Company_pageCount = Math.ceil(res.data.total / 10)
}
get_CompanyListLength()
// 发布公告
const publish_Message = (id:number) => {
  bus.emit('JustifyMessage',id)
  CreateValue.value.open()
}
// 删除公告
const delete_Message =(row:any) => {
 ElMessageBox.confirm('是否确认删除此条公告', 'WARNING', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
    center: true,
  }).then(async() => {
    const res= await deleteMessageFirst(row.id)
    if (res.status == 200) {
      await changeUserReadListButDelete(row.id,row.message_receipt_object)
      await msgStore.returnReadList()
      getAll_Message()
      getStyFirstPageList()
      ElMessage({
        message: '删除成功',
        type: 'success'
      })
    } else {
      ElMessage.error(res.data.message)
    }
  })
}
// 编辑公告
const Edit_systemMessage =async(row:any) => {
  bus.emit('JustifyMessage',4)
  bus.emit('MessageData',row)
  CreateValue.value.open()
}
// 搜索根据部门搜索公告
const search_Message = async(departmentArr:string) => {
  const res = await searchMessageByDepartment(departmentArr)
  if(res.status == 200){
    Message_Data.value = res.data
  }
}
// 搜索根据等级搜索公告
const search_Level = async(radio:string) => {
  const res = await searchMessageByLevel(radio)
  if(res.status == 200){
    Message_Data.value = res.data
  }
}
// 获取部门的数组数据
let departmentData:any=reactive({});
(async()=>{
const res=await getDepartments()
// j将字符串转成数组
departmentData=JSON.parse(res.data.data)
})()
// 分页逻辑
const paginationData =reactive({
  //消息列表总数据
  Company_pageCount: 1,
  Company_currentPage: 1,
  // 申请列表
  System_pageCount: 1,
  System_currentPage: 1
})
//公司信息总数
const CompanyTatal = ref<number>(0)
// 系统消息总数
const SystemTatal = ref<number>(0)
// 默认获取第一页的数据
const getFirstPageList = async() => {
  const res = await getMessageList(10,1)
  Message_Data.value=res.data
}
getFirstPageList()
// 监听页面改变页数
const Company_pageCurrentChange= async(value: number) => {
  paginationData.Company_currentPage=value
  // 第一个参数limit，第二个参数page
  const res = await getMessageList(10,paginationData.Company_currentPage)
  Message_Data.value=res.data
}
//-------系统消息-------
// 获取系统消息总数
const get_SystemListLength = async() => {
  const res = await getSystemMessageTotal()
  SystemTatal.value = res.data.total
  // 每页都是1一条数据
  paginationData.System_pageCount = Math.ceil(res.data.total / 10)
}
get_SystemListLength()
// 默认获取第一页的数据
const getStyFirstPageList = async() => {
  const res = await getSystem_MessageList(10,1)
  SystemData.value=res.data
  get_SystemListLength()
}
getStyFirstPageList()
// 监听页面改变页数
const System__pageCurrentChange= async(value: number) => {
  paginationData.System_currentPage=value
  // 第一个参数limit，第二个参数page
  const res = await getSystem_MessageList(10,paginationData.System_currentPage)
  SystemData.value=res.data
}
// 获取全部公告
const getAll_Message =async() => {
getFirstPageList()
get_CompanyListLength()
 departmentArr.value=''
 radio.value=''
}
getAll_Message()
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