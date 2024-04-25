<template>
  <div>
    <div class="katta">
      <span>{{ $t("Текширув") }}</span>
      <button style="padding: 4px 10px; margin-right: 10px" class="btn" @click="Prev()">
        <b-icon style="color: white" icon="house-door-fill"> </b-icon>
      </button>
    </div>
    <div class="oyna">
      <div class="inputlar">
        <div class="ustun">
          <div>
            <!-- {{ modelvue }} -->
            <span>
              <span class="shirift1">{{ $t("Номи") }}</span>
              <span style="color: red;">*</span>
              <span v-if="errors !== null">
                <span style="color: red; font-size: 9px" v-if="!errors.name.required">{{ $t("Номи тўлдирилиши керак")
                }}</span>
                <span style="color: red; font-size: 9px" v-if="!errors.name.minLength">{{ $t("Номида камида 3 та белги
                                  бўлиши керак") }}</span>
              </span>
            </span>
            <b-input id="tekshiruvlar-name" style="background: #fff; border: 1px solid #ced4da;" v-model="modelvue.name"
              type="text" />
          </div>

          <div>
            <span>
              <span class="shirift1">{{ $t("Фуқаролик нарҳ") }}</span>
            </span>
            <vue-numeric :disabled="modelvue.type || localUser.role == 'Loborant'"
              style="width: 100%; height: 35px; border: 1px solid #bdb2b2; border-radius: 5px;" v-model="modelvue.price"
              separator="space" :precision="2"></vue-numeric>
          </div>
          <div >
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
          <!-- <div>
            <span>
              <span class="shirift1">{{ $t("Фуқаролиги бўлмаган нарҳ") }}</span>
            </span>
            <vue-numeric
              :disabled="modelvue.type || localUser.role == 'Loborant'"
              style="width: 100%; height: 35px; border: 1px solid #bdb2b2; border-radius: 5px;"
              v-model="modelvue.citizen_price"
              separator="space"
              :precision="2"
            ></vue-numeric>
          </div> -->
        </div>
        <div class="ustun">
          <div class="">
            <span>
              <span class="shirift1">{{ $t("Бўлим номи") }}</span>

              <span style="color: red;">*</span>
              <span v-if="errors !== null">
                <span style="color: red; font-size: 9px" v-if="!errors.category_id.required">{{ $t("Бўлим номи тўлдирилиши
                                  керак") }}</span>
              </span>
            </span>
            <v-select style="height: 40px" :options="category" label="name" :reduce="option => option.id"
              v-model="modelvue.category_id" />
          </div>

          <div class="">
            <span>
              <span class="shirift1">Ходим</span>
              <span style="color: red;">*</span>
              <span v-if="errors !== null">
                <span style="color: red; font-size: 9px" v-if="!errors.user_id.required">{{ $t("Ходим тўлдирилиши керак")
                }}</span>
              </span>
            </span>
            <v-select label="user_name" :options="hodim" :reduce="option => option.id" v-model="modelvue.user_id" />
          </div>
          <div style="display: flex; justify-content: space-between;">
            <!-- <div style="width: 60%;" class=" mb-3">
              <label></label>
              <b-form-checkbox
                v-model="modelvue.uzi"
                :value="true"
                :unchecked-value="false"
                class="shirift1"
              >
                {{ $t("Узи") }}
              </b-form-checkbox>
            </div> -->
            <div class=" mb-3">
              <label></label>
              <b-form-checkbox id="checkbox-1" v-model="modelvue.type" :value="true" :unchecked-value="false"
                class="shirift1">
                {{ $t("Кўрсатиш") }}
              </b-form-checkbox>
            </div>
            <div>
              <label></label>
              <b-form-checkbox id="check" v-model="modelvue.shablon" :value="true" :unchecked-value="false"
                class="shirift1">
                {{ $t("Шаблонли") }}
              </b-form-checkbox>
            </div>
          </div>
        </div>
      </div>
      <div class="scrol">
        <table class="table table-sm table-bordered">
          <thead v-if="!modelvue.shablon">
            <tr>
              <th>№</th>
              <th>{{ $t("Номи") }}</th>
              <th style="width: 250px;">{{ $t("Фуқаролик нарҳ") }}</th>
              <th style="width: 250px;">{{ $t("Фуқаролиги бўлмаган нарҳ") }}</th>
              <th>{{ $t("Натижа") }}</th>
              <th style="width: 50px"></th>
            </tr>
          </thead>
          <thead v-else>
            <th>{{ $t("Натижа") }}</th>
            <th style="width: 50px"></th>
          </thead>

          <tbody v-if="!modelvue.shablon">
            <tr v-for="(item, index) in modelvue.inspectionChild" :key="index">
              <td style="width: 80px;">
                <b-input type="number" v-model="item.index"></b-input>
              </td>
              <td><b-input type="text" v-model="item.name"></b-input></td>
              <td>
                <vue-numeric style="width: 100%; height: 35px; border: 1px solid #bdb2b2; border-radius: 5px;"
                  v-model="item.price" :disabled="!modelvue.type || localUser.role == 'Loborant'" separator="space"
                  :precision="2"></vue-numeric>
              </td>
              <td>
                <vue-numeric style="width: 100%; height: 35px; border: 1px solid #bdb2b2; border-radius: 5px;"
                  v-model="item.citizen_price" :disabled="!modelvue.type || localUser.role == 'Loborant'"
                  separator="space" :precision="2"></vue-numeric>
              </td>
              <td>
                <!-- <b-input type="text" v-model="item.norm"></b-input> -->
                <b-form-textarea style="background: #fff;" id="textarea-norm" v-model="item.norm"></b-form-textarea>
              </td>
              <td>
                <b-button class="trash1" style="" variant="outline-danger" @click="daleteSubrow(index)">
                  <b-icon style="width: 15px;" icon="trash-fill" aria-hidden="true"></b-icon>
                </b-button>
              </td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr v-for="(item, index) in modelvue.inspectionChild" :key="index">
              <td>
                <vue-editor style="z-index: 3;" v-model="item.norm" />
              </td>
              <td>
                <b-button class="trash1" style="" variant="outline-danger" @click="daleteSubrow(index)">
                  <b-icon style="width: 15px;" icon="trash-fill" aria-hidden="true"></b-icon>
                </b-button>
              </td>
            </tr>
          </tbody>
        </table>
        <b-button class="qoshish_Btn" variant="primary" type="number" @click="add"><b-icon icon="plus" font-scale="2"
            color="#fff"></b-icon></b-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
export default {
  name: "tekshiruvlar-form",
  props: ["modelvue", "errors"],
  data() {
    return {
      category: [],
      hodim: [],
      filial: [],
      editor: ClassicEditor,
      editorData: "<p>Content of the editor.</p>",
      editorConfig: {
        // The configuration of the editor.
      },
      selectedFile: null,
      localUser: JSON.parse(localStorage.getItem("user")),
      inspect: {}
    };
  },
  methods: {
    add() {
      let x = this.modelvue.inspectionChild.length + 1
      this.modelvue.inspectionChild.push({
        price: 0,
        citizen_price: 0,
        file: "",
        name: "",
        norm: "",
        index: x
      });
    },
    daleteSubrow(index) {
      // this.modelvue.price -= this.modelvue.inspectionChild[index].price;
      this.modelvue.inspectionChild.splice(index, 1);
    },
    getCategory() {
      let filial = localStorage.getItem("filial_id");
      axios({
        method: "get",
        url: `/inspector_category/all/` + JSON.parse(localStorage.getItem("user")).filial_id
      }).then(res => {
        this.category = res.data.data;
      });
    },
    Prev() {
      this.$router.push("/tekshiruvlar");
    },
    getUser() {
      let filial = localStorage.getItem("filial_id");
      axios({
        method: "get",
        url: `/user/all?filial_id=${filial}`
      }).then(res => {
        for (let index = 0; index < res.data.data.length; index++) {
          const element = res.data.data[index];
          if (element.role == "Loborant" || element.role == "Uzi ") {
            this.hodim.push(element);
          }
        }
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
    this.getUser();
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

.oyna {
  margin: 10px 0;
  padding: 0 10px;
  position: relative;
}

.inputlar {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.ustun {
  width: 49%;
}

.shirift1 {
  font-size: 16px;
  font-weight: 400;
}

/* .scrol{
  overflow: auto;
  height: calc(100vh - 460px);
} */
.qoshish_Btn {
  position: absolute;
  right: 13px;
  bottom: -50px;
  /* left: 990px; */
  background: #195fb0;
  /* margin-top: 5px; */
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  border-radius: 50%;
  border: 1px solid #195fb0;
  box-shadow: 5px 8px 16px rgba(25, 95, 176, 0.5);
}

.trash1 {
  background: #fff;
  width: 35px;
  height: 35px;
  display: flex;
  border: 1px solid #fadddd;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
}
</style>
