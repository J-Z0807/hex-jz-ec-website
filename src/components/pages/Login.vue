<template>
  <div>
    <form class="form-signin" @submit.prevent="signin">
      <h1 class="h3 mb-3 font-weight-normal">
        <i class="fas fa-cog mr-2"></i>
        後台登入
      </h1>
      <label for="inputEmail" class="sr-only">Email address</label>
      <input
        type="email"
        id="inputEmail"
        class="form-control"
        placeholder="Email address"
        v-model="user.username"
        required
        autofocus
      />
      <label for="inputPassword" class="sr-only">Password</label>
      <input
        type="password"
        id="inputPassword"
        class="form-control"
        placeholder="Password"
        v-model="user.password"
        required
      />
      <div class="checkbox mb-3">
        <label>
          <input type="checkbox" id="remember_Account" /> Remember me
        </label>
      </div>
      <button
        class="btn btn-lg btn-primary btn-block"
        type="submit"
        @keydown.enter="signin"
      >
        Sign in
      </button>
      <Alert />
      <p class="mt-5 mb-3 text-muted">&copy; 2021 優質汽車網</p>
    </form>
  </div>
</template>

<script>
import Alert from "../AlertMessage";

export default {
  name: "login",
  components: {
    Alert,
  },
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
      isRemember: false,
    };
  },
  methods: {
    //登入
    signin() {
      const api = `${process.env.API_PATH}/admin/signin`;
      const vm = this;
      vm.isRemember = document.querySelector("#remember_Account").checked; //是否記住帳號

      vm.$http.post(api, vm.user).then((response) => {
        if (response.data.success) {
          const token = response.data.token;
          const expired = response.data.expired;
          document.cookie = `hexToken=${token};expires=${new Date(expired)};`;
          vm.$router.push("/admin/products");

          //記住帳號處理
          if (vm.isRemember) {
            localStorage.setItem("Account", vm.user.username);
          } else {
            localStorage.removeItem("Account");
          }
        } else {
          console.log(response.data.message);
          vm.$bus.$emit("message:push", response.data.message, "danger");
        }
      });
    },
  },
  mounted() {
    //掛載到Vue的實體上了，若有帳號資料就傳入input裡並且記住帳號的checkbox打勾
    if (localStorage.getItem("Account") != null) {
      this.user.username = localStorage.getItem("Account");
      document.querySelector("#remember_Account").checked = true;
    }
  },
};
</script>

<style scoped>
html,
body {
  height: 100%;
}

body {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

.message-alert {
  position: fixed;
  max-width: 50%;
  top: 10px;
  right: 0px;
  z-index: 1100;
}
</style>