<template>
  <div>
    <b-tabs active-nav-item-class="font-weight-bold text-light bg-info">
      <b-tab
        v-for="(itemT, indT) in tekshiruvlar"
        :key="indT"
        :title="itemT.inspection.name"
        title-link-class="mr-1 text-light font-weight-bold bg-success"
        style="padding: 0px !important;"
      >
        <div class="tek-card">
          <div>
            <div class="tek-name-d" :class="{ vazvrat: itemT.vazvrat == true }">
              <div style="display: flex;">
                <div class="tek-nomi-s">
                  {{ itemT.inspection.name }}
                </div>
                <div style="margin-left: 10px;">
                  <b-button
                    :disabled="
                      localUser.id != itemT.user_id || localUser.role == 'Admin'
                    "
                    :class="{ kasallikT: $store.state.kasTar }"
                    class="navbarBtnTashxis"
                    style="margin-right: 10px;"
                    v-b-modal="'modal-shablon' + indT + 'uzi' + modalId"
                    @click="getShablon"
                    variant="primary"
                  >
                    <b-icon icon="collection"></b-icon>
                  </b-button>

                  <b-modal
                    :id="'modal-shablon' + indT + 'uzi' + modalId"
                    size="lg"
                    :title="$t('Шаблонлар рўйхати')"
                    hide-footer
                  >
                    <Shablon
                      :indRegShif="indT"
                      :shabType="'uzi'"
                      :modalId="modalId"
                      :itemsShablon="itemsShablon"
                      @ShablonGet="getShablon"
                      @RowClickedShab="RowClickedShab"
                    />
                  </b-modal>
                  <b-button
                    variant="primary"
                    @click="allPechat(itemT)"
                    class="navbarBtnTashxis"
                  >
                    <b-icon icon="printer-fill"></b-icon>
                    Печать
                  </b-button>
                </div>
              </div>
              <div style="display: flex;">
                <div class="shif-price">
                  <div
                    style="width: 120px;"
                    v-if="
                      localUser.role != 'Loborant' &&
                        localUser.role != 'Uzi ' &&
                        localUser.role != 'Shifokor'
                    "
                  >
                    {{ itemT.price | numFormat }}
                  </div>
                </div>
                  <v-select
                    style="width: 320px;"
                    class="Tekshiruvchi-index-user"
                    :disabled="itemRegShif.doctor_id != localUser.doctor_id &&
                      localUser.role != 'Admin' &&
                      localUser.role != 'Registrator'
                    " 
                     @input="changeShifokor($event, indRegShif)"
                    :filter="fuseSearch" id="naprovitel" :options="darect" :get-option-label="option => option.name"
                    :reduce="option => option.id" v-model="itemRegShif.darect_id">
                    <template #option="{ name, direct_id }">
                      {{ name }}
                      <br />
                      <b>{{ direct_id }}</b>
                    </template>
                  </v-select>
                <b-form-checkbox
                  v-if="
                    localUser.role == 'Kasser' ||
                      localUser.role == 'Admin' ||
                      localUser.role == 'Registrator'
                  "
                  :class="{ kasallikT: $store.state.kasTar }"
                  style="display: flex; width: 200px;"
                  v-model="itemT.vazvrat"
                  @change="Vazvrat(itemT)"
                  :value="true"
                  :unchecked-value="false"
                >
                  Возврат
                </b-form-checkbox>
                <b-button
                  style="width: 30px; height: 30px; display: flex; justify-content: center;"
                  :class="{ kasallikT: $store.state.kasTar }"
                  v-if="backlog != 0"
                  @click="deleteTek(indT, itemT)"
                  variant="outline-danger"
                >
                  <b-icon style="width: 17px;" icon="trash"></b-icon>
                </b-button>
              </div>
            </div>
            <table class="table table-sm table-bordered">
              <thead id="head">
                <tr>
                  <th style="width: 40px;">Печать</th>
                  <th>Анализ</th>
                  <th v-if="itemT.type" style="width: 80px;">Возврат</th>
                  <th v-if="itemT.type" style="width: 40px;"></th>
                </tr>
              </thead>
              <tbody class="BayonotThead">
                <tr
                  v-for="(item, index) in itemT.registration_inspection_child"
                  :key="index"
                >
                  <td>
                    <b-form-checkbox
                      @change="pechat(itemT, item)"
                      :value="true"
                      :unchecked-value="false"
                    >
                    </b-form-checkbox>
                  </td>
                  <td
                    class="c-editor-edit"
                    :class="{ kasallikT: $store.state.kasTar }"
                  >
                    <vue-editor
                      :disabled="localUser.id != itemT.user_id"
                      v-if="item.vazvrat != true && itemT.vazvrat != true"
                      @text-change="uziComplate(itemT, indT)"
                      v-model="item.norm"
                    />
                  </td>
                  <td
                    v-if="itemT.type"
                    :class="{ kasallikT: $store.state.kasTar }"
                  >
                    <b-form-checkbox
                      v-if="
                        localUser.role == 'Kasser' ||
                          localUser.role == 'Admin' ||
                          localUser.role == 'Registrator'
                      "
                      style="display: flex; width: 80px;"
                      v-model="itemT.vazvrat"
                      @change="Vazvrat(itemT)"
                      :value="true"
                      :unchecked-value="false"
                    >
                      Возврат
                    </b-form-checkbox>
                  </td>
                  <td
                    v-if="itemT.type"
                    :class="{ kasallikT: $store.state.kasTar }"
                  >
                    <b-button
                      style="width: 30px; height: 30px; display: flex; justify-content: center;"
                      @click="deleteTekChil(indT, index, item)"
                      variant="outline-danger"
                    >
                      <b-icon style="width: 17px;" icon="trash"></b-icon>
                    </b-button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </b-tab>
    </b-tabs>
    <!-- {{ tekshiruvlar }} -->
  </div>
