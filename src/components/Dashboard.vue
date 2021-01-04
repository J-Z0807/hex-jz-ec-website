<template>
  <div>
    <Nabar />
    <Alert />
    <div class="container-fluid">
      <div class="row">
        <Sidebar />
        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
          <router-view></router-view>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import Nabar from "./layout/Nabar";
import Sidebar from "./layout/Sidebar";
import Alert from "./AlertMessage";

export default {
  components: {
    Sidebar,
    Nabar,
    Alert,
  },
  created() {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );

    this.$http.defaults.headers.common.Authorization = `${token}`;
  },
};
</script>