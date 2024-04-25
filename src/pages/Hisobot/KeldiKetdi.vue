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
      <div>
        <table class="table table-bordered table-sm table-striped">
          <tr class="bg-dark text-white">
            <th>№</th>
            <th>{{ $t("Ф.И.Ш") }}</th>
            <th>{{ $t("Хизмат тури") }}</th>
            <th></th>
            <th>{{ $t("Сумма") }}</th>
          </tr>
          <tr>
            <td colspan="3">Даволанаётганлар</td>
            <td>{{ progress }}</td>
            <td colspan="2">
              {{ summa }}
            </td>
          </tr>
          <tr>
            <td colspan="3">Кетганлар</td>
            <td>{{ completes }}</td>
          </tr>
          <tr
            v-for="(item, index) in results"
            :key="index"
            :class="{RowColor: item.status == 'waiting'}"
          >
            <td>
              {{ index + 1 }}
            </td>
            <td>
              {{ item.patient.fullname }}
            </td>
            <td>
              {{ item.type_service }}
            </td>
            <td>
              <div v-if="item.status == 'waiting'"> Даволанмоқда </div>
              <div v-if="item.status == 'complate'"> Кетган </div>
            </td>
            <td>
              {{ item.summa }}
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
        datas: {
        datetime1: new Date().toISOString().slice(0, 10),
        datetime2: new Date().toISOString().slice(0, 10)
        },
        names: [],
        results: [],
        localUser: JSON.parse(localStorage.getItem("user")),
        completes: 0,
        progress: 0,
        summa: 0
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
        };
        axios({
          method: "post",
          url: "/hisobot/patient_hisobot",
          data: datas
        }).then(function(res) {
          if (res) {
            self.results = res.data.items;
            self.completes = res.data.result.completes
            self.progress = res.data.result.progress
            self.summa = res.data.result.summa
          }
        });
      },
      cancel() {
        window.close();
      },
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
  .RowColor{
    background: rgba(7, 236, 7, 0.397);
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
  