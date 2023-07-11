<template>
  <HeaderAdmin />
  <div id="admin-body">
    <router-view />
  </div>
</template>

<script>
import HeaderAdmin from "../Admin/HeaderAdmin.vue";
export default {
  components: { HeaderAdmin },
};
</script>

<style lang="css" scoped>
#admin-body {
  width: 100%;
  min-height: 100vh;
  background-color: #fcedda;
  color: #333;
}
* {
  box-sizing: border-box;
}
</style>
