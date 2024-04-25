<template>
  <b-container fluid id="tables">
    <b-row class="d-flex justify-content-center text-center">
      <b-col lg="3" xs="3" md="3" xl="3" class="my-3">
        <input
          class="form-control ShifokrSverka"
          type="date"
          v-model="datas.datetime1"
        />
      </b-col>
      <b-col lg="3" xs="3" md="3" xl="3" class="my-3">
        <input
          class="form-control ShifokrSverka"
          type="date"
          v-model="datas.datetime2"
        />
      </b-col>
      <b-col lg="3" xs="4" md="4" xl="4" class="my-3">
        <!-- {{names}} -->
        <!-- <b-input v-if="localUser.role == 'Shifokor'" v-model="doctor" disabled>
          </b-input> -->
        <v-select
          class="operatsiya-select"
          :disabled="localUser.role == 'Loborant' || localUser.role == 'Shifokor'"
          :options="names"
          v-model="datas.doctor_id"
          :reduce="option => option.id"
          label="name"
        />
      </b-col>
      <b-col xs="2" md="2" xl="2" class="my-3">
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
        <b-button
          class="navbarBtnDanger ml-3"
          variant="danger"
          @click="cancel()"
        >
          <b-icon icon="x-circle-fill"></b-icon>
        </b-button>
      </b-col>
      <!-- <b-col>
          
        </b-col> -->
    </b-row>
    <div class="tablesD">
      <table class="table  table-bordered table-sm table-striped">
        <tr
          class="bg-dark text-white"
          style="position: sticky; top: 1px; z-index: 1; background: #fff;"
        >
          <th>№</th>
          <th>{{ $t("Ф.И.Ш") }}</th>
          <th>{{ $t("Операция") }}</th>
          <th>{{ $t("Вақт") }}</th>
          <th>{{ $t("Операция сони") }}</th>
          <th>{{ $t("Бемор сони") }}</th>
          <th>{{ $t("Шифокор сумма") }}</th>
          <th>{{ $t("Операция сумма") }}</th>
        </tr>
        <tr
          v-for="(item, index) in results"
          :key="index"
          v-on:dblclick="showModal(item, index)"
        >
          <td>
            {{ index + 1 }}
          </td>
          <td>
            {{ item.doctor_id.name }}
          </td>
          <td>
            {{ item.surgery.name }}
          </td>
          <td>
            <span>
              {{ item.date_time | dateFormatDD }}
            </span>
          </td>
          <td>
            {{ item.surgery_count }}
          </td>
          <td>{{ item.patient_count }}</td>
          <td>{{ item.total_doctor_summa | numFormat }}</td>
          <td>{{ item.total_price | numFormat }}</td>
          <b-modal :id="'modal-lg' + index" size="xl" title="Кўриклар рўйхати" hide-footer>
            <b-table
              id="bemor-table"
              ref="refBemorTable"
              hover
              sort-icon-left
              striped
              primary-key="id"
              :items="doctorList"
              :fields="fields"
              @row-clicked="Router"
              stacked="md"
              show-empty
              small
            >
              <template #cell(№)="data">
                {{ data.index + 1 }}
              </template>
            </b-table>
          </b-modal>
        </tr>
        <!-- <tr
          style="position: sticky; bottom: 34px; z-index: 1; background: #fff;"
        >
          <td colspan="4">{{ $t("Жами") }}</td>
          <td>
            {{ end.end_kirim_price | numFormat }}
          </td>
          <td>
            {{ end.end_chiqim_price | numFormat }}
          </td>
        </tr> -->
      </table>
    </div>
  </b-container>
</template>

