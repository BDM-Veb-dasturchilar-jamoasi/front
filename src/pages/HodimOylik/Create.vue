<template>
  <div class="md-layout">
    <div
      class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
    >
      <md-card>
        <md-card-content>
          <b-container fluid>
            <tekshiruvlar-form
              :modelvue="tekshiruvlar"
              :errors="errors"
            ></tekshiruvlar-form>
            <md-card-content>
              <div class="tugmalar1">
                <div>
                  <b-button
                    @click="createTekshiruvlar()"
                    class=" mr-2 calendar"
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
// import { electron } from "process";
import { required, minLength } from "vuelidate/lib/validators";
import TekshiruvlarForm from "./Form.vue";
export default {
  name: "TekshiruvlarCreate",
  components: {
    TekshiruvlarForm
  },
  data() {
    return {
      category: [],
      tekshiruvlar: {
        name: "",
        price: 0,
        datetime:Math.floor(new Date() / 1000),
        oylik_child: []
      },
      errors: null
    };
  },
  validations: {
    tekshiruvlar: {
      name: {
        required,
        minLength: minLength(3)
      }
    }
  },
  methods: {
    createTekshiruvlar() {
      let self = this;
      this.$v.$touch();
      if (this.$v.$invalid == false) {
        axios({
          method: "post",
          url: "/oylik/create",
          data: self.tekshiruvlar
        }).then(data => {
          if (data != undefined) {
            self.$router.push("oplata");
          }
        });
      } else {
        self.errors = self.$v.tekshiruvlar;
      }
    },
    cancel() {
      this.tekshiruvlar = {
        name: "",
        price: 0,
        citizen_price: 0,
        type: false,
        shablon: false,
        uzi: false,
        user_id: null,
        category_id: null,
        percent_bonus: null,
        inspection_child: []
      };
    }
  }
};
</script>
<style>
.tugmalar1 {
  display: flex;
  justify-content: right;
  margin-top: 60px;
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
