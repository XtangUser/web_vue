<template>
  <div class="common-layout">
    <div class="imgbg">
      <el-container>
        <!-- 头部 -->
        <el-header class="header-wrapped">
          <div class="header-content">
            <h3>通用后台管理系统</h3>
            <span>欢迎你的登录</span>
          </div>
        </el-header>
        <!-- 主体 -->
        <el-main>
          <div class="login_wrapped">
            <el-card class="box-card">
              <el-tabs v-model="activeName" class="demo-tabs" :stretch="true">
                <el-tab-pane label="登录" name="first">
                  <el-form :model="loginData" label-width="auto" :rules="rules">
                    <el-form-item label="账号：" class="login-form" prop="account">
                      <el-input v-model="loginData.account" placeholder="请输入账号..." />
                    </el-form-item>
                    <el-form-item label="密码：" class="login-form" prop="password">
                      <el-input
                        v-model="loginData.password"
                        placeholder="请输入密码..."
                        type="password"
                        show-password
                      />
                    </el-form-item>
                  </el-form>
                  <!-- 底部外壳 -->
                  <div class="footer-login">
                    <div class="forget-password">
                      <span class="forget-password-button" @click="openForget()">忘记密码</span>
                    </div>
                  </div>
                  <div class="login-button">
                    <el-button type="primary" @click="Login"> 登录 </el-button>
                  </div>
                  <div class="footer-go-register">
                    还没有账号?<span class="go-register" @click="activeName = 'second'">
                      马上注册
                    </span>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="注册" name="second">
                  <el-form :model="registerData" label-width="auto" :rules="rules">
                    <el-form-item label="账    号：" class="login-form" prop="account">
                      <el-input v-model="registerData.account" placeholder="账号长度6到12位..." />
                    </el-form-item>
                    <el-form-item label="密    码：" class="login-form" prop="password">
                      <el-input
                        v-model="registerData.password"
                        placeholder="密码需长度6-12位字母数字..."
                        type="password"
                        show-password
                      />
                    </el-form-item>
                    <el-form-item label="确认密码：" class="login-form" prop="repassword">
                      <el-input
                        v-model="registerData.repassword"
                        placeholder="再次输入密码..."
                        type="password"
                        show-password
                      />
                    </el-form-item>
                  </el-form>
                  <div class="login-button">
                    <el-button type="primary" @click="Register"> 注册 </el-button>
                  </div>
                  <div class="footer-go-register">
                    已有账号?<span class="go-register" @click="activeName = 'first'"> 去登录 </span>
                  </div>
                </el-tab-pane>
              </el-tabs>
            </el-card>
          </div>
        </el-main>
        <el-footer class="footer-wrapped">
          <div class="footer-content">
            <span>阿里云博客专家</span>&nbsp;| &nbsp; <span>通用管理系统</span>&nbsp;| &nbsp;
            <span>版权所有@小唐</span>&nbsp;| &nbsp;
            <span>VX: &nbsp;3196263280</span>
          </div>
        </el-footer>
      </el-container>
    </div>
  </div>
  <forget ref="forgetP"></forget>
</template>

