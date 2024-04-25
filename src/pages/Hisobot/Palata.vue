<template>
  <div :class="{ kasallikT: $store.state.kasTar }">
    <div
      style="margin-top: -3px; width: 100%; display: flex; justify-content: space-between;"
    >
      <div style="width: 20%">
        <div>{{ $t("Келган вақт") }}</div>
        <date-picker
          v-model="palata.date_to"
          style="width: 100%;"
          format="DD.MM.YYYY"
          value-type="X"
          type="datetime"
          :lang="lang"
        ></date-picker>
      </div>
      <!-- <div style="width: 20%">
          <div>{{ $t("Қолиш вақти") }}</div>
          <vue-numeric
            v-model="vaqt"
            class="numberic-style"
            @input="qoladiganKun"
            separator="space"
          ></vue-numeric>
        </div> -->
      <div style="width: 20%">
        <div>{{ $t("Кетиш вақт") }}</div>
        <date-picker
          style="width: 100%"
          v-model="palata.date_do"
          format="DD.MM.YYYY"
          value-type="X"
          type="datetime"
          :lang="lang"
        ></date-picker>
      </div>
      <div style="width: 20%">
        <div>{{ $t("Сумма") }}</div>
        <div class="palata-summ">
          {{ hospital_summa | numFormat }}
        </div>
      </div>
      <div>
        <button class="navbarBtn mt-3" @click="getPalata">
          {{ $t("Палаталарни кўриш") }}
        </button>
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
                        style="font-size: 16px; font-weight: 600; display: flex; justify-content: space-between;"
                      >
                        <div style="font-size: 16px; font-weight: 600;">
                          {{ itemPal.name }}
                        </div>
                        <b-button
                          v-if="!itemPal.status"
                          @click="
                            RowClickedPalata(
                              itemPal,
                              itemCat.id,
                              itemXona.id,
                              itemXona.name
                            )
                          "
                          class="navbarBtn"
                          variant="primary"
                        >
                          +
                        </b-button>
                      </div>
                      <div style="width: 100%;">
                        <b-input
                          style="width: 100%; border: 1px solid #ccc; border-radius: 5px; margin-bottom: 5px;"
                          :disabled="itemPal.status"
                          type="text"
                          v-model="itemPal.comment"
                        >
                        </b-input>
                        <v-select
                          class="palata-select"
                          :disabled="itemPal.status"
                          label="name"
                          :options="User"
                          :reduce="option => option.id"
                          v-model="itemPal.user_id"
                        />
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
      vaqt: 0,
      palata: {
        date_to: moment(new Date()).format("X"),
        date_do: moment(new Date()).format("X")
      },
      itemsPalata: [],
      fieldsPalata: [
        "№",
        { key: "name", label: this.$t("Номи"), sortable: true },
        {
          key: "price",
          label: this.$t("Нарх"),
          sortable: true,
          formatter: (value, key, item) => {
            let formatter = new Intl.NumberFormat("ru-RU", {
              minimumFractionDigits: 2
            });
            return formatter.format(value);
          }
        }
      ],
      totalRowsPalata: 1,
      currentPagePalata: 1,
      perPagePalata: 50,
      sortByPalata: "",
      sortDescPalata: false,
      sortDirectionPalata: "asc",
      filterPalata: null,
      filterOnPalata: ["name"]
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
      self.getUser();
      axios({
        method: "post",
        url: "/registration/palata",
        data: self.palata
      }).then(res => {
        if (res) {
          self.itemsPalata = res.data;
        }
      });
    },
    getUser() {
      let self = this;
      axios({
        method: "get",
        url: "/doctor/all"
      }).then(res => {
        if (res) {
          self.User = res.data;
        }
      });
    },
    RowClickedPalata(items, category_id, room_id, xonaName) {
      // const index1 = this.registration_palata.findIndex(
      //   val => val.palata_id == items.id
      // );
      let x = null;
      if (this.vaqt != 0 && this.$store.state.bemor.id) {
        x = Number(items.price) * Number(this.vaqt);
        if (items.status) {
          this.$bvToast.toast(`${this.$t("!!Жой бант")}`, {
            title: this.$t("Огоҳлантириш"),
            autoHideDelay: 2000,
            appendToast: true,
            variant: "danger"
          });
        } else {
          this.$emit("palataChange", x, true);
          for (let i = 0; i < this.vaqt; i++) {
            this.registration_palata.push({
              vazvrat: "false",
              palata_id: items.id,
              price: items.price,
              comment: items.comment,
              user_id: items.user_id,
              category_id: category_id,
              room_id: room_id,
              palatas: {
                name: items.name,
                xona: {
                  name: xonaName
                }
              },
              status: items.status,
              total_price: items.price,
              date_to: moment
                .unix(parseInt(this.palata.date_to))
                .add(i, "days")
                .format("X"),
              day: 1,
              date_do: moment
                .unix(parseInt(this.palata.date_to))
                .add(i + 1, "days")
                .format("X")
            });
          }
          this.vaqt = 0;
          this.$bvModal.hide("modal-palata" + this.modalId);
          this.$bvToast.toast(this.$t("Малумотлар қўшилди"), {
            title: this.$t("Огоҳлантириш"),
            autoHideDelay: 2000,
            appendToast: true,
            variant: "success"
          });
        }
      } else {
        this.$bvToast.toast(
          `${this.$t("!!!!!Қолиш вақти йўқ. Ёки бемор йўқ")}`,
          {
            title: this.$t("Огоҳлантириш"),
            autoHideDelay: 2000,
            appendToast: true,
            variant: "danger"
          }
        );
      }
    },
    onFilteredPalata(filteredItems) {
      this.totalRowsPalata = filteredItems.length;
      this.currentPagePalata = 1;
    },
    qoladiganKun() {
      if (this.vaqt !== " ") {
        let secondDay = moment
          .unix(parseInt(this.palata.date_to))
          .add(this.vaqt, "days");
        this.palata.date_do = moment(secondDay).format("X");
      }
    },
    deletePalata(id, item) {
      let x = item.total_price;
      // if (this.backlog != 0) {
      this.$emit("palataChange", x, false);
      this.vaqt = 0;
      this.registration_palata.splice(id, 1);
      // }
    },
    VazvratPalata(item, index) {
      this.$emit("palataChange", item.total_price, item.vazvrat, "vazvrat");
    }
  },
  mounted() {
    this.getUser();
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
  width: 343px;
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
  font-weight: 600;
  display: flex;
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
