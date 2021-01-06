<template>
  <div>
    <loading :active.sync="isLoading"></loading>

    <table class="table mt-4">
      <thead>
        <tr>
          <th width="120">購買時間</th>
          <th width="400">email</th>
          <th>購買款項</th>
          <th width="120">應付金額</th>
          <th width="100">是否付款</th>
        </tr>
      </thead>
      <tbody id="Table_data">
        <tr v-for="item in orders" :key="item.id">
          <td>{{ item.create_at | date }}</td>
          <td>{{ item.user.email }}</td>
          <td>
            <p v-for="product in item.products" :key="product.id">
              <b class="h6 d-block">{{ product.product.title }}</b>
              <small>數量: {{ product.product.num }}</small>
            </p>
          </td>
          <td class="text-right">{{ item.total | currency }}</td>
          <td>
            <span v-if="item.is_paid" class="text-success">已付款</span>
            <span v-else class="text-danger">未付款</span>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- 分頁bar -->
    <pagination @runPage="getOrders" />
  </div>
</template>

<script>
import pagination from "../Pagination";

export default {
  components: {
    pagination,
  },
  data() {
    return {
      orders: [], //載入一開始的表單資料
      isLoading: false, //是否要有loading動畫(大範圍)
    };
  },
  methods: {
    getOrders(page = 1) {
      const api = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/admin/orders?page=${page}`;
      const vm = this;
      vm.isLoading = true;
      vm.$http.get(api).then((response) => {
        vm.orders = response.data.orders;
        vm.isLoading = false;

        //分頁處理
        vm.$bus.$emit("page:change", response.data.pagination);
      });
    },
  },
  created() {
    this.getOrders();
  },
};
</script>