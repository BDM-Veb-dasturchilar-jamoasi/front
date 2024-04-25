<template>
  <div>
    <b-tabs active-nav-item-class="font-weight-bold text-light bg-info">
    <!-- v-if="(localUser.role == 'Loborant' && localUser.id == itemT.user_id) || localUser.role != 'Loborant'" -->
      <b-tab
        v-for="(itemT, indT) in tekshiruvlar"
        :key="indT"
        :title="itemT.inspection.name"
        :class="{ kasallikT: $route.name == 'ArxivOne' }"
        title-link-class="mr-2 mt-1 text-light font-weight-bold bg-success"
        style="padding: 0px !important;"
      >
        <div class="tek-card">
          <div>
            <div class="tek-name-d" :class="{ vazvrat: itemT.vazvrat == true }">
              <div style="display: flex; justify-content: space-between;">
                <div
                  style="margin-left: 10px; display: flex; justify-content: space-between;"
                >
                  <div v-if="!itemT.shablon">
                    <b-form-checkbox
                      @change="PechatTek(itemT)"
                      :value="true"
                      :unchecked-value="false"
                    >
                    </b-form-checkbox>
                  </div>
                  <div v-if="!$store.state.kasTar">
                    <b-button
                      v-if="itemT.shablon"
                      :disabled="
                        !(
                          localUser.id == itemT.user_id ||
                          localUser.role == 'Admin'
                        )
                      "
                      :class="{ kasallikT: $store.state.kasTar }"
                      class="navbarBtnTashxis"
                      style="margin-right: 10px;"
                      v-b-modal="'modal-shablon' + indT + 'tek' + modalIdCom"
                      @click="getShablon"
                      variant="primary"
                    >
                      <b-icon icon="collection"></b-icon>
                    </b-button>
                    <b-modal
                      :id="'modal-shablon' + indT + 'tek' + modalIdCom"
                      size="lg"
                      :title="$t('Шаблонлар рўйхати')"
                      hide-footer
                    >
                      <Shablon
                        :indRegShif="indT"
                        :shabType="'tek'"
                        :modalIdCom="modalIdCom"
                        :itemsShablon="itemsShablon"
                        @ShablonGet="getShablon"
                        @RowClickedShab="RowClickedShab"
                      />
                    </b-modal>
                  </div>
                  <b-button
                    variant="primary"
                    @click="allPechat(itemT)"
                    class="navbarBtnTashxis"
                    style="margin-right: 10px;"
                  >
                    <b-icon icon="printer-fill"></b-icon>
                    Печать
                  </b-button>
                </div>
                <!-- <div class="tek-nomi-s">
                  {{ itemT.inspection.name }}
                </div> -->
                <div>
                  <v-select
                    class="Tekshiruvchi-index-user"
                    :disabled="itemT.user_id != localUser.id &&
                      localUser.role != 'Admin' &&
                      localUser.role != 'Registrator' &&
                      !itemT.shablon 
                    "
                    label="user_name"
                    :options="Tekshiruvchi"
                    :reduce="option => option.id"
                    v-model="itemT.user_id"
                  />
                </div>
                
                <div style="margin-left: 10px;">
                  <input
                      type="datetime-local"
                      class="input-datetime-local"
                      v-model="itemT.date_doctor"
                    >
                </div>
                  <span>ВРАЧ ID</span>
                  <br>
                  <v-select
                    style="width: 320px;"
                    class="Tekshiruvchi-index-user"
                    :filter="fuseSearch" id="naprovitel" :options="darect" :get-option-label="option => option.name"
                    :reduce="option => option.id" v-model="itemT.darect_id">
                    <template #option="{ name, direct_id }">
                      {{ name }}
                      <br />
                      <b>{{ direct_id }}</b>
                    </template>
                  </v-select>
                <div>
                  <b-form-checkbox
                    style="margin-left: 10px;"
                    :class="{ kasallikT: $store.state.kasTar }"
                    v-model="itemT.uppercase"
                    :value="true"
                    :unchecked-value="false"
                  >
                  ⬆️
                  </b-form-checkbox>
                </div>
              </div>
              <div style="display: flex;">
                <div
                  class="shif-price"
                  v-if="
                    localUser.role != 'Loborant' &&
                      localUser.role != 'Uzi ' &&
                      localUser.role != 'Shifokor'
                  "
                >
                  <div
                    style="width: 100px;"
                  >
                    {{ itemT.price | numFormat }}
                  </div>
                  <button
                    v-if="localUser.role == 'Admin'"
                    class="navbarBtnTashxis-summa navbarBtnTashxis"
                    v-b-modal="'modal-summa-change-tek' + indT + modalIdCom"
                    @click="price = itemT.price"
                  >
                    <b-icon
                      style="width: 15px;"
                      icon="pencil-fill"
                    ></b-icon>
                  </button>
                  <b-modal
                    :id="'modal-summa-change-tek' + indT + modalIdCom"
                    :title="itemT.name"
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
                        @click="close(indT)"
                      >
                        <b-icon icon="calendar2-x"></b-icon>
                        {{ $t("Бекор қилиш") }}
                      </b-button>
                      <b-button
                        class="mt-3 ml-2 modalBtn"
                        @click="Change(itemT, indT)"
                        variant="success"
                      >
                        <b-icon icon="calendar2-plus"></b-icon>
                        {{ $t("Сақлаш") }}
                      </b-button>
                    </div>
                  </b-modal>
                </div>
                <b-form-checkbox
                  style="display: flex; width: 100px;"
                  v-if="
                    localUser.role == 'Kasser' ||
                      localUser.role == 'Admin' ||
                      localUser.role == 'Registrator'
                  "
                  :class="{ kasallikT: $store.state.kasTar }"
                  v-model="itemT.vazvrat"
                  @change="Vazvrat(itemT, indT)"
                  :value="true"
                  :unchecked-value="false"
                >
                  Возврат
                </b-form-checkbox>
                <b-button
                  style="width: 30px; height: 30px; display: flex; justify-content: center;"
                  v-if="backlog != 0"
                  :class="{ kasallikT: $store.state.kasTar }"
                  @click="deleteTek(indT, itemT)"
                  variant="outline-danger"
                >
                  <b-icon style="width: 17px;" icon="trash"></b-icon>
                </b-button>
              </div>
            </div>
            <div v-if="!itemT.shablon">
              <table class="table table-sm table-bordered">
                <thead id="head">
                  <tr>
                    <th style="width: 40px;">№</th>
                    <!-- <th>Печать</th> -->
                    <th>Тип анализа</th>
                    <th>Результат</th>
                    <th>Норма</th>
                    <th v-if="itemT.type && localUser.role != 'Shifokor' && localUser.role != 'Loborant'">Сумма</th>
                    <th>Возврат</th>
                    <th v-if="itemT.type" style="width: 40px;"></th>
                  </tr>
                </thead>
                <tbody class="BayonotThead">
                  <tr
                    v-for="(item, index) in itemT.registration_inspection_child"
                    :key="index"
                    :class="{
                      vazvrat: item.vazvrat == true || itemT.vazvrat == true
                    }"
                  >
                    <td style="width: 40px;">{{ index + 1 }}</td>
                    <!-- <td>
                      <b-form-checkbox
                        @change="pechat(itemT, item)"
                        :value="true"
                        :unchecked-value="false"
                      >
                      </b-form-checkbox>
                    </td> -->
                    <td
                      style="font-size: 14px; text-align: start; padding-left: 5px !important;"
                    >
                      {{ item.name }}
                    </td>
                    <td
                      class="c-editor-edit"
                      style="width: 200px;"
                      :class="{ kasallikT: $store.state.kasTar }"
                    >
                      <b-form-textarea
                        v-if="item.vazvrat != true && itemT.vazvrat != true"
                        :id="'textarea-norm-rez' + indT + '_' + index"
                        :ref="'textareaRef' + indT + '_' + index"
                        @input="uziComplate(itemT, indT)"
                        
                        @keydown="keyUp($event, index, indT)"
                        v-model="item.text"
                      ></b-form-textarea>
                    </td>
                    <td
                      class="c-editor-edit"
                      style="width: 400px;"
                      :class="{ kasallikT: $store.state.kasTar }"
                    >
                      <b-form-textarea
                        v-if="item.vazvrat != true && itemT.vazvrat != true"
                        style="background: #fff;"
                        :disabled="true"
                        id="textarea-norm"
                        v-model="item.norm"
                      ></b-form-textarea>
                    </td>
                    <td v-if="itemT.type && localUser.role != 'Shifokor' && localUser.role != 'Loborant'" style="width: 150px;">
                      {{ item.price | numFormat }}
                    </td>
                    <td>
                      <div v-if="itemT.type">
                        <b-form-checkbox
                          style="display: flex; width: 120px;"
                          v-if="
                            localUser.role == 'Kasser' ||
                              localUser.role == 'Admin' ||
                              localUser.role == 'Registrator'
                          "
                          :class="{ kasallikT: $store.state.kasTar }"
                          v-model="item.vazvrat"
                          @change="Vazvrat(item, indT, index)"
                          :value="true"
                          :unchecked-value="false"
                        >
                          Возврат
                        </b-form-checkbox>
                      </div>
                    </td>
                    <td
                      v-if="itemT.type"
                      :class="{ kasallikT: $store.state.kasTar }"
                    >
                      <b-button
                        style="width: 30px; height: 30px; display: flex; justify-content: center;"
                        v-if="backlog != 0"
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
            <div v-else>
              <table class="table table-sm table-bordered">
                <thead id="head">
                  <tr>
                    <th>Результат</th>
                  </tr>
                </thead>
                <tbody class="BayonotThead">
                  <tr
                    v-for="(item, index) in itemT.registration_inspection_child"
                    :key="index"
                    :class="{
                      vazvrat: item.vazvrat == true || itemT.vazvrat == true
                    }"
                  >
                    <td
                      class="c-editor-edit"
                      :class="{ kasallikT: $store.state.kasTar }"
                    >
                      <div>
                        <VueEditorText 
                          :text="item.norm"
                          :indReg="indT"
                          :uppercase="itemT.uppercase"
                          :indexChild="index"
                          :defaultHeigth="defaultHeigth"
                          @vueEditorText="vueEditorText"
                          @textChangeValueIndex="textChangeValueIndex"
                        />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </b-tab>
    </b-tabs>
  </div>
