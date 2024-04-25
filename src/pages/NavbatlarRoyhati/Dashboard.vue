<template>
  <div class="cont">
    <div class="header">
      <h3 class="text-success">{{ $t("Навбат рўйҳати") }}</h3>
      <div style="display: flex; justify-content: space-between;">
        <b-button
          v-if="
            localUser.role != 'Loborant' && localUser.role != 'Shifokor'
          "
          style="margin-left: 10px;"
          class="qoshishBtn mr-2"
          variant="primary"
          @click="DeleteNAv"
        >
          <span>
            {{ $t("Навбатни тозалаш") }}
          </span>
        </b-button>
        <b-button variant="danger" @click="chiqish()">X</b-button>
      </div>
    </div>
    <div>
      <b-table
        striped
        hover
        :items="items"
        :fields="translatedFields"
        :sort-desc.sync="sortDesc"
        :sort-asc.sync="sortAsc"
        :sort-by.sync="sortBy"
        :outlined="outlined"
      >
        <template #cell(№)="data">
          {{ data.index + 1 }}
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
export default {
  data() {
    return {
      localUser: JSON.parse(localStorage.getItem("user")),
      items: [],
      fields: [
        "№",
        { key: "patient.fullname", label: "Бемор" },
        { key: "room.name", label: "Хона рақами" },
        { key: "date_time", label: "Вақт" },
        // { key: "status", label: "Status" },
        { key: "number", label: "Навбат рақами" }
      ],
      translatedFields: [],
      sortBy: "number",
      sortDesc: false,
      sortAsc: true,
      outlined: true
    };
  },
  watch: {
    "$i18n.locale": {
      immediate: true,
      handler() {
        this.updateTranslatedFields();
      }
    }
  },
  methods: {
    updateTranslatedFields() {
      this.translatedFields = this.fields.map(field => {
        return {
          ...field,
          label: this.$t(field.label)
        };
      });
    },
    DeleteNAv() {
      axios({
        method: "delete",
        url: "registration/setEmptyQueue"
      }).then(res => {
        if (res) {
        }
      });
    },
    getData() {
      setInterval(() => {
        this.data();
      }, 5000);
    },
    data() {
      let s = this;
      axios({
        method: "get",
        url: "/registration/queue"
      }).then(res => {
        for (let key of res.data.data) {
          key.date_time = moment(new Date(key.date_time * 1000)).format(
            "YYYY.MM.DD-HH:mm:ss"
          );
        }
        s.items = res.data.data;
        s.totalRows = s.items.length;
      });
    },
    chiqish() {
      this.$router.go(-1);
    }
  },
  mounted() {
    this.updateTranslatedFields();
    this.data();
    this.getData();
  }
};
</script>
<style scoped>
.header {
  display: flex;
  height: 50px;
  justify-content: space-between;
  align-items: center;
  padding: 0px 20px;
}
</style>
