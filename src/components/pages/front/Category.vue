<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="product_detail content">
      <div class="container-fluid bannerimg category_banner">
        <h1 class="text-white category-title text-center py-4">
          好東西都在Quality Store
        </h1>
        <nav aria-label="breadcrumb" class="breadmark w-50 m-auto">
          <ul class="breadcrumb">
            <li class="breadcrumb-item">
              <router-link to="../home">
                <span class="link">首頁</span>
              </router-link>
            </li>
            <li aria-current="page" class="breadcrumb-item active">
              {{ this.$route.params.categoryName }}
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <Commodity />
  </div>
</template>

<script>
import Commodity from "../../Commodity";

export default {
  name: "login",
  components: {
    Commodity,
  },
  data() {
    return {
      isLoading: false,
    };
  },
  methods: {
    getProducts() {
      const vm = this;
      const url = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/products/all`;
      vm.isLoading = true;
      vm.$http.get(url).then((response) => {
        //商品處理
        vm.$bus.$emit("data:commodity", response.data.products);
        vm.isLoading = false;
      });
    },
  },
  created() {
    this.getProducts();
  },
  watch: {
    $route(to, from) {
      this.path = this.$router.currentRoute.path;
    },
  },
};
</script>

<style scoped lang="scss">
.category-title {
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
  margin-top: 60px;
}

.breadcrumb .breadcrumb-item {
  color: #000;
  font-size: 1.1rem;
  a {
    text-decoration: none;
  }
}

.img-cover {
  background-repeat: no-repeat !important;
  background-size: cover !important;
  background-position: center center !important;

  height: 95vh;
}

.CommodityArea {
  padding-top: 70px;
  padding-bottom: 50px;
}

.product-label {
  background-color: rgb(241, 12, 192);
  position: absolute;
  color: white;
  font-weight: bold;
  padding: 5px;
  left: 30px;
  top: 10px;
  border-radius: 5px;
}

.card {
  cursor: pointer;

  .card-body {
    border: 1px solid lightgray;
    border-top: 0;
  }

  .hover-more {
    font-size: 26px;
    visibility: hidden;

    i {
      &:hover {
        font-size: 30px;
        color: lightblue !important;
      }
    }
  }

  .card-img-top {
    background-size: contain !important;
    background-position: center !important;
    height: 300px;
    transition: 0.5s;
  }

  &:hover {
    .card-img-top {
      //加上半透明黑色遮罩
      background-color: rgba(0, 0, 0, 0.3) !important;
      background-blend-mode: multiply !important;
    }

    .hover-more {
      visibility: visible;
    }
  }
}
</style>
