<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="product_detail content">
      <div class="container-fluid bannerimg">
        <!-- 訂單進度 -->
        <div class="scheduleStep">
          <div class="row no-gutters justify-content-between">
            <div class="col-4 px-0">
              <h3 class="text-white">
                <router-link class="nav-link" to="/carts_checkout">
                  <span class="link">確認訂單</span>
                </router-link>
              </h3>
            </div>
            <div class="col-4 px-0 text-center">
              <h3 class="text-white">填寫資料</h3>
            </div>
            <div class="col-4 px-0 text-right">
              <h3 class="text-white">完成訂單</h3>
            </div>

            <div class="col-12 text-center my-3">
              <span class="h5">2 / 3</span>
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

      <h2 class="main-title mb-5">建立訂單</h2>

      <div>
        <div class="my-4 row justify-content-center">
          <table class="table border mr-5 col-5">
            <thead class="thead-dark">
              <tr>
                <th colspan="3">訂單明細</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in carts" :key="item.id">
                <td class="text-center">
                  <img
                    class="img-fluid"
                    :src="item.product.imageUrl"
                    alt="商品"
                    style="height: 100px"
                  />
                </td>
                <td class="align-middle" style="width: auto">
                  <b>{{ item.product.title }}</b>
                  <span class="text-secondary">* {{ item.qty }}</span>
                  {{ item.product.unit }}
                  <p class="text-success" v-if="item.coupon !== undefined">
                    優惠卷折價{{ item.coupon.percent }}%
                  </p>
                </td>
                <td class="align-middle text-right border-right">
                  <p class="text-success" v-if="item.coupon !== undefined">
                    {{
                      (item.product.price *
                        item.qty *
                        (item.coupon.percent / 100))
                        | currency
                    }}
                    元
                  </p>
                  <p class="text-dark mb-0" v-else>
                    {{ (item.product.price * item.qty) | currency }} 元
                  </p>
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td
                  colspan="3"
                  class="bg-light text-right text-light font-weight-bold"
                >
                  <p class="text-danger">
                    總計:
                    <span class="h2"
                      ><strong>{{ final_total | currency }}</strong>
                    </span>
                    元
                  </p>
                </td>
              </tr>
            </tfoot>
          </table>

          <table class="table border col-5">
            <thead class="thead-dark">
              <tr>
                <th colspan="3">訂單資訊</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colspan="3">
                  <div class="col-12">
                    <validation-observer v-slot="{ invalid }">
                      <form @submit.prevent="createdOrder()">
                        <validation-provider
                          rules="required|email"
                          v-slot="{ errors, classes }"
                        >
                          <div class="form-group">
                            <!-- 輸入框 -->
                            <label for="email">Email</label
                            ><span class="text-danger"> * </span>
                            <input
                              id="email"
                              type="email"
                              name="email"
                              v-model="form.user.email"
                              class="form-control"
                              :class="classes"
                            />
                            <!-- 錯誤訊息 -->
                            <span class="invalid-feedback">{{
                              errors[0]
                            }}</span>
                          </div>
                        </validation-provider>

                        <validation-provider
                          rules="required"
                          v-slot="{ errors, classes }"
                        >
                          <div class="form-group">
                            <!-- 輸入框 -->
                            <label for="name">收件人姓名</label
                            ><span class="text-danger"> * </span>
                            <input
                              id="name"
                              type="text"
                              name="name"
                              v-model="form.user.name"
                              class="form-control"
                              :class="classes"
                            />
                            <!-- 錯誤訊息 -->
                            <span class="invalid-feedback">{{
                              errors[0]
                            }}</span>
                          </div>
                        </validation-provider>

                        <validation-provider
                          rules="required"
                          v-slot="{ errors, classes }"
                        >
                          <div class="form-group">
                            <!-- 輸入框 -->
                            <label for="usertel">收件人電話</label
                            ><span class="text-danger"> * </span>
                            <input
                              id="usertel"
                              type="tel"
                              name="tel"
                              v-model="form.user.tel"
                              class="form-control"
                              :class="classes"
                            />
                            <!-- 錯誤訊息 -->
                            <span class="invalid-feedback">{{
                              errors[0]
                            }}</span>
                          </div>
                        </validation-provider>

                        <validation-provider
                          rules="required"
                          v-slot="{ errors, classes }"
                        >
                          <div class="form-group">
                            <!-- 輸入框 -->
                            <label for="address">收件人地址</label
                            ><span class="text-danger"> * </span>
                            <input
                              id="address"
                              type="text"
                              name="address"
                              v-model="form.user.address"
                              class="form-control"
                              :class="classes"
                            />
                            <!-- 錯誤訊息 -->
                            <span class="invalid-feedback">{{
                              errors[0]
                            }}</span>
                          </div>
                        </validation-provider>

                        <div class="form-group">
                          <label for="comment">留言</label>
                          <textarea
                            name=""
                            id="comment"
                            class="form-control"
                            cols="30"
                            rows="10"
                            v-model="form.message"
                          ></textarea>
                        </div>

                        <div class="text-right">
                          <button class="btn btn-danger" :disabled="invalid">
                            送出訂單
                          </button>
                        </div>
                      </form>
                    </validation-observer>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div
      class="modal fade"
      id="hint_Modal"
      tabindex="-1"
      role="dialog"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header bg-danger">
            <h5 class="modal-title text-white" id="hint_Modal_title">注意</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p class="h4"><b>您現在正在處理訂單中!</b></p>
            <p class="h6">確定要離開此頁面並結束訂單處理嗎?</p>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              取消
            </button>
            <button type="button" class="btn btn-danger" id="confirm_exit">
              離開
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  name: "WriteInformation",
  data() {
    return {
      carts: {},
      isLoading: false,
      final_total: 0,
      total: 0,
      form: {
        user: {
          name: "",
          email: "",
          tel: "",
          address: "",
        },
        message: "",
      },
    };
  },
  methods: {
    getCart() {
      const vm = this;
      const url = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/cart`;
      vm.isLoading = true;

      vm.$http.get(url).then((response) => {
        vm.carts = response.data.data.carts;
        vm.total = response.data.data.total;
        vm.final_total = response.data.data.final_total;

        vm.isLoading = false;
      });
    },
    createdOrder() {
      const vm = this;
      const url = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/order`;
      const order = vm.form;
      vm.isLoading = true;

      vm.$http.post(url, { data: order }).then((response) => {
        if (response.data.success) {
          vm.$router.push(`/checkout/${response.data.orderId}`);
        } else {
          vm.$bus.$emit("message:push", response.data.message, "danger");
        }

        vm.isLoading = false;
      });
    },
  },
  created() {
    const vm = this;
    vm.getCart();
  },
  beforeRouteLeave(to, from, next) {
    if (to.name == "checkout") next();
    else {
      $("#hint_Modal").modal("show");

      $("#confirm_exit").click(function () {
        $("#hint_Modal").modal("hide");
        next();
      });
    }

    next(false);
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

  width: 50%;
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
</style>
