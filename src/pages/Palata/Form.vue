<template>
  <div>
    <div class="katta">
      <span>Палата</span>
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
            <span class="shirift">{{ $t("Номи") }}</span>
            <span style="color: red;">*</span>
            <span v-if="errors !== null">
              <span
                style="color: red; font-size: 9px"
                v-if="!errors.name.required"
                >{{ $t("Номи тўлдирилиши керак") }}</span
              >
              <span
                style="color: red; font-size: 9px"
                v-if="!errors.name.minLength"
                >{{ $t("Номи камида 4 та белги бўлиши керак") }}</span
              >
            </span>
          </span>
          <b-input
            style="background: #fff; border: 1px solid #ced4da;"
            id="palata-name"
            v-model="palatas.name"
            type="text"
          />
          <div>
            <span>
              <span class="shirift">{{ $t("Хона") }}</span>
              <span style="color: red;">*</span>
              <span v-if="errors !== null">
                <span
                  style="color: red; font-size: 9px"
                  v-if="!errors.room_id.required"
                  >{{ $t("Хона тўлдирилиши керак") }}</span
                >
              </span>
            </span>
            <v-select
              :options="Xona"
              label="name"
              :reduce="option => option.id"
              v-model="palatas.room_id"
            />
          </div>
        </div>
        <div class="ustun">
          <span>
            <span class="shirift">{{ $t("Нарх") }}</span>
            <span style="color: red;">*</span>
            <span v-if="errors !== null">
              <span
                style="color: red; font-size: 9px"
                v-if="!errors.price.required"
                >{{ $t("Нарҳи тўлдирилиши керак") }}
              </span>
            </span>
          </span>
          <vue-numeric
            style="width: 100%; height: 35px; border: 1px solid #bdb2b2; border-radius: 5px;"
            v-model="palatas.price"
            separator="space"
            :precision="2"
          ></vue-numeric>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "palata-form",
  props: ["palatas", "errors"],
  data() {
    return {
      Xona: []
    };
  },
  methods: {
    getCategory() {
      let self = this;
      axios({
        method: "get",
        url: "/xona_etaj/all"
      }).then(res => {
        self.Xona = res.data.data;
      });
    },
    home() {
      this.$router.push("/palata");
    },
    Prev() {
      this.$router.push("/palata");
    }
  },
  mounted() {
    this.getCategory();
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
