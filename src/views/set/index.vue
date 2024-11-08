<template>
  <div>
    <bread_crumb ref="breadCrumb" :item="item"></bread_crumb>
    <div class="common_wraps">
      <div class="common_content">
        <el-tabs v-model="activeName" class="demo-tabs">
          <el-tab-pane label="账号详情" name="first" class="el-first">
            <div class="avatr_content">
              <span>用户头像:</span>
              <!-- 用户头像 -->
              <!-- action是上传头像的接口 -->
              <div class="avatr_img">
                <el-upload
                  class="avatar-uploader"
                  action="http://127.0.0.1:3007/user/uploadAvatar"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload"
                >
                  <img v-if="infoStore.imageUrl" :src="infoStore.imageUrl" class="avatar" />
                  <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                </el-upload>
              </div>
            </div>
            <!-- 账户信息 -->
            <div class="avatr_content02">
              <span>账号信息:</span>
              <!-- action是上传头像的接口 -->
              <div class="avatr_input">
                <el-input v-model="infoStore.account" style="width: 240px" disabled />
              </div>
              <!--  -->
            </div>
            <!-- 用户密码-->
            <div class="avatr_content02">
              <span>用户密码:</span>
              <div class="avatr_input">
                <el-button plain @click="dialogFormVisible = true" type="primary">
                  修改密码
                </el-button>
                <el-dialog v-model="dialogFormVisible" title="修改密码" width="400">
                  <el-form :model="AccountDetail" :rules="rules">
                    <el-form-item label="旧密码：" :label-width="80" prop="oldPassword">
                      <el-input
                        v-model="AccountDetail.oldPassword"
                        autocomplete="off"
                        type="password"
                        show-password
                        class="el-input-password"
                      />
                    </el-form-item>
                    <el-form-item label="新密码：" :label-width="80" prop="newPassword">
                      <el-input
                        v-model="AccountDetail.newPassword"
                        autocomplete="off"
                        type="password"
                        show-password
                        class="el-input-password"
                      />
                    </el-form-item>
                  </el-form>
                  <template #footer>
                    <div class="dialog-footer">
                      <el-button @click="dialogFormVisible = false">取消</el-button>
                      <el-button type="primary" @click="resetPassword"> 确认 </el-button>
                    </div>
                  </template>
                </el-dialog>
              </div>
            </div>
            <!-- 用户姓名-->
            <div class="avatr_content02">
              <span>用户姓名:</span>
              <div class="avatr_input">
                <el-input v-model="infoStore.name" style="width: 240px" />
              </div>
              <el-button type="primary" @click="changeUser" class="el-button-user">
                保存
              </el-button>
            </div>
            <!-- 用户性别-->
            <div class="avatr_content02">
              <span>用户性别:</span>
              <div class="avatr_input">
                <el-select
                  v-model="infoStore.sex"
                  placeholder="🐳"
                  size="large"
                  style="width: 240px"
                  class="el-selectsex"
                >
                  <el-option key="boy" value="男" />
                  <el-option key="girl" value="女" />
                </el-select>
              </div>
              <el-button type="primary" @click="changeUser" class="el-button-user">
                保存
              </el-button>
            </div>
            <!-- 用户身份-->
            <div class="avatr_content02">
              <span>用户身份:</span>
              <div class="avatr_input">
                <el-input v-model="infoStore.identify" style="width: 240px" disabled />
              </div>
            </div>
            <!-- 用户部门-->
            <div class="avatr_content02">
              <span>用户部门:</span>
              <div class="avatr_input">
                <el-input v-model="infoStore.department" style="width: 240px" disabled />
              </div>
            </div>
            <!-- 用户邮箱-->
            <div class="avatr_content02">
              <span>用户邮箱:</span>
              <div class="avatr_input">
                <el-input v-model="infoStore.email" style="width: 240px" />
              </div>
              <el-button type="primary" @click="changeUser" class="el-button-user">
                保存
              </el-button>
            </div>
          </el-tab-pane>

          <el-tab-pane label="公司信息" name="second">
            <div class="company-arae">
              <!-- 公司名称 -->
              <div class="company-input">
                <span>公司名称:</span>
                <div class="company-el-put">
                  <el-input v-model="companyName" style="width: 240px" />
                </div>
                <el-button type="success" @click="keepCompany" class="el-button-user">
                  保存
                </el-button>
              </div>
              <!-- 公司介绍 -->
              <div class="company-input">
                <span>公司介绍:</span>
                <div class="company-el-put">
                  <el-button plain @click="openEditor(1)" type="success"> 编辑公司介绍 </el-button>
                </div>
              </div>
              <!-- 公司架构-->
              <div class="company-input">
                <span>公司架构:</span>
                <div class="company-el-put">
                  <el-button plain @click="openEditor(2)" type="success"> 编辑公司架构 </el-button>
                </div>
              </div>
              <!-- 公司战略 -->
              <div class="company-input">
                <span>公司战略:</span>
                <div class="company-el-put">
                  <el-button plain @click="openEditor(3)" type="success"> 编辑公司战略 </el-button>
                </div>
              </div>
              <!-- 公司高层 -->
              <div class="company-input">
                <span>公司高层:</span>
                <div class="company-el-put">
                  <el-button plain @click="openEditor(4)" type="success"> 编辑公司高层 </el-button>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="首页设置" name="third">
            <!-- 最外层盒子 -->
            <div class="home-swiper">
              <div class="tips">
                <span>提示:可以通过点击轮播图进行更换轮播图</span>
              </div>
              <div class="swiper-wrapped" v-for="(item,index) in swiperData" :key="index">
                <div class="swiper-name">轮播图{{ index+1 }}:</div>
                <el-upload
                  class="el-image"
                  action="http://127.0.0.1:3007/set/uploadSwiper"
                  :show-file-list="false"
                  :on-success="handleSwiperSuccess"
                  :before-upload="beforeSwiperUpload"
                  :data="item"
                >
                  <template #trigger>
                    <img v-if="imageUrl" :src="imageUrl[index]" class="Swiper" />
                    <img src="@/assets/马赛克.png" alt="" v-else class="Swiper" />
                  </template>
                </el-upload>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="其他设置" name="four">
            <div class="other-set">
              <div class="department-set">
                <span>部门设置</span>
                <el-tag
      v-for="tag in dynamicTags"
      :key="tag"
      closable
      :disable-transitions="false"
      @close="handleClose(tag)"
    >
      {{ tag }}
    </el-tag>
    <el-input
      v-if="inputVisible"
      ref="InputRef"
      v-model="inputValue"
      class="w-20"
      size="small"
      @keyup.enter="handleInputConfirm"
      @blur="handleInputConfirm"
    />
    <el-button v-else class="button-new-tag" size="small" @click="showInput" style="margin-left: 10px;background-color:azure;">
    +添加部门
    </el-button>
              </div>
              <!-- 产品设置 -->
              <div class="department-set">
                <span>产品设置</span>
                <el-tag
      v-for="tag in ProductTags"
      :key="tag"
      closable
      :disable-transitions="false"
      @close="handleClose02(tag)"
    >
      {{ tag }}
    </el-tag>
    <el-input
      v-if="inputVisible02"
      ref="InputRef"
      v-model="inputValue02"
      class="w-20"
      size="small"
      @keyup.enter="handleInputConfirm02"
      @blur="handleInputConfirm02"
    />
    <el-button v-else class="button-new-tag" size="small" @click="showInput02" style="margin-left: 10px;background-color:azure;">
    +添加产品类别
    </el-button>
              </div>
            </div>


          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
  <Editor ref="editorP"></Editor>
