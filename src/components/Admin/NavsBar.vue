<template>
  <v-card>
    <v-navigation-drawer permanent>
      <v-list v-for="item in navs" :key="item">
        <v-list-group>
          <template v-slot:activator="{ props }">
            <v-list-item
              append-icon=""
              v-bind="props"
              :prepend-icon="item.icon"
              :title="item.title"
              :to="item.to"
            ></v-list-item>
          </template>
          <router-link
            :to="sub.to"
            style="text-decoration: none; color: black"
            v-for="sub in item.subnav"
            :key="sub"
          >
            <v-list-group
              :prepend-icon="sub.icon"
              :title="sub.title"
              style="overflow: hidden; width: 100%; padding-left: 40px"
            >
              <template v-slot:activator="{ props }">
                <v-list-item
                  append-icon=""
                  v-bind="props"
                  :prepend-icon="sub.icon"
                  :title="sub.title"
                ></v-list-item>
              </template>
            </v-list-group>
          </router-link>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>
<script>
export default {
  name: "NavsBar",
  data() {
    return {
      navs: [
        {
          icon: "mdi-home-circle",
          title: "Bảng tin",
          subnav: [],
          to: "/bangtin",
        },
        {
          icon: "mdi-account-circle",
          title: "Thông tin phật tử",
          subnav: [],
          to: "/thongtinphattu",
        },
        {
          icon: "mdi mdi-account",
          title: "Phật tử",
          subnav: [
            {
              icon: "mdi mdi-marker",
              title: "Điểm danh",
              to: "/phattu/diemdanh",
            },
            {
              icon: "mdi mdi-marker",
              title: "Khóa học của tôi",
              to: "/khoahoccuatoi",
            },
          ],
        },
        {
          icon: "mdi mdi-account-box",
          title: "Admin",
          subnav: [
            {
              icon: "mdi mdi-account",
              title: "Phật tử của tôi",
              to: "/admin/phattucuatoi",
            },
            {
              icon: "mdi mdi-account-multiple",
              title: "Giám sát phật tử",
              to: "/admin/giamsatphattu",
            },
          ],
        },
        {
          icon: "mdi mdi-format-list-text",
          title: "Test online",
          subnav: [
            {
              icon: "mdi mdi-marker",
              title: "Thư viện đề thi",
              to: "/admin/courses",
            },
          ],
        },
        {
          icon: "mdi mdi-calendar-multiple-check",
          title: "Công việc",
          subnav: [
            {
              icon: "",
              title: "Nhóm việc của tôi",
              to: "/congviec/nhomvieccuatoi",
            },
          ],
        },
      ],
    };
  },
};
</script>

<style lang="css" scoped>
.v-list-group--prepend {
  --parent-padding: unset;
}
</style>
