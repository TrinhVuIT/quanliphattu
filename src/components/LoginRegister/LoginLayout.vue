<template>
  <div>
    <v-img
      class="mx-auto my-6"
      max-width="100"
      src="../../assets/logo.svg"
    ></v-img>

    <v-card
      class="mx-auto pa-12 pb-8"
      elevation="8"
      max-width="548"
      rounded="lg"
    >
      <v-form ref="form" @submit.prevent="login">
        <div class="text-subtitle-1 text-medium-emphasis">Tài khoản</div>

        <v-text-field
          v-model="email"
          :rules="[rulesEmail.required]"
          density="compact"
          placeholder="Email"
          prepend-inner-icon="mdi-email-outline"
          variant="outlined"
        ></v-text-field>

        <div
          class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"
        >
          Mật khẩu

          <a
            class="text-caption text-decoration-none text-blue"
            href="#"
            rel="noopener noreferrer"
            target="_blank"
          >
            Quên mật khẩu?</a
          >
        </div>

        <v-text-field
          v-model="password"
          :rules="[rulesMatKhau.required, rulesMatKhau.errSaiThongTin]"
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          density="compact"
          placeholder="Mật khẩu"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          @click:append-inner="visible = !visible"
        ></v-text-field>

        <v-btn
          type="submit"
          block
          class="mb-8 text-h6"
          color="blue"
          size="large"
          variant="tonal"
        >
          Đăng nhập
        </v-btn>

        <v-card-text class="text-center text-h6">
          <p>
            Chưa có tài khoản ?
            <router-link class="router-link" to="/account/register">
              Đăng kí
            </router-link>
          </p>
        </v-card-text>
      </v-form>
    </v-card>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "LoginLayout",
  data: () => ({
    visible: false,
    email: "",
    password: "",
    rulesEmail: {
      required: (value) => !!value || "Nhập email.",
    },
    rulesMatKhau: {
      required: (value) => !!value || "Nhập mật khẩu.",
      errSaiThongTin: () => {
        if (this.err) {
          return "Sai email hoặc mật khẩu.";
        }
        return true;
      },
    },
  }),
  methods: {
    async login() {
      try {
        const valid = await this.$refs.form.validate();
        if (valid.valid) {
          this.postLogin();
        }
      } catch (error) {
        console.error(error);
      }
      this.err = false;
    },
    postLogin() {
      const fetchData = async () => {
        try {
          const response = await axios.post(
            "http://192.168.1.105:8080/api/login",
            {
              email: this.email,
              matKhau: this.matKhau,
            }
          );
          if (response.status === 200) {
            console.log(response);
            localStorage.setItem("token", response.data.token);
            this.$store.dispatch("user", response.data.phatTu);
            console.log(localStorage.getItem("token"));
            this.$router.push("/home");
          }
        } catch (error) {
          console.log(error.response);
          if (error.response.data) {
            this.err = true;
          }
          //gọi lại hàm để báo lỗi
          this.login();
        }
      };
      fetchData();
    },
  },
};
</script>
<style lang="css" scoped>
.router-link {
  text-decoration: none;
  color: #04a6e1;
}
</style>
