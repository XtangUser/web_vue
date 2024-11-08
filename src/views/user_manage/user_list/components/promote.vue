<template>
  <el-dialog v-model="dialogTableVisible" title="赋权操作" width="600" center>
    <div class="my-2 flex items-center text-sm">
    <el-radio-group v-model="radio2" class="ml-4">
      <el-radio value="产品管理员">产品管理员</el-radio>
      <el-radio value="用户管理员">用户管理员</el-radio>
      <el-radio value="消息管理员">消息管理员</el-radio>
    </el-radio-group>
  </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取消</el-button>
        <el-button type="primary" @click="yes">
         确认
        </el-button>
      </div>
    </template>

  </el-dialog>
</template>

<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'
const radio2=ref()
const dialogTableVisible = ref(false)
import { bus } from '@/utils/mitt'
import { givePuser } from '@/api/userinfo'
import { ElMessage } from 'element-plus';
const Userid=ref()
bus.on('PromoteUser',(id:any)=>{
      Userid.value=id
})
// 定义一个事件

// 赋权
const yes=async()=>{
  const res=await givePuser(Userid.value,radio2.value)
 if(res.data.status==0){
   ElMessage.success(res.data.message)
   dialogTableVisible.value=false
   bus.emit('offUpdate',1)
 }
 else{
   ElMessage.error(res.data.message)
 }
  
}
// // 定义一个名为open的箭头函数，用于打开对话框
const open=()=>{
  dialogTableVisible.value=true
}
// 
defineExpose({
  open
})
	// 取消订阅/监听
	onBeforeUnmount(() => {
		bus.all.clear()
	})
</script>

<style lang="scss" scoped>
:deep(.el-radio-group){
  margin-left: 100px;
}
</style>