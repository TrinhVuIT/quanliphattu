<template>
  <v-app-bar style="background-color: #fff" prominent>
    <v-icon class="mx-3" color="orange" @click.stop="openComponent"
      >mdi-menu</v-icon
    >

    <v-toolbar-title
      ><v-img
        src="
        https://insight.lotusacademy.edu.vn/static/img/logo_new.png
        "
        alt="Hình ảnh"
        style="height: 120px; float: left; cursor: pointer"
        @click="goHome"
      ></v-img
    ></v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn
      variant="text"
      class="text-none ma-1"
      style="color: #333; padding: 0"
      rounded="xl"
      size="large"
      @click="showAcount"
    >
      <v-avatar size="35">
        <v-img alt="Avatar" src="./Update/default-avatar.png"></v-img>
      </v-avatar>
      <b style="padding: 5px; font-size: large">{{ taiKhoans.name }}</b>
    </v-btn>

    <v-btn
      class="ma-1"
      variant="text"
      icon="mdi mdi-monitor-share"
      size="small"
    ></v-btn>

    <v-btn
      class="ma-1"
      variant="text"
      icon="mdi mdi-message-text"
      size="small"
    ></v-btn>

    <v-menu>
      <template v-slot:activator="{ props }">
        <v-btn
          class="ma-1"
          variant="text"
          icon="mdi mdi-chevron-down"
          v-bind="props"
          size="small"
        ></v-btn>
      </template>
      <v-list>
        <v-list-item>
          <v-list-item-title class="hover pa-1" @click="showAcount">
            <v-avatar
              icon="mdi mdi-cog"
              style="background-color: rgb(223, 225, 229); margin-right: 10px"
            ></v-avatar>
            <span>Tài khoản của tôi</span>
          </v-list-item-title>
          <v-list-item-title class="hover pa-1" @click="logOut">
            <v-avatar
              icon="mdi mdi-logout"
              style="background-color: rgb(223, 225, 229); margin-right: 10px"
            ></v-avatar>
            <span>Đăng xuất</span>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
  <NavsBar v-if="isComponentOpen" />
</template>
<script>
import { mergeProps } from "vue";
import NavsBar from "@/components/Admin/NavsBar.vue";

export default {
  name: "HeaderAdmin",
  data() {
    return {
      taiKhoans: { name: "Admin" },
      isComponentOpen: true,
    };
  },
  methods: {
    mergeProps,
    logOut() {
      this.$router.push({ path: "/account/login" });
    },
    showAcount() {
      this.$router.push({ path: "/thongtinphattu" });
    },
    goHome() {
      this.$router.push({ path: "/" });
    },
    openComponent() {
      this.isComponentOpen = !this.isComponentOpen;
    },
  },
  components: { NavsBar },
};
</script>

<style lang="css" scoped>
.v-btn {
  color: rgb(255, 81, 38);
  background-color: rgb(245, 245, 245);
}
.hover:hover {
  background-color: #eee;
  cursor: pointer;
}
</style>
