<template>
  <div class="md-layout">
    <div
      class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
    >
      <md-card>
        <md-card-content>
          <b-container fluid>
            <qoshimcha-form
              :modelvue="qoshimcha"
              :errors="errors"
            ></qoshimcha-form>
            <md-card-content>
              <div class="tugmalarsh">
                <div>
                  <b-button
                    @click="createQoshimcha()"
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
import axios from "axios";
import QoshimchaForm from "./Form.vue";
import { required, minLength } from "vuelidate/lib/validators";
export default {
  name: "QoshimchaCreate",
  components: {
    QoshimchaForm
  },
  data() {
    return {
      qoshimcha: {
        name: "",
        price: 0,
        citizen_price: 0,
        doctor_id: null,
        percent: 0
      },
      errors: null
    };
  },
  validations: {
    qoshimcha: {
      name: {
        required,
        minLength: minLength(3)
      },
      price: {
        minLength: minLength(3)
      },
      citizen_price: {
        minLength: minLength(3)
      }
    }
  },
  methods: {
    createQoshimcha() {
      let self = this;
      this.$v.$touch();
      if (this.$v.$invalid == false) {
        axios({
          method: "post",
          url: "/surgery_category/create",
          data: self.qoshimcha
        }).then(data => {
          if (data != undefined) {
            self.$router.push("qoshimcha");
          }
        });
      } else {
        self.errors = self.$v.qoshimcha;
      }
    },

    cancel() {
      this.qoshimcha = {
        name: "",
        price: 0,
        citizen_price: 0,
        doctor_id: null,
        percent: 0
      };
    }
  }
};
</script>
<style>
.tugmalarsh {
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
