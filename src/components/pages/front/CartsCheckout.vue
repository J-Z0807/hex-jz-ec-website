<template>
  <div>
    <div class="product_detail content">
      <div class="container-fluid bannerimg">
        <!-- 訂單進度 -->
        <div class="scheduleStep">
          <div class="row no-gutters justify-content-between">
            <div class="col-4 px-0">
              <h3 class="text-white">確認訂單</h3>
            </div>
            <div class="col-4 px-0 text-center">
              <h3 class="text-white">填寫資料</h3>
            </div>
            <div class="col-4 px-0 text-right">
              <h3 class="text-white">完成訂單</h3>
            </div>

            <div class="col-12 text-center my-3">
              <span class="h5">1 / 3</span>
            </div>
          </div>

          <div class="progress px-0">
            <div
              class="step progress-bar bg-success progress-bar-striped progress-bar-animated"
            ></div>
          </div>
        </div>
      </div>
    </div>
    <Cart />
  </div>
</template>

<script>
import Cart from "../../Cart";

export default {
  name: "login",
  components: {
    Cart,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped lang="scss">
.bannerimg {
  height: 200px;
  background-image: url("https://images.unsplash.com/photo-1468276311594-df7cb65d8df6?ixid=MXwxMjA3fDB8MHxzZWFyY2h8OXx8c2t5fGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1024&q=60");
  background-size: cover;
  background-position: center;
  margin-top: 70px;
  background-color: rgba(0, 0, 0, 0.1) !important;
  background-blend-mode: multiply !important;
}

.scheduleStep {
  position: absolute;
  width: 80%;
  justify-content: center;
  align-items: center;
  top: 15%;
  left: 50%;
  transform: translateX(-50%);
}

// 進度條 分成 10% 50% 100%
.step {
  -moz-transform: scaleX(-1);
  -webkit-transform: scaleX(-1);
  -o-transform: scaleX(-1);
  transform: scaleX(-1);

  width: 10%;
}
</style>
