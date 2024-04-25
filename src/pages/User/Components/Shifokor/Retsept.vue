<template>
  <div :class="{ kasallikT: $store.state.kasTar }">
    <table class="table table-sm table-bordered">
      <thead class="BayonotTheadr">
        <tr>
          <th style="width: 30px;">
            <b-button
              variant="success"
              :disabled="localUser.doctor_id != doctor_id"
              @click="Add()"
              class="retsept-add-btn"
              ><span> <b-icon icon="plus" color="#fff"></b-icon> </span
            ></b-button>
          </th>
          <th style="width: 30%;">
            <b-button
              style="margin-left: 10px; margin-right: 10px;"
              variant="primary"
              @click="allPechat"
              class="navbarBtnTashxis"
            >
              <b-icon icon="printer-fill"></b-icon>
              Печать
            </b-button>
            {{ $t("Дори") }}
          </th>
          <th>{{ $t("Кун") }}</th>
          <th>{{ $t("Маҳал") }}</th>
          <th>{{ $t("Қўшимчалар") }}</th>
          <th style="width: 40px;"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in retsep" :key="index">
          <td>{{ index + 1 }}</td>
          <td>
            <div class="select-btn-add">
              <v-select
                class="select-btn-retsep"
                :options="itemsDorilar"
                ref="doriselect"
                @search="doriInput"
                :reduce="options => options.id"
                v-model="item.pill_id"
                label="name"
                @input="DoriName(item.pill_id, index)"
                @keydown.native="insertDori($event, indSh, index)"
              >
                <template #search="{attributes, events}">
                  <input class="vs__search" v-bind="attributes" v-on="events" />
                  <!-- <button type="button" class="modallist" v-b-modal.modal-skladlist>
                    <b-icon icon="three-dots"></b-icon>
                    </button> -->
                </template>
                <template #selected-option="{ name }">
                  <div style="position:absolute;" class="select-span-text">
                    <label>{{ name }}</label>
                  </div>
                </template>
                <template
                  v-slot:no-options="{
                    search,
                    searching
                  }"
                >
                  <template v-if="searching">
                    <em
                      ><b>{{ search }}</b></em
                    >{{ $t("бўйича маьлумот йўқ") }}
                    <div class="d-flex-center">
                      <b-button
                        class="insertbtn"
                        variant="success"
                        @click="insertDoribtn(search, indSh, index)"
                        v-b-modal="'DorilarModal' + indSh + index"
                      >
                        <b-icon icon="plus" color="#fff"></b-icon>
                      </b-button>
                    </div>
                    <b> Insert</b>
                  </template>
                  <em style="opacity: 0.5;" v-else>{{ $t("Маьлумот йўқ") }}</em>
                </template>
              </v-select>
              <button
                class="dori-add-btn"
                v-b-modal="'DorilarModal' + indSh + index"
              >
                ...
              </button>
            </div>
            <b-modal
              :id="'DorilarModal' + indSh + index"
              title="Дори қўшиш"
              hide-footer
            >
              <div class="md-layout-item md-small-size-100 md-size-100">
                <span class="shirift">
                  {{ $t("Дори номи") }}
                </span>
                <span style="color: red;">*</span>
                <span v-if="errorsDori !== null">
                  <span
                    style="color: red; font-size: 9px"
                    v-if="!errorsDori.name.required"
                    >{{ $t("Дори тўлдирилиши керак") }}</span
                  >
                  <span
                    style="color: red; font-size: 9px"
                    v-if="!errorsDori.name.minLength"
                    >{{ $t("Дорида камида 4 та белги бўлиши керак") }}</span
                  >
                </span>
                <b-input
                  id="dorilar-name"
                  style="background: #fff; border: 1px solid #ced4da;"
                  type="text"
                  v-model="DorilarQoshish.name"
                />
              </div>
              <div class="CreateName">
                <b-button
                  class="modalBtn1"
                  size="sm"
                  style="height: 37px;"
                  variant="danger "
                  @click="DoriClose(indSh, index)"
                >
                  <b-icon icon="calendar2-x"></b-icon>
                  {{ $t("Бекор қилиш") }}
                </b-button>
                <b-button
                  class="mt-3 ml-2 modalBtn"
                  @click="DoriSaqlash(indSh, index)"
                  variant="success"
                >
                  <b-icon icon="calendar2-plus"></b-icon>
                  {{ $t("Сақлаш") }}
                </b-button>
              </div>
            </b-modal>
          </td>
          <td>
            <b-input
              type="text"
              style="background: #fff; border: 1px solid #ced4da;"
              v-model="item.day"
            ></b-input>
          </td>
          <td>
            <b-input
              type="text"
              style="background: #fff; border: 1px solid #ced4da;"
              v-model="item.time"
            ></b-input>
          </td>
          <td>
            <!-- <b-input
              id="textarea"
              style="background: #fff; border: 1px solid #ced4da;"
              v-model="item.comment"
            ></b-input> -->
            <b-form-textarea
              style="background: #fff; border: 1px solid #ced4da;"
              v-model="item.comment"
            ></b-form-textarea>
          </td>
          <td>
            <b-button
              style="width: 35px; height: 35px; display: flex; justify-content: center;"
              variant="outline-danger"
              @click="deleteRetsep(index)"
            >
              <b-icon style="width: 17px;" icon="trash"></b-icon>
            </b-button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import { required, minLength } from "vuelidate/lib/validators";
