import Vue from 'vue'
import Router from 'vue-router'
//官方的文件

import login from '@/components/pages/login'
import dashboard from '@/components/Dashboard'
import products from '@/components/pages/Products'

Vue.use(Router)

export default new Router({
  routes: [
    {
      //防止用戶跳到不存在的頁面
      path: '*',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/admin',
      name: 'dashboard',
      component: dashboard,
      meta: {requiresAuth: true}, //需要被導航守衛驗證
      children:[
        {
          path: 'products',
          name: 'products',
          component: products,
          meta: {requiresAuth: true}, //需要被導航守衛驗證
        }
      ]
    }
  ]
})
