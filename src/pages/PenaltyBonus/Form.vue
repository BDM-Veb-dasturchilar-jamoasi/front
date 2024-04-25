<template>
    <div>
      <div class="katta">
        <span>{{ $t("Ходим") }}</span>
        <button
          style="padding: 4px 10px; margin-right: 10px"
          class="btn"
          @click="Prev()"
        >
          <b-icon style="color: white" icon="house-door-fill"> </b-icon>
        </button>
      </div>
      <div class="oyna1">
        <div class="ustun">
          <div>
            <span>
              Сабаб
              <span style="color: red;">*</span>
              <span v-if="errors !== null">
                <span
                  style="color: red; font-size: 9px"
                  v-if="!errors.cause.required"
                  >Сабаб тўлдирилиши керак</span
                >
                
              </span>
            </span>
            <b-input v-model="modelvue.cause" type="text" />
          </div>
  
          <div>
            <span>
              Дан (минут)
              <span style="color: red;">*</span>
            </span>
            <vue-numeric
              style="width: 100%; height: 35px; border: 1px solid #bdb2b2; border-radius: 3px;"
              v-model="modelvue.min_time"
              separator="space"
            ></vue-numeric>
          </div>
          <div>
            <span>
              Гача (минут)
              <span style="color: red;">*</span>
            </span>
            <vue-numeric
              style="width: 100%; height: 35px; border: 1px solid #bdb2b2; border-radius: 3px;"
              v-model="modelvue.max_time"
              separator="space"
            ></vue-numeric>
          </div>
         
        </div>
  
        <div class="ustun">
          <div>
            <span>
              Тури
              <span style="color: red;">*</span>
            </span>
            <v-select :options="category" label="name" :reduce="item => item.val" v-model="modelvue.type" />
          </div>
          <div>
            <span>
              Келиш тури
              <span style="color: red;">*</span>
            </span>
            <v-select :options="comeTypes" label="name" :reduce="item => item.val" v-model="modelvue.come_type" />
          </div>
          <div>

            <span>
              Сумма
              <span style="color: red;">*</span>
            </span>
            <vue-numeric
              style="width: 100%; height: 35px; border: 1px solid #bdb2b2; border-radius: 3px;"
              v-model="modelvue.summa"
              separator="space"
            ></vue-numeric>
          </div>  
        </div>
      </div>
     
    </div>
  </template>
  
  <script>
  import axios from "axios";
  export default {
    name: "edit-profile-form",
    props: ["modelvue", "errors"],
    data() {
      return {
        hodimlar: [],
        Shifokor: [],
        tekshiruvBolimlari: [],
        xonalar: [],
        category: [
          {
            name: "Jarima",
            val: "penalty"
          },
          {
            name: "Bonus",
            val: "bonus"
          },
        ],
        comeTypes: [
          {
            name: "Kelish",
            val: "come"
          },
          {
            name: "Ketish",
            val: "leave"
          },
        ],
        tolovTuri: ["Foiz", "Oylik"]
      };
    },
    methods: {
      home() {
        this.modelvue = {
          "min_time": 0,
          "max_time": 0,
          "cause": "",
          "type": "penalty"
        };
      },
      Prev() {
        this.$router.push("/penalty-bonus");
      },
    },
    mounted() {
    }
  };
  </script>
  <style>
  .katta {
    background: #007bff;
    margin-top: -25px;
    height: 40px;
    display: flex;
    justify-content: space-between;
    font-size: 20px;
    font-weight: 700;
    line-height: 40px;
    border-radius: 8px;
    color: #fff;
    text-indent: 15px;
    box-shadow: 5px 8px 10px rgba(25, 95, 176, 0.5);
  }
  .oyna1 {
    margin: 10px 0;
    display: flex;
    justify-content: space-between;
  }
  .shirift {
    font-size: 16px;
  }
  .ustun {
    width: 49%;
  }
  </style>
  