import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/login/index'
import Layout from '@/components/index'
import homeIndex from '@/views/home/index'
import reposShare from '@/views/reposShare'
import fileManagement from '@/views/fileManagement/index'


Vue.use(Router)

//todo 屏蔽 Avoided redundant navigation to current... 错误，后面在详细解决这个问题
// 已经解决，这个错误的意思是，你当前已经在某个路由下了，没必要再转跳到这个相同的路由上。因此给了这个错误
// const originalPush = Router.prototype.push
// Router.prototype.push = function push (location) {
//   return originalPush.call(this, location).catch(err => err)
// }

export default new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/Layout',
      name: 'Layout',
      component: Layout,
      children: [
        {
          path: '/homeIndex',
          name: 'homeIndex',
          component: homeIndex
        },
        {
          path: '/reposShare',
          name: 'reposShare',
          component: reposShare
        },
        {
          path: '/fileManagement',
          name: 'fileManagement',
          component: fileManagement
        },
      ]
    }
  ]
})
