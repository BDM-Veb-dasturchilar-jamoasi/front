<template>
  <div>
    <div class="katta">
      <span>{{ $t("Шифокор бўлимлари") }}</span>
      <button style="padding: 4px 10px; margin-right: 10px" class="btn" @click="Prev()">
        <b-icon style="color: white" icon="house-door-fill"> </b-icon>
      </button>
    </div>
    <div>
      <div class="oyna1">
        <div class="ustun">
          <span>
            <span class="shirift">{{ $t("Бўлим номи") }}</span>
            <span style="color: red;">*</span>
            <span v-if="errors !== null">
              <span style="color: red; font-size: 9px" v-if="!errors.name.required">{{ $t("Бўлим номи тўлдирилиши керак")
              }}</span>
              <span style="color: red; font-size: 9px" v-if="!errors.name.minLength">{{ $t("Бўлим номида камида 3 та белги
                              бўлиши керак") }}</span>
            </span>
          </span>
          <b-input id="shifokorBolimi-name" style="background: #fff; border: 1px solid #ced4da;" v-model="modelvue.name"
            type="text" />
        </div>

        <div class="ustun" style="display: grid; grid-template-columns: repeat(2, 1fr);">
          <b-form-checkbox v-model="modelvue.napro_type" name="check-button" switch>
            Напровитил улуши <b v-if="modelvue.napro_type == true">бор</b> <b v-if="modelvue.napro_type == false">йўқ</b>
          </b-form-checkbox>
          <div>
            <span class="shirift">{{ $t("Напровитель фоиз") }}</span>
            <vue-numeric style="width: 100%; height: 35px; border: 1px solid #bdb2b2; border-radius: 5px;"
              v-model="modelvue.direct_precent" separator="space"></vue-numeric>
          </div>
        </div>
      </div>
      <div style="width: 49%;">
        <span>
          {{ $t("Филиал") }}
          <span style="color: red;">*</span>
          <span v-if="errors !== null">
            <span style="color: red; font-size: 9px" v-if="!errors.room_id.required">{{ $t("Филиал тўлдирилиши керак")
            }}</span>
          </span>
        </span>
        <v-select :options="filial" label="name" :reduce="option => option.id" v-model="modelvue.filial_id" />
      </div>
      <div style="width: 98%;" v-if="modelvue.napro_type == true">
        <span class="shiri">
          {{ $t("Тўлов тури") }}
        </span>
        <v-select style="width: 50%;" :options="bonus_type" label="name" :components="{ Deselect }"
          :reduce="option => option.id" v-model="modelvue.bonus_type" />
      </div>
      <div style="width: 98%;" v-if="modelvue.napro_type == true">
      <span>
        <span class="shiri">
          {{ $t("Фоиз") }}
        </span>
        <br>
        <!-- <span style="color: red;">*</span> -->
        <span v-if="errors !== null">
          <span style="color: red; font-size: 9px" v-if="!errors.bonus.required">{{ $t("Фоиз тўлдирилиши керак") }}</span>
        </span>
      </span>
      <!-- <b-input id="naprovitel-bonus" v-model="modelvue.bonus" type="number" /> -->
      <vue-numeric v-if="modelvue.bonus_type"
        style="width: 50%; height: 35px; border: 1px solid #bdb2b2; border-radius: 5px;" v-model="modelvue.bonus"
        separator="space"></vue-numeric>
      <vue-numeric v-else style="width: 50%; height: 35px; border: 1px solid #bdb2b2; border-radius: 5px;"
        v-model="modelvue.bonus" :precision="2" separator="space"></vue-numeric>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      filial: [],
      bonus_type: [
        {id: 0, name: "Naqd"},
        {id: 1, name: "Foiz"},
      ],
    }
  },
  name: "shifokorBolimi-form",
  props: ["modelvue", "errors"],
  methods: {
    Prev() {
      this.$router.push("/yonalish");
    },
    getFilial() {
      axios({
        method: "get",
        url: `/filial/all`
      }).then(res => {
        this.filial = res.data.data;
      });
    },
  },
  mounted() {
    this.getFilial()
  }
};
</script>
<style>
.katta {
  background: #007bff;
  margin-top: -25px;
  height: 40px;
  font-size: 20px;
  display: flex;
  justify-content: space-between;
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
