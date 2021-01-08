<template>
  <div>
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
              <a class="nav-link" href="#">
                <i class="fas fa-heart"></i>
                收藏區
              </a>
            </li>

            <li class="nav-item align-self-center">
              <a class="nav-link d-flex" href="#">
                <div>
                  <i class="fas fa-shopping-cart"></i>
                  <span class="cart-number" v-if="carts != 0">{{ carts }}</span>
                </div>
              </a>
            </li>

            <li class="nav-item">
              <a class="nav-link" href="#">
                <div class="btn-group">
                  <button
                    type="button"
                    class="btn btn-info dropdown-toggle"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Language
                  </button>
                  <div class="dropdown-menu">
                    <a class="dropdown-item" href="/tw">中文</a>
                    <a class="dropdown-item" href="/en">English</a>
                  </div>
                </div>
              </a>
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
      carts: "",
      category_str: "",
    };
  },
  methods: {
    getCart() {
      const vm = this;
      const url = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/cart`;

      vm.$http.get(url).then((response) => {
        vm.carts = response.data.data.carts.length;
      });
    },
    getCommodityType() {
      const vm = this;
      //取得類型
      vm.category_str = vm.$route.path;
      vm.category_str = decodeURI(
        vm.category_str.substr(vm.category_str.lastIndexOf("/") + 1)
      );
    },
  },
  created() {
    this.getCart();
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

.cart-number {
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
</style>