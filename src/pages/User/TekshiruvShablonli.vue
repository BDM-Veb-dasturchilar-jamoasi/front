<template>
  <div class="Tekshiruv">
    <div
      v-for="(itemP, indexTek) in datas.inspection"
      :key="indexTek"
      class="inspec-loop"
    >

      <div>
        <div>
          <PechatLogo />
        </div>
      </div>

      <div class="BayonotChild">
        <div style="width: 100%;">
            <PechatBemorData 
              :datas="datas"
              :date="itemP.date_doctor"
              :name="itemP.inspection.name"
              :bolim="itemP.category.name"
              :doctor_name="itemP.inspection.User.user_name"
            />
          </div>
      </div>
      <!-- <div class="inpec-name-style">
        <div>
        </div>
      </div> -->
      <div
        class="vueTextEditorT"
        :class="{vueTextEditor: itemP.uppercase, vueTextEditorUp: itemP.uppercase}"
        v-for="(itemCh, indCh) in itemP.registration_inspection_child"
        :key="indCh"
      >
        <div
          v-for="(itemText, indText) in JSON.parse(itemCh.norm)"
          :key="indText"
          class="text-page"
          :style="indText ? 'padding-top: 20px;' : ''"
        >
        <!-- <div class="bg-image">
          <img src="../../../public/logo_doctor_o.svg" alt="">
        </div> -->
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
</template>

<script>
import PechatLogo from "./Components/PechatLogo.vue";
import PechatBemorData from "./Components/PechatBemorData.vue";
// import PechatFooter from "./Components/PechatFooter.vue"
export default {
  components: {
    PechatLogo,
    PechatBemorData,
    // PechatFooter
  },
  data() {
    return {
      datas: {},
      customToolbar: [
        // [],
        // ["bold", "italic", "underline"],
        // [{ list: "ordered" }, { list: "bullet" }],
        // ["image", "code-block"]
      ],
    };
  },
  created() {
    this.datas = JSON.parse(localStorage.getItem("Tekshiruvlar"));
  },
  methods: {
    
  },
  mounted() {
    window.print()
    setTimeout(() => {
      localStorage.removeItem("Tekshiruvlar");
      window.close();
      this.$router.push({ path: "/user" });
    }, 3000);
  }
};
</script>

<style scope lang="scss">
.vueTextEditorT .quillWrapper {
  border: none !important;
}
.vueTextEditorT .quillWrapper #quill-container {
  /* font-size: 18px !important; */
  border: none !important;
}
.vueTextEditorT .ql-toolbar {
  display: none;
}
.ql-editor{
  color: #000;
}
.vueTextEditorUp .ql-editor {
    text-transform: uppercase;
    font-family: 'Times New Roman', Times, serif !important;
    // color: red;
    p{
        // // font-size: 16px;
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
.vueTextEditor .ql-editor {
    // text-transform: uppercase;
    font-family: 'Times New Roman', Times, serif !important;
    // color: #000;
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
        // text-transform: uppercase;
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
.bg-image{
  /* width: 100%; */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 100%;
  border: 1px solid red;
  position: absolute;
  /* background-size: contain; */
  
}
.Tekshiruv {
  padding: 20px;
  width: 959px;
  margin: 0px auto;
  /* background-image: url(../../../public/dovtor_o_logo.png); */
  /* background-size: cover; */
  /* border: 5px double #000; */
  /* margin: 10px; */
  /* display: flex;
  flex-wrap: wrap; */
}
.BayonotChild {
  display: flex;
  margin-top: 15px;
  /* border: none !important; */
}
.inspec-loop{
  page-break-after: always;
  list-style: none;
  margin: 0px auto;
  // padding-top: 20px;
}
.inpec-name-style{
  font-size: 20px;
  font-weight: 700;
  color: #000;
  text-align: center;
}
.text-page{
  page-break-inside: avoid;
  list-style: none;
  position: relative;
}

</style>
