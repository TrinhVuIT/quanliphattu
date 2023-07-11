<template>
  <div class="container">
    <v-card class="pa-5">
      <h2>LỊCH SỬ ĐIỂM DANH CÁ NHÂN</h2>
      <v-row>
        <v-col sm="3">
          <v-list>Trạng thái</v-list>
          <v-select
            label="Trạng thái"
            :items="['Đến đúng/Sớm', 'Đến trễ', 'Nghỉ']"
            variant="outlined"
            density="compact"
          ></v-select>
        </v-col>
        <v-col sm="3">
          <v-list>Từ ngày</v-list>
          <v-text-field
            type="date"
            variant="outlined"
            density="compact"
            clearable
            required
          ></v-text-field>
        </v-col>
        <v-col sm="3">
          <v-list>Đến ngày</v-list>
          <v-text-field
            type="date"
            variant="outlined"
            density="compact"
            clearable
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <div>
        <v-data-table
          v-model:items-per-page="itemsPerPage"
          :headers="headers"
          :items="desserts"
          item-value="name"
          class="elevation-1"
        ></v-data-table>
      </div>
    </v-card>
  </div>
</template>
<script>
export default {
  name: "DiemDanh",
  data() {
    return {
      itemsPerPage: 2,
      headers: [
        { title: "Ngày", align: "center", key: "ngay", sortable: true },
        { title: "Ca-giờ", align: "center", key: "caGio" },
        { title: "Trạng thái", align: "center", key: "trangThai" },
      ],
      desserts: [
        { ngay: "22/09/1995", caGio: "Sáng 8h30", trangThai: "Muộn 1 giờ" },
      ],
    };
  },
};
</script>
<style lang="css" scoped>
.container {
  padding: 20px 21px 0 21px;
}
</style>
