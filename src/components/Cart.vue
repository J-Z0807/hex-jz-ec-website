<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <Alert />

    <div class="container my-5">
      <div class="text-center mt-3">
        <img
          src="https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/girl_avatar_child_kid-256.png"
          alt="標題圖示"
          class="img-fluid"
          style="width: 80px"
        />
      </div>

      <h2 class="main-title mb-5">購物車</h2>

      <h2 class="text-info text-center my-5" v-if="!isCartData">無任何商品</h2>

      <div class="table-responsive" v-else>
        <table class="table mb-0">
          <thead>
            <tr>
              <th width="150">商品</th>
              <th>名稱</th>
              <th width="170" class="text-center">數量</th>
              <th width="130" class="text-right">金額</th>
              <th width="80" class="text-center">刪除</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-top" v-for="item in carts" :key="item.id">
              <th class="align-middle">
                <img
                  :src="item.product.imageUrl"
                  alt="商品圖示"
                  class="img-fluid commodity-img"
                  @click="commodity_detail(item.product.id)"
                />
              </th>
              <th class="align-middle product-name">
                {{ item.product.title }}
                <p class="text-success" v-if="item.coupon !== undefined">
                  已使用折價卷 折價{{ item.coupon.percent }}%
                </p>
              </th>
              <td class="text-center align-middle">
                <div class="btn-group amount_area">
                  <button
                    type="button"
                    class="btn btn-outline-secondary"
                    @click.prevent="change_qty(item, '-')"
                    v-if="!is_have_coupon_code"
                  >
                    <i aria-hidden="true" class="fa fa-minus"></i>
                  </button>
                  <input
                    type="number"
                    max="10"
                    min="1"
                    class="amount text-center"
                    v-model="item.qty"
                    v-if="!is_have_coupon_code"
                    readonly
                  />
                  <span v-if="is_have_coupon_code">{{ item.qty }}</span>
                  <button
                    type="button"
                    class="btn btn-outline-secondary"
                    @click.prevent="change_qty(item, '+')"
                    v-if="!is_have_coupon_code"
                  >
                    <i aria-hidden="true" class="fa fa-plus"></i>
                  </button>
                </div>
              </td>
              <td class="text-right align-middle text-nowrap">
                {{ (item.product.price * item.qty) | currency }}
                <p class="text-success" v-if="item.coupon !== undefined">
                  {{
                    (item.product.price *
                      item.qty *
                      (item.coupon.percent / 100))
                      | currency
                  }}
                </p>
              </td>
              <td class="text-center align-middle">
                <button
                  type="button"
                  class="btn btn-outline-danger btn-sm"
                  @click="removeCartItem(item.id)"
                >
                  <i class="fas fa-trash-alt"></i>
                </button>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="2">
                <div
                  class="input-group input-group-sm"
                  v-if="!is_have_coupon_code & is_saveCartData"
                >
                  <input
                    type="text"
                    class="form-control w-50"
                    v-model="coupon_code"
                    @input="is_invalid_coupon_code = false"
                  />
                  <div class="input-group-append">
                    <button
                      type="button"
                      class="btn btn-outline-primary"
                      @click="addCouponCode()"
                      :disabled="final_total !== total"
                    >
                      <i
                        class="fas fa-spinner fa-spin"
                        v-if="status.loadingCoupon_code"
                      ></i>
                      套用優惠碼
                    </button>
                    <p
                      class="coupon-error text-danger d-flex align-self-center mb-0 ml-3"
                      v-if="is_invalid_coupon_code"
                    >
                      此優惠券無效
                    </p>
                  </div>
                  <span class="text-danger"
                    >只要添加了優惠卷後就無法再進行商品數量更改了!</span
                  >
                </div>
              </td>

              <td colspan="3">
                <div class="text-muted text-nowrap text-right px-3 py-2">
                  小計: <strong>{{ total | currency }}</strong>
                </div>
              </td>
            </tr>

            <tr>
              <td colspan="5">
                <div class="text-muted text-nowrap text-right px-3 py-2">
                  <p class="text-danger">
                    總計:
                    <span class="h3"
                      ><strong>{{ final_total | currency }}</strong></span
                    >
                  </p>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div class="text-right px-4" v-if="isCartData">
        <button class="btn btn-text-style">
          <a
            class="nav-link"
            href=""
            @click.prevent="saveNewCartData()"
            v-if="!is_saveCartData"
          >
            <span class="text-white">確認購物清單</span>
          </a>

          <router-link to="/write_information" class="nav-link" v-else>
            <span class="text-white">前往填寫資料</span>
          </router-link>
        </button>
      </div>

      <div class="text-right px-4" v-else>
        <button class="btn btn-text-style">
          <router-link class="nav-link" to="/category/衣服">
            <span class="text-white">前往商店瀏覽</span>
          </router-link>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import Alert from "./AlertMessage";

