<template>
    <div>
        <!-- {{ Paydatas }} -->
        <table
            class="table table-sm table-bordered"
            style="background: #fff; widows: 100%;"
        >
            <thead>
            <tr>
                <th>{{ $t("Сумма") }}</th>
                <th>{{ $t("Скидка") }}</th>
                <th style="width: 105px;">{{ $t("Тўлов тури") }}</th>
                <th>{{ $t("Изоҳ") }}</th>
                <th style="width: 100px;">{{ $t("Сана") }}</th>
                <th style="width: 43px;"></th>
            </tr>
            </thead>

            <tbody>
            <tr
                v-for="(item, index) in Paydatas"
                :key="index"
                :class="{ bg: index % 2 == 1 }"
            >
                <td v-if="ShowModalKey == false || ShowModalKey == item.key">{{ item.summa | numFormat }}</td>
                <td v-if="ShowModalKey == false || ShowModalKey == item.key">{{ item.discount | numFormat }}</td>
                <td v-if="ShowModalKey == false || ShowModalKey == item.key">{{ item.pay_type }}</td>
                <td v-if="ShowModalKey == false || ShowModalKey == item.key">{{ item.comment }}</td>
                <td v-if="ShowModalKey == false || ShowModalKey == item.key">{{ item.date_time | dateFormatDD }}</td>
                <td
                    :class="{
                        Arxive:
                        $route.name == 'ArxivOne' || $route.name == 'Arxivlar'
                    }"
                    v-if="ShowModalKey == false || ShowModalKey == item.key"
                >
                <b-button
                    v-if="localUser.role == 'Admin' || localUser.role == 'Kasser'"
                    style="width: 30px; height: 30px; display: flex; justify-content: center;"
                    @click="deleteSumma(item, index)"
                    variant="outline-danger"
                >
                    <b-icon style="width: 17px;" icon="trash"></b-icon>
                </b-button>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import moment from "moment"
export default {
    props: ["Paydatas", "ShowModalKey"],
    data(){
        return {
            localUser: JSON.parse(localStorage.getItem("user"))
        }
    },
    filters: {
    dateFormatDD: function(date) {
        if (date) {
            return moment.unix(date).format("DD.MM HH:mm");
            } else {
            return "";
            }
        }
    },
    methods: {
        deleteSumma(item, index) {
            this.$emit("deleteSumma", item, index)
        },
        SortKEy(){
            if(ShowModalKey){

            }
        }
    }
}
</script>
<style>

</style>