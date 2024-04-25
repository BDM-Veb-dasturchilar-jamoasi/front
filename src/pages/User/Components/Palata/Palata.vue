<template>
  <div :class="{ kasallikT: $store.state.kasTar || $route.name == 'ArxivOne' }">
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
      <div style="width: 20%">
        <div>{{ $t("Қолиш вақти") }}</div>
        <vue-numeric
          v-model="vaqt"
          class="numberic-style"
          @input="qoladiganKun"
          separator="space"
        ></vue-numeric>
      </div>
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
        <button
          v-b-modal="'modal-palata' + modalId"
          class="navbarBtn mt-3"
          @click="getPalata"
        >
          {{ $t("Палаталарни кўриш") }}
        </button>
        <b-modal
          :id="'modal-palata' + modalId"
          size="xl"
          :title="$t('Палаталар')"
          hide-footer
        >
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
                          <div style="font-size: 16px; font-weight: 600; display: flex;">
                            <div>{{ itemPal.name }}</div>
                          </div>
                          <div style="margin-right: 5px; font-size: 14px;">{{ itemPal.price | numFormat }}</div>
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
                            class="navbarBtn navbarBtn-palata"
                            variant="primary"
                          >
                            +
                          </b-button>
                        </div>
                        <div style="width: 100%;">
                          <b-input
                            style="width: 100%; height: 30px; border: 1px solid #ccc; border-radius: 5px; margin-bottom: 5px;"
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
        </b-modal>
      </div>
    </div>
    <div v-if="registration_palata.length != 0">
      <b-row style="padding: 5px 15px">
        <table class="table table-sm table-bordered" style="background: #fff;">
          <thead class="shifokorTable">
            <tr>
              <th style="width: 30px;">№</th>
              <th>{{ $t("Номи") }}</th>
              <!-- <th>{{ $t("Кунлик нарҳи") }}</th> -->
              <th>{{ $t("Келган кун") }}</th>
              <th>{{ $t("Кетган кун") }}</th>
              <th>{{ $t("Куни") }}</th>
              <th>{{ $t("Сумма") }}</th>
              <th>{{ $t("Шифокор") }}</th>
              <th>{{ $t("Изоҳ") }}</th>
              <th style="width: 40px;"></th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in registration_palata"
              :key="index"
              :class="{
                bg: index % 2 == 1,
                vazvrat: item.vazvrat == true
              }"
            >
              <td>{{ index + 1 }}</td>
              <td>{{ item.palatas.xona.name }} {{ item.palatas.name }}</td>
              <!-- <td>{{ item.price | numFormat }}</td> -->
              <td>{{ item.date_to | dateFormatDD }}</td>
              <td>{{ item.date_do | dateFormatDD }}</td>
              <td>{{ item.day }}</td>
              <td>
                <!-- {{ item.total_price | numFormat }} -->
                <div style="display: flex; justify-content: space-between; margin: 0 10px; ">
              <div style="font-size: 18px; font-weight: 600;">{{ item.total_price | numFormat }}</div>
              <button
                v-if="localUser.role == 'Admin'"
                class="navbarBtnTashxis-summa navbarBtnTashxis"
                v-b-modal="'modal-summa-change' + index + modalIdCom"
                @click="price = item.total_price"
              >
                <b-icon
                  style="width: 15px;"
                  icon="pencil-fill"
                ></b-icon>
              </button>
              <b-modal
                :id="'modal-summa-change' + index + modalIdCom"
                :title="item.palatas.xona.name + ' ' + item.palatas.name"
                hide-footer
              >
                <div style="width: 100%;">
                  <vue-numeric
                    class="numberic-pay"
                    separator="space"
                    :precision="2"
                    v-model="price"
                  ></vue-numeric>
                </div>
                <div class="CreateName">
                  <b-button
                    class="modalBtn1"
                    size="sm"
                    style="height: 37px;"
                    variant="danger "
                    @click="close(index)"
                  >
                    <b-icon icon="calendar2-x"></b-icon>
                    {{ $t("Бекор қилиш") }}
                  </b-button>
                  <b-button
                    class="mt-3 ml-2 modalBtn"
                    @click="Change(item, index)"
                    variant="success"
                  >
                    <b-icon icon="calendar2-plus"></b-icon>
                    {{ $t("Сақлаш") }}
                  </b-button>
                </div>
              </b-modal>
            </div>
              </td>
              <td>
                <v-select
                  label="name"
                  :disabled="true"
                  :options="User"
                  :reduce="option => option.id"
                  v-model="item.user_id"
                />
              </td>
              <td>
                <b-input
                  style="border: 1px solid #ccc; border-radius: 5px;"
                  type="text"
                  v-model="item.comment"
                >
                </b-input>
              </td>
              <!-- <td>
                <b-form-checkbox
                  v-model="item.vazvrat"
                  v-if="backlog == 0"
                  name="checkbox-1"
                  :value="true"
                  :unchecked-value="false"
                  @change="VazvratPalata(item, index)"
                >
                  Возврат
                </b-form-checkbox>
              </td> -->
              <td>
                <div style="display: flex; justify-content: space-between;">
                  <!-- <b-button
                    v-if="localUser.role != 'Shifokor'"
                    variant="outline-primary"
                    style="width: 30px; height: 30px; display: flex; justify-content: center;"
                    v-b-modal="'modal-palata-change' + index + modalIdCom"
                    @click="price = item.total_price"
                  >
                    <b-icon
                      style="width: 15px;"
                      icon="pencil-fill"
                    ></b-icon>
                  </b-button> -->
                  <!-- <b-modal
                    size="xl"
                    :id="'modal-palata-change' + index + modalIdCom"
                    :title="item.palatas.xona.name + ' ' + item.palatas.name"
                    hide-footer
                  >
                    <div style="width: 100%;">
                      <vue-numeric
                        class="numberic-pay"
                        separator="space"
                        :precision="2"
                        v-model="price"
                      ></vue-numeric>
                    </div>
                    <div class="CreateName">
                      <b-button
                        class="modalBtn1"
                        size="sm"
                        style="height: 37px;"
                        variant="danger "
                        @click="close(index)"
                      >
                        <b-icon icon="calendar2-x"></b-icon>
                        {{ $t("Бекор қилиш") }}
                      </b-button>
                      <b-button
                        class="mt-3 ml-2 modalBtn"
                        @click="Change(item, index)"
                        variant="success"
                      >
                        <b-icon icon="calendar2-plus"></b-icon>
                        {{ $t("Сақлаш") }}
                      </b-button>
                    </div>
                  </b-modal> -->
                  <b-button
                    v-if="localUser.role == 'Admin' || localUser.role == 'Kasser'"
                    style="width: 30px; height: 30px; display: flex; justify-content: center;"
                    @click="deletePalata(index, item)"
                    variant="outline-danger"
                  >
                    <b-icon style="width: 17px;" icon="trash"></b-icon>
                  </b-button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </b-row>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import moment from "moment";