<script>
import axios from "axios";
import moment from "moment";
export default {
  data() {
    return {
      datas: {
        datetime1: new Date().toISOString().slice(0, 8) + "01",
        datetime2: new Date().toISOString().slice(0, 10),
        doctor_id: null
      },
      results: [],
      doctorList: [],
      begin: {
        begin_chiqim_price: 0,
        begin_kirim_price: 0,
        begin_price: 0
      },
      end: {
        end_chiqim_price: 0,
        end_kirim_price: 0,
        end_price: 0
      },
      fields: [
        "№",
        { key: "registration_id", label: "Дакумент ID" },
        { key: "surgery.name", label: "Дакумент" },
        // { key: "doctor_summa", label: "Шифокор сумма"},
        { key: "doctor_summa", 
          label: "Шифокор сумма",
          formatter: (value, key, item) => {
            let formatter = new Intl.NumberFormat("ru-RU", {
              minimumFractionDigits: 2
            });
            return formatter.format(value);
          }
        },
        {
          key: "price",
          label: "Операция сумма",
          formatter: (value, key, item) => {
            let formatter = new Intl.NumberFormat("ru-RU", {
              minimumFractionDigits: 2
            });
            return formatter.format(value);
          }
        }
      ],
      names: [],
      localUser: JSON.parse(localStorage.getItem("user"))
      // select: ""
    };
  },
  filters: {
    dateFormatDD: function(date) {
      if (date) {
        return moment.unix(date).format("DD.MM.YYYY HH:mm");
      } else {
        return "";
      }
    }
  },
  created() {
    if (JSON.parse(localStorage.getItem("datas"))) {
      this.datas = JSON.parse(localStorage.getItem("datas"));
      this.Send();
      localStorage.removeItem("datas");
    }
    if(this.localUser.role == 'Shifokor'){
      this.datas.doctor_id = this.localUser.doctor_id
    }
  },
  methods: {
    Send() {
      let self = this;
      self.results = [];

      self.end = {
        end_chiqim_price: 0,
        end_kirim_price: 0,
        end_price: 0
      };
      var datas = {
        datetime1: parseInt(
          new Date(self.datas.datetime1)
            .valueOf()
            .toString()
            .slice(0, 10)
        ),
        datetime2:
          parseInt(
            new Date(self.datas.datetime2)
              .valueOf()
              .toString()
              .slice(0, 10)
          ) + 86399,
        doctor_id: self.datas.doctor_id
      };
      axios({
        method: "post",
        url: "hisobot/each-surgery-by-doctor",
        data: datas
      }).then(res => {
        if (res) {
          // console.log(res.data)
          self.results = res.data
          // self.end = res.data.end
          // self.begin = res.data.begin
        }
      });
    },
    showModal(item, index){
      let self = this
      let x = {
        datetime1: parseInt(
          new Date(self.datas.datetime1)
            .valueOf()
            .toString()
            .slice(0, 10)
        ),
        datetime2: parseInt(
            new Date(self.datas.datetime2)
              .valueOf()
              .toString()
              .slice(0, 10)
          ) + 86399,
        surgery_id: item.surgery.id,
        doctor_id: item.doctor_id
      }
      self.$bvModal.show('modal-lg' + index)
      axios({
        method: 'post',
        url: "hisobot/surgery-by-doctor-sverka",
        data: x
      }).then(res => {
        if (res){
          // console.log(res)
          self.doctorList = res.data
        }
      })
    },
    Router(item) {
      let route = this.$router.resolve({
        path: "/arxivone/" + item.registration_id
      });
      window.open(route.href, "_blank");
    },
    cancel() {
      window.close();
    },
    getDoctor() {
        let self = this;
        axios({
         method: "get",
         url: "/doctor/all"
        }).then(res => {
          if(res){
            self.names = res.data;
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
.table {
  margin: 0px 0px !important;
}
/* .tablesD {
    overflow-y: scroll;
    overflow-x: hidden;
    height: 395px;
    width: 100%;
  } */
label,
td,
th,
tr {
  font-family: "Times New Roman", Times, serif;
  font-weight: bolder;
  text-transform: capitalize;
  font-size: 15px;
  height: 30px !important;
  text-align: center;
}
.operatsiya-select .vs__selected-options span:first-child {
  width: 88% !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  white-space: nowrap !important;
}
.operatsiya-select .vs__selected-options {
  width: 88%;
}
.ShifokrSverka {
  border-radius: 3px;
  background: #fff;
  border: 1px solid rgb(210, 210, 210);
}
.navbarBtnDanger {
  border: 1px solid #fff;
  /* box-shadow: 5px 8px 10px rgba(176, 25, 25, 0.3); */
  background: #e80a18;
  border-radius: 8px;
}
.reds {
  color: red;
}
#tables {
  height: 100vh !important;
  width: 99% !important;
}
th {
  color: #195fb0;
  background-color: #f4f7fb;
}
</style>
