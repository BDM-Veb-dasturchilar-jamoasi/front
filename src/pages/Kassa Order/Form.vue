<template>
  <div>
    <div class="katta">
      <span>{{ $t("Кассовый ордер") }}</span>
      <button
        style="padding: 4px 10px; margin-right: 10px"
        class="btn"
        @click="Prev"
      >
        <b-icon style="color: white" icon="house-door-fill"> </b-icon>
      </button>
    </div>

    <div>
      <div class="oyna1">
        <div class="ustun">
          <div style="position: relative;">
            <span>
              <span class="shirift">{{ $t("Ҳаражат") }}</span>
              <span style="color: red;">*</span>
              <span v-if="errors !== null">
                <span
                  style="color: red; font-size: 9px"
                  v-if="!errors.expense_id.required"
                  >{{ $t("Харажат тўлдирилиши керак") }}</span
                >
              </span>
              <div>
                <button
                  :class="{ Disabled: $route.name == 'KassaDoc' }"
                  class="tabsBtnss"
                  v-b-modal.DorilarModal1
                  variant="primary"
                >
                  ...
                </button>
              </div>
              <b-modal id="DorilarModal1" title="Харажат Қўшиш">
                <div class="md-layout-item md-small-size-100 md-size-100">
                  <span class="shirift">
                    {{ $t("Ҳаражат номи") }}
                  </span>
                  <span style="color: red;">*</span>
                  <span v-if="errorsHarajat !== null">
                    <span
                      style="color: red; font-size: 9px"
                      v-if="!errorsHarajat.name.required"
                      >{{ $t("Ҳаражат тўлдирилиши керак") }}</span
                    >
                    <!-- <span
                          style="color: red; font-size: 9px"
                          v-if="!errorsHarajat.name.minLength"
                          >Harajat kamida 4 ta belgi bo'lisi kerak</span
                        > -->
                  </span>
                  <b-input
                    id="dorilar-name"
                    type="text"
                    v-model="Harajat.name"
                  />
                </div>
                <template #modal-footer="{ ok }">
                  <b-button
                    class="modalBtn1"
                    size="sm"
                    style="height: 37px;"
                    variant="danger "
                    @click="ok()"
                  >
                    <b-icon icon="calendar2-x"></b-icon>
                    {{ $t("Бекор қилиш") }}
                  </b-button>
                  <b-button
                    class="mt-3 ml-2 modalBtn"
                    @click="HarajatSaqlash()"
                    variant="success"
                  >
                    <b-icon icon="calendar2-plus"></b-icon>
                    {{ $t("Сақлаш") }}
                  </b-button>
                </template>
              </b-modal>
            </span>
            <v-select
              :class="{ Disabled: $route.name == 'KassaDoc' }"
              :options="expense"
              v-model="kassaOrder.expense_id"
              :reduce="expense => expense.id"
              label="name"
            />
            <!-- <b-input v-model="kassaOrder.expense_id" type="number"></b-input> -->
          </div>
          <div class="mt-1">
            <span class="shirift">
              {{ $t("Тўлов тури") }}
              <span style="color: red;">*</span>
              <span v-if="errors !== null">
                <span
                  style="color: red; font-size: 9px"
                  v-if="!errors.type.required"
                  >{{ $t("Тўлов турини танланг") }}</span
                >
              </span>
            </span>
            <v-select
              :class="{ Disabled: $route.name == 'KassaDoc' }"
              :options="tolov_turi"
              label="tolov"
              v-model="kassaOrder.type"
            />
          </div>
          <div>
            <span class="shirift"
              >{{ $t("Пул миқдори") }}
              <span style="color: red;">*</span>
              <span v-if="errors !== null">
                <span
                  style="color: red; font-size: 9px"
                  v-if="!errors.price.required"
                  >{{ $T("Пул миқдори тўлдирилиши керак") }}</span
                >
              </span>
            </span>
            <vue-numeric
              :class="{ Disabled: $route.name == 'KassaDoc' }"
              :disabled="kassaOrder.pay_type != 'Oylik'"
              style="width: 100%; height: 35px; border: 1px solid #bdb2b2; border-radius: 3px;"
              v-model="kassaOrder.price"
              separator="space"
              :precision="2"
            ></vue-numeric>
          </div>
        </div>

        <div class="ustun">
          <div>
          <span>
            {{ $t("Филиал") }}
            <span style="color: red;">*</span>
            <span v-if="errors !== null">
              <span
                style="color: red; font-size: 9px"
                v-if="!errors.room_id.required"
                >{{ $t("Филиал тўлдирилиши керак") }}</span
              >
            </span>
          </span>
          <v-select
            :options="filiallar"
            label="name"
            :reduce="option => option.id"
            v-model="kassaOrder.filial_id"
          />
        </div>
          <div>
            <span>
              <span class="shirift">{{ $t("Изоҳ") }}</span>
              <span style="color: red;">*</span>
              <span v-if="errors !== null">
                <span
                  style="color: red; font-size: 9px"
                  v-if="!errors.comment.required"
                  >{{ $t("Изоҳ тўлдирилиши керак") }}</span
                >
              </span>
            </span>
            <b-input
              v-model="kassaOrder.comment"
              style="background: #fff; border: 1px solid #ced4da;"
              :class="{ Disabled: $route.name == 'KassaDoc' }"
              type="text"
            ></b-input>
          </div>
          <div>
            <span class="shirift">{{ $t("Куни") }}</span>
            <date-picker
              :class="{ Disabled: $route.name == 'KassaDoc' }"
              style="width: 100%;"
              v-model="kassaOrder.date_time"
              format="DD.MM.YYYY HH:mm"
              value-type="X"
              type="datetime"
              :lang="lang"
            ></date-picker>
            <!-- <b-input v-model="kassaOrder.date_time" type="date"></b-input> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import moment from 'moment'
