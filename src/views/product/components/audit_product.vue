<template>
  <div>
    <el-dialog v-model="centerDialogVisible" title="审核产品" width="500" center>
 
    <div class="dialog——content"> 
        <span>
   你确定此产品的出库吗？
    <el-radio-group v-model="auditData.product_out_status">
    <el-radio value="同意">同意</el-radio>
    <el-radio value="否决">否决</el-radio>
  </el-radio-group>
   </span>
   <span class="el-input">
      <el-input
    v-model="auditData.audit_memo"
    style="width: 300px;height:80px"
    :rows="2"
    type="textarea"
    maxlength="100"
    show-word-limit
    placeholder="请输入审核确认理由..."
  />
   </span>
  </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="audit_product">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { auditProduct } from '@/api/product/product';
import { bus } from '@/utils/mitt';
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
const centerDialogVisible = ref(false)
// 导入pinia，审核人信息
import  { useUserinfo } from '@/stores/userinfo'
import { tracking } from '@/utils/operation';
const store = useUserinfo ()
// 表单数据
type dataRules = {
  product_id?: string
  product_name?: string
  product_category?: string
  product_unit?: string
  product_inwarehouse_number?: number | null,
  product_single_price?:number | null,
  product_create_person?: string
  in_memo?: string
  id?: number | null,
  product_out_id?:string,
  product_out_number?: number | null,
  product_out_apply_person?: string
  apply_memo?: string
  product_out_status?: string
  product_out_audit_person?: string
  audit_memo?: string
  product_apply_time?: string | null
}

let auditData:dataRules= reactive({
    id:null,
    product_out_id:'',
    product_out_status:'',
    apply_memo:'',
    product_out_audit_person:store.name,
    product_out_apply_person:'',
    product_inwarehouse_number:null,
    product_single_price:null,
    product_out_number:null,
    audit_memo:'',
    product_apply_time:null,
    product_name:""
})
const productName=ref('')
// 接收父组件传值
bus.on('auditProductId',(data:any)=>{
  auditData.apply_memo=data.apply_memo
  auditData.product_out_apply_person=data.product_out_apply_person
  auditData.product_out_id=data.product_out_id
  auditData.product_out_number=data.product_out_number
  auditData.product_inwarehouse_number=data.product_inwarehouse_number
  auditData.product_single_price=data.product_single_price
  auditData.id=data.id
  auditData.product_name=data.product_name
  productName.value=data.product_name
  auditData.product_apply_time=data.product_apply_time
})
const emit = defineEmits(['success','successAudit'])
// 审核产品
const audit_product=async() => {
  const res=await auditProduct(auditData)
  if(res.data.status==0){
    ElMessage({
      message: res.data.message,
      type: 'success',
    })
    emit('success')
    emit('successAudit')
 await tracking('产品审核',productName.value, '中级');
    centerDialogVisible.value = false
  }
  else{
    ElMessage.error('审核失败,请检查网络')
  }
}
const open = () => {
  centerDialogVisible.value = true
}
defineExpose({ open })
</script>

<style scoped lang="scss">
.dialog——content{
  margin-left: 84px;
  padding: 30px 3px;
  display: flex;
  flex-direction: column;
  span{
    font-size: 16px;
    color: rgba(2, 4, 8, 0.908);
  }
  .el-input{
    margin-top: 20px;
    width: 300px;
    height: 80px;
  }
}
</style>