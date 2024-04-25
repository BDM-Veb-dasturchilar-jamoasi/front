<template>
  <div class="Tekshiruv">
    <div
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
            :date="datas.inspection[0].date_doctor"
            :bolim="'Лаборатория'"
            :doctor_name="datas.inspection[0].inspection.User.user_name"
            />
        </div>
          <!-- {{ datas.inspection }} -->
      </div>
      <div>
        <div
          v-for="(itemP, indexTek) in datas.inspection"
          :key="indexTek"
          style="margin-top: -20px;"
        >
          <div :class="{ tableStyle: indexTek, tableStyleI: !indexTek }">

            <div class="inspec-table" :style="indexTek ? 'padding-top: 20px;' : ''">
              <div class="inspec-name"><b style="font-size: 13px;">{{ itemP.inspection.name }}</b></div>
            </div>
        
            <table
              class="table table-sm table-bordered"
            >
                <thead id="head">
                  <tr style=" max-height: 10px;">
                    <!-- <th style="width: 40px;">№</th> -->
                    <th style="font-size: 12px; width: 450px; max-height: 10px;">Тип анализа</th>
                    <th style="font-size: 12px; max-height: 10px;">Результат</th>
                    <th style="font-size: 12px; width: 250px; max-height: 10px;">
                      Норма
                    </th>
                  </tr>
                </thead>

                <tbody class="BayonotThead">
                  <tr
                    v-for="(item, index) in itemP.registration_inspection_child"
                    :key="index"
                    style="max-height: 8px;"
                  >
                    <td style="text-align: start; font-size: 12px;">
                      {{ item.name }}
                    </td>
                    <td style="text-align: start; font-size: 12px;">
                      {{ item.text }}
                    </td>
                    <td style="text-align: start; font-size: 12px;">
                      <div class="multiline-text">{{ item.norm }}</div>
                    </td>
                  </tr>
                </tbody>
            </table>
          </div>
        </div>
        <!-- <div>
          <PechatFooter />
        </div> -->
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
    // localStorage.removeItem("Tekshiruvlar");
    // setTimeout(() => {
      this.filterText()
    // }, 2000)
  },
  methods: {
    filterText() {
      let x = this.datas;
      let ins = [];
      let child = [];
      for (let index = 0; index < x.inspection.length; index++) {
        const element = x.inspection[index];
        child = [];
        if (!element.shablon) {
          for (
            let i = 0;
            i < element.registration_inspection_child.length;
            i++
          ) {
            const el = element.registration_inspection_child[i];
            if (el.text) {
              
              child.push(el);
              // x.inspection[index].registration_inspection_child.push(el);
            }
          }
          x.inspection[index].registration_inspection_child = child;
        }
      }
      this.datas = x;
      setTimeout(() =>{
        window.print();
      }, 1000)
    }
    
  },
  mounted() {
    setTimeout(() => {
      localStorage.removeItem("Tekshiruvlar");
      window.close();
      // this.$router.push({ path: "/user" });
    }, 3000);
  }
};
</script>

<style scope>
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
.tableStyle{
  page-break-inside: avoid;
  list-style: none;
}
.tableStyleI{
  list-style: none;
}
#head th{
  background: #d6d5d5 !important;
  color: #000 !important;
  border: 1px solid #000 !important;
}
.BayonotThead td{
  border: 1px solid #000 !important;
  color: #000 !important;
  font-size: 16px;
  font-weight: 500;
}
.multiline-text {
  white-space: pre-line;
}
.inspec-table{
  width: 100%;
  display: flex;
}
.inspec-name{
  margin: 5px auto;
  font-size: 18px;
  color: #000;
}
.textEdirorSh{
  margin-top: 20px;
  padding-top: 40px;
  padding: 10px;
  border: 1px solid #000;
}
.textEdirorShI{
  /* padding-top: 40px; */
  padding: 10px;
  border: 1px solid #000;
}
.Tekshiruv {
  /* padding: 40px; */
  width: 100%;
  /* background-image: url(../../../public/dovtor_o_logo.png); */
  /* background-size: cover; */
  /* border: 5px double #000; */
  /* margin: 10px; */
  /* display: flex;
  flex-wrap: wrap; */
}
.BayonotChild {
  display: flex;
  margin-top: 20px;
  /* border: none !important; */
}
.inspec-loop{
  
  width: 917px;
  margin: 0px auto;
  padding-top: 20px;
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
