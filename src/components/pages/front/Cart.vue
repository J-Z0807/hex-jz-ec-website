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

      <table class="table mb-0" style="min-width: 300px">
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
            </th>
            <td class="text-center align-middle">
              <div class="btn-group amount_area">
                <button
                  type="button"
                  class="btn btn-outline-secondary"
                  @click.prevent="
                    if (item.qty > 1) {
                      item.qty--;
                      final_total = total =
                        total - parseInt(item.product.price);
                    } else {
                      item.qty = 1;
                    }
                  "
                >
                  <i aria-hidden="true" class="fa fa-minus"></i>
                </button>
                <input
                  type="number"
                  max="10"
                  min="1"
                  class="amount text-center"
                  v-model="item.qty"
                  readonly
                />
                <button
                  type="button"
                  class="btn btn-outline-secondary"
                  @click.prevent="
                    if (item.qty < 10) {
                      item.qty++;
                      final_total = total =
                        total + parseInt(item.product.price);
                    } else {
                      item.qty = 10;
                    }
                  "
                >
                  <i aria-hidden="true" class="fa fa-plus"></i>
                </button>
              </div>
            </td>
            <td class="text-right align-middle text-nowrap">
              {{ (item.product.price * item.qty) | currency }}
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
              <div class="input-group input-group-sm">
                <input
                  type="text"
                  placeholder="請輸入優惠碼"
                  class="form-control"
                />
                <div class="input-group-append">
                  <button
                    type="button"
                    class="btn btn-outline-primary"
                    @click="addCouponCode()"
                  >
                    套用優惠碼
                  </button>
                </div>
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

      <div class="text-right px-4">
        <button class="btn btn-danger btn-text-style">前往填寫資料</button>
      </div>
    </div>

    <!-- Modal -->
    <div class="modal" tabindex="-1" role="dialog" id="hint-modal">
      <div class="modal-dialog bg-warning" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">提示</h5>
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
            <p>Modal body text goes here.</p>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import Alert from "../../AlertMessage";

export default {
  name: "cart",
  components: {
    Alert,
  },
  data() {
    return {
      carts: [],
      final_total: 0,
      total: 0,
      isLoading: false,
      isEdit_qty: false,
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
    @include gradient-color(red, yellow);
  }
}
</style>