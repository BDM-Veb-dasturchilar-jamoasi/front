<template>
  <b-container fluid id="table">
    <b-row
      style="display: flex; justify-content: space-between; width: 100%; text-align: center; padding: 10px;"
    >
      <div>
        <input
          class="form-control ShifokrSverka"
          type="date"
          v-model="datas.date1"
        />
      </div>
      <div>
        <input
          class="form-control ShifokrSverka"
          type="date"
          v-model="datas.date2"
        />
      </div>
      <div>
        <v-select
          style="width: 400px;"
          class="operatsiya-select"
          :options="names"
          v-model="datas.category_id"
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
      <!-- <div>
          <b-button
            class="navbarBtnDanger ml-3"
            variant="danger"
            @click="cancel()"
          >
            <b-icon icon="x-circle-fill"></b-icon>
          </b-button>
        </div> -->
    </b-row>
    <div>
      <table class="table table-bordered table-sm table-striped">
        <tr class="bg-dark text-white">
          <th>№</th>
          <th>{{ $t("Номи") }}</th>
          <!-- <th>{{ $t('Вақт') }}</th> -->
          <th>{{ $t("Сони") }}</th>
          <th>{{ $t("Шифокор сумма") }}</th>
          <th>{{ $t("Операция қошимчалари") }}</th>
          <!-- <th>{{ $t('Сумма') }}</th> -->
        </tr>
        <tr
          v-for="(item, index) in results"
          :key="index"
          v-on:dblclick="Clicked(item)"
        >
          <td>
            {{ index + 1 }}
          </td>
          <td>
            {{ item.category.name }}
          </td>
          <td>
            {{ item.count }}
          </td>
          <td>
            {{ item.total_price | numFormat }}
          </td>
          <td>
            {{ item.total_all_price | numFormat }}
          </td>
          <!-- <td>
              {{ item.summa | numFormat }}
            </td> -->
        </tr>
        <tr>
          <td colspan="2">
            {{ $t("Жами") }}
          </td>
          <td>
            {{ jami.total_count }}
          </td>
          <td>
            {{ jami.total_price | numFormat }}
          </td>
          <td>
            {{ jami.total_all_price | numFormat }}
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
      jami: {
        total_all_price: 0,
        total_count: 0,
        total_price: 0
      },
      names: [],
      results: [],
      localUser: JSON.parse(localStorage.getItem("user"))
      // select: ""
    };
  },
  created() {
    // let self = this;
    // if (localStorage.getItem("MedDirect") != null) {
    //   self.datas.date1 = JSON.parse(localStorage.getItem("MedDirect")).date1;
    //   self.datas.date2 = JSON.parse(localStorage.getItem("MedDirect")).date2;
    //   self.datas.direct_id = JSON.parse(
    //     localStorage.getItem("MedDirect")
    //   ).direct_id;
    //   self.Send();
    // } else {
    //   elf.datas.date1 = new Date().toISOString().slice(0, 10);
    //   self.datas.date2 = new Date().toISOString().slice(0, 10);
    // }
  },
  methods: {
    Send() {
      let self = this;
      self.jami = {
        total_all_price: 0,
        total_count: 0,
        total_price: 0
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
        url: "hisobot/surgery_category_hisobot",
        data: datas
      }).then(function(res) {
        if (res) {
          self.results = res.data.items;
          self.jami = res.data.all;
        }
      });
    },
    Clicked(item) {
      this.datas.category_id = item.category.id;
      localStorage.setItem("OpQoshim", JSON.stringify(this.datas));
      let route = this.$router.resolve({
        path: "/surgery/qoshimcha/sverka"
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
