<template>
  <div class="md-layout">
    <div
      class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
    >
      <md-card>
        <md-card-content>
          <b-container fluid>
            <kassa-form :kassaOrder="kassa" :errors="errors"></kassa-form>
            <md-card-content>
              <div class="tugmalar">
                <div>
                  <b-button
                    :class="{ Disabled: $route.name == 'KassaDoc' }"
                    @click="kassa_update()"
                    class="mr-2 calendar"
                    variant="success"
                  >
                    <b-icon icon="calendar2-plus"></b-icon> {{ $t("Сақлаш") }}
                  </b-button>
                  <b-button
                    @click="cancel()"
                    :class="{ Disabled: $route.name == 'KassaDoc' }"
                    variant="danger"
                    class="calendar1"
                  >
                    <b-icon icon="calendar2-x"></b-icon>{{ $t("Бекор қилиш") }}
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
import KassaForm from "./Form.vue";
import { required } from "vuelidate/lib/validators";
export default {
  name: "KassaUpdate",
  components: {
    KassaForm
  },
  validations: {
    kassa: {
      comment: {
        required
      }
    }
  },
  data() {
    return {
      kassa: {
        id: 0,
        expense_id: 0,
        date_time: null,
        type: "",
        price: 0,
        pay_type: "Naqt",
        comment: "",
        filial_id:null
      },
      errors: null
    };
  },
  validations: {
    kassa: {
      type: {
        required
      },
      comment: {
        required
      },
      price: {
        required
      }
    }
  },
  methods: {
    kassa_update() {
      let self = this;
      this.$v.$touch();
      if (this.$v.$invalid == false) {
        // self.kassa.price = this.kassa.price * -1;
        axios({
          method: "patch",
          url: `/kassa_order/update/` + self.$route.params.id,
          data: self.kassa
        }).then(data => {
          if (data != undefined) {
            self.$router.push("/tolovlar");
          }
        });
      } else {
        self.errors = self.$v.kassa;
      }
    },

    getKassa() {
      let self = this;
      axios({
        method: "get",
        url: `/kassa_order/one/` + self.$route.params.id
      }).then(res => {
        if (res) {
          // Math.abs(res.data.data.price);
          self.kassa = res.data.data;
        }
      });
    },
    cancel() {
      kassa = {
        type: "Naqt",
        price: 0,
        comment: "Oylik"
      };
    }
  },
  mounted() {
    this.getKassa();
  }
};
</script>
<style>
.Disabled {
  pointer-events: none;
}
.tugmalar {
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
