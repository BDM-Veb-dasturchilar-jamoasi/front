<template>
  <div>
    <div class="katta">
      <span>{{ $t("Толовлар") }}</span>
      <button
        style="padding: 4px 10px; margin-right: 10px"
        class="btn"
        @click="Prev"
      >
        <b-icon style="color: white" icon="house-door-fill"> </b-icon>
      </button>
    </div>
    <div :class="{ Arxiv: $route.name == 'oplataDoc' }">
      <div class="oyna1">
        <div class="ustun">
          <div class="selekt mt-1">
            <span class="shirift">
              {{ $t("Филиал *") }}
            </span>
            <span style="color: red;">*</span>
            <span v-if="errors !== null">
              <span
                style="color: red; font-size: 9px"
                v-if="!errors.filial_id_id.required"
                >{{ $t("Филиал  танланиши керак") }}</span
              >
            </span>
            <v-select
              :options="filiallar"
              label="name"
              disabled
              :reduce="option => option.id" 
              v-model="oplata.filial_id"
            />
          </div>
          <div class="selekt mt-1">
            <span class="shirift">
              {{ $t("Ҳодим") }}
            </span>
            <span style="color: red;">*</span>
            <span v-if="errors !== null">
              <span
                style="color: red; font-size: 9px"
                v-if="!errors.user_id.required"
                >{{ $t("Ҳодим танланиши керак") }}</span
              >
            </span>
            <v-select
              :class="{ Arxiv: $route.name == 'oplataDoc' }"
              :options="User"
              label="user_name"
              :reduce="user => user.id"
              v-model="oplata.user_id"
            />
          </div>
          <div>
            <span>
              <span class="shirift">{{ $t("Номи") }}</span>
              <span style="color: red;">*</span>
              <span v-if="errors !== null">
                <span
                  style="color: red; font-size: 9px"
                  v-if="!errors.name.required"
                  >{{ $t("Номи тўлдирилиши керак") }}</span
                >
              </span>
            </span>
            <b-input
              v-model="oplata.name"
              style="background: #fff; border: 1px solid #ced4da;"
              type="text"
              :class="{ Arxiv: $route.name == 'oplataDoc' }"
            ></b-input>
          </div>
          <div
            v-if="
              this.$route.name == 'Oplata Create' ||
                this.$route.name == 'oplata-update'
            "
          >
            <span class="shirift"
              >{{ $t("Вақти") }}
              <span style="color: red;">*</span>
              <span v-if="errors !== null">
                <span
                  style="color: red; font-size: 9px"
                  v-if="!errors.date_time.required"
                >
                  {{ $t("Вақтни танланг") }}</span
                >
              </span>
            </span>
            <date-picker
              style="width: 100%;"
              v-model="oplata.date_time"
              format="DD.MM.YYYY HH:mm"
              value-type="X"
              type="datetime"
              :lang="lang"
            ></date-picker>
            <!-- <date-picker
              style="width: 100%;"
              v-model="oplata.date_time"
              format="DD.MM.YYYY HH:mm"
              value-type="X"
              type="datetime"
              :lang="lang"
            ></date-picker> -->
          </div>
        </div>

        <div class="ustun">
          <div>
            <span>
              <span class="shirift">{{ $t("Тўлов тури") }}</span>
              <span style="color: red;">*</span>
              <span v-if="errors !== null">
                <span
                  style="color: red; font-size: 9px"
                  v-if="!errors.type.required"
                  >{{ $t("Изоҳ тўлдирилиши керак") }}</span
                >
              </span>
            </span>
            <v-select
              :class="{ Arxiv: $route.name == 'oplataDoc' }"
              :options="tolov_turi"
              label="name"
              v-model="oplata.type"
              :reduce="tolov_turi => tolov_turi.id"
            />
          </div>
          <div class="mt-1">
            <span class="shirift">
              {{ $t("Сумма") }}
            </span>
            <vue-numeric
              style="width: 100%; height: 35px; border: 1px solid #bfbfbf; border-radius: 4px;"
              separator="space"
              v-model="oplata.price"
              :precision="2"
            ></vue-numeric>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "vue2-datepicker/index.css";
import DatePicker from "vue2-datepicker";
// import moment from 'moment'
export default {
  name: "OplataForm",
  components: {
    DatePicker
  },
  props: ["oplata", "errors"],
  data() {
    return {
      // oplata: [],
      expense: [],
      filiallar:[],
      User: [],
      tolov_turi: [
        { id: 0, name: "Naqt" },
        { id: 1, name: "Plastik" }
      ],
      lang: {
        formatLocale: {
          firstDayOfWeek: 1
        },
        monthBeforeYear: false
      }
    };
  },
  methods: {
    Prev() {
      if (this.$route.name == "oplataDoc") {
        window.close();
      } else {
        this.$router.push("/oplata");
      }
    },
    getUser() {
      let self = this;
      axios({
        method: "get",
        url: "/user/all"
      }).then(res => {
        self.User = res.data.data;
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
  },
  mounted() {
    this.getUser();
    this.getFiliallar();
  }
};
</script>
<style>
.Arxiv {
  pointer-events: none;
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
.oyna1 .selekt .vs__dropdown-menu {
  height: 200px;
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
}
</style>
