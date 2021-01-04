<template>
  <div>
    <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
      <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#">Quality Car</a>
      <input
        class="form-control form-control-dark w-100"
        type="text"
        placeholder="Search"
        aria-label="Search"
        @input="search($event)"
      />
      <ul class="navbar-nav px-3">
        <li class="nav-item text-nowrap">
          <a class="nav-link" href="#" @click.prevent="signout">Sign out</a>
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
      msg: "Welcome to Dashboard",
    };
  },
  methods: {
    //登出
    signout() {
      const api = `${process.env.API_PATH}/logout`;
      const vm = this;

      vm.$http.post(api).then((response) => {
        if (response.data.success) {
          vm.$router.push("/login");
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