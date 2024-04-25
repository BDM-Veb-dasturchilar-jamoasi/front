<template>
  <div class="xabar">
    <b-row class="qidiruv">
      <b-col class="mb-2">
        <!-- <b-button
                class="qoshishBtn"
                variant="primary"
                @click="createRoomLink"
              >
                <span>
                  <b-icon icon="plus-circle-fill" color="#fff"></b-icon>
                  Қўшиш
                </span>
              </b-button> -->
      </b-col>

      <b-col lg="7" class="mb-2">
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
        :items="patients"
        :fields="fields"
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
        <template>
          <b-row class="ml-1">
            <section
              style="display: flex; justify-content: flex-end; width: 100%; margin-right: 30px"
            >
              <div style="display: flex; margin-right: 15px">
                <input type="checkbox" class="checkbox" />
              </div>
            </section>
          </b-row>
        </template>
      </b-table>
    </div>
    <!-- <ul>
      <li v-for="(item, index) in patients" :key="index">
        <p>{{ item.fullname }}</p>
        <p>{{ item.phone }}</p>
        <p><input type="checkbox" class="checkbox" /></p>
      </li>
    </ul> -->
    <div class="xabarnoma">
      <div
        style="margin: 0 auto; width: 1000px; height: 100%; display: flex; justify-content: space-between;"
      >
        <b-form-textarea
          style="width: 900px !important;"
          id="textarea"
          placeholder="Малумот киритинг..."
          v-model="message"
          rows="1"
          max-rows="3"
        >
        </b-form-textarea>
        <button class="btn btn-info">Жўнатиш</button>
      </div>

      <!-- <b-form inline>
        <b-form-input
          id="input-1"
          v-model="message"
          class="w-75 mr-5 inputs"
          type="text"
          placeholder="Xabar yozing..."
          required
        ></b-form-input>
        <button class="btn btn-info">Send</button>
      </b-form> -->
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      patients: [],
      message: "",
      fields: [
        "№",
        { key: "fullname", label: "Ф.И.Ш", sortable: true },
        { key: "phone", label: "Тел раками" },
        { key: "actions", label: "" }
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 100,
      // pageOptions: [5, 10, 20, { value: 100, text: "Show a lot" }],
      sortBy: "",
      sortDesc: false,
      sortDirection: "asc",
      filter: null,
      filterOn: ["fullname", "phone"]
    };
  },
  methods: {
    getPatient() {
      let self = this;
      axios({
        method: "get",
        url: "/patient/all"
      }).then(res => {
        self.patients = res.data.data;
        self.totalRows = self.patients.length;
      });
    },
    RowClicked(item) {
      // this.$router.push({ path: "/naprovitel-update/" + item.id });
    },
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    }
  },
  mounted() {
    this.getPatient();
  }
};
</script>
<style scoped>
.xabar {
  width: 96%;
  min-height: 550px;
  margin: 0 auto;
  position: relative;
}
.xabarnoma {
  /* background: red; */
  /* z-index: 5; */
  padding: 5px;
  width: 80%;
  /* margin-left: -2%; */
  position: fixed;
  bottom: calc(100vh - 580px);
  /* flex-direction: column; */
  align-items: center;
}
.inputs {
  width: 700px !important;
}
.xabar ul {
  list-style: none;
  padding: 0px !important;
  margin: 0px !important;
}
.xabar ul li {
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-top: 1px solid grey;
  border-bottom: 1px solid grey;
  padding-bottom: 0px !important;
}
.xabar ul li p {
  font-family: "Times New Roman", Times, serif;
  font-weight: 600;
  font-size: 16px;
}
</style>
