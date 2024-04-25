<template>
  <div>
    <b-tabs active-nav-item-class="font-weight-bold text-light bg-info">
      <b-tab
        v-for="(itemRegShif, indRegShif) in doctor"
        :key="indRegShif"
        :title="itemRegShif.doctor.name"
        :class="{ kasallikT: $route.name == 'ArxivOne' }"
        title-link-class="mr-2 mt-1 text-light font-weight-bold bg-success"
        style="padding: 0px !important; position: relative;"
      >
        <!-- <b-form-checkbox
          class="pecat-change"
          style="display: flex;"
          @change="pechat(itemRegShif)"
          :value="true"
          :unchecked-value="false"
        >
        </b-form-checkbox> -->
        <div class="tek-card">
          <div>
            <div
              class="shif-sarlovha"
              :class="{
                Arxive: $route.name == 'ArxivOne',
                vazvrat: itemRegShif.vazvrat == true
              }"
            >
              <div style="display: flex; justify-content: space-between;">
                <div v-if="!$store.state.kasTar" >
                  <b-button
                    :disabled="
                      !(
                        localUser.doctor_id == itemRegShif.doctor_id ||
                        localUser.role == 'Admin'
                      )
                    "
                    class="navbarBtnTashxis"
                    v-b-modal="
                      'modal-shablon' + indRegShif + 'shifokor' + modalIdCom
                    "
                    @click="getShablon"
                    variant="primary"
                  >
                    <b-icon icon="collection"></b-icon>
                  </b-button>
                  <b-modal
                    :id="'modal-shablon' + indRegShif + 'shifokor' + modalIdCom"
                    size="lg"
                    :title="$t('Шаблонлар рўйхати')"
                    hide-footer
                  >
                    <Shablon
                      :modalIdCom="modalIdCom"
                      :indRegShif="indRegShif"
                      :shabType="'shifokor'"
                      :itemsShablon="itemsShablon"
                      @ShablonGet="getShablon"
                      @RowClickedShab="RowClickedShab"
                    />
                  </b-modal>
                </div>
                <!-- <div style="margin-left: 30px;">
                  <b-form-checkbox
                    class="pecat-change"
                    style="display: flex;"
                    v-model="logoStatus"
                    :value="true"
                    :unchecked-value="false"
                  >
                    Лого
                  </b-form-checkbox>
                </div> -->
                <b-button
                  style="margin-left: 10px; margin-right: 10px;"
                  variant="primary"
                  @click="allPechat(itemRegShif)"
                  class="navbarBtnTashxis"
                >
                  <b-icon icon="printer-fill"></b-icon>
                  Печать
                </b-button>
                <b-button
                  class="navbarBtnTashxis"
                  v-if="
                    !$store.state.kasTar &&
                      (localUser.role == 'Admin' ||
                        localUser.role == 'Registrator' ||
                        localUser.role == 'Kasser' ||
                        localUser.role == 'Shifokor')
                  "
                  v-b-modal="'modal-qosh' + 'shif' + indRegShif + modalIdCom"
                  @click="getQoshimcha()"
                  variant="primary"
                >
                  <b-icon icon="plus-circle-fill"></b-icon>
                </b-button>
                <div class="ml-2">
                  <!-- {{ itemRegShif }} -->
                  <v-select
                    class="Tekshiruvchi-index-user"
                    :disabled="itemRegShif.doctor_id != localUser.doctor_id &&
                      localUser.role != 'Admin' &&
                      localUser.role != 'Registrator'
                    "
                    label="name"
                    :options="shifokor"
                    :reduce="option => option.id"
                    @input="changeShifokor($event, indRegShif)"
                    v-model="itemRegShif.doctor_id"
                  />
                </div>
                <div style="margin-left: 10px;">
                  <input
                      type="datetime-local"
                      class="input-datetime-local"
                      v-model="itemRegShif.date_doctor"
                    >
                </div>
                <div class="ml-2">
                  <v-select
                    style="width: 320px;"
                    class="Tekshiruvchi-index-user" 
                     @input="changeShifokor($event, indRegShif)"
                    :filter="fuseSearch" id="naprovitel" :options="darect" :get-option-label="option => option.name"
                    :reduce="option => option.id" v-model="itemRegShif.darect_id">
                    <template #option="{ name, direct_id }">
                      {{ name }}
                      <br />
                      <b>{{ direct_id }}</b>
                    </template>
                  </v-select>
                </div>

                <div>
                  <b-modal
                    :id="'modal-qosh' + 'shif' + indRegShif + modalIdCom"
                    size="xl"
                    hide-footer
                  >
                    <ShifokorVue
                      :shifKorigi="true"
                      :shifokor="qoshimchaShif"
                      :index="indRegShif"
                      @itemSh="itemShReg"
                    />
                  </b-modal>
                </div>
              </div>
              <div class="delete-vaz">
                <div
                  class="shif-price"
                  v-if="
                    localUser.role != 'Loborant' &&
                      localUser.role != 'Uzi ' &&
                      localUser.role != 'Shifokor'
                  "
                >
                  <div
                    style="width: 120px;"
                  >
                    {{ itemRegShif.price | numFormat }}
                  </div>
                </div>
                <div style="width: 100px;">
                  <b-form-checkbox
                    :class="{ kasallikT: $store.state.kasTar }"
                    style="display: flex; width: 100px;"
                    v-model="itemRegShif.vazvrat"
                    v-if="
                      localUser.role == 'Kasser' ||
                        localUser.role == 'Admin' ||
                        localUser.role == 'Registrator'
                    "
                    @change="Vazvrat(itemRegShif)"
                    :value="true"
                    :unchecked-value="false"
                  >
                    Возврат
                  </b-form-checkbox>
                </div>
                <b-button
                  :class="{ kasallikT: $store.state.kasTar }"
                  style="width: 30px; height: 30px; display: flex; justify-content: center;"
                  @click="deleteShif(indRegShif, itemRegShif)"
                  variant="outline-danger"
                >
                  <b-icon style="width: 17px;" icon="trash"></b-icon>
                </b-button>
              </div>
            </div>
            <div v-if="
                localUser.role == 'Kasser' ||
                localUser.role == 'Admin' ||
                localUser.role == 'Shifokor' ||
                localUser.role == 'Registrator'
              "
            >
              <Qoshimcha
                :qoshimcha="itemRegShif.reg_doctor_category"
                :classvazvrat="itemRegShif.vazvrat"
                :backlog="backlog"
                :indOta="indRegShif"
                :modalIdCom="modalIdCom"
                @SummaChange="SummaChange"
                @vazvratQoshimcha="vazvratQoshimcha"
                @delQosh="delQosh"
              />
            </div>
          </div>

          <!-- class="tashxis-style" -->
          <div 
            :class="{ kasallikT: $store.state.kasTar }"
            v-if="!itemRegShif.vazvrat"
          >
          <div class="vue-text-editor">
            <div>
              <VueEditorText 
                :text="itemRegShif.text"
                :indReg="indRegShif"
                :disabled="(localUser.doctor_id == itemRegShif.doctor_id) || localUser.role == 'Admin' ? false : true"
                :dataType="true"
                :defaultHeigth="defaultHeigth"
                @vueEditorText="vueEditorText"
                @textChangeValueIndex="textChangeValueIndex"
              />
            </div>
          </div>
            <!-- <div
              v-for="(itemQosh, indQosh) in itemRegShif.reg_doctor_category"
              :key="indQosh"
              class="qosh-parent"
            >
            <div>
              <div class="qosh-header">
                <div>
                </div>
                <b class="qosh-name">{{ itemQosh.name }}</b>
                <div>
                  <b-button
                    :class="{ kasallikT: $store.state.kasTar }"
                    v-if="backlog != 0 && !itemRegShif.vazvrat"
                    style="width: 30px; height: 30px; display: flex; justify-content: center;"
                    @click="delShifQosh(itemQosh.price, indRegShif, indQosh)"
                    variant="outline-danger"
                  >
                    <b-icon style="width: 17px;" icon="trash"></b-icon>
                  </b-button>
                </div>
              </div>
              <div
                style="background: #fff;"
                v-if="!itemRegShif.vazvrat"
              >
                <vue-editor
                  :disabled="localUser.doctor_id != itemRegShif.doctor_id"
                  v-model="itemQosh.text"
                  @input="ShifokorText(indRegShif)"
                />
              </div>
            </div>
            </div> -->
          </div>
          <div 
            class="resept-div"
            v-if="!itemRegShif.vazvrat"
          >
            <RetseptVue
              :retsep="itemRegShif.registration_recipe"
              :doctor="itemRegShif"
              :doctor_id="itemRegShif.doctor_id"
              :indSh="indRegShif"
            />
            <!-- @doriSaqlash="doriSaqlash" -->
          </div>
        </div>
      </b-tab>
    </b-tabs>
  </div>
