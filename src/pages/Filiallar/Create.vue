<template>
  <div class="md-layout">
    <div
      class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
    >
      <md-card>
        <md-card-content>
          <b-container fluid>
            <filiallar-form :modelvue="filiallar" :errors="errors"></filiallar-form>
            <md-card-content>
              <div class="tugmalarx">
                <div>
                  <b-button
                    @click="createFiliallar()"
                    class="mr-2 calendar"
                    variant="success"
                  >
                    <b-icon icon="calendar2-plus"></b-icon> {{ $t("Сақлаш") }}
                  </b-button>
                  <b-button
                    @click="cancel()"
                    class="calendar1"
                    variant="danger"
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
import FiliallarForm from "./Form.vue";
import { required, minLength } from "vuelidate/lib/validators";
export default {
  name: "FiliallarCreate",
  components: {
    FiliallarForm
  },
  data() {
    return {
      filiallar: {
        name: ""
      },
      errors: null
    };
  },
  validations: {
    filiallar: {
      name: {
        required,
        minLength: minLength(4)
      }
    }
  },
  methods: {
    createFiliallar() {
      let self = this;
      this.$v.$touch();
      if (this.$v.$invalid == false) {
        axios({
          method: "post",
          url: "/filial/create",
          data: self.filiallar
        }).then(data => {
          if (data != undefined) {
            this.$root.$emit("add_filiallar", data);
            this.$router.push("filiallar");
          }
        });
      } else {
        this.errors = this.$v.filiallar;
      }
    },
    cancel() {
      this.filiallar = {
        name: ""
      };
    }
  }
};
</script>
<style>
.tugmalarx {
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
