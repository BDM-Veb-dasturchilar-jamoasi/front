<template>
    <div>
        <div class="bemor-forma" style="display: flex; justify-content: space-between;">
            <div class="bemor-sh">
                <label>{{ $t("Бемор шикояти") }}</label>
                <div>
                    <b-input
                        style="border: 1px solid #bdb2b2; background: #fff; height: 35px;"
                        id="naprovitel-name"
                        v-model="datasComplaint"
                        @input="ComplaintInput"
                        type="text"
                    />
                </div>
            </div>
            <!-- <div class="bemor-sh">
                <label>{{ $t("Врач ID") }}</label>
                <div style="display: flex; height: 37px; justify-content: space-between;">
                    <div style="width: calc(100% - 50px);">
                        <v-select
                            :filter="fuseSearch"
                            id="naprovitel"
                            :options="Naprovitel"
                            :get-option-label="option => option.name"
                            :reduce="option => option.id"
                            v-model="ins_direct_id"
                        >
                        <template #option="{ name, direct_id }">
                            {{ name }}
                            <br />
                            <b>{{ direct_id }}</b>
                        </template>
                        </v-select>
                    </div>
                        <b-button
                        class="navbarBtn-nap"
                        variant="primary"
                        v-b-modal="'nap-modal' + modalIdCom"
                        @click="getMed"
                        >
                        +
                    </b-button>
                    <b-modal
                        :id="'nap-modal' + modalIdCom"
                        :title="$t('Напровитель')"
                        hide-footer
                    >
                        <div>
                        <div>
                            <div>
                                <span>
                                    <span class="shirift">{{ $t("Ф.И.Ш") }}</span>
                                    <span style="color: red;">*</span>
                                    <span v-if="errorsNap !== null">
                                    <span
                                        style="color: red; font-size: 9px"
                                        v-if="!errorsNap.name.required"
                                        >{{ $t("Ф.И.Ш тўлдирилиши керак") }}</span
                                    >
                                    <span
                                        style="color: red; font-size: 9px"
                                        v-if="!errorsNap.name.minLength"
                                        >{{ $t("Ф.И.Ш да камида 4 та белги бўлиши керак") }}</span
                                    >
                                    </span>
                                </span>
                                <b-input id="naprovitel-name" v-model="NapData.name" type="text" />

                            <span>
                                <span class="shirift">{{ $t("Вакил") }}</span>
                                <span style="color: red;">*</span>
                                <span v-if="errorsNap !== null">
                                <span
                                    style="color: red; font-size: 9px"
                                    v-if="!errorsNap.name.required"
                                    >{{ $t("Ф.И.Ш тўлдирилиши керак") }}</span
                                >
                                </span>
                            </span>
                            <v-select
                                :options="MedPris"
                                label="name"
                                :reduce="option => option.id"
                                v-model="NapData.med_id"
                            />
                            </div>
                            <div>
                            <span>
                                <span class="shiri">
                                {{ $t("ID") }}
                                </span>
                                <span style="color: red;">*</span>
                                <span v-if="errorsNap !== null">
                                <span
                                    style="color: red; font-size: 9px"
                                    v-if="!errorsNap.bonus.required"
                                    >{{ $t("ID тўлдирилиши керак") }}</span
                                >
                                </span>
                            </span>
                            
                            <b-input
                                id="naprovitel-name"
                                v-model="NapData.direct_id"
                                type="number"
                            />
                            <span class="shiri">
                                {{ $t("Тўлов тури") }}
                            </span>
                            <v-select
                                :options="bonus_type"
                                label="name"
                                :components="{ Deselect }"
                                :reduce="option => option.id"
                                v-model="NapData.bonus_type"
                            />
                            <span>
                                <span class="shiri">
                                {{ $t("Фоиз") }}
                                </span>
                                <span style="color: red;">*</span>
                                <span v-if="errorsNap !== null">
                                <span
                                    style="color: red; font-size: 9px"
                                    v-if="!errorsNap.bonus.required"
                                    >{{ $t("Фоиз тўлдирилиши керак") }}</span
                                >
                                </span>
                            </span>
                            <vue-numeric
                                v-if="NapData.bonus_type"
                                style="width: 100%; height: 35px; border: 1px solid #bdb2b2; border-radius: 5px;"
                                v-model="NapData.bonus"
                                separator="space"
                            ></vue-numeric>
                            <vue-numeric
                                v-else
                                style="width: 100%; height: 35px; border: 1px solid #bdb2b2; border-radius: 5px;"
                                v-model="NapData.bonus"
                                :precision="2"
                                separator="space"
                            ></vue-numeric>
                            </div>
                            <div class="CreateName">
                            <b-button
                                class="modalBtn1"
                                size="sm"
                                style="height: 37px;"
                                variant="danger "
                                @click="close"
                            >
                                <b-icon icon="calendar2-x"></b-icon>
                                {{ $t("Бекор қилиш") }}
                            </b-button>
                            <b-button
                                class="mt-3 ml-2 modalBtn"
                                @click="Save"
                                variant="success"
                            >
                                <b-icon icon="calendar2-plus"></b-icon>
                                {{ $t("Сақлаш") }}
                            </b-button>
                            </div>
                        </div>
                        </div>
                    </b-modal>
                </div>
            </div> -->
        </div>
    </div>
