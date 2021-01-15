<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <nav class="navbar navbar-expand-md navbar-light fixed-top bg-white">
      <div class="container">
        <router-link to="../home">
          <img
            src="../../../assets/logo.png"
            class="LOGO"
            alt="LOGO"
            width="200"
        /></router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse">
          <ul class="navbar-nav m-auto h5 flex-wrap nabar_classification_area">
            <li class="nav-item">
              <router-link
                class="nav-link"
                to="/category/衣服"
                :class="{ active: category_str == '衣服' }"
              >
                <span class="link">衣服</span>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                class="nav-link"
                to="/category/褲子"
                :class="{ active: category_str == '褲子' }"
              >
                <span class="link">褲子</span>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                class="nav-link"
                to="/category/鞋子"
                :class="{ active: category_str == '鞋子' }"
              >
                <span class="link">鞋子</span>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                class="nav-link"
                to="/category/飾品"
                :class="{ active: category_str == '飾品' }"
              >
                <span class="link">飾品</span>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                class="nav-link"
                to="/category/優惠專區"
                :class="{ active: category_str == '優惠專區' }"
              >
                <span class="link">優惠專區</span>
              </router-link>
            </li>
          </ul>

          <ul class="navbar-nav h5 flex-wrap features_area">
            <li class="nav-item align-self-center" title="查看收藏">
              <div class="dropdown">
                <a
                  class="nav-link d-flex"
                  href="#"
                  id="dropdownFavoritesMenu"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <div>
                    <i class="fas fa-heart"></i>
                    <span
                      class="count"
                      id="favorites_count"
                      v-if="favorites.length != 0"
                      >{{ favorites.length }}</span
                    >
                  </div>
                </a>

                <div
                  class="dropdown-menu dropdown-menu-right px-2 favorites-dropdown-menu"
                  aria-labelledby="dropdownFavoritesMenu"
                >
                  <div>
                    <div
                      class="overflow-auto"
                      style="max-height: 320px"
                      v-if="favorites.length > 0"
                    >
                      <table
                        class="table table-borderless"
                        style="min-width: 300px"
                      >
                        <thead>
                          <th class="text-center">商品</th>
                          <th>名稱</th>
                          <th class="text-center">功能</th>
                        </thead>
                        <tbody class="favorite_area">
                          <tr
                            class="border-top"
                            v-for="item in favorites"
                            :key="item.id"
                          >
                            <th>
                              <img
                                :src="item.imageUrl"
                                alt="商品圖示"
                                class="img-fluid"
                                @click="commodity_detail(item.id)"
                              />
                            </th>
                            <td class="align-middle text-nowrap product-name">
                              {{ item.title }}
                            </td>
                            <td class="align-middle">
                              <div class="d-flex">
                                <button
                                  type="button"
                                  class="btn btn-outline-primary btn-sm mr-1"
                                  title="加入購物車"
                                  @click="addtoCart(item.id)"
                                >
                                  <i class="fas fa-shopping-cart"></i>
                                </button>
                                <button
                                  type="button"
                                  class="btn btn-outline-danger btn-sm"
                                  title="取消收藏"
                                  @click="cancelFavorite(item.id)"
                                >
                                  <i class="fas fa-heart"></i>
                                </button>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div style="min-width: 300px" v-else>
                      <p
                        class="text-center text-nowrap mb-0 py-5 h5 text-secondary"
                      >
                        <b>目前沒有任何收藏收品呦!</b>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </li>

            <li class="nav-item align-self-center" title="查看購物車">
              <div class="dropdown">
                <a
                  class="nav-link d-flex"
                  href="#"
                  id="dropdownCartMenu"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <div>
                    <i class="fas fa-shopping-cart"></i>
                    <span
                      class="count"
                      id="cart-count"
                      v-if="carts.length != 0"
                      >{{ carts.length }}</span
                    >
                  </div>
                </a>

                <div
                  class="dropdown-menu dropdown-menu-right px-2 cart-dropdown-menu"
                  aria-labelledby="dropdownCartMenu"
                >
                  <div v-if="carts.length > 0">
                    <div class="overflow-auto" style="max-height: 300px">
                      <table
                        class="table table-borderless"
                        style="min-width: 300px"
                      >
                        <thead>
                          <th>名稱</th>
                          <th width="50" class="text-center text-nowrap">
                            數量
                          </th>
                          <th class="text-right">金額</th>
                          <th width="80" class="text-center text-nowrap">
                            刪除
                          </th>
                        </thead>
                        <tbody>
                          <tr
                            class="border-top"
                            v-for="item in carts"
                            :key="item.id"
                          >
                            <th class="align-middle product-name">
                              {{ item.product.title }}
                            </th>
                            <td class="text-center align-middle text-nowrap">
                              {{ item.qty }} / {{ item.product.unit }}
                            </td>
                            <td class="text-right align-middle text-nowrap">
                              {{ item.total | currency }}
                            </td>
                            <td class="text-center">
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
                      </table>
                    </div>

                    <router-link
                      class="btn btn-primary w-100 text-light mt-2 btn-cart"
                      to="/carts_checkout"
                    >
                      查看我的購物車
                    </router-link>
                  </div>

                  <div style="min-width: 300px" v-else>
                    <p
                      class="text-center text-nowrap mb-0 py-5 h5 text-secondary"
                    >
                      <b>目前購物車空空如也!</b>
                    </p>
                  </div>
                </div>
              </div>
            </li>

            <li class="nav-item align-self-center" title="查看訂單">
              <router-link to="/order" class="text-decoration-none">
                <i class="far fa-list-alt text-dark nav-link"></i>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import $ from "jquery";

