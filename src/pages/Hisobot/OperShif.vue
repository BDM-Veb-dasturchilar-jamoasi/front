<template>
    <b-container fluid id="table">
      <b-row
        style="display: flex; justify-content: space-between; width: 100%; text-align: center; padding: 10px;"
      >
        <div>
          <input
            class="form-control ShifokrSverka"
            type="date"
            v-model="datas.datetime1"
          />
        </div>
        <div>
          <input
            class="form-control ShifokrSverka"
            type="date"
            v-model="datas.datetime2"
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
            style="width: 350px;"
            :disabled="localUser.role == 'Loborant' || localUser.role == 'Shifokor'"
            class="operatsiya-select"
            :placeholder="$t('Шифокорни танланг...')"
            :options="names"
            v-model="datas.doctor_id"
            :reduce="option => option.id"
            label="name"
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
        </div>
      </b-row>
      <div>
        <table class="table table-bordered table-sm table-striped">
          <tr class="bg-dark text-white">
            <th>№</th>
            <th>{{ $t("Ф.И.Ш") }}</th>
            <th>{{ $t("Операция сони") }}</th>
            <th>{{ $t("Бемор сони") }}</th>
            <th>{{ $t("Шифокор сумма") }}</th>
            <th>{{ $t("Операция сумма") }}</th>
          </tr>
          <!-- <tr>
            <td colspan="2">{{ $t('Бошланғич қолдиқ') }}</td>
            <td>{{ begin.begin_price }}</td>
          </tr> -->
          <tr
            v-for="(item, index) in results"
            :key="index"
            v-on:dblclick="Clicked(item)"
          >
            <td>
              {{ index + 1 }}
            </td>
            <td>
              {{ item.doctor.name }}
            </td>
            <td>{{ item.surgery_count }}</td>
            <td>{{ item.patient_count }}</td>
            <td>
              {{ item.total_doctor_summa | numFormat }}
            </td>
            <td>
              {{ item.total_price | numFormat }}
            </td>
          </tr>
          <!-- <tr>
            <td colspan="2">
              {{ $t("Жами") }}
            </td>
            <td>
              {{ all.count }}
            </td>
            <td>
              {{ all.doctor_price | numFormat }}
            </td>
            <td>
              {{ all.all_price | numFormat }}
            </td>
          </tr> -->
        </table>
      </div>
    </b-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        datas: {
        datetime1: new Date().toISOString().slice(0, 8) + "01",
        datetime2: new Date().toISOString().slice(0, 10),
        doctor_id: null,
        filial_id: null,
        },
        Filial: [],
        all: {
            count: 0,
            all_price: 0,
            doctor_price: 0
        },
        begin: {
            begin_price: 0
        },
        names: [],
        results: [],
        localUser: JSON.parse(localStorage.getItem("user"))
        // select: ""
      };
    },
    created() {
      this.datas.filial_id = this.localUser.filial_id
        if(this.localUser.role == "Loborant" || this.localUser.role == 'Shifokor'){
            this.datas.doctor_id = this.localUser.doctor_id;
        }
    },
    methods: {
      Send() {
        let self = this;
        self.all = {
            count: 0,
            all_price: 0,
            doctor_price: 0
        }
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
          doctor_id: self.datas.doctor_id,
          filial_id: self.datas.filial_id
        };
        axios({
          method: "post",
          url: "/hisobot/surgery-by-doctor",
          data: datas
        }).then(function(res) {
          if (res) {
            self.results = res.data;
            // self.all = res.data.all;
          }
        });
      },
      Clicked(item) {
        this.datas.doctor_id = item.doctor_id;
        localStorage.setItem("datas", JSON.stringify(this.datas));
        let route = this.$router.resolve({
          path: "/shif/oper/son/sverka"
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
        url: "filial/all" 
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
  #table {
    height: 100vh;
    width: 99% !important;
  }
  .table {
    margin: 0px 0px !important;
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
  .operatsiya-select .vs__selected-options span:first-child {
    width: 88% !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
    white-space: nowrap !important;
  }
  .operatsiya-select .vs__selected-options {
    width: 88%;
  }
  .navbarBtnDanger {
    border: 1px solid #fff;
    /* box-shadow: 5px 8px 10px rgba(176, 25, 25, 0.3); */
    background: #e80a18;
    border-radius: 8px;
  }
  .ShifokrSverka {
    border-radius: 3px;
    background: #fff;
    border: 1px solid rgb(210, 210, 210);
  }
  .reds {
    color: red;
  }
  th {
    color: #195fb0;
    background-color: #f4f7fb;
  }
  </style>
  