</template>
<script>
import RetseptVue from "./Retsept.vue";
import Shablon from "./Shablon.vue";
import Qoshimcha from "../Qoshimcha.vue";
import ShifokorVue from "./Shifokor.vue";
import VueEditorText from "../VueEditorText.vue";
import Fuse from "fuse.js";
export default {
  props: ["doctor", "backlog", "modalId", "modalIdCom", "created_at"],
  components: {
    RetseptVue,
    Shablon,
    Qoshimcha,
    ShifokorVue,
    VueEditorText
  },
  data() {
    return {
      localUser: JSON.parse(localStorage.getItem("user")),
      itemsShablon: [],
      qoshimchaShif: [],
      darect:[],
      pechatChange: [],
      shifokor: [],
      defaultHeigth: "height: 940px;",
      logoStatus: true,
      textChangeValue: {
          index: null,
          key: null,
      }
    };
  },

  methods: {
    // doriSaqlash(data, indSh, index) {
    //   // this.doctor[indSh].registration_recipe[index].pill_id = data.id
    // },
    vueEditorText(val, index){
      this.doctor[index].text = val;
    },
    getShifokor() {
      let self = this;
      axios({
        method: "get",
        url: "/doctor/all/" + self.localUser.filial_id
      }).then(res => {
        if (res) {
          self.shifokor = res.data
        }
      });
    },
    changeShifokor(e, ind){
      this.doctor[ind].reg_doctor_category.forEach(el => {
        el.doctor_id = e
      })
      this.shifokor.forEach(el => {
        if(el.id == e) {
          this.doctor[ind].doctor.name = el.name
        }
      })
    },
    getQoshimcha() {
      let self = this;
      axios({
        method: "get",
        url: "/doctor_category/all/" + self.localUser.filial_id
      }).then(res => {
        if (res) {
          // self.qoshimchaShif = res.data.data;
          let x = [];
          res.data.data.forEach(item => {
            const existingType = x.find(r => r.name === item.bolim.name);
            if (existingType) {
              existingType.type.push(item);
            } else {
              x.push({ name: item.bolim.name, type: [item] });
            }
          });
          self.qoshimchaShif = x;
        }
      });
    },
    itemShReg(item, index) {
      let x = 0;
      if(this.$store.state.bemor.imtiyoz_type == "Imtiyozsiz"){
        if (this.$store.state.bemor.citizen) {
          x = item.citizen_price;
        } else {
          x = item.price;
        }
      }
      this.doctor[index].price += x;
      this.doctor[index].backlog += x;
      this.$emit("shifAdd", x, true);
      this.doctor[index].reg_doctor_category.push({
        id: item.id,
        doctor_id: this.doctor[index].doctor_id,
        name: item.name,
        price: x,
        text: '',
        vazvrat: false
      });
    },
    
    deleteShif(ind, item) {
      let x = item.price;
      this.$emit("delShif", x, false);
      this.doctor.splice(ind, 1);
    },
    delShifQosh(price, indOta, ind){
      this.$emit("delShif", price, false);
      this.doctor[indOta].price -= x;
      this.doctor[indOta].reg_doctor_category.splice(ind, 1)
    },
    delQosh(x, index, type, v) {
      if (v) {
        this.$emit("delShif", x, type, v);
      } else {
        this.$emit("delShif", x, type);
        this.doctor[index].price -= x;
        this.doctor[index].backlog -= x;
      }
    },
    SummaChange(price, index, type){
      this.doctor[index].price += price;
      this.doctor[index].backlog += price;
      this.$emit("shifAdd", price, type);
    },
    getShablon() {
      let self = this;
      axios({
        method: "post",
        url: "/shablon_doctor/shablonOne",
        data: { doctor_id: self.localUser.id }
      }).then(res => {
        if (res) {
          self.itemsShablon = res.data.data;
        }
      });
    },
    RowClickedShab($events, indRegShif) {
      let text = JSON.parse(this.doctor[indRegShif].text.toString())
      if(this.textChangeValue.index == null){
        text[0].value += $events.text
        this.doctor[indRegShif].text = JSON.stringify(text)
      } else {
        text[this.textChangeValue.index][`${this.textChangeValue.key}`] += $events.text 
        this.doctor[indRegShif].text = JSON.stringify(text)
      }
      this.textChangeValue = {
          index: null,
          key: null,
      }
      // this.doctor[indRegShif].text += $events.text;
      this.$bvModal.hide(
        `${"modal-shablon" + indRegShif + "shifokor" + this.modalIdCom}`
      );
    },
    textChangeValueIndex(key, index){
      this.textChangeValue = {
          index: index,
          key: key,
      }
    },
    // pechat(itemOta, item){
    //   let t = {};
    //   let child = []
    //   const find = this.pechatChange.findIndex(el => el.id == itemOta.id)
    //   if(find == -1){
    //     child.push(item)
    //     this.pechatChange.push({
    //       id: itemOta.id,
    //       name: itemOta.name,
    //       registration_recipe: itemOta.registration_recipe,
    //       reg_doctor_category: child
    //     })
    //   } else {
    //     const findChild = this.pechatChange[find].reg_doctor_category.findIndex(el => el.id == item.id);
    //     if(findChild == -1) {
    //       this.pechatChange[find].reg_doctor_category.push(item)
    //     } else {
    //       if(this.pechatChange[find].reg_doctor_category.length == 1){
    //         this.pechatChange.splice(find, 1)
    //       } else {
    //         this.pechatChange[find].reg_doctor_category.splice(findChild, 1)
    //       }
    //     }
    //   }
    // },
    allPechat(item) {
      let t = {};
      let x = [];
      x.push(item);
      t = {
        bemorId: this.$store.state.bemor.id,
        type: this.logoStatus,
        name: this.$store.state.bemor.fullname,
        gender: this.$store.state.bemor.gender,
        birthday: this.$store.state.bemor.birthday,
        create_at: this.created_at,
        doctor: x
      };
      localStorage.setItem("Bayonot", JSON.stringify(t));
      // this.$router.push("/user");
      const rout = this.$router.resolve({
        path: "/user-bayonot"
      });
      window.open(rout.href, "_blank");
    },
    vazvratQoshimcha(x, type, v, index, item) {
      if (type == true) {
        this.doctor[index].price -= x;
      } else {
        this.doctor[index].price += x;
      }
      this.$emit("delShif", x, type, v, item);
    },
    Vazvrat(item) {
      let x = "vazvrat";
      this.$emit("delShif", item.price, item.vazvrat, x, item);
    },
    getDarect() {
      let self = this;
      axios({
        method: "get",
        url: "/direct/all"
      }).then(res => {
        if (res) {
          self.darect = res.data.data
        }
      });
    },
    fuseSearch(options, search) {
      const fuse = new Fuse(options, {
        keys: ["name", "direct_id"],
        shouldSort: true
      });
      return search.length
        ? fuse.search(search).map(({ item }) => item)
        : fuse.list;
    },
  },
  mounted(){
    this.getShifokor();
    this.getDarect()
  }
};
</script>
<style>
.tek-card {
  border: 1px solid #ccc;
  border-radius: 10px;
  min-height: 0px;
  background: #fff;
  padding: 10px;
}
.pecat-change{
  /* background: #28a745; */
  padding: 2px;
  /* border-radius: 50%; */
  /* display: flex; */
  /* justify-content: center; */
  position: relative;
  /* top: -50px; */
}
.shif-price {
  margin-right: 20px;
  font-size: 18px;
  font-weight: 600;
  display: flex;
  border: 1px solid #ccc;
  background: #fff;
  border-radius: 7px;
  padding: 0px 1px;
}
.resept-div {
  margin-top: 20px;
}
.delete-vaz {
  display: flex;
  text-align: center;
}
.qosh-parent{
  margin-top: 20px;
  border: 1px solid rgb(46, 165, 255);
  border-radius: 10px;
  background: #f0f0f0;
  padding: 10px;
}
.qosh-header{
  display: flex;
  border: 1px solid rgb(46, 165, 255);
  border-radius: 10px;
  background: #fff;
  padding: 5px;
  margin-bottom: 10px;
  justify-content: space-between;
}
.qosh-name{
  font-size: 22px;
  text-align: center;
  color: rgb(70, 112, 250);
}
.vazvrat {
  background: #ff00004a !important;
}
.navbarBtnTashxis {
  color: #fff;
  border: 1px solid #fff;
  padding: 3px 15px;
  background: #0b0bdd;
  box-shadow: 5px 8px 10px rgba(25, 95, 176, 0.3);
  border-radius: 8px;
}
/* .tashxis-style{
  width: 890px;
  height: 1260px;
} */
/* .tashxis-style .ql-editor p{
  font-size: 18px;
  font-weight: 500;
} */
.shif-sarlovha {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  background: rgba(7, 100, 172, 0.058);
  border: 1px solid rgb(46, 165, 255);
  padding: 7px;
  border-radius: 10px;
}
</style>
