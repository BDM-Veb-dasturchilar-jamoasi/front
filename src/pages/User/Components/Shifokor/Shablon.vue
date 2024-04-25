<template>
  <div>
    <div>
      <div style="display: flex; justify-content: space-between;">
        <button
          class="navbarBtnTashxis mb-2"
          v-b-modal="
            'modal-shab-creat' + indRegShif + shabType + modalIdCom
          "
        >
          <b-icon icon="plus-lg"></b-icon>
        </button>

        <b-form-group
          label-for="filterTekshiruvlar-input"
          label-cols-sm="1"
          label-align-sm="right"
          label-size="sm"
          class="mb-2 col-8"
        >
          <b-input-group size="sm">
            <b-form-input
              id="filterTekshiruvlar-input"
              v-model="filterShablon"
              type="search"
              :placeholder="$t('Қидирув')"
            ></b-form-input>

            <b-input-group-append>
              <b-button
                :disabled="!filterShablon"
                variant="danger"
                @click="filterShablon = ''"
              >
                {{ $t("Тозалаш") }}</b-button
              >
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </div>
      <div>
        <div class="modalOverflow">
          <b-table
            id="bemor-table"
            ref="refShablonTable"
            hover
            sort-icon-left
            striped
            primary-key="id"
            :items="itemsShablon"
            :fields="fieldsShablon"
            :filter="filterShablon"
            :per-page="perPageShablon"
            :current-page="currentPageShablon"
            :filter-included-fields="filterOnShablon"
            :sort-by.sync="sortByShablon"
            :sort-desc.sync="sortDescShablon"
            :sort-direction="sortDirectionShablon"
            @row-clicked="RowClickedShablon($event, indRegShif)"
            stacked="md"
            show-empty
            small
            @filtered="onFilteredShablon"
          >
            <template #cell(№)="data">
              {{ data.index + 1 }}
            </template>
            <template #cell(actions)="row">
              <b-row class="ml-1">
                  <section
                    style="display: flex; justify-content: flex-end; width: 100%; margin-right: 30px"
                  >
                    <div style="display: flex;">
                      <b-button
                        variant="outline-primary"
                        v-b-modal="
                          'modal-shab-creat' + indRegShif + shabType + modalIdCom
                        "
                        @click="userLink(row.item)"
                        class="pencil"
                      >
                        <b-icon
                          style="width: 15px;"
                          variant="outline-primary"
                          icon="pencil-fill"
                          aria-hidden="true"
                        ></b-icon>
                      </b-button>
                      <div>
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
      </div>
    </div>
    <b-modal
      :id="'modal-shab-creat' + indRegShif + shabType + modalIdCom"
      :title="$t('Шифокор шаблон')"
      size="lg"
      hide-footer
    >
      <div class="md-layout-item md-small-size-100 md-size-100">
        <span class="shirift">
          {{ $t("Номи") }}
        </span>
        <span style="color: red;">*</span>
        <span v-if="errorsShablon != null">
          <span
            style="color: red; font-size: 9px"
            v-if="!errorsShablon.name.required"
            >{{ $t("Ном тўлдирилиши керак") }}</span
          >
          <span
            style="color: red; font-size: 9px"
            v-if="!errorsShablon.name.minLength"
            >{{ $t("Ном камида 4 та белги бўлиши керак") }}</span
          >
        </span>
        <b-input id="Shablon-name" type="text" v-model="ShablonShifokor.name" />
        <span class="shirift">
          {{ $t("Текст") }}
        </span>
        <vue-editor v-model="ShablonShifokor.text" />
      </div>
      <div class="CreateName">
        <b-button
          class="modalBtn1"
          size="sm"
          style="height: 37px;"
          variant="danger "
          @click="ShifokorShablonClose()"
        >
          <b-icon icon="calendar2-x"></b-icon>
          {{ $t("Бекор қилиш") }}
        </b-button>
        <b-button
          class="mt-3 ml-2 modalBtn"
          @click="ShifokorShablon(indRegShif)"
          variant="success"
        >
          <b-icon icon="calendar2-plus"></b-icon>
          {{ $t("Сақлаш") }}
        </b-button>
      </div>
    </b-modal>
  </div>
</template>
<script>
import axios from "axios";
import { required, minLength } from "vuelidate/lib/validators";
export default {
  props: ["indRegShif", "itemsShablon", "shabType", "modalIdCom"],
  data() {
    return {
      localUser: JSON.parse(localStorage.getItem("user")),
      fieldsShablon: [
        "№",
        { key: "name", label: this.$t("Номи"), sortable: true },
        { key: "actions", label: "" }
      ],
      // itemsShablon: [],
      totalRowsShablon: 1,
      currentPageShablon: 1,
      perPageShablon: 100,
      sortByShablon: "",
      sortDescShablon: false,
      sortDirectionShablon: "asc",
      filterShablon: null,
      filterOnShablon: ["name"],

      ShablonShifokor: {
        id: 0,
        doctor_id: 0,
        name: "",
        text: "",
      },
      errorsShablon: null
    };
  },
  validations: {
    ShablonShifokor: {
      name: {
        required,
        minLength: minLength(4)
      }
    }
  },
  methods: {
    ShifokorShablon(indRegShif) {
      let self = this;
      self.ShablonShifokor.doctor_id = self.localUser.id;
      this.$v.$touch();
      if (this.$v.ShablonShifokor.$error == false) {
        let method = ""
        let url = ""
        if(self.ShablonShifokor.id){
          url = "/shablon_doctor/update/" + self.ShablonShifokor.id
          method = "patch"
        } else {
          url = "/shablon_doctor/create"
          method = "post"
        }
        axios({
          method: method,
          url: url,
          data: self.ShablonShifokor
        }).then(res => {
          if (res) {
            self.$emit("ShablonGet", res.data.data);
            self.$bvModal.hide(
              `${"modal-shab-creat" +
                indRegShif +
                this.shabType +
                this.modalIdCom
              }`
            );
            self.ShablonShifokor = {
              doctor_id: 0,
              name: "",
              text: ""
            };
          }
        });
      } else {
        this.errorsShablon = this.$v.ShablonShifokor;
      }
    },
    RowClickedShablon($events, indRegShif) {
      this.$emit("RowClickedShab", $events, indRegShif);
      // this.$bvModal.hide(`${"modal-shablon" + indRegShif + this.shabType}`);
    },
    userLink(item){
      this.ShablonShifokor = item
    },
    trash(id){
      let self = this;
      axios({
        method: "delete",
        url: "/shablon_doctor/delete/" + id
      }).then(res => {
        if(res){
          self.$emit("ShablonGet", res.data.data);
        }
      })
    },
    onFilteredShablon(filteredItems) {
      this.totalRowsShablon = filteredItems.length;
      this.currentPageShablon = 1;
    },
    ShifokorShablonClose() {
      this.ShablonShifokor = {
        doctor_id: 0,
        name: "",
        text: ""
      };
    }
  }
};
</script>
