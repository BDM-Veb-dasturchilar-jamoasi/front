<template>
  <div>
    <div
      class="bemor-id-name"
      :class="{ kasallikT: $route.name == 'ArxivOne' }"
    >
      <div
        class="bemor-id-div"
        :class="{ pointerEvents: $route.name == 'Update' }"
      >
        <label>Пациент ID</label>
        <v-select
          class="select-id-bemor"
          :options="items"
          @input="selectChange"
          label="id"
          v-model="selectedBemor"
          :reduce="options => options.id"
          :filter="fuseSearchBemor"
        >
          <!-- :get-option-key="option => option.id" -->
          <template #option="{ fullname, id }">
            <b> {{ id }}</b>
          </template>
        </v-select>
      </div>
      <div class="bemor-name-div">
        <label>
          {{ $t("Бемор") }}
          <span style="color: red;">*</span>
        </label>
        <div
          style="display: flex;"
          :class="{ pointerEvents: $route.name == 'Update' }"
        >
          <div style="width: 370px;">
            <v-select
              class="selektBemor"
              :options="items"
              @input="selectChange"
              label="fullname"
              v-model="selectedBemor"
              :reduce="options => options.id"
              :filter="fuseSearchBemor"
            >
              <!-- :get-option-key="option => option.fullname" -->
              <template #option="{ fullname, id }">
                {{ fullname }}
                <br />
                <b> {{ id }}</b>
              </template>
            </v-select>
          </div>
          <div>
            <b-button
              v-b-modal.modal-bemorqidiruv
              variant="primary"
              class="bemor-modal-btn"
            >
              ...
            </b-button>
          </div>
          <b-modal
            id="modal-bemorqidiruv"
            size="xl"
            title="Бемор қидириш"
            hide-footer
          >
            <div class="mb-2 modalQidiruv">
              <b-form-group
                label-for="filter-input"
                label-cols-sm="1"
                label-align-sm="right"
                label-size="sm"
                class="mb-0 qidiruv-btn"
              >
                <b-input-group size="sm">
                  <b-form-input
                    id="filter-input"
                    v-model="filter"
                    type="search"
                    @input="Qidiruv"
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
            </div>
            <div>
              <b-table
                id="bemor-table"
                ref="refBemorTable"
                hover
                sort-icon-left
                striped
                primary-key="id"
                :items="items"
                :fields="fields"
                :sort-by.sync="sortBy"
                :sort-desc.sync="sortDesc"
                :sort-direction="sortDirection"
                @row-clicked="selectChange"
                stacked="md"
                show-empty
                small
              >
                <template #cell(№)="data">
                  {{ data.index + 1 }}
                </template>
              </b-table>
            </div>
          </b-modal>
        </div>
      </div>
      <div>
        <label>{{ $t("Рўйхатга олувчи") }}</label>
        <div class="sum-u operator">
          {{ user_name }}
        </div>
      </div>
      <div>
        <label>{{ $t("Келган вақти") }}</label>
        <div class="sum-u date">
          {{ kelgan_kun | dateFormatDD }}
        </div>
      </div>
      <div v-if="localUser.role != 'Loborant' && localUser.role != 'Shifokor'">
        <label>{{ $t("Умумий сумма") }}</label>
        <div class="sum-u summa">
          {{ summa | numFormat }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Fuse from "fuse.js";
import moment from "moment";
export default {
  props: ["newBemor", "summa", "kelgan_kun", "user_name"],
  data() {
    return {
      selectedBemor: this.$store.state.bemor.id,
      // summa: 0,
      localUser: JSON.parse(localStorage.getItem("user")),
      items: [],
      fields: [
        "№",
        {key: "id", label: "ID", },
        { key: "fullname", label: "Ф.И.Ш", sortable: true },
        { key: "district.name", label: "Тумани", sortable: true },
        { key: "addres", label: "Уй Манзили", sortable: true }
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
  filters: {
    dateFormatDD: function(date) {
      if (date != null) {
        return moment.unix(date).format("DD.MM.YYYY HH:mm:ss");
      } else {
        return "";
      }
    }
  },
  methods: {
    getPatient() {
      let self = this;
      axios({
        method: "get",
        url: "/patient/all"
      }).then(res => {
        self.items = res.data.data;
        self.totalRows = self.items.length;
      });
    },
    fuseSearchBemor(e, search) {
      const fuse = new Fuse(e, {
        keys: ["fullname", "id"],
        shouldSort: true
      });
      return search.length
        ? fuse.search(search).map(({ item }) => item)
        : fuse.list;
    },
    Qidiruv(filter) {
      let self = this;
      axios({
        method: "post",
        url: "/registration/bemor",
        data: {
          name: filter
        }
      }).then(res => {
        self.items = res.data;
      });
    },
    selectChange(e) {
      if (e) {
        if (e.id) {
          this.selectedBemor = e;
          this.$emit("bemorChange", e);
          this.$bvModal.hide("modal-bemorqidiruv");
        } else {
          let x = {};
          this.items.find(val => {
            if (val.id == e) {
              x = val;
            }
          });
          this.$emit("bemorChange", x);
          this.$bvModal.hide("modal-bemorqidiruv");
        }
      } else {
        this.$emit("bemorChange", e);
      }
    }
  },
  mounted() {
    this.getPatient();
  },
  watch: {
    newBemor(newVal, old) {
      this.items.push(newVal);
      this.getPatient();
      this.selectedBemor = newVal.id;
    }
  }
};
</script>
<style>
.pointerEvents {
  pointer-events: none;
}
.selektBemor .vs__selected-options span:first-child {
  width: 90% !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  white-space: nowrap !important;
}
.selektBemor .vs__selected-options {
  width: 90%;
}
.bemor-id-name {
  padding: 10px;
  display: flex;
  justify-content: space-between;
  border: 1px solid #007bff;
  width: 100%;
  border-radius: 10px;
  background: #f0f0f0;
}
.modalQidiruv {
  width: 100%;
  display: flex;
  justify-content: end;
}
.qidiruv-btn {
  width: 33% !important;
}
.bemor-id-name label {
  font-size: 18px;
  font-weight: 600;
  color: #007bff;
}
.bemor-id-div {
  width: 150px;
}
.select-id-bemor {
  width: 100%;
}
.bemor-name-div {
  width: 400px;
}
.bemor-modal-btn {
  height: 34px;
  border: 1px solid #fff;
  font-size: 18px;
}
.sum-u {
  border-radius: 5px;
  font-size: 22px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  background: #fff;
  border: 1px solid #ccc;
  color: red;
  height: 35px;
}
.summa {
  width: 150px;
}
.date {
  width: 200px;
  font-size: 18px;
}
.operator {
  width: 350px;
  font-size: 16px;
  justify-content: start;
  font-weight: 400;
  color: black;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
