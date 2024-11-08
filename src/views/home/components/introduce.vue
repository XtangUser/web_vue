<template>
	<el-dialog v-model="state.dialogFormVisible" :title="title" width="500px" destroy-on-close center>
	<div class="companyIntroduce" v-html="valueHtml"></div>
	</el-dialog>
</template>


<script lang="ts" setup>
	import '@wangeditor/editor/dist/css/style.css' // 引入 css
	import {
		onBeforeUnmount, ref,
		reactive
	} from 'vue'
	import { bus } from "@/utils/mitt.js"
	// changecompanyintro
	import { getAllCompanyMsg } from '@/api/set/set'
	const title = ref()
	bus.on("introduce", async function(id) {
		const msg = await getAllCompanyMsg();
  try {
    switch (id) {
      case 1:
        title.value = '公司介绍';
				valueHtml.value = msg.data.companyMsg[1].set_text;
        break;
      case 2:
        title.value = '公司架构';
				valueHtml.value = msg.data.companyMsg[2].set_text;
        break;
      case 3:
        title.value = '公司战略';
				valueHtml.value = msg.data.companyMsg[3].set_text;
        break;
      case 4:
        title.value = '高层介绍';
				valueHtml.value = msg.data.companyMsg[4].set_text;
        break;
      default:
        throw new Error('Invalid ID');
    }
  } catch (error) {
    console.error('Error handling editor title:', error);
  }
});
	// 内容 HTML
	const valueHtml = ref()
	const state = reactive({
		dialogFormVisible: false,
	});
	// 暴露open方法
	const open = () => {
		state.dialogFormVisible = true;
	};
	defineExpose({
		open,
	});

	// 取消订阅/监听
	onBeforeUnmount(() => {
		bus.all.clear()
	})
</script>
<style scoped lang="scss">
.companyIntroduce{
  width: 100%;
  height: 300px;
  width: 100%;
  height: 300px;
  font-size: 15px;
  overflow: hidden;
  text-indent: 24px;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}

</style>
