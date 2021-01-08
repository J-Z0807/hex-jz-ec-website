<template>
  <div>
    <div
      id="carouselExampleIndicators"
      class="carousel slide"
      data-ride="carousel"
    >
      <ol class="carousel-indicators">
        <li
          data-target="#carouselExampleIndicators"
          data-slide-to="0"
          class="active"
        ></li>
        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
      </ol>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <div
            class="img-cover addMask"
            style="
              background: url('https://images.unsplash.com/photo-1483985988355-763728e1935b?ixid=MXwxMjA3fDB8MHxzZWFyY2h8M3x8c2hvcHBpbmd8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1024&q=60');
            "
          >
            <div class="carousel-caption">
              <p class="title">想買好的服飾</p>
              <p class="content">都在 Quality Store</p>
            </div>
          </div>
        </div>

        <div class="carousel-item">
          <div
            class="img-cover addMask"
            style="
              background: url('https://images.unsplash.com/photo-1511317559916-56d5ddb62563?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mzh8fHNob3BwaW5nfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1024&q=60');
            "
          >
            <div class="carousel-caption">
              <p class="title">想買好的飾品</p>
              <p class="content">都在 Quality Store</p>
            </div>
          </div>
        </div>
      </div>
      <a
        class="carousel-control-prev carousel-control"
        href="#carouselExampleIndicators"
        role="button"
        data-slide="prev"
      >
        <i class="fas fa-arrow-alt-circle-left"></i>
        <span class="sr-only">Previous</span>
      </a>
      <a
        class="carousel-control-next carousel-control"
        href="#carouselExampleIndicators"
        role="button"
        data-slide="next"
      >
        <i class="fas fa-arrow-alt-circle-right"></i>
        <span class="sr-only">Next</span>
      </a>

      <a href="#CommodityArea" class="goCommodityArea"
        ><i data-v-cbdf345e="" class="fas fa-angle-double-down"></i
      ></a>
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
      category_str: "",
    };
  },
  methods: {
    getProducts(page = 1) {
      const vm = this;
      const url = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/products?page=${page}`;

      vm.$http.get(url).then((response) => {
        //商品處理
        vm.$bus.$emit("data:commodity", response.data.products);
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
    this.getProducts();
    this.getCommodityType();
  },
};
</script>

<style scoped lang="scss">
.img-external {
  background-color: black;
  z-index: 2;
}

.img-cover {
  background-repeat: no-repeat !important;
  background-size: cover !important;
  background-position: center center !important;

  height: 95vh;
}

.addMask {
  //加上半透明黑色遮罩
  background-color: rgba(0, 0, 0, 0.3) !important;
  background-blend-mode: multiply !important;
}

.carousel-control {
  i {
    font-size: 58px;
    color: black;
    transition: 0.3s;
  }
  &:hover {
    i {
      color: darken(pink, 30%);
    }
  }
}

.carousel-caption {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .title {
    font-size: 4.5rem;
    font-weight: bold;
  }

  .content {
    font-size: 2.5rem;
  }
}

.goCommodityArea > i {
  position: absolute;
  top: 80vh;
  left: calc(50vw - 15px);
  color: #fff;
  font-size: 2.6rem;
  -webkit-animation: goCommodityicon 1.5s infinite;
  animation: goCommodityicon 1.5s infinite;
  box-sizing: border-box;
  z-index: 3;
}

@keyframes goCommodityicon {
  from {
    top: 76vh;
  }
  to {
    opacity: 0;
  }
}
</style>
