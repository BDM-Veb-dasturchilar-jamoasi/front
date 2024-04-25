<template>
  <b-container fluid id="table">
    <b-row
      style="display: flex; justify-content: space-between; width: 100%; text-align: center; padding: 10px;"
    >
      <div>
        <input
          class="form-control ShifokrSverka"
          type="date"
          v-model="datas.date_to"
        />
      </div>
      <div>
        <input
          class="form-control ShifokrSverka"
          type="date"
          v-model="datas.date_do"
        />
      </div>
      <div>
        <v-select
          style="width: 250px;"
          class="palata-select"
          label="name"
          :options="Category"
          @input="getXona"
          :reduce="option => option.id"
          v-model="datas.category_id"
        />
      </div>
      <div>
        <v-select
          style="width: 250px;"
          class="palata-select"
          label="name"
          :options="Xona"
          @input="getPalata"
          :reduce="option => option.id"
          v-model="datas.xona_id"
        />
      </div>
      <div>
        <v-select
          style="width: 250px;"
          class="palata-select"
          label="name"
          :options="Palata"
          :reduce="option => option.id"
          v-model="datas.palata_id"
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
          <th>{{ $t("Шифокор") }}</th>
          <th>{{ $t("Бемор") }}</th>
          <th style="padding: 0px;">
            <table style="width: 100%;">
              <tr style="width: 100%;">
                <th colspan="4">{{ "Палата" }}</th>
              </tr>
              <tr>
                <th style="width: 40%;">{{ "Палата" }}</th>
                <th style="width: 30%;">{{ "Палата Сумма" }}</th>
                <th style="width: 10%;">{{ "Кун" }}</th>
                <th style="width: 20%;">{{ "Сумма" }}</th>
              </tr>
            </table>
          </th>
          <!-- <th>{{ $t("Вақт") }}</th> -->
          <th>{{ $t("Палата сумма") }}</th>
          <th>{{ "Тўланган сумма" }}</th>
          <th>{{ $t("Шифокор сумма") }}</th>
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
            <div v-if="item.doctor">
              {{ item.doctor.name }}
            </div>
          </td>
          <td>
            <span v-if="item.patient">{{ item.patient.fullname }}</span>
          </td>
          <td style="padding: 0px;">
            <!-- {{ item.palatas }} -->
            <div  style="width: 100%;">
              <table style="width: 100%;">
                <tr v-for="itemPal in item.palatas">
                  <td style="width: 40%;"> {{ itemPal.room_name }} {{ itemPal.name }}</td>
                  <td style="width: 30%;">{{ itemPal.price | numFormat }}</td>
                  <td style="width: 10%;">{{ itemPal.count }}</td>
                  <td style="width: 20%;">{{ itemPal.summa |numFormat }}</td>
                </tr>
              </table>
            </div>
          </td>
          <!-- <td>
            {{ item.date_to | dateFormatDD }} -
            {{ item.date_do | dateFormatDD }}
          </td> -->
          <td>
            {{ item.all_price | numFormat }}
          </td>
          <td>{{ item.registration.pay_summa |numFormat }}</td>
          <td>
            {{ item.all_doctor_price | numFormat }}
          </td>
          <!-- <td>
              {{ item.summa | numFormat }}
            </td> -->
        </tr>
        <tr>
          <td colspan="4">
            {{ $t("Жами") }}
          </td>
          <td>{{ all.all_palata_summa | numFormat }}</td>
          <td>
            {{ all.all_pay_summa | numFormat }}
          </td>
          <td colspan="2">
            <span>{{
              all.all_doctor_summa | numFormat
            }}</span>
            <!-- <span :class="{ reds: jam_sum < 0 }" v-else-if="results.summ">{{
                  (results.summ.kirim_cash + results.summ.chiqim_cash) | numFormat
                }}</span> -->
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
        date_to: new Date().toISOString().slice(0, 8) + "01",
        date_do: new Date().toISOString().slice(0, 10),
        category_id: null,
        xona_id: null,
        palata_id: null
      },
      doctor: "",
      doctorList: [],
      Category: [],
      Xona: [],
      Palata: [],
      results: [],
      names: [],
      all: {
        all_doctor_summa: 0,
        all_pay_summa: 0,
        all_palata_summa: 0
      }
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
    if (JSON.parse(localStorage.getItem("Palata"))) {
      this.datas = JSON.parse(localStorage.getItem("Palata"));
      this.Send();
      this.getPalata(JSON.parse(localStorage.getItem("Palata")).xona_id);
      this.getXona(JSON.parse(localStorage.getItem("Palata")).category_id);
      // localStorage.removeItem("Palata")
    }
  },
  methods: {
    Send() {
      let self = this;
      self.all = {
        all_doctor_summa: 0,
        all_pay_summa: 0,
        all_palata_summa: 0
      }
      let timestamp1 = parseInt(
        new Date(self.datas.date_to)
          .valueOf()
          .toString()
          .slice(0, 10)
      );
      let timestamp2 = parseInt(
        new Date(self.datas.date_do)
          .valueOf()
          .toString()
          .slice(0, 10)
      );
      let obj1 = new Date(timestamp1 * 1000);
      let obj2 = new Date(timestamp2 * 1000);
      obj1.setHours(8, 0, 0, 0);
      obj2.setHours(8, 0, 0, 0);
      var datas = {
        date_to: Math.floor(obj1.getTime() / 1000),
        date_do: Math.floor(obj2.getTime() / 1000),
        category_id: self.datas.category_id,
        xona_id: self.datas.xona_id,
        palata_id: self.datas.palata_id
      };
      axios({
        method: "post",
        url: "hisobot/palata_sverka",
        data: datas
      }).then(function(res) {
        if (res) {
          self.results = res.data.items;
          self.all = res.data.all;
        }
      });
    },
    getCategory() {
      let self = this;
      axios({
        method: "get",
        url: "/palata_category/all"
      }).then(res => {
        if (res) {
          self.Category = res.data.data;
        }
      });
    },
    getXona(id) {
      let self = this;
      axios({
        method: "get",
        url: "/palata_category/xona-by-id/" + id
      }).then(res => {
        if (res) {
          self.Xona = res.data.data;
        }
      });
    },
    getPalata(id) {
      let self = this;
      axios({
        method: "get",
        url: "/xona_etaj/palata-by-id/" + id
      }).then(res => {
        if (res) {
          self.Palata = res.data;
        }
      });
    },
    Clicked(item) {
      let route = this.$router.resolve({
        path: "/arxivone/" + item.registration_id
      });
      window.open(route.href, "_blank");
      // this.$router.push({ path: "/arxivone/" + item.id });
    },
    cancel() {
      window.close();
    }
  },
  mounted() {
    this.getCategory();
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
