<template>
  <div class="md-layout">
    <div
      class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
    >
      <md-card>
        <md-card-content>
          <b-container fluid>
            <shifokor-korig-form
              :modelvue="shifokorKorig"
              :errors="errors"
            ></shifokor-korig-form>
            <md-card-content>
              <div class="tugmalarsh">
                <div>
                  <b-button
                    @click="updateShifokorKorig()"
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
import ShifokorKorigForm from "./Form.vue";
import { required, minLength } from "vuelidate/lib/validators";
export default {
  name: "ShifokorKorigUpdate",
  components: {
    ShifokorKorigForm
  },
  data() {
    return {
      shifokorKorig: {
        id: 0,
        name: "",
        price: 0,
        citizen_price: 0,
        bolim_id: null
      },
      errors: null
    };
  },
  validations: {
    shifokorKorig: {
      name: {
        required,
        minLength: minLength(3)
      },
      price: {
        required
      },
      citizen_price: {
        required
      },
      bolim_id: {
        required
      }
    }
  },
  methods: {
    updateShifokorKorig() {
      let self = this;
      this.$v.$touch();
      if (this.$v.$invalid == false) {
        axios({
          method: "patch",
          url: `/doctor_category/update/` + self.shifokorKorig.id,
          data: self.shifokorKorig
        }).then(data => {
          if (data != undefined) {
            self.$router.push("/shifokor-bolimi");
          }
        });
      } else {
        self.errors = self.$v.shifokorKorig;
      }
    },

    getShifokorKorig() {
      let self = this;
      axios({
        method: "get",
        url: `/doctor_category/one/` + self.$route.params.id
      }).then(res => {
        self.shifokorKorig = res.data.data;
      });
    },
    cancel() {
      this.shifokorKorig = {
        name: "",
        price: 0,
        citizen_price: 0,
        bolim_id: null
      };
    }
  },
  mounted() {
    this.getShifokorKorig();
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
