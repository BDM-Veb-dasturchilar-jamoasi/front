<template>
  <div>
    <md-card>
      <div v-if="$route.name == 'Registration Archive'" class="katta-arxiv">
        <span>Бемор</span>
        <button
          style="padding: 4px 10px; margin-right: 10px"
          class="btn"
          @click="Prev()"
        >
          <b-icon style="color: white" icon="house-door-fill"> </b-icon>
        </button>
      </div>
      <md-card-content>
        <b-container fluid>
          <b-row class="qidiruv">
            <b-col class="mb-2" style="display: flex;">
              <!-- <b-button
                style="margin-right: 20px;"
                class="qoshishBtn"
                variant="primary"
                @click="createRoomLink"
              >
                <span>
                  <b-icon icon="plus-circle-fill" color="#fff"></b-icon>
                  Қўшиш
                </span>
              </b-button> -->
              <b-button class="qoshishBtn" variant="primary" @click="data">
                <span>
                  <b-icon icon="arrow-counterclockwise" color="#fff"></b-icon>
                  Янгилаш
                </span>
              </b-button>
            </b-col>

            <b-col lg="7" class="mb-1">
              <b-form-group
                label-for="filter-input"
                label-cols-sm="1"
                label-align-sm="right"
                label-size="sm"
                class="mb-0"
              >
                <b-input-group size="sm">
                  <b-form-input
                    id="filter-input"
                    v-model="filter"
                    type="search"
                    @input="Data()"
                    placeholder="Қидирув"
                  ></b-form-input>

                  <b-input-group-append>
                    <b-button
                      :disabled="!filter"
                      variant="danger"
                      @click="filter = ''"
                      >Тозалаш</b-button
                    >
                  </b-input-group-append>
                </b-input-group>
              </b-form-group>
            </b-col>
          </b-row>
          <!-- User Interface controls -->
          <b-row class="qidiruv">
            <b-col class="mb-2"> </b-col>

            <!-- <b-col lg="7 mb-2">
              <b-form-group
                label-for="filter-input"
                label-cols-sm="1"
                label-align-sm="right"
                label-size="sm"
                class="mb-0"
              >
                <b-input-group size="sm">
                  <b-form-input
                    id="filter-input"
                    v-model="filter"
                    type="search"
                    placeholder="Қидирув"
                  ></b-form-input>

                  <b-input-group-append>
                    <b-button
                      :disabled="!filter"
                      variant="danger"
                      @click="filter = ''"
                      >Тозалаш</b-button
                    >
                  </b-input-group-append>
                </b-input-group>
              </b-form-group>
            </b-col> -->
          </b-row>

          <div class="tables">
            <b-table
              ref="refUserTable"
              hover
              sticky-header
              striped
              primary-key="id"
              :items="items"
              :fields="translatedFields"
              :per-page="perPage"
              :current-page="currentPage"
              :sort-by.sync="sortBy"
              :sort-desc.sync="sortDesc"
              :sort-direction="sortDirection"
              @row-clicked="RowClicked"
              sort-icon-left
              stacked="md"
              show-empty
              small
            >
              <template #cell(№)="data" style="text-align: center;">
                {{ data.index + 1 }}
              </template>
              <template #cell(actions)="row" class="lg-1">
                <b-row class="ml-1">
                  <section
                    style="display: flex; justify-content: flex-end; width: 100%; margin-right: 30px"
                  >
                    <div style="display: flex; margin-right: 15px">
                      <b-button
                        variant="outline-primary"
                        @click="xonalarLink(row.item.id)"
                        class="pencil"
                      >
                        <b-icon
                          style="width: 15px;"
                          variant="outline-primary"
                          icon="pencil-fill"
                          aria-hidden="true"
                        ></b-icon>
                      </b-button>
                    </div>
                    <!-- <div>
                      <b-button
                        class="trash"
                        style=""
                        variant="outline-danger"
                        @click="trash(row.item.id)"
                      >
                        <b-icon
                          style="width: 15px;"
                          icon="trash-fill"
                          aria-hidden="true"
                        ></b-icon>
                      </b-button>
                    </div> -->
                  </section>
                </b-row>
              </template>
            </b-table>
          </div>

          <b-row>
            <b-col sm="6" offset-sm="3" md="6" offset-md="3" class="my-1">
              <b-pagination
                v-model="currentPage"
                :total-rows="totalRows"
                :per-page="perPage"
                align="fill"
                size="sm"
                class="my-0"
              ></b-pagination>
            </b-col>
          </b-row>
        </b-container>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
