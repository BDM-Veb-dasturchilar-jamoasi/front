<template>
  <b-container fluid id="tables">
    <b-row class="d-flex justify-content-center text-center">
      <b-col lg="2" xs="2" md="2" xl="2" class="my-3">
        <input
          class="form-control ShifokrSverka"
          type="date"
          v-model="datas.date1"
        />
      </b-col>
      <b-col lg="2" xs="2" md="2" xl="2" class="my-3">
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
          @input="ChangeFilal"
          class="hisobotselect"
          v-model="datas.filial_id"
          :reduce="option => option.id"
          label="name"
        />
      </b-col>
      <b-col lg="2" xs="2" md="2" xl="2" class="my-3">
        <b-input
          v-if="localUser.role == 'Loborant'"
          v-model="doctor_name"
          disabled
        >
        </b-input>
        <v-select
          :options="names"
          v-model="datas.inspection_category"
          :reduce="option => option.id"
          label="name"
          :placeholder="$t('булимни танланг...')"
          v-else
        />
      </b-col>
      <b-col xs="2" md="2" xl="2" class="my-3">
        <button
          type="button"
          class="btn text-white"
          style="background: #195FB0; width: 130px; font-size: 14px"
          @click="Send()"
          :class="{ Pointer: jami != 0 && jam_sum != 0 }"
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
    </b-row>
    <div>
      <table class="table table-bordered table-sm table-striped">
        <tr class="bg-dark text-white">
          <th>№</th>
          <th>{{ $t("Номи") }}</th>
          <th>{{ $t("Вақт") }}</th>
          <th>{{ $t("Изоҳ") }}</th>
          <th>{{ $t("Кирим") }}</th>
          <!-- <th>{{ $t("Чиқим") }}</th> -->
        </tr>
        <!-- <tr>
          <td colspan="4">
            {{ $t("Бошланғич қолдиқ") }}
          </td>
          <td>
            <span>
              {{ beg_sum | numFormat }}
            </span>
          </td>
        </tr> -->
        <tr
          v-for="(item, index) in results"
          :key="index"
          v-on:dblclick="Router(item)"
        >
          <td>
            {{ index + 1 }}
          </td>
          <td colspan="2">
            <span>
              № - {{ item.doc_id }}- {{ item.place }}- {{ item.doc_type }}
            </span>
            {{ item.date_time }}
          </td>
          <td>
            {{ item.comment }}
          </td>
          <td>
            <span>
              {{ item.kirim | numFormat }}
            </span>
          </td>

          <!-- <td>
            <span>
              {{ item.chiqim | numFormat }}
            </span>
          </td> -->
        </tr>
        <tr style="position: sticky; bottom: 1px; z-index: 1; background: #fff;">
          <td colspan="4">
            {{ $t("Якуний қолдиқ") }}
          </td>
          <td :class="{ reds: jami - jam_sum < 0 }">
            <span>{{ end_sum | numFormat }}</span>
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
        date1: null,
        date2: null,
        inspection_category: null,
        filial_id:null
      },
      doctor_name: null,
      doctorList: [],
      Filial: [],
      results: [],
      names: [],
      end_sum: 0,
      beg_sum: 0,
      jam_sum: 0,
      jami: 0,
      localUser: JSON.parse(localStorage.getItem("user"))
      // select: ""
    };
  },
  created() {
    let self = this;
    this.datas.filial_id = this.localUser.filial_id
    if (JSON.parse(localStorage.getItem("inspec")) == null) {
      self.datas.date1 = new Date().toISOString().slice(0, 10);
      self.datas.date2 = new Date().toISOString().slice(0, 10);
    } else {
      self.datas.date1 = JSON.parse(localStorage.getItem("inspec")).date1;
      self.datas.date2 = JSON.parse(localStorage.getItem("inspec")).date2;
      self.datas.inspection_category = JSON.parse(
        localStorage.getItem("inspec")
      ).inspection_category;
      self.Send();
    }
    if (self.localUser.role == "Loborant") {
      if (localStorage.getItem("user") != null) {
        self.datas.inspection_category = self.localUser.inspecton.id;
        self.doctor_name = self.localUser.inspecton.name;
        // self.Send();
      }
    } else {
      if (localStorage.getItem("inspec").inspection_category != null) {
        self.datas.inspection_category = parseInt(
          localStorage.getItem("inspec").inspection_category
        );
        // self.Send();
      }
    }
  },
  methods: {
    Send() {
      let self = this;
      self.end_sum = 0;
      self.beg_sum = 0;
      self.jami = 0;
      self.results = [];
      let d = {
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
        inspection_category: self.datas.inspection_category,
        filial_id: self.datas.filial_id
      };
      axios({
        method: "post",
        url: "hisobot/inspection_sverka",
        data: d
      }).then(function(res) {
        if (res.data.length != 0) {
          for (let key of res.data) {
            if (
              self.localUser.role == "Loborant" &&
              res.data.length != 0 &&
              key.inspection_id == self.localUser.inspecton.id
            ) {
              self.results = res.data;
            } else if (
              (self.localUser.role == "Admin" && res.data.length != 0) ||
              self.localUser.role == "Dasturchi" ||
              self.localUser.role == "Kasser"
            ) {
              self.results = res.data;
            }
            key.date_time = moment(new Date(key.date_time * 1000)).format(
              "YYYY.MM.DD HH:mm:ss"
            );
            self.beg_sum += key.begin_total;
            self.end_sum += key.end_total;
          }
        } else {
          self.results = [];
          self.jami = 0;
        }
      });
    },
    // self.jami = 0;
    Router(item) {
      if (item.doc_type === "kirim" && this.datas.date1 <= this.datas.date2) {
        // this.$router.push({ path: "/arxivone/" + item.doc_id });
        let route = this.$router.resolve({
          path: "/arxivone/" + item.doc_id
        });
        window.open(route.href, "_blank");
      } else if (this.datas.date1 <= this.datas.date2) {
        // this.$router.push({ path: "oplataDoc/" + item.doc_id });
        let route = this.$router.resolve({
          path: "oplataDoc/" + item.doc_id
        });
        window.open(route.href, "_blank");
      }
    },
    cancel() {
      window.close();
    },
    getInspection() {
      let self = this;
      axios({
        method: "get",
        url: "/inspector_category/all/" + self.datas.filial_id
      }).then(res => {
        self.names = res.data.data;
        // res.data.data.forEach((value, index) => {
        //   self.names.push(value);
        // });  
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
    ChangeFilal(e){
      this.datas.inspection_category = null
      this.getInspection();
    }
  },
  mounted() {
    this.getInspection();
    this.getFilial();
  }
};
</script>

<style scoped>
.Pointer {
  pointer-events: none;
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
th {
  color: #195fb0;
  background-color: #f4f7fb;
}
#tables {
  width: 99% !important;
  height: 100vh !important;
}
</style>
