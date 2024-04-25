<template>
  <div>
    <b-tabs active-nav-item-class="font-weight-bold text-light bg-info">
      <b-tab
        :title="itemRegOp.name"
        v-for="(itemRegOp, indRegOp) in operatsiya"
        :key="indRegOp"
        :class="{ kasallikT: $route.name == 'ArxivOne' }"
        title-link-class="mr-2 mt-1 text-light font-weight-bold bg-success"
        style="padding: 0px !important;"
      >
        <div class="tek-card">
          <div>
            <div
              class="shif-sarlovha"
              :class="{
                Arxive: $route.name == 'ArxivOne',
                vazvrat: itemRegOp.vazvrat == true
              }"
            >
              <div style="display: flex; justify-content: space-between; width: 530px;">
                <div v-if="!$store.state.kasTar">
                  <b-button
                    :disabled="
                      !(
                        localUser.doctor_id == itemRegOp.doctor_id ||
                        localUser.role == 'Admin'
                      )
                    "
                    class="navbarBtnTashxis"
                    v-b-modal="'modal-shablon' + indRegOp + 'operatsiya' + modalIdCom"
                    @click="getShablon"
                    variant="primary"
                  >
                    <b-icon icon="collection"></b-icon>
                  </b-button>
                  <b-modal
                    :id="'modal-shablon' + indRegOp + 'operatsiya' + modalIdCom"
                    size="lg"
                    :title="$t('Шаблонлар рўйхати')"
                    hide-footer
                  >
                    <!-- :modalId="modalId" -->
                    <Shablon
                      :indRegShif="indRegOp"
                      :modalIdCom="modalIdCom"
                      :shabType="'operatsiya'"
                      :itemsShablon="itemsShablon"
                      @ShablonGet="getShablon"
                      @RowClickedShab="RowClickedShab"
                    />
                  </b-modal>
                </div>
                <b-button
                  style="margin-left: 5px; margin-right: 5px;"
                  variant="primary"
                  @click="allPechat(itemRegOp)"
                  class="navbarBtnTashxis"
                >
                  <b-icon icon="printer-fill"></b-icon>
                  Печать
                </b-button>
                <b-button
                  class="navbarBtnTashxis"
                  v-if="!$store.state.kasTar"
                  v-b-modal="'modal-qosh' + indRegOp + modalIdCom"
                  @click="getQoshimcha"
                  variant="primary"
                >
                  <b-icon icon="plus-circle-fill"></b-icon>
                </b-button>
                <b-modal :id="'modal-qosh' + indRegOp + modalIdCom" size="xl" hide-footer>
                  <!-- <Shifokor :shifokor="qoshimcha" :index="indRegOp" @itemSh="itemOpReg"/> -->
                  <OperatsiyaVue
                    :operatsiyalar="qoshimcha"
                    :index="indRegOp"
                    @itemOper="QoshimchaAdd"
                  />
                </b-modal>
                <div>
                  <v-select
                    class="oper-select"
                    :disabled="itemRegOp.doctor_id != localUser.doctor_id &&
                      localUser.role != 'Admin' &&
                      localUser.role != 'Registrator'
                    "
                    label="name"
                    style="width: 250px; margin-left: 5px;"
                    :options="Shifokorlar"
                    :reduce="option => option.id"
                    v-model="itemRegOp.doctor_id"
                  />
                </div>
              </div>
              <div>
                <input
                  type="datetime-local"
                  class="input-datetime-local"
                  v-model="itemRegOp.date_doctor"
                >
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
                    style="width: 130px;"
                  >
                    {{ itemRegOp.price | numFormat }}
                  </div>
                  <button
                    v-if="localUser.role == 'Admin'"
                    class="navbarBtnTashxis-summa navbarBtnTashxis"
                    v-b-modal="'modal-summa-change-oper' + indRegOp + modalIdCom"
                    @click="OperPrice = itemRegOp.price"
                  >
                    <b-icon
                      style="width: 15px;"
                      icon="pencil-fill"
                    ></b-icon>
                  </button>
                  <b-modal
                    :id="'modal-summa-change-oper' + indRegOp + modalIdCom"
                    :title="itemRegOp.name"
                    hide-footer
                  >
                    <div style="width: 100%;">
                      <vue-numeric
                        class="numberic-pay"
                        separator="space"
                        :precision="2"
                        v-model="OperPrice"
                      ></vue-numeric>
                    </div>
                    <div class="CreateName">
                      <b-button
                        class="modalBtn1"
                        size="sm"
                        style="height: 37px;"
                        variant="danger "
                        @click="close(indRegOp)"
                      >
                        <b-icon icon="calendar2-x"></b-icon>
                        {{ $t("Бекор қилиш") }}
                      </b-button>
                      <b-button
                        class="mt-3 ml-2 modalBtn"
                        @click="Change(itemRegOp, indRegOp)"
                        variant="success"
                      >
                        <b-icon icon="calendar2-plus"></b-icon>
                        {{ $t("Сақлаш") }}
                      </b-button>
                    </div>
                  </b-modal>
                </div>
                <div
                  class="shif-price"
                  v-if="
                    localUser.role != 'Loborant' &&
                      localUser.role != 'Uzi ' &&
                      localUser.role != 'Shifokor'
                  "
                >
                  <div
                    style="width: 130px;"
                  >
                    {{ itemRegOp.all_summa | numFormat }}
                  </div>
                </div>
                <div style="width: 100px;">
                  <b-form-checkbox
                    :class="{ kasallikT: $store.state.kasTar }"
                    style="display: flex; width: 100px;"
                    v-model="itemRegOp.vazvrat"
                    v-if="
                      localUser.role == 'Kasser' ||
                        localUser.role == 'Admin' ||
                        localUser.role == 'Registrator'
                    "
                    @change="Vazvrat(itemRegOp)"
                    :value="true"
                    :unchecked-value="false"
                  >
                    Возврат
                  </b-form-checkbox>
                </div>
                <b-button
                  :class="{ kasallikT: $store.state.kasTar }"
                  v-if="backlog != 0"
                  style="width: 30px; height: 30px; display: flex; justify-content: center;"
                  @click="deleteOper(indRegOp, itemRegOp)"
                  variant="outline-danger"
                >
                  <b-icon style="width: 17px;" icon="trash"></b-icon>
                </b-button>
              </div>
            </div>
            <div>
              <Qoshimcha
                :qoshimcha="itemRegOp.surgery_doctor"
                :classvazvrat="itemRegOp.vazvrat"
                :backlog="backlog"
                :modalIdCom="modalIdCom"
                @SummaChange="SummaChange"
                @vazvratQoshimcha="vazvratQoshimcha"
                :indOta="indRegOp"
                @delQosh="delQosh"
              />
            </div>
          </div>
          <div :class="{ kasallikT: $store.state.kasTar }"
            class="tashxis-style"
          >
            <div>
              <div>
                <div class="oper-header-text">
                  <div>
                    {{ $t("Операцияга қадар") }}
                  </div>
                  <div>
                    <b-button
                      style="margin-left: 10px; margin-right: 10px;"
                      variant="primary"
                      @click="allPechat(itemRegOp, 'before_sur_text')"
                      class="navbarBtnTashxis"
                    >
                      <b-icon icon="printer-fill"></b-icon>
                      Печать
                    </b-button>
                  </div>
                </div>
                <VueEditorText 
                  :text="itemRegOp.before_sur_text"
                  :indReg="indRegOp"
                  :disabled="localUser.doctor_id == itemRegOp.doctor_id || localUser.role == 'Admin' ? false : true"
                  :textValue="'before_sur_text'"
                  :defaultHeigth="defaultHeigth"
                  @vueEditorText="vueEditorText"
                  @textChangeValueIndex="textChangeValueIndex"
                />
              </div>
            </div>

            <div>
              <div class="oper-header-text">
                  <div>
                    {{ $t("Операция") }}
                  </div>
                  <div>
                    <b-button
                      style="margin-left: 10px; margin-right: 10px;"
                      variant="primary"
                      @click="allPechat(itemRegOp, 'text')"
                      class="navbarBtnTashxis"
                    >
                      <b-icon icon="printer-fill"></b-icon>
                      Печать
                    </b-button>
                  </div>
                </div>
              <VueEditorText 
                  :text="itemRegOp.text"
                  :indReg="indRegOp"
                  :textValue="'text'"
                  :disabled="localUser.doctor_id == itemRegOp.doctor_id || localUser.role == 'Admin' ? false : true"
                  :defaultHeigth="defaultHeigth"
                  @vueEditorText="vueEditorText"
                  @textChangeValueIndex="textChangeValueIndex"
                />
            </div>

            <div>
              <div class="oper-header-text">
                <div>
                  {{ $t("Операциядан кейин") }}
                </div>
                <div>
                  <b-button
                    style="margin-left: 10px; margin-right: 10px;"
                    variant="primary"
                    @click="allPechat(itemRegOp, 'after_sur_text')"
                    class="navbarBtnTashxis"
                  >
                    <b-icon icon="printer-fill"></b-icon>
                    Печать
                  </b-button>
                </div>
              </div>
              <VueEditorText 
                :text="itemRegOp.after_sur_text"
                :indReg="indRegOp"
                :disabled="localUser.doctor_id == itemRegOp.doctor_id || localUser.role == 'Admin' ? false : true"
                :textValue="'after_sur_text'"
                :defaultHeigth="defaultHeigth"
                @vueEditorText="vueEditorText"
                @textChangeValueIndex="textChangeValueIndex"
              />
            </div>
          </div>
        </div>
      </b-tab>
    </b-tabs>
  </div>