import DatePicker from "vue2-datepicker";
import { required, minLength } from "vuelidate/lib/validators";
import axios from "axios";
import "vue2-datepicker/index.css";
export default {
  name: "KassaForm",
  props: ["kassaOrder", "errors"],
  components: {
    DatePicker
  },
  data() {
    return {
      kassa: [],
      filiallar:[],
      expense: [],
      tolov_turi: ["Naqd", "Plastik"],
      lang: {
        formatLocale: {
          firstDayOfWeek: 1
        },
        monthBeforeYear: false
      },
      Harajat: {
        name: ""
      },
      errorsHarajat: null
    };
  },
  validations: {
    Harajat: {
      name: {
        required,
        minLength: minLength(4)
      }
    }
  },
  methods: {
    Prev() {
      if (this.$route.name == "KassaDoc") {
        window.close();
      } else {
        this.$router.push("/kassaa");
      }
    },
    getKassa() {
      let self = this;
      axios({
        method: "get",
        // url: "/expense/all"
        url: `/expense/all` 
      }).then(res => {
        self.expense = res.data.data;
        // self.expense.date_time = value;
      });
    },
    getFiliallar() {
      let self = this;
      axios({
        method: "get",
        url: "/filial/all"
      }).then(res => {
        console.log("aaa",res)
        self.filiallar = res.data.data;
      });
    },
    HarajatSaqlash() {
      let self = this;
      this.$v.$touch();
      if (this.$v.Harajat.$error == false) {
        axios({
          method: "post",
          url: "/expense/create",
          data: self.Harajat
        }).then(data => {
          if (data !== undefined) {
            this.kassaOrder.expense_id = data.data.data.id;
            this.getKassa();
            this.$bvModal.hide("DorilarModal1");
            this.Harajat.name = "";
          }
        });
      } else {
        this.errorsHarajat = this.$v.Harajat;
      }
    }
  },
  mounted() {
    this.getKassa();
    this.getFiliallar();
  }
};
</script>
<style>
.tabsBtnss {
  position: absolute;
  z-index: 3;
  top: 30px;
  left: calc(100% - 70px);
  color: #b1b1b1;
  font-weight: 700;
  font-size: 17px;
  border: none;
  background-color: white;
}
.katta {
  background: #007bff;
  margin-top: -25px;
  height: 40px;
  display: flex;
  justify-content: space-between;
  font-size: 20px;
  font-weight: 700;
  line-height: 40px;
  border-radius: 8px;
  color: #fff;
  text-indent: 15px;
  box-shadow: 5px 8px 10px rgba(25, 95, 176, 0.5);
}
.oyna1 {
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
}
.shirift {
  font-size: 16px;
}
.ustun {
  width: 49%;
  /* position: relative; */
}
.Disabled {
  pointer-events: none;
}
</style>
