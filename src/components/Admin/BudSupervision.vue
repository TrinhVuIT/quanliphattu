<template>
  <div class="container">
    <div class="page-header">
      <v-breadcrumbs
        :items="pageHeaders"
        style="padding: 0; color: #648084"
        class="px-2"
      >
        <template v-slot:divider>
          <v-icon icon="mdi-chevron-right"></v-icon>
        </template>
      </v-breadcrumbs>
    </div>
    <h1 style="padding-left: 12px">Danh sách các phật tử</h1>
    <v-card class="pa-4">
      <div class="d-flex justify-space-between">
        <p>Tìm kiếm phật tử</p>
        <v-icon>mdi-chevron-up</v-icon>
      </div>
      <v-row>
        <v-col sm="3" v-for="item in searchs" :key="item">
          <v-list>{{ item.title }}</v-list>
          <v-select
            :label="item.title"
            :items="item.iteams"
            variant="outlined"
            density="compact"
          ></v-select>
        </v-col>
      </v-row>
    </v-card>
    <v-card class="mt-6 pa-4">
      <div class="d-flex justify-space-between text-center">
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn
              class="text-none"
              v-bind="props"
              append-icon="mdi mdi-menu-down"
              style="color: grey"
              variant="outlined"
              rounded="xl"
              size="large"
            >
              Hiển thị 1 - {{ itemsPerPage }} of {{ desserts.length }}
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(number, index) in itemsPerPageArray"
              :key="index"
            >
              <v-list-item-title @click="updateItemsPerPage(number)">
                {{ number }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-card-text style="display: flex; max-width: 400px; padding: 0">
          <v-text-field
            variant="outlined"
            placeholder="Tìm kiếm"
            prepend-inner-icon="mdi-magnify"
            density="compact"
            v-model="search"
            hide-details
            @click:append-inner="onClick"
          ></v-text-field>
          <v-menu>
            <template v-slot:activator="{ props }">
              <v-btn
                class="text-none"
                v-bind="props"
                append-icon="mdi mdi-menu-down"
                style="color: orange; padding: 5px"
                variant="text"
                size="large"
              >
                Sắp xếp
              </v-btn>
            </template>
            <v-list>
              <v-list-item v-for="(item, index) in arranges" :key="index">
                <v-list-item-title>{{ item }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-card-text>
      </div>
      <div class="table">
        <v-data-table
          v-model:items-per-page="itemsPerPage"
          :headers="headers"
          :items="displayedData"
          :search="search"
          item-value="name"
          class="mt-6 data-table"
        >
          <template v-slot:top>
            <v-dialog v-model="dialog" max-width="900px">
              <v-card width="900">
                <v-card-title class="bg-info">
                  <span class="text-h5">Thông tin người dùng</span>
                </v-card-title>
                <v-card-text>
                  <div class="avatar">
                    <v-avatar size="130">
                      <v-img src="./Update/default-avatar.png"></v-img>
                    </v-avatar>
                    <p style="margin: 5px">Ảnh đại diện người dùng</p>
                    <div class="up-file">
                      <input
                        type="file"
                        accept="image/*"
                        id="upload-input"
                        style="display: none"
                      />
                      <v-btn
                        variant="text"
                        class="bg-info text-none"
                        style="height: 39px"
                        @click="upLoadFile"
                        >Thay đổi ảnh</v-btn
                      >
                    </div>
                  </div>
                  <v-row class="mt-6">
                    <v-col sm="4">
                      <v-text-field
                        label="Pháp Danh"
                        v-model="editedItem.phapDanh"
                        variant="outlined"
                        density="compact"
                        clearable
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col sm="4">
                      <v-text-field
                        v-model="editedItem.ngaySinh"
                        label="Ngày sinh"
                        type="date"
                        variant="outlined"
                        density="compact"
                        clearable
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col sm="4">
                      <v-text-field
                        label="Số điện thoại"
                        v-model="editedItem.soDienThoai"
                        variant="outlined"
                        density="compact"
                        clearable
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col sm="4">
                      <v-text-field
                        label="Tên tài khoản"
                        v-model="editedItem.email"
                        variant="outlined"
                        density="compact"
                        clearable
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col sm="4">
                      <v-text-field
                        label="Email"
                        v-model="editedItem.email"
                        variant="outlined"
                        placeholder="johndoe@gmail.com"
                        density="compact"
                        clearable
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col sm="4">
                      <v-text-field
                        v-model="editedItem.ngayXuatGia"
                        label="Ngày xuất gia"
                        type="date"
                        variant="outlined"
                        density="compact"
                        clearable
                        required
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12">
                      <v-textarea
                        label="Địa chỉ hiện tại"
                        variant="outlined"
                      ></v-textarea>
                    </v-col>

                    <v-col sm="4">
                      <v-select
                        id="city"
                        label="Tỉnh/Thành phố"
                        :items="resultTinhThanh"
                        variant="outlined"
                        density="compact"
                      ></v-select>
                    </v-col>
                    <v-col sm="4">
                      <v-select
                        id="district"
                        label="Quận/Huyện"
                        :items="resultQuanHuyen"
                        variant="outlined"
                        density="compact"
                      ></v-select>
                    </v-col>
                    <v-col sm="4">
                      <v-select
                        id="ward"
                        label="Xã/Phường"
                        :items="resultXaPhuong"
                        variant="outlined"
                        density="compact"
                      ></v-select>
                    </v-col>

                    <v-col sm="4">
                      <v-select
                        label="Giới tính"
                        :items="['Nam', 'Nữ', 'Khác']"
                        variant="outlined"
                        density="compact"
                      ></v-select>
                    </v-col>
                    <v-col sm="4">
                      <v-select
                        label="Công việc hiện tại"
                        :items="[
                          'Nhân viên',
                          'Giám đốc',
                          'Công nhân',
                          'Nhà báo',
                          'Tài xế',
                          'Tự do',
                        ]"
                        variant="outlined"
                        density="compact"
                      ></v-select>
                    </v-col>
                    <v-col sm="4">
                      <v-select
                        label="Thành viên"
                        :items="['Admin', 'CTV', 'Support', 'Intern', 'Senier']"
                        variant="outlined"
                        density="compact"
                      ></v-select>
                    </v-col>
                  </v-row>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn variant="text" @click="close"> Thoát </v-btn>
                  <v-btn variant="text" @click="save"> Cập nhật </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </template>
          <template v-slot:[`item.phapDanh`]="{ item }">
            <div class="d-flex align-center ml-4">
              <div class="avatar-border pa-2">
                <v-tooltip text="Hiển thị thông tin">
                  <template v-slot:activator="{ props }">
                    <v-avatar
                      size="42"
                      style="cursor: pointer"
                      v-bind="props"
                      @click="editItem(item.raw)"
                    >
                      <v-img src="./Update/default-avatar.png"></v-img>
                    </v-avatar>
                  </template>
                </v-tooltip>
              </div>
              <div class="d-flex align-start flex-column pa-3">
                <b
                  style="
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                  "
                  >{{ item.columns.phapDanh }}</b
                >
                <p class="">
                  {{ item.raw.email }}
                </p>
              </div>
            </div>
          </template>
          <template v-slot:[`item.thongtin`]="{ item }">
            <v-btn
              @click="editItem(item.raw)"
              prepend-icon="mdi-pencil"
              style="background-color: red"
            >
              Sửa
            </v-btn>
          </template>
          <template v-slot:[`item.soBuoiThamGiaDaoTrang`]="{ item }">
            {{ item.raw.phatTuDaoTrangListpt.length }}
          </template>
        </v-data-table>
      </div>
    </v-card>
  </div>
</template>
<script>
// import Auth from "@/api/AuthAPI/Auth";
import Data from "@/entties/response";

export default {
  name: "BudSupervision",
  methods: {
    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
    },
    updateItemsPerPage(number) {
      if (number === "Tất cả") {
        this.itemsPerPage = this.desserts.length;
      } else {
        this.itemsPerPage = number;
      }
    },
    handleInfo() {
      this.dialog = true;
    },
    upLoadFile() {
      return document.getElementById("upload-input").click();
    },
    // async getData(){
    //   const data = await Auth.getPhatTu();
    //   this.desserts = data.contents;
    // },
  },
  computed: {
    displayedData() {
      const end = this.itemsPerPage;
      return this.desserts.slice(0, end);
    },
  },
  created() {
    // this.getData();
    this.desserts = Data;
  },
  data() {
    return {
      pageHeaders: [
        {
          title: "Home",
          disabled: false,
          href: "#/",
        },
        {
          title: "Giám sát phật tử",
          disabled: true,
          href: "/admin/giamsatphattu",
        },
      ],
      arranges: [
        "Theo tên",
        "Theo ngày xuất gia",
        "Theo số buổi đạo tràng",
        "Theo id",
      ],
      searchs: [
        {
          title: "Pháp danh",
          iteams: ["Tất cả", "Khác"],
          text: "Chọn pháp danh",
        },
        {
          title: "Giới tính",
          iteams: ["Tất cả", "Nam", "Nữ"],
          text: "Chọn giới tính",
        },
        {
          title: "Trạng thái phật tử",
          iteams: ["Tất cả", "Khác"],
          text: "Chọn trạng thái",
        },
      ],
      search: "",
      itemsPerPage: 6,
      currentPage: 1,
      itemsPerPageArray: [4, 6, 8, 10, 12, "Tất cả"],
      desserts: [],
      options: [],
      headers: [
        {
          title: "STT",
          align: "center",
          key: "id",
          sortable: false,
        },
        { title: "Phật tử", align: "center", key: "phapDanh" },
        {
          title: "Ngày xuất gia",
          align: "center",
          key: "ngayXuatGia",
        },
        { title: "Số điện thoại", align: "center", key: "soDienThoai" },
        {
          title: "Số buổi đạo tràng đã tham gia",
          align: "center",
          key: "soBuoiThamGiaDaoTrang",
        },
        { title: "Thông tin", align: "center", key: "thongtin" },
      ],
      dialog: false,
      editedItem: {
        phapDanh: "",
        ngayXuatGia: "",
        soDienThoai: "",
        soBuoiThamGiaDaoTrang: 0,
      },
    };
  },
};
</script>
<style lang="css" scoped>
.container {
  padding: 20px 21px 0 21px;
}
.data-table :deep(th) {
  border-right: 1px solid silver;
}
.data-table :deep(td) {
  border-top: 1px solid silver;
  border-right: 1px solid silver;
  text-align: center;
}
.data-table :deep(.v-table__wrapper) {
  border: 1px solid silver;
  border-right: none;
}
</style>
