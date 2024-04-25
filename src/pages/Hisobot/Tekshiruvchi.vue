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
            @input="ChangeFilal"
            class="hisobotselect"
            v-model="datas.filial_id"
            :reduce="option => option.id"
            label="name"
            style="width: 200px;"
          />
        </div>
        <div>
          <v-select
            style="width: 400px;"
            :disabled="localUser.role == 'Loborant'"
            class="operatsiya-select"
            :options="names"
            v-model="datas.user_id"
            :reduce="option => option.id"
            label="user_name"
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
            <th>{{ $t("Сони") }}</th>
            <th>{{ $t("Нақт") }}</th>
            <th>{{ $t("Пластик") }}</th>
            <th>{{ $t("Клик") }}</th>
            <th>{{ $t("Жами кирим") }}</th>
            <th>{{ $t("Шифокор сумма") }}</th>
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
              {{ item.user.user_name }}
            </td>
            <td>{{ item.count }}</td>
            <td>
              {{ item.naqt | numFormat }}
            </td>
            <td>
              {{ item.plastik | numFormat }}
            </td>
            <td>
              {{ item.click | numFormat }}
            </td>
            <td>
              {{ item.all_price | numFormat }}
            </td>
            <td>
              {{ item.doctor_price | numFormat }}
            </td>
          </tr>
          <tr>
            <td colspan="2">
              {{ $t("Жами") }}
            </td>
            <td>
              {{ all.count }}
            </td>
            <td>
              {{ all.naqt | numFormat }}
            </td>
            <td>
              {{ all.plastik | numFormat }}
            </td>
            <td>
              {{ all.click | numFormat }}
            </td>
            <td>
              {{ all.all_price | numFormat }}
            </td>
            <td>
              {{ all.doctor_price | numFormat }}
            </td>
          </tr>
        </table>
      </div>
    </b-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        Filial:[],
        datas: {
        datetime1: new Date().toISOString().slice(0, 8) + "01",
        datetime2: new Date().toISOString().slice(0, 10),
        user_id: null,
        filial_id:null
        },
        all: {
          count: 0,
          all_price: 0,
          doctor_price: 0,
          naqt: 0,
          plastik: 0,
          click: 0
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
        if(this.localUser.role == "Loborant"){
            this.datas.user_id = this.localUser.id;
        }
    },
    methods: {
      Send() {
        let self = this;
        self.all = {
            count: 0,
            all_price: 0,
            doctor_price: 0,
            naqt: 0,
            plastik: 0,
            click: 0
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
          user_id: self.datas.user_id,
          filial_id: self.datas.filial_id
        };
        axios({
          method: "post",
          url: "/hisobot/labarant_hisobot",
          data: datas
        }).then(function(res) {
          if (res) {
            self.results = res.data.items;
            self.all = res.data.all;
          }
        });
      },
      Clicked(item) {
        this.datas.user_id = item.user.id;
        localStorage.setItem("Tekshiruvchi", JSON.stringify(this.datas));
        let route = this.$router.resolve({
          path: "/tekshiruvchi_sverka"
        });
        window.open(route.href, "_blank");
      },
      cancel() {
        window.close();
      },
      getTekshiruvchi() {
        let self = this;
        axios({
            method: "get",
            url: "/user/all"
        }).then(res => {
            res.data.data.forEach(el => {
            if (el.role == "Loborant") {
                self.names.push(el);
            }
            });
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
      // url: "user/byName?filial_id=1"
      ChangeFilal(e){
        this.datas.user_id = null
        this.getTekshiruvchi();
        let self = this;
        axios({
            method: "get",
            url: `user/byName?filial_id=${e}`
        }).then(res => {
          console.log(res)
            self.names = []
            res.data.data.forEach(el => {
              
            if (el.role == "Loborant") {
                self.names.push(el);
            }
            });
        });
    }
    },
    mounted() {
      this.getTekshiruvchi();
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
  