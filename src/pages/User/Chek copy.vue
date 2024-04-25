<template>
    <div id="content">
  
      <div class="content-data">

        <div v-if="!Tolov.navbat">
          <div class="logo-style pt-4">
            <img style="width: 160px; margin: auto;" src="../../../public/logo2.svg">
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

          <div v-if="Tolov.regDoctor.length != 0">
            <ul class="tek-satlovha">Шифокор</ul>
            <ul v-for="(item, index) in Tolov.regDoctor" :key="index">
              <li class="items-p">
                <b class="item-price">{{ 1 + index }}. 
                  <!-- {{ item.doctor.doctor_category.name }}:  -->
                  {{ item.doctor.name }}
                </b>
                <b class="item-price"> </b>
              </li>
              <ul v-for="(itemQ, ind) in  item.reg_doctor_category" :key="ind">
                <li class="items-p" style="margin-left: 10px;">
                  <b class="item-price">{{ 1 + ind }}. {{ itemQ.name }}</b>
                  <b class="item-price">{{ itemQ.price | numFormat }}</b>
                </li>
              </ul>
            </ul>
          </div>
  
          <div v-if="Tolov.regInspection.length != 0">
            <ul class="tek-satlovha">Текширув</ul>
  
            <ul v-for="(item, index) in Tolov.regInspection" :key="index">
              <li class="items-p">
                <b class="item-price">{{ 1 + index }}. {{ item.inspection.name }}</b>
                <b class="item-price">{{ item.price | numFormat }}</b>
              </li>
            </ul>
          </div>
  
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
            <li class="items-p mt-3">
              <b class="item-price">Ходим:</b>
              <b class="item-price">{{ localUser.user_name }}</b>
            </li>
    
            <li class="items-p">
              <b class="item-price">Сана:</b>
              <b class="item-price">{{ Sana | momentH }}</b>
            </li>
          </ul>
        </div>

        <!-- shifokor -->
        <div v-if="Tolov.doctor.length != 0 && Tolov.navbat">
          <ul
            v-for="(item, index) in Tolov.doctor"
            :key="index"
            class="data-loop"
          >
            <div class="logo-style">
              <img style="width: 160px;" src="../../../public/logo2.svg">
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
              <li class="navbat-raqam">Навбат: {{ item.number }}</li>
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

        </div>
        <!-- shifokor tugadi -->

        <!-- tekshiruv -->
        <div v-if="Tolov.inspection.length != 0 && Tolov.navbat">
          <ul
            v-for="(item, index) in Tolov.inspection"
            :key="index"
            class="data-loop"
          >
          <!-- {{ Tolov.inspection }} -->
            <div class="logo-style">
              <img style="width: 160px;" src="../../../public/logo2.svg">
            </div>
            <ul
              class="bemor-data mt-4 mb-4"
            >
              <li class="navbat-raqam">Навбат: {{ item.number }}</li>
              <li class="xona-raqam text-style-nav">{{ item.room.name }}</li>
              <li class="doctor-name text-style-nav">{{ item.user['user_name'] }}</li>
            </ul>
            <ul class="bemor-data mt-3">
              <!-- <li>
                Чек № {{ Tolov.id }}
              </li> -->
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
            
              <div style="display: flex;   font-size: 20px; text-align: center; " v-for=" ( a  , index) in item.nomi " >
                <li v-if="item.user_id == a.user_id" style=" width: 5%; border: 1px solid black;">{{ index + 1 }}</li>
                <li style=" width: 65%; border: 1px solid black;  list-style: 2;" v-if="item.user_id == a.user_id">{{ a.name }}</li>
                <li style="width: 30%; border: 1px solid black;" v-if="item.user_id == a.user_id">{{ a.price | numFormat }}</li>
              </div>
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

          <!-- <ul v-for="(item, index) in Tolov.inspection" :key="index">
            <li class="items-p">
              <b class="item-price">{{ 1 + index }}. {{ item.inspection.name }}</b>
              <b class="item-price">{{ item.price | numFormat }}</b>
            </li>
          </ul> -->
        </div>
        <!-- tekshiruv tugadi -->
    </div>
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
  this.NavbatChek()
  localStorage.removeItem("ChekTolov");
  localStorage.removeItem("BemorName");
  
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
          for (let index = 0; index < self.dataTolov.doctor.length; index++) {
            const el = self.dataTolov.doctor[index];
            let ind = res.data.findIndex(x => x.user.doctor_id == el.doctor_id);
            // res.data.forEach(n => {
              if(ind !== -1) {
                let n = res.data[ind]
                el.number = n.number
                el.room = n.room
                el.user = n.user
                el.status = n.status
              } else if(el.status != 'waiting' || ind === -1) {
                self.dataTolov.doctor.splice(index, 1)
              }
            // })
          }
        }
        if(self.dataTolov.inspection.length > 0){
          for (let index = 0; index < self.dataTolov.inspection.length; index++) {
            const el = self.dataTolov.inspection[index];
            let ind = res.data.findIndex(x => x.user.id == el.user_id);
            // res.data.forEach(n => {
              if(ind !== -1) {
                let n = res.data[ind]
                el.number = n.number 
                el.room = n.room
                el.user = n.user
                el.status = n.status
              } else if(el.status != 'waiting' || ind === -1) {
                self.dataTolov.inspection.splice(index, 1)
              }
            // })
          }
        }
        self.Navbat = res.data;
        self.Tolov = self.dataTolov
        setTimeout(() => {
          window.print();
          setTimeout(() => {
            window.close();
          }, 1000);
        }, 1000);
      }
    });
  }
},
mounted() {
  
}
};
</script>
<style scoped>
@media print, screen{
    @page {
        size: 0 !important;
        margin: 0 !important;
        padding: 0 !important;
    }
  }
