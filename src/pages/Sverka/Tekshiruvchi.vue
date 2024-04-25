<template>
  <b-container fluid id="tables">
    <b-row class="d-flex justify-content-center text-center">
      <b-col lg="2" xs="2" md="2" xl="2" class="my-3">
        <input
          class="form-control ShifokrSverka"
          type="date"
          v-model="datas.datetime1"
        />
      </b-col>
      <b-col  lg="2" xs="2" md="2" xl="2" class="my-3">
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
        </b-col >
      <b-col lg="2" xs="2" md="2" xl="2" class="my-3">
        <input
          class="form-control ShifokrSverka"
          type="date"
          v-model="datas.datetime2"
        />
      </b-col>
      <b-col lg="3" xs="4" md="4" xl="3" class="my-3">
        <!-- {{names}} -->
        <!-- <b-input v-if="localUser.role == 'Shifokor'" v-model="doctor" disabled>
          </b-input> -->
        <v-select
          class="operatsiya-select"
          :disabled="localUser.role == 'Loborant'"
          :options="names"
          v-model="datas.user_id"
          :reduce="option => option.id"
          label="user_name"
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
          <th>{{ $t("Вақт") }}</th>
          <th>{{ $t("Изоҳ") }}</th>
          <th>{{ $t("Кирим") }}</th>
          <th>{{ $t("Чиқим") }}</th>
        </tr>
        <tr>
          <td colspan="4">{{ $t("Бошланғич қолдиқ") }}</td>
          <td colspan="2">{{ begin.begin_price | numFormat }}</td>
        </tr>
        <tr
          v-for="(item, index) in results"
          :key="index"
          v-on:dblclick="Router(item)"
        >
          <td>
            {{ index + 1 }}
          </td>
          <td>
            {{ item.user.user_name }}
          </td>
          <td>
            <span>
              № {{ item.doc_id }} - {{ item.place }}- {{ item.doc_type, " " }}
              {{ item.date_time | dateFormatDD }}
            </span>
          </td>
          <td>
            {{ item.comment }}
          </td>
          <td>
            <span v-if="item.doc_type == 'kirim'">
              {{ item.price | numFormat }}
            </span>
            <span v-else>{{ 0 | numFormat }}</span>
          </td>
          <td>
            <span v-if="item.doc_type != 'kirim'">
              {{ item.price | numFormat }}
            </span>
            <span v-else>{{ 0 | numFormat }}</span>
          </td>
        </tr>
        <tr
          style="position: sticky; bottom: 34px; z-index: 1; background: #fff;"
        >
          <td colspan="4">{{ $t("Жами") }}</td>
          <td>
            {{ end.end_kirim_price | numFormat }}
          </td>
          <td>
            {{ end.end_chiqim_price | numFormat }}
          </td>
        </tr>
        <tr
          style="position: sticky; bottom: 1px; z-index: 1; background: #fff;"
        >
          <td colspan="4">
            {{ $t("Якуний қолдиқ") }}
          </td>
          <td colspan="2">
            {{ end.end_price | numFormat }}
          </td>
        </tr>
      </table>
    </div>
  </b-container>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      datas: {
        datetime1: new Date().toISOString().slice(0, 8) + "01",
        datetime2: new Date().toISOString().slice(0, 10),
        user_id: null,
        filial_id:null
      },
      results: [],
      Filial:[],
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
    if (this.localUser.role == "Loborant") {
      this.datas.user_id = this.localUser.id;
    } else {
      if (JSON.parse(localStorage.getItem("Tekshiruvchi"))) {
        this.datas = JSON.parse(localStorage.getItem("Tekshiruvchi"));
        this.Send();
        localStorage.removeItem("Tekshiruvchi");
      }
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
        user_id: self.datas.user_id,
        filial_id: self.datas.filial_id
      };
      axios({
        method: "post",
        url: "hisobot/labarant_sverka",
        data: datas
      }).then(res => {
        if (res) {
          self.results = res.data.items
          self.end = res.data.end
          self.begin = res.data.begin
        }
      });
    },
    Router(item) {
      if(item.place == 'Oplata'){
        let route = this.$router.resolve({
          path: "oplataDoc/" + item.doc_id
        });
        window.open(route.href, "_blank");
      } else {
        let route = this.$router.resolve({
          path: "/arxivone/" + item.doc_id
        });
        window.open(route.href, "_blank");
      }
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
