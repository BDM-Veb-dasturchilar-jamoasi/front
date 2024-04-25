<template>
  <div id="pechat">
    <ul class="content">
      <ul
        v-for="(item, index) in Tolov.doctor"
        :key="index"
        class="data-loop"
      >
        <div class="logo-style">
          <img src="../../../public/logo.svg">
        </div>
         
        <ul class="bemor-data mt-3">
          <li>
            Чек № {{ Tolov.id }}
          </li>
          <li class="izoh-style">Бемор</li>
          <li class="text-style">
            {{ BemorName.fullname }}
          </li>
          <li class="text-style" v-if="BemorName.birthday">
            {{ BemorName.birthday | Birthday }} й
          </li>
          <li class="text-style" v-if="BemorName.phone">
            📞: {{ BemorName.phone }}
          </li>
        </ul>
        <ul
          class="bemor-data mt-4 mb-4"
        >
          <li class="doctor-name text-style-nav">{{ item.user['user_name'] }}</li>
          <li class="xona-raqam text-style-nav">{{ item.room.name }}</li>
          <li class="navbat-raqam text-style-nav">Навбат: {{ item.number }}</li>
        </ul>
        <ul>
          <li class="items-p">
            <b class="item-price">Сумма:</b>
            <b class="item-price">{{ item.price | numFormat }}</b>
          </li>

          <li class="items-p">
            <b class="item-price">Тўланган cумма:</b>
            <b class="item-price">{{ item.pay_summa | numFormat }}</b>
          </li>

          <li class="items-p">
            <b class="item-price">Қарздорлик:</b>
            <b class="item-price">{{ item.backlog | numFormat }}</b>
          </li>

          <li class="items-p mt-3">
            <b class="item-price">Ходим:</b>
            <b class="item-price">{{ localUser.user_name }}</b>
          </li>

          <li class="items-p">
            <b class="item-price">Сана:</b>
            <b class="item-price">{{ Sana | momentH }}</b>
          </li>
        </ul>
      </ul>


      <ul
        v-for="(item, index) in Tolov.inspection"
        :key="index"
        class="data-loop"
      >
        <div class="logo-style">
          <img src="../../../public/logo.svg">
        </div>
        
        <ul class="bemor-data mt-3">
          <li>
            Чек № {{ Tolov.id }}
          </li>
          <li class="izoh-style">Бемор</li>
          <li class="text-style">
            {{ BemorName.fullname }}
          </li>
          <li class="text-style" v-if="BemorName.birthday">
            {{ BemorName.birthday | Birthday }} й
          </li>
          <li class="text-style" v-if="BemorName.phone">
            📞: {{ BemorName.phone }}
          </li>
        </ul>
        <ul
          class="bemor-data mt-4 mb-4"
        >
          <li class="doctor-name text-style-nav">{{ item.user['user_name'] }}</li>
          <li class="xona-raqam text-style-nav">{{ item.room.name }}</li>
          <li class="navbat-raqam text-style-nav">Навбат: {{ item.number }}</li>
        </ul>
        <ul>
          <li class="items-p">
            <b class="item-price">Сумма:</b>
            <b class="item-price">{{ item.price | numFormat }}</b>
          </li>

          <li class="items-p">
            <b class="item-price">Тўланган cумма:</b>
            <b class="item-price">{{ item.pay_summa | numFormat }}</b>
          </li>

          <li class="items-p">
            <b class="item-price">Қарздорлик:</b>
            <b class="item-price">{{ item.backlog | numFormat }}</b>
          </li>

          <li class="items-p mt-3">
            <b class="item-price">Ходим:</b>
            <b class="item-price">{{ localUser.user_name }}</b>
          </li>

          <li class="items-p">
            <b class="item-price">Сана:</b>
            <b class="item-price">{{ Sana | momentH }}</b>
          </li>
        </ul>
      </ul>

      <ul>
        <div v-if="Tolov.operatsiya.length != 0">

          <ul class="tek-satlovha">Операция</ul>

          <ul v-for="(item, index) in Tolov.operatsiya" :key="index">
            <li class="items-p">
              <b class="item-price">{{ 1 + index }}. {{ item.name }}</b>
              <b class="item-price">{{ item.price | numFormat }}</b>
            </li>
            <ul v-for="(itemQ, ind) in  item.surgery_doctor" :key="ind">
              <li class="items-p" style="margin-left: 10px;">
                <b class="item-price">{{ 1 + ind }}. {{ itemQ.name }}</b>
                <b class="item-price">{{ itemQ.price | numFormat }}</b>
              </li>
            </ul>
          </ul>
          </div>

          <!-- palata -->
          <div v-if="Tolov.palata.length != 0">

          <ul class="tek-satlovha">Палата</ul>

          <ul v-for="(item, index) in Tolov.palata" :key="index">
          <li class="items-p">
            <b class="item-price">{{ item.palatas.name }}</b>
            <b class="item-price">{{ item.price | numFormat }}</b>
          </li>
          <li class="items-p">
            <b class="item-price">Кун</b>
            <b class="item-price">{{ item.day }} </b>
          </li>
          <li class="items-p">
            <b class="item-price">Жами</b>
            <b class="item-price"> {{ item.total_price | numFormat }}</b>
          </li>
          </ul>
          </div>
          <!-- palata tugadi -->
        </ul>
      <ul>
        <ul class="tek-satlovha">Тўлов</ul>
        <ul>
          <li class="items-p">
            <b class="item-price">Умумий сумма:</b>
            <b class="item-price">{{ Tolov.summa | numFormat }}</b>
          </li>
          <li class="items-p">
            <b class="item-price">Скидка:</b>
            <b class="item-price">{{ Tolov.discount | numFormat }}</b>
          </li>
          <li class="items-p">
            <b class="item-price">Тўланган сумма:</b>
            <b class="item-price">{{ Tolov.pay_summa | numFormat }}</b>
          </li>
          <li class="items-p">
            <b class="item-price">Қарздорлик:</b>
            <b class="item-price">{{ Tolov.backlog | numFormat }}</b>
          </li>
        </ul>
      </ul>
    </ul>
  </div>
