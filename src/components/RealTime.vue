<template>
  <div>
    <div class="hodim-info">
      <div class="hodim-real-time">
        <div class="vaqt">
          {{ $t("Ҳуш келибсиз!") }} {{ localUser.user_name }}
        </div>
        <div class="vaqt">{{ currentDateTime }}</div>
      </div>
      <div>
        <div class="til-div-h">
          <div
            class="uz-style-h"
            @click="tilClick('uz')"
            :class="{ activeTilH: $i18n.locale == 'uz' }"
          >
            uz
          </div>
          <div
            @click="tilClick('ru')"
            class="ru-style-h"
            :class="{ activeTilH: $i18n.locale == 'ru' }"
          >
            ru
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentDateTime: "",
      weekdays: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
      localUser: JSON.parse(localStorage.getItem("user"))
    };
  },
  methods: {
    tilClick(key) {
      this.$i18n.locale = key; // Switch to French locale
      // this.$store.state.locale = key
    }
  },
  mounted() {
    setInterval(() => {
      const now = new Date();
      const weekday = this.weekdays[now.getDay()];
      // const dateTime = now.toLocaleString();
      const date = now
        .toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric"
        })
        .replace(/\//g, ".");
      const min = now.toLocaleTimeString("en-US", {
        min: "2-digit",
        secund: "2-digit",
        min: false
      });
      this.currentDateTime = weekday + ", " + `${date} ${min}`;
    }, 1000);
  }
};
</script>
<style>
.hodim-info {
  width: 100%;
  height: 30px;
  position: relative;
  top: 0px;
  z-index: 5;
  display: flex;
  background: #00005e;
  box-shadow: -5px 5px 20px -5px #ccc;
  /* border: 1px solid rgb(227, 255, 239); */
  /* border-bottom: 1px solid rgb(227, 255, 239);
    border-left: 1px solid rgb(227, 255, 239);
    border-right: 1px solid rgb(227, 255, 239); */
}
.hodim-real-time {
  display: flex;
  justify-content: space-between;
  margin: 0px auto;
  /* width: 500px; */
}
.vaqt {
  color: #fff;
  border-right: 1px solid #fff;
  border-left: 1px solid #fff;
  padding-left: 10px;
  padding-right: 10px;
  font-size: 16px;
  font-weight: 600;
}
.til-div-h {
  /* padding: 5px; */
  display: flex;
  margin-right: 30px;
  color: #fff;
  /* background: #fff; */
  font-size: 19px;
  font-weight: 600;
}
.uz-style-h {
  cursor: pointer;
  margin-right: 2px;
  border-radius: 10px;
  padding: 0px 7px;
}
.ru-style-h {
  padding: 0px 7px;
  border-radius: 10px;
  cursor: pointer;
}
.uz-style-h:hover {
  color: blue !important;
}
.ru-style-h:hover {
  color: blue !important;
}
.activeTilH {
  background: #6f73ff;
  color: #fff;
}
</style>
