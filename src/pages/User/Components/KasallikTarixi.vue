<template>
  <div>
    <div v-for="itemKas in kasTarix" style="margin-top: 20px;">
      <div v-if="itemKas.id != $route.params.id" class="bemor-form">
        <div class="kas-tar-creat-date">
          {{ itemKas.created_at | momentSS }}
        </div>
        <div>
          <TekBolim :datas="itemKas" :kasTar="kasallikT" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import TekBolim from "./Tekshiruvlar/TekBolim.vue";
export default {
  props: ["kasTarix", "bemorKasallikT"],
  components: {
    TekBolim
  },
  filters: {
    momentSS: function(date) {
      if (date != null) {
        let d = new Date(date * 1000);

        let options = {
          weekday: "short",
          day: "2-digit",
          month: "long",
          year: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          hour12: true
        };

        return d.toLocaleString("ru-RU", options);
      } else {
        return "";
      }
    }
  },
  data() {
    return {
      kasallikT: this.bemorKasallikT
    };
  }
};
</script>
<style>
.kas-tar-creat-date {
  color: red;
  text-align: center;
  font-size: 20px;
  font-weight: 700;
}
</style>
