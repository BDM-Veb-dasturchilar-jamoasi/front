<template>
  <div>
    <div class="katta">
      <span>Шифокор</span>
      <button
        style="padding: 4px 10px; margin-right: 10px"
        class="btn"
        @click="Prev()"
      >
        <b-icon style="color: white" icon="house-door-fill"> </b-icon>
      </button>
    </div>
    <div>
      <div class="oyna1">
        <div class="ustun">
          <span>
            <span class="shirift">{{ $t("Шифокор") }}</span>
            <span style="color: red;">*</span>
            <span v-if="errors !== null">
              <span
                style="color: red; font-size: 9px"
                v-if="!errors.name.required"
                >{{ $t("Шифокор тўлдирилиши керак") }}</span
              >
              <span
                style="color: red; font-size: 9px"
                v-if="!errors.name.minLength"
                >{{ $t("Шифокорда камида 4 та белги бўлиши керак") }}</span
              >
            </span>
          </span>
          <b-input
            style="height: 35px; background: #fff; border: 1px solid #ced4da;"
            id="shifokor-name"
            v-model="modelvue.name"
            type="text"
          />
        </div>
        <div class="ustun">
          <span>
            <span class="shirift">{{ $t("Шифокор бўлимлари") }}</span>
            <span style="color: red;">*</span>
            <span v-if="errors !== null">
              <span
                style="color: red; font-size: 9px"
                v-if="!errors.bolim_id.required"
                >{{ $t("Шифокор бўлими тўлдирилиши керак") }}</span
              >
            </span>
          </span>
          <v-select
            :options="category"
            label="name"
            :reduce="option => option.id"
            v-model="modelvue.bolim_id"
          />
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
    </div>
  </div>
</template>

<script>
export default {
  name: "shifokor-form",
  props: ["modelvue", "errors"],
  data() {
    return {
      category: [],
      filial:[]
    };
  },
  methods: {
    home() {
      this.$router.push("/shifokor");
    },
    Prev() {
      this.$router.push("/shifokor");
    },
    getCategory() {
      let self = this;
      const filial = localStorage.getItem("filial_id")
      axios({
        method: "get",
        url: `/bolim/all?filial_id=${filial}`
      }).then(res => {
        self.category = res.data.data;
      });
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
    this.getCategory();
    this.getFilial()
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
