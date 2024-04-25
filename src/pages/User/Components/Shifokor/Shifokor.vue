<template>
  <div style="display: flex; flex-wrap: wrap;">
    <h6>Врач ID</h6>
    <div style="width: calc(100% );">
      <!-- @input="direct" -->
      <v-select :filter="fuseSearch" id="naprovitel" :options="Naprovitel" :get-option-label="option => option.name"
        :reduce="option => option.id" v-model="darect_id">
        <template #option="{ name, direct_id }">
          {{ name }}
          <br />
          <b>{{ direct_id }}</b>
        </template>
      </v-select>
    </div>
    <div v-for="(itemShB, indB) in shifokor" :key="indB" class="tek-item">
      <div class="chek-teksh-div">
        <div class="chek-tek">
          {{ itemShB.name }}
        </div>
      </div>
      <div class="item-child">
        <div style="padding: 5px;">
          <table class="table table-sm table-bordered striped table-style">
            <tbody>
              <tr v-for="(itemSh, indSh) in itemShB.type" :key="indSh" style="max-height: 30px;"
                :class="{ bg: indSh % 2 == 1 }">
                <td>
                  <b-form-checkbox @change="ChakkedType(itemSh)" v-model="itemSh.change" style="display: flex;"
                    :value="true" :unchecked-value="false">
                    {{ itemSh.name }}
                  </b-form-checkbox>
                </td>
                <td v-if="shifKorigi">
                  <span v-if="$store.state.bemor.citizen">{{
                    itemSh.citizen_price | numFormat
                  }}</span>
                  <span v-else>{{ itemSh.price | numFormat }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Fuse from "fuse.js";
export default {
  props: ["shifokor", "index", "shifKorigi"],
  data() {
    return {
      Naprovitel: [],
      darect_id:null,
      localUser: JSON.parse(localStorage.getItem("user")),
    };
  },
  methods: {
    getNaprovitel() {
      let self = this;
      axios({
        method: "get",
        url: "/direct/all"
      }).then(res => {
        console.log(res)
        if (res != undefined) {
          self.Naprovitel = res.data.data;
        }
      });
    },
    fuseSearch(options, search) {
      const fuse = new Fuse(options, {
        keys: ["name", "direct_id"],
        shouldSort: true
      });
      return search.length
        ? fuse.search(search).map(({ item }) => item)
        : fuse.list;
    },
    ChakkedType(item) {
      if (this.$store.state.bemor.id) {
        item['darect_id'] = this.darect_id
        this.$emit("itemSh", item, this.index);
      } else {
        this.$emit("itemSh", item, this.index);
        return (item.change = false);
      }
    },

  },
  mounted() {
    this.getNaprovitel();
  }
};
</script>
<style>
.tek-item {
  width: 530px;
  flex-wrap: wrap;
  margin: 5px;
  display: flex;
  padding: 5px;
  background: #f0f0f03d;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.table-style {
  background: #fff;
}

.chek-teksh-div {
  display: flex;
  align-items: center;
  font-weight: 600;
  width: 100%;
}

.chek-tek {
  display: flex;
  padding: 3px 5px;
  border-radius: 5px;
  align-items: center;
  font-weight: 600;
  width: 100%;
  border: 1px solid rgb(46, 165, 255);
  font-size: 18px;
  background: rgba(7, 100, 172, 0.078);
  color: #3f51b5;
}

.tek-item {
  display: inline;
}

.item-child {
  border: 1px solid rgb(46, 165, 255);
  width: 100%;
  overflow: auto;
  background: #fff;
  border-radius: 10px;
  margin-top: 5px;
  max-height: 470px;
}
</style>
