<template>
  <b-container fluid id="tables">
    <b-row
      style="display: flex; justify-content: space-between; width: 100%; text-align: center; padding: 10px;"
    >
      <div class="col-3">
        <input
          class="form-control ShifokrSverka"
          type="date"
          v-model="datas.date1"
        />
      </div>
      <div class="col-3">
        <input
          class="form-control ShifokrSverka"
          type="date"
          v-model="datas.date2"
        />
      </div>
      <div  >
          <v-select
            :options="Filial"
            :disabled="localUser.role != 'Admin'"
            @input="ChangeFilal"
            class="hisobotselect"
            v-model="datas.filial_id"
            :reduce="option => option.id"
            label="name"
            style="width: 200px;"
          />
      </div >
      <div>
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
        <button
            class="btn text-white"
            style="background: #195FB0; width: 130px; margin-left: 10px; font-size: 14px"
            @click="downloadTable"
        >
            Юклаш 
        </button>
        <!-- <button @click="downloadTable">Download Table as Excel</button> -->
      </div>
      <div>
        <b-button
          class="navbarBtnDanger ml-3"
          variant="danger"
          @click="cancel()"
        >
          <b-icon icon="x-circle-fill"></b-icon>
        </b-button>
      </div>
    </b-row>
    <div id="table-container">
      <div class="tablesD">
        <table id="my-table" class="table  table-bordered table-sm table-striped">
          <tr class="bg-dark text-white">
            <th rowspan="2" style="width: 30px !important">#</th>
            <th rowspan="2" colspan="2">Номи</th>
            <th rowspan="2">
              {{ $t("Вақт") }}
            </th>
            <th rowspan="2">
              {{ $t("Ф.И.Ш") }}
            </th>
            <th rowspan="2">
              {{ $t("Изоҳ") }}
            </th>
            <th colspan="2">{{ $t("Нақт") }}</th>
            <th colspan="2">{{ $t("Пластик") }}</th>
            <th colspan="2">{{ "Click" }}</th>
          </tr>
          <tr class="bg-dark text-white">
            <th>{{ $t("Кирим") }}</th>
            <th style="background-color: red; color: #fff;">{{ $t("Чиқим") }}</th>
            <th>{{ $t("Кирим") }}</th>
            <th style="background-color: red; color: #fff;">{{ $t("Чиқим") }}</th>
            <th>{{ $t("Кирим") }}</th>
          </tr>
          <tr style="background-color: rgb(165, 187, 40);">
            <td colspan="6">
              {{ $t("Бошланғич қолдиқ") }}
            </td>
            <td colspan="2">
              <span>{{ begin.end_total_naqt | numFormat }}</span>
            </td>
            <td colspan="2">
              <span>{{ begin.end_total_plastik | numFormat }}</span>
            </td>
            <td colspan="2">
              <span>{{ begin.end_total_clik | numFormat }}</span>
            </td>
          </tr>
          <tr
            v-for="(item, index) in results"
            :key="index"
            v-on:dblclick="Router(item)"
          >
            <td>
              {{ index + 1 }}
            </td>
            <td colspan="2">№{{ item.doc_type }} - {{ item.place }}</td>

            <td>
              {{ item.date_time | dateFormatDD }}
            </td>
            <td>
              <span
                v-if="
                  item.registration != null &&
                    (item.place == 'registration' || item.place == 'uplata')
                "
              >
                <!-- {{ item }} -->
                <!-- {{ item.registration.patient.fullname }} -->
              </span>
              <span v-else> </span>
            </td>
            <td>
              {{ item.comment }}
            </td>
            <td>
              <span>
                {{ item.kirim_naqt | numFormat }}
              </span>
            </td>
            <td style="background-color: red; color: #fff;">
              <span>
                {{ item.Chiqim_naqt | numFormat }}
              </span>
            </td>
            <td>
              <span>
                {{ item.kirim_plastik | numFormat }}
              </span>
            </td>
            <td style="background-color: red; color: #fff;">
              <span>
                {{ item.Chiqim_plastik | numFormat }}
              </span>
            </td>
            <td>
              {{ item.klik | numFormat }}
            </td>
          </tr>
          <tbody style="position: sticky; bottom: 1px; z-index: 1; background: #fff;">
            <tr style="background-color: rgb(34, 182, 91); color: #fff;">
              <td colspan="6">{{ $t("Жами") }}</td>
              <td>
                <span>{{ Jami.naqt_kirim | numFormat }}</span>
              </td>
              <td style="background-color: red; color: #fff;">
                <span>{{ Jami.naqt_chiqim | numFormat }}</span>
              </td>
              <td>
                <span>{{ Jami.plas_kirim | numFormat }}</span>
              </td>
              <td style="background-color: red; color: #fff;">
                <span>{{ Jami.plas_chiqim | numFormat }}</span>
              </td>
              <td>
                {{ Jami.click | numFormat }}
              </td>
            </tr>
            <tr style="background-color: rgb(12, 150, 65); color: #fff;">
              <td colspan="6">{{ $t("Жами кирим") }}</td>
              <td colspan="5">{{ (Jami.naqt_kirim+Jami.plas_kirim+Jami.click) | numFormat }}</td>
              <!-- <td></td> -->
            </tr>
            <tr style="background-color: rgb(12, 124, 55); color: #fff;">
              <td colspan="6">
                {{ $t("Якуний қолдиқ") }}
              </td>
              <td colspan="2">
                <span>{{ end.end_total_naqt | numFormat }}</span>
              </td>
              <td colspan="2">
                <span>{{ end.end_total_plastik | numFormat }}</span>
              </td>
              <td colspan="2">
                <span>{{ end.end_total_clik | numFormat }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </b-container>
</template>

<script>
import moment from "moment";
// import XLSX from 'xlsx';
// import { read, writeFileXLSX } from "./xlsx.mjs";
// import { set_cptable } from "./xlsx.mjs";
// import * as cptable from './dist/cpexcel.full.mjs';
// set_cptable(cptable);
export default {
  data() {
    return {
      datas: {
        date1: null,
        date2: null,
        filial_id:null
      },
      begin: {
        end_total_naqt: 0,
        end_total_plastik: 0,
        end_total_clik: 0
      },
      end: {
        end_total_naqt: 0,
        end_total_plastik: 0,
        end_total_clik: 0
      },
      Jami: {
        naqt_kirim: 0,
        naqt_chiqim: 0,
        plas_kirim: 0,
        plas_chiqim: 0,
        click: 0
      },
      results: {},
      names: [],
      Filial:[],
      localUser: JSON.parse(localStorage.getItem("user"))
    };
  },
  filters: {
    dateFormatDD: function(date) {
      if (date != null) {
        return moment.unix(date).format("DD.MM.YYYY HH:mm");
      } else {
        return "";
      }
    }
  },
  created() {
    this.datas.filial_id = localStorage.getItem("filial_id");
    let self = this;
    if (JSON.parse(localStorage.getItem("datas")) == null) {
      self.datas.date1 = new Date().toISOString().slice(0, 10);
      self.datas.date2 = new Date().toISOString().slice(0, 10);
    } else {
      self.datas.date1 = JSON.parse(localStorage.getItem("datas")).date1;
      self.datas.date2 = JSON.parse(localStorage.getItem("datas")).date2;
      localStorage.removeItem("datas");
    }
  },

  methods: {
    Send() {
      let self = this;
      self.Jami = {
        naqt_kirim: 0,
        naqt_chiqim: 0,
        plas_kirim: 0,
        plas_chiqim: 0,
        click: 0
      };
      var datas = {
        filial_id:self.datas.filial_id,
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
          ) + 86399
      };
      axios({
        method: "post",
        url: "hisobot/kassa_sverka",
        headers: {
          "Content-Type": "application/json"
        },
        data: datas
      }).then(function(response) {
        if (response) {
          self.begin = response.data.begin;
          self.end = response.data.end;
          response.data.items.forEach(el => {
            self.Jami.naqt_kirim += el.kirim_naqt;
            self.Jami.naqt_chiqim += el.Chiqim_naqt;
            self.Jami.plas_kirim += el.kirim_plastik;
            self.Jami.plas_chiqim += el.Chiqim_plastik;
            self.Jami.click += el.klik;
          });
          self.results = response.data.items;
          self.filial_id = response.data.filial_id;
        }
      });
    },
    cancel() {
      window.close();
    },
    Router(item) {
      if (item.doc_type === "Kirim" && this.datas.date1 <= this.datas.date2) {
        // this.$router.push({path: '/arxivone/' + item.doctor_id})
        let route = this.$router.resolve({
          path: "/arxivone/" + item.doctor_id
        });
        window.open(route.href, "_blank");
      } else if (item.place == "supplier") {
        let route = this.$router.resolve({
          path: "/provider/pay/update/" + item.doctor_id
        });
        window.open(route.href, "_blank");
      } else if (
        (item.pay_type === "naqt" || item.pay_type === "plastik") &&
        this.datas.date1 <= this.datas.date2
      ) {
        // this.$router.push({path: 'KassaDoc/' + item.doctor_id})
        let route = this.$router.resolve({
          path: "KassaDoc/" + item.doctor_id
        });
        window.open(route.href, "_blank");
      } else if (this.datas.date1 <= this.datas.date2) {
        // this.$router.push({path: 'oplataDoc/' + item.doctor_id})
        let route = this.$router.resolve({
          path: "oplataDoc/" + item.doctor_id
        });
        window.open(route.href, "_blank");
      }
    },
      tableToSheetData(table) {
          const rows = table.querySelectorAll('tr');
          const data = [];

          for (const row of rows) {
            const rowData = [];
            const cells = row.querySelectorAll('td, th');

            for (const cell of cells) {
              rowData.push(cell.innerText);
            }

            data.push(rowData);
          }

          return data;
        },
        async downloadTable() {
          try {
            // Dynamically load XLSX module
            const XLSX = await import(/* webpackChunkName: "xlsx" */ 'xlsx');

            const tableContainer = document.getElementById('table-container');
            const table = document.getElementById('my-table');
            const sheetData = this.tableToSheetData(table);

            const workbook = XLSX.utils.book_new();
            const worksheet = XLSX.utils.aoa_to_sheet(sheetData);
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Table Data');

            const excelData = XLSX.write(workbook, { bookType: 'xlsx', type: 'binary' });

            const date = new Date().toISOString().slice(0, 19).replace(/[-T]/g, "");
            const fileName = `table_data_${date}.xlsx`;
            const blob = new Blob([this.s2ab(excelData)], { type: 'application/octet-stream' });

            if (navigator.msSaveBlob) {
              navigator.msSaveBlob(blob, fileName);
            } else {
              const link = document.createElement('a');
              link.href = URL.createObjectURL(blob);
              link.download = fileName;
              link.click();
            }
          } catch (error) {
            console.error('Error loading XLSX module:', error);
          }
        },
        s2ab(s) {
          const buf = new ArrayBuffer(s.length);
          const view = new Uint8Array(buf);
          for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
          return buf;
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
      // url: "user/byName?filial_id=1"
    ChangeFilal(e){
        let self = this;
        this.datas.filial_id = e
        axios({
        method: "post",
        url: "hisobot/kassa_sverka",
        headers: {
          "Content-Type": "application/json"
        },
        data: datas
      }).then(function(response) {
        if (response) {
          self.begin = response.data.begin;
          self.end = response.data.end;
          response.data.items.forEach(el => {
            self.Jami.naqt_kirim += el.kirim_naqt;
            self.Jami.naqt_chiqim += el.Chiqim_naqt;
            self.Jami.plas_kirim += el.kirim_plastik;
            self.Jami.plas_chiqim += el.Chiqim_plastik;
            self.Jami.click += el.klik;
          });
          self.results = response.data.items;
          self.filial_id = response.data.filial_id;
        }
      });
    }
  },
  mounted() {
    this.getFilial();
  }
};
</script>

<style scoped>
.reds {
  color: red;
}
.tablesD {
  /* overflow-y: scroll; */
  /* overflow-x: hidden; */
  /* height: 395px; */
  width: 100%;
}
#y1 {
  width: 80px !important;
}
table {
  margin: 0px;
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
.reds {
  color: red;
}
#tables {
  text-align: center;
  width: 99% !important;
  height: 100vh !important;
}
th {
  color: #195fb0;
  background-color: #f4f7fb;
}
</style>
