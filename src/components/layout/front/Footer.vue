<template>
  <div>
    <div class="bg-dark text-white">
      <div class="container h6 d-flex justify-content-between mb-0 p-3">
        <!-- left -->
        <div>
          <h4 class="mb-4 text-info">聯絡我們</h4>
          <p>
            <i class="fas fa-map-marker-alt mr-3"></i>高雄市XX區XX路XX里XX號
          </p>
          <p>
            <i class="fas fa-mobile-alt mr-3"></i
            ><a href="tel:0912345678">0912345678</a>
          </p>
          <p>
            <i class="fas fa-envelope mr-3"></i
            ><a href="mailto:test@test.com">test@test.com</a>
          </p>
        </div>

        <!-- center -->
        <div>
          <h4 class="mb-4 text-info">信息</h4>
          <p><a href="#">關於我們</a></p>
          <p><a href="#">配送信息</a></p>
          <p><a href="#">隱私政策</a></p>
          <p><a href="#">聯繫我們</a></p>
        </div>

        <!-- center -->
        <div>
          <h4 class="mb-4 text-info">好康</h4>
          <p><a href="#">限時促銷</a></p>
          <p><a href="#">優惠卷贈送</a></p>
        </div>

        <!-- right -->
        <div>
          <h4 class="mb-4 text-info">服務</h4>
          <p><a href="#">退貨</a></p>
          <p><a href="#">網站地圖</a></p>
          <p><a href="#">願望清單</a></p>
          <p><a href="#">歷史購買</a></p>
        </div>
      </div>
    </div>

    <div class="copyright-style py-3">
      <div class="container d-flex justify-content-between">
        <p>&copy; 2021 優質商店.</p>

        <div class="d-flex h4 align-self-center">
          <a href="#" class="mr-3"><i class="fab fa-facebook"></i></a>
          <a href="#" class="mr-3"><i class="fab fa-instagram"></i></a>
          <a href="#" class="mr-3"><i class="fab fa-line"></i></a>
          <a href="#" class="mr-3"><i class="fab fa-slack"></i></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer",
  methods: {},
};
</script>

<style scoped lang="scss">
i {
  width: 20px;
}

a {
  color: white;
  text-decoration: none;
  transition: 0.3s;

  &:hover {
    color: darken(pink, 30%);
  }
}

.copyright-style {
  background-color: black;
  color: white;
  font-size: 22px;
}
</style>