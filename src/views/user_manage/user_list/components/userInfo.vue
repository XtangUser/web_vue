<template>
  <el-dialog v-model="dialogUserVisible" title="用户信息" width="500" center>
    <div class="common-layout">
    <el-container>
      <el-aside width="200px"> <el-avatar shape="square" :size="120" :src="squareUrl" /></el-aside>
      <el-main>
        <div class="Udetail-infor">
          <p>账号:&nbsp;{{ UdetailData.account}}</p>
          <p>姓名:&nbsp;{{UdetailData.name }}</p>
          <p>性别:&nbsp;{{ UdetailData.sex }}</p>
          <p>部门:&nbsp;{{ UdetailData.department}}</p>
          <p>邮箱:&nbsp;{{UdetailData.email}}</p>
          <p>状态:&nbsp;{{UdetailData.status==0?'正常':'冻结'}}</p>
        </div>
      </el-main>
    </el-container>
    <el-footer class="">
      <div @click="openEdituser">编辑</div>
      <div @click="openPuser">赋权</div>
      <div @click="deletePUser">删除用户</div>
    </el-footer>
  </div>
  </el-dialog>
  <promote ref="promoteData"></promote>
  <editUser ref="editData"></editUser>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, reactive, ref,toRefs} from 'vue'
import { bus } from '@/utils/mitt'
import promote from './promote.vue';
import editUser from './editUser.vue';
import { ElMessage,ElMessageBox} from 'element-plus'
import { deletePuser} from '@/api/userinfo/index'
const state = reactive({
  squareUrl:
    'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png',
})
// 用户详情数据
const UdetailData=ref()
bus.on('UdetailId',(row:any)=>{
  UdetailData.value=row
  state.squareUrl=UdetailData.value.image_url
})
const { squareUrl} = toRefs(state)
// 用户详情弹窗
const dialogUserVisible = ref(false)
// 赋权弹窗
const promoteData=ref()
const openPuser=() =>{
  bus.emit('PromoteUser',UdetailData.value.id)
  promoteData.value.open()
}
const open=()=>{
  dialogUserVisible.value=true
}
const close=()=>{
  dialogUserVisible.value=false

}
// -------------------打开编辑用户信息弹窗-------------------
const editData=ref()
// 点击编辑按钮，打开编辑用户弹窗
const openEdituser=()=>{
  editData.value.open()
  bus.emit('editUserId',UdetailData.value)
}
const closeEdituser=()=>{
 editData.value.close()
}
defineExpose({
  open,
  close,
  closeEdituser,
})
// 删除用户弹窗
// 监听用户详情弹窗关闭事件
const deletePUser = () => {
  ElMessageBox.confirm('是否确认删除用户', 'WARNING', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
    center: true
  })
    .then(async() => {
      const res = await deletePuser(UdetailData.value)
      if (res.data.status == 0) {
        ElMessage({
          message: '删除成功',
          type: 'success'
        })
        bus.emit('offUpdate',1)
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
	// 取消订阅/监听
	onBeforeUnmount(() => {
		bus.all.clear()
	})
</script>

<style scoped lang="scss">
:deep(.el-footer){
  display: flex;
    justify-items: end;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    div{
      margin-right: 15px;
      color: lightblue;
      cursor: pointer;
    }
}
:deep(.el-main){
  padding: 0px;
  text-align: left;
  padding-left: 20px;
}
:deep(.el-container){
  display: flex;
  justify-content: space-around;
  .el-aside{
    text-align: center;
   padding-top: 30px;
  }
}
</style>