</template>
<script>
import Shablon from "../Shifokor/Shablon.vue";
import VueEditorText from "../VueEditorText.vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Fuse from "fuse.js";
export default {
  props: ["tekshiruvlar", "backlog", "created_at", "modalIdCom", "PechatTekshiruv"],
  components: {
    Shablon,
    VueEditorText
  },
  data() {
    return {
      darect:[],
      editor: ClassicEditor,
      editorData: "<p>Content of the editor.</p>",
      editorConfig: {
        // The configuration of the editor.
      },
      localUser: JSON.parse(localStorage.getItem("user")),
      pechatTek: [],
      itemsShablon: [],
      Tekshiruvchi: [],
      price: 0,
      defaultHeigth: "height: 940px;",
      textChangeValue: {
          index: null,
          key: null,
      }
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
    keyUp($event, index, indP){
      if($event.code == 'NumpadEnter'){
        // const textarea = 'textareaRef' () + (index+1);
        const textareaElement = document.getElementById(`${'textarea-norm-rez' + indP + '_' + (index+1)}`);
        if (textareaElement) {
            textareaElement.focus();
            textareaElement.setSelectionRange(0, 0);
        }
        $event.preventDefault();
      }
    },
    vueEditorText(val, index, indexChild){
      this.tekshiruvlar[index].registration_inspection_child[indexChild].norm = val;
    },
    textChangeValueIndex(key, index){
      this.textChangeValue = {
          index: index,
          key: key,
      }
    },
    Vazvrat(item, indT, index) {
      let x = "vazvrat";
      if (index >= 0) {
        if (item.vazvrat == true) {
          this.tekshiruvlar[indT].price -= item.price;
        } else {
          this.tekshiruvlar[indT].price += item.price;
        }
      }
      this.$emit("delTek", item.price, item.vazvrat, x. item);
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
      let text = JSON.parse(this.tekshiruvlar[indRegShif].registration_inspection_child[0].norm.toString())

      if(this.textChangeValue.index == null){
        text[0].value += $events.text
        this.tekshiruvlar[indRegShif].registration_inspection_child[0].norm = JSON.stringify(text)
      } else {
        text[this.textChangeValue.index][`${this.textChangeValue.key}`] += $events.text 
        this.tekshiruvlar[indRegShif].registration_inspection_child[0].norm = JSON.stringify(text)
      }
      this.textChangeValue = {
        index: null,
        key: null,
      }
      
      // `<h4>${$events.text}</h4>`;
      this.$bvModal.hide(
        `${"modal-shablon" + indRegShif + "tek" + this.modalIdCom}`
      );
    },
    PechatTek(item){
      const indT = this.PechatTekshiruv.findIndex(
        el => el.id == item.id
      );
      if(indT == -1){
        this.PechatTekshiruv.push(item);
      } else {
        this.PechatTekshiruv.splice(indT, 1);
      }
    },
    pechat(itemT, item) {
      let child = [];
      child.push(item);
      const indT = this.pechatTek.findIndex(
        el => el.id == itemT.id
      );
      if (indT == -1) {
        this.pechatTek.push({
          id: itemT.id,
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
        bemorId: this.$store.state.bemor.id,
        name: this.$store.state.bemor.fullname,
        gender: this.$store.state.bemor.gender,
        birthday: this.$store.state.bemor.birthday,
        create_at: this.created_at,
        inspection: x
      };
      localStorage.setItem("Tekshiruvlar", JSON.stringify(t));
      // this.$router.push("/user");
      let pechatPath = ''
      if(!item.shablon){
        pechatPath = "/user-tekshiruv"
      } else {
        pechatPath = "/user-tekshiruv-shablon"
      }
      const i = this.$router.resolve({
        path: pechatPath
      });
      window.open(i.href, "_blank");
      this.pechatTek = [];
    },
    Change(item, index){
      this.$emit("delTek", item.price, false);
      this.$emit("SummaChange", this.price, true);
      this.tekshiruvlar[index].price = this.price
      this.$bvModal.hide('modal-summa-change-tek' + index + this.modalIdCom)
    },
    close(ind){
      this.price = 0
      this.$bvModal.hide('modal-summa-change-tek' + ind + this.modalIdCom)
    },
    getUserInspektion() {
      let self = this;
      axios({
        method: "get",
        url: "/user/all"
      }).then(res => {
        if (res) {
          res.data.data.forEach(element => {
            if (element.role == "Loborant" || element.role == "Uzi ") {
              self.Tekshiruvchi.push(element);
            }
          });
        }
      });
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
  mounted() {
    this.getUserInspektion();
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
.Tekshiruvchi-index-user {
  width: 300px;
}
.Tekshiruvchi-index-user .vs__selected-options span:first-child {
  width: 90% !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  white-space: nowrap !important;
}
.Tekshiruvchi-index-user .vs__selected-options {
  width: 90%;
}
.c-editor-edit .ql-editor p{
  /* font-size: 18px; */
  font-weight: 500;
}
.BayonotThead tr {
  padding: 0px;
}
.BayonotThead td {
  border: 1px solid #a1a1a1 !important;
  padding: 0px !important;
}
</style>
