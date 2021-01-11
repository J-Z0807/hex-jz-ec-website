<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <Alert />

    <div class="container-fluid bannerimg">
      <h1 class="text-white title text-center">好東西都在Quality Store</h1>
      <nav aria-label="breadcrumb" class="breadmark w-50 m-auto">
        <ul class="breadcrumb">
          <li class="breadcrumb-item">
            <router-link to="../home">
              <span class="link">首頁</span>
            </router-link>
          </li>
          <li class="breadcrumb-item">
            <a href="#" @click.prevent="goCategory()">
              <span class="link">{{ product.category }}</span>
            </a>
          </li>
          <li aria-current="page" class="breadcrumb-item active">
            {{ product.title }}
          </li>
        </ul>
      </nav>
    </div>

    <div class="container my-5">
      <div class="row">
        <div class="col-6">
          <div
            class="commodity_img img-cover ml-auto"
            :style="{ backgroundImage: `url(${product.imageUrl})` }"
          ></div>
        </div>

        <div class="col-6">
          <ul class="product_area">
            <li class="mt-4 mb-2">
              <h3>
                <b>{{ product.title }}</b>
              </h3>
            </li>
            <li class="mb-4">
              <h4 class="text-danger">{{ product.price | currency }} 元</h4>
            </li>

            <li class="mb-4">
              <div class="btn-group amount_area">
                <button
                  type="button"
                  class="btn btn-secondary"
                  @click.prevent="
                    product.num > 1 ? product.num-- : (product.num = 1)
                  "
                >
                  <i aria-hidden="true" class="fa fa-minus"></i>
                </button>
                <input
                  type="number"
                  max="10"
                  min="1"
                  class="amount"
                  v-model="product.num"
                  readonly
                />
                <button
                  type="button"
                  class="btn btn-secondary"
                  @click.prevent="
                    product.num < 10 ? product.num++ : (product.num = 10)
                  "
                >
                  <i aria-hidden="true" class="fa fa-plus"></i>
                </button>
              </div>
            </li>

            <li class="mb-5">
              <div class="text-muted text-nowrap mr-3">
                小計
                <strong>{{ product.price * product.num }}</strong> 元
              </div>
              <button
                type="button"
                class="btn btn-outline-primary"
                @click.prevent="addtoCart(product.id, product.num)"
              >
                <i
                  class="fas fa-spinner fa-spin"
                  v-if="status.loadingShoppingItem === product.id"
                ></i>
                <i class="fas fa-shopping-cart"></i>加入購物車
              </button>
            </li>
            <li>
              <p class="description">
                {{ product.description }}
              </p>
            </li>
            <li>
              <p class="content">
                {{ product.content }}
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import Alert from "../../AlertMessage";

export default {
  name: "commodity_detail",
  components: {
    Alert,
  },
  data() {
    return {
      product: {
        price: 0,
        num: 0,
      },
      isLoading: false,
      status: {
        loadingShoppingItem: "",
      },
    };
  },
  methods: {
    getProduct() {
      const vm = this;
      let id = vm.$route.path;
      vm.isLoading = true;

      id = id.substr(id.lastIndexOf("/") + 1);

      const url = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/product/${id}`;

      vm.$http.get(url).then((response) => {
        vm.product = response.data.product;
        vm.$set(vm.product, "num", 1); //強制寫入 (雙向綁定)

        vm.isLoading = false;
      });
    },
    goCategory() {
      this.$router.push(`../category/${this.product.category}`);
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

        if (response.data.success) {
          vm.$bus.$emit("message:push", response.data.message, "success");
          $("#cart-count").text(parseInt($("#cart-count").text()) + 1); //將購物車的現有數量+1

          vm.$bus.$emit("ChangeCart");
        } else {
          vm.$bus.$emit("message:push", response.data.message, "danger");
        }
      });
    },
  },
  created() {
    this.getProduct();
  },
};
</script>

<style lang="scss" scoped>
.title {
  font-size: 72px;
  font-family: cursive;
  position: absolute;
  white-space: nowrap;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.breadmark {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, -50%);
}

.bannerimg {
  height: 400px;
  background-image: url("https://images.unsplash.com/photo-1468276311594-df7cb65d8df6?ixid=MXwxMjA3fDB8MHxzZWFyY2h8OXx8c2t5fGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1024&q=60");
  background-size: cover;
  background-position: center;
  position: relative;
  margin-top: 70px;
}

.breadcrumb .breadcrumb-item {
  color: #000;
  font-size: 1.1rem;
  a {
    text-decoration: none;
  }
}

.img-cover {
  background-position: center !important;
  background-repeat: no-repeat !important;
  background-size: contain !important;
}

.commodity_img {
  width: 400px;
  height: 400px;
  border: 10px solid transparent;
  border-width: 10px;
  border-image: linear-gradient(
    to right,
    rgb(113, 78, 176) 0%,
    rgb(249, 145, 189) 100%
  );
  border-image-slice: 1;
}

.product_area {
  list-style: none;
}

.amount_area {
  .btn {
    background-color: white;
    color: black;

    &:hover {
      background-color: gray;
      color: white;
    }
  }
  .amount {
    text-align: center;
    font-weight: bold;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  input[type="number"] {
    -moz-appearance: textfield;
  }
}

.description,
.content {
  font-size: 1rem;
  font-weight: 550;
}
</style>