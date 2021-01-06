// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import 'bootstrap';
import { ValidationObserver, ValidationProvider, extend, localize, configure } from 'vee-validate';
import TW from 'vee-validate/dist/locale/zh_TW.json'
import * as rules from 'vee-validate/dist/rules';

import router from './router';
import App from './App';
import './bus';
import currencyFilter from './filters/currency';

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);

//把規則導出出來並手動加進去(因為預設是沒有加入的)
Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule]);
});

localize('zh_TW', TW); //運用繁體中文的語系檔

Vue.component('ValidationObserver', ValidationObserver); //整體form表單驗證元件
Vue.component('ValidationProvider', ValidationProvider); //input驗證元件

//class Name(BS4)設定檔
configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid'
  }
});

Vue.component('Loading', loading);
Vue.filter('currency', currencyFilter);

axios.defaults.withCredentials = true;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
})

//導航守衛(是否登入狀態)
router.beforeEach((to, from, next) => {
    if(to.meta.requiresAuth){
      const api = `${process.env.API_PATH}/api/user/check`;

      axios.post(api).then((response) => {
        if (response.data.success) {
          next();
        }
        else{
          next({
            path:'/login'
          })
        }
      });
    }
    else{
      next();
    }
});
