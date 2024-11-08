<template>
  <div>
    <!-- 忘记密码 -->
    <el-dialog v-model="dialogFormVisible" title="忘记密码：" width="320">
      <el-form :model="form" :label-position="labelPosition" :rules="rules">
        <el-form-item label="注册账号：" :label-width="formLabelWidth" prop="account">
          <el-input v-model="form.account" autocomplete="off" placeholder="请输入您的个人账号" />
        </el-form-item>
        <el-form-item label="邮   箱:" :label-width="formLabelWidth" prop="email">
          <el-input v-model="form.email" autocomplete="off" placeholder="请输入您的个人邮箱" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="changePassword"> 下一步 </el-button>
        </div>
      </template>
    </el-dialog>
    <!-- 修改密码 -->
    <el-dialog v-model="dialog_password" title="修改密码：" width="320">
      <el-form :model="forget_form" :label-position="labelPosition" :rules="rules">
        <el-form-item label="新密码:" :label-width="formLabelWidth" prop="password">
          <el-input v-model="forget_form.password" placeholder="请输入您的新密码" show-password type="password" />
        </el-form-item>
        <el-form-item label="确认新密码:" :label-width="formLabelWidth" prop="repassword">
          <el-input v-model="forget_form.repassword" placeholder="请再次输入您的新密码" show-password type="password" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialog_password = false">取消</el-button>
          <el-button type="primary" @click="resetPlogin"> 确定 </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
// 消息提示组件
import { ElMessage } from 'element-plus'
// 导入修改密码弹窗
import { vertify, resetPassword } from '@/api/login'
// 组合式api
import { reactive, ref } from 'vue'
// 导入规则
import type { FormRules } from 'element-plus'
const dialogFormVisible = ref(false)
const dialog_password = ref(false)
const formLabelWidth = '80px'
// 忘记密码
interface formData {
  account: string
  email: string,
    password?: '',
  repassword?: ''
}
let form: formData = reactive({
  account: '',
  email: '',
})
let forget_form: { password: string; repassword: string } = reactive({
  password: '',
  repassword: ''
})
// 重置变量
const resetForm = reactive({
  account: '',
  email: '',
  password: '',
  repassword: ''
})
const open = () => {
  dialogFormVisible.value = true
}
// 用于接收账号
const accountLogin = ref('')
// 表单对其方式
const labelPosition = ref('top')
// 表单规则
const rules = reactive<FormRules<formData>>({
  account: [
    { required: true, trigger: 'blur' },
    { min: 6, max: 12, message: '长度6到12位数字或者字母', trigger: 'blur' }
  ],
  email: [
    {
      required: true,
      trigger: 'blur',
      message: '请输入有效的电子邮件地址',
      validator: (rule, value, callback) => {
        if (value === '') {
          callback(new Error('电子邮件是必填项'))
        } else {
          const reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
          if (!reg.test(value)) {
            callback(new Error('请输入有效的电子邮件地址'))
          } else {
            callback()
          }
        }
      }
    }
  ],
  password: [{ required: true, trigger: 'blur' }],
  repassword: [{ required: true, trigger: 'blur' }]
})
// 打开修改密码弹窗
const changePassword = async() => {
  const res = await vertify(form)
  if (res.data.status == 0) {
    ElMessage({
      message: '认证成功',
      type: 'success'
    })
    // 保存账号,方便下一步使用
    accountLogin.value = form.account
    dialog_password.value = true
    form = { account: '', email: '' }
    dialogFormVisible.value = false
    // 关闭第一个弹窗
  } else {
    ElMessage.error(res.data.message)
  }
}
// 修改密码登录页
const resetPlogin = async() => {
  if(forget_form.password==forget_form.repassword){
    const account=accountLogin.value
    // 重置输入框
  const newPassword=forget_form.password
  const res = await resetPassword({account,newPassword})
  if(res.data.status==0){
    ElMessage({
      message: '修改成功',
      type: 'success'
    })
    dialog_password.value = false
    forget_form=resetForm
    dialogFormVisible.value = false
  } 
  else{
    ElMessage.error(res.data.message)
  }
  }
  else{
    ElMessage.error('两次密码输入不正确！')
  }

  

}

// 向外导出
defineExpose({
  open
})
</script>

<style lang="scss" scoped>
:deep(.dialog-footer) {
  position: relative;
  left: 35%;
  transform: translate(-50%);
  display: flex;
  flex-direction: row;
  .el-button {
    margin-left: 20px;
    width: 100px;
    height: 35px;
  }
}
:deep(.el-dialog) {
  height: 292px;
  --el-dialog-padding-primary: 14px;
}
</style>
