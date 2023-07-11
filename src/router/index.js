import { createRouter, createWebHashHistory } from "vue-router";

import BudSupervision from "@/components/Admin/BudSupervision.vue";
import BudOfMe from "@/components/Admin/BudOfMe.vue";
import DashboardAdmin from "@/components/Admin/DashboardAdmin.vue";

import PersonalInfo from "@/components/Information/PersonalInfo.vue";
import DiemDanh from "@/components/Information/DiemDanh.vue";
import CongViec from "@/components/Information/CongViec.vue";
import KhoaHoc from "@/components/Information/KhoaHoc.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () =>
      import(/* webpackChunkName:"home"*/ "../components/Main/MainVue.vue"),
    children: [
      {
        path: "bangtin",
        name: "Bangtin",
        component: DashboardAdmin,
      },
      {
        path: "khoahoccuatoi",
        name: "Khoahoc",
        component: KhoaHoc,
      },
      {
        path: "thongtinphattu",
        name: "Thongtinphattu",
        component: PersonalInfo,
      },
      {
        path: "/phattu/diemdanh",
        name: "DiemDanh",
        component: DiemDanh,
      },
      {
        path: "/congviec/nhomvieccuatoi",
        name: "NhomCongViecCuaToi",
        component: CongViec,
      },
    ],
  },
  {
    path: "/admin",
    name: "Admin",
    component: () =>
      import(
        /* webpackChunkName:"Admin"*/ "../components/Admin/AdminLayout.vue"
      ),
    children: [
      {
        path: "giamsatphattu",
        name: "BudSupervision",
        component: BudSupervision,
      },
      {
        path: "phattucuatoi",
        name: "BudOfMe",
        component: BudOfMe,
      },
    ],
  },
  {
    path: "/account/register",
    name: "Register",
    component: () =>
      import(
        /* webpackChunkName:"Register"*/ "../components/LoginRegister/RegisterLayout"
      ),
  },
  {
    path: "/account/login",
    name: "Login",
    component: () =>
      import(
        /* webpackChunkName:"Login"*/ "../components/LoginRegister/LoginLayout.vue"
      ),
  },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

export default router;
