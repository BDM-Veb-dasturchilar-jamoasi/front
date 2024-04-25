<template>
  <b-container fluid id="tables">
    <b-row class="text-center d-flex justify-content-center mb-3">
      <b-col lg="2" xs="3" md="3" xl="2" class="my-3">
        <input
          class="form-control ShifokrSverka"
          type="date"
          v-model="datas.date1"
        />
      </b-col>
      <b-col lg="2" xs="3" md="3" xl="2" class="my-3">
        <input
          class="form-control ShifokrSverka"
          type="date"
          v-model="datas.date2"
        />
      </b-col>
      <b-col lg="2" xs="3" md="3" xl="3" class="my-3">
        <v-select
          :options="Filial"
          :disabled="localUser.role != 'Admin'"
          @input="ChangeFilal"
          class="hisobotselect"
          v-model="datas.filial_id"
          :reduce="option => option.id"
          label="name"
        />
      </b-col>
      <b-col lg="4" xs="4" md="4" xl="3" class="my-3">
        <b-input v-if="localUser.role == 'Loborant'" v-model="doctors" disabled>
        </b-input>
        <v-select
          :options="names"
          v-model="datas.inspection_category"
          :reduce="option => option.id"
          label="name"
          :placeholder="$t('булимни танланг...')"
          v-else
        />
      </b-col>
      <b-col lg="2" xs="2" md="2" xl="2" class="my-3">
        <button
          type="button"
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
    <table
      class="table table-bordered tablee table-striped table-sm table-hover"
    >
      <tbody>
        <tr class="text-center" style="height: 40px !important">
          <th style="width: 50px !important">№</th>
          <th>{{ $t("Номи") }}</th>
          <th>{{ $t("Сони") }}</th>
          <th>{{ $t("Тушум") }}</th>
          <th>{{ "Текширув Тушум" }}</th>
        </tr>
      </tbody>
      <!-- </table>
    <table
      class="table table-bordered tablee table-striped table-sm table-hover"
    > -->
      <tbody v-for="(item, index) in results" :key="index">
        <tr class="text-center" v-on:dblclick="Clicked(item)">
          <td style="width: 50px !important">{{ index + 1 }}</td>
          <td>
            <span>{{ item["inspection.name"] }}</span>
          </td>
          <td>
            <span>{{ item.count }}</span>
          </td>
          <td>
            <span>{{
              item.total_kirim | numFormat
            }}</span>
          </td>
          <td>
            <span>{{
              item.total_doctor_price | numFormat
            }}</span>
          </td>
        </tr>
      </tbody>
      <!-- </table>
    <table
      class="table table-bordered  table-striped table-hover table-sm"
      id="table"
    > -->
      <tbody>
        <tr class="text-center">
          <td colspan="3" id="jami">
            {{ $t("Жами") }}
          </td>
          <td>
            <span :class="{ reds: jami_sum < 0 }">{{
              jami_sum | numFormat
            }}</span>
          </td>
          <td>
            {{ kirim_summ | numFormat }}
          </td>
        </tr>
      </tbody>
    </table>
  </b-container>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      datas: {
        date1: new Date().toISOString().slice(0, 8) + "01",
        date2: new Date().toISOString().slice(0, 10),
        inspection_category: null,
        filial_id: null
      },
      Filial: [],
      doctors: null,
      names: [],
      jami_sum: 0,
      kirim_summ: 0,
      chiqim_summ: 0,
      doctor: "",
      doctorList: [],
      doctor_sverka: "",
      errors: "",
      results: [],
      index: 0,
      localUser: JSON.parse(localStorage.getItem("user"))
    };
  },
  created() {
    this.datas.filial_id = this.localUser.filial_id
    if (this.localUser.role == "Loborant") {
      if (localStorage.getItem("user") != null) {
        this.datas.inspection_category = this.localUser.inspecton.id;
        this.doctors = this.localUser.inspecton.name;
        // this.Send();
      }
    } else {
      if (localStorage.getItem("inspections") != null) {
        this.datas.inspection_category = parseInt(
          localStorage.getItem("inspections")
        );
        // this.Send();
      }
    }
  },
  methods: {
    Clicked(item) {
      this.datas.inspection_category = item["inspection.id"];
      localStorage.setItem("inspec", JSON.stringify(this.datas));
      // localStorage.setItem("inspection", item["inspection.id"]);
      let route = this.$router.resolve({
        path: "inspection_sverka"
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
        inspection_category: self.datas.inspection_category,
        filial_id: self.datas.filial_id
      };
      axios({
        method: "post",
        url: "hisobot/inspection_hisobot",
        data: datas
      }).then(function(response) {
        self.results = response.data;
        self.kirim_summ = 0;
        self.chiqim_summ = 0;
        self.jami_sum = 0;
        self.results.forEach((key, value) => {
          let sum = 0,
            sum1 = 0;
          if (key.total_chiqim > 0) {
            sum1 += key.total_chiqim * -1;
          }
          sum += key.total_kirim;
          let umumiy = sum + sum1;
          self.jami_sum += umumiy;
          self.chiqim_summ += parseFloat(key.total_chiqim);
          self.kirim_summ += parseFloat(key.total_doctor_price);
          key.date_time = moment(new Date(key.date_time * 1000)).format(
            "YYYY.MM.DD-HH:mm:ss"
          );
        });
      });
    },
    getDoctor() {
      let self = this;
      axios({
        method: "get",
        url: "/inspector_category/all/" + self.datas.filial_id
      }).then(res => {
        self.names = res.data.data;
        // res.data.data.forEach((value, index) => {
        //   self.names.push(value);
        // });
      });
    },
    getFilial(){
      let self = this;
      axios({
        method: "get",
        url: "filial/all/"
      }).then(res => {
        if(res){
          self.Filial = res.data.data
        }
      });
    },
    ChangeFilal(e){
      this.datas.inspection_category = null
      this.getDoctor();
    }
  },
  mounted() {
    this.getDoctor();
    this.getFilial();
  }
};
</script>
<style scoped>
table {
  margin: 0px 0px;
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
#tables {
  min-height: 100vh;
  width: 99% !important;
}
.reds {
  color: red;
}
th {
  color: #195fb0;
  background-color: #f4f7fb;
}
.btn {
  width: 100%;
  height: 100%;
}
.tablee tbody tr th {
  border: 1px solid rgb(209, 208, 208);
}
</style>
