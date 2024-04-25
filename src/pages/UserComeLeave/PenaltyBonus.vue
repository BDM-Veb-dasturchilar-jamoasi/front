<template>
    <div>
        <b-modal id="penaltyForm" hide-footer>
                <div>
                    <Form :item="choosedItem" @submit="$bvModal.hide('penaltyForm'), getCurrentPenalties()"></Form>
                </div>
            </b-modal>
        <div class="header">
            <date-picker
                v-model="formData.datetime1"
                style="width: 20%;"
                format="DD.MM.YYYY"
                value-type="X"
                type="date"
                :lang="lang"
            ></date-picker>
            <date-picker
                v-model="formData.datetime2"
                style="width: 20%; margin-left: 20px;"
                format="DD.MM.YYYY"
                value-type="X"
                type="date"
                :lang="lang"
            ></date-picker>
            <v-select
                :options="users"
                v-model="formData.user_id"
                :reduce="option => option.id"
                label="user_name"
                placeholder="Ходимлар"
                style="width: 300px; margin-left: 20px;"
            />
            <v-select
                :options="typeList"
                v-model="formData.type"
                :reduce="option => option.id"
                label="name"
                style="width: 300px; margin-left: 20px;"
                placeholder="Танланг"
            />
            <b-button variant="primary" style="margin-left: 20px;" @click="getCurrentPenalties()">Кўриш</b-button>
        </div>
        <div class="content_data">
                <table id="data">
                <tr>
                    <th>Ходим</th>
                    <th></th>
                </tr>
                <tr v-for="item in items">
                    <td>
                        {{ item.id }} |
                        {{ item.user_name }}
                    </td>
                    <td>
                        <b-tabs content-class="mt-3">
                            <b-tab title="Жарималар" v-if="type == null || type == 'penalty'" active>
                                <div>
                                    <table id="inside">
                                        <tr>
                                            <th>
                                                Сана
                                            </th>
                                            <th>
                                                Асос
                                            </th>
                                            <th>
                                                Сабабли
                                            </th>
                                            <th>
                                                Сумма
                                            </th>
                                            <th>
                                                Тури
                                            </th>
                                        </tr>
                                        <tr v-for="child in item.penalty_bonus" @click="clickRow(child)">
                                            <td v-if="child.type == 'penalty'">
                                                {{ new Date(child.datetime * 1000).toLocaleDateString() }}
                                                {{ new Date(child.datetime * 1000).toLocaleTimeString() }}
                                            </td>
                                            <td v-if="child.type == 'penalty'">
                                                {{ child.cause.cause }}
                                            </td>
                                            <td v-if="child.type == 'penalty'">
                                                {{ child.is_resonably ? "Ха": "Йўқ" }}
                                            </td>
                                            <td v-if="child.type == 'penalty'">
                                                {{ new Intl.NumberFormat('ru-RU').format(child.summa)  }}
                                            </td>
                                            <td v-if="child.type == 'penalty'">
                                                {{ child.type_come == 'come' ? 'Кириш': 'Чиқиш' }}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colspan="3">
                                                Жами
                                            </td>
                                            <td colspan="2">
                                                {{ new Intl.NumberFormat('ru-RU').format(item.all_penalty) }}
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </b-tab>
                            <b-tab title="Бонуслар"  v-if="type == null || type == 'bonus'">
                                <div>
                                    <table id="inside">
                                        <tr>
                                            <th>
                                                Сана
                                            </th>
                                            <th>
                                                Асос
                                            </th>
                                            <th>
                                                Сабабли
                                            </th>
                                            <th>
                                                Сумма
                                            </th>
                                            <th>
                                                Тури
                                            </th>
                                        </tr>
                                        <tr v-for="child in item.penalty_bonus"  @click="clickRow(child)">
                                            <td v-if="child.type == 'bonus'">
                                                {{ new Date(child.datetime * 1000).toLocaleDateString() }}
                                                {{ new Date(child.datetime * 1000).toLocaleTimeString() }}
                                            </td>
                                            <td v-if="child.type == 'bonus'">
                                                {{ child.cause.cause }}
                                            </td>
                                            <td v-if="child.type == 'bonus'">
                                                {{ child.is_resonably ? "Ха": "Йўқ" }}
                                            </td>
                                            <td v-if="child.type == 'bonus'">
                                                {{ new Intl.NumberFormat('ru-RU').format(child.summa)  }}
                                            </td>
                                            <td v-if="child.type == 'bonus'">
                                                {{ child.type_come == 'come' ? 'Кириш': 'Чиқиш' }}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colspan="3">
                                                Жами
                                            </td>
                                            <td colspan="2">
                                                {{ new Intl.NumberFormat('ru-RU').format(item.all_bonus) }}
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </b-tab>
                        </b-tabs>
                    </td>
                </tr>
                </table>
        </div>
    </div>
</template>

<script>
import moment from 'moment';
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import Form from './Form.vue'
export default {
    components: {
        DatePicker,
        Form
    },
    data() {
        return {
            dayNames: ['Yakshanba', 'Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma', 'Shanba'],
            users: [],
            type: null,
            typeList: [
                {
                    id: 'penalty',
                    name: "Жарима"
                },
                {
                    id: 'bonus',
                    name: "Бонус"
                },
            ],
            formData: {
                user_id: null,
                datetime1: moment(new Date()).format('X'),
                datetime2: moment(new Date()).format('X'),
                type: null
            },
            lang:  {
                    formatLocale: {
                    firstDayOfWeek: 1
                },
                monthBeforeYear: false
            },
            items: [],
            choosedItem: null,
        }
    },
    methods: {
        clickRow(item) {
            this.choosedItem = item;
            this.$bvModal.show('penaltyForm')
        },
        getAllUser() {
            let self = this;
            axios({
                method: "get",
                url: "/user/all",
            }).then((res) => {
                self.users = res.data.data;
            })
        },
        getCurrentPenalties() {
            let self = this;
            let sendData = { ...self.formData };
            let currentBegin = new Date(sendData.datetime1 * 1000);
            let currentEnd = new Date(sendData.datetime2 * 1000);
            currentBegin.setHours(0, 0, 0, 0);
            currentEnd.setHours(23, 59, 59, 0);
            let intBegin = Math.floor(currentBegin.getTime() / 1000);
            let intEnd = Math.floor(currentEnd.getTime() / 1000);
            axios({
                method: "post",
                url: "/user-come-leave/daily-penalty-bonus",
                data: {
                    user_id: sendData.user_id,
                    datetime1: intBegin,
                    datetime2: intEnd,
                    type: sendData.type
                },
            }).then((res) => {
                self.items = res.data;
                self.type = sendData.type;
            })
        }
    },
    mounted() {
        this.getAllUser()
    }
}

</script>
<style scoped>
.header {
    display: flex;
}
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
#inside {
    width: 100%;
}

</style>