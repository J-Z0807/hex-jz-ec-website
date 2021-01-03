import Vue from 'vue'
import Router from 'vue-router'
//官方的文件

import helloworld from '@/components/HelloWorld'
import login from '@/components/pages/login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'helloworld',
      component: helloworld
    },
    {
      path: '/login',
      name: 'login',
      component: login
    }
  ]
})
