<template>
    <div>
        <div class="Bayonot">
            <!-- {{ datas.doctor_id }} -->
            <div
                class="vueTextEditor"
                v-for="(itemText, indText) in JSON.parse(datas.statsionar_text)"
                :key="indText"
                :style="indText ? 'padding-top: 30px;' : ''"
              >
                <div>
                  <vue-editor
                    class="vueTextEditor-e"
                    :style="'height: 1250px; width: 917px;'"
                    v-model="itemText[`${itemText.key}`]"
                    :editor-toolbar="customToolbar"
                  />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            datas: {}
        }
    },
    created(){
        this.datas = { ... JSON.parse(localStorage.getItem("StatsionarPechat"))}
        // console.log(this.datas)
        this.print()
    },
    methods:{
        print(){
            setTimeout(() => {
                window.print()
                localStorage.removeItem("StatsionarPechat")
                // this.$router.push({ path: "/user" });
                setTimeout(() => {
                    window.close()
                }, 1000)
            }, 1000)
        }
    }
}
</script>
<style>
.Bayonot {
  width: 960px;
  padding: 19px;
  margin: 0px auto;
  /* border: 1px solid #000; */
}
.vueTextEditor{
    page-break-after: always;
    list-style: none;
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
</style>