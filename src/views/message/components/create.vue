<template>
  <div>
    <el-dialog
      v-model="centerDialogVisible"
      :title="title"
      width="600"
      aline-center
      :destory-on-close="true"
      height="700px"
      center
    >
      <el-form
        :model="dataTable"
        label-width="auto"
        style="max-width: 300px; margin-left: 50px"
        class="form-dialog"
        ref="formRef"
        :rules="rules"
        labelPosition="left"
        destory-on-close="true"
      >
        <el-form-item label="主题" prop="message_title">
          <input v-model="dataTable.message_title" />
        </el-form-item>
        <el-form-item
          label="发布部门"
          prop="message_publish_department"
          v-if="title === '发布公告' || title === '编辑公告'"
        >
          <select v-model="dataTable.message_publish_department" required class="selectOption">
            <option value="" disabled selected>请选择发布部门...</option>
            <option v-for="item in departmentData" :key="item" :value="item">
              {{ item }}
            </option>
          </select>
        </el-form-item>
        <el-form-item label="发布人" prop="message_publish_name">
          <input v-model="dataTable.message_publish_name" />
        </el-form-item>
        <el-form-item label="消息类别" prop="message_category">
          <input :value="dataTable.message_category" disabled />
        </el-form-item>
        <el-form-item
          label="接收部门"
          prop="message_receipt_object"
          v-if="title === '发布公告' || title === '编辑公告'"
        >
          <select v-model="dataTable.message_receipt_object" required class="selectOption">
            <option value="" disabled selected>请选择接收部门...</option>
            <option value="全体成员">全体成员</option>
            <option v-for="item in departmentData" :key="item" :value="item">
              {{ item }}
            </option>
          </select>
        </el-form-item>
        <el-form-item
          label="公告等级"
          prop="message_level"
          v-if="title === '发布公告' || title === '编辑公告'"
        >
          <select v-model="dataTable.message_level" required class="selectOption">
            <option value="" disabled selected>请选择公告等级...</option>
            <option label="一般">一般</option>
            <option value="必要">必要</option>
          </select>
        </el-form-item>
        <el-form-item label="内容" prop="message_content">
          <div style="border: 1px solid #ccc">
            <!-- wangEditor结构 -->
            <Toolbar
              style="border-bottom: 1px solid #ccc"
              :editor="editorRef"
              :defaultConfig="toolbarConfig"
              :mode="mode"
              class="toolbar"
            />
            <Editor
              style="height: 200px; width: 400px; overflow-y: hidden"
              v-model="dataTable.message_content"
              :defaultConfig="editorConfig"
              :mode="mode"
              @onCreated="handleCreated"
            />
          </div>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="create_Message"> 确认 </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { bus } from '@/utils/mitt'
import { onBeforeUnmount, reactive, ref, shallowRef } from 'vue'
import { ElMessage } from 'element-plus'
import { ElForm } from 'element-plus'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { addMessage, addSystemMessage, editCompanyMessage } from '@/api/message'
import { getDepartments } from '@/api/set/set'
import { changeUserReadList } from '@/api/department_msg/department_msg'
import { useMsg } from '@/stores/message'
const msgStore = useMsg()
const centerDialogVisible = ref(false)
// 表单数据
const formRef = ref<InstanceType<typeof ElForm>>()
interface msgData {
  message_title?: string | null
  message_category?: string | null //varchar(255) null comment '消息类别',
  message_publish_department?: string ////varchar(255) null comment '发布消息部门',
  message_publish_name?: string | null //varchar(255) null comment '消息发布者',
  message_receipt_object: string //varchar(255) null comment '消息接收者',
  message_click_number?: string | null //int          null comment '消息查看数量',
  message_content?: string | null //varchar(255) null comment '消息内容',
  message_create_time?: string | null //varchar(255) null comment '消息发布时间',
  message_update?: string | null //varchar(255) null comment '消息更新时间',
  message_level?: string | null // varchar(255) null comment '消息等级',
  message_status?: string | null //int          null comment '默认为0，1在回收站',
  message_delete_time?: string | null // varchar(255) null comment '消息删除时间'
  id?: number | null
}
// 定义验证规则
const rules = reactive({
  message_title: [{ required: true, message: '请输入主题', trigger: 'blur' }],
  message_publish_department: [{ required: true, message: '请输入发布部门', trigger: 'blur' }],
  message_publish_name: [{ required: true, message: '请输入发布人', trigger: 'blur' }],
  message_category: [{ required: true, message: '请输入消息类别', trigger: 'blur' }],
  message_receipt_object: [{ required: true, message: '请输入接收部门', trigger: 'blur' }],
  message_level: [{ required: true, message: '请输入公告等级', trigger: 'blur' }],
  message_content: [{ required: true, message: '请输入内容', trigger: 'blur' }]
})
let dataTable = reactive<msgData>({
  message_title: '',
  message_category: '',
  message_publish_department: '',
  message_publish_name: '',
  message_receipt_object: '',
  message_content: '',
  message_level: ''
})
// 标题
const title = ref('公司公告')
const Indexid: any = ref(0)
// 接收父组件传值
bus.on('JustifyMessage', (id) => {
  Indexid.value = id
  if (Indexid.value == 1) {
    title.value = '发布公告'
    dataTable.message_category = '公司公告'
  }
  if (Indexid.value == 2) {
    title.value = '编辑公告'
  }
  if (Indexid.value == 3) {
    title.value = '系统消息'
    dataTable.message_category = '系统消息'
  }
  if (Indexid.value == 4) {
    title.value = '编辑系统消息'
    dataTable.message_category = '系统消息'
  }
})
// 接收编辑信息
bus.on('MessageData',(row)=>{
  dataTable= row as any
})
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()
// mode
const mode = ref(false)
// 内容 HTML
interface ToolbarConfig {
  excludeKeys: string[] // 确保 excludeKeys 是一个字符串数组
}

