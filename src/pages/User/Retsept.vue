<template>
    <div>
        <div class="retsept-chek">
            <div>
                <PechatLogo />
            </div>
            <div class="BayonotChild">
                <PechatBemorData 
                    :datas="datas"
                    :date="datas.data.date_doctor"
                    :name="datas.data.reg_doctor_category[0].name"
                    :doctor_name="datas.data.doctor.name"
                />
            </div>
            <div>
                <div class="table-style">
                    <table class="table table-sm table-bordered">
                        <thead id="head">
                            <tr>
                                <th>№</th>
                                <th>Таблетки</th>
                                <th>День</th>
                                <th>Раз(а) день</th>
                                <th>Дополнения</th>
                            </tr>
                        </thead>
                        <tbody class="BayonotThead">
                            <tr v-for="(item, index) in datas.data.registration_recipe">
                                <td>{{ index+1 }}</td>
                                <td>{{ item.name }}</td>
                                <td>{{ item.day }}</td>
                                <td>{{ item.time }}</td>
                                <td>
                                    <div class="multiline-text">
                                        {{ item.comment }}
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div>
                <PechatFooter />
            </div>
        </div>
    </div>
</template>

<script>
import PechatBemorData from './Components/PechatBemorData.vue';
import PechatFooter from './Components/PechatFooter.vue';
import PechatLogo from './Components/PechatLogo.vue';
export default {
    components: {
    PechatLogo,
    PechatBemorData,
    PechatFooter
},
    data(){
        return {
            datas: {}
        }
    },
    created(){
        this.datas = JSON.parse(localStorage.getItem("Retsept"))
        this.print()
    },
    methods:{
        print(){
            setTimeout(() => {
                window.print()
                localStorage.removeItem("Retsept")
                // this.$router.push({ path: "/user" });
                setTimeout(() => {
                    window.close()
                }, 1000)
            }, 2000)
        }
    }
}
</script>
<style lang="scss">
.retsept-chek{
    width: 917px;
    padding: 30px 10px;
    margin: 0 auto;
    // padding: ;

}
.table-style{
    padding-top: 20px;
    padding-bottom: 20px;
}
.multiline-text {
  white-space: pre-line;
}
#head th{
  background: #d6d5d5 !important;
  color: #000 !important;
  border: 1px solid #000 !important;
}
.BayonotThead td{
  border: 1px solid #000 !important;
  color: #000 !important;
  font-size: 16px;
  font-weight: 500;
}
.BayonotChild {
//   display: flex;
  margin-top: 20px;
  /* border: none !important; */
}
</style>