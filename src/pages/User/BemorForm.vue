<template>
  <div class="bemor-forma">
    <!-- <div class="bemor-reg">
        <div>{{ bemor.id }}</div>
        <div>{{ bemor.fullname }}</div>
    </div> -->
    <div>
      <div
        style="display: flex; width: 99%; margin: 0 auto; justify-content: space-between;"
      >
        <div style="width: 32.5%;">
          <label>
            {{ $t("Фамилия") }}
            <span style="color: red;">*</span>
            <span v-if="errors != null">
              <span
                style="color: red; font-size: 9px"
                v-if="!errors.lastname.required"
                >{{ $t("Фамилия тўлдирилиши керак") }}</span
              >
              <span
                style="color: red; font-size: 9px"
                v-if="!errors.lastname.minLength"
                >{{ $t("Фамилияда камида 4 та белги бўлиши керак") }}</span
              >
            </span>
          </label>
          <b-input
            type="text"
            class="bemor-input-text"
            id="familiya"
            v-model="bemor.lastname"
            :placeholder="$t('Фамилияни тўлдиринг')"
            @input="fullName"
          ></b-input>

          <label>
            {{ $t("Исми") }}
            <span style="color: red;">*</span>
            <span v-if="errors !== null">
              <span
                style="color: red; font-size: 9px"
                v-if="!errors.name.required"
                >{{ $t("Исми тўлдирилиши керак") }}</span
              >
              <span
                style="color: red; font-size: 9px"
                v-if="!errors.name.minLength"
                >{{ $t("Исмида камида 4 та белги бўлиши керак") }}</span
              >
            </span>
          </label>
          <b-input
            type="text"
            id="ismi"
            class="bemor-input-text"
            v-model="bemor.name"
            :placeholder="$t('Исмини тўлдиринг')"
            @input="fullName"
          >
          </b-input>

          <label>
            {{ $t("Отасининг исми") }}
            <span v-if="errors !== null">
              <span
                style="color: red; font-size: 9px"
                v-if="!errors.patronymic.minLength"
                >{{
                  $t("Отасининг исмида камида 4 та белги бўлиши керак")
                }}</span
              >
            </span>
          </label>
          <b-input
            type="text"
            id="otaismi"
            class="bemor-input-text"
            v-model="bemor.patronymic"
            :placeholder="$t('Отасининг исмини тўлдиринг')"
            @input="fullName"
          ></b-input>

          <div
            style="display: flex; justify-content: space-between; width: 100%;"
          >
            <div style="width: 100%;">
              <label>{{ $t("Туғилган сана") }}</label>
              <date-picker
                style="width: 100%;"
                id="tugkun"
                v-model="bemor.birthday"
                :placeholder="$t('Кун Ой Йил')"
                format="DD MM YYYY"
                value-type="X"
                type="date"
                :lang="lang"
              ></date-picker>
            </div>
          </div>
        </div>

        <div style="width: 32.5%;">
          <label>{{ $t("Вилоят") }}</label>
          <v-select
            style="background: #ffff; border-radius: 4px;"
            :options="region"
            id="viloyat"
            label="name"
            @input="PostRegion"
            :reduce="option => option.id"
            v-model="bemor.region_id"
            :placeholder="$t('Вилоятни тўлдиринг')"
          />

          <label class="mt-1">{{ $t("Туман") }}</label>
          <v-select
            style="background: #ffff; border-radius: 4px;"
            :options="district"
            id="tuman"
            label="name"
            :reduce="option => option.id"
            v-model="bemor.district_id"
            :placeholder="$t('Туманни тўлдиринг')"
          />
          <label>Уй Манзил</label>
          <b-input
            type="text"
            id="uymanzil"
            class="bemor-input-text"
            v-model="bemor.addres"
            :placeholder="$t('Уй Манзилни тўлдиринг')"
          ></b-input>

          <div>
            <label>
              {{ $t("Жинси") }}
              <span style="color: red;">*</span>
              <span v-if="errors !== null">
                <span
                  style="color: red; font-size: 9px"
                  v-if="!errors.gender.required"
                  >{{ $t("Жинси танланиши керак") }}</span
                >
              </span>
            </label>
            <div style="display: flex; justify-content: space-between;">
              <div
                style="width: 150px; display: flex; justify-content: space-between;"
              >
                <div>
                  <b-form-radio
                    v-model="bemor.gender"
                    id="jinsierkak"
                    value="Erkak"
                  >
                    {{$t("Эркак")}}
                  </b-form-radio>
                </div>

                <div>
                  <b-form-radio 
                    v-model="bemor.gender"
                    id="jinsiayol"
                    value="Ayol"
                  >
                    {{$t("Аёл")}}
                  </b-form-radio>
                </div>
              </div>
              <div>
                <label>
                  <b-form-checkbox
                    :value="true"
                    :unchecked-value="false"
                    id="fuqarolik"
                    v-model="bemor.citizen"
                  >
                    <span>{{ $t("Фуқаролиги") }}</span>
                  </b-form-checkbox>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div style="width: 32.5%;">
          <div>
            <label>{{ $t("Тел рақами") }}</label>
            <b-input
              type="number"
              id="telraqam"
              class="bemor-input-text"
              v-model="bemor.phone"
              placeholder="+998XXXXXX"
            ></b-input>
          </div>

          <div style="display: flex; justify-content: space-between;">
            <div style="width: 49%;">
              <label>
                {{ $t("Пасспорт рақами") }}
              </label>
              <b-input
                type="text"
                id="pasport"
                class="bemor-input-text"
                v-model="bemor.passport"
                placeholder="AB1234567"
              ></b-input>
            </div>
            <div style="width: 49%;">
              <label>{{ $t("Имтиёз") }}</label>
              <v-select
                style="width: 100%;"
                :options="Imtiyoz"
                id="imtiyoz"
                :components="{ Deselect }"
                label="key"
                :reduce="option => option.name"
                v-model="bemor.imtiyoz_type"
              />
            </div>
          </div>
          <div>
            <label>
              {{ $t("Изох") }}
            </label>
            <b-input
              type="text"
              id="pasport"
              class="bemor-input-text"
              v-model="bemor.text"
              placeholder="..."
            ></b-input>
          </div>
          
        </div>
      </div>
      <b-button
        v-if="this.$route.name == 'Create'"
        class="mt-3 successBtn"
        :disabled="bemor.id != null"
        @click="createBemor()"
        variant="success"
        >{{ $t("Сақлаш") }}</b-button
      >
      <b-button
        v-if="this.$route.name == 'Update'"
        class="mt-3 successBtn"
        @click="updateBemor()"
        variant="success"
        >{{ $t("Сақлаш") }}</b-button
      >
    </div>
  </div>
