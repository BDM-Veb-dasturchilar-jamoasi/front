<template>
  <div class="bemor-form">
    <div>
      <div
        class="hizmat-turi"
        :class="{ kasallikT: $store.state.kasTar || $route.name == 'ArxivOne' }"
      >
        <span class="spanlar">{{ $t("Хизмат тури") }}</span>
        <v-select
          class="qidiruvselect"
          label="name"
          :components="{ Deselect }"
          v-model="datas.type_service"
          :options="XizmatTuri"
          :reduce="options => options.key"
        />
      </div>
      <b-tabs active-nav-item-class="font-weight-bold text-light bg-success">
        <b-tab
          title="Приём"
          v-if="localUser.role != 'Uzi ' && localUser.role != 'Loborant'"
          title-link-class="mr-1 text-primary font-weight-bold"
          style="padding: 0px !important;"
        >
          <div class="tek-card">
            <div
              class="tab-in-btv"
              v-if="
                !$store.state.kasTar &&
                  $route.name != 'ArxivOne' && 
                  localUser.role != 'Shifokor' && 
                  localUser.role != 'Loborant'
              "
            >
              <b-button
                variant="primary"
                class="navbar-brn-primary"
                v-b-modal="'modal-shifokor' + datas.id"
              >
                {{ $t("Шифокорлар") }}
              </b-button>
              <b-modal
                :id="'modal-shifokor' + datas.id"
                title=""
                size="xl"
                hide-footer
              >
                <div>
                  
                  <ShifokorVue :shifokor="shifokor" @itemSh="itemShReg" />
                </div>
              </b-modal>
            </div>
            <!-- <div
              v-if="$route.name == 'Create' && localUser.role == 'Registrator'"
            >
              <ShifokorVue :shifokor="shifokor" @itemSh="itemShReg" />
            </div> -->
            <div>
              <ShifokorTash
                @delShif="Delete"
                @shifAdd="shifAdd"
                :doctor="datas.registration_doctor"
                :modalId="datas.id"
                :modalIdCom="modalIdCom"
                :backlog="datas.backlog"
                :created_at="datas.created_at"
              />
            </div>
          </div>
        </b-tab>
        <b-tab
          :title="$t('Текширувлар')"
          v-if="localUser.role != 'Uzi '"
          @click="getTekshiruvlar(false)"
          title-link-class="mr-1 text-primary font-weight-bold"
          style="padding: 0px !important;"
        >
          <div class="tek-card">
            <div style="display: flex;">
              <div
                class="tab-in-btv"
                v-if="
                  !$store.state.kasTar &&
                    $route.name != 'ArxivOne' &&
                    localUser.role != 'Loborant'
                "
              >
                <b-button
                  variant="primary"
                  class="navbar-brn-primary"
                  @click="getTekshiruvlar(false)"
                  v-b-modal="'modal-tekshiruvlar' + datas.id"
                >
                  {{ $t("Текширувлар") }}
                </b-button>
              </div>
              <div>
                <b-button
                  variant="primary"
                  class="navbar-brn-primary ml-2"
                  @click="TekshiruvPechat"
                >
                  <b-icon icon="printer-fill"></b-icon>
                  {{ ("Печать") }}
                </b-button>
              </div>
            </div>
            <!-- <div
              v-if="$route.name == 'Create' && localUser.role == 'Registrator'"
            >
              <b-tabs
                active-nav-item-class="font-weight-bold text-light bg-info"
              >
                <b-tab
                  :title="itemBol.name"
                  v-for="(itemBol, indBolim) in tekshiruv"
                  :key="indBolim"
                  title-link-class="mr-1 mt-1 text-light font-weight-bold bg-success"
                  style="padding: 0px !important;"
                >
                  <div class="tek-card">
                    <Tekshiruvlar
                      @chekkTekChild="chekkTekChildReg"
                      :itemBol="itemBol.type"
                      :indBolim="indBolim"
                      @itemTek="itemTekReg"
                    />
                  </div>
                </b-tab>
              </b-tabs>
            </div> -->
            <div>
              <TekNatijaVue
                @delTek="Delete"
                @SummaChange="shifAdd"
                :PechatTekshiruv="PechatTekshiruv"
                :modalIdCom="modalIdCom"
                :backlog="datas.backlog"
                :created_at="datas.created_at"
                :tekshiruvlar="datas.registration_inspection"
              />
            </div>
          </div>
        </b-tab>
        <b-modal
          style="width: 96%;"
          :id="'modal-tekshiruvlar' + datas.id"
          title=""
          size="xl"
          hide-footer
        >
          <div>
            <b-tabs active-nav-item-class="font-weight-bold text-light bg-info">
              <b-tab
                :title="itemBol.name"
                v-for="(itemBol, indBolim) in tekshiruv"
                :key="indBolim"
                title-link-class="mr-1 mt-1 text-light font-weight-bold bg-success"
                style="padding: 0px !important;"
              >
                <div class="tek-card">

                  <Tekshiruvlar
                    @chekkTekChild="chekkTekChildReg"
                    :itemBol="itemBol.type"
                    :indBolim="indBolim"
                    @itemTek="itemTekReg"
                  />
                </div>
              </b-tab>
            </b-tabs>
          </div>
        </b-modal>
        <!-- <b-tab
          :title="$t('Операциялар')"
          v-if="localUser.role != 'Loborant'"
          @click="getOperatsiya()"
          title-link-class="mr-1 text-primary font-weight-bold"
          style="padding: 0px !important;"
        >
          <div class="tek-card">
            <div
              class="tab-in-btv"
              v-if="!$store.state.kasTar && $route.name != 'ArxivOne' && localUser.role != 'Loborant'"
            >
              <b-button
                variant="primary"
                class="navbar-brn-primary"
                @click="getOperatsiya(true)"
                v-b-modal="'modal-operatsiya' + datas.id"
              >
                {{ $t("Операциялар") }}
              </b-button>
              <b-modal
                :id="'modal-operatsiya' + datas.id"
                title=""
                size="xl"
                hide-footer
              >
                <div>
                  <div class="tek-card">
                    <OperatsiyaForm
                      :operatsiyalar="operatsiyalar"
                      @itemOper="chekkOper"
                    />
                  </div>
                </div>
              </b-modal>
            </div>
            <div>
              <OperatNatija
                @shifAdd="shifAdd"
                @delShif="Delete"
                @SummaChange="shifAdd"
                :modalIdCom="modalIdCom"
                :operatsiya="datas.surgery_registration"
                :created_at="datas.created_at"
                :backlog="datas.backlog"
              />
            </div>
          </div>
        </b-tab> -->
        <!-- <b-tab
          :title="$t('Палата')"
          title-link-class="mr-1 text-primary font-weight-bold"
          style="padding: 0px !important;"
        >
        <div class="tek-card">
          <Palata
            :modalId="datas.id"
            :modalIdCom="modalIdCom"
            :registration_palata="datas.registration_palata"
            :hospital_summa="datas.hospital_summa"
            @reg_statsionar="regStatsionar"
            :backlog="datas.backlog"
            @palataChange="palataChange"
          />
        </div>
        </b-tab> -->
        <!-- <b-tab
          title="Стационар"
          v-if="
            localUser.role != 'Loborant' &&
              localUser.role != 'Uzi '
          "
          title-link-class="mr-1 text-primary font-weight-bold"
          style="padding: 0px !important;"
        >
          <div class="tek-card">
            <Statsionar
              :reg_statsionar="datas.reg_statsionar"
            />
          </div>
        </b-tab> -->
        <b-tab
          :title="$t('Тўлов')"
          v-if="
            localUser.role != 'Loborant' &&
              localUser.role != 'Uzi ' &&
              localUser.role != 'Shifokor'
          "
          title-link-class="mr-1 text-primary font-weight-bold"
          style="padding: 0px !important;"
        >
          <div class="tek-card">
            <!-- :tolov="tolov" -->
            <!-- @PayTolov="PayTolov" -->
            <TolovForm
              :datas="datas"
              :vazvrat="summa"
              @TolovChek="TolovChek"
            />
          </div>
        </b-tab>
        <!-- <b-tab
          :title="$t('Чоп етиш')"
          title-link-class="mr-1 text-primary font-weight-bold"
          :class="{ kasallikT: $route.name == 'ArxivOne' }"
          style="padding: 0px !important;"
        >
          <div class="tek-card">
            <div class="chek-btns">
              <b-form-checkbox
                class="pecat-change"
                style="display: flex;"
                v-model="logoStatus"
                :value="true"
                :unchecked-value="false"
              >
                Лого
              </b-form-checkbox>
              <b-button
                variant="primary"
                class="navbar-brn-primary"
                @click="Bayonot"
              >
                <b-icon icon="printer-fill"></b-icon>
                Виписка
              </b-button>
              <b-button
                variant="primary"
                @click="TekshiruvPechat"
                class="navbar-brn-primary"
              >
                <b-icon icon="printer-fill"></b-icon>
                Текширувлар
              </b-button>
              <b-button
                variant="primary"
                class="navbar-brn-primary"
                @click="OperPechat"
              >
                <b-icon icon="printer-fill"></b-icon>
                Операция
              </b-button>
            </div>
          </div>
        </b-tab> -->
      </b-tabs>
    </div>
  </div>
