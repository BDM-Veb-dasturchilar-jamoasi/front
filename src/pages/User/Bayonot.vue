<template>
  <div class="Bayonot">
    <div v-for="itemsh in data.doctor">
      <div id="my-node">
        <div>
          <PechatLogo />
        </div>
        <div class="BayonotChild">
          <div style="width: 100%;">
            <PechatBemorData 
              :datas="data"
              :date="itemsh.date_doctor"
              :name="itemsh.reg_doctor_category[0].name"
              :doctor_name="itemsh.doctor.name"
              />
          </div>
        </div>
        <div>
          <div>
            <div class="ins-name"> 
              <div
                class="vueTextEditor"
                v-for="(itemText, indText) in JSON.parse(itemsh.text)"
                :key="indText"
                :style="indText ? 'padding-top: 30px;' : ''"
              >
                <div>
                  <vue-editor
                    :style="indText ? 'height: 1250px; width: 917px;' : 'height: 940px; width: 917px;'"
                    v-model="itemText[`${itemText.key}`]"
                    :editor-toolbar="customToolbar"
                  />
                </div>
                <!-- <div>
                  <PechatFooter />
                </div> -->
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import PechatLogo from "./Components/PechatLogo.vue"
import PechatBemorData from "./Components/PechatBemorData.vue";
// import PechatFooter from "./Components/PechatFooter.vue"
export default {
  name: "Print",
  components:{
    PechatLogo,
    PechatBemorData,
    // PechatFooter
  },
  data() {
    return {
      data: {},
      datasort: {},
      Dorilar: []
      // weekdays: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
    };
  },
  
  created: function() {
    this.data = JSON.parse(localStorage.getItem("Bayonot"));
  },
  methods: {
    
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

<style lang="scss">

.jadval{
  font-size: 20px;
  display: flex;
  justify-content: space-between;
}
.BayonotChild {
  margin-top: 20px;
  width: 100%;
  /* border: none !important; */
}
.vue-editor-text{
  /* width: 960px; */
}
.vueTextEditor {
  page-break-inside: avoid;
}
.vueTextEditor .quillWrapper {
  border: none !important;
}
.vueTextEditor .quillWrapper #quill-container {
  /* font-size: 18px !important; */
  border: none !important;
}
.vueTextEditor .ql-toolbar {
  display: none;
}
.vueTextEditor .quillWrapper #quill-container .ql-editor{
  min-height: 50px !important;
}
.vueTextEditorUp .ql-editor {
    text-transform: uppercase;
    font-family: 'Times New Roman', Times, serif !important;
    // color: red;
    p{
        // font-size: 16px;
        // text-transform: uppercase;
    }
    strong {
        font-weight: 700 !important;
    }
    u{
      font-weight: 700 !important;
    }
    h1, h2, h3, h4, h5, h6 {
        text-transform: uppercase;
        font-family: 'Times New Roman', Times, serif !important;
        color: #000;
        // font-size: 20px;
        font-weight: 400;
    }
    h1{
        font-size: 20px;
    }
    h2{
        font-size: 18px;
    }
    h3{
        font-size: 16px;
    }
    h4{
        font-size: 12px;
    }
    h5{
        font-size: 10px;
    }
    h6{
        font-size: 8px;
    }
}
.ql-editor{
  color: #000;
}
.ql-editor p{
  /* font-size: 18px; */
}
.ins-name {
  /* page-break-inside: avoid; */
  /* list-style: none; */
  padding: 0;
  margin: 10px 0px;
  /* border: 4px solid red; */
}
.Bayonot {
  width: 959px;
  padding: 20px;
  margin: 0px auto;
}
#my-node{
  /* page-break-inside: unset; */
  list-style: none;
  page-break-after: always;
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
</style>
