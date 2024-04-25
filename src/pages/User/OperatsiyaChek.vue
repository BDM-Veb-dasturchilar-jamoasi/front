<template>
  <div class="Bayonot">
    <div>
      <div
        v-for="itemsh in data.doctor"
      >
        <div class="data-loop">
          <div>
            <div>
              <div>
                <div 
                  class="data-loop"
                  v-if="!data.key || data.key == 'before_sur_text' "
                >
                  <div>
                    <PechatLogo />
                  </div>
                  <div class="BayonotChild">
                    <div style="width: 100%;">
                      <PechatBemorData 
                        :datas="data"
                        :date="itemsh.date_doctor"
                      />
                    </div>
                  </div>
                    <h3 class="ShifokorTek">{{ itemsh.name }}</h3>
                  <div
                    v-for="(itemText, indexTek) in JSON.parse(itemsh.before_sur_text)"
                    :key="indexTek"
                    class="data-loop"
                  >
                    <div class="tashxis-style uzi-shablon-pech">
                      <vue-editor
                        :style="indexTek ? 'padding-top: 30px;' : ''"
                        v-model="itemText[`${itemText.key}`]"
                      />
                    </div>
                    <div style="display: flex; justify-content: space-between;">
                      <div style="display: flex; margin-left: 20px; font-size: 18px; font-weight: 500;">
                        <b>Шифокор: </b> 
                        <!-- <div>{{ itemsh }}</div> -->
                      </div>
                      <div style="display: flex;">
                        <b></b> <div style="border-bottom: 1px solid #000; width: 120px; margin-right: 40px;"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div 
                  class="data-loop"
                  v-if="!data.key || data.key == 'text'"
                >
                  <div>
                    <PechatLogo />
                  </div>
                  <div class="BayonotChild">
                    <div style="width: 100%;">
                      <PechatBemorData 
                        :datas="data"
                        :date="data.create_at"
                      />
                    </div>
                  </div>
                  <h3 class="ShifokorTek">{{ itemsh.name }}</h3>
                  <div
                    v-for="(itemText, indexTek) in JSON.parse(itemsh.text)"
                    :key="indexTek"
                    class="data-loop"
                  >
                    <div class="tashxis-style uzi-shablon-pech">
                      <vue-editor
                        :style="indexTek ? 'padding-top: 30px;' : ''"
                        v-model="itemText[`${itemText.key}`]"
                      />
                    </div>
                    <div style="display: flex; justify-content: space-between;">
                      <div style="display: flex; margin-left: 20px; font-size: 18px; font-weight: 500;">
                        <b>Шифокор: </b> 
                        <!-- <div>{{ itemsh }}</div> -->
                      </div>
                      <div style="display: flex;">
                        <b></b> <div style="border-bottom: 1px solid #000; width: 120px; margin-right: 40px;"></div>
                      </div>
                    </div>
                  </div>
                </div>


                <div 
                  class="data-loop"
                  v-if="!data.key || data.key == 'after_sur_text'"
                >
                  <div>
                    <PechatLogo />
                  </div>
                  <div class="BayonotChild">
                    <div style="width: 100%;">
                      <PechatBemorData 
                        :datas="data"
                        :date="data.create_at"
                      />
                    </div>
                  </div>
                  <h3 class="ShifokorTek">{{ itemsh.name }}</h3>
                  <div
                    v-for="(itemText, indexTek) in JSON.parse(itemsh.after_sur_text)"
                    :key="indexTek"
                    class="data-loop"
                  >
                    <div class="tashxis-style uzi-shablon-pech">
                      <vue-editor
                        :style="indexTek ? 'padding-top: 30px;' : ''"
                        v-model="itemText[`${itemText.key}`]"
                      />
                    </div>
                    <div style="display: flex; justify-content: space-between;">
                      <div style="display: flex; margin-left: 20px; font-size: 18px; font-weight: 500;">
                        <b>Шифокор: </b> 
                        <!-- <div>{{ itemsh }}</div> -->
                      </div>
                      <div style="display: flex;">
                        <b></b> <div style="border-bottom: 1px solid #000; width: 120px; margin-right: 40px;"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- <div v-if="itemsh" class="jadval">
              <b>Шифокор: {{ itemsh }}</b>
            </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import PechatLogo from "./Components/PechatLogo.vue";
import PechatBemorData from "./Components/PechatBemorData.vue";
export default {
  name: "Print",
  components: {
    PechatLogo,
    PechatBemorData
  },
  data() {
    return {
      data: {},
      Dorilar: []
      // weekdays: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
    };
  },
  created: function() {
    this.data = JSON.parse(localStorage.getItem("Bayonot"));
  },
  methods: {
    remove(text) {
      return text.replace(/(<([^>]+)>)/gi, " ");
    },
    yoshniAniqlash(tugilganRaqam) {
      var joriyYil = new Date().getFullYear();
      var tugilganYil = parseInt(tugilganRaqam.toString().substr(0, 4));
      var yosh = joriyYil - tugilganYil;
      return yosh;
    }
  },
  mounted() {
    localStorage.removeItem("Bayonot");
    window.print();
    setTimeout(() => {
      this.$router.push({ path: "/user" });
      window.close();
    }, 3000);
  }
};
</script>

<style>
.jadval{
  font-size: 20px;
}
.data-loop{
  /* page-break-inside: initial; */
  list-style: none;
  page-break-after: always;
  padding-top: 10px;
}
.BayonotChild {
  margin-top: 20px;
  width: 100%;
  /* border: none !important; */
}
.uzi-shablon-pech .quillWrapper {
  border: none !important;
}
.uzi-shablon-pech .quillWrapper #quill-container {
  font-size: 18px !important;
  border: none !important;
}
.ql-editor p{
  font-size: 18px !important;
  color: #000;
}
.uzi-shablon-pech .ql-toolbar {
  display: none;
}
.ins-name {
  page-break-inside: avoid;
  list-style: none;
  padding: 0;
  margin: 10px 0px;
  /* border: 4px solid red; */
}
.Bayonot {
  width: 94%;
  margin: 0px auto;
  padding: 20px;
  margin: 0px auto;
}
.ShifokorTek {
  display: flex;
  margin-top: 10px;
  justify-content: center;
  text-align: center;
}
.logo-matn {
  position: relative;
  height: 150px;
  width: 300px;
  /* border: 1px solid red; */
}
.logo-info {
  position: absolute;
  bottom: 0px;
  display: flex;
  font-size: 16px;
  font-weight: 700;
}
.BayonotTable tr {
  text-align: center;
  margin-top: 10px;
}
.BayonotTable th {
  background: #fff;
}
.BayonotTheads {
  background: #fff !important;
  color: black !important;
  text-align: center;
}
</style>
