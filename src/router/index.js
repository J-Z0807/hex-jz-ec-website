import Vue from 'vue'
import Router from 'vue-router'
//官方的文件

import login from '@/components/pages/login'
import dashboard from '@/components/Dashboard'
import products from '@/components/pages/Products'
import Orders from '@/components/pages/Orders'
import Coupon from '@/components/pages/Coupon'
import CustomerOrder from '@/components/pages/CustomerOrder'
import CustomerCheckout from '@/components/pages/CustomerCheckout'

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
        },
        {
          path: 'orders',
          name: 'Orders',
          component: Orders,
          meta: {requiresAuth: true}, //需要被導航守衛驗證
        },
        {
          path: 'coupon',
          name: 'Coupon',
          component: Coupon,
          meta: {requiresAuth: true}, //需要被導航守衛驗證
        }
      ]
    },
    {
      path: '/',
      name: 'dashboard',
      component: dashboard,
      meta: {requiresAuth: true}, //需要被導航守衛驗證
      children:[
        {
          path: 'customer_order',
          name: 'CustomerOrder',
          component: CustomerOrder,
        },
        {
          path: 'customer_checkout/:orderId',
          name: 'CustomerCheckout',
          component: CustomerCheckout,
        }
      ]
    }
  ]
})
