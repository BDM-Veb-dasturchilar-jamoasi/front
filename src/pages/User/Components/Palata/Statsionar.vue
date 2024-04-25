<template>
    <div>
        <div v-for="(item, index) in reg_statsionar" :key="index">
            <b-tabs active-nav-item-class="font-weight-bold text-light bg-info">
                <!-- <b-tab
                    :title="$t('Бемор')"
                    title-link-class="mr-2 mt-1 text-light font-weight-bold bg-success"
                    style="padding: 0px !important;"
                >
                    <div class="tek-card">
                        
                        <div class="stat-bemor-text">
                            <div style="display: flex;">
                                <p>Шифохонага ётқизилган кун:</p>
                                <div>
                                    <date-picker
                                        style="width: 200px;"
                                        v-model="item.recede_day"
                                        format="DD.MM.YYYY HH:mm"
                                        value-type="X"
                                        type="datetime"
                                        :lang="lang"
                                    ></date-picker>
                                </div>
                            </div>
                            <div style="display: flex;">
                                <p>Шифохонадан чиқарилган кун:</p>
                                <div>
                                    <date-picker
                                        style="width: 200px;"
                                        v-model="item.arrive_day"
                                        format="DD.MM.YYYY HH:mm"
                                        value-type="X"
                                        type="datetime"
                                        :lang="lang"
                                    ></date-picker>
                                </div>
                            </div>
                            
                        </div>
                        
                    </div>
                </b-tab> -->
                <b-tab
                    :title="$t('Текшириш')"
                    title-link-class="mr-2 mt-1 text-light font-weight-bold bg-success"
                    style="padding: 0px !important;"
                >
                <div class="tek-card">
                    <div>
                        <StatDoctor
                            :reg_statsionar_doctor="item.reg_statsionar_doctor"
                        />
                    </div>
                </div>
                </b-tab>
                <b-tab
                    :title="$t('Кундалик')"
                    title-link-class="mr-2 mt-1 text-light font-weight-bold bg-success"
                    style="padding: 0px !important;"
                >
                    <div class="tek-card">
                        <Kundalik 
                            :reg_statsionar_doctor="item.reg_statsionar_doctor"
                        />
                    </div>
                </b-tab>
                <b-tab
                    :title="$t('Даволош сўнги')"
                    title-link-class="mr-2 mt-1 text-light font-weight-bold bg-success"
                    style="padding: 0px !important;"
                >
                    <div class="tek-card">
                        <div class="kundalik-text-header">
                            <div>
                                <b-button
                                    style="margin-left: 10px; margin-right: 10px;"
                                    variant="primary"
                                    @click="allPechat(item)"
                                    class="navbarBtnTashxis"
                                >
                                    <b-icon icon="printer-fill"></b-icon>
                                    Печать
                                </b-button>
                                <input 
                                    class="input-datetime-local"
                                    type="datetime-local"
                                    v-model="item.date"
                                />
                            </div>
                            <div>
                                <!-- <b-button
                                    style="width: 30px; height: 30px; display: flex; justify-content: center;"
                                    variant="outline-danger"
                                    @click="deleteText(indexD, indexT)"
                                >
                                    <b-icon style="width: 17px;" icon="trash"></b-icon>
                                </b-button> -->
                            </div>
                        </div>
                        <div>
                            <VueEditorText 
                                :text="item.statsionar_text"
                                :indReg="index"
                                :defaultHeigth="defaultHeigth"
                                @vueEditorText="vueEditorText"
                                @textChangeValueIndex="textChangeValueIndex"
                            />
                        </div>
                    </div>
                </b-tab>
            </b-tabs>
        </div>
    </div>
</template>
<script>
import DatePicker from "vue2-datepicker";
import VueEditorText from "../VueEditorText.vue"
import "vue2-datepicker/index.css";
import StatDoctor from "./StatDoctor.vue";
import moment from 'moment';
import Kundalik from "./Kundalik.vue";
export default {
    props: ["reg_statsionar"],
    components: {
        DatePicker,
        StatDoctor,
        Kundalik,
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
            defaultHeigth: "height: 1010px;",
            textChangeValue: {
                index: null,
                key: null,
            },
        }
    },
    filters: {
        DateFormat: (date) => {
            console.log(date);
            if (date) {
                return moment.unix(date).format("DD MM YYYY HH:mm:ss");
            } else {
                return "";
            }
        },
    },
    // watch: {
    //     '$store.state.ArrowData'(newVal){
    //         // console.log(newVal)
    //         let text = JSON.parse(this.reg_statsionar[0].statsionar_text.toString())
    //         text[0].value += newVal
    //         this.reg_statsionar[0].statsionar_text = JSON.stringify(text)
    //     }
    // },
    methods: {
        vueEditorText(val, index, indexChild, textValue){
            this.reg_statsionar[index].statsionar_text = val;
        },
        textChangeValueIndex(key, index){
            this.textChangeValue = {
                index: index,
                key: key,
            }
        },
        ArrowData(data){
            console.log(data)
            // this.reg_statsionar[0].statsionar_text += 
        },
        allPechat(item){
            localStorage.setItem("StatsionarPechat", JSON.stringify(item));
            // this.$router.push("/user");
            const rout = this.$router.resolve({
                path: "/user-statsionar"
            });
            window.open(rout.href, "_blank");
        }
    }
}
</script>

<style>
.stat-bemor-text p{
    font-size: 18px;
    font-weight: 600;
    margin-right: 5px;
}
</style>