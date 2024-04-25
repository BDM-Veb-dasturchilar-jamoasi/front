<template>
  <div class="content">
    <md-card>
      <md-card-content>
        <b-container fluid>
          <!-- User Interface controls -->
          <b-row class="qidiruv">
            <b-col class="mb-2" style="display: flex;">
              <b-button
                style="margin-right: 10px;"
                class="qoshishBtn"
                variant="primary"
                @click="createRoomLink"
                v-if="localUser.role != 'Loborant' && localUser.role != 'Shifokor'"
              >
                <span>
                  <b-icon icon="plus-circle-fill" color="#fff"></b-icon>
                  {{ $t("Қўшиш") }}
                </span>
              </b-button>
              <!-- <b-button
                v-if="localUser.role != 'Loborant' && localUser.role != 'Shifokor'"
                class="qoshishBtn"
                @click="KeldiKetdi"
                variant="primary"
              >
                <span>
                  <b-icon icon="arrow-down-up" class="mr-1"></b-icon>
                </span>
                {{ "Келди кетди" }}
              </b-button> -->
              <!-- <b-button v-if="localUser.role != 'Loborant' && localUser.role != 'Shifokor'" style="margin-left: 20px;" class="qoshishBtn" variant="primary" @click="saveDump">
                <span>
                  Baza
                </span>
              </b-button> -->
              <div style="display: flex; width: 300px; justify-content: space-between;">
                <div style="width: 49%;">
                  <input
                    class="form-control ShifokrSverka"
                    type="date"
                    v-model="datas.datetime1"
                  />
                </div>
                <div style="width: 49%;">
                  <input
                    class="form-control ShifokrSverka"
                    type="date"
                    v-model="datas.datetime2"
                  />
                </div>
              </div>
              <div>
                <v-select
                  :options="Filial"
                  :disabled="localUser.role != 'Admin'"
                  style="width: 200px; margin-left: 10px;"
                  v-model="datas.filial_id"
                  :reduce="option => option.id"
                  label="name"
                />
              </div>
              <b-button class="qoshishBtn ml-2" variant="primary" @click="getUser">
                <span>
                  <b-icon icon="arrow-counterclockwise" color="#fff"></b-icon>
                  {{ $t("Янгилаш") }}
                </span>
              </b-button>
              
            </b-col>

            <b-col lg="4" class="mb-1">
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
                    :placeholder="$t('Қидирув')"
                  ></b-form-input>

                  <b-input-group-append>
                    <b-button
                      :disabled="!filter"
                      variant="danger"
                      @click="filter = ''"
                      >{{ $t("Тозалаш") }}</b-button
                    >
                  </b-input-group-append>
                </b-input-group>
              </b-form-group>
            </b-col>
          </b-row>
          <div class="tables">
            <b-table
              ref="refUserTable"
              hover
              sticky-header
              :tbody-tr-class="rowClass"
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
              <template #cell(#)="data">
                {{ data.index + 1 }}
              </template>
              <template #cell(actions)="row" class="lg-1">
                <b-row class="ml-1">
                  <section
                    style="display: flex; justify-content: flex-end; width: 100%; margin-right: 30px"
                  >
                    <div style="display: flex;">
                      <b-button
                        variant="outline-primary"
                        @click="userLink(row.item.id)"
                        class="pencil"
                      >
                        <b-icon
                          style="width: 15px;"
                          variant="outline-primary"
                          icon="pencil-fill"
                          aria-hidden="true"
                        ></b-icon>
                      </b-button>
                      <div
                        v-if="
                          localUser.role == 'Admin' ||
                          localUser.role == 'Dasturlash'||
                          localUser.role == 'Kasser'
                        "
                      >
                        <b-button
                          class="trash ml-2"
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
                      </div>
                    </div>
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
import axios from "axios";
import moment from "moment";
export default {
  name: "UserIndex",
  components: {},
  data() {
    return {
      localUser: JSON.parse(localStorage.getItem("user")),
      items: [],
      filial_id: 1,
      Filial: [],
      datas: {
        datetime1: new Date().toISOString().slice(0, 10),
        datetime2: new Date().toISOString().slice(0, 10),
        filial_id: 1
      },
      fields: [
        { key: "#", label: "№" },
        {
          key: "created_at",
          label: "Вақти",
          sortable: true,
          formatter: (value, key, item) => {
            let formatter = moment(new Date(value * 1000)).format(
              "DD.MM.YYYY HH:mm"
            );
            return formatter;
          }
        },
        { key: "id", label: "Карта ID", sortable: true },
        { key: "patient.id", label: "ID", sortable: true },
        { key: "patient.fullname", label: "Бемор", sortable: true },
        { key: "user.user_name", label: "Ходим", sortable: true },
        { key: "type_service", label: "", sortable: true },
        { key: "actions", label: "" }
      ],
      translatedFields: [],
      totalRows: 1,
      currentPage: 1,
      perPage: 200,
      sortBy: "",
      sortDesc: false,
      sortDirection: "asc",
      filter: ""
    };
  },
  created() {
    this.datas.filial_id = this.localUser.filial_id
    // this.getUser();
    // this.Data();
  },
  mounted() {
    this.updateTranslatedFields();
    this.getUser();
    this.getFilial()
  },
  watch: {
    "$i18n.locale": {
      immediate: true,
      handler() {
        this.updateTranslatedFields();
      }
    }
  },
  methods: {
    saveDump() {
      axios({
        method: "get",
        url: "bolim/dumper"
      }).then(res => {
        if (res) {
          window.open(
            `http://User-PC:4002/api/v1/admin-app/backups/${res.data.name}`
          );
        }
      });
    },
    KeldiKetdi(){
      let route = this.$router.resolve({
        path: "/keldi/ketdi"
      });
      window.open(route.href, "_blank");
    },
    updateTranslatedFields() {
      this.translatedFields = this.fields.map(field => {
        if(field.label != "№"){
          return {
            ...field,
            label: this.$t(field.label)
          };
        }
      });
    },
    RowClicked(item) {
      this.$router.push({ path: "/user-update/" + item.id });
    },
    userLink(id) {
      return this.$router.push({ path: "user-update/" + id });
    },
    createRoomLink() {
      return this.$router.push({ path: "user-create" });
    },
    getUser() {
      let self = this;
      let datas = {
        datetime1: parseInt(
          new Date(self.datas.datetime1)
            .valueOf()
            .toString()
            .slice(0, 10)
        ),
        datetime2:
          parseInt(
            new Date(self.datas.datetime2)
              .valueOf()
              .toString()
              .slice(0, 10)
          ) + 86399,
        filial_id: self.datas.filial_id
      };
      axios({
        method: "post",
        url: "/registration/all",
        data: datas
      }).then(res => {
        if (res) {
          self.getAll(res);
        }
      });
    },
    Data() {
      let s = this;
      axios({
        method: "post",
        url: "/registration/searchs",
        data: {
          name: s.filter
        }
      }).then(res => {
        if (res) {
          s.getAll(res);
        }
      });
    },
    getFilial(){
      let self = this;
      axios({
        method: "get",
        url: "filial/all" 
      }).then(res => {
        if(res){
          self.Filial = res.data.data
        }
      });
    },
    getAll(res) {
      let datas = [];
      if (this.localUser.role == "Shifokor") {
        res.data.data.forEach(el => {
          let indSh = el.registration_doctor.findIndex(
            Sh => Sh.doctor_id == this.localUser.doctor_id
          );
          let indShOP = null;
          let indShOpCat = -1;
          indShOP = el.surgery_registration.findIndex(
            Sh => Sh.doctor_id == this.localUser.doctor_id
          );
          if (el.surgery_registration.length > 0) {
            if (indShOP === -1) {
              el.surgery_registration.forEach(l => {
                indShOpCat = l.surgery_doctor.findIndex(
                  S => S.doctor_id == this.localUser.doctor_id
                );
              });
            }
          }
          if (el.type_service == "Statsionar") {
            if (indSh !== -1 || indShOP !== -1 || indShOpCat !== -1) {
              datas.push(el);
            }
          } 
          else {
//             && el.backlog == 0)
//  && el.backlog == 0)
//  && el.backlog == 0)
            if (
              indSh !== -1 || indShOP !== -1 || indShOpCat !== -1 ||
              indSh !== -1 ||
              indShOP !== -1 ||
              indShOpCat !== -1
            ) {
              datas.push(el);
            }
          }
          this.items = datas;
        });
      } 
      else if (this.localUser.role == "Loborant") {
        res.data.data.forEach(el => {
          let indTek = el.registration_inspection.findIndex(
            t => t.user_id == this.localUser.id
          );
          if(el.registration_inspection.length > 0 && indTek !== -1){
            datas.push(el)
          }
          // if (el.type_service == "Statsionar") {
          //   if (indTek !== -1) {
          //     datas.push(el);
          //   }
          // } else {
          //   // && el.backlog == 0
          //   if (
          //     // indTek !== -1
          //     indTek !== -1 
          //   ) {
          //     datas.push(el);
          //   }
          // }
        });
        this.items = datas;
      } 
      else {
        this.items = res.data.data;
      }
    },
    rowClass(item, type) {
      if (!item || !item.patient || type !== "row") return;
      if (item.patient.imtiyoz_type != "Imtiyozsiz") {
        return "table-warning";
      } else {
        if (item.backlog == 0) {
          return "table-success";
        } else {
          return "table-danger";
        }
      }
    },
    trash(id) {
      const trash = window.confirm(this.$t("Малумотлар ўчирилсинми?"));
      if (trash) {
        let self = this;
        axios({
          method: "delete",
          url: "/registration/delete/" + id
        }).then(() => {
          self.getUser();
        });
      }
    }
  }
};
</script>
<style>
.qidiruv {
  display: flex;
  justify-content: space-between;
}
.tables {
  overflow-y: auto;
  overflow-x: hidden;
  height: 1000px;
}
.ShifokrSverka {
  border-radius: 5px;
  background: #fff;
  border: 1px solid rgb(210, 210, 210);
}
.content {
  margin-top: -60px;
}
.qoshishBtn {
  display: flex;
  border-radius: 8px;
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
