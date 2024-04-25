<template>
  <b-container fluid class="tables1">
    <b-row class="text-center d-flex justify-content-center mb-3">
      <b-col lg="3" xs="3" md="3" xl="3" class="my-3 datepicker-toggle">
        <span class="datepicker-toggle-button">
          <input
            class="form-control ShifokrSverka"
            type="date"
            v-model="datas.date1"
            placeholder="boshlanish vaqti"
          />
          <!-- <date-picker
            v-model="datas.date1"
            format="DD.MM.YYYY"
            value-type="X"
            type="date"
            :lang="lang"
          ></date-picker> -->
        </span>
      </b-col>
      <b-col lg="3" xs="3" md="3" xl="3" class="my-3">
        <input
          class="form-control ShifokrSverka"
          type="date"
          v-model="datas.date2"
          placeholder="tugash vaqti"
        />
      </b-col>
      <b-col lg="4" xs="4" md="4" xl="4" class="my-3">
        <v-select
          :options="names"
          v-model="datas.reagent_id"
          :reduce="option => option.id"
          label="name"
          :placeholder="$t('Махсулот танланг...')"
        />
      </b-col>
      <b-col lg="2" xs="2" md="2" xl="2" class="my-3">
        <button
          class="btn text-white"
          style="background: #195FB0; width: 130px; font-size: 14px"
          @click="Send()"
        >
          <img
            src="../../../public/Vector.png"
            alt=""
            style="margin-right: 5px"
          />
          {{ $t("Кўриш") }}
        </button>
      </b-col>
    </b-row>
    <table class="table tablee table-sm table-bordered">
      <tbody>
        <tr
          class="text-center tbody"
          style="height: 40px !important; line-height: 40px"
        >
          <th>№</th>
          <th>{{ $t("Номи") }}</th>
          <th>{{ $t("Бош қолдиқ") }}</th>
          <th>{{ $t("Кирим сони") }}</th>
          <th>{{ $t("Сони") }}</th>
          <th>{{ $t("Чиқим сони") }}</th>
          <th>{{ $t("Бош қолдиқ") }}</th>
          <th>{{ $t("Кирим") }}</th>
          <th>{{ $t("Чиқим") }}</th>
          <th>{{ $t("Якуний қолдиқ") }}</th>
        </tr>
      </tbody>
      <tbody v-for="(item, index) in results" :key="index">
        <tr
          class="text-center"
          v-on:dblclick="Clicked(item)"
        >
          <td>{{ index + 1 }}</td>
          <td>
            <span>{{ item.reagent.name }}</span>
          </td>
          <td>
            <span>{{ item.begin_count }}</span>
          </td>
          <td>
            <span>{{ item.kirim_count }}</span>
          </td>
          <td>
            <span>{{ item.end_count }}</span>
          </td>
          <td>
            <span>{{ item.chiqim_count }}</span>
          </td>
          <td>
            <span>{{ item.begin_summa | numFormat }}</span
            >
          </td>
          <td>
            <span>{{ item.kirim_summa | numFormat }}</span>
          </td>
          <td>
            <span>{{ item.chiqim_summa | numFormat }}</span>
          </td>
          <td>
            <span>{{ item.end_summa | numFormat }}</span>
          </td>
        </tr>
        <!-- <tr class="text-center">
          <td>
            {{ $t("Жами") }}
          </td>
          <td>
            <span>{{ bosh_summ | numFormat }}</span
            >
          </td>
          <td>
            <span>{{ kirim_summ | numFormat }}</span >
          </td>
          <td>
            <span>{{ chiqim_summ | numFormat }}</span
            >
          </td>
          <td>
            <span :class="{ red: summ < 0 }">{{ summ | numFormat }}</span>
          </td>
        </tr> -->
      </tbody>
    </table>
  </b-container>
</template>

<script>
// import DatePicker from "vue2-datepicker"
import "vue2-datepicker/index.css";
import moment from "moment";
export default {
  components: {
    // DatePicker
  },
  data() {
    return {
      lang: {
        formatLocale: {
          firstDayOfWeek: 1
        },
        monthBeforeYear: false
      },
      datas: {
        date1: new Date().toISOString().slice(0, 8) + "01",
        date2: new Date().toISOString().slice(0, 10),
        reagent_id: null
      },
      localUser: JSON.parse(localStorage.getItem("user")),
      summ: 0,
      names: [],
      doctor: "",
      results: [],
      index: 0
    };
  },
  filters: {
    moment: function(date) {
      if (date != null) {
        return moment.unix(date).format("DD.MM.YYYY");
      } else {
        return "";
      }
    }
  },
  // created() {
  //   let self = this;
  //   if (self.localUser.role == "Shifokor") {
  //     if (this.localUser != null) {
  //       self.datas.reagent_id = self.localUser.doctor.id;
  //       self.doctors = self.localUser.doctor.name;
  //       self.Send();
  //     }
  //   }
  // },
  methods: {
    Clicked(item) {
      this.datas.reagent_id = item.reagent.id;
      localStorage.setItem("Reagent", JSON.stringify(this.datas));
      // this.$router.push({ path: "doctor_sverka" });
      let route = this.$router.resolve({
        path: "/Reagent/sverka"
      });
      window.open(route.href, "_blank");
    },
    Send() {
      let self = this;
      var datas = {
        datetime1: parseInt(
          new Date(self.datas.date1)
            .valueOf()
            .toString()
            .slice(0, 10)
        ),
        datetime2:
          parseInt(
            new Date(self.datas.date2)
              .valueOf()
              .toString()
              .slice(0, 10)
          ) + 86399,
        reagent_id: self.datas.reagent_id
      };
      axios({
        method: "post",
        url: "/hisobot/reagent_hisobot",
        data: datas
      }).then(response => {
        self.results = response.data.items;
      });
    },
    getDoctor() {
      let self = this;
      axios({
        method: "get",
        url: "/reagent/all"
      }).then(res => {
        if (res != undefined) {
          self.names = res.data.data;
        }
      });
    }
  },
  mounted() {
    this.getDoctor();
  }
};
</script>
<style scoped>
table {
  margin: 0px 0px;
  border: none;
}

label,
td,
th,
tr {
  font-family: "Times New Roman", Times, serif;
  font-weight: bolder;
  text-transform: capitalize;
  font-size: 15px;
  height: 30px !important;
}
.ShifokrSverka {
  border-radius: 3px;
  background: #fff;
  border: 1px solid rgb(210, 210, 210);
}
.tables1 {
  min-height: 100vh;
  width: calc(100% - 10px) !important;
}
.btns {
  background: #f4f7fb;
  width: 100%;
  height: 100%;
}
.btns:hover {
  background: #c5eaff;
}
.reds {
  color: red;
}
th {
  color: #195fb0;
  background-color: #f4f7fb;
}
.tbody {
  border-radius: 10px !important;
}
.tablee tbody tr th {
  border: 1px solid rgb(209, 208, 208);
}
</style>
