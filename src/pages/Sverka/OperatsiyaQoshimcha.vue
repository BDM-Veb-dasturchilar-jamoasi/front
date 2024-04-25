<template>
  <b-container fluid id="tables">
    <b-row class="d-flex justify-content-center text-center">
      <b-col lg="3" xs="3" md="3" xl="3" class="my-3">
        <input
          class="form-control ShifokrSverka"
          type="date"
          v-model="datas.date1"
        />
      </b-col>
      <b-col lg="3" xs="3" md="3" xl="3" class="my-3">
        <input
          class="form-control ShifokrSverka"
          type="date"
          v-model="datas.date2"
        />
      </b-col>
      <b-col lg="3" xs="4" md="4" xl="4" class="my-3">
        <!-- {{names}} -->
        <!-- <b-input v-if="localUser.role == 'Shifokor'" v-model="doctor" disabled>
          </b-input> -->
        <v-select
          class="operatsiya-select"
          :options="names"
          v-model="datas.category_id"
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
          <th>{{ $t("Номи") }}</th>
          <th>{{ $t("Шифокор") }}</th>
          <th>{{ $t("Вақт") }}</th>
          <th>{{ $t("Изоҳ") }}</th>
          <th>{{ $t("Шифокор сумма") }}</th>
          <th colspan="2">{{ $t("Сумма") }}</th>
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
            {{ item.category.name }}
          </td>
          <td>
            {{ item.doctor.name }}
          </td>
          <td>
            <span>
              № {{ item.doc_id }} - {{ (item.place, " ") }}
              {{ item.date_time | dateFormatDD }}
            </span>
          </td>
          <td>
            {{ item.comment }}
          </td>
          <td>
            <span>
              {{ item.price | numFormat }}
            </span>
          </td>
          <td colspan="2">
            <span>
              {{ item.all_price | numFormat }}
            </span>
          </td>
        </tr>
        <tr
          style="position: sticky; bottom: 34px; z-index: 1; background: #fff;"
        >
          <td colspan="5">{{ $t("Жами") }}</td>
          <td>
            {{ result.total_price | numFormat }}
          </td>
          <td>
            {{ result.total_all_price | numFormat }}
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
        category_id: null
      },
      results: [],
      result: {
        total_price: 0,
        total_all_price: 0
      },
      names: [],
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
    if (this.localUser.role == "Shifokor") {
      if (self.names[0]) {
        self.datas.category_id = self.names[0].doctor_id;
      }
    } else {
      if (JSON.parse(localStorage.getItem("OpQoshim"))) {
        this.datas = JSON.parse(localStorage.getItem("OpQoshim"));
        this.Send();
        // localStorage.removeItem("OpQoshim");
      }
    }
  },
  methods: {
    Send() {
      let self = this;
      self.results = [];
      self.result = {
        total_price: 0,
        total_all_price: 0
      };
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
        category_id: self.datas.category_id
      };
      axios({
        method: "post",
        url: "/hisobot/surgery_category_sverka",
        data: datas
      }).then(res => {
        if (res) {
          self.result = res.data.all;
          self.results = res.data.items;
        }
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
        url: "/surgery_category/all"
      }).then(res => {
        if (self.localUser.role == "Shifokor") {
          res.data.data.forEach(el => {
            if ((el.doctor_id = self.localUser.doctor_id)) {
              self.names.push(el);
            }
          });
        } else {
          self.names = res.data.data;
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
