<template>
  <div>
    <div class="katta">
      <span>{{ $t("Напровитель") }}</span>
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
        <span>
          <span class="shirift">{{ $t("Ф.И.Ш") }}</span>
          <span style="color: red;">*</span>
          <span v-if="errors !== null">
            <span
              style="color: red; font-size: 9px"
              v-if="!errors.name.required"
              >{{ $t("Ф.И.Ш тўлдирилиши керак") }}</span
            >
            <span
              style="color: red; font-size: 9px"
              v-if="!errors.name.minLength"
              >{{ $t("Ф.И.Ш да камида 4 та белги бўлиши керак") }}</span
            >
          </span>
        </span>
        <b-input id="naprovitel-name" v-model="modelvue.name" type="text" />
        <span>
          <span class="shirift">{{ $t("Место работы") }}</span>
          <span style="color: red;">*</span>
        </span>
        <b-input id="naprovitel-name" v-model="modelvue.ish_joyi" type="text" />

        <span>
          <span class="shirift">{{ $t("Вакил") }}</span>
          <span style="color: red;">*</span>
          <span v-if="errors !== null">
            <span
              style="color: red; font-size: 9px"
              v-if="!errors.name.required"
              >{{ $t("Ф.И.Ш тўлдирилиши керак") }}</span
            >
          </span>
        </span>
        <v-select
          :options="MedPris"
          label="name"
          :reduce="option => option.id"
          v-model="modelvue.med_id"
        />

        <span>
          <span class="shiri">
            {{ $t("ID") }}
          </span>
          <span style="color: red;">*</span>
          <span v-if="errors !== null">
            <span
              style="color: red; font-size: 9px"
              v-if="!errors.bonus.required"
              >{{ $t("ID тўлдирилиши керак") }}</span
            >
          </span>
        </span>
        <b-input
          id="naprovitel-name"
          v-model="modelvue.direct_id"
          type="number"
        />
      </div>
      <div class="ustun">

        <span class="shiri">
            {{ $t("Тўлов тури") }}
          </span>
        <v-select
          :options="bonus_type"
          label="name"
          :components="{ Deselect }"
          :reduce="option => option.id"
          v-model="modelvue.bonus_type"
        />
        <span>
          <span class="shiri">
            {{ $t("Фоиз") }}
          </span>
          <span style="color: red;">*</span>
          <span v-if="errors !== null">
            <span
              style="color: red; font-size: 9px"
              v-if="!errors.bonus.required"
              >{{ $t("Фоиз тўлдирилиши керак") }}</span
            >
          </span>
        </span>
        <!-- <b-input id="naprovitel-bonus" v-model="modelvue.bonus" type="number" /> -->
        <vue-numeric
          v-if="modelvue.bonus_type"
          style="width: 100%; height: 35px; border: 1px solid #bdb2b2; border-radius: 5px;"
          v-model="modelvue.bonus"
          separator="space"
        ></vue-numeric>
        <vue-numeric
          v-else
          style="width: 100%; height: 35px; border: 1px solid #bdb2b2; border-radius: 5px;"
          v-model="modelvue.bonus"
          :precision="2"
          separator="space"
        ></vue-numeric>
        <span>
          <span class="shirift">{{ ("Специальность") }}</span>
          <span style="color: red;">*</span>
        </span>
        <b-input id="naprovitel-name" v-model="modelvue.lavozimi" type="text" />
        <span>
          <span class="shirift">{{ ("Телефон") }}</span>
          <span style="color: red;">*</span>
        </span>
        <b-input id="naprovitel-name" v-model="modelvue.phone" type="number" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "naprovitel-form",
  props: ["modelvue", "errors"],
  data() {
    return {
      MedPris: [],
      bonus_type: [
        {id: 0, name: "Naqd"},
        {id: 1, name: "Foiz"},
      ],
      Deselect: {
        render: createElement => createElement("span", "")
      }
    };
  },
  methods: {
    getMed() {
      let s = this;
      axios({
        method: "get",
        url: "/med_direct/all"
      }).then(res => {
        if (res) {
          s.MedPris = res.data.data;
        }
      });
    },
    Prev() {
      this.$router.push("/naprovitel");
    }
  },
  mounted() {
    this.getMed();
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
