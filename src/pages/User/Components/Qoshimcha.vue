<template>
  <div>
    <table class="table table-sm table-bordered">
      <thead id="head">
        <tr>
          <th style="width: 40px;">№</th>
          <th>{{ $t("Номи") }}</th>
          <th v-if="localUser.role != 'Shifokor'">{{ $t("Сумма") }}</th>
          <th v-if="localUser.role != 'Shifokor'">Возврат</th>
          <th style="width: 40px;"></th>
        </tr>
      </thead>
      <tbody class="BayonotThead">
        <tr
          v-for="(item, index) in qoshimcha"
          :key="index"
          :class="{
            vazvrat: item.vazvrat == true || classvazvrat == true
          }"
        >
          <td>{{ index + 1 }}</td>
          <td>
            <div style="font-size: 18px; font-weight: 600;">
              {{ item.name }}
            </div>
          </td>
          <td v-if="localUser.role != 'Shifokor'">
            <div style="display: flex; justify-content: space-between; margin: 0 10px; ">
              <div style="font-size: 18px; font-weight: 600;">{{ item.price | numFormat }}</div>
              <button
                v-if="item.vazvrat || !classvazvrat && localUser.role == 'Admin'"
                class="navbarBtnTashxis-summa navbarBtnTashxis"
                v-b-modal="'modal-summa-change' + index + modalIdCom + indOta"
                @click="price = item.price"
              >
                <b-icon
                  style="width: 15px;"
                  icon="pencil-fill"
                ></b-icon>
              </button>
              <b-modal
                :id="'modal-summa-change' + index + modalIdCom + indOta"
                :title="item.name"
                hide-footer
              >
                <div style="width: 100%;">
                  <vue-numeric
                    class="numberic-pay"
                    separator="space"
                    :precision="2"
                    v-model="price"
                  ></vue-numeric>
                </div>
                <div class="CreateName">
                  <b-button
                    class="modalBtn1"
                    size="sm"
                    style="height: 37px;"
                    variant="danger "
                    @click="close(index)"
                  >
                    <b-icon icon="calendar2-x"></b-icon>
                    {{ $t("Бекор қилиш") }}
                  </b-button>
                  <b-button
                    class="mt-3 ml-2 modalBtn"
                    @click="Change(item, index)"
                    variant="success"
                  >
                    <b-icon icon="calendar2-plus"></b-icon>
                    {{ $t("Сақлаш") }}
                  </b-button>
                </div>
              </b-modal>
            </div>
          </td>
          <td v-if="localUser.role != 'Shifokor'">
            <b-form-checkbox
              :class="{ kasallikT: $store.state.kasTar }"
              style="display: flex; width: 200px; font-size: 18px; font-weight: 600;"
              v-model="item.vazvrat"
              v-if="
                (localUser.role == 'Kasser' ||
                  localUser.role == 'Admin' ||
                  localUser.role == 'Registrator') &&
                  !classvazvrat
              "
              @change="Vazvrat(item)"
              :value="true"
              :unchecked-value="false"
            >
              Возврат
            </b-form-checkbox>
          </td>
          <td>
            <b-button
              v-if="backlog != 0 && !classvazvrat"
              :class="{ kasallikT: $store.state.kasTar }"
              style="width: 30px; height: 30px; display: flex; justify-content: center;"
              @click="delQoshimcha(item, index)"
              variant="outline-danger"
            >
              <b-icon style="width: 17px;" icon="trash"></b-icon>
            </b-button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  props: ["qoshimcha", "backlog", "indOta", "classvazvrat", "modalIdCom"],
  data() {
    return {
      localUser: JSON.parse(localStorage.getItem("user")),
      price: 0
    };
  },
  methods: {
    Vazvrat(item) {
      let x = "vazvrat";
      this.$emit("vazvratQoshimcha", item.price, item.vazvrat, x, this.indOta, item);
    },
    Change(item, index){
      this.$emit("delQosh", item.price, this.indOta, false);
      this.$emit("SummaChange", this.price, this.indOta, true);
      this.qoshimcha[index].price = this.price
      this.$bvModal.hide('modal-summa-change' + index + this.modalIdCom + this.indOta)
    },
    close(ind){
      this.price = 0
      this.$bvModal.hide('modal-summa-change' + ind + this.modalIdCom + this.indOta)
    },
    delQoshimcha(item, indQ) {
      let x = item.price;
      this.$emit("delQosh", x, this.indOta, false);
      // this.doctor[this.indOta].price -= x;
      // this.doctor[this.indOta].reg_doctor_category.splice(indQ, 1);
      this.qoshimcha.splice(indQ, 1);
    }
  }
};
</script>
<style>
.vazvrat {
  background: #ff00004a !important;
}
</style>
