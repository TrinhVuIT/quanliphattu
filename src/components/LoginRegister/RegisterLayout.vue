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
      max-width="768"
      rounded="lg"
    >
      <v-form ref="form" @submit.prevent="onSubmit">
        <div class="form-body d-flex justify-space-between">
          <div class="form-left" style="width: 52%">
            <div class="d-flex justify-space-between">
              <!-- họ -->
              <v-text-field
                variant="outlined"
                v-model="phatTu.ho"
                label="Họ"
                class="mr-1"
                :rules="[rulesHo.required]"
              ></v-text-field>
              <!-- tên đệm -->
              <v-text-field
                variant="outlined"
                v-model="phatTu.tenDem"
                label="Tên Đệm"
                class="mr-1"
                :rules="[rulesTenDem.required]"
              ></v-text-field>
              <!-- tên -->
              <v-text-field
                variant="outlined"
                v-model="phatTu.ten"
                label="Tên"
                :rules="[rulesTen.required]"
              ></v-text-field>
            </div>
            <!-- Pháp danh -->
            <v-text-field
              class="mt-3"
              variant="outlined"
              v-model="phatTu.phapDanh"
              label="Pháp Danh"
            ></v-text-field>
            <!-- ngày sinh -->
            <v-text-field
              class="mt-3"
              type="date"
              variant="outlined"
              v-model="phatTu.ngaySinh"
              label="Ngày sinh"
            ></v-text-field>
            <!-- chọn chùa -->
            <v-autocomplete
              variant="outlined"
              v-model="phatTu.chua"
              :items="chuas"
              label="Chọn chùa"
              solo-inverted
              clearable
              hide-details
              item-title="tenChua"
              item-value="id"
              placeholder="Search"
              return-object
              class="mt-3"
            ></v-autocomplete>
            <!-- Giới tính -->
            <div class="d-flex align-center mt-3">
              <div class="pb-5">Giới tính:</div>
              <v-radio-group v-model="phatTu.gioiTinh" inline class="mt-3 mb-3">
                <v-radio label="Nam" value="1"></v-radio>
                <v-radio label="Nữ" value="2"></v-radio>
              </v-radio-group>
            </div>
          </div>
          <div class="form-right" style="width: 44%">
            <!-- số điện thoại -->
            <v-text-field
              variant="outlined"
              ref="inputSdt"
              v-model="phatTu.soDienThoai"
              label="Số điện thoại"
              :rules="[
                rulesPhone.required,
                rulesPhone.phone,
                rulesPhone.trungSoDienThoai,
              ]"
            ></v-text-field>
            <!-- email -->
            <v-text-field
              ref="inputEmail"
              class="mt-3"
              variant="outlined"
              v-model="phatTu.email"
              label="Email"
              :rules="[
                rulesEmail.required,
                rulesEmail.email,
                rulesEmail.trungEmail,
              ]"
            ></v-text-field>
            <!-- mật khẩu -->
            <v-text-field
              class="mt-3"
              :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
              :type="visible ? 'text' : 'password'"
              @click:append-inner="visible = !visible"
              variant="outlined"
              v-model="phatTu.matKhau"
              label="Mật khẩu"
              :rules="[rulesMatKhau.required, rulesMatKhau.matKhau]"
            ></v-text-field>
            <!-- nhập lại mật khẩu -->
            <v-text-field
              class="mt-3"
              :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
              :type="visible ? 'text' : 'password'"
              @click:append-inner="visible = !visible"
              variant="outlined"
              v-model="nhapLaiMatKhau"
              label="Nhập lại mật khẩu"
              :rules="[
                rulesMatKhau.required,
                rulesMatKhau.matKhau,
                rulesNhapLaiMatKhau.soSanhMatKhau,
              ]"
            ></v-text-field>
          </div>
        </div>

        <v-btn
          type="submit"
          block
          class="mb-8 text-h6"
          color="blue"
          size="large"
          variant="tonal"
        >
          Đăng kí
        </v-btn>

        <v-card-text class="text-center text-h6">
          <p>
            Đã có tài khoản ?
            <router-link class="router-link" to="/account/login">
              Đăng nhập
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
  name: "RegisterLayout",
  data: () => ({
    visible: false,
    phatTu: {
      ho: "",
      tenDem: "",
      ten: "",
      phapDanh: null,
      ngaySinh: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .slice(0, 10),
      gioiTinh: "1",
      chua: null,
      soDienThoai: "",
      email: "",
      matKhau: "",
    },
    nhapLaiMatKhau: "",
    checkTrungEmail: null,
    checkTrungSoDienThoai: null,
    chuas: [],
    rulesHo: {
      required: (value) => !!value || "Nhập họ.",
    },
    rulesTenDem: {
      required: (value) => !!value || "Nhập tên đệm.",
    },
    rulesTen: {
      required: (value) => !!value || "Nhập tên.",
    },
    rulesEmail: {
      required: (value) => !!value || "Nhập email.",
      email: (value) => {
        const pattern =
          /^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Sai định dạng e-mail.";
      },
      trungEmail: (value) => {
        if (this.checkTrungEmail != null) {
          return value != this.checkTrungEmail || "email đã được sử dụng.";
        }
        return true;
      },
    },
    rulesPhone: {
      required: (value) => !!value || "Nhập số điện thoại.",
      phone: (value) => {
        const pattern = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
        return pattern.test(value) || "Số điện thoại không đúng.";
      },
      trungSoDienThoai: (value) => {
        if (this.checkTrungSoDienThoai != null) {
          return (
            value != this.checkTrungSoDienThoai ||
            "Số điện thoại đã được sử dụng."
          );
        }
        return true;
      },
    },
    rulesMatKhau: {
      required: (value) => !!value || "Nhập mật khẩu.",
      matKhau: (value) => {
        const pattern =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_])[A-Za-z\d@$!%*?&_]{8,}$/;
        return (
          pattern.test(value) ||
          "Mật khẩu tối thiểu 8 ký tự có chứa cả chữ hoa, chữ thường và ký tự đặc biệt."
        );
      },
    },
    rulesNhapLaiMatKhau: {
      soSanhMatKhau: (value) => {
        return (
          value === this.phatTu.matKhau ||
          "Không trùng khớp với mật khẩu đã nhập."
        );
      },
    },
  }),
  methods: {
    async onSubmit() {
      try {
        const valid = await this.$refs.form.validate();
        if (valid.valid) {
          this.postTaiKhoan();
        }
      } catch (error) {
        console.error(error);
      }
    },
    getChuas() {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            "http://192.168.1.23:8081/api/chuas"
          );
          if (response.status === 200) {
            this.chuas = response.data;
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    },
    postTaiKhoan() {
      const fetchData = async () => {
        try {
          const response = await axios.post(
            "http://192.168.1.23:8081/api/auth/signup",
            this.phatTu
          );
          if (response.status === 200) {
            this.$router.push("/account/login");
          }
        } catch (error) {
          console.log(error.response);
          this.checkTrungEmail = error.response.data.emailTonTai;
          this.checkTrungSoDienThoai = error.response.data.soDienThoaiTonTai;
          //gọi lại hàm để báo lỗi
          this.signup();
        }
      };
      fetchData();
    },
  },
  created() {
    this.getChuas();
  },
};
</script>
<style lang="css" scoped>
.router-link {
  margin-left: 10px;
  text-decoration: none;
  color: #04a6e1;
}
</style>
