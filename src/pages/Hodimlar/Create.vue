<template>
  <div class="md-layout">
    <div
      class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
    >
      <md-card>
        <md-card-content>
          <b-container fluid>
            <hodimlar-form
              :modelvue="hodimlar"
              :errors="errors"
            ></hodimlar-form>
            <md-card-content>
              <div class="tugmalarh">
                <div>
                  <b-button
                    @click="createHodimlar()"
                    class="mr-2 calendar"
                    variant="success"
                  >
                    <b-icon icon="calendar2-plus"></b-icon> {{ $t("Сақлаш") }}
                  </b-button>
                  <b-button
                    @click="cancel()"
                    variant="danger"
                    class="calendar1"
                  >
                    <b-icon icon="calendar2-x"></b-icon> {{ $t("Бекор қилиш") }}
                  </b-button>
                </div>
              </div>
            </md-card-content>
          </b-container>
        </md-card-content>
      </md-card>
    </div>
  </div>
</template>

<script>
import HodimlarForm from "./Form.vue";
import { required, minLength } from "vuelidate/lib/validators";
export default {
  name: "HodimlarCreate",
  components: {
    HodimlarForm
  },
  data() {
    return {
      hodimlar: {
        id: 0,
        password: "",
        role: "",
        room_id: 0,
        token: "",
        user_name: "",
        doctor_id: 0,
        inspection_category_id: 0,
        palata_percent: 0,
        pay_type: "Foiz",
        salary: 0,
        percent: 0,
        daily_coming: [
          {
            "week": "Dushanba",
            "come_time": "07:00:00",
            "leave_time": "07:00:00",
            "is_day_off": false
          },
          {
            "week": "Seshanba",
            "come_time": "07:00:00",
            "leave_time": "07:00:00",
            "is_day_off": false
          },
          {
            "week": "Chorshanba",
            "come_time": "07:00:00",
            "leave_time": "07:00:00",
            "is_day_off": false
          },
          {
            "week": "Payshanba",
            "come_time": "07:00:00",
            "leave_time": "07:00:00",
            "is_day_off": false
          },
          {
            "week": "Juma",
            "come_time": "07:00:00",
            "leave_time": "07:00:00",
            "is_day_off": false
          },
          {
            "week": "Shanba",
            "come_time": "07:00:00",
            "leave_time": "07:00:00",
            "is_day_off": false
          },
          {
            "week": "Yakshanba",
            "come_time": "07:00:00",
            "leave_time": "07:00:00",
            "is_day_off": false
          }
        ]
      },
      errors: null
    };
  },
  validations: {
    hodimlar: {
      password: {
        required,
        minLength: minLength(6)
      },
      role: {
        required,
        minLength: minLength(4)
      },
      room_id: {
        required
      },
      user_name: {
        required,
        minLength: minLength(4)
      },
      pay_type: {
        required
      }
    }
  },
  methods: {
    createHodimlar() {
      let self = this;
      this.$v.$touch();
      if (this.$v.$invalid == false) {
        axios({
          method: "post",
          url: "/user/create",
          data: self.hodimlar
        }).then(data => {
          if (data != undefined) {
            self.$router.push("/hodimlar");
          }
        });
      } else {
        self.errors = self.$v.hodimlar;
      }
    },
    closeModal() {
      this.visible = true;
      this.$router.push("/hodimlar");
    },
    cancel() {
      this.hodimlar = {
        id: 0,
        password: "",
        role: "",
        room_id: null,
        token: "",
        user_name: "",
        doctor_id: null,
        palata_percent: 0,
        inspection_category_id: null,
        pay_type: null,
        salary: null
      };
    }
  }
};
</script>
<style>
.tugmalarh {
  display: flex;
  justify-content: right;
  margin-right: 10px;
  margin-bottom: 10px;
}
.calendar {
  box-shadow: 5px 8px 10px rgba(25, 176, 48, 0.5);
}
.calendar1 {
  box-shadow: 5px 8px 10px rgba(176, 25, 25, 0.5);
}
</style>
