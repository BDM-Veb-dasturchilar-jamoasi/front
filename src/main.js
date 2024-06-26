import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App";
import moment from "moment";
// router setup
import routes from "./routes/routes";

// Plugins
import GlobalComponents from "./globalComponents";
import GlobalDirectives from "./globalDirectives";
import Notifications from "./components/NotificationPlugin";

// MaterialDashboard plugin
import MaterialDashboard from "./material-dashboard";

import Vuelidate from "vuelidate";
Vue.use(Vuelidate);

import Chartist from "chartist";
//vuex
import Vuex from "vuex";
Vue.use(Vuex);
import { store } from "./store";

import VueHtmlToPaper from "vue-html-to-paper";

Vue.use(VueHtmlToPaper, {
  name: "_blank",
  specs: ["fullscreen=yes", "titlebar=yes", "scrollbars=yes"],
  styles: [
    "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css",
    "/print-styles.css"
  ]
});

//vue-axios
import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios); 
window.axios = require("axios");
// local
// const BASE_URL = "http://localhost:3005/api/v1/admin-app/";

// amirbek shifo
const BASE_URL = "http://185.76.13.223:4006/api/v1/admin-app/";


window.axios.defaults.baseURL = BASE_URL;
// window.axios.defaults.baseURL = "";
import Toasted from "vue-toasted";
const toastOptions = {
  position: "top-center",
  duration: 2000,
  theme: "toasted-primary"
};
Vue.use(Toasted, toastOptions);

import VuejsDialog from "vuejs-dialog";
// import VuejsDialogMixin from 'vuejs-dialog/dist/vuejs-dialog-mixin.min.js'; // only needed in custom components

// include the default style
import "vuejs-dialog/dist/vuejs-dialog.min.css";

// Tell Vue to install the plugin.
Vue.use(VuejsDialog);

window.axios.interceptors.request.use(req => {
  req.headers.contentType = "application/json";
  req.headers.Authorization = "Bearer " + localStorage.getItem("token");
  return req;
});

window.axios.interceptors.response.use(
  response => {
    if (response.data.error) {
      if (response.data.error_code == 401) {
        router.push("/login");
      }
      store.state.errors = response.data.message;
    } else {
      return response;
    }
  },
  error => {
    if (error.toJSON().message === "Network Error") {
      store.state.errors = "База билан алоқа ёқ";
    } else if (error.response.status == 401) {
      store.state.errors = error.response.data.message;
      router.push("/login");
    } else if (error.response.status == 400) {
      store.state.errors = error.response.data.message;
    } else if (error.response.status == 404) {
      router.push("/404");
      store.state.errors = error.response.data.message;
    } else {
      store.state.errors = error.response.data.message;
    }
    return Promise.reject(error);
  }
);
// BootstrapVue
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

// vue2-editor
import Vue2Editor from "vue2-editor";
Vue.use(Vue2Editor);

// Vue I18n
import i18n from "./i18n";

//electronVuePrinter
// import electronVuePrinter from 'electron-vue-printer'

// Vue.use(electronVuePrinter)

//htmlToImage
// import * as htmlToImage from 'html-to-image';
// import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';

// Vue.use(htmlToImage)

//vue-select
import vSelect from "vue-select";

Vue.component("v-select", vSelect);
import "vue-select/dist/vue-select.css";

//VueNumeric
import VueNumeric from "vue-numeric";

Vue.use(VueNumeric);

//VueFilterNumberFormat
import numeral from "numeral";
import numFormat from "vue-filter-number-format";

Vue.filter("numFormat", function(value) {
  return new Intl.NumberFormat("ru-RU", {
    style: "decimal",
    minimumFractionDigits: 2
  }).format(value);
});

//text editor
import CKEditor from "@ckeditor/ckeditor5-vue2";

Vue.use(CKEditor);

// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  linkExactActiveClass: "nav-item active"
});
router.beforeEach((to, from, next) => {
  const publicPages = ["/login"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem("token");
  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next("/login");
  } else {
    next();
  }
  // const Role = JSON.parse(localStorage.getItem("user")).role;
  // if (
  //   to.name == "Oplata Create"
  //   to.name == "KassaHisobot"
  //   to.name == "oplata-update"
  //   to.name == "KassaSverka"
  //   to.name == "oplata"
  //   to.name == "User Profiles"
  //   to.name == "Royhatlar"
  //   to.name == "Kassa"
  //   to.name == "KassaCreate"
  //   to.name == "KassaUpdate"
  //   to.name == "User Profile Chek"
  // ) {
  //   if (Role == "Admin"  Role == "Dasturchi"  Role == "Kasser") {
  //     next();
  //   } else {
  //     next("user");
  //   }
  // } else if (
  //   to.name == "User Profile"
  //   to.name == "DoctorSverka"
  //   to.name == "Naprovitel"
  //   to.name == "Naprovitel-create"  to.name == "Naprovitel-update"  to.name == "Royhatlar"  to.name == "InspectionHisobot"  to.name == "InspectionSverka"  to.name == "User Profile Bayonot"  to.name == "UserTekshiruvlar"
  // ) {
  //   if (
  //     Role == "Admin"
  //     Role == "Dasturchi"
  //     Role == "Shifokor"
  //     Role == "Loborant"
  //   ) {
  //     next();
  //   } else {
  //     next("user");
  //   }
  // } else if (
  //   to.name == "User Profile"
  //   to.name == "Royhatlar"
  //   to.name == "User Navbat Chek"
  //   to.name == "User Profile Bayonot"
  //   to.name == "User Profile Chek"
  // ) {
  //   if (Role == "Admin"  Role == "Dasturchi"  Role == "Registrator") {
  //     next();
  //   } else {
  //     next("user");
  //   }
  // }
});
Vue.prototype.$Chartist = Chartist;

Vue.use(VueRouter);
Vue.use(MaterialDashboard);
Vue.use(GlobalComponents);
Vue.use(GlobalDirectives);
Vue.use(Notifications);

/* eslint-disable no-new */
new Vue({
  el: "#app",
  render: h => h(App),
  router,
  store,
  i18n,
  data: {
    Chartist: Chartist
  }
});
