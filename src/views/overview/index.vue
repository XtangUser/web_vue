<template>
  <bread_crumb ref="breadCrumb" :item="item"></bread_crumb>
  <!-- 外壳 -->
  <div class="overview-wrapped">
    <!-- 顶部 -->
    <div class="top-content-wrapped">
      <!-- 个人信息 -->
      <div class="person-infor">
        <!--用户头像外壳 -->
        <div class="person-avatar-wrapped">
          <!-- 头像 -->
          <el-avatar :size="100" :src="OverStore.imageUrl" />
          <span class="department">所属部门：{{ OverStore.department }}</span>
          <div class="company">所属公司：{{ companyName }}</div>
        </div>
        <!-- 分割线 -->
        <div class="line-wrapped">
          <div class="line"></div>
        </div>
        <!-- 详细信息外壳 -->
        <div class="detail-infor-wrapped">
          <p>姓名:{{ OverStore.name }}</p>
          <p>性别：{{ OverStore.sex }}</p>
          <p>身份：{{ OverStore.identify }}</p>
          <p>分管领域：{{}}</p>
          <p>权限:{{}}</p>
        </div>
      </div>
      <div class="manage-user pie"></div>
    </div>
    <!-- 中间 -->
    <div class="mid-content-wrapped">
      <!-- 中左 -->
      <div class="product-category-bar mid-content-left"></div>
      <!-- 中间部分右部分 -->
      <div class="mid-content-right">
        <div class="title">常用管理</div>
        <el-row :gutter="20">
          <el-col :span="6"
            ><div class="button-area" @click="router.push('/users_manage')">
              <SvgIcon icon-name="user" style="width: 24px; height: 24px"></SvgIcon>
              <span class="button-name">用户管理</span>
            </div></el-col
          >
          <el-col :span="6"
            ><div class="button-area" @click="router.push('/product_manage')">
              <SvgIcon icon-name="product" style="width: 24px; height: 24px"></SvgIcon>
              <span class="button-name">产品管理</span>
            </div></el-col
          >
          <el-col :span="6"
            ><div class="button-area" @click="router.push('/message_manage')">
              <SvgIcon icon-name="news" style="width: 24px; height: 24px"></SvgIcon>
              <span class="button-name">系统消息</span>
            </div></el-col
          >
          <el-col :span="6"
            ><div class="button-area" @click="router.push('/set')">
              <SvgIcon icon-name="person" style="width: 24px; height: 24px"></SvgIcon>
              <span class="button-name">个人信息</span>
            </div></el-col
          >
          <el-col :span="6"
            ><div class="button-area" @click="router.push('/department_information')">
              <SvgIcon icon-name="new" style="width: 24px; height: 24px"></SvgIcon>
              <span class="button-name">部门信息</span>
            </div></el-col
          >
          <el-col :span="6"
            ><div class="button-area" @click="router.push('/set')">
              <SvgIcon icon-name="set" style="width: 24px; height: 24px"></SvgIcon>
              <span class="button-name">系统设置</span>
            </div></el-col
          >
        </el-row>
      </div>
    </div>
    <!-- 底部 -->
    <div class="footer-content-wrapped">
      <div class="massage-level footer-content-left"></div>
      <div class="userlogin-week footer-content-right"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
// 图标组件
import SvgIcon from '@/components/SvgIcon.vue'
// 引入面包屑
import bread_crumb from '@/components/bread_crumb.vue'
import { reactive, ref, onMounted } from 'vue'
// 导入路由
import { useRouter } from 'vue-router'
import { useUserinfo } from '@/stores/userinfo'
// 获取公司名字
import { getCompanyName } from '@/api/set/set'
import { getAdminAndNumber, getCategoryAndNumber, getDayAndNumber, getLevelAndNumber } from '@/api/overView/overView'
const OverStore = useUserinfo()
const router = useRouter()
const breadCrumb = ref()
// 面包屑参数
const item: Object = reactive({
  first: '系统概览'
})
const companyName = ref()
const getcompanyName = async() => {
  const res = await getCompanyName()
  companyName.value = res.data.companyName
}
getcompanyName()
// eacharts
// 调用echarts图
onMounted(() => {
  manageUser()
  productCategoryBar()
  massageLevel()
  massageAllDay()
})