import moment from "moment";
import axios from "axios";
export default {
  name: "UserIndex",
  components: {},
  data() {
    return {
      id: localStorage.getItem("ArxivId"),
      localUser: JSON.parse(localStorage.getItem("user")),
      items: [],
      fields: [
        "№",
        { key: "created_at", label: "Келган вақти", sortable: true },
        { key: "patient.fullname", label: "Бемор", sortable: true },
        { key: "user.user_name", label: "Ходим", sortable: true },
        { key: "actions", label: "" }
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 100,
      sortBy: "",
      sortDesc: false,
      sortDirection: "asc",
      filter: ""
    };
  },
  watch: {
    "$i18n.locale": {
      immediate: true,
      handler() {
        this.updateTranslatedFields();
      }
    }
  },
  mounted() {
    this.updateTranslatedFields();
    this.data();
  },
  methods: {
    updateTranslatedFields() {
      this.translatedFields = this.fields.map(field => {
        return {
          ...field,
          label: this.$t(field.label)
        };
      });
    },
    RowClicked(item) {
      this.$router.push({ path: "/arxivone/" + item.id });
    },
    xonalarLink(id) {
      return this.$router.push({ path: "/arxivone/" + id });
    },
    data() {
      let s = this;
      if (this.id) {
        axios({
          method: "get",
          url: "/registration/patient/" + s.id
        }).then(res => {
          if (res) {
            // this.getAll(res);
            s.items = res.data;
            s.totalRows = s.items.length;
          }
        });
      } else {
        axios({
          method: "get",
          url: "/registration_arxiv/all"
        }).then(res => {
          if (res) {
            // this.getAll(res);
            s.items = res.data.data;
            s.totalRows = s.items.length;
          }
        });
      }
    },
    getAll(res) {
      let s = this;
      let qidiruv = [];
      for (let key of res.data.data) {
        key.created_at = moment(new Date(key.created_at * 1000)).format(
          "DD.MM.YYYY HH:mm"
        );
        if (s.localUser.role == "Shifokor") {
          for (let index = 0; index < key.registration_doctor.length; index++) {
            const element = key.registration_doctor[index];
            if (
              element.doctor_id == s.localUser.doctor_id &&
              Number(key.backlog) == 0
            ) {
              qidiruv.push(key);
              s.totalRows = qidiruv.length;
            }
          }
          s.items = qidiruv;
        } else if (s.localUser.role == "Loborant") {
          for (
            let index1 = 0;
            index1 < key.registration_inspection.length;
            index1++
          ) {
            const element = key.registration_inspection[index1];
            if (element.user_id == s.localUser.id && key.backlog == 0) {
              qidiruv.push(key);
              s.totalRows = qidiruv.length;
            }
          }
          s.items = qidiruv;
        } else if (s.localUser.role == "Kasser") {
          qidiruv.push(key);
          s.items = qidiruv;
        } else if (
          s.localUser.role == "Admin" ||
          s.localUser.role == "Dasturchi" ||
          s.localUser.role == "Registrator"
        ) {
          qidiruv.push(key);
          s.items = qidiruv;
        }
      }
    },
    Prev() {
      // this.$router.go(-1);
      localStorage.removeItem("ArxivId");
      window.close();
      // this.$router.push('/user')
    },

    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    }
    // trash(id) {
    //   const trash = window.confirm(this.$t('Малумотлар ўчирилсинми?'));
    //   if (trash) {
    //     let self = this;
    //     axios({
    //       method: "delete",
    //       url: "/room/delete/" + id
    //     }).then(() => {
    //       self.data();
    //     });
    //   }
    // }
  }
};
</script>
<style>
.tables {
  overflow-y: auto;
  overflow-x: hidden;
  height: 1000px;
}
.navbarBtnDanger-arxiv {
  float: right;
}
.katta-arxiv {
  background: #007bff;
  margin: -10px 15px 10px 15px;
  height: 40px;
  display: flex;
  justify-content: space-between;
  font-size: 20px;
  font-weight: 700;
  line-height: 40px;
  border-radius: 8px;
  color: #fff;
  text-indent: 15px;
  box-shadow: 5px 8px 10px rgba(25, 95, 176, 0.5);
}
.pencil {
  width: 35px;
  height: 35px;
  display: flex;
  background: #fff;
  border: 1px solid #e9f1fa;
  justify-content: center;
  border-radius: 50%;
  align-items: center;
}
.qoshishBtn {
  display: flex;
  border-radius: 8px;
}
.trash {
  background: #fff;
  width: 35px;
  height: 35px;
  display: flex;
  border: 1px solid #fff0f0;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
}
</style>
