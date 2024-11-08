// 导入和创建axios实例
import router from "@/router";
import axios  from "axios";
import { ElMessage } from "element-plus";
// 创建实例
const instance = axios.create({
  // 后端地址
  baseURL: 'http://127.0.0.1:3007',
  // 超时时间
  timeout: 1000,
  // 请求头配置和后端表单默认
  headers: {
    'Content-Type':'application/x-www-form-urlencoded'
  }
});
let isRedirected = false; // 标志变量，确保只重定向一次
// 添加请求拦截器
instance.interceptors.request.use(function(config) {
  console.log(config);
  // 在发送请求之前做些什么
  // 判断是否存在token,如果存在将每个页面header添加token
  if (localStorage.getItem("token")) {
    config.headers.Authorization = localStorage.getItem("token");
  }
  else if(config.url != '/api/login' && !localStorage.getItem("token")) {
    if(!isRedirected){
      isRedirected = true;
      router.push('/login');
      ElMessage.error('请先登录');
      return Promise.reject(new Error('token不存在'));
    }
    else{
      return Promise.reject(new Error('token不存在'));
    }
  }
  return config;
}, function(error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});
// 添加响应拦截器
instance.interceptors.response.use(function(response) {
  if(response.data.status||response.data.message){
    if(response.data.status==0){
      // if(response.data.message){
      //  ElMessage({
      //    message: response.data.message,
      //    type: 'success',
      //  })
      // }
    }else{
      // ElMessage.error(response.data.message)
    }
  }
	// 对响应数据做点什么
	return response
}, function(error) {
  if (error && error.response){
    switch (error.response.status){
      case 400:
        ElMessage.error('请求错误')
        break
      case 401:
        ElMessage.error('未授权，请登录')
        break
      case 403:
        ElMessage.error('拒绝访问')
        break
      case 404:
        ElMessage.error(`请求地址出错: ${error.response.config.url}`)
        break
      case 408:
        ElMessage.error('请求超时')
        break
      case 500:
        ElMessage.error('服务器内部错误')
        break
      case 501:
        ElMessage.error('服务未实现')
        break
      case 502:
        ElMessage.error('网关错误')
        break
      case 503:
        ElMessage.error('服务不可用')
        break
      case 504:
        ElMessage.error('网关超时')
        break
      case 505:
        ElMessage.error('HTTP版本不受支持')
        break
      default:
    }
  }
	// 对响应错误做点什么
	return Promise.reject(error);
});
// 暴露创建的实例
export default instance;