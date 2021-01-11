<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
      <span class="navbar-brand col-sm-3 col-md-2 mr-0 user-select-none"
        >Quality Store</span
      >
      <input
        class="form-control form-control-dark w-100"
        type="text"
        placeholder="Search"
        aria-label="Search"
        @input="search($event)"
        v-if="this.$route.meta.isSearchBar"
      />
      <ul class="navbar-nav px-3">
        <li class="nav-item text-nowrap">
          <a class="nav-link text-white" href="#" @click.prevent="signout"
            >登出</a
          >
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import $ from "jquery";

export default {
  name: "Nabar",
  data() {
    return {
      isLoading: false,
    };
  },
  methods: {
    //登出
    signout() {
      const api = `${process.env.API_PATH}/logout`;
      const vm = this;
      vm.isLoading = true;

      vm.$http.post(api).then((response) => {
        vm.isLoading = false;
        if (response.data.success) {
          vm.$router.push("/admin/login");
        }
      });
    },
    search(e) {
      let searchValue = event.currentTarget.value.toLowerCase();

      $("#Table_data tr").filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(searchValue) > -1);
      });
    },
  },
};
</script>

<style scoped lang="scss">
a:hover {
  color: darken(white, 30%) !important;
}
</style>