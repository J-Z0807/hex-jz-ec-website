<template>
  <div>
    <nav class="navbar navbar-expand-md navbar-light fixed-top bg-white">
      <div class="container">
        <a class="" href="#"
          ><img src="../../../assets/logo.png" alt="LOGO" width="200"
        /></a>
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
            <li class="nav-item active">
              <a class="nav-link" href="#">首頁</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">衣服</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">褲子</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">鞋子</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">飾品</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">優惠專區</a>
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
                  <span class="cart-number">3</span>
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
  methods: {},
};
</script>

<style scoped lang="scss">
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

.nav-link {
  color: black !important;
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