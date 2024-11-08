<template>
  <div>
    <!-- 弹窗 -->
    <el-dialog v-model="dialogFormVisible" title="产品入库" width="500" height="700">
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
        <el-form-item label="入库编号" prop="product_id">
          <el-input v-model="ruleForm.product_id" />
        </el-form-item>
        <el-form-item label="产品名称" prop="product_name">
          <el-input v-model="ruleForm.product_name" />
        </el-form-item>
        <el-form-item label="产品类别" prop="product_category">
        <el-select v-model="ruleForm.product_category" placeholder="请选择产品类别"
  style="width: 240px"
  >
  <el-option 
            v-for="item in  ProductsData"
             :key="item"
             :value="item"
              />
  </el-select>
        </el-form-item>
        <el-form-item label="单位" prop="product_unit">
          <el-select v-model="ruleForm.product_unit" placeholder="请选择产品单位">
            <el-option label="个" value="个"></el-option>
            <el-option label="斤" value="斤"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="入库数量" prop="product_inwarehouse_number">
          <el-input v-model="ruleForm.product_inwarehouse_number" />
        </el-form-item>
        <el-form-item label="单价" prop="product_single_price">
          <el-input v-model="ruleForm.product_single_price" />
        </el-form-item>
        <el-form-item label="入库人" prop="product_create_person">
          <el-input v-model="ruleForm.product_create_person" disabled/>
        </el-form-item>
        <el-form-item label="入库备注" prop="in_memo">
          <el-input v-model="ruleForm.in_memo" :rows="2" type="textarea" />
        </el-form-item>
      </el-form>
      <!-- 底部按键 -->
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="Createproduct">确认</el-button>
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
import { createProduct } from '@/api/product/product'
// 调用方法
import { ElMessage } from 'element-plus'
import  { useUserinfo } from '@/stores/userinfo'
import { getProducts } from '@/api/set/set'
const dialogFormVisible = ref(false)
// 导入仓库
const store = useUserinfo ()
interface RuleForm {
  product_id: string
  product_name: string
  product_category: string
  product_unit: string
  product_inwarehouse_number: number | null
  product_single_price: number | null
  product_create_person: string
  in_memo: string
}
const ruleFormRef = ref<FormInstance>()
let ruleForm = reactive<RuleForm>({
  product_id: '',
  product_name: '',
  product_category: '',
  product_unit: '',
  product_inwarehouse_number: null,
  product_single_price: null,
  product_create_person: store.name,
  in_memo: ''
})
// 抬头标题
// 暴露open方法
const open = () => {
  dialogFormVisible.value = true
}
// 规则
const rules = reactive({
  product_id: [
    { required: true, message: '请输入产品编号', trigger: 'blur' },
    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
  ],
  product_name: [{ required: true, message: '请输入产品名称', trigger: 'blur' }],
  product_category: [{ required: true, message: '请选择产品类别', trigger: 'change' }],
  product_unit: [{ required: true, message: '请选择产品单位', trigger: 'change' }],
  product_inwarehouse_number: [{ required: true, message: '请输入入库数量', trigger: 'blur' }],
  product_single_price: [{ required: true, message: '请输入单价', trigger: 'blur' }],
  product_create_person: [{ required: true, message: '请输入入库人', trigger: 'blur' }],
  in_memo: [{ required: true, message: '请输入入库备注', trigger: 'blur' }]
})
defineExpose({
  open
})
// 确认案件逻辑
// 创建产品
const emit = defineEmits(['success'])
const Createproduct = async() => {
  const res = await createProduct(ruleForm)
  if (res.data.status == 0) {
    ElMessage({
      message: '添加成功',
      type: 'success'
    })
    emit('success')
    dialogFormVisible.value = false
    // 清空表单
    ruleFormRef.value?.resetFields()
  } else {
    ElMessage.error(res.data.message)
  }
}
// 获取产品的数组数据
let ProductsData:any=reactive({});
(async()=>{
const res=await getProducts()
// j将字符串转成数组
ProductsData=JSON.parse(res.data.data)
})()
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
