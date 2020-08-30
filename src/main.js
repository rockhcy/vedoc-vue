import Vue from 'vue'
import App from './App.vue'
import router from '@/config/router.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/reset.css'
import 'element-ui/lib/theme-chalk/index.css'
import Axios from 'axios';
import store from '@/config/store'

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.prototype.$api = Axios;
Axios.defaults.baseURL = 'http://192.168.50.143:9999/'
Axios.defaults.withCredentials = true
Axios.defaults.headers = { 'Content-Type': "application/json;charset=UTF-8" }



new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
