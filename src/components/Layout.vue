<template>
  <div>
    <header>
      <Nabar />
    </header>

    <div class="container-fluid px-0">
      <main>
        <router-view></router-view>
      </main>
    </div>

    <div class="container-fluid px-0">
      <footer>
        <Footer />
      </footer>
    </div>

    <p class="h1 gotoTop">
      <a href="#top"><i class="fas fa-angle-up text-white"></i></a>
    </p>
  </div>
</template>

<script>
import Nabar from "./layout/front/Nabar";
import Footer from "./layout/front/Footer";

export default {
  components: {
    Nabar,
    Footer,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped lang="scss">
.gotoTop {
  border-radius: 50%;
  padding: 0 12px;
  position: fixed;
  right: 30px;
  bottom: 60px;
  background: rgba(231, 23, 40, 0.8);
  transition: 0.3s;
  cursor: pointer;
  z-index: 1;

  &:hover {
    background: rgba(231, 23, 40, 0.3);
  }
}
</style>