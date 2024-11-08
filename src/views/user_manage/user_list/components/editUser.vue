<template>
  <div>
    <!-- 弹窗 -->
    <el-dialog v-model="dialogFormVisible" :title="title" width="500" height="700">
      <!-- 表格 -->
      <el-form
        :model="ruleForm"
        label-width="auto"
        style="max-width: 300px"
        ref="ruleFormRef"
        :rules="rules"
        class="form-dialog"
      >
        <el-form-item label="账号" prop="account" >
          <el-input v-model="ruleForm.account" disabled />
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="ruleForm.sex" placeholder="请选择性别" style="width: 300px">
            <el-option value="男" />
            <el-option value="女" />
          </el-select>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="ruleForm.email" />
        </el-form-item>
        <el-form-item label="身份" prop="identify">
          <el-input :value="ruleForm.identify" />
        </el-form-item>
        <el-form-item label="部门" prop="department">
          <el-select v-model="ruleForm.department" placeholder="请选择部门" style="width: 300px">
  <el-option 
            v-for="item in departmentData"
             :key="item"
             :value="item"
              />
    </el-select>  
        </el-form-item>
      </el-form>
      <!-- 底部按键 -->
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="Editadmin">确认</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive ,onBeforeUnmount} from 'vue'
import type { FormInstance } from 'element-plus'
import { bus } from '@/utils/mitt.js'
import {editPUser} from '@/api/userinfo/index'
import { ElMessage } from 'element-plus'
import { getDepartments } from '@/api/set/set'
const dialogFormVisible = ref(false)
interface RuleForm {
  id: number
  name: string
  sex: string
  department: string
  email: string
  account: string,
  identify:string
}
const ruleFormRef = ref<FormInstance>()
let ruleForm = ref<RuleForm>({
  id: 0,
  name: '',
  sex: '',
  department: '',
  email: '',
  account: '',
  identify:'用户'
})
// 抬头标题
const title = ref()
const rules = reactive<Record<keyof RuleForm, any[]>>({
  name: [
    { required: true, message: '姓名是必填项', trigger: 'blur' },
    {
      pattern: /^[\u4E00-\u9FA5]{2,10}(·[\u4E00-\u9FA5]{2,10}){0,2}$/,
      message: '姓名必须是2到10个汉字,可以包含最多两个·连接的复姓。',
      trigger: 'blur'
    }
  ],
  sex: [
    { required: true, message: '性别是必填项', trigger: 'blur' },
    { pattern: /^(男|女)$/, message: '性别必须是“男”或“女”。', trigger: 'blur' }
  ],
  department: [{ required: true, message: '部门是必填项', trigger: 'blur' }],
  email: [
    { required: true, message: '邮箱是必填项', trigger: 'blur' },
    { type: 'email', message: '邮箱格式不正确', trigger: ['blur', 'change'] }
  ],
  account: [
    { required: true, message: '账号是必填项', trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9]{6,12}$/, message: '账号必须是6到12位的字母或数字。', trigger: 'blur' }
  ],
  id: [],
  identify:[ { required: true, message: '身份必填项', trigger: 'blur' },]
})
// 暴露open方法
const open = () => {
  dialogFormVisible.value = true
}
// 关闭弹窗
const close = () => {
  dialogFormVisible.value = false
}
// bus总线进行监听
bus.on('editUserId', async(data:any) => {
  ruleForm.value=data
ruleForm.value.account=data.account
ruleForm.value.name=data.name
ruleForm.value.sex=data.sex
ruleForm.value.email=data.email
ruleForm.value.department=data.department
ruleForm.value.identify=data.identify
})
defineExpose({
  open,
  close
})
// 获取部门的数组数据
let departmentData:any=reactive({});
(async()=>{
const res=await getDepartments()
// j将字符串转成数组
departmentData=JSON.parse(res.data.data)
})()
// 确认案件逻辑
const Editadmin=async()=>{
  const res=await editPUser(ruleForm.value)
  if(res.data.status==0){
    ElMessage({
        message: '修改成功',
        type: 'success'
      })  
      // 确认以后，进行刷新获取列表
  bus.emit('offUpdate',2)
  dialogFormVisible.value = false
  }
  else{
    ElMessage.error(res.data.message)
  }


  
}
	// 取消订阅/监听
	onBeforeUnmount(() => {
		bus.all.clear()
	})
</script>

<style scoped lang="scss">
.form-dialog {
  margin: 0 auto;
  width: 100%;
  :deep(.el-input__wrapper) {
    margin-top: 10px;
  }
}
</style>
