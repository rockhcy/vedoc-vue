import axios from 'axios'
import router from './router'
import { Notification } from 'element-ui';
window.isRefreshing = false  //token是否正在刷新中
// 创建axios实例
const Axios = axios.create({
  baseURL: window.GLOBAL_CONFIG_SETTING.WEB_BASE_API, // api的base_url  http://localhost:9999/
  timeout: 5000, // 请求超时时间
  withCredentials: false,// 当前请求为跨域类型时是否在请求中协带cookie,需要注意是，当配置了xhr.withCredentials = true时，必须在后端增加 response 头信息Access-Control-Allow-Origin，且必须指定域名，而不能指定为*。
  crossDomain: true,//允许跨域
  headers: { 'Content-Type': "application/json;charset=UTF-8" }
})

// 请求前置拦截
Axios.interceptors.request.use(config => {
  if (sessionStorage.getItem('token') == null) {
    if (window.location.href.split("#")[1] != "/") {
      router.push({
        name: 'Login',
      })
    }
  } else {
    let tokenStr = sessionStorage.getItem('token');
    config.headers.Authorization = tokenStr;
    var token = sessionStorage.getItem('token').replace("Bearer ", "").trim();
    if (Date.now() > JSON.parse(window.atob(token.split('.')[1])).exp * 1000) {
      //说明令牌完全过期，清除token并将页面转跳到登陆页
      sessionStorage.removeItem('token')
      router.push({
        name: 'Login',
      })
      return;
    } else if (Date.now() > JSON.parse(window.atob(token.split('.')[1])).exp * 1000 - 1000 * 30) {
      //说明令牌还未完全过期，就去换新令牌
      if (!window.isRefreshing) {
        window.isRefreshing = true
        Axios.get("user/refreshToken").then(res => {
          if (res.status == 200) {
            sessionStorage.setItem('token', res.data)
            window.isRefreshing = false
          } else {
            console.log("shuaxsibai")

          }
        }).catch(err => {
          console.log("err :", err)
        })
        window.isRefreshing = false
      }
    }

  }
  return config
}, function (error) {
  console.log(error)
})

// 响应前置拦截器
Axios.interceptors.response.use(function (response) {
  console.log("adsfadf", response)
  return response;
}, function (error) {
  console.log(error)
  console.log(error.response)
  if (error.response.status != 200) {
    Notification.error({
      title: 'err:' + error.response.data.code,
      message: error.response.data.message
    });
  }
  return Promise.reject(error);
});


export default Axios