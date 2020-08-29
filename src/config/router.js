import Vue from 'vue'
import Router from 'vue-router'
import login from '@/views/login/index'
import Layout from '@/components/index'
import homeIndex from '@/views/home/index'
import reposShare from '@/views/reposShare'

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
      ]
    }
  ]
})
