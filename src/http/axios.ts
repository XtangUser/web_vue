// 导入和创建axios实例
import axios  from "axios";
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

// 设置拦截器(在请求或响应被 then 或 catch 处理前拦截它们。)
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});
//----------------------------------------
// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error);
});

// 暴露创建的实例
export default instance;