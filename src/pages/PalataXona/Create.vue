<template>
  <div class="md-layout">
    <div
      class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
    >
      <md-card>
        <md-card-content>
          <b-container fluid>
            <palata-xona-form
              :modelvue="palataXona"
              :errors="errors"
            ></palata-xona-form>
            <md-card-content>
              <div class="tugmalarsh">
                <div>
                  <b-button
                    @click="createPalataXona()"
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
import PalataXonaForm from "./Form.vue";
import { required, minLength } from "vuelidate/lib/validators";
export default {
  name: "PalataXonaCreate",
  components: {
    PalataXonaForm
  },
  data() {
    return {
      category: [],
      palataXona: {
        name: "",
        category_id: 0
      },
      errors: null
    };
  },
  validations: {
    palataXona: {
      name: {
        required,
        minLength: minLength(4)
      },
      category_id: {
        required
      }
    }
  },
  methods: {
    createPalataXona() {
      let self = this;
      this.$v.$touch();
      if (this.$v.$invalid == false) {
        axios({
          method: "post",
          url: "/xona_etaj/create",
          data: self.palataXona
        }).then(data => {
          if (data != undefined) {
            self.$router.push("/palata/xona");
          }
        });
      } else {
        self.errors = self.$v.palataXona;
      }
    },

    cancel() {
      this.palataXona = {
        name: "",
        category_id: 0
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
