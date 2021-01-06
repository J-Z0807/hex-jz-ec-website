<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <Alert />
    <div class="row mt-4">
      <div class="col-md-4 mb-4" v-for="item in products" :key="item.id">
        <div class="card border-0 shadow-sm">
          <div
            style="
              height: 150px;
              background-size: cover;
              background-position: center;
            "
            :style="{ backgroundImage: `url(${item.imageUrl})` }"
          ></div>
          <div class="card-body">
            <span class="badge badge-secondary float-right ml-2">{{
              item.category
            }}</span>
            <h5 class="card-title">
              <a href="#" class="text-dark">{{ item.title }}</a>
            </h5>
            <p class="card-text">{{ item.content }}</p>
            <div class="d-flex justify-content-between align-items-baseline">
              <div class="h5" v-if="!item.price">
                {{ item.origin_price }} 元
              </div>
              <del class="h6" v-if="item.price"
                >原價 {{ item.origin_price }} 元</del
              >
              <div class="h5" v-if="item.price">
                現在只要 {{ item.price }} 元
              </div>
            </div>
          </div>
          <div class="card-footer d-flex">
            <button
              type="button"
              class="btn btn-outline-secondary btn-sm"
              @click="getProduct(item.id)"
            >
              <i
                class="fas fa-spinner fa-spin"
                v-if="status.loadingviewMore === item.id"
              ></i>
              查看更多
            </button>
            <button
              type="button"
              class="btn btn-outline-danger btn-sm ml-auto"
              @click="addtoCart(item.id)"
            >
              <i
                class="fas fa-spinner fa-spin"
                v-if="status.loadingShoppingItem === item.id"
              ></i>
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- MODAL -->
    <div
      class="modal fade"
      id="productModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="productModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="productModalLabel">
              {{ product.title }}
            </h5>
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
            <img
              :src="product.imageUrl"
              class="img-fluid"
              :alt="product.title"
            />
            <blockquote class="blockquote mt-3">
              <p class="mb-0">{{ product.content }}</p>
              <footer class="blockquote-footer text-right">
                {{ product.description }}
              </footer>
            </blockquote>
            <div class="d-flex justify-content-between align-items-baseline">
              <div class="h4" v-if="!product.price">
                {{ product.origin_price }} 元
              </div>
              <del class="h6" v-if="product.price"
                >原價 {{ product.price }} 元</del
              >
              <div class="h4" v-if="product.price">
                現在只要 {{ product.price }} 元
              </div>
            </div>
            <select class="form-control mt-3" v-model="product.num">
              <option :value="num" v-for="num in 10" :key="num">
                選購 {{ num }} {{ product.unit }}
              </option>
            </select>
          </div>
          <div class="modal-footer">
            <div class="text-muted text-nowrap mr-3">
              小計
              <strong>{{ product.price * product.num }}</strong> 元
            </div>
            <button
              type="button"
              class="btn btn-primary"
              @click.prevent="addtoCart(product.id, product.num)"
            >
              <i
                class="fas fa-spinner fa-spin"
                v-if="status.loadingShoppingItem === product.id"
              ></i>
              <i class="fas fa-shopping-cart"></i>
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- 分頁bar -->
    <pagination @runPage="getProducts" />

    <hr class="my-5" />
    <!-- 購物清單列表 -->
    <h1 class="text-center">購物清單</h1>
    <div class="row justify-content-center mt-4">
      <div class="col-auto">
        <h2 class="text-info text-center my-5" v-if="isCartData">無任何商品</h2>
        <div class="my-5" v-else>
          <table class="table table-responsive">
            <thead>
              <th></th>
              <th width="250">品名</th>
              <th>數量</th>
              <th class="text-right" width="100">單價</th>
            </thead>
            <tbody v-if="cart.carts">
              <tr v-for="item in cart.carts" :key="item.id">
                <td>
                  <button
                    type="button"
                    class="btn btn-outline-danger btn-sm"
                    @click="removeCartItem(item.id)"
                  >
                    <i class="fas fa-trash-alt"></i>
                  </button>
                </td>
                <td>
                  {{ item.product.title }}
                  <div class="text-success" v-if="item.coupon">
                    已套用優惠券
                  </div>
                </td>
                <td>{{ item.qty }}/{{ item.product.unit }}</td>
                <td class="text-right">{{ item.final_total }}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colspan="3" class="text-right">總計</td>
                <td class="text-right">{{ cart.total }}</td>
              </tr>
              <tr v-if="cart.total !== cart.final_total">
                <td class="text-success text-right">折扣價</td>
                <td class="text-success text-right">{{ cart.final_total }}</td>
              </tr>
            </tfoot>
          </table>
          <div class="input-group mb-3 input-group-sm">
            <input
              type="text"
              placeholder="請輸入優惠碼"
              class="form-control"
              v-model="coupon_code"
            />
            <div class="input-group-append">
              <button
                type="button"
                class="btn btn-outline-secondary"
                @click="addCouponCode()"
              >
                套用優惠碼
              </button>
            </div>
          </div>
          <div>
            <p class="text-danger" v-if="is_invalid_coupon_code">
              此優惠券無效
            </p>
          </div>
        </div>
      </div>
    </div>

    <hr class="my-5" />
    <!-- 購物車表單 -->
    <h1 class="text-center">購物車表單</h1>
    <div class="my-5 row justify-content-center">
      <validation-observer class="col-md-6" v-slot="{ invalid }">
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
              <span class="invalid-feedback">{{ errors[0] }}</span>
            </div>
          </validation-provider>

          <validation-provider rules="required" v-slot="{ errors, classes }">
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
              <span class="invalid-feedback">{{ errors[0] }}</span>
            </div>
          </validation-provider>

          <validation-provider rules="required" v-slot="{ errors, classes }">
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
              <span class="invalid-feedback">{{ errors[0] }}</span>
            </div>
          </validation-provider>

          <validation-provider rules="required" v-slot="{ errors, classes }">
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
              <span class="invalid-feedback">{{ errors[0] }}</span>
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
            <button class="btn btn-danger" :disabled="invalid">送出訂單</button>
          </div>
        </form>
      </validation-observer>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import pagination from "../Pagination";