</template>

<script lang="ts" setup>
// 引入面包屑
import bread_crumb from '@/components/bread_crumb.vue'
import { reactive, ref,nextTick, toRaw} from 'vue'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import type { UploadProps } from 'element-plus'
// 导入富文本编辑器
import Editor from './components/Editor.vue'
// 导入状态库
import { useUserinfo } from '@/stores/userinfo'
const infoStore = useUserinfo()
import { bus } from '@/utils/mitt.js'
import { changeCompanyName, getCompanyName,getAllSwiper,setDepartment,getDepartments, getProducts, setProducts } from '@/api/set/set'
// 导入绑定账号的方法
import { bindAccount, changePassword, changeUserinfo } from '@/api/userinfo'
// 切换tab参数
const activeName = ref('first')
const breadCrumb = ref()
interface PasswordData {
  newPassword: String
  oldPassword: String
}
// 账号详情数据
const AccountDetail: PasswordData = reactive({
  newPassword: '',
  oldPassword: ''
})
// 表单规则
const rules = reactive({
  newPassword: [{ required: true, trigger: 'blur' }],
  oldPassword: [{ required: true, trigger: 'blur' }]
})
// 修改密码
const dialogFormVisible = ref(false)
const resetPassword = async() => {
  const res = await changePassword(
    infoStore.id,
    AccountDetail.oldPassword,
    AccountDetail.newPassword
  )
  if (res.data.status == 0) {
    // 关闭弹窗
    dialogFormVisible.value = false
    ElMessage({
      message: '修改成功',
      type: 'success'
    })
  } else {
    ElMessage.error(res.data.message)
  }
}
// 轮播图数据
const swiperData=[{name:'swiper1'},{name:'swiper2'},{name:'swiper3'},{name:'swiper4'},{name:'swiper5'},{name:'swiper6'}]
// 头像上传成功的回调函数
const handleAvatarSuccess: UploadProps['onSuccess'] = (response) => {
  if (response.status == 0) {
    infoStore.imageUrl = response.url
    ElMessage({
      message: '更新头像成功',
      type: 'success'
    }),
      // 绑定账号
      (async() => {
        const res = await bindAccount(infoStore.account, response.onlyId, response.url)
        console.log(res)
      })()
  } else {
    ElMessage.error('上传头像失败,请重新上传')
  }
}
// 轮播图的上传成功的回调函数
const handleSwiperSuccess: UploadProps['onSuccess'] = (response) => {
   console.log(response);
  if (response.status == 0) {
    ElMessage({
      message: '上传轮播图成功',
      type: 'success'
    })
    getAllswiper()
  } else {
    ElMessage.error('上传轮播图失败,请重新上传')
  }
}
// 上传头像以前的验证和效验函数
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('图片的格式必须是jpg格式!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('头像大小不能超过2MB!')
    return false
  }
  return true
}
//上传轮播图的验证
const beforeSwiperUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('图片的格式必须是jpg格式!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('头像大小不能超过2MB!')
    return false
  }
  return true
}
// 修改用户数据
const changeUser = async() => {
  const userdata = reactive({
    name: infoStore.name,
    sex: infoStore.sex,
    email: infoStore.email,
    id: infoStore.id
  })
  const res = await changeUserinfo(userdata)
  if (res.data.status == 0) {
    ElMessage({
      message: '修改成功',
      type: 'success'
    }),
      (() => {
        // 刷新仓库赋值
        infoStore.userInfo(infoStore.id)
      })()
  } else {
    ElMessage.error(res.data.message)
  }
}
// 面包屑参数
const item: Object = reactive({
  first: '系统设置'
})
// 轮播图路径
const imageUrl = ref()
// 富文本框弹窗
const editorP = ref()
const openEditor = (id: number) => {
  // 第一个参数是标记，第二个是变量
  bus.emit('editorTitle', id)
  editorP.value.open()
}
// 公司名称
const companyName = ref()
// 获取公司名称
const getCompanyname = async() => {
  const res = await getCompanyName()
  companyName.value = res.data.companyName
}
getCompanyname()
const keepCompany = async() => {
  const res = await changeCompanyName(companyName.value)
  if (res.data.status == 0) {
    ElMessage({
      message: '修改成功！',
      type: 'success'
    })
  } else {
    ElMessage.error('修改失败')
  }
}
// 获取所有轮播图
const getAllswiper =async()=>{
const res=await getAllSwiper()
imageUrl.value=res.data.arr
}
getAllswiper()
//部门设置
const inputValue = ref('')
// 部门设置
let dynamicTags =ref(['总裁部', '组织部'])
const inputVisible = ref(false)
const InputRef = ref()
// 刷新部门标签
const refreshDepartments=async()=>{
  const res=await getDepartments()
// j将字符串转成数组
dynamicTags.value=JSON.parse(res.data.data)
}
refreshDepartments()
// 点击关闭时执行的回调函数
const handleClose = async(tag:string) => {
  dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1)
  const res=await setDepartment(JSON.stringify(toRaw(dynamicTags.value)))
  if (res.data.status == 0) {
    refreshDepartments()
    ElMessage({
      message: '删除成功！',
      type: 'success'
    })

  } else {
    ElMessage.error('删除失败')
  }
  
}
// 聚焦
const showInput = () => {
  inputVisible.value = true
  nextTick(() => {
    InputRef.value!.input!.focus()
  })
}
// 添加标签
const handleInputConfirm =async() => {
  if (inputValue.value) {
    dynamicTags.value.push(inputValue.value)
    const res=await setDepartment(JSON.stringify(toRaw(dynamicTags.value)))
    if (res.data.status == 0) {
    ElMessage({
      message: '更新成功！',
      type: 'success'
    })
    refreshDepartments()
  } else {
    ElMessage.error('更新失败')
  }
  }
  inputVisible.value = false
  inputValue.value = ''
}
// 产品设置
let ProductTags = ref(['衣服', '水果'])
const inputValue02 = ref('')
const inputVisible02 = ref(false)
const InputRef02 = ref()
// 刷新部门标签
const refreshProducts=async()=>{
  const res=await getProducts()
// j将字符串转成数组
ProductTags.value=JSON.parse(res.data.data)
}
refreshProducts()
// 点击关闭时执行的回调函数
const handleClose02 = async(tag:string) => {
  ProductTags.value.splice(ProductTags.value.indexOf(tag), 1)
  const res=await setProducts(JSON.stringify(toRaw(ProductTags.value)))
  if (res.data.status == 0) {
    ElMessage({
      message: '删除成功！',
      type: 'success'
    })
    refreshProducts()
  } else {
    ElMessage.error('删除失败')
  }
  
}
// 聚焦
const showInput02 = () => {
  inputVisible02.value = true
  nextTick(() => {
    InputRef02.value!.input!.focus()
  })
}
// 添加标签
const handleInputConfirm02 =async() => {
  if (inputValue02.value) {
    ProductTags.value.push(inputValue02.value)
    const res=await setProducts(JSON.stringify(toRaw(ProductTags.value)))
    if (res.data.status == 0) {
    ElMessage({
      message: '更新成功！',
      type: 'success'
    })
    refreshProducts()
  } else {
    ElMessage.error('更新失败')
  }
  }
  inputVisible02.value = false
  inputValue02.value = ''
}
</script>

