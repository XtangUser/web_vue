<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<template>
  <bread_crumb ref="breadCrumb" :item="item"></bread_crumb>
  <div class="home-wrapped">
    <!-- 轮播图 -->
    <div class="swiper-wrapped">
      <el-carousel :interval="4000" type="card" indicator-position="outside" height="220px">
        <el-carousel-item v-for="(item, index) in imageUrl" :key="index">
          <img :src="item" alt="" class="img-size" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <!-- 栅格布局 -->
    <div class="layout-warpped">
      <el-row :gutter="20">
        <el-col
          :span="6"
          v-for="(item, index) in companyData"
          :key="index"
          @click="openIntroce(index + 1)"
          ><div class="company-arae">
            <!-- 标题 -->
            <span>{{ item.set_name }}</span>
            <!-- 内容 -->
            <div class="Companytext" v-html="item.set_text"></div></div
        ></el-col>
      </el-row>
    </div>
    <!-- 表单布局 -->
    <div class="table-warpped">
      <div class="company-Annount">
        <span>公司公告</span>
        <el-table :data="tableData" style="width: 100%" :show-header="false">
          <el-table-column prop="date" label="Date" width="180" />
          <el-table-column prop="name" label="Name" width="180" />
          <el-table-column prop="address" label="Address" />
        </el-table>
      </div>
      <!-- 系统消息 -->
      <div class="system-News">
        <span>系统消息</span>
        <el-table :data="tableData" style="width: 100%" :show-header="false">
          <el-table-column prop="date" label="Date" width="180" />
          <el-table-column prop="name" label="Name" width="180" />
          <el-table-column prop="address" label="Address" />
        </el-table>
      </div>
    </div>
  </div>

  <introduce ref="introMsg"></introduce>
</template>

<script lang="ts" setup>
// 引入面包屑
import bread_crumb from '@/components/bread_crumb.vue'
import { reactive, ref } from 'vue'
import { getAllSwiper, getAllCompanyMsg } from '@/api/set/set'
import { bus } from '@/utils/mitt.js'
import introduce from './components/introduce.vue'
const breadCrumb = ref()
// 面包屑参数
const item: Object = reactive({
  first: '首页'
})
// 表单数据
const tableData = ref([])
// 获取所有轮播图
// 轮播图路径
const imageUrl = ref()
const getAllswiper = async() => {
  const res = await getAllSwiper()
  imageUrl.value = res.data.arr
}
getAllswiper()
// 公司介绍
let companyData = ref()
const getAllCompanyintroce = async() => {
  const res = await getAllCompanyMsg()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [name,...intro] = res.data.companyMsg
  companyData.value = intro
}
getAllCompanyintroce()
// 弹窗公司
const introMsg = ref()
const openIntroce = (id: number) => {
  // 第一个参数是标记，第二个是变量
  bus.emit('introduce', id)
  introMsg.value.open ()
}
</script>

<style scoped lang="scss">
/* 混合语法 */
@mixin table-class {
  display: flex;
  flex-direction: column;
  height: 165px;
  width: 48%;
}
/* 首页 */
.home-wrapped {
  padding: 8px;
  height: calc(100vh - 101px);
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  /* 轮播图 */
  .swiper-wrapped {
    padding: 0 20px;
    background: #fff;
    margin-bottom: 8px;
    border: 1px solid pink;
    /* 轮播图css */
    .el-carousel__item h3 {
      color: #475669;
      opacity: 0.75;
      line-height: 200px;
      margin: 0;
      text-align: center;
    }

    .el-carousel__item:nth-child(2n) {
      background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n + 1) {
      background-color: #d3dce6;
    }
    .img-size {
      width: 100%;
      height: 100%;
    }
  }
  /* 栅格布局 */
  .layout-warpped {
    margin-bottom: 8px;
    padding: 8px;
    background: #fff;
    height: 100%;
    /* 栅格布局css */
    .el-row {
      margin-bottom: 20px;
      height: 100%;
    }
    .el-row:last-child {
      margin-bottom: 0;
    }
    .el-col {
      border-radius: 4px;
    }

    /* 公司信息区域 */
    .company-arae {
      border-radius: 4px;
      min-height: 36px;
      background-color: #b2aaaa50;
      height: 180px;
      cursor: pointer;
      span {
        border-bottom: 1px solid #409eff;
      }
      .Companytext {
        font-size: 14px;
        display: -webkit-box;
word-break: break-all;
-webkit-box-orient: vertical;
text-indent: 2em;
-webkit-line-clamp: 5; /* 指定显示行数 */
overflow: hidden;
text-overflow: ellipsis; /* 超出部分以省略号形式显示 */

      }
    }
    .company-arae:hover {
      cursor: pointer;
      background-color: rgb(175, 228, 210);
    }
  }
  /* 表单布局 */
  .table-warpped {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 300px;
    align-items: flex-start;
    background: #fff;
    justify-content: center;
    flex-wrap: nowrap;
    span {
      border-bottom: 1px solid rgba(234, 87, 87, 0.877);
      margin-bottom: 5px;
      font-size: 14px;
    }
    .company-Annount {
      @include table-class;
      margin-left: 2px;
    }
    .system-News {
      @include table-class;
      margin-left: 8px;
    }
  }
}
</style>
