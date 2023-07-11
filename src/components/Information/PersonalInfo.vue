<template>
  <div class="container">
    <v-breadcrumbs
      :items="pageHeaders"
      style="padding: 0; color: #648084"
      class="px-2"
    >
      <template v-slot:divider>
        <v-icon icon="mdi-chevron-right"></v-icon>
      </template>
    </v-breadcrumbs>
    <p class="mb-3 px-3" style="font-size: 24px">Cập nhật thông tin cá nhân</p>
    <v-card class="v-card_text px-5">
      <div class="pa-2">
        <div>
          <v-list-item prepend-icon="mdi mdi-account-cog" style="padding: 0">
            <b>Thông tin tài khoản</b>
          </v-list-item>
        </div>
        <div class="d-flex mb-3 pt-2">
          <v-avatar color="grey" size="140" rounded="0" class="rounded-lg mr-5">
            <v-img cover src="../Information/img/default-avatar1.png"></v-img>
          </v-avatar>

          <input
            type="file"
            accept="image/*"
            id="upload-input"
            style="display: none"
          />
          <v-btn
            variant="text"
            class="bg-success text-none align-self-end"
            style="height: 39px"
            @click="upLoadFile"
            >Thay đổi ảnh</v-btn
          >
        </div>
      </div>

      <v-row class="mb-3 pa-2">
        <v-col sm="6" v-for="taikhoan in taiKhoans" :key="taikhoan">
          <v-list>{{ taikhoan }}</v-list>
          <v-text-field
            :label="taikhoan"
            variant="outlined"
            density="compact"
            clearable
            required
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row class="mb-3 pa-2">
        <v-col sm="6">
          <v-list-item
            prepend-icon="mdi mdi-account-circle"
            style="padding: 0; margin-bottom: 20px"
          >
            <b>Thông tin cá nhân</b>
          </v-list-item>
          <v-row>
            <v-list class="px-3">Ngày sinh</v-list>
            <v-col sm="12">
              <v-text-field
                label="Ngày sinh"
                type="date"
                variant="outlined"
                density="compact"
                clearable
                required
              ></v-text-field>
            </v-col>
            <v-list class="px-3">Trường CĐ/ĐH</v-list>
            <v-col sm="12">
              <v-select
                label="Trường CĐ/ĐH"
                :items="[
                  'Học Viện An Ninh Nhân Dân',
                  'Đại Học An Ninh Nhân Dân',
                  'Đại Học Bách Khoa Hà Nội',
                  'Học Viện Biên Phòng',
                  'Học Viện Công Nghệ Bưu Chính Viễn Thông ( Phía Bắc )',
                  'Đại Học Công Nghiệp Dệt May Hà Nội',
                  'Học Viện Cảnh Sát Nhân Dân',
                  'Đại Học Công Nghiệp Hà Nội',
                  'Đại Học FPT',
                  'Đại Học Điện Lực',
                  'Đại Học Dược Hà Nội',
                  'Đại học Tài Nguyên và Môi Trường Hà Nội',
                ]"
                variant="outlined"
                density="compact"
              ></v-select>
            </v-col>
            <v-list class="px-3">Khoa (Ngành)</v-list>
            <v-col sm="12">
              <v-text-field
                label="Khoa (Ngành)"
                variant="outlined"
                density="compact"
                clearable
                required
              ></v-text-field>
            </v-col>
            <v-list class="px-3">Năm thứ</v-list>
            <v-col sm="12">
              <v-select
                label="Năm thứ"
                :items="['1', '2', '3', '4', '5']"
                variant="outlined"
                density="compact"
              ></v-select>
            </v-col>
          </v-row>
        </v-col>
        <v-col sm="6">
          <v-list-item
            prepend-icon="mdi mdi-map-marker-multiple"
            style="padding: 0; margin-bottom: 20px"
          >
            <b>Địa chỉ</b>
          </v-list-item>
          <v-row>
            <v-col sm="12" v-for="info in diaChis" :key="info">
              <v-list>{{ info.title }}</v-list>
              <v-select
                :label="info.title"
                :items="info.items"
                variant="outlined"
                density="compact"
              ></v-select>
            </v-col>
            <v-list class="px-3">Số nhà</v-list>
            <v-col sm="12">
              <v-text-field
                label="Số nhà"
                variant="outlined"
                density="compact"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <v-row>
        <v-col sm="4">
          <v-list class="px-2" style="padding-bottom: 0">
            <b>Biết đến học viện qua :</b>
          </v-list>
          <div class="d-flex flex-row">
            <v-checkbox
              label="Facbook"
              color="red"
              value="red"
              hide-details
            ></v-checkbox>
            <v-checkbox
              label="Website"
              color="red"
              value="red"
              hide-details
            ></v-checkbox>
            <v-checkbox
              label="Người giới thiệu"
              color="red"
              value="red"
              hide-details
            ></v-checkbox>
          </div>
        </v-col>
      </v-row>

      <v-list-item
        class="px-2"
        style="margin: 15px 0"
        prepend-icon="mdi mdi-share-variant"
      >
        <b>Mạng xã hội</b>
      </v-list-item>
      <v-row class="px-2">
        <v-col sm="4" v-for="item in mangXaHois" :key="item">
          <v-list>{{ item.title }}</v-list>
          <v-text-field
            :prepend-inner-icon="item.icon"
            variant="outlined"
            density="compact"
            clearable
            required
          ></v-text-field>
        </v-col>
      </v-row>
    </v-card>
    <v-card class="mt-5 pa-5">
      <b>Thời gian đi học (Tối thiểu 4 ca/tuần):</b>
      <v-table class="mt-5">
        <tr class="pa-2">
          <th>Buổi</th>
          <th v-for="item in tables" :key="item">{{ item }}</th>
        </tr>
        <tr>
          <td>Sáng</td>
          <td v-for="item in tables" :key="item">
            <v-checkbox color="red" value="red" hide-details></v-checkbox>
          </td>
        </tr>
        <tr>
          <td>Chiều</td>
          <td v-for="item in tables" :key="item">
            <v-checkbox color="red" value="red" hide-details></v-checkbox>
          </td>
        </tr>
        <tr>
          <td>Tối</td>
          <td v-for="item in tables" :key="item">
            <v-checkbox color="red" value="red" hide-details></v-checkbox>
          </td>
        </tr>
      </v-table>
    </v-card>
    <div class="d-flex justify-center">
      <v-btn
        class="text-none mt-5 bg-primary"
        style="text-align: center"
        @click="showSuccessNotification"
      >
        Lưu thay đổi
      </v-btn>
    </div>
  </div>