<style lang="scss" scoped>
//外壳
.common-wraps {
  padding: 8px;
  background: #f5f5f5;
  height: calc(100vh - 85px);
  // 内容
  .common-content {
    padding: 0 10px;
    height: 100%;
    background-color: #fff;
    // 用户头像
    // 头像参数
  }
}
.demo-tabs {
  margin-left: 15px;
  .el-tabs__content {
    padding: 32px;
    color: #6b778c;
    font-size: 32px;
    font-weight: 600;
  }
}
.avatr_content {
  display: flex;
  align-items: center;
  flex-direction: row;
  padding-left: 50px;
  margin-top: -50px;
  width: 300px;
  height: 180px;

  .avatr_img {
    height: 100px;
    margin-left: 24px;
    margin-top: 20px;
  }
}
.avatr_content02 {
  display: flex;
  align-items: center;
  flex-direction: row;
  padding-left: 50px;
  margin-top: -4px;
  width: 400px;
  height: 66px;
  .el-input-password {
    width: 300px;
    height: 32px;
  }
  .avatr_input {
    width: 160px;
    height: 40px;
    margin-left: 24px;
    margin-top: 10px;
  }
  .el-button-user {
    margin-left: 100px;
    width: 47px;
    height: 32px;
  }
}
:deep(.el-tabs__content) {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
}
.avatar-uploader .avatar {
  width: 135px;
  height: 135px;
  display: inline-block;
}
:deep(.el-select--large .el-select__wrapper) {
  min-height: 32px;
}
/* 公司信息 */
.company-arae {
  display: flex;
  flex-direction: column;
  margin-left: 65px;
  .company-input {
    display: flex;
    flex-direction: row;
    margin-top: 10px;
    .company-el-put {
      margin: 0 20px;
    }
  }
}
.other-set{
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding-left: 14px;
  font-size: 15px;
  .department-set{
    margin-bottom: 24px;
  :deep(.w-20){
    width: 100px;
    height: 20px;
  }
  }  
  span{
      margin-left: 24px;
    } 
}
</style>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 130px;
  height: 130px;
  text-align: center;
}
/* 首页管理 */
.home-swiper {
  padding-left: 50px;
  display: flex;
  flex-direction: column;
  .tips {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
    span {
      font-size: 14px;
      color: silver;
    }
  }
  .swiper-wrapped {
    display: flex;
    margin-bottom: 16px;
    .swiper-name{
      font-size: 16px;
      margin-right: 10px;
      color: rgba(0, 0, 0, 0.678);
    }
  }
  .Swiper {
    width: 180px;
    height: 65px;
  }

}
</style>
