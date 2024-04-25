<template>
  <div class="parent-form">
    <div class="real-time-com">
      <RealTime />
    </div>
    <div class="header-btns">
      <HeaderBtn @Saqlash="Saqlash" @status="newStatus" @cancel="cancel" :sending="sending" :status="datas.status" />
    </div>
    <b-tabs
      active-nav-item-class="font-weight-bold text-light bg-success"
      style=" padding-top: 40px;"
    >
      <b-tab
        :title="$t('Регистрация')"
        @click="regClick"
        title-link-class="mr-1 text-primary font-weight-bold"
        style="padding: 0px !important;"
      >
        <div class="parent-bemor-form">
          <HeaderForm
            :summa="datas.summa"
            :user_name="user_name"
            :kelgan_kun="datas.created_at"
            :newBemor="selectedB"
            @bemorChange="bemorChange"
          />
        </div>
        <div class="parent-bemor-form" v-if="$route.name == 'Create'">
          <BemorForm
            @selectedBemor="selectedBemor"
            :bemor="bemor"
            :modalIdCom="1"
            />
            <!-- :direct_id="datas.direct_id" -->
        </div>
        
        <div class="parent-bemor-form" :class="{ kasallikT: $store.state.kasTar || $route.name == 'ArxivOne' }">
          <Dirict 
            :direct_id="datas.direct_id"
            :modalIdCom="0"
            :complaint="datas.complaint"
            @direct="direct"
            @ComplaintInput="ComplaintInput"
          />
        </div>
        <div class="parent-bemor-form" style="padding-bottom: 10px;">
          <TekshiruvForm
            @umumiySum="sumYigindi"
            :datas="datas"
            :sending="sending"
            :modalIdCom="0"
          />
        </div>
      </b-tab>
      <b-tab
        :title="$t('Бемор')"
        v-if="$route.name != 'ArxivOne'"
        @click="KasallikTarixi"
        title-link-class="mr-1 text-primary font-weight-bold"
        style="padding: 0px !important;"
      >
        <!-- <div class="parent-bemor-form">
          <HeaderForm
            :summa="datas.summa"
            :user_name="user_name"
            :kelgan_kun="datas.created_at"
            :newBemor="selectedB"
            @bemorChange="bemorChange"
          />
        </div> -->
        <div class="parent-bemor-form">
          <BemorForm
            @selectedBemor="selectedBemor"
            :bemor="bemor"
            :modalIdCom="0"
            />
            <!-- :direct_id="datas.direct_id" -->
        </div>
        <div class="parent-bemor-form">
          <KasallikTarixi :kasTarix="kasTarix" :modalIdCom="1" />
        </div>
      </b-tab>
    </b-tabs>
    <div
      class="notications xatoliklar alert-danger"
      style="z-index: 5"
      v-if="$store.state.errors != ''"
    >
      <button
        type="button"
        aria-hidden="true"
        class="close"
        @click="$store.state.errors = ''"
      >
        ×
      </button>
      <p>
        <i class="fas fa-exclamation-triangle"></i>&nbsp; {{ $t("Хатолик") }}
      </p>
      <div>{{ $store.state.errors }}</div>
    </div>
  </div>
