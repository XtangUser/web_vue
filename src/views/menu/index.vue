<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          router
          text-color="#fff"
          active-text-color="#409eff"
        >
          <div class="title">通用管理系统</div>
          <el-menu-item index="home">
            <el-icon><House /></el-icon>
            <span>首页</span>
          </el-menu-item>
          <el-menu-item index="overview">
            <el-icon><document /></el-icon>
            <span>系统概览</span>
          </el-menu-item>
          <!-- 用户管理 -->
          <el-sub-menu index="3">
            <template #title>
              <el-icon><User /></el-icon>
              <span>用户管理</span>
            </template>
            <el-menu-item-group title="管理员管理">
              <el-menu-item index="product_manage">产品管理员</el-menu-item>
              <el-menu-item index="users_manage">用户管理员</el-menu-item>
              <el-menu-item index="message_manage">消息管理员</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="员工管理">
              <el-menu-item index="user_list">用户列表</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <!-- 产品管理 -->
          <el-sub-menu index="4">
            <template #title>
              <el-icon><Present /></el-icon>
              <span>产品管理</span>
            </template>
            <el-menu-item-group title="入库管理">
              <el-menu-item index="product_list">产品列表</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="出库管理">
              <el-menu-item index="out_productList">出库列表</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <!-- 消息管理 -->
          <el-sub-menu index="5">
            <template #title>
              <el-icon><ChatDotSquare /></el-icon>
              <span>消息管理</span>
            </template>
            <el-menu-item-group title="消息管理">
              <el-menu-item index="message_list">消息列表</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="回收站">
              <el-menu-item index="recycle_list">回收站</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <!-- 合同管理 -->
          <el-menu-item index="files">
            <el-icon><MessageBox /></el-icon>
            <span>合同管理</span>
          </el-menu-item>
          <!-- 操作日志 -->
          <el-menu-item index="operation_log">
            <el-icon><MessageBox /></el-icon>
            <span>操作日志</span>
          </el-menu-item>
          <!-- 登录日志 -->
          <el-menu-item index="login_log">
            <el-icon><MessageBox /></el-icon>
            <span>登录日志</span>
          </el-menu-item>
          <!-- 系统设置 -->
          <el-menu-item index="set">
            <el-icon><Tools /></el-icon>
            <span>系统设置</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <span class="header-left-content">尊敬的 {{ infoStore.name }} 欢迎您登录本系统</span>
          <div class="header-right-content">
            <!-- 信箱 -->
  <el-badge :is-dot='msgStore.read_list.length> 0' class="item"
							@click="openDepartment_Message">
							<el-icon :size="20" class="message">
								<Message />
							</el-icon>
						</el-badge>
            <!-- 头像 -->
            <el-avatar :src="infoStore.imageUrl" />
            <!-- 下拉菜单 -->
            <el-dropdown>
              <span class="el-dropdown-link">
                设置
                <el-icon class="el-icon--right">
                  <el-icon><Tools /></el-icon>
                </el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>设置账号</el-dropdown-item>
                  <el-dropdown-item>更改头像</el-dropdown-item>
                  <el-dropdown-item @click="goLogin">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </el-header>
        <el-main>
          <RouterView />
        </el-main>
      </el-container>
    </el-container>
  </div>
  <departmentMsg ref="department_Msg"></departmentMsg>
</template>

<script setup lang="ts">
// 导入图标
import { Document } from '@element-plus/icons-vue' 
 import departmentMsg from '@/components/department_msg.vue'
// 导入状态库
import { useUserinfo } from '@/stores/userinfo'
const infoStore = useUserinfo()
import {
		useMsg
	} from '@/stores/message'
	const msgStore = useMsg()
// 导入路由模块
import { useRouter } from 'vue-router';
import { ref } from 'vue';
// 创建实例
const router=useRouter()
// 禁用屏幕滚动条
document.body.style.overflow = 'hidden'
// 退出登录函数
const goLogin=()=>{
    // 跳转路由(登陆页面)
    router.push('/login')
    localStorage.clear()
}
const department_Msg = ref()
	const openDepartment_Message = () => {
    department_Msg.value.open()
	}
</script>

<style lang="scss" scoped>
* {
  padding: 0%;
  margin: 0%;
}
.el-aside {
  background-color: #2b303b;
  height: 100vh;
  width: 210px;
  margin-left: -8px;
  margin-top: -8px;
  overflow-y: hidden;
  .title {
    padding: 20px;
    display: flex;
    justify-content: center;
    color: #fff;
    background-color: #2b303b;
  }
  .el-menu {
    background-color: #2b303b;
    width: 210px;
    height: 100vh;
    border-right: 0px;
    .el-menu-item:hover {
      background-color: #409eff;
    }
    :deep(.el-sub-menu__title:hover) {
      background-color: #409eff;
    }
    :deep(.el-menu--inline) {
      background-color: #2b303b;
    }
  }
}
.el-header{
  display: flex;
  height: 55px;
  padding-top: -1px;
  background-color: #262f3e;
  color: #c1c6c8;
  align-items: center;
  justify-content: space-between;
  margin-top: -8px;
  // 右边三个图标
  .header-right-content{
    display: flex;
    align-items: center;
    width: 160px;
    justify-content: space-around;
    //信箱
    .el-icon svg{
      cursor: pointer;
    }
    // 头像
    .el-avatar{
      cursor: pointer;
    }
  }
  .el-dropdown-link:hover{
    cursor: pointer;
    color: #409eff;
  }
  // 欢迎语
  .header-left-content{
    font-size: 13px;
    
    }
}
.el-main{
  background-color: #f3f4fa;
}
.item{
  margin-top: 10px;
  margin-right: 10px;
}
</style>
