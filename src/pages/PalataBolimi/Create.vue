<template>
  <div class="md-layout">
    <div
      class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
    >
      <md-card>
        <md-card-content>
          <b-container fluid>
            <palata-bolim-form
              :modelvue="palataBolim"
              :errors="errors"
            ></palata-bolim-form>
            <md-card-content>
              <div class="tugmalarsh">
                <div>
                  <b-button
                    @click="createPalataBolim()"
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
import PalataBolimForm from "./Form.vue";
import { required, minLength } from "vuelidate/lib/validators";
export default {
  name: "PalataBolimCreate",
  components: {
    PalataBolimForm
  },
  data() {
    return {
      category: [],
      palataBolim: {
        name: ""
      },
      errors: null
    };
  },
  validations: {
    palataBolim: {
      name: {
        required,
        minLength: minLength(4)
      }
    }
  },
  methods: {
    createPalataBolim() {
      let self = this;
      this.$v.$touch();
      if (this.$v.$invalid == false) {
        axios({
          method: "post",
          url: "/palata_category/create",
          data: self.palataBolim
        }).then(data => {
          if (data != undefined) {
            self.$router.push("/palata/bolim");
          }
        });
      } else {
        self.errors = self.$v.palataBolim;
      }
    },

    cancel() {
      this.palataBolim = {
        name: ""
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
