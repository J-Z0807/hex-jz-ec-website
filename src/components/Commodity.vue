<template>
  <div>
    <div class="container mb-5">
      <h1 class="text-center CommodityArea" id="CommodityArea">
        <i class="fas fa-fire text-warning"></i>
        <i>熱銷商品</i>
      </h1>

      <div class="row">
        <div
          class="card border-0 col-4 mb-4"
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
                <i class="fas fa-heart text-white mr-5" title="加入收藏"></i>
                <i
                  class="fas fa-cart-plus text-white mr-5"
                  title="加入購物車"
                ></i>
                <i
                  class="fas fa-search text-white"
                  title="查看詳細商品資訊"
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
export default {
  name: "commodity",
  data() {
    return {
      commodity: {},
      category_str: "",
    };
  },
  methods: {
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
    const vm = this;
    vm.$bus.$on("data:commodity", function (commodity) {
      vm.commodity = commodity;
    });
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