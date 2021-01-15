<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <Alert />
    <div class="container mb-5">
      <h1 class="text-center CommodityArea" id="CommodityArea">
        <i class="fas fa-fire text-warning"></i>
        <i>熱銷商品</i>
      </h1>

      <div class="row">
        <div
          class="card border-0 col-lg-4 col-md-6 mb-4"
          v-for="item in commodity"
          :key="item.id"
          :class="{
            'd-none':
              (item.category !== category_str) | (item.is_enabled !== 1),
            'd-block':
              ((category_str === '優惠專區') &
                (item.origin_price !== item.price))
              | (category_str === 'home'),
          }"
        >
          <div class="card-header border p-0">
            <span class="product-label" v-if="item.origin_price === item.price"
              >熱銷中</span
            >
            <span class="product-label" v-else>特惠商品</span>
            <div
              class="card-img-top img-cover"
              :style="{ backgroundImage: `url(${item.imageUrl})` }"
            >
              <div
                class="hover-more d-flex justify-content-center h-100 align-items-center"
              >
                <i
                  class="fas fa-heart add-favorite text-white mr-5"
                  title="加入收藏"
                  v-if="item.favorite !== 1"
                  @click="addFavorite(item)"
                ></i>
                <i
                  class="fas fa-heart cancel-favorite text-danger mr-5"
                  title="取消收藏"
                  v-else
                  @click="cancelFavorite(item.id)"
                ></i>
                <i
                  class="fas fa-cart-plus text-white mr-5"
                  title="加入購物車"
                  @click="addtoCart(item.id)"
                ></i>
                <i
                  class="fas fa-search text-white"
                  title="查看詳細商品資訊"
                  @click="commodity_detail(item.id)"
                ></i>
              </div>
            </div>
          </div>

          <div class="card-body">
            <span class="badge badge-secondary float-right">{{
              item.category
            }}</span>
            <h4 class="card-title">{{ item.title }}</h4>
            <p class="card-text">{{ item.content }}</p>

            <div
              class="d-flex align-items-baseline"
              :class="{
                'justify-content-end': item.origin_price == item.price,
                'justify-content-between': item.origin_price != item.price,
              }"
            >
              <del
                class="h6 text-secondary"
                v-if="item.origin_price != item.price"
                >{{ item.origin_price | currency }}</del
              >
              <div class="h5">{{ item.price | currency }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import Alert from "./AlertMessage";

export default {
  name: "commodity",
  components: {
    Alert,
  },
  data() {
    return {
      commodity: [],
      favorite: [],
      category_str: "home",
      isLoading: false,
    };
  },
  methods: {
    getFavorite() {
      const vm = this;
      let tempFavorite = [];
      tempFavorite = JSON.parse(localStorage.getItem("favorite")) || [];

      vm.favorite = tempFavorite;

      vm.commodity.forEach(function (value, index) {
        for (let i = 0; i < vm.favorite.length; i++) {
          if (vm.favorite[i].id === value.id) {
            vm.$set(vm.commodity[index], "favorite", 1); //強制寫入(雙向綁定)
            break;
          } else {
            vm.$set(vm.commodity[index], "favorite", 0); //強制寫入(雙向綁定)
          }
        }
      });
    },
    addFavorite(item) {
      const vm = this;

      vm.favorite.push(item);

      localStorage.setItem("favorite", JSON.stringify(vm.favorite));
      vm.$bus.$emit("message:push", "收藏成功", "success");
      $("#favorites_count").text(parseInt($("#favorites_count").text()) + 1); //將收藏的現有數量+1

      vm.$bus.$emit("ChangeFavorite");

      vm.getFavorite();
    },
    cancelFavorite(product_id) {
      const vm = this;

      //刪除對應的資料
      vm.favorite.forEach((item, index) => {
        if (vm.favorite[index].id === product_id) {
          vm.favorite.splice(index, 1);
        }
      });

      localStorage.setItem("favorite", JSON.stringify(vm.favorite)); //重新將覆蓋掉原本的
      vm.$bus.$emit("message:push", "取消收藏", "success");
      $("#favorites_count").text(parseInt($("#favorites_count").text()) - 1); //將收藏的現有數量-1

      vm.$bus.$emit("ChangeFavorite");
      vm.getFavorite();
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
        vm.isLoading = false;

        if (response.data.success) {
          vm.$bus.$emit("message:push", response.data.message, "success");
          $("#cart-count").text(parseInt($("#cart-count").text()) + 1); //將購物車的現有數量+1
          vm.$bus.$emit("ChangeCart");
        } else {
          vm.$bus.$emit("message:push", response.data.message, "danger");
        }
      });
    },
    commodity_detail(productsID) {
      this.$router.push(`/commodity_detail/${productsID}`);
    },
  },
  created() {
    const vm = this;

    vm.$bus.$on("data:commodity", function (commodity) {
      vm.commodity = commodity;
      vm.getFavorite();
    });

    if (vm.$route.params.categoryName !== undefined)
      vm.category_str = vm.$route.params.categoryName;
  },
  watch: {
    $route(to, from) {
      const vm = this;

      vm.path = vm.$router.currentRoute.path;
      vm.category_str = vm.$route.params.categoryName;
      vm.getFavorite();
    },
  },
};
</script>

<style lang="scss" scoped>
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

    .cancel-favorite {
      &:hover {
        color: rgb(223, 22, 163) !important;
      }
    }
  }

  .card-img-top {
    background-repeat: no-repeat !important;
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