export default {
  props: ["registration_palata", "hospital_summa", "backlog", "modalId", "modalIdCom"],
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
      localUser: JSON.parse(localStorage.getItem("user")),
      price: 0,
      comment: "",
      User: [],
      vaqt: 0,
      palata: {
        date_to: moment(new Date()).format("X"),
        date_do: moment(new Date()).format("X")
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
    Change(item, index){
      this.$emit("palataChange", item.total_price, false);
      this.$emit("palataChange", this.price, true);
      this.registration_palata[index].total_price = this.price
      this.registration_palata[index].price = this.price

      this.$bvModal.hide('modal-summa-change' + index + this.modalIdCom)
    },
    close(ind){
      this.price = 0
      this.$bvModal.hide('modal-summa-change' + ind + this.modalIdCom)
    },
    RowClickedPalata(items, category_id, room_id, xonaName) {
      // const index1 = this.registration_palata.findIndex(
      //   val => val.palata_id == items.id
      // );
      let regStat = {}
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
          let dateObj1 = new Date(this.palata.date_to * 1000);
          let date1 = 0;
          dateObj1.setHours(8, 0, 0, 0);
          date1 = Math.floor(dateObj1.getTime() / 1000);

          // let dateObj2 = new Date(this.palata.date_do * 100)
          // dateObj2.setHours(8, 0, 0, 0);
          // let date2  = Math.floor(dateObj2.getTime() / 1000);
          // let x = Number(items.price) * Number(this.vaqt);
          // this.hospital_summa += x;
          // this.user.summa += x;
          // this.user.backlog += x;

          const currentDate = new Date();

          const day = currentDate.getDate().toString().padStart(2, '0');
          const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 because months are zero-based
          const year = currentDate.getFullYear().toString();
          const hours = currentDate.getHours().toString().padStart(2, '0');
          const minutes = currentDate.getMinutes().toString().padStart(2, '0');
          const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}`;
          let dataText = JSON.stringify([
              { 
                key: 'value', 
                value: `${
                  '<p class="ql-align-center"><strong>' + day + '.' + month + '.' + year + ' ' + hours + ':' + minutes + '</strong></p>' + 
                  '<p><strong>Бемор:</strong>' + this.$store.state.bemor.fullname + ' ' + moment.unix(this.$store.state.bemor.birthday).format("YYYY") + ' Й' + '</p>' +
                  '<p>' + '<strong>Шикояти:</strong>' + ' ' + '</p>'
                }`
              }
          ])
          regStat = {
            statsionar_text: dataText,
            text: dataText,
            arrive_day: this.palata.date_to,
            recede_day: this.palata.date_do,
            reg_statsionar_doctor: [
              {
                doctor_id: items.user_id,
                statsionar_text: dataText,
                text: dataText,
                reg_stat_doctor_text: [
                  {
                    statsionar_text: dataText,
                    text: dataText,
                    doctor_id: items.user_id,
                    day: formattedDate
                  }
                ]
              }
            ],
          }
          this.$emit('reg_statsionar', regStat)
          regStat = {}
          // this.registration_palata.push({
          //   palata_id: items.id,
          //   vazvrat: "false",
          //   price: items.price,
          //   backlog: x,
          //   discount: 0,
          //   pay_summa: 0,
          //   comment: items.comment,
          //   user_id: items.user_id,
          //   category_id: category_id,
          //   room_id: room_id,
          //   key: new Date()
          //   .valueOf()
          //   .toString(),
          //   palatas: {
          //       name: items.name,
          //       xona: {
          //         name: xonaName
          //       }
          //     },
          //   status: items.status,
          //   total_price: items.price * Number(this.vaqt),
          //   date_to: moment
          //       .unix(parseInt(date1))
          //       .add("days")
          //       .format("X"),
          //   day: this.vaqt,
          //   date_do: moment
          //       .unix(parseInt(date1))
          //       .add(this.vaqt, "days")
          //       .format("X"),
          // });
          for (let i = 0; i < this.vaqt; i++) {
            this.registration_palata.push({
              vazvrat: "false",
              palata_id: items.id,
              price: items.price,
              comment: items.comment,
              user_id: items.user_id,
              category_id: category_id,
              room_id: room_id,
              key: new Date()
                  .valueOf()
                  .toString() + `${i}`,
              backlog: items.price,
              discount: 0,
              pay_summa: 0,
              palatas: {
                name: items.name,
                xona: {
                  name: xonaName
                }
              },
              status: items.status,
              total_price: items.price,
              date_to: moment
                .unix(parseInt(date1))
                .add(i, "days")
                .format("X"),
              day: 1,
              date_do: moment
                .unix(parseInt(date1))
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
.navbarBtn-palata {
  padding: 0px 7px !important;
}
.palata-select .vs__selected-options span:first-child {
  width: 80% !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  white-space: nowrap !important;
}
.palata-select .vs__selected-options {
  width: 80%;
}
.palata-select{
  height: 30px;
}
.palata-select .vs__dropdown-toggle{
  height: 30px;
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
