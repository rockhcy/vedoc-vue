import Vue from 'vue'
import Router from 'vue-router'
import login from '@/views/login/index'
import homeIndex from '@/views/home/index'

Vue.use(Router)


export default new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/home',
      name: 'homeIndex',
      component: homeIndex
    }
  ]
})
