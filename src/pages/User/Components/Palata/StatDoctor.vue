<template>
    <div>
        <div>
            <b-tabs
                active-nav-item-class="font-weight-bold text-light bg-info"
            >
                <b-tab
                    v-for="(item, index) in reg_statsionar_doctor"
                    :key="index"
                    :title="$t('Текшириш')"
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
import VueEditorText from '../VueEditorText.vue';
export default{
    props: ["reg_statsionar_doctor"],
    components: {
        VueEditorText
    },
    data(){
        return {
            defaultHeigth: "height: 960px;",
            textChangeValue: {
                index: null,
                key: null,
            },
        }
    },
    methods:{
        vueEditorText(val, index, indexChild, textValue){
            this.reg_statsionar_doctor[index].statsionar_text = val;
        },
        textChangeValueIndex(key, index){
            this.textChangeValue = {
                index: index,
                key: key,
            }
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