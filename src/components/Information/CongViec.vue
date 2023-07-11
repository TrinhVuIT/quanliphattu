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
    <p class="mb-3 px-3" style="font-size: 24px">Nhóm việc của tôi</p>
    <v-card>
      <div class="d-flex justify-space-between text-center pa-6">
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn
              class="text-none"
              v-bind="props"
              append-icon="mdi mdi-menu-down"
              style="color: rgb(104, 85, 85)"
              variant="outlined"
              rounded="xl"
              size="large"
            >
              Hiển thị 1 - {{ itemsPerPage }} of {{ itemsPerPage }}
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
        <v-card-text style="display: flex; max-width: 200px; padding: 0">
          <v-text-field
            variant="solo"
            placeholder="Tìm kiếm"
            append-inner-icon="mdi-magnify"
            density="compact"
            hide-details
            @click:append-inner="onClick"
          ></v-text-field>
        </v-card-text>
      </div>
    </v-card>
  </div>
</template>
<script>
export default {
  name: "CongViec",
  methods: {
    updateItemsPerPage(number) {
      this.itemsPerPage = number;
    },
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
          title: "Công việc",
          disabled: true,
          href: "/congviec",
        },
      ],
      itemsPerPage: 2,
      itemsPerPageArray: [2, 3, 4, 5, 6, 7],
    };
  },
};
</script>
<style lang="css" scoped>
.container {
  padding: 20px 21px 0 21px;
  margin-left: auto;
  margin-right: auto;
}
</style>
