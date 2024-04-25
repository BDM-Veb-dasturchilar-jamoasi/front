<template>
  <b-container fluid id="tables">
    <b-row class="d-flex justify-content-center text-center">
      <b-col lg="3" xs="3" md="3" xl="2" class="my-3">
        <input
          class="form-control ShifokrSverka"
          type="date"
          v-model="datas.date1"
        />
      </b-col>
      <b-col lg="3" xs="3" md="3" xl="2" class="my-3">
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
          style="width: 100%;"
          @input="ChangeFilal"
          class="hisobotselect"
          v-model="datas.filial_id"
          :reduce="option => option.id"
          label="name"
        />
      </b-col>
      <b-col lg="3" xs="4" md="4" xl="3" class="my-3">
        <v-select
          :options="names"
          v-model="datas.doctor_id"
          :disabled="localUser.role == 'Shifokor'"
          :reduce="option => option.id"
          label="name"
          :placeholder="$t('Шифокорни танланг...')"
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
      <table class="table table-bordered table-sm table-striped">
        <tr
          class="bg-dark text-white"
          style="position: sticky; top: 1px; z-index: 1; background: #fff;"
        >
          <th>№</th>
          <th>{{ $t("Номи") }}</th>
          <th>{{ $t("Вақт") }}</th>
          <th>{{ $t("Сони") }}</th>
          <th>{{ $t("Шифокор Сумма") }}</th>
          <th>{{ $t("Сумма") }}</th>
        </tr>
        <!-- <tr>
            <td colspan="4">
              Boshlang'ich qoldiq:
            </td>
            <td colspan="2">
              <span
                :class="{ red: parseInt(results.begin_total) <= 0 }"
                v-if="datas.date1 > datas.date2"
                >{{
                  (results.summ.kirim_cash - results.summ.chiqim_cash) | numFormat
                }}
              </span>
              <span v-else>{{ 0 | numFormat }}</span>
            </td>
          </tr> -->
        <tr
          v-for="(item, index) in results"
          :key="index"
          class="dropdowntr"
          @click="Dropdown(item)"
          v-b-modal="'modal-lg' + index"
        >
          <td>
            {{ index + 1 }}
          </td>
          <td colspan="2">
            <span style="margin-right: 320px"> {{ item.doctor.name }}---
              {{ item.place }}- {{ item.doc_type }}
            </span>
            {{ item.date_time }}
          </td>
          <td>
            {{ item.count }}
          </td>
          <td>
            {{ item.doctor_price | numFormat }}
          </td>
          <td>
            {{ item.all_sum | numFormat }}
          </td>
          <b-modal :id="'modal-lg' + index" size="lg" title="Кўриклар рўйхати" hide-footer>
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
            <b-collapse :id="'collapse' + index" class="mt-2 colleps">
              <b-card style="background: #195FB0;">
                <table
                  class="table  table-bordered table-sm table-striped"
                  style="background: #fff;"
                >
                  <tr
                    @click="Router(itemn)"
                    v-for="(itemn, index) in doctorList"
                    :key="index"
                  >
                    <td>{{ itemn.doc_id }}</td>
                    <td>{{ itemn.place }}</td>
                    <td>{{ itemn.price | numFormat }}</td>
                  </tr>
                </table>

                <!-- <b-collapse class="mt-2" > -->
                <!-- <b-card>{{ itemn.place }}</b-card> -->
                <!-- </b-collapse> -->
              </b-card>
            </b-collapse>
          </b-modal>

          <!-- <ul v-if="Show" class="dropdown">
            <li
              style="height: 30px;"
              v-for="(itemn, index) in doctorList"
              :key="index"
              @click="Router(itemn)"
            >
              <span class="docId">{{ itemn.doc_id }}</span>
              <span class="place">{{ itemn.place }}</span>
              <span class="price">{{ itemn.price }}so'm</span>
            </li>
          </ul> -->
        </tr>
        <!-- <tr
            style="position: sticky; bottom: 34px; z-index: 1; background: #fff;"
          >
            <td colspan="4">Jami</td>
            <td>
              <span v-if="results.summ && datas.date1 <= datas.date2">{{
                results.summ.kirim_cash | numFormat
              }}</span>
            </td>
            <td>
              <span v-if="results.summ && datas.date1 <= datas.date2">{{
                results.summ.chiqim_cash | numFormat
              }}</span>
            </td>
          </tr> -->
        <tr
          style="position: sticky; bottom: 1px; z-index: 1; background: #fff;"
        >
          <td colspan="3">
            {{ $t("Сони") }}
          </td>
          <td>{{ jami }}</td>
          <td>{{ jami_doc_sum | numFormat }}</td>
          <td>{{ jami_sum | numFormat }}</td>
          <!-- <td colspan="2">
              <span :class="{ reds: jam_sum < 0 }" v-if="!results.summ">{{
                beg_sum | numFormat
              }}</span>
              <span :class="{ reds: jam_sum < 0 }" v-else-if="results.summ">{{
                (results.summ.kirim_cash - results.summ.chiqim_cash) | numFormat
              }}</span>
            </td> -->
        </tr>
      </table>
    </div>
  </b-container>
