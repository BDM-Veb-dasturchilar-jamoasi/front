<template>
    <b-container fluid id="tables">
      <b-row
        style="display: flex; justify-content: space-between; width: 100%; text-align: center; padding: 10px;"
      >
        <div class="col-2">
          <input
            class="form-control ShifokrSverka"
            type="date"
            v-model="datas.date1"
          />
        </div>
        <div class="col-2">
          <input
            class="form-control ShifokrSverka"
            type="date"
            v-model="datas.date2"
          />
        </div>
        <div  >
          <v-select
            style="width: 200px;"
            :options="Filial"
            :disabled="localUser.role != 'Admin'"
            @input="ChangeFilal"
            class="hisobotselect"
            v-model="datas.filial_id"
            :reduce="option => option.id"
            label="name"
          />
        </div>
        <div class="tek-bolim">
            <v-select
                :options="names"
                v-model="datas.category_id"
                :reduce="option => option.id"
                label="name"
                :placeholder="$t('булимни танланг...')"
            />
        </div>
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
              <th>{{ $t("Ф.И.Ш") }}</th>
              <th>{{ $t("Туғилган сана") }}</th>
              <th>{{ "Зона обследование" }}</th>
              <th>{{ "Обследование" }}</th>
              <th>{{ "Сумма" }}</th>
            </tr>
            <tr
              v-for="(item, index) in results.surgeries"
              v-on:dblclick="Router(item)"
            >
              <td>
                <span v-if="item.patient">{{ item.patient.fullname }}</span>
            </td>
              <td>
                <span v-if="item.patient">{{ item.patient.birthday | dateFormatDD }}</span>
              </td>
              <td>
              </td>
              <td>
                  {{ item.surgery.name }}
                <!-- {{ item.comment }} -->
              </td>
              <td>
                {{ item.price | numFormat }}
              </td>
            </tr>
            <tr
              v-for="(item, index) in results.palatas"
              v-on:dblclick="Router(item)"
            >
              <td>
                <span v-if="item.patient">{{ item.patient.fullname }}</span>
              </td>
              <td>
                <span v-if="item.patient">{{ item.patient.birthday | dateFormatDD }}</span>
              </td>
              <td>
                {{ item.user.user_name }}
              </td>
              <td>
                  {{ item.palatas.name }} {{ item.count, "Кун" }}
                <!-- {{ item.comment }} -->
              </td>
              <td>
                {{ item.palatas.price | numFormat }}
              </td>
            </tr>
            <tr
              v-for="item in results.cat_doctors"
              v-on:dblclick="Router(item)"
            >
              <td>
                <span v-if="item.patient">{{ item.patient.fullname }}</span>
              </td>
              <td>
                <span v-if="item.patient">{{ item.patient.birthday | dateFormatDD }}</span>
              </td>
              <td>
                  {{ item.name }}
              </td>
              <td>
                <span v-if="item.doctor">{{ item.doctor.name }}</span>
                <!-- {{ item.comment }} -->
              </td>
              <td>
                {{ item.price | numFormat }}
              </td>
            </tr>
            <tr
              v-for="(item, index) in results.inspections"
              v-on:dblclick="Router(item)"
            >
              <td>
                <span v-if="item.patient">{{ item.patient.fullname }}</span>
              </td>
              <td>
                <span v-if="item.patient">{{ item.patient.birthday | dateFormatDD }}</span>
              </td>
              <td>
                {{ item.inspection.name }}
              </td>
              <td>
                  {{ item.category.name }}
                <!-- {{ item.comment }} -->
              </td>
              <td>
                {{ item.price | numFormat }}
              </td>
            </tr>
          </table>
        </div>
      </div>
    </b-container>
  </template>
  
  <script>
  import moment from "moment";
  export default {
    data() {
      return {
        datas: {
          date1: null,
          date2: null,
          category_id: null,
          filial_id:null
        },
        results: {},
        names: [],
        Filial:[],
        localUser: JSON.parse(localStorage.getItem("user"))
      };
    },
    filters: {
      dateFormatDD: function(date) {
        if (date) {
          return moment.unix(date).format("YYYY");
        } else {
          return "";
        }
      }
    },
    created() {
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
         category_id: self.datas.category_id,
         filial_id: self.datas.filial_id,

        };
        axios({
          method: "post",
          url: "hisobot/patient_revision",
          headers: {
            "Content-Type": "application/json"
          },
          data: datas
        }).then(function(response) {
          if (response) {
            self.results = response.data
          }
        });
      },
      cancel() {
        window.close();
      },
      Router(item) {
        // this.$router.push({path: '/arxivone/' + item.doctor_id})
        // let route = this.$router.resolve({
        //   path: "/arxivone/" + item.registration_id
        // });
        // window.open(route.href, "_blank");
      },
      getInspection() {
          let self = this;
          axios({
              method: "get",
              url: `/inspector_category/all/` + JSON.parse(localStorage.getItem("user")).filial_id
          }).then(res => {
              if(res){
                  self.names = res.data.data;
              }
          });
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

            const date = moment.unix(new Date().getTime() / 1000).format("DD MM YYYY__HH mm");
            const fileName = `Курик_${date}.xlsx`;
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
        ChangeFilal(e){
          this.datas.inspection_category = null
          let self = this;
          axios({
              method: "get",
              url: `/inspector_category/all/` + e
          }).then(res => {
              if(res){
                  self.names = res.data.data;
              }
          });
        }
    },
    mounted() {
        this.getInspection()
        this.getFilial();
    }
  };
  </script>
  
  <style scoped>
  .reds {
    color: red;
  }
  .tek-bolim{
    width: 300px;
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
  