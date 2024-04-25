<template>
  <div>
    <div
      class="pay-form"
      :class="{ kasallikT: $store.state.kasTar || $route.name == 'ArxivOne' }"
    >
      <div class="table-form">
        <div>
          <div class="tolovjadvali">
            <TolovTableVue 
              :Paydatas="datas.registration_pay"
              @deleteSumma="deleteSumma"
              :ShowModalKey="false"
            />
          </div>
        </div>

        <div class="bottom-input-form">
          <div class="info-div">
            <div class="label-text">{{ $t("Тўланган сумма") }}</div>
            <div class="summ-div" :class="{ colorp: datas.pay_summa }">
              {{ datas.pay_summa | numFormat }}
            </div>
          </div>
          <div class="info-div">
            <div class="label-text">{{ $t("Скидка сумма") }}</div>
            <div class="summ-div">
              {{ datas.discount | numFormat }}
            </div>
          </div>
          <div class="info-div">
            <div class="label-text">{{ $t("Қарздорлик") }}</div>
            <div class="summ-div" :class="{ color: datas.backlog }">
              {{ datas.backlog | numFormat }}
            </div>
          </div>
        </div>

      </div>
      <div style="width: 50.5%;">
        <div class="input-form">
          <div class="form-table-pay">
            <table
              class="table table-sm table-bordered"
              style="background: #fff; widows: 100%; margin: 0px;"
            >
              <thead>
                <tr>
                  <th style="width: 40px;"></th>
                  <th style="width: calc(100% - 445px);">{{ $t("Номи") }}</th>
                  <th style="width: 100px;">{{ $t("Сумма") }}</th>
                  <th style="width: 100px;">{{ $t("Тўл сумма") }}</th>
                  <th style="width: 100px;">{{ $t("Скидка") }}</th>
                  <th style="width: 100px;">{{ $t("Қарздорлик") }}</th>
                </tr>
              </thead>

              <tbody style="width: 100%; padding: 0px;">
                <tr v-if="datas.registration_doctor.length > 0">
                  <td colspan="6">
                    <b>{{ $t("Шифокорлар") }}</b>
                  </td>
                </tr>

                <tr
                  v-for="(item, indexSh) in datas.registration_doctor"
                  :key="indexSh"
                  :class="{ color: item.backlog > 0, colorp: item.backlog == 0, colorq: item.pay_summa && item.backlog}"
                >
                  <td>
                    <b-form-checkbox
                      :disabled="!item.backlog"
                      size="lg"
                      @change="clickCheckbox(item, 'doctor', $event)"
                      v-model="item.checkbox"
                      :value="true"
                      :unchecked-value="false"
                    >
                      
                    </b-form-checkbox>
                  </td>
                  <td @click="ChangeRow(item, indexSh, 'doctor')">{{ item.doctor.name }}</td>
                  <td @click="ChangeRow(item, indexSh, 'doctor')">{{ item.price | numFormat }}</td>
                  <td @click="ChangeRow(item, indexSh, 'doctor')">{{ item.pay_summa | numFormat }}</td>
                  <td @click="ChangeRow(item, indexSh, 'doctor')">{{ item.discount | numFormat }}</td>
                  <td @click="ChangeRow(item, indexSh, 'doctor')">{{ item.backlog | numFormat }}</td>
                </tr>

                <tr v-if="datas.registration_inspection.length > 0">
                  <td colspan="6">
                    <b>{{ $t("Текширувлар") }}</b>
                  </td>
                </tr>

                <tr
                  v-for="(item, index) in datas.registration_inspection"
                  :key="index"
                  :class="{ color: item.backlog > 0,
                    colorp: item.backlog == 0,
                    colorq: item.pay_summa && item.backlog
                  }"
                >
                  <td>
                    <b-form-checkbox
                      :disabled="!item.backlog"
                      size="lg"
                      @change="clickCheckbox(item, 'inspection', $event)" 
                      v-model="item.checkbox" 
                      :value="true"
                      :unchecked-value="false"
                    >
                      
                    </b-form-checkbox>
                  </td>
                  <td @click="ChangeRow(item, index, 'inspection')">{{ item.inspection.name }}</td>
                  <td @click="ChangeRow(item, index, 'inspection')">{{ item.price | numFormat }}</td>
                  <td @click="ChangeRow(item, index, 'inspection')">{{ item.pay_summa | numFormat }}</td>
                  <td @click="ChangeRow(item, index, 'inspection')">{{ item.discount | numFormat }}</td>
                  <td @click="ChangeRow(item, index, 'inspection')">{{ item.backlog | numFormat }}</td>
                </tr>

                <tr v-if="datas.registration_palata.length > 0">
                  <td colspan="6">
                    <b>{{ $t("Стационар") }}</b>
                  </td>
                </tr>

                <tr
                  v-for="(item, index) in datas.registration_palata"
                  :key="index"
                  :class="{ color: item.backlog > 0,
                    colorp: item.backlog == 0,
                    colorq: item.pay_summa && item.backlog
                  }"
                >
                  <td>
                    <b-form-checkbox
                      :disabled="!item.backlog"
                      size="lg"
                      @change="clickCheckbox(item, 'palata', $event)"
                      v-model="item.checkbox" 
                      :value="true"
                      :unchecked-value="false"
                    >
                      
                    </b-form-checkbox>
                  </td>
                  <td @click="ChangeRow(item, index, 'palata')">{{ item.palatas.xona.name }} {{ item.palatas.name }}</td>
                  <td @click="ChangeRow(item, index, 'palata')">{{ item.total_price | numFormat }}</td>
                  <td @click="ChangeRow(item, index, 'palata')">{{ item.pay_summa | numFormat }}</td>
                  <td @click="ChangeRow(item, index, 'palata')">{{ item.discount | numFormat }}</td>
                  <td @click="ChangeRow(item, index, 'palata')">{{ item.backlog | numFormat }}</td>
                </tr>
              </tbody>
            </table>
            <table
              class="table table-sm table-bordered"
              style="background: #fff; widows: 100%; margin: 0px;"
            >
              <tbody style="width: 100% !important;">
                <tr
                  v-for="(itemOper, index) in datas.surgery_registration"
                  :key="index"
                >
                  <td style="padding: 0px !important; width: 100% !important;">
                    <tr style="width: 200px;">
                      <td colspan="5">
                        <b>{{ $t("Операциялар") }}</b>
                      </td>
                    </tr>
                    <tr
                      :class="{ color: itemOper.backlog > 0,
                        colorp: itemOper.backlog == 0,
                        colorq: itemOper.pay_summa && itemOper.backlog
                      }"
                    >
                    <td>
                      <b-form-checkbox
                        :disabled="!itemOper.backlog"
                        size="lg"
                        @change="clickCheckbox(itemOper, 'surgery', $event)"
                        v-model="item.checkbox" 
                        :value="true"
                        :unchecked-value="false"
                      >
                        
                      </b-form-checkbox>
                    </td>
                      <td @click="ChangeRow(itemOper, index, 'surgery')" style="width: calc(100% - 400px);">{{ itemOper.name }}</td>
                      <td @click="ChangeRow(itemOper, index, 'surgery')" style="width: 100px;">{{ itemOper.price | numFormat }}</td>
                      <td @click="ChangeRow(itemOper, index, 'surgery')" style="width: 100px;">{{ itemOper.pay_summa | numFormat }}</td>
                      <td @click="ChangeRow(itemOper, index, 'surgery')" style="width: 100px;">{{ itemOper.discount | numFormat }}</td>
                      <td @click="ChangeRow(itemOper, index, 'surgery')" style="width: 100px;">{{ itemOper.backlog | numFormat }}</td>
                    </tr>
                    <tr
                      v-if="itemOper.surgery_doctor.length > 0"
                    >
                      <td colspan="5">
                        <b>{{ $t("Жарроҳлик вақтида") }}</b>
                      </td>
                    </tr>
                    <tr 
                      v-for="(itemChild, indChild) in itemOper.surgery_doctor"
                      :key="indChild"
                      :class="{ color: itemChild.backlog > 0,
                        colorp: itemChild.backlog == 0,
                        colorq: itemChild.pay_summa && itemChild.backlog
                      }"
                    >
                    <td>
                      <b-form-checkbox
                      :disabled="!itemChild.backlog"
                      size="lg"
                      @change="clickCheckbox(itemChild, 'surgery_doctor', $event)"
                      v-model="item.checkbox"
                      :value="true"
                      :unchecked-value="false"
                      >
                        
                      </b-form-checkbox>
                    </td>
                      <td @click="ChangeRow(itemChild, indChild, 'surgery_doctor', index)" style="width: calc(100% - 400px);">{{ itemChild.name }}</td>
                      <td @click="ChangeRow(itemChild, indChild, 'surgery_doctor', index)" style="width: 100px;">{{ itemChild.price | numFormat }}</td>
                      <td @click="ChangeRow(itemChild, indChild, 'surgery_doctor', index)" style="width: 100px;">{{ itemChild.pay_summa | numFormat }}</td>
                      <td @click="ChangeRow(itemChild, indChild, 'surgery_doctor', index)" style="width: 100px;">{{ itemChild.discount | numFormat }}</td>
                      <td @click="ChangeRow(itemChild, indChild, 'surgery_doctor', index)" style="width: 100px;">{{ itemChild.backlog | numFormat }}</td>
                    </tr>
                  </td>
                </tr>
              </tbody>
            </table>

            <b-modal
              :id="'modal-pay' + datas.id"
              :title="$t('Толовлар')"
              size="xl"
              hide-footer
            >
              <div class="input-form-tolov">
                <div class="pay-table-modal">
                  <!-- {{ chackedCheckboxes }} -->
                  <TolovTableVue
                    :Paydatas="modalData == true ? chackedCheckboxes : datas.registration_pay"
                    @deleteSumma="deleteSumma"
                    :ShowModalKey="tolov.key"
                    :ShovTable="chackedCheckboxes.length > 0 ? true : false"
                  />
                </div>
                <div class="inputs-form">
                  <div class="info-pay-div">
                    <div class="label-text">{{ $t("Сумма") }}</div>
                    <vue-numeric
                      class="numberic-pay"
                      separator="space"
                      :disabled="modalData"
                      :precision="2"
                      v-model="tolov.summa"
                    ></vue-numeric>
                  </div>
                  <div class="info-pay-div">
                    <div class="label-text">{{ $t("Скидка") }}</div>
                    <vue-numeric
                      class="numberic-pay"
                      :disabled="modalData || vazvrat > 0"
                      separator="space"
                      :precision="2"
                      v-model="tolov.discount"
                    ></vue-numeric>
                  </div>
                  <!-- <div class="info-pay-div">
                    <div class="label-text">{{ $t("Скидка фоизи") }}</div>
                    <vue-numeric
                      class="numberic-pay"
                      :disabled="modalData || vazvrat > 0"
                      @input="selectFoiz"
                      v-bind:max="100"
                      v-model="tolov.foiz"
                    ></vue-numeric>
                  </div> -->
                  <div class="info-pay-div">
                    <div class="label-text">{{ $t("Тўлов тури") }}</div>
                    <v-select
                      class="qidiruvselecta"
                      label="name"
                      :components="{ Deselect }"
                      :options="TolovTuri"
                      v-model="tolov.pay_type"
                    />
                  </div>
                  <div class="info-div izoh">
                    <div class="label-text">{{ $t("Изоҳ") }}</div>
                    <input class="summ-div izoh-input" type="text" v-model="tolov.comment" />
                  </div>
                </div>
                <div class="pay-btns">
                  <div class="modal-btn">
                    <b-button
                      variant="success"
                      class="btns-saqlash success"
                      @click="PayTolov(false)"
                    >
                      <b-icon font-scale="1" icon="cash-coin" class="mr-1"></b-icon>
                      {{ $t("Тўлов") }}
                    </b-button>
                  </div>
                  <div class="modal-btn">
                    <b-button
                      variant="primary"
                      class="btns-saqlash primary"
                      @click="PayTolov(true, true)"
                    >
                      <b-icon font-scale="1" icon="printer-fill" class="mr-1"></b-icon>
                      {{ $t("Навбат") }}
                      <b-spinner small v-if="sending"></b-spinner>
                    </b-button>
                  </div>
                  <div class="modal-btn">
                    <b-button
                      variant="primary"
                      class="btns-saqlash primary"
                      @click="PayTolov(false, true)"
                    >
                      <b-icon font-scale="1" icon="printer-fill" class="mr-1"></b-icon>
                      {{ $t("Чек..") }}
                      <b-spinner small v-if="sending"></b-spinner>
                    </b-button>
                  </div>
                  <div class="modal-btn">
                    <b-button
                      variant="danger"
                      class="btns-saqlash danger"
                      @click="PayVozvrat(false)"
                    >
                      <b-icon font-scale="1" icon="reply-all-fill" class="mr-1"></b-icon>
                      {{ $t("Возврат") }}
                    </b-button>
                  </div>
                </div>
              </div>
            </b-modal>

          </div>
        </div>

        <div class="bottom-input-form">
          <div class="info-div-b">
            <b-button
              variant="danger"
              class="btns-saqlash danger"
              @click="PayVozvrat(true)"
            >
              <b-icon font-scale="1" icon="reply-all-fill" class="mr-1"></b-icon>
              {{ $t("Возврат") }}
            </b-button>
          </div>

          <div class="info-div-b">
            <b-button
              variant="primary"
              class="btns-saqlash primary"
              @click="PayTolov(false, true)"
            >
              <b-icon font-scale="1" icon="printer-fill" class="mr-1"></b-icon>
              {{ $t("Чек") }}
              <b-spinner small v-if="sending"></b-spinner>
            </b-button>
          </div>

          <div class="info-div-b">
            <b-button
              variant="primary"
              class="btns-saqlash primary"
              @click="TolovChek(true, false)"
            >
              <b-icon font-scale="1" icon="printer-fill" class="mr-1"></b-icon>
              {{ $t("Навбат") }}
              <b-spinner small v-if="sending"></b-spinner>
            </b-button>
          </div>

          <div class="info-div-b">
            <b-button
              variant="success"
              class="btns-saqlash success"

              @click="TolovUmumiy"
            >
              <b-icon font-scale="1" icon="cash-coin" class="mr-1"></b-icon>
              {{ $t("Тўлов") }}
            </b-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import moment from "moment";
