<template>
  <div>
    <div class="katta">
      <span>{{ $t("Жарроҳлик вақтида") }}</span>
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
                >{{ $t("Номида камида 3 та белги бўлиши керак") }}</span
              >
            </span>
          </span>
          <b-input
            id="qoshimcha-name"
            style="background: #fff; border: 1px solid #ced4da;"
            v-model="modelvue.name"
            type="text"
          />
          <div>
            <span>
              <span class="shirift">
                {{ $t("Фуқаролик нарҳ") }}
              </span>
              <span v-if="errors !== null">
                <span
                  style="color: red; font-size: 9px"
                  v-if="!errors.price.minLength"
                  >{{ $t("Нарҳида камида 3 та белги бўлиши керак") }}</span
                >
              </span>
            </span>
            <vue-numeric
              style="width: 100%; height: 35px; border: 1px solid #bdb2b2; border-radius: 5px;"
              v-model="modelvue.price"
              separator="space"
              :precision="2"
            ></vue-numeric>
            <span>
              <span class="shirift">
                {{ $t("Фуқаролиги бўлмаган нарҳ") }}
              </span>
              <span v-if="errors !== null">
                <span
                  style="color: red; font-size: 9px"
                  v-if="!errors.citizen_price.minLength"
                  >{{ $t("Нарҳида камида 3 та белги бўлиши керак") }}</span
                >
              </span>
            </span>
            <vue-numeric
              style="width: 100%; height: 35px; border: 1px solid #bdb2b2; border-radius: 5px;"
              v-model="modelvue.citizen_price"
              separator="space"
              :precision="2"
            ></vue-numeric>
          </div>
        </div>
        <div class="ustun">
          <div>
            <span class="shirift">
              {{ $t("Шифокор") }}
            </span>
            <v-select
              :options="category"
              label="name"
              :reduce="option => option.id"
              v-model="modelvue.doctor_id"
            />
          </div>
          <span class="shirift">
            {{ $t("Шифокор фоизи") }}
          </span>
          <vue-numeric
            style="width: 100%; height: 35px; border: 1px solid #bdb2b2; border-radius: 5px;"
            v-model="modelvue.percent"
            separator="space"
          ></vue-numeric>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "qoshimcha-form",
  props: ["modelvue", "errors"],
  data() {
    return {
      category: []
    };
  },
  methods: {
    Prev() {
      this.$router.push("/qoshimcha");
    },
    getCategory() {
      let self = this;
      axios({
        method: "get",
        url: "/doctor/all"
      }).then(res => {
        if (res) {
          self.category = res.data;
        }
      });
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
