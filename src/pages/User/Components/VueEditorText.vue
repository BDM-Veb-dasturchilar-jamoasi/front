<template>
    <div style="position: relative; height: 1070px; overflow-y: auto;">
        <div
            v-for="(item, index) in vueText"
            :key="index"
            class="text-control"
            :style="index == 0 ? defaultHeigth : 'height: 1320px;'"
        >
            <div style="position: relative; width: 985px; margin: 0px auto;">
                <div>
                    <vue-editor
                        :ref="'vueTextEditor' + index"
                        :class="{vueTextEditor: !textTransform, vueTextEditorUp: textTransform}"
                        :editorToolbar="customToolbar"
                        :id="'text' + index"
                        :disabled="disabled"
                        :style="index == 0 ? defaultHeigth : 'height: 1220px;'"
                        v-model="item[`${item.key}`]"
                        @selection-change="changeEdiror(item, index)"
                        @input="ShifokorText(item, index)"
                    />
                </div>
                <div>
                    <!-- <b-button
                        :class="{ btnArrow: index, btnArrowIndex: !index }"
                        variant="primary"
                        type="number"
                        @click="ArrowClick"
                    >
                        <b-icon
                          style="width: 15px;"
                          icon="arrow90deg-right"
                          aria-hidden="true"
                        ></b-icon>
                    </b-button> -->
                    <b-button
                        v-if="index && !disabled"
                        class="trash-text"
                        variant="outline-danger"
                        type="number"
                        @click="deleteText(index)"
                    >
                        <b-icon
                          style="width: 15px;"
                          icon="trash-fill"
                          aria-hidden="true"
                        ></b-icon>
                    </b-button>
                    <b-button
                        v-if="(vueText.length - 1) == index && !disabled"
                        class="qoshish-btn-text"
                        variant="primary"
                        type="number"
                        @click="add"
                    >
                        <b-icon icon="plus" font-scale="2" color="#fff"></b-icon
                    ></b-button>
                </div>
            </div>
        </div>
        <!-- {{ vueText }} -->
    </div>
</template>

<script>
import 'quill/dist/quill.snow.css'; 
export default {
    props: [
        "text",
        "indReg",
        "indexChild",
        "defaultHeigth",
        "textValue",
        "dataType",
        "disabled",
        "uppercase"
    ],
    data(){
        return {
            vueText: [],
            textHeigth: "height: 1220px;",
            selectedWords: '',
            textChangeValue: {
                index: null,
                key: null,
            },
            textTransform: false,
            customToolbar: [
                [{ header: [false, 1, 2, 3, 4, 5, 6] }],
                ["bold", "italic", "underline", "strike"],
                [{ font: [] }],
                // [{ size: ["small", false, "large", "huge"] }],
                [
                    { align: "" },
                    { align: "center" },
                    { align: "right" },
                    { align: "justify" }
                ],
                [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
                // ["blockquote", "code-block"],
                // [{ script: "sub" }, { script: "super" }],
                // [{ indent: "-1" }, { indent: "+1" }],
                [{ color: [] }, { background: [] }],
                // ["link", "image", "video", "formula"],
                // [{ direction: "rtl" }],
                // ["clean"]
            ]
        }
    },
    mounted(){
        if(this.text != undefined){
            if(this.text[0] == '<' || this.text.length == 0) {
                let data = [
                    { key: 'value', value: this.text }
                ]
                let x= JSON.stringify(data)
                this.$emit('vueEditorText', x, this.indReg, this.indexChild, this.textValue)
                this.vueText = data
            } else {
                this.vueText = JSON.parse(this.text.toString())
            }
        }
    },
    watch:{
        text(newVal, old){
            // let data = newVal.toString()
            // if(data.lenght == 0){
            //     let x = [
            //         {key: "value", value: ""}
            //     ]
            //     this.vueText = x
            // } else {
                if(newVal != undefined){
                    this.vueText = JSON.parse(newVal)
                } else {
                    
                }
            // }
            // this.selectedWords = this.findSelectedWords(newVal);
        },
        uppercase(newVal){
            this.textTransform = newVal
        }
    },
    methods:{
        ShifokorText(item, index) {
            let val = JSON.stringify(this.vueText)
            this.$emit('vueEditorText', val, this.indReg, this.indexChild, this.textValue)

            // let maxHeight = 0
            // if(index){
            //     maxHeight = 1300
            // } else {
            //     maxHeight = 1020;
            // }

            // const editorContainer = this.$el.querySelector('#text' + index);

            // if (editorContainer.scrollHeight > maxHeight) {
                
            // } else {
                
            // }
        },
        copyText(){
            var selectedText = window.getSelection().toString();
        },
        changeEdiror(item, ind){
            let selectedText = window.getSelection().toString();
            if(selectedText != '' && selectedText != null){
                this.selectedWords = selectedText
                this.selectedWords = ''
            }
            this.$emit('textChangeValueIndex', item.key, ind)
            this.textChangeValue = {
                index: ind,
                key: item.key
            }
            
            // const editor = this.$refs['vueTextEditor' + index];

            // const selection = window.getSelection();

            // if (selection) {
                // const range = selection.getRangeAt(0);
                // const offset = range.startOffset;
                // const container = range.startContainer;
                
            // }
        },
        ArrowClick(){
            if(this.selectedWords){
                this.$store.state.ArrowData = this.selectedWords
                this.$bvToast.toast(this.$t("Малумотлар қўшилди"), {
                    title: this.$t("Огоҳлантириш"),
                    autoHideDelay: 2000,
                    appendToast: true,
                    variant: "success"
                });
                this.selectedWords = ''
                // this.$emit('ArrowData', this.selectedWords)
                // console.log(this.$store.state.ArrowData)
            }
        },
        add(){
            let val = new Date().valueOf().toString()
            this.vueText.push({
                key: val,
                [`${val}`]: ''
            })
            let valText = JSON.stringify(this.vueText)
            this.$emit('vueEditorText', valText, this.indReg, this.indexChild, this.textValue)
        },
        deleteText(index){
            this.vueText.splice(index, 1)
            let valText = JSON.stringify(this.vueText)
            this.$emit('vueEditorText', valText, this.indReg, this.indexChild, this.textValue)
        }
    }
}
</script>
<style lang="scss">
.text-control {
    width: 100%;
    /* border: 1px solid red; */
    overflow-y: auto;
    min-height: 1070px;;
}
.vueTextEditor {
    width: 887px;
    margin-bottom: 10px;
}
.vueTextEditorUp{
    width: 887px;
    margin-bottom: 10px;
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
.qoshish-btn-text {
  /* left: 990px; */
  background: #195fb0;
  position: absolute;
  right: -4px;
  bottom: 0px;
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
.btnArrowIndex{
    background: #4e9df7;
    height: 800px;
    position: absolute;
    right: -4px;
    top: 50px;
}
.btnArrow{
    background: #4e9df7;
    height: 1060px;
    position: absolute;
    right: -4px;
    top: 50px;
}
.trash-text {
  background: #facccc;
  position: absolute;
  bottom: 50px;
  right: -4px;
  width: 40px;
  height: 40px;
  display: flex;
  border: 1px solid #ff7979;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
}
</style>