</template>
<script>
import moment from "moment";
export default {
name: "Print",
data() {
  return {
    BemorName: null,
    dataTolov: null,
    Tolov: null,
    Navbat: null,
    localUser: JSON.parse(localStorage.getItem("user")),
    Sana: new Date().getTime(),
    Statsionar: null,
  };
},
filters: {
  Birthday: function (date) {
    if (date) {
      return moment.unix(date).format("YYYY");
    } else {
      return "";
    }
  },
  momentH: function (date) {
    if (date) {
      return moment.unix(date / 1000).format("DD MM YYYY-HH:mm");
    } else {
      return "";
    }
  }
},
created() {
  this.BemorName = JSON.parse(localStorage.getItem("BemorName"));
  this.dataTolov = JSON.parse(localStorage.getItem("ChekTolov"));
  console.log(this.dataTolov)
  this.NavbatChek()
  // localStorage.removeItem("ChekTolov");
  // localStorage.removeItem("BemorName");
  
},
methods: {
  NavbatChek(){
    let self = this;
    axios({
      method: "get",
      url: "/registration/pechat/" + self.$route.params.id
    }).then(res => {
      if(res){
        if(self.dataTolov.doctor.length > 0){
          self.dataTolov.doctor.forEach(el => {
            res.data.forEach(n => {
              if(n.user.doctor_id == el.doctor_id){
                el.number = n.number
                el.room = n.room
                el.user = n.user
              }
            })
          })
        }
        if(self.dataTolov.inspection.length > 0){
          self.dataTolov.inspection.forEach(el => {
            res.data.forEach(n => {
              if(n.user.id == el.user_id){
                el.number = n.number
                el.room = n.room
                el.user = n.user
              }
            })
          })
        }
        self.Navbat = res.data;
        self.Tolov = self.dataTolov
        console.log(res.data)
        // setTimeout(() => {
        //   window.print();
        //   setTimeout(() => {
        //     window.close();
        //   }, 3000);
        // }, 1000);
      }
    });
  }
},
mounted() {
  
}
};
</script>
<style>
@media print, screen {
  @page {
      size: 0 !important;
      margin: 0 !important;
      padding: 0 !important;
  }
}
li{
  padding: 1px 0px !important;
  line-height: 20px !important;
  letter-spacing: -2px;
}
ul{
  padding: 1px 0px !important;
  line-height: 0px !important;
  margin: 4px 0px;
  letter-spacing: -1.5px;
}
#pechat {
  padding: 0 !important;
  margin: 0px !important;

  /* border: 1px solid red; */
  /* border: 1px solid red; */
  /* size: 80mm auto; */
}
.izoh-style{
  font-size: 26px !important;
  font-weight: 600;
}
.content {
  font-family: 'Times New Roman';
  width: 405px;
  padding: 0px 10px !important;
  /* margin: 0px auto; */
}
.data-loop{
  padding-top: 20px;
  padding-bottom: 20px;
  /* border: 1px solid red; */
  page-break-after: always;
  page-break-inside: always;
}
.logo-style{
  width: 200px;
  margin: 0 auto;
}
.bemor-data {
  font-size: 30px;
  font-weight: 500;
  text-align: center;
}
.text-style {
  line-height: 28px !important;
  font-weight: 500;
  letter-spacing: -2px;
}
.text-style-nav {
  line-height: 28px !important;
  letter-spacing: -2px;
}
.doctor-name {
  font-size: 26px;
}
.xona-raqam {
  font-size: 32px;
  font-weight: 600;
}
.navbat-raqam {
  font-size: 45px;
  font-weight: 600;
}
.tek-satlovha{
  font-size: 26px;
  margin-top: 20px !important;
  letter-spacing: -1px;
  list-style: none;
  line-height: 30px;
  display: flex;
  justify-content: center;
  /* padding: 0px !important; */
  font-weight: 700;
  text-align: center;
}
.items-p {
  display: flex;
  font-size: 26px;
  justify-content: space-between;
}
.item-price{
  line-height: 24px;
  font-weight: 400 !important;
}
</style>