<script lang="ts" setup>
// 消息提示组件
import { ElMessage } from 'element-plus'
import type { FormRules } from 'element-plus'
import { reactive, ref } from 'vue'
// 导入路由
import { useRouter } from 'vue-router'
// 导入注册和登录接口
import { login, register } from '@/api/login'
// 导入其他组件方法
import forget from './components/forget_password.vue'
// 创建路由实例
const router=useRouter()
// 定义登录与注册切换变量
const activeName = ref('first')
// 编写表单接口
interface formData {
  account: string
  password: string
  // 问号代表没有也行
  repassword?: string
}
// 定义登录表单收集数据
let loginData: formData = reactive({
  account: '',
  password: ''
})
// 注册表单数据
let registerData: formData = reactive({
  account: '',
  password: '',
  repassword: ''
})
// 重置变量
const resetForm: formData = reactive({
  account: '',
  password: '',
  repassword: ''
})
// 表单规则
const rules = reactive<FormRules<formData>>({
  account: [
    { required: true, trigger: 'blur' },
    { min: 6, max: 12, message: '账号长度最小6位', trigger: 'blur' }
  ],
  password: [
    { required: true, trigger: 'blur' },
    {
      pattern: /^(?![0-9]+$)[a-z0-9]{1,50}$/,
      message: '密码应包含数字和字母2类',
      trigger: 'blur'
    },
    { min: 6, max: 12, message: '密码长度最小6位', trigger: 'blur' }
  ],
  repassword: [{ required: true, trigger: 'blur' }]
})
// 拿到组件中的方法
const forgetP = ref()
// 定义方法
const openForget = () => {
  forgetP.value.open()
}
// 注册和登录接口函数
// 注册（后端返回的数据据是promise对象移步，需要asycn）
const Register = async() => {
  if (registerData.password == registerData.repassword) {
    // 拿到后端数据
    const res = await register(registerData)
    console.log(res)
    if (res.data.status == 0) {
      ElMessage({
        message: '注册成功',
        type: 'success'
      })
      //  跳转登录页面
      loginData.account = registerData.account
      loginData.password = registerData.password
      activeName.value = 'first'
      // 置空表单
      registerData = resetForm
    } else {
      ElMessage.error(res.data.message)
    }
  } else {
    ElMessage.error('两次密码不一致！')
  }
}
const Login = async() => {
  const res = await login(loginData)
  // 拿到token保存本地
  const {token}=res.data
  localStorage.setItem('token',token)
  // 进行数据的判断
  if (res.data.status == 0) {
    ElMessage({
      message: '登录成功',
      type: 'success'
    })
    // 置空表单
    loginData = resetForm
    // 跳转路由(去首页)
    router.push('/home')
  } else {
    ElMessage.error(res.data.message)
  }
}
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}
// 头部外壳
.header-wrapped {
  // 头部内容
  .header-content {
    // 居中
    width: 1200px;
    display: flex;
    justify-content: space-around;
    align-items: stretch;
    align-content: center;
    flex-wrap: nowrap;
    flex-direction: row;
    h3 {
      font-size: 24px;
      font-weight: 700;
      color: rgb(61, 118, 216);
    }
  }
}
.el-main {
  .login_wrapped {
    height: 600px;
    width: 1200px;
    margin: 0 auto;
  }
  // 主体内容
  .box-card {
    width: 350px;
    height: 400px;
    position: relative;
    left: 50%;
    transform: translate(-50%);
    // 字体颜色（样式穿透）
    :deep(.el-tabs__item) {
      color: black;
      font-size: 18px;
    }
    // 输入框
    .login-form {
      margin-top: 20px;
      :deep(.el-input__inner) {
        height: 40px;
      }
    }
    .footer-login {
      display: flex;
      flex-direction: column;
    }
    .forget-password-button {
      font-size: 13px;
      color: rgb(111, 185, 210);
      float: right;
      margin-top: 10px;
      cursor: pointer;
    }
  }
  .footer-go-register {
    margin-left: 96px;
    font-size: 13px;
    margin-top: 20px;
    .go-register {
      color: rgb(111, 185, 210);
      cursor: pointer;
    }
  }
}
.common-layout {
  .imgbg {
    height: 100vh;
    margin-top: -8px;
    margin-left: -8px;
    background-image: url(../../assets/login_bg.png);
    width: 1300px;
    z-index: -1000;
    background-repeat: no-repeat;
    background-size: cover;
    position: fixed;
    left: 50%;
    transform: translate(-50%);
  }
}
.footer-wrapped {
  margin-top: 10px;
  .footer-content {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    color: beige;
    font-size: 13px;
    span {
      color: beige;
      font-size: 13px;
    }
    span:hover {
      color: aqua;
    }
  }
}
//登录按钮
:deep(.el-button) {
  height: 32px;
  width: 260px;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%);
  margin-top: 20px;
}
</style>
