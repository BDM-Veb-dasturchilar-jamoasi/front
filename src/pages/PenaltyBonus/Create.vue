<template>
    <div class="md-layout">
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <md-card>
          <md-card-content>
            <b-container fluid>
              <hodimlar-form
                :modelvue="data"
                :errors="errors"
              ></hodimlar-form>
              <md-card-content>
                <div class="tugmalarh">
                  <div>
                    <b-button
                      @click="createData()"
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
        data: {
          "id": 0,
          "min_time": 0,
          "max_time": 0,
          "cause": "",
          "type": "penalty",
          "summa": 0,
          "come_type": "come"
        },
        errors: null
      };
    },
    validations: {
      data: {
        min_time: {
          required,
        },
        max_time: {
          required,
        },
        cause: {
          required,
          minLength: minLength(4)
        },
        type: {
          required,
        },
        summa: {
          required
        }
      }
    },
    methods: {
      createData() {
        let self = this;
        this.$v.$touch();
        if (this.$v.$invalid == false) {
          axios({
            method: "post",
            url: "/penalty-bonus/create",
            data: self.data
          }).then(data => {
            if (data != undefined) {
              self.$router.push("/penalty-bonus");
            }
          });
        } else {
          self.errors = self.$v.data;
        }
      },
      closeModal() {
        this.visible = true;
        this.$router.push("/penalty-bonus");
      },
      cancel() {
        this.hodimlar = {
          "id": 0,
          "min_time": 0,
          "max_time": 0,
          "cause": "",
          "type": "penalty",
          "summa": 0
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
  