#content {
  width: 405px;
  padding: 0 !important;
  margin: 0px !important;
  font-family: 'Times New Roman', Times, serif;
  /* border: 1px solid red; */
  /* border: 1px solid red; */
  /* size: 80mm auto; */
}
.content-data{
  margin: 0px auto;
  padding: 0 10px;
}
#content ul{
  padding: 1px 0px !important;
  /* line-height: 0px !important; */
  margin: 4px 0px;
  letter-spacing: -1.5px;
}
#content li{
  padding: 1px 0px !important;
  /* line-height: 20px !important; */
  letter-spacing: -2px;
}
.data-loop{
  padding-top: 20px;
  padding-bottom: 20px;
  /* border: 1px solid red; */
  /* page-break-before: avoid; */
  page-break-after: always;
  /* page-break-inside: always; */
}
/* .chek-matin-izoh{
  font-size: 16px;
  line-height: 10px;
} */
.items-p {
  display: flex;
  font-weight: 300;
  font-size: 26px;
  justify-content: space-between;
}
.item-price{
  line-height: 27px;
}
.bemor-name{
  margin: 10px 0;
  font-weight: 400;
  line-height: 20px;
  font-size: 18px;
}
.logo-style{
  width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
}
.bemor-data {
  font-size: 30px;
  font-weight: 500;
  text-align: center;
}
.izoh-style{
  font-size: 26px !important;
  font-weight: 600;
}
.text-style {
  line-height: 28px !important;
  font-weight: 500;
  letter-spacing: -2px;
}
.text-style-nav {
  line-height: 32px !important;
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
  line-height: 40px;
  font-weight: 600;
}
.tek-satlovha{
  font-size: 20px;
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
.qr-style{
  display: flex;
  margin-top: 10px;
  width: 100%;
  align-items: center;
}
.qr-img{
  display: flex;
  justify-content: center;
  margin: 0 auto;
  width: 180px;
}

.matin {
  display: inline-block;
  white-space: nowrap;
  /* width: 300px; */
  overflow: hidden;
  text-overflow: ellipsis;
}

ul {
  list-style: none;
  /* border-bottom: 1px dotted; */
  text-align: left;
  padding: 0;
  margin: 0;
  font-size: 16px;
  color: black;
}

h5 {
  font-weight: bold;
  font-size: 16px;
  color: black;
}


li {
  padding: 3px 0px;
}

/* b , h5 , h4 , span{
  font-size: 50px;
  line-height: 3;
} */
</style>