<template>
  <div>
    <!-- <RealTime/> -->
    <router-view></router-view>
  </div>
</template>

<script>
// import RealTime from "./components/RealTime.vue"
export default {
  components: {
    // RealTime
  },
  provide() {
    return {
      // local 
      // BASE_URL: `http://localhost:3005/api/v1/admin-app/`

      /// med service
      BASE_URL: "http://185.76.13.223:4006/api/v1/admin-app/"

      // oydin shifo
      // BASE_URL: "http://winserver:5005/api/v1/admin-app/"
      // BASE_URL: "http://User-PC:4002/api/v1/admin-app/"
      // ecomed
      // BASE_URL: "http://set1:5005/api/v1/admin-app/"

      // BASE_URL: "http://90.156.224.16:5000/api/v1/admin-app/"

      // bdm yangi
      // BASE_URL: "http://176.53.163.29:4007/api/v1/admin-app/"

      // new demo test 
      // BASE_URL: "http://81.95.226.11:63020/api/v1/admin-app/"

      // demo jizzah
      // BASE_URL: "http://81.95.226.11:63013/api/v1/admin-app/"
    };
  }
};
</script>
<style>
* {
  box-sizing: border-box;
}
</style>
