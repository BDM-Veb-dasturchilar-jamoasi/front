<template>
  <md-toolbar md-elevation="0" class="md-transparent navbar-top">
    <div class="md-toolbar-row">
      <div class="md-toolbar-section-start">
        <h3 class="md-title">{{ localUser }}</h3>
      </div>
      <div class="md-toolbar-section-end">
        <div class="md-collapse">
          <div class="til-div">
            <div
              class="uz-style"
              @click="tilClick('uz')"
              :class="{ activeTil: $i18n.locale == 'uz' }"
            >
              uz
            </div>
            <div
              @click="tilClick('ru')"
              class="ru-style"
              :class="{ activeTil: $i18n.locale == 'ru' }"
            >
              ru
            </div>
          </div>
          <md-list>
            <md-list-item href="" @click="logout">
              <b-icon
                font-scale="1.5"
                icon="box-arrow-right"
                style="width: 50px;"
              ></b-icon>
              <!-- <i class="material-icons">logout</i> -->
              <!-- <p class="hidden-lg hidden-md">Profile</p> -->
            </md-list-item>
          </md-list>
        </div>
      </div>
    </div>
  </md-toolbar>
</template>

<script>
export default {
  beforeCreate() {
    if (!localStorage.getItem("token")) {
      this.$router.push("/login");
    }
  },
  data() {
    return {
      localUser: JSON.parse(localStorage.getItem("user")).user_name
    };
  },
  methods: {
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    logout() {
      localStorage.removeItem("token");
      this.$router.push("/login");
    },
    tilClick(key) {
      this.$i18n.locale = key; // Switch to French locale
      // this.$store.state.locale = key
    }
  }
};
</script>

<style lang="css" scope>
.navbar-top {
  margin-bottom: 0px;
  height: 25px;
}
.activeTil {
  background: #6f73ff;
  color: #fff;
}
.til-div {
  padding: 5px;
  display: flex;
  font-size: 20px;
  font-weight: 600;
}
.uz-style {
  cursor: pointer;
  border-radius: 10px;
  padding: 2px 7px;
}
.ru-style {
  padding: 2px 7px;
  border-radius: 10px;
  cursor: pointer;
}
.uz-style:hover {
  color: blue !important;
}
.ru-style:hover {
  color: blue !important;
}
</style>
