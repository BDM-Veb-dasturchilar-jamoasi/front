<template>
    <b-tabs content-class="mt-3" fill>
        <b-tab title="Келди-кетди" active>
            <b-modal id="userComing" size="lg" title="Ходим келди кетди статистикаси" ok-only>
                <div>
                    <table id="data">
                            <tr>
                                <th>Вақти</th>
                                <th>Тури</th>
                            </tr>
                            <tr v-for="child in childs">
                                <td>
                                    {{ new Date(child.datetime * 1000).getHours() < 10 ? `0${new Date(child.datetime * 1000).getHours()}`: `${new Date(child.datetime * 1000).getHours()}`  }} :
                                    {{ new Date(child.datetime * 1000).getMinutes() < 10 ? `0${new Date(child.datetime * 1000).getMinutes()}`: `${new Date(child.datetime * 1000).getMinutes()}`  }} :
                                    {{ new Date(child.datetime * 1000).getSeconds() < 10 ? `0${new Date(child.datetime * 1000).getSeconds()}`: `${new Date(child.datetime * 1000).getSeconds()}`  }}
                                </td>
                                <td>
                                    {{ child.type == 'come' ? 'Кириш': 'Чиқиш' }}
                                </td>
                            </tr>
                            </table>
                        </div>
            </b-modal>
            <div>
                <div class="header" style="display: flex;">
                    <date-picker
                        v-model="currentDate"
                        style="width: 40%;"
                        format="DD.MM.YYYY"
                        value-type="X"
                        type="date"
                        :lang="lang"
                    ></date-picker>
                    <div style="margin-left: 10px; font-size: 20px; font-weight: bold;">
                        {{ dayNames[dayNo] }}
                    </div>
                    <b-button @click="getCurrentComing()" variant="primary" style="margin-left: 20px;">Кўриш</b-button>
                </div>
                <div class="content_data">
                    <table id="data">
                            <tr>
                            <th>Ходим</th>
                            <th>Келиш вақти</th>
                            <th>Кетиш вақти</th>
                            <th>Келди</th>
                            <th>Кетди</th>
                            </tr>
                            <tr v-for="item in items" :class="{ 'danger': item.danger, 'yellow': item.yellow }" @click="$bvModal.show('userComing'), clickRow(item)">
                                <td>
                                    {{ item.id }} | {{ item.user_name }}
                                </td>
                                <td>
                                    {{ item.come_time }}
                                </td>
                                <td>
                                    {{ item.leave_time }}
                                </td>
                                <td>
                                    {{ item.curr_come_time }}
                                </td>
                                <td>
                                    {{ item.curr_leave_time }}
                                </td>
                            </tr>
                        </table>
                </div>
            </div>
        </b-tab>
        <b-tab title="Жарима ва бонуслар">
            <div>
                <PenaltyBonus></PenaltyBonus>
            </div>
        </b-tab>
    </b-tabs>
</template>

<script>
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import moment from "moment";
import PenaltyBonus from './PenaltyBonus.vue';

export default {
    name: "UserComeLeave",
    components: {
        DatePicker,
        PenaltyBonus
    },
    data() {
        return {
            dayNo: new Date().getUTCDay(),
            dayNames: ['Yakshanba', 'Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma', 'Shanba'],
            currentDate: moment(new Date()).format('X'),
            lang:  {
                    formatLocale: {
                    firstDayOfWeek: 1
                },
                monthBeforeYear: false
            },
            items: [],
            childs: []
        }
    },
    methods: {
        getCurrentComing() {
            let currentBegin = new Date(this.currentDate * 1000);
            let currentEnd = new Date(this.currentDate * 1000);
            currentBegin.setHours(0, 0, 0, 0);
            currentEnd.setHours(23, 59, 59, 0);
            let intBegin = Math.floor(currentBegin.getTime() / 1000);
            let intEnd = Math.floor(currentEnd.getTime() / 1000);
            let self = this;
            axios({
                method: "post",
                url: "/user-come-leave/daily-coming",
                data: {
                    "user_id": null,
                    "datetime1": intBegin,
                    "datetime2": intEnd,
                    "dayName": self.dayNames[self.dayNo]
                }
            }).then(res => {
                self.items = res.data;
                self.items = self.items.map((item) => {
                    let splittedComeTime;
                    if (item.come_time) {
                        splittedComeTime = item.come_time.split(':');
                    } else {
                        splittedComeTime = ['00', '00', '00']
                    }
                    let realCometime = new Date();
                    realCometime.setHours(splittedComeTime[0], splittedComeTime[1], splittedComeTime[2]);
                    let intComeTime = Math.floor(realCometime.getTime() / 1000);
                    if(item.come_doc.length > 0) {
                        if (item.come_doc[0].come_time) {
                            item['curr_come_time'] = moment(item.come_doc[0].come_time * 1000).format('DD.MM.YYYY HH:mm:ss');
                            if ((intComeTime < item.come_doc[0].come_time) || (!item.come_doc[0].come_time)) {
                                item['danger'] = true;
                            }
                        }
                        if (item.come_doc[0].leave_time) {
                            item['curr_leave_time'] = moment(item.come_doc[0].leave_time * 1000).format('DD.MM.YYYY HH:mm:ss');
                        }
                    } else {
                        item['curr_come_time'] = null;
                        item['curr_leave_time'] = null;
                        item['yellow'] = true;
                    }
                    return item;
                })
            });
        },
        clickRow(item) {
            if(item.come_doc.length > 0) {
                this.childs = item.come_doc[0].child;
            } else {
                this.childs = []
            }
        }
    },
    watch: {
        currentDate: function (val) {
            let date = new Date(val * 1000);
            date.setHours(10, 10, 10)
            this.dayNo = date.getUTCDay()
        }
    },
    mounted() {
        this.getCurrentComing()
    }
}

</script>

<style scoped>
#data {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

#data td, #data th {
  border: 1px solid #ddd;
  padding: 8px;
}

#data tr:nth-child(even){background-color: #f2f2f2;}


#data th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #00009d;
  color: white;
}

.danger {
    background-color: red !important;
    color: white !important;
}
.yellow {
    background-color: #fcad03 !important;
}

</style>