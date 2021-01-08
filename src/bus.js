import Vue from 'vue';

Vue.prototype.$bus = new Vue();

// 後端
// message 提示
// vm.$bus.$emit('message:push', message, status);
// message: 訊息內容
// status: 樣式，預設值為 warning

// page 調整
// vm.$bus.$emit("page:change", pagination);
// pagination: 分頁相關資料(物件)

//前端
//所有商品
// vm.$bus.$emit("data:commodity", commodity);
// commodity: 商品(物件)