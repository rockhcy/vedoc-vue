import axios from 'axios';
import router from './router';
import { Message } from 'element-ui';

window.isRefreshing = false  //token正在刷新中
const Axios = axios.create({
  baseURL: 'http://192.168.50.143:10002/',//请求地址
  withCredentials: true,//允许跨域
  headers: {
    'Content-Type': "application/json;charset=UTF-8",
  }
});

// 请求前置拦截器
Axios.interceptors.request.use(
  config => {
    console.log("config:", config)
    if (sessionStorage.getItem('token') == null) {
      router.push({
        name: 'Login',
      })
    } else {
      // refreshToken(config);
      config.headers.common.Authorization = sessionStorage.getItem('token');
    }
    return config;
  },
  error => Promise.reject(error)
);

//响应前置拦截器
Axios.interceptors.response.use(
  (response) => {
    console.log(response)
    return response;
  }, error => {
    // if (error.response.data.code == 1005) {
    //   Axios.get("/user/refreshToken").then(res => {
    //     if (res.status == 200) {
    //       sessionStorage.setItem('token', res.data)
    //       error.config.headers.Authorization = res.data;
    //       return Axios.request(error.config);
    //     } else {
    //       console.log("shuaxsibai")
    //     }
    //   }).catch(err => {
    //     console.log("err:", err)
    //   })
    // }
    // if (error.response.data.code == 1004) {
    //   Message.warning({ message: "令牌过期，请重新登陆" });
    //   router.push({
    //     name: 'Login',
    //   })
    //   return
    // }
    if (error.response.status != 200) {
      Message.warning({ message: error.response.data });
      return error.response.data;
    }

  }
);

// function refreshToken (config) {
//   if (config.url != "/auth/login") {
//     var token = sessionStorage.getItem('token').replace("Bearer ", "").trim();
//     console.log("准备比对令牌：" + token)
//     console.log(Date.now(JSON.parse(window.atob(token.split('.')[1])).exp * 1000))

//     if (Date.now() > JSON.parse(window.atob(token.split('.')[1])).exp * 1000 - 1000 * 30) {
//       if (!window.isRefreshing) {
//         window.isRefreshing = true
//         Axios.get("/user/refreshToken").then(res => {
//           console.log("请求令牌完成")
//           if (res.status == 200) {
//             console.log("准备设置新令牌：", res.data)
//             sessionStorage.setItem('token', res.data)
//             window.isRefreshing = false
//           } else {
//             console.log("shuaxsibai")
//           }
//         }).catch(err => {
//           console.log("err:", err)
//         })
//         window.isRefreshing = false
//       }
//     }
//   }
// }



export default Axios;