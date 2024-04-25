<template>
  <div class="md-layout">
    <div
      class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
    >
      <md-card>
        <md-card-content>
          <b-container fluid>
            <operatsiya-form
              :modelvue="operatsiya"
              :errors="errors"
            ></operatsiya-form>
            <md-card-content>
              <div class="tugmalarsh">
                <div>
                  <b-button
                    @click="createOperatsiya()"
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
import OperatsiyaForm from "./Form.vue";
import { required, minLength } from "vuelidate/lib/validators";
export default {
  name: "OperatsiyaCreate",
  components: {
    OperatsiyaForm
  },
  data() {
    return {
      category: [],
      operatsiya: {
        name: "",
        parent_id: null,
        doctor_id: null,
        doctor_precent: 0,
        price: 0,
        citizen_price: 0
      },
      errors: null
    };
  },
  validations: {
    operatsiya: {
      name: {
        required,
        minLength: minLength(4)
      },
      doctor_id: {
        required
      },
      parent_id: {
        required
      }
    }
  },
  methods: {
    createOperatsiya() {
      let self = this;
      this.$v.$touch();
      if (this.$v.$invalid == false) {
        axios({
          method: "post",
          url: "/surgery/create",
          data: self.operatsiya
        }).then(data => {
          if (data != undefined) {
            self.$router.push("operatsiya");
          }
        });
      } else {
        self.errors = self.$v.operatsiya;
      }
    },

    cancel() {
      this.operatsiya = {
        name: "",
        doctor_id: null,
        doctor_precent: 0,
        citizen_price: 0,
        price: 0
      };
    }
  },
  mounted() {}
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