</template>
<script>
import Swal from "sweetalert2";
export default {
  name: "PersonalInfo",
  methods: {
    showSuccessNotification() {
      Swal.fire({
        icon: "success",
        title: "Đã lưu thành công!",
        showConfirmButton: false,
        timer: 2000, // Auto close the notification after 2 seconds (you can customize this value)
      });
    },
    upLoadFile() {
      return document.getElementById("upload-input").click();
    },
  },
  data() {
    return {
      tables: [
        "Thứ 2",
        "Thứ 3",
        "Thứ 4",
        "Thứ 5",
        "Thứ 6",
        "Thứ 7",
        "Chủ nhật",
      ],
      pageHeaders: [
        {
          title: "Home",
          disabled: false,
          href: "#/",
        },
        {
          title: "Thông tin cá nhân",
          disabled: true,
          href: "/thongtincanhan",
        },
      ],
      taiKhoans: ["Tên đăng nhập", "Email", "Họ tên", "Số điện thoại"],
      diaChis: [
        {
          title: "Tỉnh thành",
          items: [
            "Hà Nội",
            "Hà Giang",
            "Cao Bằng",
            "Bắc Cạn",
            "Tuyên Quang",
            "Lào Cai",
            "Điện Biên",
            "Lai Châu",
            "Sơn La",
            "Yên Bái",
            "Hòa Bình",
            "Thái Nguyên",
            "Lạng Sơn",
            "Quảng Ninh",
            "Bắc Giang",
            "Phú Thọ",
            "Vĩnh Phúc",
            "Bắc Ninh",
            "Hải Dương",
            "Hải Phòng",
            "Hưng Yên",
            "Thái Bình",
            "Hà Nam",
            "Nam Định",
            "Ninh Bình",
            "Thanh Hóa",
            "Nghệ An",
            "Hà Tĩnh",
            "Quảng Bình",
            "Quảng Trị",
            "Thừa Thiên Huế",
            "Đà Nẵng",
            "Quảng Nam",
            "Quảng Ngãi",
            "Bình Định",
            "Phú Yên",
            "Khánh Hòa",
            "Ninh Thuận",
            "Bình Thuận",
            "Kon Tum",
            "Gia Lai",
            "Đăk Lăk",
            "Đăk Nông",
            "Lâm Đồng",
            "Bình Phước",
            "Tây Ninh",
            "Bình Dương",
            "Đồng Nai",
            "Bà Rịa - Vũng Tàu",
            "Hồ Chí Minh",
            "Long An",
            "Tiền Giang",
            "Bến Tre",
            "Trà Vinh",
            "Vĩnh Long",
            "Đồng Tháp",
            "An Giang",
            "Kiên Giang",
            "Cần Thơ",
            "Hậu Giang",
            "Sóc Trăng",
            "Bạc Liêu",
            "Cà Mau",
          ],
        },
        { title: "Quận huyện", items: [] },
        { title: "Xã phường", items: [] },
      ],
      mangXaHois: [
        { title: "Facebook", icon: "mdi mdi-facebook" },
        { title: "Skype", icon: "mdi mdi-skype" },
        { title: "Zalo", icon: "mdi mdi-share-variant" },
      ],
    };
  },
};
</script>
<style lang="css" scoped>
.container {
  padding: 20px 21px 0 21px;
}
.v-col {
  padding-top: 0;
  padding-bottom: 0;
}
.v-list {
  padding-top: 0;
}
tr td {
  text-align: center;
}
tr td .v-checkbox {
  display: flex;
  justify-content: center;
}
</style>
