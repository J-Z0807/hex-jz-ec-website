<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="product_detail content">
      <div class="container-fluid bannerimg">
        <!-- 訂單進度 -->
        <div class="scheduleStep">
          <div class="row no-gutters justify-content-between">
            <div class="col-4 px-0">
              <h3 class="text-white">確認訂單</h3>
            </div>
            <div class="col-4 px-0 text-center">
              <h3 class="text-white">填寫資料</h3>
            </div>
            <div class="col-4 px-0 text-right">
              <h3 class="text-white">完成訂單</h3>
            </div>

            <div class="col-12 text-center my-3">
              <span class="h5">3 / 3</span>
            </div>
          </div>

          <div class="progress px-0">
            <div
              class="step progress-bar bg-success progress-bar-striped progress-bar-animated"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <div class="container my-5">
      <div class="text-center mt-3">
        <img
          src="https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/girl_avatar_child_kid-256.png"
          alt="標題圖示"
          class="img-fluid"
          style="width: 80px"
        />
      </div>

      <h2 class="main-title mb-5">完成訂單</h2>

      <div>
        <div class="my-4 row justify-content-center">
          <table class="table border mr-3 col-5">
            <thead class="thead-dark">
              <tr>
                <th colspan="3">商品資訊</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colspan="2">
                  <b>購買日期</b>
                </td>
                <td>
                  <b v-if="order.create_at != ''">{{
                    order.create_at | date
                  }}</b>
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <b>商品</b>
                </td>

                <td>
                  <p v-for="item in order.products" :key="item.id">
                    <b class="text-info">{{ item.product.title }}</b>
                    <b class="text-secondary">
                      * {{ item.qty }} {{ item.product.unit }}
                      {{ item.total | currency }}
                    </b>
                  </p>
                </td>
              </tr>
              <tr class="h4 text-danger">
                <td colspan="2" class="align-middle">
                  <b>總計</b>
                </td>

                <td class="align-middle text-right">
                  <b>{{ order.total | currency }}</b>
                </td>
              </tr>
            </tbody>
            <tfoot>
              <td v-if="order.is_paid === false" colspan="3">
                <div class="text-center">
                  <button
                    class="btn btn-danger btn-text-style w-100"
                    @click.prevent="payOrder()"
                  >
                    確認付款去
                  </button>
                </div>
              </td>
            </tfoot>
          </table>

          <table class="table border col-5">
            <thead class="thead-dark">
              <tr>
                <th colspan="3">買家資訊</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colspan="2">
                  <b>姓名</b>
                </td>
                <td>
                  <b>{{ order.user.name }}</b>
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <b>電話</b>
                </td>

                <td>
                  <b>{{ order.user.tel }}</b>
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <b>信箱</b>
                </td>

                <td>
                  <b>{{ order.user.email }}</b>
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <b>地址</b>
                </td>

                <td>
                  <b>{{ order.user.address }}</b>
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colspan="2">
                  <b>付款狀態</b>
                </td>

                <td>
                  <b v-if="order.is_paid" class="text-success">已付款</b>
                  <b v-else class="text-danger">未付款</b>
                </td>
              </tr>
            </tfoot>
          </table>

          <button class="btn btn-text-style w-50 mt-3" v-if="order.is_paid">
            <router-link
              class="nav-link text-white"
              to="/category/衣服"
              :class="{ active: category_str == '衣服' }"
            >
              <span class="link">繼續購物去</span>
            </router-link>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Alert from "../../AlertMessage";

export default {
  name: "checkout",
  components: {
    Alert,
  },
  data() {
    return {
      order: {
        user: {},
        total: 0,
        create_at: "",
      },
      isLoading: false,
      orderId: "",
    };
  },
  methods: {
    getOrder() {
      const vm = this;
      const url = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/order/${vm.orderId}`;

      vm.isLoading = true;

      vm.$http.get(url).then((response) => {
        vm.order = response.data.order;
        console.log(vm.order);
        vm.isLoading = false;
      });
    },
    payOrder() {
      const vm = this;
      const url = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/pay/${vm.orderId}`;

      vm.isLoading = true;

      vm.$http.post(url).then((response) => {
        if (response.data.success) {
          vm.$bus.$emit("message:push", response.data.message, "success");
          vm.getOrder();
        }
        vm.isLoading = false;
      });
    },
  },
  created() {
    this.orderId = this.$route.params.orderId;
    this.getOrder();
  },
};
</script>

<style scoped lang="scss">
.bannerimg {
  height: 200px;
  background-image: url("https://images.unsplash.com/photo-1468276311594-df7cb65d8df6?ixid=MXwxMjA3fDB8MHxzZWFyY2h8OXx8c2t5fGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1024&q=60");
  background-size: cover;
  background-position: center;
  margin-top: 70px;
  background-color: rgba(0, 0, 0, 0.1) !important;
  background-blend-mode: multiply !important;
}

.scheduleStep {
  position: absolute;
  width: 80%;
  justify-content: center;
  align-items: center;
  top: 15%;
  left: 50%;
  transform: translateX(-50%);
}

// 進度條 分成 10% 50% 100%
.step {
  -moz-transform: scaleX(-1);
  -webkit-transform: scaleX(-1);
  -o-transform: scaleX(-1);
  transform: scaleX(-1);

  width: 100%;
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

.commodity-img {
  width: 80px;
}

@mixin gradient-color($color1, $color2) {
  background: -webkit-linear-gradient($color1, $color2);
  background: -o-linear-gradient($color1, $color2);
  background: -moz-linear-gradient($color1, $color2);
  background: linear-gradient($color1, $color2);
}

.btn-text-style {
  @include gradient-color(yellow, red);

  &:hover {
    @include gradient-color(rgb(0, 81, 255), rgb(255, 0, 191));
  }
}
</style>