</template>
<script>
import { required, minLength } from "vuelidate/lib/validators";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
export default {
  props: ["bemor", "direct_id", "modalIdCom"],
  components: {
    DatePicker
  },
  data() {
    return {
      Imtiyoz: [
        {name: "Imtiyozli", key: "Имтиёзли"},
        {name: "Imtiyozsiz", key: "Имтиёзсиз"}
      ],
      region: [],
      district: [],
      // direct_id: null,
      lang: {
        formatLocale: {
          firstDayOfWeek: 1
        },
        monthBeforeYear: true
      },
      errors: null,
      Deselect: {
        render: createElement => createElement("span", "")
      }
    };
  },
  validations: {
    bemor: {
      fullname: {
        required,
        minLength: minLength(4)
      },
      name: {
        required,
        minLength: minLength(4)
      },
      lastname: {
        required,
        minLength: minLength(4)
      },
      patronymic: {
        minLength: minLength(4)
      },
      gender: {
        required
      }
    }
  },
  methods: {
    createBemor() {
      let self = this;
      this.$v.$touch();
      self.bemor.filial_id = JSON.parse(localStorage.getItem("user")).filial_id
      console.log(self.bemor.filial_id)
      if (self.$v.bemor.$error == false) {
        axios({
          method: "post",
          url: "/patient/create",
          data: self.bemor
        }).then(data => {
          if (data) {
            self.bemor.id = data.data.data.id;
            self.$emit("selectedBemor", data.data.data);
            self.$store.state.bemor = data.data.data;
            self.$bvToast.toast(this.$t("Малумотлар сақланди"), {
              title: this.$t("Огоҳлантириш"),
              variant: "success",
              autoHideDelay: 2000,
              appendToast: true
            });
          }
        });
      } else {
        self.errors = self.$v.bemor;
      }
    },
    keyUp($event, key){
      if($event.code == 'Enter'){
        const textareaElement = document.getElementById(key);
        if (textareaElement) {
            textareaElement.focus();
            if(textareaElement.setSelectionRange){
              textareaElement.setSelectionRange(0, 0);
            }
        }
        $event.preventDefault();
      }
    },
    direct() {
      this.$emit("direct", this.direct_id);
    },
    updateBemor() {
      let self = this;
      if (self.$v.bemor.$error == false) {
        axios({
          method: "patch",
          url: `/patient/update/` + self.bemor.id,
          data: self.bemor
        }).then(data => {
          if (data) {
            self.$emit("selectedBemor", data.data.data);
            self.$store.state.bemor = data.data.data;
            self.$bvToast.toast(this.$t("Малумотлар сақланди"), {
              title: this.$t("Огоҳлантириш"),
              autoHideDelay: 2000,
              appendToast: true
            });
          }
          // else {
          //   this.$bvToast.toast(`!!!!!!!Malumotlar saqlanmadi`, {
          //     title: this.$t('Огоҳлантириш')
          //     autoHideDelay: 2000,
          //     appendToast: true,
          //     variant: "danger"
          //   });
          // }
        });
      } else {
        self.errors = self.$v.bemor;
      }
    },
    // getBemor() {
    //   if (
    //     this.$route.name == "Update" ||
    //     this.$route.name == "ArxivOne"
    //   ) {
    //     let self = this;
    //     axios({
    //       method: "get",
    //       url: "/patient/one/" + self.user.patient_id
    //     }).then(res => {
    //       self.bemor = res.data.data;
    //       self.selectedBemor = self.bemor;
    //     });
    //   }
    // },
    PostRegion() {
      this.district = [];
      this.bemor.district_id = null;
      // if (this.$route.name == "Update") {
      for (let index = 0; index < this.region.length; index++) {
        const element = this.region[index];
        if (element.id == this.bemor.region_id) {
          this.district = element.district;
        }
      }
      // }
    },
    fullName() {
      this.bemor.fullname =
        this.bemor.lastname +
        " " +
        this.bemor.name +
        " " +
        this.bemor.patronymic;
    },
    getRegion() {
      let self = this;
      axios({
        method: "get",
        url: "/region/all"
      }).then(res => {
        self.region = res.data.data;
        if (self.bemor.region_id !== 0) {
          for (let index = 0; index < self.region.length; index++) {
            const element = self.region[index];
            if (element.id == self.bemor.region_id) {
              self.district = element.district;
            }
          }
        }
      });
    },
    
  },
  mounted() {
    this.getRegion();
  }
};
</script>
<style>
.bemor-reg {
  margin: 0 auto;
  width: 100%;
  text-align: center;
  font-size: 22px;
  font-weight: 600;
  color: #767676;
}
.CreateName {
  display: block;
  float: right;
}
.successBtn {
  box-shadow: 5px 8px 10px rgba(30, 176, 25, 0.3);
  background: #0abd11;
  border-radius: 8px;
}
.bemor-forma {
  padding: 10px 10px;
  border-radius: 10px;
  background: #f0f0f0;
  border: 1px solid #007bff;
}
.bemor-input-text {
  background: #fff;
  border: 1px solid #ced4da;
  height: 34px;
}
.navbarBtn-nap {
  color: #fff;
  border: 1px solid #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: 600;
  padding: 5px 10px;
  box-shadow: 5px 8px 10px rgba(25, 95, 176, 0.3);
  background: #00009d;
  border-radius: 8px;
}
</style>