import TolovTableVue from "./TolovTable.vue";
export default {
  props: [
    "datas",
    "vazvrat"
  ],
  components: {
    TolovTableVue
  },
  data() {
    return {
      TolovTuri: ["Naqt", "Plastik", "Click"],
      chackedCheckboxes: [],
      modalData: false,
      regData: {},
      tolov: {
        index: null,
        indParent: null,
        pay_type: "Naqt",
        summa: 0,
        discount: 0,
        backlog: 0,
        vozvrat: false,
        key: "",
        comment: "",
        status: "",
        hodim_id: null,
        doctor_id: null,
        foiz: 0,
        item:[]
      },
      dataInspection: [],
      dataDoctor: [],
      // Paydatas: [],
      Deselect: {
        render: createElement => createElement("span", "")
      },
      Options: [],
      // vazvratValue: false,
      sending: false
    };
  },
  watch:{
    vazvrat: function(val) {
      if (val) {
        this.tolov.summa = val;
      }
    },

  },
  filters: {
    dateFormatDD: function(date) {
      if (date) {
        return moment.unix(date).format("DD.MM HH:mm");
      } else {
        return "";
      }
    }
  },
  methods: {
    TolovUmumiy(){
      this.modalData = true
      this.$bvModal.show('modal-pay' + this.datas.id)
    },
    PayTolov(navbat, type) {
      if(this.chackedCheckboxes.length > 0 && this.modalData){
        let itemD = []
        let itemT = []
        
        this.chackedCheckboxes.forEach(el => {
          
          let status = el.status;
          if(status == "doctor"){
            this.datas.registration_doctor.forEach(e => {
              if(e.key == el.key){
                e.pay_summa += el.summa;
                e.backlog -= el.summa

                if(type){
                  let ind = itemD.findIndex(i => i.doctor_id == el.doctor_id)
                  if(ind === -1){
                    itemD.push({
                      backlog: el.backlog,
                      discount: el.discount,
                      id: el.id,
                      pay_summa: el.pay_summa,
                      price: el.price,
                      doctor_id: el.doctor_id,
                      doctor: this.dataDoctor
                    })
                  } else{
                    itemD[ind].backlog += el.backlog
                    itemD[ind].discount += el.discount
                    itemD[ind].pay_summa += el.pay_summa
                    itemD[ind].price += el.price
                  }
                }
              }
            })
          } 
          else if(status == "inspection"){
            this.datas.registration_inspection.forEach(e => {
              if(e.key == el.key){
                e.pay_summa += el.summa;
                e.backlog -= el.summa
                if(type){
                  let ind = itemT.findIndex(i => i.user_id == el.hodim_id)
                  if(ind === -1){
                    itemT.push({
                      backlog: el.backlog,
                      discount: el.discount,
                      id: el.id,
                      pay_summa: el.pay_summa,
                      price: el.price,
                      user_id: el.hodim_id,
                      inspection: this.dataInspection
                    })
                  } else{
                    itemT[ind].backlog += el.backlog
                    itemT[ind].discount += el.discount
                    itemT[ind].pay_summa += el.pay_summa
                    itemT[ind].price += el.price
                  }
                }
              }
            })
          } 
          else if(status == "surgery"){
            this.datas.surgery_registration.forEach(e => {
              if(e.key == el.key){
                e.pay_summa += el.summa;
                e.backlog -= el.summa
              }
            })
          } 
          else if(status == "surgery_doctor"){
            this.datas.surgery_registration.forEach(e => {
              e.surgery_doctor.forEach(t => {
                if(t.key == el.key){
                  t.pay_summa += el.summa;
                  t.backlog -= el.summa
                }
              })
            })
          } 
          else if(status == "palata"){
            this.datas.registration_palata.forEach(e => {
              if(e.key == el.key){
                e.pay_summa += el.summa;
                e.backlog -= el.summa
              }
            })
          }
          el.pay_type = this.tolov.pay_type
          el.comment = this.tolov.comment
          this.datas.registration_pay.push(el)
        })
        this.datas.registration_doctor.forEach(el => {
          el.checkbox = false;
        })
        this.datas.registration_inspection.forEach(el => {
          el.checkbox = false;
        })
        this.datas.registration_palata.forEach(el => {
          el.checkbox = false;
        })
        this.datas.surgery_registration.forEach(el => {
          el.checkbox = false;
          el.surgery_doctor.forEach(e => {
            e.checkbox = false;
          })
        })
        if(this.tolov.summa){
          this.datas.pay_summa += this.tolov.summa;
          this.datas.discount += this.tolov.discount;
          this.datas.backlog -= this.tolov.summa + this.tolov.discount;
        }
        if(type){
          this.TolovChek(navbat, true, null, null, itemD, itemT)
        }
        this.$bvModal.hide('modal-pay' + this.datas.id)
        this.tolov = {
          index: null,
          indParent: null,
          pay_type: "Naqt",
          summa: 0,
          key: "",
          vozvrat: false,
          discount: 0,
          comment: "",
          status: 0,
          hodim_id: 0,
          doctor_id: 0,
          foiz: 0
        };
        this.chackedCheckboxes = []
        this.modalData = false

      } else if(!this.modalData) {
        let status = this.tolov.status
        let index = this.tolov.index
        let indParent = this.tolov.indParent
        let pay_summa = this.tolov.summa
        let discount = this.tolov.discount
        let summaType = false
        if(discount == this.tolov.backlog || pay_summa != 0){
          summaType = true
        }
        let datasSum = this.tolov.summa + this.tolov.discount

        if(summaType && this.tolov.backlog >= datasSum){
          let tolovData = []
        
          if(status == "doctor"){
            this.datas.registration_doctor[index].pay_summa += pay_summa;
            this.datas.registration_doctor[index].discount += discount;
            this.datas.registration_doctor[index].backlog = 
              this.datas.registration_doctor[index].price - 
                (this.datas.registration_doctor[index].pay_summa + this.datas.registration_doctor[index].discount);
            if(type){
              let data = this.datas.registration_doctor[index]
              let dataD = {
                backlog: data.backlog,
                discount: data.discount,
                id: data.id,
                pay_summa: data.pay_summa,
                price: data.price,
                doctor_id: data.doctor_id,
                doctor: [{
                  key: data.key,
                  price: data.price,
                  doctor_id: data.doctor_id,
                  name: data.doctor.name,
                  reg_doctor_category: data.reg_doctor_category,
                }]
              }
              tolovData.push(dataD)
            }
          } 
          else if(status == "inspection"){
            this.datas.registration_inspection[index].pay_summa += pay_summa;
            this.datas.registration_inspection[index].discount += discount;
            this.datas.registration_inspection[index].backlog = 
              this.datas.registration_inspection[index].price - 
                (this.datas.registration_inspection[index].pay_summa + this.datas.registration_inspection[index].discount);
            if(type){
              let data = this.datas.registration_inspection[index];
              let dataD = {
                backlog: data.backlog,
                discount: data.discount,
                id: data.id,
                pay_summa: data.pay_summa,
                price: data.price,
                user_id: data.user_id,
                inspection: [
                  {
                    key: data.key,
                    price: data.price,
                    user_id: data.user_id,
                    name: data.inspection.name,
                    child: data.type ? data.registration_inspection_child : []
                  } 
                ]
              }
              tolovData.push(dataD)
            }
          } 
          else if(status == "surgery"){
            this.datas.surgery_registration[index].pay_summa += pay_summa;
            this.datas.surgery_registration[index].discount += discount;
            this.datas.surgery_registration[index].backlog = 
              this.datas.surgery_registration[index].price - 
                (this.datas.surgery_registration[index].pay_summa + this.datas.surgery_registration[index].discount);
          } 
          else if(status == "surgery_doctor"){
            this.datas.surgery_registration[indParent].surgery_doctor[index].pay_summa += pay_summa;
            this.datas.surgery_registration[indParent].surgery_doctor[index].discount += discount;
            this.datas.surgery_registration[indParent].surgery_doctor[index].backlog = 
              this.datas.surgery_registration[indParent].surgery_doctor[index].price - 
                (this.datas.surgery_registration[indParent].surgery_doctor[index].pay_summa + this.datas.surgery_registration[indParent].surgery_doctor[index].discount);
          } 
          else if(status == "palata"){
            this.datas.registration_palata[index].pay_summa += pay_summa;
            this.datas.registration_palata[index].discount += discount;
            this.datas.registration_palata[index].backlog = 
              this.datas.registration_palata[index].total_price - 
                (this.datas.registration_palata[index].pay_summa + this.datas.registration_palata[index].discount);
          }
          if(this.tolov.summa){
            let x = {
              user_id: JSON.parse(localStorage.getItem("user")).id,
              pay_type: this.tolov.pay_type,
              discount: this.tolov.discount,
              backlog: this.datas.backlog,
              summa: this.tolov.summa,
              comment: this.tolov.comment,
              umumiy_sum: this.datas.summa,
              key: this.tolov.key,
              hodim_id: this.tolov.hodim_id,
              doctor_id: this.tolov.doctor_id,
              status: this.tolov.status,
              pay_summa: this.datas.pay_summa,
              date_time: new Date()
                .valueOf()
                .toString()
                .slice(0, 10)
            };
            this.datas.registration_pay.push(x);
            this.datas.pay_summa += this.tolov.summa;
            this.datas.discount += this.tolov.discount;
            this.datas.backlog -= this.tolov.summa + this.tolov.discount;
          }
          if(type){
            this.TolovChek(navbat, true, this.tolov.status, tolovData)
          }
          this.tolov = {
            index: null,
            indParent: null,
            pay_type: "Naqt",
            backlog: 0,
            summa: 0,
            key: "",
            vozvrat: false,
            discount: 0,
            comment: "",
            status: 0,
            hodim_id: 0,
            doctor_id: 0,
            foiz: 0
          };
          this.$bvModal.hide('modal-pay' + this.datas.id)
        } else {
          this.$bvToast.toast(this.$t("Сумма хато критилди"), {
            title: this.$t("Огоҳлантириш"),
            autoHideDelay: 2000,
            variant: "danger",
            appendToast: true
          });
        }
      }
    },
    clickCheckbox(item, status, $event){
      console.log("Item",item.registration_inspection_child,status)
      // this.tolov = {
      //   index: null,
      //   indParent: null,
      //   pay_type: "Naqt",
      //   summa: 0,
      //   backlog: 0,
      //   discount: 0,
      //   vozvrat: false,
      //   key: "",
      //   comment: "",
      //   pay_doc_id: null,
      //   status: "",
      //   hodim_id: 0,
      //   doctor_id: 0,
      //   foiz: 0
      // }
      if(this.chackedCheckboxes.length == 0){
        this.tolov.summa = 0
        this.tolov.backlog = 0
      }
      const indexDel = this.chackedCheckboxes.findIndex(el =>
        el.key == item.key
      )

      let doctorInd = this.dataDoctor.findIndex(el => {
        el.key == item.key
      })
      if(item.checkbox == true && doctorInd === -1){
        if(status == "doctor"){
          let data = {
            key: item.key,
            price: item.price,
            doctor_id: item.doctor_id,
            name: item.doctor.name,
            reg_doctor_category: item.reg_doctor_category,
          }
          this.dataDoctor.push(data)
        }
      } else if (item.checkbox == false && doctorInd !== -1){
        this.dataDoctor.splice(doctorInd, 1)
      }

      let inspectionInd = this.dataInspection.findIndex(el => {
        el.key == item.key
      })
      if(item.checkbox == true && inspectionInd === -1){
        if (status == "inspection"){
          let childs = []
          if(item.type){
            childs = item.registration_inspection_child
          }
          // for (let index = 0; index < item.registration_inspection_child.length; index++) {
          //   const element = item.registration_inspection_child[index];
          //   childs.push(element)
          // }
          let data = {
            key: item.key,
            price: item.price,
            user_id: item.user_id,
            name: item.inspection.name,
            child: childs
          }
          this.dataInspection.push(data)
          console.log("CHild",data)
        }
      } else if (item.checkbox == false && inspectionInd !== -1){
        this.dataInspection.splice(inspectionInd, 1)
      }

      if(item.checkbox == true && indexDel === -1){
        this.chackedCheckboxes.push({
          user_id: JSON.parse(localStorage.getItem("user")).id,
          pay_type: this.tolov.pay_type,
          discount: 0,
          backlog: 0,
          summa: item.backlog,
          comment: this.tolov.comment,
          umumiy_sum: this.datas.summa,
          key: item.key,
          hodim_id: item.user_id ? item.user_id : 0,
          doctor_id: item.doctor_id ? item.doctor_id : 0,
          status: status,
          pay_summa: item.backlog,
          date_time: new Date()
            .valueOf()
            .toString()
            .slice(0, 10)
        })
        this.tolov.summa += item.backlog
        this.tolov.backlog += item.backlog
      } else if(item.checkbox == false && indexDel !== -1){
        this.chackedCheckboxes.splice(indexDel, 1)
        this.tolov.summa -= item.backlog
        this.tolov.backlog -= item.backlog
        
      }
      this.modalData = true
      // this.$bvModal.hide('modal-pay' + this.datas.id)
    },
    PayVozvrat(type) {
      if (type == true) {
        this.$bvModal.show('modal-pay' + this.datas.id)
      } else {
        let tolanganUmumSum = this.tolov.summa + this.tolov.discount;
        if (tolanganUmumSum <= this.datas.pay_summa) {
          // this.$emit("TolovVozvrat", this.tolov);
          let v = {};
          this.datas.pay_summa -= this.tolov.summa;
          this.datas.summa -= this.tolov.summa;
          v = {
            user_id: JSON.parse(localStorage.getItem("user")).id,
            pay_type: this.tolov.pay_type,
            discount: this.tolov.discount,
            backlog: this.datas.backlog,
            summa: this.tolov.summa * -1,
            comment: this.tolov.comment,
            umumiy_sum: this.datas.summa,
            pay_summa: this.datas.pay_summa,
            date_time: new Date()
              .valueOf()
              .toString()
              .slice(0, 10)
          };
          if (this.tolov.summa != 0) {
            this.datas.registration_pay.push(v);
            // this.vazvrat = 0
            this.tolov = {
              index: null,
              indParent: null,
              pay_type: "Naqt",
              summa: 0,
              key: "",
              vozvrat: false,
              discount: 0,
              comment: "",
              status: 0,
              hodim_id: 0,
              doctor_id: 0,
              foiz: 0
            };
            this.$bvModal.hide('modal-pay' + this.datas.id)
          } else {
            this.$bvToast.toast(this.$t(`Сумма хато критилди`), {
              title: this.$t("Огоҳлантириш"),
              variant: "danger",
              autoHideDelay: 2000,
              appendToast: true
            });
          }
        } else {
          this.$bvToast.toast(this.$t("Сумма хато критилди"), {
            title: this.$t("Огоҳлантириш"),
            autoHideDelay: 2000,
            variant: "danger",
            appendToast: true
          });
        }
        // let tolanganUmumSum = this.tolov.summa + this.tolov.discount;
        // if (tolanganUmumSum <= this.datas.pay_summa) {
        //   this.$emit("TolovVozvrat", this.tolov);
        // } else {
        //   this.$bvToast.toast(this.$t("Сумма хато критилди"), {
        //     title: this.$t("Огоҳлантириш"),
        //     autoHideDelay: 2000,
        //     variant: "danger",
        //     appendToast: true
        //   });
        // }
      }
    },
    ChangeRow(item, index, status, indParent){
      // this.$set(this.checkedCheckboxes, index, true);
        this.chackedCheckboxes = []
        this.datas.registration_doctor.forEach(el => {
          el.checkbox = false;
        })
        this.datas.registration_inspection.forEach(el => {
          el.checkbox = false;
        })
        this.datas.registration_palata.forEach(el => {
          el.checkbox = false;
        })
        this.datas.surgery_registration.forEach(el => {
          el.checkbox = false;
          el.surgery_doctor.forEach(e => {
            e.checkbox = false;
          })
        })

        this.dataDoctor = []
        this.dataInspection = []

        if(status == "doctor"){
          let data = {
            key: item.key,
            price: item.price,
            doctor_id: item.doctor_id,
            name: item.doctor.name,
            reg_doctor_category: item.reg_doctor_category,
          }
          this.dataDoctor.push(data)
        }

        if (status == "inspection"){
          let child = []
          if(item.type){
            child = item.registration_inspection_child
          }
          let data = {
            key: item.key,
            price: item.price,
            user_id: item.user_id,
            name: item.inspection.name,
            child: child
          }
          this.dataInspection.push(data)
        }


        this.modalData = false
        this.$bvModal.show('modal-pay' + this.datas.id)
        // this.regData = 
        this.tolov = {
          index: index,
          indParent: indParent,
          pay_type: "Naqt",
          summa: item.backlog,
          backlog: item.backlog,
          discount: 0,
          vozvrat: false,
          key: item.key,
          comment: "",
          pay_doc_id: item.id,
          status: status,
          hodim_id: item.user_id ? item.user_id : 0,
          doctor_id: item.doctor_id ? item.doctor_id : 0,
          foiz: 0
        }
    },
    deleteSumma(item, id) {
      // this.datas.registration_pay.splice(id, 1);
      if(this.modalData){
        this.chackedCheckboxes.splice(id, 1);
      } else {
        if(item.status == 'doctor'){
          this.datas.registration_doctor.forEach(el => {
            if(item.key == el.key){
              el.pay_summa -= item.summa
              el.discount -= item.discount
              el.backlog += item.summa + item.discount
            }
          })
        } 
        else if (item.status == 'inspection'){
          this.datas.registration_inspection.forEach(el => {
            if(item.key == el.key){
              el.pay_summa -= item.summa
              el.discount -= item.discount
              el.backlog += item.summa + item.discount
            }
          })
        } 
        else if (item.status == 'surgery'){
          this.datas.surgery_registration.forEach(el => {
            if(item.key == el.key){
              el.pay_summa -= item.summa
              el.discount -= item.discount
              el.backlog += item.summa + item.discount
            }
          })
        }
        else if (item.status == 'surgery_doctor'){
          this.datas.surgery_registration.forEach(el => {
            el.surgery_doctor.forEach(e => {
              if(item.key == e.key){
                e.pay_summa -= item.summa
                e.discount -= item.discount
                e.backlog += item.summa + item.discount
              }
            })
          })
        }
        else if(item.status == 'palata'){
          this.datas.registration_palata.forEach(el => {
            if(item.key == el.key){
              el.pay_summa -= item.summa
              el.discount -= item.discount
              el.backlog += item.summa + item.discount
            }
          })
        }
        if (item.summa < 0) {
          this.datas.pay_summa -= item.summa;
          this.datas.discount -= item.discount;
          this.datas.summa += item.summa * -1 + item.discount;
        } else {
          this.datas.pay_summa -= item.summa;
          this.datas.discount -= item.discount;
          this.datas.backlog += item.summa + item.discount;
        }
        this.datas.registration_pay.splice(id, 1);
      }
    },
    TolovChek(navbat, type, status, tolovData, itemD, itemT) {
      let self = this;
      // sendingT = self.sending = true;
      if(!itemD){
        itemD = []
      }
      if(!itemT){
        itemT = []
      }
      this.sending = true
      let palata = [];
      let ChekTolov = {};
      let insp = []
      let insD = []
      if (self.datas.registration_palata.length > 0) {
        self.datas.registration_palata.forEach(el => {
          let indP = palata.findIndex(i => i.palata_id == el.palata_id);
          if (indP !== -1) {
            palata[indP].day += 1;
            palata[indP].total_price += el.price;
          } else {
            palata.push({ ...el });
          }
        });
      }
      let url = "";
      let method = "post";
      if (this.$route.name == "Create") {
        url = "/registration/create";
        method = "post";
      } else if (this.$route.name == "Update") {
        url = "/registration/update/" + self.$route.params.id;
        method = "patch";
      }
      axios({
        method: method,
        url: url,
        data: self.datas
      }).then(res => {
        if (res) {
          let bemor = {
            fullname: self.$store.state.bemor.fullname,
            id: self.$store.state.bemor.id,
            phone: self.$store.state.bemor.phone,
            birthday: self.$store.state.bemor.birthday
          };

          if(!type){
            let dataD = []
            let dataT = []
            self.datas.registration_inspection.forEach(el => {
              let childs = []
              if(el.type){
                childs = el.registration_inspection_child
              }
              dataT.push({
                key: el.key,
                price: el.price,
                user_id: el.user_id,
                name: el.inspection.name,
                child:childs
              })
              let ind = insp.findIndex(i => i.user_id == el.user_id)
              if(ind === -1){
                insp.push({
                  backlog: el.backlog,
                  discount: el.discount,
                  id: el.id,
                  pay_summa: el.pay_summa,
                  price: el.price,
                  user_id: el.user_id,
                  inspection: dataT
                })
              } else{
                insp[ind].backlog += el.backlog
                insp[ind].discount += el.discount
                insp[ind].pay_summa += el.pay_summa
                insp[ind].price += el.price
              }
            })
            self.datas.registration_doctor.forEach(el => {
              dataD.push({
                key: el.key,
                price: el.price,
                doctor_id: el.doctor_id,
                name: el.doctor.name,
                reg_doctor_category: el.reg_doctor_category,

              })
              let ind = insD.findIndex(i => i.doctor_id == el.doctor_id)
              if(ind === -1){
                insD.push({
                  backlog: el.backlog,
                  discount: el.discount,
                  id: el.id,
                  pay_summa: el.pay_summa,
                  price: el.price,
                  doctor_id: el.doctor_id,
                  doctor: dataD
                })
              } else{
                insD[ind].backlog += el.backlog
                insD[ind].discount += el.discount
                insD[ind].pay_summa += el.pay_summa
                insD[ind].price += el.price
              }
            })
          }
          if(tolovData){
            if(status == 'doctor'){
              insD = tolovData
            } else if(status == 'inspection') {
              insp = tolovData
            }
          }
          // console.log(status, insp, itemT)
          ChekTolov = {
            type_service: res.data.data.type_service,
            navbat: navbat,
            summa: self.datas.summa,
            created_at: res.data.data.created_at,
            id: res.data.data.id,
            backlog: self.datas.backlog,
            discount: self.datas.discount,
            pay_summa: self.datas.pay_summa,
            doctor: insD.length != 0 ? insD : itemD,
            inspection: insp.length != 0 ? insp : itemT,
            regDoctor: self.datas.registration_doctor,
            regInspection: self.datas.registration_inspection,
            operatsiya: self.datas.surgery_registration,
            palata: palata
          };
          localStorage.setItem("ChekTolov", JSON.stringify(ChekTolov));
          localStorage.setItem("BemorName", JSON.stringify(bemor));
          ChekTolov = {};
          self.$store.state.bemor = {}
          const route = self.$router.resolve({
            path: "/user-chek/" + res.data.data.id
            // path: "/user-navbat-chek/" + res.data.data.id
          });
          window.open(route.href, "_blank");
          self.$router.push("/user");
        }
      });
    },
    selectFoiz() {
      if (this.tolov.foiz <= 100) {
        this.tolov.discount = this.datas.summa * (this.tolov.foiz / 100);
        if (this.tolov.foiz) {
          this.tolov.summa = this.datas.summa - this.tolov.discount;
          this.tolov.comment = `${this.tolov.foiz}% ${this.$t("чегирма")}`;
        }
      } else {
        this.$bvToast.toast(this.$t("Фоиз хато критилди"), {
          title: this.$t("Огоҳлантириш"),
          autoHideDelay: 2000,
          variant: "danger",
          appendToast: true
        });
      }
    }
  }
};
</script>
<style>
.color {
  background: #faa7a7d1 !important;
}
.colorp {
  background: #90ed8fd1 !important;
}
.colorq{
  background: #fff43dd1 !important;
}
.tolovjadvali {
  height: 401px;
  width: 100%;
  padding: 3px;
  /* margin-bottom: 5px; */
  overflow: auto;
  border-radius: 10px;
  background: rgba(7, 100, 172, 0.058);
  border: 1px solid rgb(46, 165, 255);
}
.pay-form {
  /* background: #f0f0f0; */
  /* padding: 5px; */
  width: 100%;
  /* border: 1px solid rgb(46, 165, 255); */
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  height: 510px;
}
.form-table-pay{
  width: 100%;
  height: 385px;
  overflow: auto;
  /* border: 1px solid rgb(46, 165, 255); */
}
.table-form {
  width: 49%;
  /* background: #fff; */
  /* border: 1px solid #ccc; */
}
.input-form-tolov{
  width: 100%;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  padding: 5px;
  border: 1px solid rgb(46, 165, 255);
  background: #fff;
}
.pay-table-modal{
  width: 56%;
}
.inputs-form{
  width: 23%;
  border: 1px solid rgb(46, 165, 255);
  background: rgba(7, 100, 172, 0.058);
  padding: 10px;
  border-radius: 10px;
}
.input-form {
  width: 100%;
  height: 401px;
  border-radius: 10px;
  padding: 5px;
  border: 1px solid rgb(46, 165, 255);
  background: rgba(7, 100, 172, 0.058);
}
.bottom-input-form {
  background: rgba(7, 100, 172, 0.058);
  border: 1px solid rgb(46, 165, 255);
  padding: 8px 7px;
  margin-top: 10px;
  text-align: center;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.numberic-pay {
  height: 40px;
  width: 100%;
  text-align: center;
  font-size: 18px;
  font-weight: 600;
  border: 1px solid #ccc;
  border-radius: 10px;
}
.qidiruvselecta {
  background: #fff;
  border-radius: 10px;
  width: 100%;
  height: 40px;
  margin-bottom: 10px;
}
.qidiruvselecta .vs__dropdown-toggle {
  height: 40px;
  border-radius: 10px;
  font-size: 18px;
  font-weight: 600;
}
.info-div {
  width: 33%;
  text-align: center;
}
.info-div-b {
  width: 24%;
  text-align: center;
}
.info-pay-div {
  text-align: center;
  margin-bottom: 10px;
}
.summ-div {
  border-radius: 10px;
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 600;
  background: #fff;
  border: 1px solid rgb(46, 165, 255);
}
.izoh {
  width: 100%;
}
.izoh-input{
  border: 1px solid #ccc;
}
.label-text {
  color: #007bff;
  margin-bottom: 5px;
  margin-top: 2px;
  font-size: 18px;
  font-weight: 700;
}
.modal-btn{
  margin-bottom: 10px;
}
.btns-saqlash {
  width: 100%;
  border-radius: 8px;
  border: 1px solid #fff;
  color: #fff;
  height: 75px;
  font-size: 22px;
  font-weight: 700;
}
.danger {
  background: #dd0b0b;
  padding: 5px !important;
  box-shadow: 5px 8px 10px rgba(176, 35, 25, 0.4);
}
.primary {
  box-shadow: 5px 8px 10px rgba(25, 60, 176, 0.4);
  background: #0b0bdd;
}
.success {
  box-shadow: 5px 8px 10px rgba(38, 176, 25, 0.4);
  background: #02b902;
}
.pay-btns {
  width: 20%;
  padding: 10px;
  background: rgba(7, 100, 172, 0.058);
  border: 1px solid rgb(46, 165, 255);
  border-radius: 10px;
  /* display: flex;
  justify-content: space-between; */
}
</style>
