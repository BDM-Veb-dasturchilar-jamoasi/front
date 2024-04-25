<template>
  <b-container fluid id="tables">
    <b-row class="d-flex justify-content-center text-center">
      <b-col lg="1" xs="3" md="3" xl="2" class="my-3">
        <input
          class="form-control ShifokrSverka"
          type="date"
          v-model="datas.date1"
        />
      </b-col>
      <b-col lg="1" xs="3" md="3" xl="2" class="my-3">
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
          style="width: 350px;"
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
          :disabled="localUser.role == 'Shifokor'"
          v-model="datas.doctor_id"
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
      <table class="table  table-bordered table-sm table-striped">
        <tr
          class="bg-dark text-white"
          style="position: sticky; top: 1px; z-index: 1; background: #fff;"
        >
          <th>№</th>
          <th>{{ $t("Номи") }}</th>
          <!-- <th>{{ $t("Вақт") }}</th> -->
          <th>{{ $t("Изоҳ") }}</th>
          <th>{{ $t("Нақт") }}</th>
          <th>{{ $t("Пластик") }}</th>
          <th>{{ $t("Клик") }}</th>
          <th>{{ $t("Шифокор сумма") }}</th>
          <th colspan="2">{{ $t("Чиқим") }}</th>
        </tr>
        <tr>
          <td colspan="3">
            {{ $t("Бошланғич қолдиқ") }}
          </td>
          <td colspan="6">
            <span>
              {{ beg_sum | numFormat }}
            </span>
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
          <td>
            <span>
              № {{ item.doc_id }} - {{ item.place }}- {{ item.doc_type }} - {{ item.date_time | dateFormatDD }}
            </span>
          </td>
          <!-- <td>
            {{ item.date_time | dateFormatDD }}
          </td> -->
          <td>
            {{ item.comment }}
          </td>
          <td>
            <span>
              {{ item.naqt | numFormat }}
            </span>
          </td>
          <td>
            <span>
              {{ item.plastik | numFormat }}
            </span>
          </td>
          <td>
            <span>
              {{ item.clik | numFormat }}
            </span>
          </td>
          <td>
            <span>
              {{ item.kirim | numFormat }}
            </span>
          </td>
          <td colspan="2">
            <span>
              {{ item.Chiqim | numFormat }}
            </span>
          </td>
        </tr>
        <tr
          style="position: sticky; bottom: 34px; z-index: 1; background: #fff;"
        >
          <td colspan="3">{{ $t("Жами") }}</td>
          <td colspan="3">{{ end_sum.total_naqt | numFormat }}</td>
          <td>
            <span>{{ end_sum.total_kirim_price | numFormat }}</span>
          </td>
          <td>
            <span>{{ end_sum.total_chiqim_price | numFormat }}</span>
          </td>
        </tr>
        <tr
          style="position: sticky; bottom: 1px; z-index: 1; background: #fff;"
        >
          <td colspan="3">
            {{ $t("Якуний қолдиқ") }}
          </td>
          <td colspan="6">
            <span>{{ end_sum.end_price | numFormat }}</span>
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
        date1: new Date().toISOString().slice(0, 8) + "01",
        date2: new Date().toISOString().slice(0, 10),
        doctor_id: null,
        filial_id: null
      },
      Filial: [],
      doctor: "",
      doctorList: [],
      results: [],
      result: {},
      names: [],
      end_sum: {
        end_price: 0,
        total_chiqim_price: 0,
        total_kirim_price: 0
      },
      beg_sum: 0,
      jam_sum: 0,
      jami: 0,
      localUser: JSON.parse(localStorage.getItem("user"))
      // select: ""
    };
  },
  filters: {
    dateFormatDD: function(date) {
      if (date != null) {
        return moment(new Date(date * 1000)).format("DD.MM.YYYY HH:mm");
      } else {
        return "";
      }
    }
  },
  created() {
    this.datas.filial_id = this.localUser.filial_id;
    if (
      JSON.parse(localStorage.getItem("datas")) &&
      this.localUser.role != "Shifokor"
    ) {
      this.datas = JSON.parse(localStorage.getItem("datas"))
      console.log(this.datas)
      this.Send();
      localStorage.removeItem("datas");
    }
    if (this.localUser.role == "Shifokor") {
      this.datas.doctor_id = this.localUser.doctor.id;
      this.doctor = this.localUser.doctor.name;
    }
  },
  methods: {
    Send() {
      let self = this;
      self.end_sum = {
        end_price: 0,
        total_chiqim_price: 0,
        total_kirim_price: 0
      };
      self.beg_sum = 0;
      self.results = [];
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
        url: "hisobot/doctor_sverka",
        data: datas
      }).then(function(res) {
        self.results = res.data.items;
        self.beg_sum = res.data.begin.begin_price;
        self.end_sum = res.data.end;
      });
    },
    Router(item) {
      if (item.doc_type === "kirim" && this.datas.date1 <= this.datas.date2) {
        let route = this.$router.resolve({
          path: "/arxivone/" + item.doc_id
        });
        window.open(route.href, "_blank");
      } else if (this.datas.date1 <= this.datas.date2) {
        let route = this.$router.resolve({
          path: "oplataDoc/" + item.doc_id
        });
        window.open(route.href, "_blank");
      }
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
