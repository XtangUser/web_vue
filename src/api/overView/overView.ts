// 导入axios
import instance from '@/http/axios'

// 获取产品类别和总价
export const getCategoryAndNumber = () => {
	return instance({
		url: '/over/getCategoryAndNumber',
		method: 'POST',
	})
}

// 获取不同角色与数量
export const getAdminAndNumber = () => {
	return instance({
		url: '/over/getAdminAndNumber',
		method: 'POST',
	})
}

// 获取不同消息等级与数量
export const getLevelAndNumber = () => {
	return instance({
		url: '/over/getLevelAndNumber',
		method: 'POST',
	})
}

// 返回每天登录人数
export const getDayAndNumber = () => {
	return instance({
		url: '/over/getDayAndNumber',
		method: 'POST',
	})
}