export default {
  name: "cart",
  components: {
    Alert,
  },
  data() {
    return {
      carts: [],
      isCartData: false,
      final_total: 0,
      total: 0,
      isLoading: false,
      coupon_code: "",
      is_have_coupon_code: false,
      is_invalid_coupon_code: false,
      is_saveCartData: true, //一開始未更動為true，等到更動後為false
      status: {
        loadingCoupon_code: false,
      },
    };
  },
  methods: {
    change_qty(item, change_str) {
      const vm = this;
      vm.is_saveCartData = false; //如果原本為最新資料，更動後為未儲存資料

      if (change_str === "+") {
        if (item.qty < 10) {
          item.qty++;
          vm.total = vm.total + parseInt(item.product.price);

          //有折價卷時
          if (item.coupon !== undefined) {
            vm.final_total =
              vm.final_total +
              parseInt(
                (item.product.price * (item.coupon.percent / 100)).toFixed(0)
              );
          } else {
            vm.final_total = vm.final_total + parseInt(item.product.price);
          }
        } else {
          item.qty = 10;
        }
      } else {
        if (item.qty > 1) {
          item.qty--;
          vm.total = vm.total - parseInt(item.product.price);

          //有折價卷時
          if (item.coupon !== undefined) {
            vm.final_total =
              vm.final_total -
              parseInt(
                (item.product.price * (item.coupon.percent / 100)).toFixed(0)
              );
          } else {
            vm.final_total = vm.final_total - parseInt(item.product.price);
          }
        } else {
          item.qty = 1;
        }
      }
    },
    saveNewCartData() {
      const vm = this;

      vm.isLoading = true;

      let url = "";

      vm.carts.forEach((element, key) => {
        //刪除
        url = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/cart/${element.id}`;
        vm.$http.delete(url).then((response) => {});

        //重新加入新的商品資訊
        url = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/cart`;
        const cart = {
          product_id: element.product_id,
          qty: element.qty,
        };

        vm.$http.post(url, { data: cart }).then((response) => {});

        //添加原先的優惠卷
        if (element.coupon !== undefined) {
          url = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/coupon`;

          const coupon = {
            code: element.coupon.code,
          };

          vm.$http.post(url, { data: coupon }).then((response) => {});
        }
      });

      //避免太快就將載入效果移除，讓資料讀取錯誤
      setTimeout(function () {
        vm.isLoading = false;
      }, 1000);

      vm.is_saveCartData = true; //設為已儲存狀態
    },
    getCart() {
      const vm = this;
      const url = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/cart`;
      vm.isLoading = true;

      vm.$http.get(url).then((response) => {
        vm.carts = response.data.data.carts;
        vm.total = response.data.data.total;
        vm.final_total = response.data.data.final_total;

        if (vm.carts.length !== 0) vm.isCartData = true;
        else vm.isCartData = false;

        if (vm.total !== vm.final_total) {
          vm.is_have_coupon_code = true;
        } else {
          vm.is_have_coupon_code = false;
        }

        vm.isLoading = false;
      });
    },
    removeCartItem(id = "") {
      const vm = this;
      const url = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/cart/${id}`;
      vm.isLoading = true;

      vm.$http.delete(url).then((response) => {
        vm.isLoading = false;
        if (parseInt($("#cart-count").text()) - 1 !== 0)
          $("#cart-count").text(parseInt($("#cart-count").text()) - 1); //將購物車的現有數量-1
        vm.getCart();
        vm.$bus.$emit("message:push", response.data.message, "success");
        vm.$bus.$emit("ChangeCart");
      });
    },
    addCouponCode() {
      const vm = this;
      const url = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/coupon`;
      vm.status.loadingCoupon_code = true;

      const coupon = {
        code: vm.coupon_code,
      };

      vm.$http.post(url, { data: coupon }).then((response) => {
        if (!response.data.success) {
          vm.is_invalid_coupon_code = true;
        } else {
          vm.is_invalid_coupon_code = false;
          vm.$bus.$emit("message:push", response.data.message, "success");
          vm.getCart();
        }

        vm.coupon_code = "";
        vm.status.loadingCoupon_code = false;
      });
    },
    commodity_detail(productsID) {
      this.$router.push(`/commodity_detail/${productsID}`);
    },
  },
  created() {
    const vm = this;
    vm.getCart();

    vm.$bus.$on("ChangeCart", function () {
      vm.getCart();
    });
  },
};
</script>

<style lang="scss" scoped>
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
  cursor: pointer;
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

.coupon-error {
  opacity: 1;
  -webkit-animation: couponError 0.5s 3;
  animation: couponError 0.5s 3;
}

@keyframes couponError {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>