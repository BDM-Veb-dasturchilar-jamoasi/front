<template>
  <div class="content">
    <md-card>
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
           
            <b-col mb="4">
              <v-select
                :options="med"
                :reduce="options => options.id"
                label="name"
                v-model="med_id"
                @input="handleSelectChange(med_id)"
              />
            </b-col>
            <b-col lg="2">
            <h5>  Сони {{  count }}</h5>
            </b-col>
            <b-col lg="4">
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
              :filter-included-fields="filterOn"
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
              @filtered="onFiltered"
            >
              <template #cell(№)="data">
                {{ data.index + 1 }}
              </template>
              <template #cell(actions)="row">
                <b-row class="ml-1">
                  <section
                    style="display: flex; justify-content: flex-end; width: 100%; margin-right: 30px"
                  >
                    <div style="display: flex; margin-right: 15px">
                      <b-button
                        variant="outline-primary"
                        @click="naprovitelLink(row.item.id)"
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
                    <div>
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
// import readXlsxFile from 'read-excel-file'

export default {
  name: "UserIndex",
  components: {},
  data() {
    return {
      items: [],
      med_id:null,
      count:null,
      fields: [
        "№",
        { key: "name", label: "Ф.И.Ш", sortable: true },
        { key: "direct_id", label: "ID", sortable: true },
        { key: "phone", label: "Telefon", sortable: true },
        { key: "ish_joyi", label: "Место работы", sortable: true },
        { key: "lavozimi", label: "Специальность", sortable: true },
        // {
        //   key: "bonus",
        //   label: "Фоиз",
        //   sortable: true,
        //   formatter: (value, key, item) => {
        //     let formatter = new Intl.NumberFormat("ru-RU", {
        //       minimumFractionDigits: 0
        //     });
        //     return formatter.format(value);
        //   }
        // },
        { key: "actions", label: "" }
      ],
      translatedFields: [],
      med : [],
      totalRows: 1,
      currentPage: 1,
      perPage: 100,
      // pageOptions: [5, 10, 20, { value: 100, text: "Show a lot" }],
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
    this.doktr()
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
      this.$router.push({ path: "/naprovitel-update/" + item.id });
    },
    naprovitelLink(id) {
      return this.$router.push({ path: "naprovitel-update/" + id });
    },
    createRoomLink() {
      return this.$router.push({ path: "naprovitel-create" });
    },
    data() {
      let s = this;
      axios({
        method: "get",
        url: "/direct/all"
      }).then(res => {
        if (res != undefined) {
          s.items = res.data.data;
          s.totalRows = s.items.length;
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
          url: "/direct/delete/" + id
        }).then(res => {
          if (res != undefined) {
            self.data();
          }
        });
      }
    },
    handleSelectChange(e) {
      let s = this;
      console.log("aaaaaaa",e)
      axios({
        method: "get",
        url: `/direct/filtr?med_id=${e}`
      }).then(res => {
        console.log("reeeees",res.data)
          s.items = res.data.data;
          for(let i in s.items){
            var soni = i ++
          }
          this.count = soni + 1;
          console.log(this.count)
          s.totalRows = s.items.length;
      });
    },
    doktr() {
      let s = this;
      axios({
        method: "get",
        url: "/med_direct/all"
      }).then(res => {
        this.med = res.data.data
      });
    },

  }
};
</script>
<style>
.qidiruv {
  display: flex;
  justify-content: space-between;
}
.content {
  margin-top: -60px;
}
.tables {
  overflow-y: auto;
  overflow-x: hidden;
  height: 1000px;
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