</template>

<script>
import moment from "moment";
import axios from "axios";
export default {
  data() {
    return {
      datas: {
        date1: new Date().toISOString().slice(0, 8) + "01",
        date2: new Date().toISOString().slice(0, 10),
        doctor_id: null,
        filial_id: null
      },
      Filial: [],
      doctor: "",
      doctorList: [],
      results: [],
      names: [],
      fields: [
        "№",
        { key: "doc_id", label: "Дакумент ID" },
        { key: "place", label: "Дакумент" },
        {
          key: "price",
          label: "Сумма",
          formatter: (value, key, item) => {
            let formatter = new Intl.NumberFormat("ru-RU", {
              minimumFractionDigits: 2
            });
            return formatter.format(value);
          }
        }
      ],
      jami_doc_sum: 0,
      jami_sum: 0,
      jam_sum: 0,
      jami: 0,
      Show: false,
      localUser: JSON.parse(localStorage.getItem("user"))
      // select: ""
    };
  },
  created() {
    if (this.localUser.role == "Shifokor") {
      this.datas.doctor_id = this.localUser.doctor.id;
      this.doctor = this.localUser.doctor.name;
    }
    this.datas.filial_id = this.localUser.filial.id;
  },
  beforeRouteLeave(to, from, next) {
    if (localStorage.getItem("doctor") != null) {
    }
    next();
  },
  methods: {
    Dropdown(item) {
      let self = this;
      let datetime1 = 0
      let datetime2 = 0
      datetime1 = parseInt(
          new Date(self.datas.date1)
            .valueOf()
            .toString()
            .slice(0, 10)
        )
        datetime2 =
          parseInt(
            new Date(self.datas.date2)
              .valueOf()
              .toString()
              .slice(0, 10)
          ) + 86399
      axios({
        method: "post",
        url: "/register_doctor/doctorAll",
        data: {
          datetime1: datetime1,
          datetime2: datetime2,
          doctor_id: item.doctor_id
        }
      }).then(res => {
        this.doctorList = res.data;
      });
    },
    Send() {
      let self = this;
      self.jami_sum = 0;
      self.jami_doc_sum = 0;
      // self.jami = 0;
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
        doctor_id: self.datas.doctor_id,
        filial_id: self.datas.filial_id
      };
      axios({
        method: "post",
        url: "register_doctor/doctorCount",
        data: datas
      }).then(function(res) {
        self.jami = 0;
        self.results = res.data;
        if (res.data.length != 0) {
          if (
            self.localUser.role == "Shifokor" ||
            self.localUser.role == "Admin" ||
            self.localUser.role == "Dasturchi" ||
            self.localUser.role == "Kasser"
          ) {
            self.results = res.data;
          }
        } else {
          self.results = [];
        }
        self.results.summ = { kirim_cash: 0, chiqim_cash: 0 };
        self.results.forEach(function(key, value) {
          self.jami += key.count;
          self.jami_doc_sum += parseInt(key.doctor_price);
          self.jami_sum += parseInt(key.all_sum);
          key.date_time = moment(new Date(key.date_time * 1000)).format(
            "YYYY.MM.DD HH:mm:ss"
          );
          if (key.kirim) {
            self.results.summ.kirim_cash += parseInt(key.kirim);
          } else if (key.chiqim != undefined) {
            self.results.summ.chiqim_cash += parseInt(key.chiqim);
          }
        });
      });
    },
    Router(item) {
        let route = this.$router.resolve({
          path: "/arxivone/" + item.doc_id
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
        url: "/doctor/all/" + self.datas.filial_id
      }).then(res => {
        if(res){
          self.names = res.data;
        }
      });
    },
    getFilial(){
      let self = this;
      axios({
        method: "get",
        url: "/filial/all" 
      }).then(res => {
        if(res){
          self.Filial = res.data.data
        }
      });
    },
    ChangeFilal(e){
      this.datas.doctor_id = null
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
.table {
  margin: 0px 0px !important;
}
.dropdowntr {
  position: relative !important;
}
/* .tablesD {
    overflow-y: scroll;
    overflow-x: hidden;
    height: 395px;
    width: 100%;
  } */
.docId,
.price,
.place {
  display: inline-block;
  width: 300px;
}
.colleps {
  position: absolute !important;
  top: 22px;
  left: 0px;
  z-index: 7;
  width: 100%;
}
.colleps .card-body {
  padding: 2px !important;
}
.dropdown {
  position: absolute;
  left: 0px;
  top: 30px;
  background: #e4e4e4;
  list-style: none;
  z-index: 2;
  width: 100%;
}
.dropdown li {
  /* border: 1px solid black; */
  border-bottom: 1px solid black;
  border-left: 1px solid black;
  border-right: 1px solid black;
  padding: 3px;
}
.dropdown li:nth-child(1) {
  border-top: 1px solid black;
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
  text-align: center;
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