</template>
<script>
import Shablon from "../Shifokor/Shablon.vue";
import Fuse from "fuse.js";
export default {
  props: ["tekshiruvlar", "backlog", "created_at", "modalId"],
  components: {
    Shablon
  },
  data() {
    return {
      localUser: JSON.parse(localStorage.getItem("user")),
      pechatTek: [],
      itemsShablon: [],
      darect:[]
    };
  },
  methods: {
    deleteTek(ind, item) {
      this.$emit("delTek", item.price, false);
      this.tekshiruvlar.splice(ind, 1);
    },
    deleteTekChil(indT, index, item) {
      this.$emit("delTek", item.price, false);
      this.tekshiruvlar[indT].price -= item.price;
      if (this.tekshiruvlar[indT].registration_inspection_child.length == 1) {
        this.tekshiruvlar.splice(indT, 1);
      } else {
        this.tekshiruvlar[indT].registration_inspection_child.splice(index, 1);
      }
    },
    Vazvrat(item) {
      let x = "vazvrat";
      this.$emit("delTek", item.price, item.vazvrat, x);
    },
    pechat(itemT, item) {
      let child = [];
      child.push(item);
      const indT = this.pechatTek.findIndex(
        el => el.inspection_id == itemT.inspection_id
      );
      if (indT == -1) {
        this.pechatTek.push({
          inspection_id: itemT.inspection_id,
          category: itemT.category,
          inspection: itemT.inspection,
          type: itemT.type,
          uzi: itemT.uzi,
          user_id: itemT.user_id,
          shablon: itemT.shablon,
          registration_inspection_child: child
        });
      } else {
        const indChild = this.pechatTek[
          indT
        ].registration_inspection_child.findIndex(el => el.id == item.id);

        if (indChild == -1) {
          this.pechatTek[indT].registration_inspection_child.push(item);
        } else {
          if (this.pechatTek[indT].registration_inspection_child.length == 1) {
            this.pechatTek.splice(indT, 1);
          } else {
            this.pechatTek[indT].registration_inspection_child.splice(
              indChild,
              1
            );
          }
        }
      }
    },
    allPechat(item) {
      let t = [];
      let x = [];
      if (this.pechatTek.length == 0) {
        x.push(item);
      } else {
        x = this.pechatTek;
      }
      t = {
        name: this.$store.state.bemor.fullname,
        gender: this.$store.state.bemor.gender,
        birthday: this.$store.state.bemor.birthday,
        create_at: this.created_at,
        inspection: x
      };
      localStorage.setItem("Tekshiruvlar", JSON.stringify(t));
      // this.$router.push("/user");
      const i = this.$router.resolve({
        path: "/user-tekshiruv"
      });
      window.open(i.href, "_blank");
      this.pechatTek = [];
    },
    getShablon() {
      let self = this;
      axios({
        method: "post",
        url: "/shablon_doctor/shablonOne",
        data: { doctor_id: self.localUser.id }
      }).then(res => {
        if (res) {
          self.itemsShablon = res.data.data;
        }
      });
    },
    RowClickedShab($events, indRegShif) {
      this.tekshiruvlar[indRegShif].registration_inspection_child[0].norm +=
        $events.text;
      // `<h4>${$events.text}</h4>`;
      this.$bvModal.hide(
        `${"modal-shablon" + indRegShif + "uzi" + this.modalId}`
      );
    },
    uziComplate(item, indT) {
      this.tekshiruvlar[indT].status = "complate";
    },
    getDarect() {
      let self = this;
      axios({
        method: "get",
        url: "/direct/all"
      }).then(res => {
        if (res) {
          self.darect = res.data.data
        }
      });
    },
    fuseSearch(options, search) {
      const fuse = new Fuse(options, {
        keys: ["name", "direct_id"],
        shouldSort: true
      });
      return search.length
        ? fuse.search(search).map(({ item }) => item)
        : fuse.list;
    },
  },
  mounted(){
    this.getDarect()
  }
};
</script>
<style>
.vazvrat {
  background: #ff00004a !important;
}
.tek-name-d {
  display: flex;
  justify-content: space-between;
  width: 100%;
  background: rgba(7, 100, 172, 0.058);
  border-radius: 10px;
  padding: 7px;
  margin-bottom: 10px;
  border: 1px solid rgb(70, 112, 250);
}
.tek-nomi-s {
  font-size: 20px;
  font-weight: 600;
  display: flex;
  /* justify-content: center; */
  color: rgb(70, 112, 250);
}
.BayonotThead {
  background: #fff !important;
  color: black !important;
  text-align: center;
  border: 1px solid #a1a1a1 !important;
}
.BayonotThead td {
  border: 1px solid #a1a1a1 !important;
}
/* .c-editor-edit .ck-sticky-panel__content {
    display: none;
  } */
.BayonotThead tr {
  padding: 0px;
}
.BayonotThead td {
  border: 1px solid #a1a1a1 !important;
  padding: 0px !important;
}
</style>