</template>
<script>
// import Shifokor from '../Shifokor/Shifokor.vue';
import VueEditorText from "../VueEditorText.vue";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import Shablon from "../Shifokor/Shablon.vue";
import Qoshimcha from "../Qoshimcha.vue";
import OperatsiyaVue from "./Operatsiya.vue";
export default {
  props: ["operatsiya", "backlog", "modalIdCom", "created_at"],
  components: {
    // Shifokor,
    DatePicker,
    Shablon,
    OperatsiyaVue,
    Qoshimcha,
    VueEditorText
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
      qoshimcha: [],
      itemsShablon: [],
      Shifokorlar: [],
      defaultHeigth: "height: 930px;",
      textChangeValue: {
        index: null,
        key: null,
      },
      OperPrice: 0
    };
  },
  methods: {
    getQoshimcha() {
      // let self = this;
      // axios({
      //   method: "get",
      //   url: "/surgery_category/all"
      // }).then(res => {
      //   if (res) {
      //     self.qoshimcha = res.data.data;
      //   }
      // });
    },
    QoshimchaAdd(item, index) {
      let x = null;
      if (this.$store.state.bemor.citizen) {
        x = item.citizen_price;
      } else {
        x = item.price;
      }
      this.operatsiya[index].all_summa += x;
      this.$emit("shifAdd", x, true);
      this.operatsiya[index].surgery_doctor.push({
        category_id: item.id,
        name: item.name,
        price: x,
        doctor_id: item.doctor_id,
        backlog: +x,
        discount: 0,
        pay_summa: 0,
        key: new Date()
          .valueOf()
          .toString(),
        vazvrat: false
      });
    },
    close(ind){
      this.OperPrice = 0
      this.$bvModal.hide('modal-summa-change-oper' + ind + this.modalIdCom)
    },
    Change(item, ind){
      this.$emit("delShif", item.price, false);
      this.$emit("SummaChange", this.OperPrice, true);
      this.operatsiya[ind].price = this.OperPrice
      this.$bvModal.hide('modal-summa-change-oper' + ind + this.modalIdCom)
    },
    delQosh(x, index, type) {
      this.operatsiya[index].all_summa -= x;
      this.$emit("delShif", x, type);
    },
    vazvratQoshimcha(x, type, v, index, item) {
      if (type == true) {
        this.operatsiya[index].all_summa -= x;
      } else {
        this.operatsiya[index].all_summa += x;
      }
      this.$emit("delShif", x, type, v, item);
    },
    deleteOper(ind, item) {
      let operatsiyaSum = item.price;
      let qoshimchaSum = item.all_summa;
      let x = qoshimchaSum + operatsiyaSum;
      this.$emit("delShif", x, false);
      this.operatsiya.splice(ind, 1);
    },
    Vazvrat(item) {
      let x = "vazvrat";
      let price = item.price + item.all_summa;
      this.$emit("delShif", price, item.vazvrat, x, item);
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
    vueEditorText(val, index, indexChild, textValue){
      this.operatsiya[index][`${textValue}`] = val;
      // console.log(this.doctor[index].text)
    },
    textChangeValueIndex(key, index){
      this.textChangeValue = {
          index: index,
          key: key,
      }
    },
    RowClickedShab($events, ind) {
      this.operatsiya[ind].text += $events.text;
      this.$bvModal.hide(`${'modal-shablon' + ind + 'operatsiya' + this.modalIdCom}`)
    },
    SummaChange(price, index, type){
      this.operatsiya[index].all_summa += price;
      this.$emit("shifAdd", price, type);
    },
    allPechat(item, key) {
      let t = [];
      let x = [];
      x.push(item);
      t = {
        key: key ? key : false,
        bemorId: this.$store.state.bemor.id,
        name: this.$store.state.bemor.fullname,
        gender: this.$store.state.bemor.gender,
        birthday: this.$store.state.bemor.birthday,
        create_at: this.created_at,
        doctor: x
      };
      localStorage.setItem("Bayonot", JSON.stringify(t));
      // this.$router.push("/user");
      const rout = this.$router.resolve({
        path: "/user/operatsiya"
      });
      window.open(rout.href, "_blank");
      this.pechatTek = [];
    },
    getShifokor(){
      let self = this;
      axios({
        method: "get",
        url: "/doctor/all"
      }).then(res => {
        if (res) {
          self.Shifokorlar = res.data;
        }
      });
    }
  },
  mounted(){
    this.getShifokor()
  }
};
</script>
<style>
.oper-select .vs__selected-options span:first-child {
  width: 88% !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  white-space: nowrap !important;
}
.oper-select .vs__selected-options {
  width: 88%;
}
.oper-header-text{
  font-size: 20px;
  font-weight: 700;
  width: 100%;
  padding: 5px;
  display: flex;
  background: rgba(7, 100, 172, 0.058);
  border: 1px solid rgb(70, 112, 250);
  border-radius: 10px;
  color: rgb(70, 112, 250);
}
</style>
