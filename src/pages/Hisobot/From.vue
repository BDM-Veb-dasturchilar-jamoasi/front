<template>
  <div class="Parent">
    <div class="Hisobotlar">
      <div
        class="HisobotCild"
        v-if="
          localUser.role == 'Admin' ||
            localUser.role == 'Dasturchi' ||
            localUser.role == 'Shifokor' ||
            localUser.role == 'Kasser'
        "
      >
        <label>{{ $t("Шифокор ҳисобот") }}</label>
        <div>
          <sidebar-link
            v-if="
              localUser.role == 'Admin' ||
                localUser.role == 'Dasturchi' ||
                localUser.role == 'Kasser'
            "
            to="/doctor-hisobot"
          >
            <p>{{ $t("Шифокор ҳисобот") }}</p>
          </sidebar-link>
          <sidebar-link target="_blank" to="/doctor_sverka">
            <p>{{ $t("Шифокор Сверка") }}</p>
          </sidebar-link>

          <sidebar-link target="_blank" to="/patient-count">
            <p>{{ $t("Кўриклар сони") }}</p>
          </sidebar-link>

          <!-- <sidebar-link to="/shif/oper/son">
            <p>{{ $t("Шиф Операция сони") }}</p>
          </sidebar-link>

          <sidebar-link target="_blank" to="/shif/oper/son/sverka">
            <p>{{ $t("Шиф Операция сони сверка") }}</p>
          </sidebar-link> -->
        </div>
      </div>
      <div
        class="HisobotCild"
        v-if="
          localUser.role == 'Admin' ||
            localUser.role == 'Dasturchi' ||
            localUser.role == 'Shifokor' ||
            localUser.role == 'Kasser'
        "
      >
        <label>{{ $t("Ҳодим ҳисобот") }}</label>
        <div>
          <sidebar-link
            v-if="
              localUser.role == 'Admin' ||
                localUser.role == 'Dasturchi' ||
                localUser.role == 'Kasser'
            "
            to="/hodim-hisobot"
          >
            <p>{{ $t("Ҳодим ҳисобот") }}</p>
          </sidebar-link>
          <sidebar-link target="_blank" to="/tolovlar">
            <p>{{ $t("Тўловлар") }}</p>
          </sidebar-link>

          <!-- <sidebar-link to="/shif/oper/son">
            <p>{{ $t("Шиф Операция сони") }}</p>
          </sidebar-link>

          <sidebar-link target="_blank" to="/shif/oper/son/sverka">
            <p>{{ $t("Шиф Операция сони сверка") }}</p>
          </sidebar-link> -->
        </div>
      </div>
      <div
        class="HisobotCild"
        v-if="
          localUser.role == 'Admin' ||
          localUser.role == 'Dasturchi' ||
          localUser.role == 'Loborant' ||
          localUser.role == 'Kasser'
        "
      >
        <label>{{ $t("Текширув ҳисобот") }}</label>
        <sidebar-link
          to="/inspection_hisobot"
          v-if="
            localUser.role == 'Admin' ||
            localUser.role == 'Dasturchi' ||
            localUser.role == 'Kasser' ||
            localUser.role == 'Registrator'
          "
        >
          <p>{{ $t("Текширув ҳисобот") }}</p>
        </sidebar-link>
        <sidebar-link
          to="/inspection_sverka"
          target="_blank"
          v-if="
            localUser.role == 'Admin' ||
            localUser.role == 'Dasturchi' ||
            localUser.role == 'Kasser' ||
            localUser.role == 'Registrator'
          "
        >
          <p>{{ $t("Текширув сверка") }}</p>
        </sidebar-link>
        <sidebar-link
          to="/tekshiruvchi_hisobot"
          v-if="
            localUser.role == 'Admin' ||
            localUser.role == 'Dasturchi' ||
            localUser.role == 'Kasser' ||
            localUser.role == 'Loborant' ||
            localUser.role == 'Registrator'
          "
        >
          <p>{{ $t("Текширувчи ҳисобот") }}</p>
        </sidebar-link>
        <sidebar-link
          target="_blank"
          to="/tekshiruvchi_sverka"
          v-if="
            localUser.role == 'Admin' ||
            localUser.role == 'Dasturchi' ||
            localUser.role == 'Kasser' ||
            localUser.role == 'Loborant' ||
            localUser.role == 'Registrator'
          "
        >
          <p>{{ $t("Текширувчи сверка") }}</p>
        </sidebar-link>
      </div>
      <div
        v-if="
          localUser.role == 'Admin' ||
            localUser.role == 'Dasturchi' ||
            localUser.role == 'Kasser'
        "
        class="HisobotCild"
      >
        <label>{{ $t("Касса ҳисобот") }}</label>
        <!-- <sidebar-link
          to="/kassa-hisobot"
        >
          <p>Kassa Hisobot</p>
        </sidebar-link> -->

        <sidebar-link 
          target="_blank" 
          to="/kassa-sverka"
        >
          <p>{{ $t("Касса Сверка") }}</p>
        </sidebar-link>
        <sidebar-link target="_blank" to="/koriklar">
          <p>{{ "Куриклар" }}</p>
        </sidebar-link>
      </div>
      <!-- <div class="HisobotCild" 
        v-if="
          localUser.role == 'Admin' ||
            localUser.role == 'Dasturchi' ||
            localUser.role == 'Shifokor' ||
            localUser.role == 'Kasser'
        ">
        <label>{{ $t("Шифокор кўриги") }}</label>
        <sidebar-link
          to="/kassa-hisobot"
        >
          <p>Kassa Hisobot</p>
        </sidebar-link>

        <sidebar-link target="_blank" to="/patient-count">
          <p>{{ $t("Кўриклар сони") }}</p>
        </sidebar-link>
      </div> -->

      <!-- <div
        class="HisobotCild"
        v-if="
          localUser.role == 'Admin' ||
            localUser.role == 'Dasturchi' ||
            localUser.role == 'Kasser' ||
            localUser.role == 'Registrator'
        "
      >
        <label>{{ $t("Стационар ҳисобот") }}</label>
        <sidebar-link target="_blank" to="/statsionar/hisobot">
          <p>{{ $t("Стационар ҳисобот") }}</p>
        </sidebar-link>

        <sidebar-link target="_blank" to="/statsionar/sverka">
          <p>Стационар Сверка</p>
        </sidebar-link>
        <sidebar-link target="_blank" to="/patient-count-palata">
          <p>Стационар шиф хисобот</p>
        </sidebar-link>
      </div> -->
    </div>
    <div class="Hisobotlar">
      <!-- <div
        class="HisobotCild"
        v-if="
          localUser.role == 'Admin' ||
            localUser.role == 'Dasturchi' ||
            localUser.role == 'Kasser'
        "
      >
        <label>{{ $t("Операция ҳисобот") }}</label>
        <div>
          <sidebar-link to="/surgery/hisobot">
            <p>{{ "Операция ҳисобот" }}</p>
          </sidebar-link>
          <sidebar-link target="_blank" to="/surgery/sverka">
            <p>{{ "Операция Сверка" }}</p>
          </sidebar-link>
          <sidebar-link to="/surgery/qoshimcha/hisobot">
            <p>{{ "Қошимчалар ҳисобот" }}</p>
          </sidebar-link>
          <sidebar-link target="_blank" to="/surgery/qoshimcha/sverka">
            <p>{{ "Қошимчалар Сверка" }}</p>
          </sidebar-link>
        </div>
      </div> -->
      <div
        class="HisobotCild"
        v-if="
          localUser.role == 'Admin' ||
            localUser.role == 'Dasturchi' ||
            localUser.role == 'Kasser'
        "
      >
        <label>{{ $t("Напровитель ҳисобот") }}</label>
        <div>
          <sidebar-link
            to="/direct_hisobot"
          >
            <p>{{ $t("Напровитель ҳисобот") }}</p>
          </sidebar-link>
          <sidebar-link target="_blank" to="/direct_sverka">
            <p>{{ $t("Напровитель Сверка") }}</p>
          </sidebar-link>
        </div>
      </div>
      <div
        class="HisobotCild"
        v-if="
          localUser.role == 'Admin' ||
            localUser.role == 'Dasturchi' ||
            localUser.role == 'Kasser'
        "
      >
        <label>{{ $t("Вакил ҳисобот") }}</label>
        <div>
          <sidebar-link
            v-if="
              localUser.role == 'Admin' ||
                localUser.role == 'Dasturchi' ||
                localUser.role == 'Kasser'
            "
            to="/med/direct/hisobot"
          >
            <p>{{ $t("Вакил ҳисобот") }}</p>
          </sidebar-link>
          <sidebar-link target="_blank" to="/direct_sverka">
            <p>{{ $t("Вакил Сверка") }}</p>
          </sidebar-link>
        </div>
      </div>
      <div
        class="HisobotCild"
        v-if="
          localUser.role == 'Admin' ||
            localUser.role == 'Dasturchi' ||
            localUser.role == 'Kasser'
        "
      >
        <label>{{ $t("Поставщик ҳисобот") }}</label>
        <div>
          <sidebar-link to="/provayder/hisobot">
            <p>{{ $t("Поставщик ҳисобот") }}</p>
          </sidebar-link>
          <sidebar-link target="_blank" to="/direct_sverka">
            <p>{{ $t("Поставщик Сверка") }}</p>
          </sidebar-link>
        </div>
      </div>
      <div
        class="HisobotCild"
        v-if="
          localUser.role == 'Admin' ||
            localUser.role == 'Dasturchi' ||
            localUser.role == 'Kasser'
        "
      >
        <label>{{ $t("Махсулот ҳисобот") }}</label>
        <div>
          <sidebar-link to="reagent/hisobot">
            <p>{{ $t("Махсулот ҳисобот") }}</p>
          </sidebar-link>
          <sidebar-link target="_blank" to="/Reagent/sverka">
            <p>{{ $t("Махсулот Сверка") }}</p>
          </sidebar-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      localUser: JSON.parse(localStorage.getItem("user"))
    };
  }
};
</script>
<style scoped>
.Parent {
  height: calc(100vh - 90px);
}
.Hisobotlar {
  margin-top: 10px 20px;
  display: flex;
  justify-content: center;
}
.HisobotCild {
  background-color: hsla(0, 0%, 66.7%, 0.38823529411764707);
  width: 250px;
  margin: 10px;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0px 0px 2px rgb(209, 206, 206);
  /* padding: 5px 10px; */
}
.HisobotCild label {
  font-weight: 700;
  color: #195fb0;
  border-bottom: 1px solid #a7c3db;
  width: 100%;
  padding: 5px 10px;
}
/* .HisobotCild div {
  align-items: center;
} */
.HisobotCild .md-ripple {
  text-align: center;
  padding: 0px;
}
.HisobotCild p {
  color: #195fb0;
  font-family: sans-serif;
  font-style: italic;
  font-weight: 500;
  font-size: 16px;
  align-items: center;
  text-transform: capitalize;
  text-indent: 20px;
  transition: color 0.5s ease-in-out;
}
.HisobotCild p:hover {
  color: red;
}
</style>
