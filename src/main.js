import '../public/config.js'
import Vue from 'vue'
import App from './App.vue'
import router from '@/config/router.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/reset.css'
import 'element-ui/lib/theme-chalk/index.css'
import axios from './config/axiosConfig.js';
import store from '@/store/index.js'
import './icons'
import moment from 'moment'
import contentmenu from 'v-contextmenu'
import 'v-contextmenu/dist/index.css'




const VueUploadComponent = require('vue-upload-component')
Vue.component('file-upload', VueUploadComponent)

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(contentmenu)
Vue.prototype.$api = axios;
Vue.prototype.$moment = moment;


new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')

