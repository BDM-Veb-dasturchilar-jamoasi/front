<template>
  <div class="md-layout">
    <div
      class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
    >
      <md-card>
        <md-card-content>
          <b-container fluid>
            <shifokor-bolimi-form
              :modelvue="shifokorBolimi"
              :errors="errors"
            ></shifokor-bolimi-form>
            <md-card-content>
              <div class="tugmalarsh">
                <div>
                  <b-button
                    @click="updateShifokorBolimi()"
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
import ShifokorBolimiForm from "./Form.vue";
import { required, minLength } from "vuelidate/lib/validators";
export default {
  name: "ShifokorBolimiUpdate",
  components: {
    ShifokorBolimiForm
  },
  data() {
    return {
      shifokorBolimi: {
        id: 0,
        name: "",
        filial_id:'',
        direct_precent: 0,
        napro_type:false,
        bonus:0,
        bonus_type:null
      },
      errors: null
    };
  },
  validations: {
    shifokorBolimi: {
      name: {
        required,
        minLength: minLength(3)
      }
      // price: {
      //   minLength: minLength(3)
      // },
      // citizen_price: {
      //   minLength: minLength(3)
      // }
    }
  },
  methods: {
    updateShifokorBolimi() {
      let self = this;
      this.$v.$touch();
      if (this.$v.$invalid == false) {
        axios({
          method: "patch",
          url: `/bolim/update/` + self.shifokorBolimi.id,
          data: self.shifokorBolimi
        }).then(data => {
          if (data != undefined) {
            self.$router.push("/yonalish");
          }
        });
      } else {
        self.errors = self.$v.shifokorBolimi;
      }
    },

    getShifokorBolimi() {
      let self = this;
      axios({
        method: "get",
        url: `/bolim/one/` + self.$route.params.id
      }).then(res => {
        self.shifokorBolimi = res.data.data;
      });
    },
    cancel() {
      this.shifokorBolimi = {
        name: "",
        direct_precent: 0
      };
    }
  },
  mounted() {
    this.getShifokorBolimi();
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
