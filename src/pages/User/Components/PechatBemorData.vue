<template>
    <div>
        <div style="width: 100%; border-top: -20px;">
          <table
            class="table table-sm table-bordered table-chek"
            style="display: grid; grid-template-columns: repeat(2,1fr);"
          >
            <div 
              style=" width: 100%;"  
            >
              <tr >
                <td class="td-one">
                  <b class="familya">
                      Пациент:
                  </b>
                </td>
                <td class="td-one">
                  <div class="data-bemor-chek">{{ datas.birthday | moment }}</div>
                </td>
                <td style="width: 66%;">
                  <span class="data-bemor-chek">{{
                    datas.name
                  }}</span>
                </td>
              </tr>
              <tr style="display: flex;">
                <td style="width: 20%;" colspan="2" class="td-two">
                  <b class="familya">
                      Дата :
                  </b>
                </td>
                <td style="width: 80%;">
                  <span class="data-bemor-chek"> {{ date | momentDate }}</span>
                  
                </td>
              </tr>
            </div>
            <div style=" width: 100%;">
              <tr v-if="bolim"  style="display: flex;">
                <td style="width: 20%;" colspan="2" class="td-two">
                  <b class="familya">
                      Отдел:
                  </b>
                </td>
                <td style="width: 80%;">
                  <span class="data-bemor-chek"> {{ bolim }}</span>
                  
                </td>
              </tr>
              <tr v-if="doctor_name" style="display: flex;">
                <td style="width: 20%;" colspan="2" class="td-two">
                  <b class="familya">
                      Врач:
                  </b>
                </td>
                <td style="width: 80%;">
                  <span class="data-bemor-chek"> {{ doctor_name }}</span>
                  
                </td>
              </tr>
            </div>
          </table>
        </div>
    </div>
</template>
<script>
import moment, { unix } from "moment";
export default {
    props: ["datas", "date", "name", "bolim", "doctor_name"],
    data() {

    },
    filters: {
        momentSS: function(date) {
        if (date) {
            let d = new Date(date * 1000);

            let options = {
            weekday: "short",
            day: "2-digit",
            month: "long",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            hour12: true
            };

            return d.toLocaleString("ru-RU", options);
        } else {
            return "";
        }
        },
        moment: function(date) {
        if (date) {
            return moment.unix(date).format("DD.MM.YYYY");
        } else {
            return "";
        }
        },
        momentDate: function(date) {
        if (date) {
            let x = moment(new Date(date).getTime()).format("DD.MM.YYYY HH:mm");
            return x;
        } else {
            return "";
        }
        },
        yoshniAniqlash: function(data) {
        if (data) {
            let yil = parseInt(moment.unix(data).format("YYYY"));
            let joriyYil = new Date().getFullYear();
            return joriyYil - yil;
        } else {
            return "";
        }
        }
    },

}
</script>
<style>
.familya {
  /* background: rgb(70, 112, 250) !important; */
  /* display: flex; */
  /* text-align: center; */
  /* width: 300px; */
  font-size: 16px !important;
}
.data-bemor-chek{
  font-size: 16px;
  font-weight: 600;
}
.table-chek td{
  padding: 0px 7px  !important;
  border: 1px solid #000 !important;
}
.td-two{
  width: 204px;
  background: #d6d5d5 !important;
}
.td-one{
  width: 110px;
  background: #d6d5d5 !important;
}
</style>