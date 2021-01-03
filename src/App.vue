<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld";

export default {
  name: "App",
  components: {
    HelloWorld,
  },
  // created() {
  //   const api = `${process.env.API_PATH}/api/${process.env.CUSTOM_PATH}/products`;

  //   this.$http.get(api).then((response) => {
  //     console.log(response.data);
  //   });
  // },
};
</script>

<style lang="scss">
@import "./assets/all";
</style>