import Alert from "../AlertMessage";

export default {
  components: {
    pagination,
    Alert,
  },
  data() {
    return {
      products: [],
      product: {},
      cart: [],
      isCartData: true,
      status: {
        loadingShoppingItem: "",
        loadingviewMore: "",
      },
      isLoading: false,
      coupon_code: "",
      is_invalid_coupon_code: false,
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
    getProducts(page = 1) {
      const vm = this;
      const url = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/products?page=${page}`;
      vm.isLoading = true;
      vm.$http.get(url).then((response) => {
        vm.products = response.data.products;
        vm.isLoading = false;

        //分頁處理
        vm.$bus.$emit("page:change", response.data.pagination);
      });
    },
    getProduct(id = "") {
      const vm = this;
      const url = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/product/${id}`;
      vm.status.loadingviewMore = id;
      vm.$http.get(url).then((response) => {
        vm.product = response.data.product;
        $("#productModal").modal("show");
        vm.status.loadingviewMore = "";
      });
    },
    addtoCart(id, qty = 1) {
      const vm = this;
      const url = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/cart`;
      vm.status.loadingShoppingItem = id;
      const cart = {
        product_id: id,
        qty,
      };
      vm.$http.post(url, { data: cart }).then((response) => {
        vm.status.loadingShoppingItem = "";
        vm.getCart();
        $("#productModal").modal("hide");
      });
    },
    getCart() {
      const vm = this;
      const url = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/cart`;
      vm.isLoading = true;

      vm.$http.get(url).then((response) => {
        vm.cart = response.data.data;
        vm.isLoading = false;

        if (response.data.data.carts.length == 0) {
          vm.isCartData = true;
        } else {
          vm.isCartData = false;
        }
      });
    },
    removeCartItem(id = "") {
      const vm = this;
      const url = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/cart/${id}`;
      vm.isLoading = true;

      vm.$http.delete(url).then((response) => {
        vm.getCart();
        vm.isLoading = false;
      });
    },
    addCouponCode() {
      const vm = this;
      const url = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/coupon`;
      vm.isLoading = true;

      const coupon = {
        code: vm.coupon_code,
      };

      vm.$http.post(url, { data: coupon }).then((response) => {
        if (!response.data.success) {
          vm.is_invalid_coupon_code = true;
        } else {
          vm.is_invalid_coupon_code = false;
        }

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
          vm.$router.push(`/customer_checkout/${response.data.orderId}`);
        } else {
          vm.$bus.$emit("message:push", response.data.message, "danger");
        }

        vm.isLoading = false;
      });
    },
  },
  created() {
    this.getProducts();
    this.getCart();
  },
};
</script>