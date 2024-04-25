<template>
    <div>
        <div style="display: flex; justify-content: space-between; border-bottom: 1px solid gray;">
            <div style="font-weight: bold;">
                Тури
            </div>
            <div>
               {{ data.type == 'bonus' ? 'Бонус': 'Жарима' }}
            </div>
        </div>
        <div style="display: flex; justify-content: space-between; border-bottom: 1px solid gray;">
            <div style="font-weight: bold;">
                Асос
            </div>
            <div style="text-align: center;" v-if="data.cause">
               {{ data.cause.cause }}
            </div>
        </div>
        
        <div style="display: flex; justify-content: space-between; border-bottom: 1px solid gray;">
            <div style="font-weight: bold;">
                Сумма
            </div>
            <div style="text-align: center;">
               {{ new Intl.NumberFormat('ru-RU').format(data.summa) }}
            </div>
        </div>
        <div style="display: flex; justify-content: space-between; border-bottom: 1px solid gray;">
            <div style="font-weight: bold;">
                Сабабли
            </div>
            <div>
                <b-form-checkbox
                    id="isResonably"
                    v-model="data.is_resonably"
                    name="isResonably"
                    :value="true"
                    :unchecked-value="false"
                    >
                    </b-form-checkbox>
            </div>
        </div>
        <div style="display: flex; flex-direction: column; border-bottom: 1px solid gray;">
            <div style="font-weight: bold;">
                Коммент
            </div>
            <div>
                <b-form-textarea
                    id="textarea-small"
                    size="sm"
                    placeholder="Коммент"
                    v-model="data.comment"
                ></b-form-textarea>
            </div>
        </div>
        <div style="margin-top: 20px; display: flex; justify-content: flex-end;">
            <b-button variant="primary" @click="save()">Сақлаш</b-button>
        </div>
    </div>
</template>
<script>
export default {
    props: ['item'],
    data() {
        return {
            data: {}
        }
    },
    mounted() {
        this.data = { ...this.item };
    },
    methods: {
        save() {
            let self = this;
            axios({
                method: "post",
                url: "/user-come-leave/change-penalty",
                data: self.data
            }).then((res) => {
                self.$emit('submit')
            })
        }
    }
}

</script>