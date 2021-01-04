import Vue from 'vue';

Vue.prototype.$bus = new Vue();

// message 提示
// vm.$bus.$emit('message:push', message, status);
// message: 訊息內容
// status: 樣式，預設值為 warning