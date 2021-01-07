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

    <div class="container mb-5">
      <h1 class="text-center CommodityArea" id="CommodityArea">
        <i class="fas fa-fire text-warning"></i>
        <i>熱銷商品</i>
      </h1>

      <div class="row">
        <div class="card col-3 px-0">
          <div class="card-header p-0">
            <span class="product-label">熱銷中</span>
            <div
              class="card-img-top img-cover"
              style="
                background: url('https://www.17sucai.com/preview/1750622/2019-08-06/rapidshop/img/product/2.jpg');
              "
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
            <span class="badge badge-secondary float-right">上衣</span>
            <h4 class="card-title">華麗上衣</h4>
            <p class="card-text">這是一件很棒的上衣</p>

            <div class="d-flex justify-content-between align-items-baseline">
              <del class="h6 text-secondary">$2,300</del>
              <div class="h5">$1,600</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Alert from "../../AlertMessage";

export default {
  name: "login",
  components: {
    Alert,
  },
  data() {
    return {};
  },
  methods: {},
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

.CommodityArea {
  padding-top: 70px;
  padding-bottom: 50px;
}

.product-label {
  background-color: rgb(241, 12, 192);
  position: absolute;
  color: white;
  font-weight: bold;
  padding: 10px;
  left: 10px;
  top: 10px;
  border-radius: 5px;
}

.card {
  cursor: pointer;

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
    background-position: top center !important;
    height: 280px;
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
