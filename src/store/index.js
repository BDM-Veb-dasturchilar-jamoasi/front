import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    id: null,
    locale: "ru",
    errors: "",
    User: {},
    UserError: null,
    summa: 0,
    modalId: -1,
    kasTar: false,
    datas: {
      summa: 0,
      backlog: 0,
      discount: 0,
      pay_summa: 0,
      hospital_summa: 0
    },
    bemor: {
      id: null,
      citizen: null,
      imtiyoz_type: "",
      tramma_type: "Bir oydan ortiq"
    }
  },
  mutations: {},
  actions: {},
  getters: {}
});