</template>

<script>
import { required, minLength } from "vuelidate/lib/validators";
import Fuse from "fuse.js";
export default{
    props: ["direct_id", "modalIdCom", "complaint"],
    data(){
        return {
            NapData: {
                direct_id: null,
                name: "",
                med_id: null,
                bonus_type: 1,
                bonus: 0
            },
            Deselect: {
                render: createElement => createElement("span", "")
            },
            datasComplaint: '',
            Naprovitel: [],
            ins_direct_id: null,
            MedPris: [],
            bonus_type: [
                {id: 0, name: "Naqd"},
                {id: 1, name: "Foiz"},
            ],
            errorsNap: null,
        }
    },
    validations: {
        NapData: {
            name: {
                required,
                minLength: minLength(4)
            },
            direct_id: {
                required
            },
            bonus: {
                required
            },
            med_id: {
                required
            }
        },
    },
    watch: {
        ins_direct_id: function(val) {
            this.$emit("direct", val);
        },
        direct_id: function(val) {
            if (val) {
                this.ins_direct_id = val;
            }
        },
        complaint: function(newVal) {
            this.datasComplaint = newVal
        }
    },
    methods: {
        Save(){
            let self = this;
            this.$v.$touch();
            if (this.$v.NapData.$error == false) {
                axios({
                method: "post",
                url: "/direct/create",
                data: self.NapData
                }).then(data => {
                if (data) {
                    self.$bvModal.hide('nap-modal' + self.modalIdCom)
                    self.getNaprovitel()
                    self.ins_direct_id = data.data.data.id
                    self.NapData = {
                    direct_id: null,
                    name: "",
                    med_id: null,
                    bonus: 0
                    }
                }
                });
            } else {
                self.errorsNap = self.$v.NapData;
            }
        },
        close(){
            this.NapData = {
                direct_id: null,
                name: "",
                med_id: null,
                bonus: 0
            }
        },
        getNaprovitel() {
            let self = this;
            axios({
                method: "get",
                url: "/direct/all"
            }).then(res => {
                if (res != undefined) {
                self.Naprovitel = res.data.data;
                }
            });
        },
        getMed() {
            let s = this;
            axios({
                method: "get",
                url: "/med_direct/all"
            }).then(res => {
                if (res) {
                s.MedPris = res.data.data;
                }
            });
        },
        ComplaintInput(){
            this.$emit('ComplaintInput', this.datasComplaint)
        },
        fuseSearch(options, search) {
            const fuse = new Fuse(options, {
                keys: ["name", "direct_id"],
                shouldSort: true
            });
            return search.length
                ? fuse.search(search).map(({ item }) => item)
                : fuse.list;
        },
    },
    mounted(){
        this.getNaprovitel();
    }
}
</script>
<style>
.bemor-sh{
    width: 49%;
}
</style>