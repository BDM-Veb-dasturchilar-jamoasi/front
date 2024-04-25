<template>
  <div>
    <div class="katta">
      <span>{{ $t("Ходим") }}</span>
      <button
        style="padding: 4px 10px; margin-right: 10px"
        class="btn"
        @click="Prev()"
      >
        <b-icon style="color: white" icon="house-door-fill"> </b-icon>
      </button>
    </div>
    <div class="oyna1">
      <div class="ustun">
        <div>
          <span>
            {{ $t("Ф.И.Ш") }}
            <span style="color: red;">*</span>
            <span v-if="errors !== null">
              <span
                style="color: red; font-size: 9px"
                v-if="!errors.user_name.required"
                >{{ $t("Ф.И.Ш тўлдирилиши керак") }}</span
              >
              <span
                style="color: red; font-size: 9px"
                v-if="!errors.user_name.minLength"
                >{{ $t("Ф.И.Ш да камида 4 та белги бўлиши керак") }}</span
              >
            </span>
          </span>
          <b-input v-model="modelvue.user_name" type="text" />
        </div>
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
            v-model="modelvue.filial_id"
          />
        </div>
        <div>
          <span>
            {{ $t("Хона") }}
            <span style="color: red;">*</span>
            <span v-if="errors !== null">
              <span
                style="color: red; font-size: 9px"
                v-if="!errors.room_id.required"
                >{{ $t("Хона тўлдирилиши керак") }}</span
              >
            </span>
          </span>
          <v-select
            :options="xonalar"
            label="name"
            :reduce="option => option.id"
            v-model="modelvue.room_id"
          />
        </div>
        <div>
          <span>
            {{ $t("Тўлов тури") }}
            <span style="color: red;">*</span>
            <span v-if="errors !== null">
              <span
                style="color: red; font-size: 9px"
                v-if="!errors.pay_type.required"
                >{{ $t("Тўлов тури тўлдирилиши керак") }}</span
              >
            </span>
          </span>
          <v-select
            :options="tolovTuri"
            label="name"
            v-model="modelvue.pay_type"
          />
        </div>
        <div v-if="modelvue.pay_type == 'Oylik'">
          <span>{{ $t("Иш ҳаққи") }}</span>
          <vue-numeric
            style="width: 100%; height: 35px; border: 1px solid #bdb2b2; border-radius: 3px;"
            v-model="modelvue.salary"
            separator="space"
            :precision="2"
          ></vue-numeric>
        </div>
        <div v-if="modelvue.pay_type == 'Foiz'">
          <span>{{ $t("Иш ҳаққи") }}</span>
          <vue-numeric
            style="width: 100%; height: 35px; border: 1px solid #bdb2b2; border-radius: 3px;"
            v-model="modelvue.percent"
            separator="space"
          ></vue-numeric>
        </div>
      </div>

      <div class="ustun">
        <div>
          <span>
            {{ $t("Парол") }}
            <span style="color: red;">*</span>
            <span v-if="errors !== null">
              <span
                style="color: red; font-size: 9px"
                v-if="!errors.password.required"
                >{{ $t("Парол тўлдирилиши керак") }}</span
              >
              <span
                style="color: red; font-size: 9px"
                v-if="!errors.password.minLength"
                >{{ $t("Паролда камида 6 та белги бўлиши керак") }}</span
              >
            </span>
          </span>
          <b-input v-model="modelvue.password" type="password" />
        </div>

        <div>
          <span>
            {{ $t("Ҳуқуқи") }}
            <span style="color: red;">*</span>
            <span v-if="errors !== null">
              <span
                style="color: red; font-size: 9px"
                v-if="!errors.role.required"
                >{{ $t("Ҳуқуқи тўлдирилиши керак") }}</span
              >
              <span
                style="color: red; font-size: 9px"
                v-if="!errors.role.minLength"
                >{{ $t("Ҳуқуқида камида 4 та белги бўлиши керак") }}</span
              >
            </span>
          </span>
          <v-select :options="category" label="name" v-model="modelvue.role" />
        </div>

        <div v-if="modelvue.role == 'Shifokor'">
          <span>{{ $t("Шифокор") }}</span>
          <v-select
            :options="Shifokor"
            label="name"
            v-model="modelvue.doctor_id"
            :reduce="doctor => doctor.id"
          />
        </div>

        <div v-if="modelvue.role == 'Loborant' || modelvue.role == 'Uzi '">
          <span>{{ $t("Текширув бўлимлари") }}</span>
          <v-select
            :options="tekshiruvBolimlari"
            label="name"
            v-model="modelvue.inspection_category_id"
            :reduce="inspection => inspection.id"
          />
        </div>
        <div v-if="modelvue.role == 'Shifokor'">
          <span>{{ $t("Палата фоиз") }}</span>
          <vue-numeric
            style="width: 100%; height: 35px; border: 1px solid #bdb2b2; border-radius: 3px;"
            v-model="modelvue.palata_percent"
            separator="space"
          ></vue-numeric>
        </div>
      </div>
    </div>
    
    <div style="border: 1px solid red;">
      <table class="daily_coming">
        <tr>
          <th>Hafta kuni</th>
          <th>Kelish vaqti</th>
          <th>Ketish vaqti</th>
          <th>Dam olish kuni</th>
        </tr>
        <tr v-for="item in modelvue.daily_coming">
          <td>
            {{ item.week }}
          </td>
          <td>
            <b-time :hour12="false" v-model="item.come_time" locale="en"></b-time>
          </td>
          <td>
            <b-time :hour12="false" v-model="item.leave_time" locale="en"></b-time>
          </td>
          <td>
            <b-form-checkbox
              v-model="item.is_day_off"
              :value="true"
              :unchecked-value="false"
            >
              Dam olish kuni
            </b-form-checkbox>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "edit-profile-form",
  props: ["modelvue", "errors"],
  data() {
    return {
      hodimlar: [],
      Shifokor: [],
      tekshiruvBolimlari: [],
      xonalar: [],
      filiallar: [],
      category: ["Registrator", "Shifokor", "Loborant", "Admin", "Kasser"],
      tolovTuri: ["Foiz", "Oylik"]
    };
  },
  methods: {
    home() {
      this.modelvue = {
        user_name: "",
        pay_type: "",
        room_id: "",
        salary: "",
        password: "",
        role: "",
        doctor_id: "",
        filial_id:'',
        daily_coming: []
      };
    },
    getXonalar() {
      let self = this;
      let filial = localStorage.getItem("filial_id")
      axios({
        method: "get",
        url: `/room/all?filial_id=${filial}`
      }).then(res => {
        self.xonalar = res.data.data;
      });
    },
    getFiliallar() {
      let self = this;
      axios({
        method: "get",
        url: "/filial/all"
      }).then(res => {
        self.filiallar = res.data.data;
      });
    },
    getInspection_category() {
      let self = this;
      axios({
        method: "get",
       url: `/inspector_category/all/` + JSON.parse(localStorage.getItem("user")).filial_id
      }).then(res => {
        self.tekshiruvBolimlari = res.data.data;
      });
    },
    Prev() {
      this.$router.push("/hodimlar");
    },
    getDoctor() {
      let self = this;
      let filial = localStorage.getItem("filial_id")
      axios({
        method: "get",
        // url: `/doctor/all?filial_id=${filial}`
        url: `/doctor/all/` + filial
      }).then(res => {
        if (res) {
          self.Shifokor = res.data;
        }
      });
    }
  },
  mounted() {
    this.getXonalar();
    this.getInspection_category();
    this.getDoctor();
    this.getFiliallar()
  }
};
</script>
<style>
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
}

.daily_coming {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

.daily_coming td, .daily_coming th {
  border: 1px solid #ddd;
  padding: 8px;
}

.daily_coming tr:nth-child(even){background-color: #f2f2f2;}

.daily_coming tr:hover {background-color: #ddd;}

.daily_coming th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #007bff;
  color: white;
}
</style>