// 管理员与用户比值图
const manageUser =async() => {
  // 通过类名 初始化
  const mu = echarts.init(document.querySelector('.manage-user') as HTMLElement);
  mu.showLoading()
	let resdata = await getAdminAndNumber();
	mu.hideLoading();
  (document.querySelector('.manage-user') as HTMLElement).setAttribute('_echarts_instance_', '')
  // 设置基本的参数
  mu.setOption({
    title: {
      text: '管理与用户对比图',
      // subtext: 'Fake Data',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      padding: [20, 20, 20, 20]
    },
    series: [
      {
        // name: 'Access From',
        type: 'pie',
        radius: '65%',
        data: resdata.data.data,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  })
  // 用于echarts响应式
  window.addEventListener('resize', function() {
    mu.resize()
  })
}

// 产品类别图
const productCategoryBar = async() => {
  const pcb = echarts.init(document.querySelector('.product-category-bar') as HTMLElement);
  pcb.showLoading()
		let resdata = await getCategoryAndNumber()
		pcb.hideLoading();
  (document.querySelector('.product-category-bar') as HTMLElement).setAttribute(
    '_echarts_instance_',
    ''
  )
  pcb.setOption({
    title: {
      text: '产品类别库存总价图',
      top: '10%',
      textStyle: {
        fontSize: 16
      }
    },
    grid: {
      left: '4%',
      right: '4%',
      bottom: '4%',
      containLabel: true
    },
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      // 食品类，服装类，鞋帽类，日用品类，家具类，家用电器类，纺织品类，五金类
      data:resdata.data.category,
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data:resdata.data.price,
        type: 'bar',
        barWidth: 50,
        colorBy: 'data'
      }
    ]
  })
  window.addEventListener('resize', function() {
    pcb.resize()
  })
}

// 公告等级分布图
const massageLevel =async() => {
  const ml = echarts.init(document.querySelector('.massage-level') as HTMLElement);
  ml.showLoading()
	let resdata = await getLevelAndNumber()
	ml.hideLoading();
  (document.querySelector('.massage-level') as HTMLElement).setAttribute('_echarts_instance_', '')
  ml.setOption({
    title: {
      text: '公告等级分布图',
      top: '3%',
      textStyle: {
        fontSize: 16
      }
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      show: false
    },
    series: [
      {
        // name: 'Access From',
        type: 'pie',
        radius: ['35%', '65%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 20,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: resdata.data.data
      }
    ]
  })
  window.addEventListener('resize', function() {
    ml.resize()
  })
}
// 消息每日总量图
const massageAllDay =async() => {
  const mad = echarts.init(document.querySelector('.userlogin-week') as HTMLElement);
  mad.showLoading()
		let resdata = await getDayAndNumber()
		mad.hideLoading();
  (document.querySelector('.userlogin-week') as HTMLElement).setAttribute('_echarts_instance_', '')
  mad.setOption({
    title: {
      text: '每日登录人数图',
      top: '3%',
      textStyle: {
        fontSize: 16
      }
    },
    tooltip: {
      trigger: 'item'
    },
    xAxis: {
      type: 'category',
      data:resdata.data.week
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data:resdata.data.number,
        type: 'line'
      }
    ]
  })
  window.addEventListener('resize', function() {
    mad.resize()
  })
}
</script>

<style scoped lang="scss">
// 总览内容
.overview-wrapped {
  padding: 8px;
  height: calc(100vh - 85px);
  background: #f8f8f8;

  // 上部分内容 个人资料 + 饼状图
  .top-content-wrapped {
    height: 30%;
    display: flex;

    // 个人信息
    .person-infor {
      height: 100%;
      margin-right: 8px;
      width: calc(50% - 8px);
      display: flex;
      background: #fff;

      // 头像区域
      .person-avatar-wrapped {
        display: flex;
        width: 50%;
        height: 100%;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        // 公司
        .company {
          margin: 10px 0px;
          font-size: 12px;
        }

        // 职务
        .department {
          margin-top: 8px;
          font-size: 12px;
        }
      }

      // 分割线
      .line-wrapped {
        height: 100%;
        display: flex;
        align-items: center;

        .line {
          height: 170px;
          border: 1px solid #d3d3d3;
        }
      }

      // 详细信息区域
      .detail-infor-wrapped {
        height: 100%;
        width: calc(50% - 101px);
        margin-left: 50px;
        font-size: 12px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        p {
          color: rgb(225, 31, 31);
        }
      }
    }

    // 饼状图
    .pie {
      width: calc(50%);
      height: 100%;
      background: #fff;
    }
  }

  // 中间部分内容 消息阅读量图 产品类别图
  .mid-content-wrapped {
    margin-top: 8px;
    height: calc(32% - 8px);
    display: flex;

    // 中间左部分
    .mid-content-left {
      margin-right: 8px;
      width: calc(60% - 8px);
      background: #fff;
      height: 100%;
    }

    // 中间右部分
    .mid-content-right {
      width: calc(40%);
      background: #fff;
      padding: 8px;
      height: 100%;

      // 标题
      .title {
        font-size: 14px;
        margin-bottom: 8px;
      }

      // 按钮区域
      .button-area {
        margin-bottom: 8px;
        height: 80px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        background: #f5f5f5;

        // 按钮名字
        .button-name {
          margin-top: 10px;
        }
      }

      // 按钮变色
      .button-area:hover {
        background: #e4efff;
      }
    }
  }

  // 底部内容
  .footer-content-wrapped {
    margin-top: 8px;
    height: calc(38% - 8px);
    display: flex;

    // 底部左部分
    .footer-content-left {
      margin-right: 8px;
      height: 100%;
      width: calc(30% - 8px);
      background: #fff;
    }

    // 底部右部分
    .footer-content-right {
      height: 100%;
      width: calc(70%);
      background: #fff;
    }
  }
}
</style>
