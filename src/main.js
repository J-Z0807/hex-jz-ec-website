// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import 'bootstrap';

import router from './router';
import App from './App';
import './bus';
import currencyFilter from './filters/currency';

Vue.use(VueAxios, axios);
Vue.config.productionTip = false;

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