export default {
  props: ["retsep", "indSh", "doctor_id", "doctor"],
  data() {
    return {
      itemsDorilar: [],
      errorsDori: null,
      DorilarQoshish: {
        name: "",
        status: ""
      },
      doriValue: null,
      localUser: JSON.parse(localStorage.getItem("user"))
    };
  },
  validations: {
    DorilarQoshish: {
      name: {
        required,
        minLength: minLength(4)
      }
    }
  },
  methods: {
    Add() {
      this.retsep.push({
        registration_doctor_id: this.localUser.doctor_id,
        pill_id: null,
        time: "",
        day: "",
        comment: "",
        name: ""
      });
    },
    deleteRetsep(ind) {
      this.retsep.splice(ind, 1);
    },
    DoriSaqlash(indSh, index) {
      let self = this;
      this.$v.$touch();
      if (self.$v.DorilarQoshish.$error == false) {
        axios({
          method: "post",
          url: "/pill/create",
          data: self.DorilarQoshish
        }).then(data => {
          if (data) {
            // self.$emit('doriSaqlash', data.data.data, indSh, index)
            self.retsep[index].pill_id = data.data.data.id;
            self.$bvModal.hide(`${"DorilarModal" + indSh + index}`);
            self.getDorilar();
            self.DorilarQoshish.name = "";
          }
        });
      } else {
        this.errorsDori = this.$v.DorilarQoshish;
      }
    },
    DoriClose(indSh, index) {
      this.DorilarQoshish.name = "";
      this.$bvModal.hide(`${"DorilarModal" + indSh + index}`);
    },
    doriInput(e) {
      this.doriValue = e;
    },
    insertDori($events, indSh, index) {
      if ($events.keyCode == 45) {
        this.$bvModal.show(`${"DorilarModal" + indSh + index}`);
        this.DorilarQoshish.name = this.doriValue;
      }
    },
    insertDoribtn(name, indSh, index) {
      this.$bvModal.show(`${"DorilarModal" + indSh + index}`);
      this.DorilarQoshish.name = name;
    },
    DoriName(id, index) {
      for (let i = 0; i < this.itemsDorilar.length; i++) {
        const element = this.itemsDorilar[i];
        if (element.id == id) {
          this.retsep[index].name = element.name;
        }
      }
    },
    allPechat(){
      let t = {}
      t = {
        bemorId: this.$store.state.bemor.id,
        // type: this.logoStatus,
        name: this.$store.state.bemor.fullname,
        gender: this.$store.state.bemor.gender,
        birthday: this.$store.state.bemor.birthday,
        // create_at: this.created_at,
        data: this.doctor
      };
      localStorage.setItem("Retsept", JSON.stringify(t));
      // this.$router.push("/user");
      const rout = this.$router.resolve({
        path: "/user-retsept"
      });
      window.open(rout.href, "_blank");
    },
    getDorilar() {
      let self = this;
      axios({
        method: "get",
        url: "/pill/all"
      }).then(res => {
        if (res) {
          self.itemsDorilar = res.data.data;
        }
      });
    }
  },
  mounted() {
    this.getDorilar();
  }
};
</script>
<style>
.retsept-add-btn {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.select-btn-add {
  position: relative;
  /* height: 40px; */
  
}
.select-btn-retsep{
  width: 100%;
}
.select-btn-retsep .vs__selected-options{
  /* height: 35px; */
}
.select-btn-retsep .vs__selected-options .select-span-text {
  margin-top: 3px;
  width: 90% !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  white-space: nowrap !important;
}
.select-btn-retsep .vs__selected-options {
  width: 90%;
}
.BayonotTheadr {
  color: #fff;
  text-align: center;
}
.dori-add-btn {
  position: absolute;
  z-index: 2;
  top: 3px;
  left: calc(100% - 70px);
  color: #b1b1b1;
  font-weight: 700;
  font-size: 17px;
  border: none;
  background-color: white;
}
.insertbtn {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  /* padding: 0px 6px !important; */
  /* display: flex; */
  /* align-items: center; */
  text-align: center;
}
.CreateName {
  display: block;
  float: right;
}
.shirift {
  font-size: 16px;
  font-weight: 400;
}
.modalBtn1 {
  margin-right: 7px !important;
  margin-bottom: -10px !important;
  border-radius: 8px;
  background: #e80a18;
  box-shadow: 5px 8px 10px rgba(176, 25, 25, 0.4);
}
.modalBtn {
  margin-right: 7px !important;
  margin-bottom: 7px !important;
  background: #0abd11;
  box-shadow: 5px 8px 10px rgba(25, 176, 33, 0.4);
  border-radius: 8px;
}
</style>
