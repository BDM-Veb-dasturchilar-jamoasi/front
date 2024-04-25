<template>
  <div :class="{ kasallikT: $store.state.kasTar }">
    <div style="padding: 20px; width: 100%;">
      <div style="display: flex; justify-content: space-between; width: 100%;">
        <div style="width: 20%">
          <input
            class="form-control ShifokrSverka"
            type="date"
            v-model="palata.date_to"
          />
        </div>
        <div style="width: 20%">
          <input
            class="form-control ShifokrSverka"
            type="date"
            v-model="palata.date_do"
          />
        </div>
        <div>
          <v-select
            style="width: 250px;"
            class="palata-select"
            label="name"
            :options="Category"
            :reduce="option => option.id"
            v-model="palata.category_id"
          />
        </div>
        <!-- <div>
          <v-select
            style="width: 250px;"
            class="palata-select"
            label="name"
            :options="Xona"
            :reduce="option => option.id"
            v-model="palata.xona_id"
          />
        </div> -->
        <button class="navbarBtn" @click="getPalata">
          {{ $t("Кўриш") }}
        </button>
        <b-button
          class="navbarBtnDanger ml-3"
          variant="danger"
          @click="cancel()"
        >
          <b-icon icon="x-circle-fill"></b-icon>
        </b-button>
      </div>
      <div>
        <div>
          <div
            class="palata-category"
            v-for="(itemCat, indCat) in itemsPalata"
            :key="indCat"
          >
            <div class="palata-name">
              {{ itemCat.name }}
            </div>
            <div style="display: flex; flex-wrap: wrap;">
              <div
                class="palata-xona"
                v-for="(itemXona, indXona) in itemCat.xona"
                :key="indXona"
              >
                <div class="p-x-name">
                  <div>{{ itemXona.name }}</div>
                </div>
                <div
                  :class="{ palataStatus: itemPal.status }"
                  class="palata-palata"
                  v-for="(itemPal, indPal) in itemXona.palata"
                  :key="indPal"
                >
                  <div style="width: 100%;">
                    <div style="width: 100%;">
                      <div
                        style="font-size: 16px; font-weight: 600; display: flex; justify-content: space-between; cursor: pointer;"
                        v-on:dblclick="
                          RowClickedPalata(
                            itemPal,
                            itemCat.id,
                            itemXona.id,
                            itemXona.name
                          )
                        "
                      >
                        <div style="font-size: 16px; font-weight: 600;">
                          {{ itemPal.name }}
                        </div>
                        <div>
                          {{ itemPal.total_price | numFormat }}
                        </div>
                        <!-- <b-button
                            v-if="!itemPal.status"
                            @click="RowClickedPalata(itemPal, itemCat.id, itemXona.id, itemXona.name)"
                            class="navbarBtn"
                            variant="primary"
                          >
                          +
                          </b-button> -->
                      </div>
                      <div style="width: 100%;"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import moment from "moment";
