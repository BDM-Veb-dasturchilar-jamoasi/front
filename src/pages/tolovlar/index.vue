<template>
    <b-tabs content-class="mt-3" fill>
        <b-tab style="margin-top: 38px;" title="Кассовый ордер" active >
           <Kassa/>
        </b-tab>
        <b-tab title="Напровителга Тўловлар">
            <div style="margin-top: 35px;">
                <NaprovitlOplata/>
            </div>
        </b-tab>
        <b-tab title="Ходимларга Ҳаражат">
            <div style="margin-top: 35px;">
                <hodimgaTolov/>
            </div>
        </b-tab>
        <b-tab title="Ходимларга ойлик белгилаш">
            <div style="margin-top: 35px;">
                <Oylik/>
            </div>
        </b-tab>
    </b-tabs>
</template>

<script>
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import moment from "moment";
import Kassa from '../Kassa Order/Index.vue';
import NaprovitlOplata from '../naprovitlOplata/Index.vue';
import hodimgaTolov from '../Oplata/Index.vue';
import Oylik from '../HodimOylik/Index.vue';

export default {
    name: "UserComeLeave",
    components: {
        DatePicker,
        Kassa,
        NaprovitlOplata,
        hodimgaTolov,
        Oylik
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
        // getCurrentComing() {
        //     let currentBegin = new Date(this.currentDate * 1000);
        //     let currentEnd = new Date(this.currentDate * 1000);
        //     currentBegin.setHours(0, 0, 0, 0);
        //     currentEnd.setHours(23, 59, 59, 0);
        //     let intBegin = Math.floor(currentBegin.getTime() / 1000);
        //     let intEnd = Math.floor(currentEnd.getTime() / 1000);
        //     let self = this;
        //     axios({
        //         method: "post",
        //         url: "/user-come-leave/daily-coming",
        //         data: {
        //             "user_id": null,
        //             "datetime1": intBegin,
        //             "datetime2": intEnd,
        //             "dayName": self.dayNames[self.dayNo]
        //         }
        //     }).then(res => {
        //         self.items = res.data;
        //         self.items = self.items.map((item) => {
        //             let splittedComeTime;
        //             if (item.come_time) {
        //                 splittedComeTime = item.come_time.split(':');
        //             } else {
        //                 splittedComeTime = ['00', '00', '00']
        //             }
        //             let realCometime = new Date();
        //             realCometime.setHours(splittedComeTime[0], splittedComeTime[1], splittedComeTime[2]);
        //             let intComeTime = Math.floor(realCometime.getTime() / 1000);
        //             if(item.come_doc.length > 0) {
        //                 if (item.come_doc[0].come_time) {
        //                     item['curr_come_time'] = moment(item.come_doc[0].come_time * 1000).format('DD.MM.YYYY HH:mm:ss');
        //                     if ((intComeTime < item.come_doc[0].come_time) || (!item.come_doc[0].come_time)) {
        //                         item['danger'] = true;
        //                     }
        //                 }
        //                 if (item.come_doc[0].leave_time) {
        //                     item['curr_leave_time'] = moment(item.come_doc[0].leave_time * 1000).format('DD.MM.YYYY HH:mm:ss');
        //                 }
        //             } else {
        //                 item['curr_come_time'] = null;
        //                 item['curr_leave_time'] = null;
        //                 item['danger'] = true;
        //             }
        //             return item;
        //         })
        //     });
        // },
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

<style >
.nav-fill > .nav-link, .nav-fill .nav-item {
    background-color: rgb(196, 196, 199);
}
</style>