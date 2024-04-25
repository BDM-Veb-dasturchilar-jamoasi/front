import Vue from "vue";
import VueI18n from "vue-i18n";
Vue.use(VueI18n);

import { store } from "./store/index.js";
import ru from "./18n/ru.json";
import uz from "./18n/kril.json";

const translation = {
  ru: ru,
  uz: uz
};
const i18n = new VueI18n({
  locale: "uz", // set locale
  // fallbackLocale:store.getters.getLocale,
  messages: translation // set locale messages
});

export default i18n;
