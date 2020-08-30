import axios from 'axios'

// 创建axios实例
const Axios = axios.create({
  baseURL: 'http://localhost:10002/', // api的base_url
  timeout: 5000, // 请求超时时间
  withCredentials: false,// 当前请求为跨域类型时是否在请求中协带cookie,需要注意是，当配置了xhr.withCredentials = true时，必须在后端增加 response 头信息Access-Control-Allow-Origin，且必须指定域名，而不能指定为*。
  crossDomain: true,//允许跨域
  headers: { 'Content-Type': "application/json;charset=UTF-8" }
})

export default Axios