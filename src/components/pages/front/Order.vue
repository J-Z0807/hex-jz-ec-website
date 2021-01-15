<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="order-bg">
      <div class="container">
        <div class="text-center pt-5">
          <img
            src="https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/girl_avatar_child_kid-256.png"
            alt="標題圖示"
            class="img-fluid"
            style="width: 80px"
          />
        </div>

        <h2 class="main-title mb-3">所有訂單</h2>

        <div class="text-center mb-5">
          <div class="btn-group">
            <button
              type="button"
              class="btn btn-danger"
              :class="{ active: !btn_status }"
              @click.prevent="btn_status = false"
            >
              未付款
            </button>
            <button
              type="button"
              class="btn btn-success"
              :class="{ active: btn_status }"
              @click.prevent="btn_status = true"
            >
              已付款
            </button>
          </div>
        </div>

        <h2 class="text-info text-center pb-5" v-if="orders.length === 0">
          無任何訂單
        </h2>

        <div class="pb-3 table-responsive" v-else>
          <table class="table table-hover">
            <thead class="thead-dark">
              <tr>
                <th width="120">購買時間</th>
                <th width="400">email</th>
                <th>購買款項</th>
                <th width="120">應付金額</th>
                <th width="100">是否付款</th>
              </tr>
            </thead>
            <tbody class="bg-white">
              <tr
                v-for="item in orders"
                :key="item.id"
                @click="viewOrder(item.id)"
                :class="{
                  'd-none': btn_status !== item.is_paid,
                  'table-row': btn_status === item.is_paid,
                }"
                title="點擊我查看此筆訂單資料"
              >
                <td>{{ item.create_at | date }}</td>
                <td>{{ item.user.email }}</td>
                <td>
                  <p v-for="product in item.products" :key="product.id">
                    <b class="h6 d-block">{{ product.product.title }}</b>
                    <small>數量: {{ product.qty }}</small>
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
        </div>
        <!-- 分頁bar -->
        <div :class="{ 'd-none': orders.length === 0 }">
          <pagination @runPage="getOrders" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import pagination from "../../Pagination";

export default {
  name: "order",
  components: {
    pagination,
  },
  data() {
    return {
      orders: {
        length: 0,
      },
      isLoading: false, //是否要有loading動畫(大範圍)
      btn_status: false, //預設為選取未付款狀態
    };
  },
  methods: {
    getOrders(page = 1) {
      const api = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/orders?page=${page}`;
      const vm = this;
      vm.isLoading = true;
      vm.$http.get(api).then((response) => {
        vm.orders = response.data.orders;
        vm.isLoading = false;

        //分頁處理
        vm.$bus.$emit("page:change", response.data.pagination);
      });
    },
    viewOrder(id) {
      const vm = this;
      vm.$router.push(`/checkout/${id}`);
    },
  },
  created() {
    this.getOrders();
  },
};
</script>

<style scoped lang="scss">
.order-bg {
  background-color: rgb(247, 243, 243);
  margin-top: 50px;
}

.main-title {
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Raleway, sans-serif;
  text-align: center;
  letter-spacing: 5px;
  margin: 1rem 0;

  &:after,
  &:before {
    content: "";
    flex: 1;
    margin: 0 3rem;
    border: 0.5px solid #212728;
  }
}

tbody tr {
  cursor: pointer;
}
</style>