</template>
<script>
import TolovForm from "../Tolov/TolovForm.vue";
import OperatsiyaForm from "../Operatsiya/Operatsiya.vue";
import OperatNatija from "../Operatsiya/OperatNatija.vue";
// import UziForm from "../Uzi/UziForm.vue";
import TekNatijaVue from "./TekNatija.vue";
import TekNatijaUziVue from "./TekNatijaUzi.vue";
import ShifokorTash from "../Shifokor/ShifokorTash.vue";
import Palata from "../Palata/Palata.vue";
import Statsionar from "../Palata/Statsionar.vue";
import Tekshiruvlar from "./Tekshiruvlar.vue";
import ShifokorVue from "../Shifokor/Shifokor.vue";
export default {
  props: ["datas", "modalIdCom"],
  components: {
    Tekshiruvlar,
    OperatsiyaForm,
    OperatNatija,
    ShifokorVue,
    Palata,
    ShifokorTash,
    TekNatijaVue,
    TekNatijaUziVue,
    Statsionar,
    // UziForm,
    TolovForm
  },
  data() {
    return {
      tekshiruv: [],
      Naprovitel:[],
      localUser: JSON.parse(localStorage.getItem("user")),
      shifokor: [],
      operatsiyalar: [],
      summaVazvrat: 0,
      Deselect: {
        render: createElement => createElement("span", "")
      },
      XizmatTuri: [
        { name: "Амбулатор", key: "Ambulator" },
        { name: "Стационар", key: "Statsionar" }
      ],
      sendingT: false,
      PechatTekshiruv: [],
      summa: 0,
      logoStatus: true

      // uzi: false
    };
  },
  methods: {
    getTekshiruvlar(type) {
      // if (this.$route.name == "Create") {
      let self = this;
      let filial = localStorage.getItem("filial_id");
      axios({
        method: "get",
        url: `/inspection/all?filial_id=${filial}`
      }).then(res => {
        if (res) {
          let x = [];
          res.data.data.forEach(item => {
            const existingType = x.find(r => r.name === item.inspector_category.name);
            if (existingType) {
              existingType.type.push(item);
            } else {
              x.push({ name: item.inspector_category.name, type: [item] });
            }
          });
          self.tekshiruv = x;
        }
      });
      // }
    },
    getOperatsiya() {
      let self = this;
      // if(this.datas.surgery_registration.length > 0){
      //   this.datas.surgery_registration.forEach(key => {
      //     if(key.doctor_id == this.localUser.doctor_id){
      //       key.date_time = new Date()
      //         .valueOf()
      //         .toString()
      //         .slice(0, 10);
      //     }
      //   })
      // }
      // axios({
      //   method: "get",
      //   url: "surgery/all"
      // }).then(res => {
      //   if (res) {
      //     let x = [];
      //     res.data.data.forEach(item => {
      //       const existingType = x.find(r => r.name === item.parent.name);
      //       if (existingType) {
      //         existingType.type.push(item);
      //       } else {
      //         x.push({ name: item.parent.name, type: [item] });
      //       }
      //     });
      //     self.operatsiyalar = x;
      //   }
      // });
    },
    getShifokor() {
      let self = this;
      axios({
        method: "get",
        url: "/doctor/all/" + self.localUser.filial_id
      }).then(res => {
        if (res) {
          let x = [];
          res.data.forEach(item => {
            const existingType = x.find(r => r.name === item.bolim.name);
            if (existingType) {
              existingType.type.push(item);
            } else {
              x.push({ name: item.bolim.name, type: [item] });
            }
          });
          self.shifokor = x;
        }
      });
    },
    shifAdd(x, type) {
      this.$emit("umumiySum", x, type);
    },
    itemShReg(item) {
      // const index = this.datas.registration_doctor.findIndex(
      //   el => el.doctor_id == item.id
      // );
      // let x = null;
      // if (this.$store.state.bemor.citizen) {
      //   x = item.doctor_category.citizen_price;
      // } else {
      //   x = item.doctor_category.price;
      // }
      let text = ''
      // [
      //   {key: 'value', value: ''}
      // ]
      if (this.$store.state.bemor.id && item.change) {
        const currentDate = new Date();

        const day = currentDate.getDate().toString().padStart(2, '0');
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 because months are zero-based
        const year = currentDate.getFullYear().toString();
        const hours = currentDate.getHours().toString().padStart(2, '0');
        const minutes = currentDate.getMinutes().toString().padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}`;
        this.datas.registration_doctor.push({
          id: item.id,
          doctor: {
            name: item.name,
            doctor_category: { name: item.bolim.name }
          },
          vazvrat: false,
          doctor_id: item.id,
          
          status: "waiting",
          price: 0,
          backlog: 0,
          pay_summa: 0,
          discount: 0,
          key: new Date()
            .valueOf()
            .toString(),
          text: "",
          date_time: new Date()
            .valueOf()
            .toString()
            .slice(0, 10),
          date_doctor: formattedDate,
          reg_doctor_category: [],
          registration_recipe: [],
          register_mkb: [],
          darect_id:item.darect_id
        });
        // this.$emit("umumiySum", 0, item.change);
      } else if (!this.$store.state.bemor.id) {
        this.$bvToast.toast(this.$t(`Бемор аниқланмади`), {
          title: this.$t("Огоҳлантириш"),
          variant: "danger",
          autoHideDelay: 2000,
          appendToast: true
        });
      }
    },
    // itemSh(item) {
    //   let x = null;
    //   if (this.$store.state.bemor.citizen) {
    //     x = item.doctor_category.citizen_price;
    //   } else {
    //     x = item.doctor_category.price;
    //   }
    //   this.$emit("umumiySum", x, item.change);
    // },
    itemTekReg(item) {
      let index = null;
      // if (item.uzi) {
      //   index = this.datas.registration_uzi.findIndex(
      //     el => el.inspection_id == item.id
      //   );
      // } else {
      //   index = this.datas.registration_inspection.findIndex(
      //     el => el.inspection_id == item.id
      //   );
      // }
      const currentDate = new Date();

      const day = currentDate.getDate().toString().padStart(2, '0');
      const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 because months are zero-based
      const year = currentDate.getFullYear().toString();
      const hours = currentDate.getHours().toString().padStart(2, '0');
      const minutes = currentDate.getMinutes().toString().padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}`;
      let x = 0;
      if(this.$store.state.bemor.imtiyoz_type == "Imtiyozsiz"){
        if (this.$store.state.bemor.citizen) {
          x = item.citizen_price;
        } else {
          x = item.price;
        }
      }
      if (this.$store.state.bemor.id && item.select) {
        if (item.uzi) {
          this.datas.registration_uzi.push({
            user_id: item.user_id,
            darect_id:item.darect_id,
            inspection: { 
              name: item.name,
              User: {
                user_name: item.User.user_name
              }
            },
            date_doctor: formattedDate,
            category: item.inspector_category,
            inspection_id: item.id,
            price: item.price,
            type: item.type,
            category_id: item.category_id,
            user_id: item.user_id,
            vazvrat: false,
            uzi: item.uzi,
            shablon: item.shablon == null ? false : item.shablon,
            date_time: new Date()
              .valueOf()
              .toString()
              .slice(0, 10),
            status: "waiting",
            registration_inspection_child: item.inspectionChild,
          });
        } else {
          this.datas.registration_inspection.push({
            id: item.id,
            darect_id:item.darect_id,
            backlog: x,
            discount: 0,
            pay_summa: 0,
            key: new Date()
            .valueOf()
            .toString(),
            type: item.type,
            user_id: item.user_id,
            inspection: { 
              name: item.name,
              User: {
                user_name: item.User.user_name
              }
            },
            date_doctor: formattedDate,
            category: item.inspector_category,
            inspection_id: item.id,
            price: x,
            vazvrat: false,
            category_id: item.category_id,
            user_id: item.user_id,
            uzi: item.uzi,
            shablon: item.shablon == null ? false : item.shablon,
            date_time: new Date()
              .valueOf()
              .toString()
              .slice(0, 10),
            status: "waiting",
            registration_inspection_child: item.inspectionChild,
          });
        }
        this.$emit("umumiySum", x, item.select);
      } else if (!this.$store.state.bemor.id) {
        this.$bvToast.toast(this.$t(`Бемор аниқланмади`), {
          title: this.$t("Огоҳлантириш"),
          variant: "danger",
          autoHideDelay: 2000,
          appendToast: true
        });
      }
    },
    // itemTek(item) {
    //   // let index = null;
    //   // if (item.uzi) {
    //   //   index = this.datas.registration_uzi.findIndex(
    //   //     el => el.inspection_id == item.id
    //   //   );
    //   // } else {
    //   //   index = this.datas.registration_inspection.findIndex(
    //   //     el => el.inspection_id == item.id
    //   //   );
    //   // }
    //   let x = null;
    //   if (this.$store.state.bemor.citizen) {
    //     x = item.citizen_price;
    //   } else {
    //     x = item.price;
    //   }
    //   if (this.$store.state.bemor.id && item.select == false) {
    //     if (item.uzi) {
    //       for (let i = 0; i < this.datas.registration_uzi.length; i++) {
    //         const element = this.datas.registration_uzi[i];
    //         if (element.inspection_id == item.id) {
    //           this.datas.registration_uzi.splice(i, 1);
    //           this.$emit("umumiySum", x, item.select);
    //         }
    //       }
    //     } else {
    //       for (let i = 0; i < this.datas.registration_inspection.length; i++) {
    //         const element = this.datas.registration_inspection[i];
    //         if (element.inspection_id == item.id) {
    //           this.datas.registration_inspection.splice(i, 1);
    //           this.$emit("umumiySum", x, item.select);
    //         }
    //       }
    //     }
    //   }
    // },
    chekkTekChildReg(TekItem, child) {
      let Child = [];
      let x = 0;
      const currentDate = new Date();

      const day = currentDate.getDate().toString().padStart(2, '0');
      const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 because months are zero-based
      const year = currentDate.getFullYear().toString();
      const hours = currentDate.getHours().toString().padStart(2, '0');
      const minutes = currentDate.getMinutes().toString().padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}`;
      if(this.$store.state.bemor.imtiyoz_type == "Imtiyozsiz"){
        if (this.$store.state.bemor.citizen) {
          x = child.citizen_price;
        } else {
          x = child.price;
        }
      }
      if (this.$store.state.bemor.id) {
        if (TekItem.uzi) {
          const indUzi = this.datas.registration_uzi.findIndex(
            el => el.inspection_id == TekItem.id
          );

          if (indUzi == -1 && child.select) {
            Child.push(child);
            this.$emit("umumiySum", x, child.select);
            this.datas.registration_uzi.push({
              user_id: TekItem.user_id,
              darect_id:TekItem.darect_id,
              inspection: { 
                name: TekItem.name,
                User: {
                  user_name: TekItem.User.user_name
                }
              },
              date_doctor: formattedDate,
              category: TekItem.inspector_category,
              inspection_id: TekItem.id,
              vazvrat: false,
              price: +x,
              type: TekItem.type,
              category_id: TekItem.category_id,
              uzi: TekItem.uzi,
              shablon: TekItem.shablon == null ? false : TekItem.shablon,
              date_time: new Date()
                .valueOf()
                .toString()
                .slice(0, 10),
              status: "waiting",
              registration_inspection_child: Child
            });
          } else {
            const indChild = this.datas.registration_uzi[
              indUzi
            ].registration_inspection_child.findIndex(el => el.id == child.id);

            if (indChild == -1 && child.select) {
              this.datas.registration_uzi[
                indUzi
              ].registration_inspection_child.push(child);
              this.$emit("umumiySum", x, child.select);
              this.datas.registration_uzi[indUzi].price += x;
            }
          }
        } else {
          const index = this.datas.registration_inspection.findIndex(
            el => el.inspection_id == TekItem.id
          );

          if (index == -1 && child.select) {
            Child.push(child);
            this.$emit("umumiySum", x, child.select);
            this.datas.registration_inspection.push({
              user_id: TekItem.user_id,
              darect_id:TekItem.darect_id,
              backlog: +x,
              discount: 0,
              pay_summa: 0,
              key: new Date()
                .valueOf()
                .toString(),
              inspection: { 
                name: TekItem.name,
                User: {
                  user_name: TekItem.User.user_name
                }
              },
              date_doctor: formattedDate,
              category: TekItem.inspector_category,
              inspection_id: TekItem.id,
              vazvrat: false,
              price: +x,
              type: TekItem.type,
              category_id: TekItem.category_id,
              uzi: TekItem.uzi,
              shablon: TekItem.shablon == null ? false : TekItem.shablon,
              date_time: new Date()
                .valueOf()
                .toString()
                .slice(0, 10),
              status: "waiting",
              registration_inspection_child: Child
            });
          } else {
            const indChild = this.datas.registration_inspection[
              index
            ].registration_inspection_child.findIndex(el => el.id == child.id);
            if (child.select) {
              this.datas.registration_inspection[
                index
              ].registration_inspection_child.push(child);
              this.$emit("umumiySum", x, child.select);
              this.datas.registration_inspection[index].price += x;
              this.datas.registration_inspection[index].backlog += x;
            }
          }
        }
      } else if (!this.$store.state.bemor.id) {
        this.$bvToast.toast(this.$t(`Бемор аниқланмади`), {
          title: this.$t("Огоҳлантириш"),
          variant: "danger",
          autoHideDelay: 2000,
          appendToast: true
        });
      }
    },
    chekkOper(item) {
      let x = 0;
      if (this.$store.state.bemor.citizen) {
        x = item.citizen_price;
      } else {
        x = item.price;
      }
      const currentDate = new Date();

      const day = currentDate.getDate().toString().padStart(2, '0');
      const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 because months are zero-based
      const year = currentDate.getFullYear().toString();
      const hours = currentDate.getHours().toString().padStart(2, '0');
      const minutes = currentDate.getMinutes().toString().padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}`;
      if (this.$store.state.bemor.id) {
        this.datas.surgery_registration.push({
          doctor_id: item.doctor_id,
          name: item.name,
          vazvrat: false,
          surgery_id: item.id,
          status: false,
          all_summa: 0,
          backlog: +x,
          discount: 0,
          pay_summa: 0,
          key: new Date()
            .valueOf()
            .toString(),
          date_time: new Date()
            .valueOf()
            .toString()
            .slice(0, 10),
          date_doctor: formattedDate,
          price: x,
          text: "",
          before_sur_text: "",
          after_sur_text: "",
          surgery_doctor: []
        });
        this.$emit("umumiySum", x, true);
      } else {
        this.$bvToast.toast(this.$t(`Бемор аниқланмади`), {
          title: this.$t("Огоҳлантириш"),
          variant: "danger",
          autoHideDelay: 2000,
          appendToast: true
        });
      }
    },
    chekkTekChild(TekItem, child) {
      // let Child = [];
      let x = null;
      if (this.$store.state.bemor.citizen) {
        x = child.citizen_price;
      } else {
        x = child.price;
      }
      this.$emit("umumiySum", x, child.select);
    },
    palataChange(x, type, v) {
      if (!v) {
        if (type) {
          this.datas.summa += x;
          this.datas.hospital_summa += x;
          this.datas.backlog += x;
        } else {
          this.datas.summa -= x;
          this.datas.hospital_summa -= x;
          this.datas.backlog -= x;
        }
      } else if (v == "vazvrat") {
        // this.tolov.vozvrat = type
        if (type == true) {
          // this.datas.summa -= x;
          this.tolov.summa += x;
          // this.datas.pay_summa -= x;
          // this.datas.hospital_summa -= x;
        } else {
          // this.datas.summa += x;
          this.tolov.summa -= x;
          // this.datas.pay_summa += x;
          // this.datas.hospital_summa += x;
        }
      }
    },
    regStatsionar(data){
      if(this.datas.reg_statsionar.length == 0){
        this.datas.reg_statsionar.push(data);
      }
    },
    // TolovVozvrat(tolov) {
    //   let x = {};
    //   this.datas.pay_summa -= tolov.summa;
    //   this.datas.summa -= tolov.summa;
    //   x = {
    //     user_id: JSON.parse(localStorage.getItem("user")).id,
    //     pay_type: tolov.pay_type,
    //     discount: tolov.discount,
    //     backlog: this.datas.backlog,
    //     summa: tolov.summa * -1,
    //     comment: tolov.comment,
    //     umumiy_sum: this.datas.summa,
    //     pay_summa: this.datas.pay_summa,
    //     date_time: new Date()
    //       .valueOf()
    //       .toString()
    //       .slice(0, 10)
    //   };
    //   if (this.tolov.summa != 0) {
    //     this.datas.registration_pay.push(x);
    //   } else {
    //     this.$bvToast.toast(this.$t(`Сумма хато критилди`), {
    //       title: this.$t("Огоҳлантириш"),
    //       variant: "danger",
    //       autoHideDelay: 2000,
    //       appendToast: true
    //     });
    //   }
    //   this.tolov = {
    //     pay_type: "Naqt",
    //     summa: 0,
    //     vozvrat: false,
    //     discount: 0,
    //     comment: "",
    //     foiz: 0
    //   };
    // },
    // PayTolov(tolov, type) {
    //   let x = {};
    //   if (type) {
    //     this.datas.pay_summa += tolov.summa;
    //     this.datas.discount += tolov.discount;
    //     this.datas.backlog =
    //       this.datas.summa - (this.datas.pay_summa + this.datas.discount);
    //     x = {
    //       user_id: JSON.parse(localStorage.getItem("user")).id,
    //       pay_type: tolov.pay_type,
    //       discount: tolov.discount,
    //       backlog: this.datas.backlog,
    //       summa: tolov.summa,
    //       comment: tolov.comment,
    //       umumiy_sum: this.datas.summa,
    //       pay_summa: this.datas.pay_summa,
    //       date_time: new Date()
    //         .valueOf()
    //         .toString()
    //         .slice(0, 10)
    //     };
    //     this.datas.registration_pay.push(x);
    //   } else {
    //     if (tolov.summa < 0) {
    //       this.datas.pay_summa -= tolov.summa;
    //       this.datas.discount -= tolov.discount;
    //       this.datas.summa += tolov.summa * -1 + this.tolov.discount;
    //     } else {
    //       this.datas.pay_summa -= tolov.summa;
    //       this.datas.discount -= tolov.discount;
    //       this.datas.backlog += tolov.summa + tolov.discount;
    //     }
    //   }
    //   this.tolov = {
    //     pay_type: "Naqt",
    //     summa: 0,
    //     vozvrat: false,
    //     discount: 0,
    //     comment: "",
    //     foiz: 0
    //   };
    // },
    TolovChek(tolov) {
      let self = this;
      // sendingT = self.sending = true;
      let x = {};
      let palata = [];
      let ChekTolov = {};
        this.datas.pay_summa += tolov.summa;
        this.datas.discount += tolov.discount;
        this.datas.backlog =
          this.datas.summa - (this.datas.pay_summa + this.datas.discount);
        x = {
          user_id: JSON.parse(localStorage.getItem("user")).id,
          pay_type: tolov.pay_type,
          discount: tolov.discount,
          backlog: this.datas.backlog,
          summa: tolov.summa,
          comment: tolov.comment,
          umumiy_sum: this.datas.summa,
          pay_summa: this.datas.pay_summa,
          date_time: new Date()
            .valueOf()
            .toString()
            .slice(0, 10)
        };
        if (this.tolov.summa != 0) {
          this.datas.registration_pay.push(x);
        }
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
            ChekTolov = {
              summa: self.datas.summa,
              created_at: res.data.data.created_at,
              backlog: self.datas.backlog,
              discount: self.datas.discount,
              pay_summa: self.datas.pay_summa,
              doctor: self.datas.registration_doctor,
              inspection: self.datas.registration_inspection,
              uzi: self.datas.registration_uzi,
              operatsiya: self.datas.surgery_registration,
              palata: palata
            };
            localStorage.setItem("ChekTolov", JSON.stringify(ChekTolov));
            localStorage.setItem("BemorName", JSON.stringify(bemor));
            ChekTolov = {};
            self.$store.state.bemor = {}
            const route = self.$router.resolve({
              path: "/user-chek/" + self.datas.patient_id
            });
            window.open(route.href, "_blank");
            self.$router.push("/user");
          }
        });
      this.tolov = {
        pay_type: "Naqt",
        vozvrat: false,
        summa: 0,
        discount: 0,
        comment: "",
        foiz: 0
      };
    },
    Delete(x, type, v) {
      if (v) {
        if (v == "vazvrat") {
          // this.tolov.vozvrat = !type
          if (type == true) {
            this.summa += x;
          } else {
            this.summa -= x;
          }
        }
      } else {
        this.$emit("umumiySum", x, type);
      }
    },
    Bayonot() {
      let x = {};
      x = {
        type: this.logoStatus,
        bemorId: this.$store.state.bemor.id,
        name: this.$store.state.bemor.fullname,
        gender: this.$store.state.bemor.gender,
        birthday: this.$store.state.bemor.birthday,
        create_at: this.datas.created_at,
        doctor: this.datas.registration_doctor
      };
      localStorage.setItem("Bayonot", JSON.stringify(x));

      const rout = this.$router.resolve({
        path: "/user-bayonot"
      });
      window.open(rout.href, "_blank");
    },
    TekshiruvPechat() {
      let x = this.datas.registration_inspection;
      let y = {
        bemorId: this.$store.state.bemor.id,
        name: this.$store.state.bemor.fullname,
        gender: this.$store.state.bemor.gender,
        birthday: this.$store.state.bemor.birthday,
        create_at: this.datas.created_at,
        inspection: this.PechatTekshiruv.length > 0 ? this.PechatTekshiruv : x
      };
      localStorage.setItem("Tekshiruvlar", JSON.stringify(y));
      // this.PechatTekshiruv = []
      // this.$router.push("/user");
      const i = this.$router.resolve({
        path: "/user-tekshiruv"
      });
      window.open(i.href, "_blank");
    },
    UziPechat() {
      let x = this.datas.registration_uzi;
      let y = {
        bemorId: this.$store.state.bemor.id,
        name: this.$store.state.bemor.fullname,
        gender: this.$store.state.bemor.gender,
        birthday: this.$store.state.bemor.birthday,
        create_at: this.datas.created_at,
        inspection: x
      };
      localStorage.setItem("Tekshiruvlar", JSON.stringify(y));
      // this.$router.push("/user");
      const i = this.$router.resolve({
        path: "/user-tekshiruv"
      });
      window.open(i.href, "_blank");
    },
    OperPechat(){
      let x = this.datas.surgery_registration;
      let y = {
        key: false,
        type: true,
        bemorId: this.$store.state.bemor.id,
        name: this.$store.state.bemor.fullname,
        gender: this.$store.state.bemor.gender,
        birthday: this.$store.state.bemor.birthday,
        create_at: this.datas.created_at,
        doctor: x
      };
      localStorage.setItem("Bayonot", JSON.stringify(y));

      const rout = this.$router.resolve({
        path: "/user/operatsiya"
      });
      window.open(rout.href, "_blank");
    },
    // delTek(x, type){
    //   this.$emit('umumiySum', x, type)
    // }
    getNaprovitel() {
      let self = this;
      axios({
        method: "get",
        url: "/direct/all"
      }).then(res => {
        console.log(res)
        if (res != undefined) {
          self.Naprovitel = res.data.data;
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
  mounted() {
    this.getShifokor();
    this.getNaprovitel();
  }
};
</script>
<style>
.bemor-form {
  position: relative;
  padding: 10px 10px;
  margin-top: 10px;
  border-radius: 10px;
  background: #f0f0f0;
  min-height: 500px;
  border: 1px solid #007bff;
}
.tashxis-style .ql-editor p{
  font-size: 18px;
  font-weight: 500;
}
.vue-text-editor-s{
  margin: 10px auto;
  width: 985px;
  min-height: 1080px;
  /* border: 1px solid red; */
  /* max-height: 1140px; */

}
.vue-text-editor{
  overflow: auto;
  width: 100%;
}
.input-datetime-local{
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 3px;

}
.hizmat-turi {
  position: absolute;
  right: 10px;
  top: -5px;
  width: 200px;
}
.navbar-brn-primary {
  border: 1px solid #fff;
  font-size: 19px;
  font-weight: 600;
  padding: 5px 25px;
  background: #0b0bdd;
  margin-bottom: 10px;
  -webkit-box-shadow: 5px 8px 10px rgba(25, 95, 176, 0.3);
  box-shadow: 5px 8px 10px rgba(25, 95, 176, 0.3);
  border-radius: 8px;
}
.tek-card {
  border: 1px solid #ccc;
  border-radius: 10px;
  min-height: 0px;
  background: #fff;
  padding: 10px;
}
.tab-in-btv {
  margin-bottom: 10px;
}
.chek-btns {
  display: flex;
  justify-content: space-between;
  margin: 20px auto;
  width: 600px;
}
</style>
