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
          class="operatsiya-select"
          style="width: 400px;"
          :options="names"
          v-model="datas.surgery_id"
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
          <th>{{ $t("Операция сумма") }}</th>
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
            {{ item.surgery.name }}
          </td>
          <td>
            {{ item.count }}
          </td>
          <td>
            {{ item.all_surgery_price | numFormat }}
          </td>
          <td>
            {{ item.all_price | numFormat }}
          </td>
          <!-- <td>
              {{ item.summa | numFormat }}
            </td> -->
        </tr>
        <tr>
          <td colspan="3">
            {{ $t("Жами") }}
          </td>
          <td>
            {{ jami.surgery | numFormat }}
          </td>
          <td>
            {{ jami.all_price | numFormat }}
          </td>
        </tr>
        <tr>
          <td colspan="3">
            {{ $t("Якуний қолдиқ") }}
          </td>
          <td colspan="2">
            {{ jami.all_summa | numFormat }}
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
        surgery_id: null
      },
      jami: {
        surgery: 0,
        all_price: 0,
        all_summa: 0
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
  // beforeRouteLeave(to, from, next) {
  //   if (localStorage.getItem("doctor") != null) {
  //     localStorage.removeItem("doctor");
  //     localStorage.removeItem("date1");
  //     localStorage.removeItem("date2");
  //   }
  //   next();
  // },
  methods: {
    Send() {
      let self = this;
      self.jami = {
        surgery: 0,
        all_price: 0,
        all_summa: 0
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
        surgery_id: self.datas.surgery_id
      };
      axios({
        method: "post",
        url: "hisobot/surgery_hisobot",
        data: datas
      }).then(function(res) {
        if (res) {
          self.results = res.data;
          self.results.forEach(value => {
            self.jami.surgery += value.all_surgery_price;
            self.jami.all_price += value.all_price;
            self.jami.all_summa += value.all_price + value.all_surgery_price;
          });
        }
      });
    },
    Clicked(item) {
      this.datas.surgery_id = item.surgery_id;
      localStorage.setItem("Operatsiya", JSON.stringify(this.datas));
      let route = this.$router.resolve({
        path: "/surgery/sverka"
      });
      window.open(route.href, "_blank");
      // this.$router.push({ path: "/arxivone/" + item.id });
    },
    cancel() {
      window.close();
    },
    getDoctor() {
      let self = this;
      axios({
        method: "get",
        url: "/surgery/all"
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
.operatsiya-select .vs__selected-options span:first-child {
  width: 88% !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  white-space: nowrap !important;
}
.operatsiya-select .vs__selected-options {
  width: 88%;
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
