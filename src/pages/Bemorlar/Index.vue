<template>
  <div class="content">
    <md-card>
      <!-- <md-card-header data-background-color="green">
            <h4 class="title">Shifokor bo'limi</h4>
          </md-card-header> -->
      <md-card-content>
        <b-container fluid>
          <!-- User Interface controls -->
          <b-row class="qidiruv">
            <b-col class="mb-2">
              <b-button
                class="qoshishBtn"
                variant="primary"
                @click="createRoomLink"
              >
                <span>
                  <b-icon icon="plus-circle-fill" color="#fff"></b-icon>
                  {{ $t("Қўшиш") }}
                </span>
              </b-button>
            </b-col>

            <b-col lg="7">
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
              class="tableStyle"
              id="room-table"
              ref="refUserTable"
              hover
              striped
              primary-key="id"
              :items="items"
              :fields="translatedFields"
              :filter="filter"
              :per-page="perPage"
              :current-page="currentPage"
              :filter-included-fields="filterOn"
              :sort-by.sync="sortBy"
              :sort-desc.sync="sortDesc"
              :sort-direction="sortDirection"
              @row-clicked="RowClicked"
              sort-icon-left
              stacked="md"
              show-empty
              small
              @filtered="onFiltered"
            >
              <template #cell(#)="data">
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
                        @click="bemorLink(row.item.id)"
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
                    <div
                      v-if="
                        localUser.role == 'Admin' ||
                          localUser.role == 'Dasturlash'
                      "
                    >
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
export default {
  name: "UserIndex",
  components: {},
  data() {
    return {
      items: [],
      localUser: JSON.parse(localStorage.getItem("user")),
      fields: [
        "#",
        { key: "fullname", label: "Ф.И.Ш", sortable: true },
        { key: "region.name", label: "Вилоят", sortable: true },
        { key: "district.name", label: "Туман", sortable: true },
        { key: "imtiyoz_type", label: "Имтиёз", sortable: true },
        { key: "actions", label: "" }
      ],
      translatedFields: [],
      totalRows: 1,
      currentPage: 1,
      perPage: 100,
      sortBy: "",
      sortDesc: false,
      sortDirection: "asc",
      filter: null,
      filterOn: ["name"]
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
      this.$router.push({ path: "/bemor-update/" + item.id });
    },
    bemorLink(id) {
      return this.$router.push({ path: "bemor-update/" + id });
    },
    createRoomLink() {
      return this.$router.push({ path: "bemor-create" });
    },
    data() {
      let s = this;
      axios({
        method: "get",
        url: "/patient/all"
      }).then(res => {
        if (res != undefined) {
          s.items = res.data.data;
          s.totalRows = s.items.length;
        }
      });
    },
    Data() {
      let self = this;
      axios({
        method: "post",
        url: "/pill/search",
        data: {
          name: self.filter
        }
      }).then(res => {
        if (res != undefined) {
          self.items = res.data.data;
          self.totalRows = self.items.length;
        }
      });
    },

    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    trash(id) {
      const trash = window.confirm(this.$t("Малумотлар ўчирилсинми?"));
      if (trash) {
        let self = this;
        axios({
          method: "delete",
          url: "/patient/delete/" + id
        }).then(res => {
          if (res != undefined) {
            self.data();
          }
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
