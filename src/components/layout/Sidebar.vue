<template>
  <div>
    <nav class="col-md-2 d-none d-md-block bg-light sidebar">
      <div class="sidebar-sticky">
        <h6
          class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted"
        >
          <span>管理員</span>
          <a class="d-flex align-items-center text-muted" href="#">
            <span data-feather="plus-circle"></span>
          </a>
        </h6>
        <ul class="nav flex-column mb-2">
          <li class="nav-item">
            <router-link class="nav-link list-hover" to="/admin/products">
              <i class="fas fa-box-open"></i>
              <span class="link">產品列表</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link list-hover" to="/admin/orders">
              <i class="far fa-list-alt"></i>
              <span class="link">訂單列表</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link list-hover" to="/admin/coupon">
              <i class="fas fa-ticket-alt"></i>
              <span class="link">優惠劵</span>
            </router-link>
          </li>
        </ul>

        <h6
          class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted"
        >
          <span>模擬功能</span>
          <a class="d-flex align-items-center text-muted" href="#">
            <span data-feather="plus-circle"></span>
          </a>
        </h6>
        <ul class="nav flex-column mb-2">
          <li class="nav-item">
            <router-link class="nav-link list-hover" to="/customer_order">
              <i class="fas fa-shopping-cart"></i>
              <span class="link">模擬訂單</span>
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<style scoped lang="scss">
.list-hover:hover {
  .link {
    color: blue;
  }
}
</style>