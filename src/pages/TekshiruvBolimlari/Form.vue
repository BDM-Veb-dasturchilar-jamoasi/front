<template>
  <div>
    <div class="katta">
      <span>Текширув бўлимлари</span>
      <button style="padding: 4px 10px; margin-right: 10px" class="btn" @click="Prev()">
        <b-icon style="color: white" icon="house-door-fill"> </b-icon>
      </button>
    </div>
    <div class="oyna">
      <b-form-checkbox v-model="modelvue.napro_type" name="check-button" switch>
        Напровитил улуши <b v-if="modelvue.napro_type == true">бор</b> <b v-if="modelvue.napro_type == false">йўқ</b>
      </b-form-checkbox>
      <span class="shirift">
        Бўлим номи
        <span style="color: red;">*</span>
        <span v-if="errors !== null">
          <span style="color: red; font-size: 9px" v-if="!errors.name.required">Бўлим номи тўлдирилиши керак</span>
          <span style="color: red; font-size: 9px" v-if="!errors.name.minLength">Бўлим номида камида 3 та белги бўлиши
            керак</span>
        </span>
      </span>
      <b-input  style="width: 50%; background: #fff; border: 1px solid #ced4da;" id="tekshiruvBolimlari-name"
        v-model="modelvue.name" type="text" />
      <div  style="width: 50%;">
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
    </div>
      <b-form-checkbox v-model="modelvue.user_type" name="check-button" switch>
        Ҳодимни улуши қисқариши
      </b-form-checkbox>
    <div v-if="modelvue.napro_type == true">
      <span class="shiri">
        {{ $t("Тўлов тури") }}
      </span>
      <v-select style="width: 50%;" :options="bonus_type" label="name" :components="{ Deselect }" :reduce="option => option.id"
        v-model="modelvue.bonus_type" />
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
        <vue-numeric
          v-else
          style="width: 50%; height: 35px; border: 1px solid #bdb2b2; border-radius: 5px;"
          v-model="modelvue.bonus"
          :precision="2"
          separator="space"
        ></vue-numeric>
    </div>
  </div>
</template>

<script>
export default {
  name: "tekshiruvBolimlari-form",
  props: ["modelvue", "errors"],
  data() {
    return {
      filial: [],
      bonus_type: [
        {id: 0, name: "Naqd"},
        {id: 1, name: "Foiz"},
      ],
    }
  },

  methods: {
    Prev() {
      this.$router.push("/tekshiruv-bolimlari");
    },
    getFiliallar() {
      let self = this;
      axios({
        method: "get",
        url: "/filial/all"
      }).then(res => {
        self.filial = res.data.data;
      });
    },
  },
  mounted() {
    this.getFiliallar()
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

.oyna {
  margin: 10px 0;
}

.shirift {
  font-size: 16px;
}
</style>
