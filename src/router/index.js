import Vue from 'vue';
import Router from 'vue-router';
//官方的文件

//後台
import dashboard from '@/components/Dashboard';

import login from '@/components/pages/back/login';
import products from '@/components/pages/back/Products';
import Orders from '@/components/pages/back/Orders';
import Coupon from '@/components/pages/back/Coupon';
import CustomerOrder from '@/components/pages/back/CustomerOrder';
import CustomerCheckout from '@/components/pages/back/CustomerCheckout';

//前台
import Layout from '@/components/Layout';

import Home from '@/components/pages/front/Home';
import Category from '@/components/pages/front/Category';
import Commodity_detail from '@/components/pages/front/Commodity_detail';

Vue.use(Router);

export default new Router({
  routes: [
    {
      //防止用戶跳到不存在的頁面
      path: '*',
      redirect: '/home'
    },
    {
      path: '/admin/login',
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
          meta: {
            requiresAuth: true, //需要被導航守衛驗證
            isSearchBar: true, //是否要有搜尋框
          }, 
        },
        {
          path: 'orders',
          name: 'Orders',
          component: Orders,
          meta: {
            requiresAuth: true, //需要被導航守衛驗證
            isSearchBar: true, //是否要有搜尋框
          }, 
        },
        {
          path: 'coupon',
          name: 'Coupon',
          component: Coupon,
          meta: {
            requiresAuth: true, //需要被導航守衛驗證
            isSearchBar: true, //是否要有搜尋框
          }, 
        },
        {
          path: 'customer_order',
          name: 'CustomerOrder',
          component: CustomerOrder,
          meta:{
            isSearchBar: false, //是否要有搜尋框
          }
        },
        {
          path: 'customer_checkout/:orderId',
          name: 'CustomerCheckout',
          component: CustomerCheckout,
          meta:{
            isSearchBar: false, //是否要有搜尋框
          }
        }
      ]
    },
    {
      path: '/',
      name: 'Layout',
      component: Layout,
      children:[
        {
          path: '/',
          redirect: '/home'
        },
        {
          path: 'home',
          name: 'Home',
          component: Home, 
        },
        {
          path:'category/:categoryName',
          name: 'category',
          component: Category,
        },
        {
          path: 'commodity_detail/:commodityId',
          name: 'commodity_detail',
          component: Commodity_detail,
        }
      ]
    },
  ]
})
