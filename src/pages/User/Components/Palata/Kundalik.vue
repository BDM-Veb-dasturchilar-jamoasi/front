<template>
    <div>
        <div>
            <b-tabs
                active-nav-item-class="font-weight-bold text-light bg-info"
            >
                <b-tab
                    v-for="(itemD, indexD) in reg_statsionar_doctor"
                    :key="indexD"
                    :title="$t('Кундалик')"
                    title-link-class="mr-2 mt-1 text-light font-weight-bold bg-success"
                    style="padding: 0px !important;"
                >
                    <div class="tek-card" style="position: relative;">
                        <div>
                            <b-button
                                class="kundalik-add-btn-text"
                                variant="primary"
                                type="number"
                                @click="addKundalik(indexD)"
                            >
                                <b-icon icon="plus" font-scale="2" color="#fff"></b-icon
                            ></b-button>
                        </div>
                        <div v-for="(itemT, indexT) in itemD.reg_stat_doctor_text" :key="indexT">
                            <div class="kundalik-text-header">
                                <div>
                                    <input 
                                        class="input-datetime-local"
                                        type="datetime-local"
                                        v-model="itemT.day"
                                    />
                                </div>
                                <div>
                                    <b-button
                                        style="width: 30px; height: 30px; display: flex; justify-content: center;"
                                        variant="outline-danger"
                                        @click="deleteText(indexD, indexT)"
                                    >
                                        <b-icon style="width: 17px;" icon="trash"></b-icon>
                                    </b-button>
                                </div>
                            </div>
                            <div>
                                <VueEditorText 
                                    :text="itemT.statsionar_text"
                                    :indReg="indexD"
                                    :indexChild="indexT"
                                    :defaultHeigth="defaultHeigth"
                                    @vueEditorText="vueEditorText"
                                    @textChangeValueIndex="textChangeValueIndex"
                                />
                            </div>
                        </div>
                    </div>
                </b-tab>
            </b-tabs>
        </div>
    </div>
</template>

<script>
import DatePicker from "vue2-datepicker";
import moment from "moment";
import VueEditorText from "../VueEditorText.vue"
import "vue2-datepicker/index.css";
export default{
    props: ["reg_statsionar_doctor"],
    components: {
        DatePicker,
        VueEditorText
    },
    data(){
        return {
            lang: {
                formatLocale: {
                    firstDayOfWeek: 1
                },
                monthBeforeYear: false
            },
            defaultHeigth: "height: 960px;",
            textChangeValue: {
                index: null,
                key: null,
            },
        }
    },
    methods:{
        vueEditorText(val, index, indexChild, textValue){
            this.reg_statsionar_doctor[index].reg_stat_doctor_text[indexChild].statsionar_text = val;
            // console.log(this.doctor[index].text)
        },
        textChangeValueIndex(key, index){
            this.textChangeValue = {
                index: index,
                key: key,
            }
        },
        addKundalik(indP){
            const currentDate = new Date();

            const day = currentDate.getDate().toString().padStart(2, '0');
            const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 because months are zero-based
            const year = currentDate.getFullYear().toString();
            const hours = currentDate.getHours().toString().padStart(2, '0');
            const minutes = currentDate.getMinutes().toString().padStart(2, '0');
            const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}`;
            let dataText = JSON.stringify([
              { 
                key: 'value', 
                value: `${
                  '<p class="ql-align-center"><strong>' + day + '.' + month + '.' + year + ' ' + hours + ':' + minutes + '</strong></p>' + 
                  '<p><strong>Бемор:</strong>' + this.$store.state.bemor.fullname + ' ' + moment.unix(this.$store.state.bemor.birthday).format("YYYY") + ' Й' + '</p>'
                }`
                // + '<p>' + '<strong>Шикояти:</strong>' + ' ' + '</p>'
              }
          ])
            this.reg_statsionar_doctor[indP].reg_stat_doctor_text.push({
                statsionar_text: dataText,
                text: dataText,
                doctor_id: this.reg_statsionar_doctor[indP].doctor_id,
                day: formattedDate
            })
        },
        deleteText(indP, indCh){
            this.reg_statsionar_doctor[indP].reg_stat_doctor_text.splice(indCh, 1)
        }
    }
}
</script>

<style>
.kundalik-text-header {
    border: 1px solid rgb(70, 112, 250);
    width: 100%;
    padding: 7px;
    background: rgba(7, 100, 172, 0.058);
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
}
.kundalik-add-btn-text {
    background: #195fb0;
    position: absolute;
    right: 10px;
    bottom: 5px;
    z-index: 400;
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
</style>