const toolbarConfig: ToolbarConfig = {
  excludeKeys: []
}
const editorConfig = {
  placeholder: '请输入内容...',
  MENU_CONF: {
    uploadImage: {
      //上传图片配置
      server: 'http://127.0.0.1:3007/set/uploadCompanyPicture', //上传接口地址
      fieldName: 'file', //上传文件名
      methods: 'post',
      metaWithUrl: true, // 参数拼接到 url 上
      // 单个文件上传成功之后
      // onSuccess(file, res) {
      // },
      // 自定义插入图片
      customInsert(res: { url: any }, insertFn: (arg0: any) => void) {
        insertFn(res.url)
      }
    }
  }
}
// 上传图片，修改 uploadImage 菜单配置
// 需要注意的是，如何去修改参数？
toolbarConfig.excludeKeys = [
  'blockquote',
  'bgColor',
  'color',
  'group-more-style',
  'fontFamily',
  'bulletedList',
  'numberedList',
  'lineHeight',
  'todo',
  'emotion',
  'insertLink',
  'group-video',
  'insertTable',
  'codeBlock',
  'divider',
  'fullScreen',
  'group-image'

  // 排除菜单组，写菜单组 key 的值即可
]
// 获取部门的数组数据
let departmentData: any = reactive({})
;(async() => {
  const res = await getDepartments()
  // j将字符串转成数组
  departmentData = JSON.parse(res.data.data)
})()
const handleCreated = (editor: any) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}
// 创建监听方法
const emit = defineEmits(['success', 'success01'])
// 发布消息接口
const create_Message = async() => {
  if (Indexid.value == 1) {
    const res = await addMessage(dataTable)
    if (res.data.status == 0) {
      ElMessage.success('发布成功')
      emit('success')
    await changeUserReadList(res.data.id, dataTable.message_receipt_object)
      await msgStore.returnReadList()
      centerDialogVisible.value = false
    } else {
      ElMessage.error('发布失败')
    }
  } else if (Indexid.value == 3) {
    const res = await addSystemMessage(dataTable)
    if (res.data.status == 0) {
      ElMessage.success('发布系统消息成功')
      emit('success01')
      centerDialogVisible.value = false
      dataTable.message_content=''
    } else {
      ElMessage.error('发布系统消息失败')
    }
  } else {
    const res = await editCompanyMessage(dataTable)
    if (res.data.status == 0) {
      ElMessage.success('编辑成功')
      emit('success')
      await msgStore.returnReadList()
      centerDialogVisible.value = false
      dataTable.message_content=''
    } else {
      ElMessage.error('编辑失败')
    }
  }
}
const open = () => {
  centerDialogVisible.value = true
}
defineExpose({ open })
// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})
</script>

<style scoped lang="scss">
.dialog——content {
  margin-left: 84px;
  padding: 30px 3px;
  display: flex;
  flex-direction: column;
  span {
    font-size: 16px;
    color: rgba(2, 4, 8, 0.908);
  }
  .el-input {
    margin-top: 20px;
    width: 300px;
    height: 80px;
  }
}
.toolbar {
  pointer-events: all;
}
:deep(.w-e-bar-item .disabled) {
  cursor: auto;
}
.el-form-item input {
  width: 300px;
  height: 16px;
  align-items: center;
  min-height: 32px;
  border-radius: 6px;
  box-sizing: border-box;
  font-size: 14px;
  border: 1px solid;
  opacity: 0.5;
}
.el-form-item {
  input:focus {
    outline: none;
    border: 1px solid #65a0fa;
  }
  .selectOption:hover {
    outline: none;
    border: 1px solid #65a0fa;
  }
}
.el-form-item .selectOption {
  width: 300px;
  height: 16px;
  align-items: center;
  min-height: 32px;
  border-radius: 6px;
  box-sizing: border-box;
  font-size: 14px;
  border: 1px solid;
  opacity: 0.5;
  cursor: pointer;
}
:deep(.el-select__wrapper) {
  cursor: pointer;
  display: flex;
  line-height: 24px;
  min-height: 32px;
  position: relative;
  text-align: left;
  font-weight: 400;
  height: 16px;
  align-items: center;
  min-height: 32px;
  border-radius: 6px;
  box-sizing: border-box;
  font-size: 14px;
  cursor: pointer;
  box-shadow: none;
  border: 1px solid;
}
</style>
