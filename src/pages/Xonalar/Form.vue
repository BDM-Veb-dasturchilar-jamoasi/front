<template>
  <div>
    <div class="katta">
      <span>{{ $t("Хона") }}</span>
      <button style="padding: 4px 10px; margin-right: 10px" class="btn" @click="Prev()">
        <b-icon style="color: white" icon="house-door-fill"> </b-icon>
      </button>
    </div>
    <div style="display: grid; grid-template-columns: repeat(2,1fr);">
      <div class="oyna">
        <span>
          <span class="shirift">{{ $t("Хона") }}</span>
          <span style="color: red;">*</span>
          <span v-if="errors !== null">
            <span style="color: red; font-size: 9px" v-if="!errors.name.required">{{ $t("Хона тўлдирилиши керак")
            }}</span>
            <span style="color: red; font-size: 9px" v-if="!errors.name.minLength">{{ $t("Хонада камида 4 та белги бўлиши  керак") }}</span>
          </span>
        </span>
        <b-input style="width: 50%; background: #fff; border: 1px solid #ced4da;" id="xonalar-name"
          v-model="modelvue.name" type="text" />
      </div>
      <div class="">
        <span>
          <span class="shirift1">Филиал</span>
        </span>
        <v-select
          label="name"
          class="qidiruvselect"
          v-model="modelvue.filial_id"
          :options="filial"
          :reduce="option => option.id"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      filial: []
    };
  },
  name: "xonalar-form",
  props: ["modelvue", "errors"],
  methods: {
    Prev() {
      this.$router.push("/xonalar");
    },
    filials() {
      axios.get('/filial/all').then((res) => {
        console.log(res)
        this.filial = res.data.data
      })
    }
  },
  mounted() {
    this.filials()
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

.shirift {
  font-size: 16px;
  font-weight: 400;
}

.oyna {
  margin: 10px 0;
  padding: 0 10px;
  position: relative;
}
</style>
