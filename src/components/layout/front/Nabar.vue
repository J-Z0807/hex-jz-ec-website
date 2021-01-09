<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <nav class="navbar navbar-expand-md navbar-light fixed-top bg-white">
      <div class="container">
        <router-link to="../home">
          <img src="../../../assets/logo.png" alt="LOGO" width="200"
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
          <ul class="navbar-nav m-auto h5 flex-wrap">
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

          <ul class="navbar-nav h5 flex-wrap">
            <li class="nav-item align-self-center">
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
                      class="favorites_count"
                      id="favorites_count"
                      v-if="favorites_count != 0"
                      >{{ favorites_count }}</span
                    >
                  </div>
                </a>

                <div
                  class="dropdown-menu dropdown-menu-right px-2"
                  aria-labelledby="dropdownFavoritesMenu"
                >
                  <div>
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
                            v-for="item in catrs"
                            :key="item.id"
                          >
                            <th class="align-middle cart-product-name">
                              {{ item.product.title }}
                            </th>
                            <td class="text-center align-middle text-nowrap">
                              {{ item.qty }} / {{ item.product.unit }}
                            </td>
                            <td class="text-right align-middle text-nowrap">
                              {{ item.product.price | currency }}
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
                      to="/cart"
                    >
                      查看我的購物車
                    </router-link>
                  </div>
                </div>
              </div>
            </li>

            <li class="nav-item align-self-center">
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
                      class="cart-count"
                      id="cart-count"
                      v-if="carts_count != 0"
                      >{{ carts_count }}</span
                    >
                  </div>
                </a>

                <div
                  class="dropdown-menu dropdown-menu-right px-2"
                  aria-labelledby="dropdownCartMenu"
                >
                  <div>
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
                            v-for="item in catrs"
                            :key="item.id"
                          >
                            <th class="align-middle cart-product-name">
                              {{ item.product.title }}
                            </th>
                            <td class="text-center align-middle text-nowrap">
                              {{ item.qty }} / {{ item.product.unit }}
                            </td>
                            <td class="text-right align-middle text-nowrap">
                              {{ item.product.price | currency }}
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
                      to="/cart"
                    >
                      查看我的購物車
                    </router-link>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Nabar",
  data() {
    return {
      carts_count: "",
      favorites_count: "",
      category_str: "",
      catrs: {},
      isLoading: false,
    };
  },
  methods: {
    getCart() {
      const vm = this;
      const url = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/cart`;

      vm.$http.get(url).then((response) => {
        vm.catrs = response.data.data.carts;
        console.log(vm.catrs);
        vm.carts_count = response.data.data.carts.length;
      });
    },
    getFavorite() {
      const vm = this;
      let tempFavorite = [];
      tempFavorite = JSON.parse(localStorage.getItem("favorite")) || [];

      vm.favorites_count = tempFavorite.length;
    },
    getCommodityType() {
      const vm = this;
      //取得類型
      vm.category_str = vm.$route.path;
      vm.category_str = decodeURI(
        vm.category_str.substr(vm.category_str.lastIndexOf("/") + 1)
      );
    },
    removeCartItem(id = "") {
      console.log(id);
      const vm = this;
      const url = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/cart/${id}`;
      vm.isLoading = true;

      vm.$http.delete(url).then((response) => {
        vm.getCart();
        vm.isLoading = false;
      });
    },
  },
  created() {
    this.getCart();
    this.getFavorite();
    this.getCommodityType();
  },
  watch: {
    $route(to, from) {
      this.path = this.$router.currentRoute.path;
      this.getCommodityType();
    },
  },
};
</script>

<style scoped lang="scss">
.active {
  color: blue !important;
}

li {
  margin-right: 10px;
}

.favorites_count,
.cart-count {
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

.cart-product-name {
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 125px;
  overflow: hidden;
}
</style>