export default {
  props: ["registration_palata", "hospital_summa", "backlog", "modalId"],
  components: {
    DatePicker
  },
  data() {
    return {
      lang: {
        formatLocale: {
          firstDayOfWeek: 1
        },
        monthBeforeYear: false
      },
      comment: "",
      User: [],
      Category: [],
      Xona: [],
      vaqt: 0,
      palata: {
        date_to: new Date().toISOString().slice(0, 8) + "01",
        date_do: new Date().toISOString().slice(0, 10),
        category_id: null,
        xona_id: null
      },
      itemsPalata: []
    };
  },
  filters: {
    dateFormatDD: function(date) {
      if (date != null) {
        return moment.unix(date).format("DD.MM.YYYY HH:mm");
      } else {
        return "";
      }
    }
  },
  methods: {
    getPalata() {
      let self = this;
      let timestamp1 = parseInt(
        new Date(self.palata.date_to)
          .valueOf()
          .toString()
          .slice(0, 10)
      );
      let timestamp2 = parseInt(
        new Date(self.palata.date_do)
          .valueOf()
          .toString()
          .slice(0, 10)
      );
      let obj1 = new Date(timestamp1 * 1000);
      let obj2 = new Date(timestamp2 * 1000);
      obj1.setHours(8, 0, 0, 0);
      obj2.setHours(8, 0, 0, 0);
      let datas = {
        date_to: Math.floor(obj1.getTime() / 1000),
        date_do: Math.floor(obj2.getTime() / 1000),
        category_id: self.palata.category_id,
        xona_id: self.palata.xona_id
      };
      axios({
        method: "post",
        url: "/hisobot/palata_hisobot",
        data: datas
      }).then(res => {
        if (res) {
          self.itemsPalata = res.data;
        }
      });
    },
    RowClickedPalata(items, category_id, room_id, xonaName) {
      let datas = {
        date_to: this.palata.date_to,
        date_do: this.palata.date_do,
        category_id: category_id,
        xona_id: room_id,
        palata_id: items.id
      };
      localStorage.setItem("Palata", JSON.stringify(datas));
      let route = this.$router.resolve({
        path: "/statsionar/sverka"
      });
      window.open(route.href, "_blank");
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
    getXona() {
      let self = this;
      axios({
        method: "get",
        url: "/xona_etaj/all"
      }).then(res => {
        if (res) {
          self.Xona = res.data.data;
        }
      });
    },
    cancel() {
      window.close();
    }
  },
  mounted() {
    this.getCategory();
    this.getXona();
  }
};
</script>
<style>
.palata-summ {
  height: 35px;
  width: 100%;
  border: 1px solid #ccc;
  display: flex;
  align-items: center;
  border-radius: 5px;
  justify-content: center;
}
.navbarBtnDanger {
  border: 1px solid #fff;
  /* box-shadow: 5px 8px 10px rgba(176, 25, 25, 0.3); */
  background: #e80a18;
  border-radius: 8px;
}
/* .custom-modal .modal-dialog .modal-content {
  width: 900px !important; 
} */
.palata-select .vs__selected-options span:first-child {
  width: 88% !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  white-space: nowrap !important;
}
.palata-select .vs__selected-options {
  width: 88%;
}
.palata-category {
  border: 1px solid rgb(46, 165, 255);

  background: #f0f0f03d;
  box-shadow: 5px 8px 10px rgba(25, 95, 176, 0.3);
  border-radius: 10px;
  padding: 10px 5px;
  margin: 10px 5px;
}
.palata-xona {
  border: 1px solid #0b0bdd;
  background: #fff;
  width: 245px;
  margin: 10px 5px;
  border-radius: 7px;
  padding: 7px 7px;
}
.palata-palata {
  display: flex;
  border: 1px solid rgb(46, 165, 255);
  border-radius: 7px;
  background: #f0f0f03d;
  margin: 5px;
  padding: 5px 7px;
}
.palata-name {
  font-size: 18px;
  font-weight: 700;
  text-align: center;
  color: #3f51b5;
}
.p-x-name {
  font-size: 17px;
  font-weight: 700;
  display: flex;
  /* color: #051881; */

  /* border: 1px solid red; */
  /* margin: 5px 5px; */
  margin-top: 5px;
  justify-content: center;
  padding: 3px 5px;
}
.palataStatus {
  background: #ff00004a !important;
}
.numberic-style {
  height: 35px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.modalQidiruvp {
  width: 50%;
  float: right;
  /* position: relative; */
  /* left: 50%; */
}
.navbarBtn {
  color: #fff;
  border: 1px solid #fff;
  font-size: 18px;
  font-weight: 600;
  padding: 5px 10px;
  box-shadow: 5px 8px 10px rgba(25, 95, 176, 0.3);
  background: #00009d;
  border-radius: 8px;
}
</style>