export default {
  name: "Nabar",
  data() {
    return {
      favorites: {},
      category_str: "",
      carts: {
        length: 0,
      },
      isLoading: false,
    };
  },
  methods: {
    getCart() {
      const vm = this;
      const url = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/cart`;

      vm.$http.get(url).then((response) => {
        vm.carts = response.data.data.carts;
        vm.isLoading = false;

        //購物車為空時隱藏數量區塊
        if (vm.carts.length === 0) {
          $("#cart-count").html("");
        }
      });
    },
    getFavorite() {
      const vm = this;
      let tempFavorite = [];
      tempFavorite = JSON.parse(localStorage.getItem("favorite")) || [];

      vm.favorites = tempFavorite;
    },
    cancelFavorite(product_id) {
      const vm = this;

      //刪除對應的資料
      vm.favorites.forEach((item, index) => {
        if (vm.favorites[index].id === product_id) {
          vm.favorites.splice(index, 1);
        }
      });

      localStorage.setItem("favorite", JSON.stringify(vm.favorites)); //重新將覆蓋掉原本的
      vm.$bus.$emit("message:push", "取消收藏", "success");
      $("#favorites_count").text(parseInt($("#favorites_count").text()) - 1); //將收藏的現有數量-1
    },
    addtoCart(id, qty = 1) {
      const vm = this;
      const url = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/cart`;
      vm.isLoading = true;
      const cart = {
        product_id: id,
        qty,
      };
      vm.$http.post(url, { data: cart }).then((response) => {
        if (response.data.success) {
          $("#cart-count").text(parseInt($("#cart-count").text()) + 1); //將購物車的現有數量+1
          vm.getCart();
          vm.$bus.$emit("message:push", response.data.message, "success");
          vm.$bus.$emit("ChangeCart");
        } else {
          vm.$bus.$emit("message:push", response.data.message, "danger");
        }
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
      });
    },
    commodity_detail(productsID) {
      this.$router.push(`/commodity_detail/${productsID}`);
    },
  },
  created() {
    const vm = this;
    vm.getCart();
    vm.getFavorite();
    vm.category_str = vm.$route.params.categoryName;

    vm.$bus.$on("ChangeFavorite", function () {
      vm.getFavorite();
    });

    vm.$bus.$on("ChangeCart", function () {
      vm.getCart();
    });
  },
  watch: {
    $route(to, from) {
      const vm = this;
      vm.path = vm.$router.currentRoute.path;
      vm.category_str = vm.$route.params.categoryName;
    },
  },
};
</script>

<style scoped lang="scss">
.active {
  color: blue !important;
  font-weight: bold;
}

li {
  margin-right: 10px;
}

.count {
  background-color: red;
  border-radius: 50%;
  color: white;
  font-size: 14px;
  padding: 0 5px;
  position: relative;
  right: 15px;
  top: -10px;
}

.navbar-light .navbar-nav .nav-link {
  color: black;
  transition: 0.3s;

  &:hover {
    color: darken(pink, 30%) !important;
  }
}

.active {
  a {
    color: blue !important;
    font-weight: bold;
  }
}

.product-name {
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 125px;
  overflow: hidden;
}

.favorite_area {
  img {
    cursor: pointer;
  }

  .product-name {
    min-width: 125px;
  }
}
</style>