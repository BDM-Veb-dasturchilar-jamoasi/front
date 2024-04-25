<template>
  <b-container fluid class="tables1">
    <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
      <div>
        <span class="datepicker-toggle-button">
          <input
            class="form-control ShifokrSverka"
            type="date"
            v-model="datas.date1"
          />
        </span>
      </div>
      <div>
        <input
          class="form-control ShifokrSverka"
          type="date"
          v-model="datas.date2"
        />
      </div>
      <div>
        <v-select
          :options="Filial"
          :disabled="localUser.role != 'Admin'"
          style="width: 250px;"
          @input="ChangeFilal"
          class="hisobotselect"
          v-model="datas.filial_id"
          :reduce="option => option.id"
          label="name"
        />
      </div>
      <div>
        <v-select
          :options="names"
          style="width: 450px;"
          class="hisobotselect"
          :disabled="localUser.role == 'Shifokor'"
          v-model="datas.user_id"
          :reduce="option => option.id"
          label="user_name"
          :placeholder="$t('Ҳодим танланг...')"
        />
      </div>
      <div>
        <button
          class="btn text-white"
          style="background: #195FB0; width: 130px; font-size: 14px; margin-right: 10px;"
          @click="Send()"
        >
          <img
            src="../../../public/Vector.png"
            alt=""
            style="margin-right: 5px"
          />
          {{ $t("Кўриш") }}
        </button>
        <!-- <button
          class="btn text-white"
          style="background: #195FB0; width: 130px; font-size: 14px"
          @click="pechat('table')"
        >
          {{ $t("Печать") }}
        </button> -->
      </div>
    </div>
    <table
      id="table"
      class="table table-bordered tablee table-striped table-sm table-hover"
    >
      <tbody>
        <tr
          class="text-center tbody"
          style="height: 40px !important; line-height: 40px"
        >
          <th style="width: 50px !important">№</th>
          <th>{{ $t("Номи") }}</th>
          <!-- <th>{{ $t("Бош қолдиқ") }}</th> -->
          <!-- <th>{{ $t("Нақт") }}</th> -->
          <!-- <th>{{ $t("Пластик") }}</th> -->
          <!-- <th>{{ $t("Клик") }}</th> -->
          <th>{{ $t("Жами Кирим") }}</th>
          <th>{{ $t("Чиқим") }}</th>
          <th>{{ $t("Ҳодим сумма") }}</th>
        </tr>
      </tbody>
      <tbody v-for="(item, index) in results" :key="index">
        <tr class="text-center" v-on:dblclick="Clicked(item)">
          <td scope="row" style="width: 50px !important">{{ index + 1 }}</td>
          <td>
            <div >
              {{ item.user.user_name }}
            </div>
          </td>
          <!-- <td>
            {{ item.begin_total | numFormat }}
          </td> -->
          <!-- <td>{{ item.total_naqt | numFormat }}</td> -->
          <!-- <td>{{ item.total_Plastik | numFormat }}</td> -->
          <!-- <td>{{ item.total_Click | numFormat }}</td> -->
          <td>
            <span>{{ item.total_kirim | numFormat }}</span>
          </td>
          <!-- <td>{{ item.total_kirim_d | numFormat }}</td> -->
          <td>
            <span>{{ item.total_chiqim | numFormat }}</span>
          </td>
          <td>
            <span>{{   item.total_kirim - item.total_chiqim | numFormat}}</span>
          </td>
          <!-- <td>
            <span :class="{ reds: item.end_total < 0 }">{{
              item.end_total | numFormat
            }}</span>
          </td> -->
        </tr>
      </tbody>
      <tbody>
        <tr class="text-center">
          <td colspan="2" id="jami">
            {{ $t("Жами") }}
          </td>
          <!-- <td>
            <span>{{ bosh_summ | numFormat }}</span>
          </td> -->
          <!-- <td>
            <span>{{ jamiNaqt | numFormat }}</span>
          </td>
          <td>
            <span>{{ jamiPlastik | numFormat }}</span>
          </td>
          <td>
            <span>{{ jamiClik | numFormat }}</span>
          </td> -->
          <td>
            <span>{{ kirim_summ | numFormat }}</span>
          </td>
         
          <td>
            <span>{{ chiqim_summ | numFormat }}</span>
          </td>
          <td>
            <span></span>
          </td>
        </tr>
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
      Deselect: {
        render: createElement => createElement("span", "")
      },
      Filial: [],
      item : [],
      datas: {
        date1: new Date().toISOString().slice(0, 8) + "01",
        date2: new Date().toISOString().slice(0, 10),
        user_id: null,
        filial_id: 1
      },
      localUser: JSON.parse(localStorage.getItem("user")),
      doctors: null,
      summ: 0,
      jamiNaqt: 0,
      jamiPlastik: 0,
      jamiClik: 0,
      names: [],
      bosh_summ: 0,
      kirim_summ: 0,
      chiqim_summ: 0,
      doctor: "",
      doctorList: [],
      doctor_sverka: "",
      errors: "",
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
  methods: {
    Clicked(item) {
      this.datas.user_id = item.user_id;
      localStorage.setItem("datas", JSON.stringify(this.datas));
      // localStorage.setItem("doctor", JSON.stringify(item["doctor.id"]));
      // this.$router.push({ path: "doctor_sverka" });
      // let route = this.$router.resolve({
      //   path: "doctor_sverka"
      // });
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
          user_id: self.datas.user_id,
        filial_id: self.datas.filial_id
      };
      axios({
        method: "post",
        url: "hisobot/hodim_hisobot",
        data: datas
      }).then(function(response) {
        console.log(response)
        self.results = response.data;
        self.jamiNaqt = 0
        self.jamiPlastik = 0
        self.jamiClik = 0
        self.summ = 0;
        self.bosh_summ = 0;
        self.kirim_summ = 0;
        self.chiqim_summ = 0;
        self.results.forEach((key, value) => {
          self.jamiNaqt += parseFloat(key.total_naqt)
          self.jamiPlastik += parseFloat(key.total_Plastik)
          self.jamiClik += parseFloat(key.total_Click)
          // self.bosh_summ += parseFloat(key.begin_total);
          self.kirim_summ += parseFloat(key.total_kirim);
          self.chiqim_summ += parseFloat(key.total_chiqim);
          self.summ += parseFloat(key.total_kirim_d);
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
        url: "/user/all/"
      }).then(res => {
        for (let index = 0; index < res.data.data.length; index++) {
          const element = res.data.data[index];
          if (element.pay_type == "Oylik") {
            self.item.push(element)
          }
        }
        self.names = self.item;
      });
    },
    getFilial(){
      let self = this;
      axios({
        method: "get",
        url: "filial/all" 
      }).then(res => {
        if(res){
          self.Filial = res.data.data
        }
      });
    },
    ChangeFilal(e){
      this.datas.user_id = null
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
.hisobotselect .vs__selected-options span:first-child {
  width: 90% !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  white-space: nowrap !important;
}
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
