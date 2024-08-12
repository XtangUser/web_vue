<template>
  <div>
    <!-- 忘记密码 -->
    <el-dialog v-model="dialogFormVisible" title="忘记密码：" width="320">
    <el-form :model="form" :label-position="labelPosition" :rules="rules">
      <el-form-item label="注册账号：" :label-width="formLabelWidth" prop="account">
        <el-input v-model="form.account" autocomplete="off" placeholder="请输入您的个人账号"/>
      </el-form-item>
      <el-form-item label="邮   箱:" :label-width="formLabelWidth" prop="email">
        <el-input v-model="form.email" autocomplete="off" placeholder="请输入您的个人邮箱"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="changePassword ">
          下一步
        </el-button>
      </div>
    </template>
  </el-dialog>
  <!-- 修改密码 -->
       <el-dialog v-model="dialog_password" title="修改密码：" width="320">
    <el-form :model="form" :label-position="labelPosition" :rules="rules">
      <el-form-item label="新密码:" :label-width="formLabelWidth" prop="password">
        <el-input v-model="form.password" autocomplete="off" placeholder="请输入您的新密码"/>
      </el-form-item>
      <el-form-item label="确认新密码:" :label-width="formLabelWidth" prop="password">
        <el-input v-model="form.repassword" autocomplete="off" placeholder="请再次输入您的新密码"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialog_password = false">取消</el-button>
        <el-button type="primary" @click="close">
        确定
        </el-button>
      </div>
    </template>
  </el-dialog>
  </div>
</template>

<script lang="ts" setup>
// 组合式api
import { reactive, ref } from 'vue'
// 导入规则
import type {  FormRules } from 'element-plus'
const dialogFormVisible = ref(false)
const dialog_password = ref(false)
const formLabelWidth = '80px'
// 忘记密码
interface formData{
  account:string,
  email:string,
  password?:string,
  repassword?:string
}
let form:formData = reactive({
  account:'',
  email:'',
  password:'',
  repassword:''
})
// 重置变量
const resetForm=reactive({
  account:'',
  email:'',
  password:'',
  repassword:''
})
const open=()=>{
  dialogFormVisible.value=true
}
// 关闭
const close=()=>{
  dialogFormVisible.value=false
  form=resetForm
  dialog_password.value=false

}
// 表单对其方式
const labelPosition=ref('top')
// 表单规则
const rules = reactive<FormRules<formData>>({
  account: [
  { required: true, trigger: 'blur' },
  { min: 6, max: 12, message: 'Length should be 6 to 12', trigger: 'blur' },
  ],
  email:[
  { required: true, trigger: 'blur' },
  ],
  password:[
  { required: true, trigger: 'blur' },
  ], 
  repassword:[
  { required: true, trigger: 'blur' },
  ], 
})
// 打开修改密码弹窗
const changePassword=()=>{
  dialog_password.value = true
  // 关闭第一个弹窗
  dialogFormVisible.value=false
}

// 向外导出
defineExpose({
  open
})
</script>

<style lang="scss" scoped>
:deep(.dialog-footer){
  position: relative;
  left: 35%;
    transform: translate(-50%);
    display: flex;
    flex-direction: row;
    .el-button{
      margin-left: 20px;
      width: 100px;
      height: 35px;
    }
}
:deep(.el-dialog){
    height: 292px; 
    --el-dialog-padding-primary:14px;
}
</style>