</template>
<script>
import KasallikTarixi from "./Components/KasallikTarixi.vue";
// import HeaderBtns from "./Components/HeaderBtn.vue";
import TekshiruvForm from "./Components/Tekshiruvlar/TekBolim.vue";
import HeaderForm from "./Components/Header.vue";
import RealTime from "../../components/RealTime.vue";
import BemorForm from "./BemorForm.vue";
import HeaderBtn from "./Components/HeaderBtn.vue";
import Dirict from "./Dirict.vue";
export default {
  components: {
    RealTime,
    BemorForm,
    HeaderForm,
    TekshiruvForm,
    HeaderBtn,
    // HeaderBtns,
    KasallikTarixi,
    Dirict
},
  data() {
    return {
      sending: false,
      user_name: JSON.parse(localStorage.getItem("user")).user_name,
      selectedB: null,
      localUser: JSON.parse(localStorage.getItem("user")),
      datas: {
        id: 0,
        created_at: null,
        user_id: JSON.parse(localStorage.getItem("user")).id,
        status: "waiting",
        patient_id: null,
        type_service: "Ambulator",
        direct_id: null,
        complaint: "",
        filial_id: null,
        summa: 0,
        tramma_type: "Bir oydan ortiq",
        pay_summa: 0,
        backlog: 0,
        discount: 0,
        hospital_summa: 0,
        registration_doctor: [],
        registration_inspection: [],
        registration_palata: [],
        registration_pay: [],
        registration_files: [],
        surgery_registration: [],
        registration_uzi: [],
        reg_statsionar: []
      },
      bemor: {
        id: null,
        fullname: "",
        name: "",
        lastname: "",
        patronymic: "",
        region_id: 8,
        imtiyoz_type: "Imtiyozsiz",
        district_id: null,
        filial_id: null,
        phone: "",
        passport: "",
        text: "",
        addres: "",
        gender: "Ayol",
        citizen: false,
        percent: 0,
        birthday: ""
      },
      kasTarix: []
    };
  },
  methods: {
    direct(id) {
      this.datas.direct_id = id;
    },
    ComplaintInput(val){
      this.datas.complaint = val
    },
    bemorChange(e) {
      if (e) {
        this.$store.state.bemor = {
          id: e.id,
          citizen: e.citizen,
          fullname: e.fullname,
          birthday: e.birthday,
          phone: e.phone,
          imtiyoz_type: e.imtiyoz_type,
          tramma_type: this.datas.tramma_type
        };
        this.datas.patient_id = e.id;
        this.bemor = e;
      } else {
        this.$store.state.bemor = {
          id: null,
          citizen: null,
          imtiyoz_type: "Imtiyozsiz",
          tramma_type: "Bir oydan ortiq"
        };
        this.datas.patient_id = null;
        this.bemor = {
          id: null,
          fullname: "",
          name: "",
          lastname: "",
          patronymic: "",
          region_id: 8,
          imtiyoz_type: "Imtiyozsiz",
          district_id: null,
          filial_id: null,
          phone: "",
          passport: "",
          addres: "",
          text: "",
          gender: "Ayol",
          citizen: false,
          percent: 0,
          birthday: ""
        };
      }
    },
    sumYigindi(item, type, v) {
      if (!v) {
        if (type) {
          this.datas.summa += item;
          this.datas.backlog += item;
        } else {
          this.datas.summa -= item;
          this.datas.backlog -= item;
        }
      } else if (v == "vazvrat") {
        if (type == "1") {
          this.datas.summa -= item;
        } else {
          this.datas.summa += item;
        }
      }
    },
    selectedBemor(data) {
      this.selectedB = data;
      this.datas.patient_id = data.id;
    },
    Saqlash() {
      let self = this;
      if (!self.sending) {
        self.sending = true;
        if (self.$route.name == "Create") {
          axios({
            method: "post",
            url: "/registration/create",
            data: self.datas
          }).then(res => {
            if (res) {
              self.$router.go(-1);
              self.sending = false;
              self.$store.state.bemor = {}
            }
          })
          // .catch(err => {
          //   if(err){
          //     this.$bvToast.toast(this.$t(`Бемор аниқланмади`), {
          //       title: this.$t("Огоҳлантириш"),
          //       variant: "danger",
          //       autoHideDelay: 2000,
          //       appendToast: true
          //     });
          //   }
          // });
        } else if (self.$route.name == "Update") {
          axios({
            method: "patch",
            url: "/registration/update/" + self.$route.params.id,
            data: self.datas
          }).then(res => {
            if (res) {
              self.$router.go(-1);
              self.$store.state.bemor = {}
              self.sending = false;
            }
          }).catch(err => {
            if(err){
              self.sending = false;
            }
          });
        }
      }
    },
    getReg() {
      let self = this;
      if (self.$route.name != "Create") {
        axios({
          method: "get",
          url: "/registration/one/" + self.$route.params.id
        }).then(res => {
          if (res) {
            self.selectedB = res.data.data.patient;
            self.bemor = res.data.data.patient;
            self.user_name = res.data.data.user.user_name;
            self.$store.state.bemor = res.data.data.patient;
            self.datas = res.data.data;
            self.Complate();
          }
        });
      }
    },
    regClick() {
      this.$store.state.kasTar = false;
      this.$store.state.modalId = 0;
    },
    KasallikTarixi() {
      this.$store.state.kasTar = true;
      this.$store.state.modalId = 1;
      let s = this;
      axios({
        method: "get",
        url: "/registration/patient/" + s.datas.patient_id
      }).then(res => {
        if (res) {
          s.kasTarix = res.data;
        }
      });
    },
    cancel() {
      const x = window.confirm("Ростдан ҳам ойнани тарк этмоқчимисиз");
      if (x) {
        // this.$router.push("/user");
        if (this.$route.name == "Create" || this.$route.name == "Update") {
          this.$router.go(-1);
          this.$store.state.kasTar = false;
          this.$store.state.datas = {
            summa: 0,
            backlog: 0,
            discount: 0,
            pay_summa: 0,
            hospital_summa: 0
          };
          this.$store.state.bemor = {
            id: null,
            citizen: null,
            imtiyoz_type: "",
            tramma_type: "Bir oydan ortiq"
          };
        } else {
          window.close();
          this.$store.state.kasTar = false;
        }
      }
    },
    newStatus(val){
      this.datas.status = val;
    },
    Complate() {
      if (this.$route.name == "Update") {
        if (this.localUser.role == "Shifokor") {
          this.datas.registration_doctor.forEach(key => {
            if (key.doctor_id == this.localUser.doctor_id) {
              key.date_time = new Date()
                .valueOf()
                .toString()
                .slice(0, 10);
              key.status = "complate";
            }
          });
        } else if (this.localUser.role == "Loborant") {
          this.datas.registration_inspection.forEach(key => {
            if (key.user_id == this.localUser.id) {
              key.date_time = new Date()
                .valueOf()
                .toString()
                .slice(0, 10);
              key.status = "complate";
            }
          });
        } else if (this.localUser.role == "Uzi ") {
          this.datas.registration_uzi.forEach(key => {
            if (key.user_id == this.localUser.id) {
              key.date_time = new Date()
                .valueOf()
                .toString()
                .slice(0, 10);
              key.status = "complate";
            }
          });
        }
      }
    }
  },
  mounted() {
    setInterval(() => {
      if (this.$store.state.errors != "") {
        this.$store.state.errors = "";
      }
    }, 5000);
    this.getReg();
  }
};
</script>
<style>
.kasallikT {
  pointer-events: none;
}
.navbarBtnTashxis-summa{
  padding: 2px 7px !important;
}
.parent-form {
  background: #d3e4e7;
  width: 100%;
  min-height: 100vh;
  max-width: 100%;
}
.parent-bemor-form {
  /* border: 1px solid #e4e5e6; */
  width: 98%;
  margin: 15px auto;
}
.real-time-com {
  position: fixed;
  top: 0px;
  width: 100%;
  z-index: 5;
}
.header-btns {
  position: sticky;
  top: 30px;
  z-index: 5;
  width: 100%;
  margin: 0 auto;
}
.xatoliklar {
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  /* background: rgb(255, 0, 0); */
  padding: 5px 10px;
  border-radius: 10px;
  cursor: pointer;
  opacity: 0;
  animation: animateAlert 3s linear;
  pointer-events: all;
}
@keyframes animateAlert {
  0% {
    width: 0px;
    opacity: 0;
  }

  10% {
    width: 800px;
    opacity: 1;
  }

  90% {
    width: 800px;
    opacity: 1;
  }

  100% {
    width: 0px;
    opacity: 0;
  }
}
/* .header-form{

} */
</style>
