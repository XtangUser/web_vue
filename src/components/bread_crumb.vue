<template>
  <div class="bread_crumb">
    <SvgIcon icon-name="location" class="bread-crumb-icon"></SvgIcon>
    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item :to="{ path: '/' }">{{ pageTitle.item.first }}</el-breadcrumb-item>
      <el-breadcrumb-item v-if="pageTitle.item.second">{{ pageTitle.item.second }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
// 导入el-plus图标组件库
import { ArrowRight } from '@element-plus/icons-vue'
// 导入封装的面包屑
import SvgIcon from '@/components/SvgIcon.vue'
// 引用props传值
const pageTitle=defineProps(['item'])
</script>

<style scoped>
.bread_crumb{
  height: 30px;
  padding: 0 20px;
  display: flex;
  align-items: center;
}

:depp(.el-breadcrumb-item){
height: 30px;
font-size: 16px;
line-height: 30px;
}

:deep(.el-breadcrumb__inner){
  font-size: 600;
}
:depp(.el-breadcrumb-item:hover){
color: aquamarine;
cursor: pointer;
}
</style>
