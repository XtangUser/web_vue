<template>
  <div>
    <!-- 弹窗 -->
    <el-dialog v-model="dialogFormVisible" title="产品入库" width="500" height="700">
      <div class="product-name">你申请出库的产品是:&nbsp;&nbsp;<span>{{ product_out_name }}</span> </div>
      <div class="product-name">库存还剩:&nbsp;&nbsp;<span>{{ ruleForm.product_inwarehouse_number}}</span> </div>
      <div class="diglog-form">
      <!-- 表格 -->
      <el-form
        :model="ruleForm"
        label-width="auto"
        style="max-width: 300px"
        ref="ruleFormRef"
        class="form-dialog"
        :rules="rules"
        labelPosition="left"
      >
        <el-form-item label="出库编号" prop="product_out_id">
          <el-input v-model="ruleForm.product_out_id" />
        </el-form-item>
        <el-form-item label="出库数量" prop="product_out_number">
          <el-input v-model="ruleForm.product_out_number" />
        </el-form-item>
        <el-form-item label="出库申请人" prop="product_out_apply_person">
          <el-input v-model="ruleForm.product_out_apply_person" />
        </el-form-item>
        <el-form-item label="出库备注" prop="apply_memo">
          <el-input v-model="ruleForm.apply_memo" :rows="2" type="textarea" />
        </el-form-item>
      </el-form>
      </div>
      <!-- 底部按键 -->
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="Outproduct">确认</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onBeforeUnmount } from 'vue'
import type { FormInstance } from 'element-plus'
import { bus } from '@/utils/mitt.js'
// // 产品入库-创建产品
import { outProduct } from '@/api/product/product'
// 调用方法
import { ElMessage } from 'element-plus'
const dialogFormVisible = ref(false)
interface RuleForm {
  id: number | null,
  product_out_id: string,
  product_single_price: number | null,
  product_out_number: number | null,
  product_out_apply_person: string,
  apply_memo: string
  product_inwarehouse_number: number | null
}
const ruleFormRef = ref<FormInstance>()
let ruleForm = reactive<RuleForm>({
  id: null,
  product_out_id: '',
  product_single_price: null,
  product_out_number: null,
  product_inwarehouse_number: null,
  product_out_apply_person: '',
  apply_memo: ''
})
// 抬头标题
// 暴露open方法
const open = () => {
  dialogFormVisible.value = true
}
// 规则
const rules = reactive({
  product_out_id: [
    { required: true, message: '请输入产品编号', trigger: 'blur' },
    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }

  ],
  product_single_price: [
    { required: true, message: '请输入单价', trigger: 'blur' }
  ]
  ,
  product_out_number: [
    { required: true, message: '请输入出库数量', trigger: 'blur' }
  ],
  product_out_apply_person: [
    { required: true, message: '请输入出库人', trigger: 'blur' }
  ],
  apply_memo: [
    { required: true, message: '请输入出库备注', trigger: 'blur' }
  ]
})
defineExpose({
  open
})
// 确认案件逻辑
// 创建产品
const product_out_name=ref('')
const emit = defineEmits(['success'])
bus.on('outAuitProductId', (row:any) => {
  ruleForm.id=row.id
  product_out_name.value=row.product_name
  ruleForm.product_single_price=row.product_single_price
  ruleForm.product_inwarehouse_number=row.product_inwarehouse_number
  ruleForm.product_out_id=row.product_id
})
const Outproduct = async() => {
  const res = await outProduct(ruleForm)
  if (res.data.status == 0) {
    ElMessage({
      message: '申请出库成功',
      type: 'success'
    })
    ruleForm={
      id: null,
      product_out_id: '',
      product_single_price: null,
      product_out_number: null,
      product_inwarehouse_number: null,
      product_out_apply_person: '',
      apply_memo: ''
    }
    emit('success')
    dialogFormVisible.value = false
    // 清空表单
    ruleFormRef.value?.resetFields()
  } else {
    ruleForm={
      id: null,
      product_out_id: '',
      product_single_price: null,
      product_out_number: null,
      product_inwarehouse_number: null,
      product_out_apply_person: '',
      apply_memo: ''
    }
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
.product-name{
  width: 100%;
  display: flex;
  justify-content: center;
  font-size: 16px;
  margin-bottom: 20px;
  span{
    color: #de331c;
  }
}

</style>
