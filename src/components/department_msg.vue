<template>
	<el-dialog v-model="dialogMsg" title="部门消息" width="812px" center destroy-on-close>
		<el-container>
			<el-aside width="416px">
				<div class="message-list-wrapped">
					<div class="list-table-content">
						<el-table :data="msgStore.msg_list.length >0 ? msgStore.msg_list : tableData"
							style="width: 100%;" highlight-current-row @row-click="getDetail">
							<el-table-column type="index" width="50" />
							<el-table-column width="5" >
								<template #default='{ row }'>
									<div :class="idInList(row.id) ? 'readed' : 'noread'"></div>
								</template>
							</el-table-column>
							<el-table-column label="主题" prop="message_title">
								<template #default='{ row}'>
									<div class="title-wrapped">
										<div class="title">{{row.message_title}}</div>
									</div>
								</template>
							</el-table-column>
							<el-table-column label="等级" prop="message_level">
								<template #default='{row}'>
									<el-tag class="mx-1" round
										v-if="row.message_level=='一般'">{{row.message_level}}</el-tag>
									<el-tag type="warning" class="mx-1" round
										v-if="row.message_level=='重要'">{{row.message_level}}</el-tag>
									<el-tag type="danger" class="mx-1" round
										v-if="row.message_level=='必要'">{{row.message_level}}</el-tag>
								</template>
							</el-table-column>
							<el-table-column label="发布日期" prop="message_publish_time">
								<template #default='{row}'>
									<div>{{row.message_publish_time?.slice(0,10)}}</div>
								</template>
							</el-table-column>
						</el-table> 
					</div>
				</div>
			</el-aside>
			<el-main>
				<div class="detail-wrapped" v-if="messageInfo.message_title!==''">
					<div>{{messageInfo.message_title}}</div>
					<div v-html="messageInfo.message_content"></div>
				</div>
				<div class="detail-wrapped" v-else>
					请点击列表中的消息进行查看
				</div>
			</el-main>
		</el-container>
	</el-dialog>
</template>

<script lang="ts" setup>
	import {
		reactive,
		ref,
	} from 'vue'
	import {
		getDepartmentMsg,
		getDepartmentMsgList,
		getReadListAndStatus,
		clickDelete
	} from '@/api/department_msg/department_msg'
	import { updateClickNumber } from '@/api/message/index'
	import {
		useMsg
	} from '@/stores/message'
  import { useUserinfo } from '@/stores/userinfo'
  const infoStore = useUserinfo()
	const msgStore = useMsg()
	let tableData = reactive([])
	const messageInfo = reactive({
		message_title: '',
		message_content: ''
	})
	// 当前未读消息
	const readList = ref<string[]>([])
		msgStore.returnReadList()
	const getUserDepartmentMessage = async() => {
		if (infoStore.department !== '') {
			const res = await getReadListAndStatus(infoStore.id) as any
			tableData = await getDepartmentMsgList(infoStore.department) as any
			if (res.data[0].read_status == 0) {
				const {
					read_list
				} = await getDepartmentMsg(infoStore.id, infoStore.department) as any
				readList.value = read_list
			} else {
				readList.value = JSON.parse(res.data[0].read_list)
			}
		}
	}
	getUserDepartmentMessage()


	const getDetail = async(row: any) => {
       await updateClickNumber(row.id);
			 const res=await clickDelete(row.id, infoStore.id);
			 console.log(res);
       messageInfo.message_title = row.message_title;
       messageInfo.message_content = row.message_content;
      const res01= await getUserDepartmentMessage();
			
    };

	const idInList = (id:any)=> {
	const list=	JSON.stringify(readList.value)
	if(list.includes(id.toString())) return true
	return false
};
	// 弹窗默认为false
	const dialogMsg = ref()
	// 暴露open
	const open = () => {
		dialogMsg.value = true
	}
	defineExpose({
		open
	})
</script>

<style lang="scss" scoped>
	.el-aside {
		padding-left: 8px;
		min-height: 500px;
	}

	.el-main {
		min-height: 500px;
		--el-main-padding: 0px;
		border-left: 1px solid #eee;
	}

	.message-list-wrapped {
		height: 500px;
	}

	.list-table-content {
		min-height: 10px;
		padding: 8px;
		:deep(.el-table__row){
			cursor: pointer;
		}
	}

	.el-table {
		height: 100%;

		.title-wrapped {
			display: flex;
			align-items: center;
		}

		.title {
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
	}

	.readed {
		display: block;
		width: 5px;
		padding: 1px;
		height: 5px;
		border-radius: 50%;
		background: #A9A9A9;
	}

	.noread {
		display: block;
		width: 5px;
		padding: 1px;
		height: 5px;
		border-radius: 50%;
		background: #25e510cd;
	}

	.detail-wrapped {
		padding: 8px;
	}
</style>