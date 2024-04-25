<template>
  <div>
    <div class="header-btns-b">
      <div>
        <b-button
          v-if="!$store.state.kasTar && $route.name != 'ArxivOne'"
          variant="primary"
          @click="Saqlash"
          class="navbar-brn-prim"
        >
          <b-spinner small v-if="sending"></b-spinner>
          {{ $t("Сақлаш ва беркитиш") }}
        </b-button>
      </div>
      <div>
        <b-form-checkbox
          :class="{ kasallikT: $store.state.kasTar }"
          style="display: flex; width: 200px;"
          v-if="
            localUser.role == 'Kasser' ||
              localUser.role == 'Admin' ||
              localUser.role == 'Registrator'
          "
          @input="StatusVal"
          v-model="newStatus"
          value="complate"
          unchecked-value="waiting"
        >
          Якунлаш
        </b-form-checkbox>
      </div>
      <!-- <b-button variant="primary">dddd</b-button> -->
      <b-button class="navbarBtnDanger" variant="danger" @click="cancel()">
        <b-icon icon="x-circle-fill"></b-icon>
      </b-button>
    </div>
  </div>
</template>
<script>
export default {
  props: ["sending", "status"],
  data() {
    return {
      localUser: JSON.parse(localStorage.getItem('user')),
      newStatus: "waiting",
    };
  },
  methods: {
    Saqlash() {
      this.$emit("Saqlash", true);
    },
    cancel() {
      this.$emit("cancel", true);
    },
    StatusVal(val){
      this.$emit("status", val);
    }
  },
  watch:{
    status: function(val){
      this.newStatus = val;
    }
  }
};
</script>
<style>
.navbarBtnDanger {
  border: 1px solid #fff;
  /* box-shadow: 5px 8px 10px rgba(176,25,25,.3); */
  box-shadow: 5px 8px 10px rgba(176, 25, 25, 0.3);
  background: #e80a18;
  border-radius: 8px;
}
.navbar-brn-prim {
  border: 1px solid #fff;
  font-size: 19px;
  font-weight: 600;
  padding: 5px 25px;
  background: #0b0bdd;
  -webkit-box-shadow: 5px 8px 10px rgba(25, 95, 176, 0.3);
  box-shadow: 5px 8px 10px rgba(25, 95, 176, 0.3);
  border-radius: 8px;
}
.header-btns-b {
  display: flex;
  justify-content: space-between;
  background: #fff;
  padding: 7px 10px;
  border-bottom: 1px solid rgb(46, 165, 255);
}
</style>
