<template>
  <div>
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
      <div
        class="item-child-t"
        v-for="(chunk, index) in chunkedItems"
        :key="index"
        style="width: 470px; margin-right: 10px; margin-top: 10px;"
      >
        <div class="tek-item-t">
          <div
            v-for="(itemTek, indTek) in chunk"
            :key="indTek"
            :class="{ bg: indTek % 2 === 1 }"
          >
            <div class="tek-for-type" :class="{ border_top: indTek == 0 }">
              <div style="display: flex; cursor: pointer;">
                <div>
                  <div style="display: flex; width: 350px;">
                    <b-form-checkbox
                      v-if="!itemTek.type"
                      @change="ChakkedType(itemTek)"
                      v-model="itemTek.select"
                      :value="true"
                      :unchecked-value="false"
                    >
                      {{ itemTek.name }}
                    </b-form-checkbox>
                    <span v-if="itemTek.type" style=" border-radius: 10px; background-color: lawngreen; margin-left: 100px; text-align: center; width: 100%; margin: auto; font-weight: bold;">{{ itemTek.name }}</span>
                  </div>
                </div>
                <div v-if="!itemTek.type">
                  <span v-if="$store.state.bemor.citizen">{{
                    itemTek.citizen_price | numFormat
                  }}</span>
                  <span v-else>{{ itemTek.price | numFormat }}</span>
                </div>
              </div>
              <div class="item-child" v-if="itemTek.type">
                <TekChild
                  :itemChild="itemTek.inspectionChild"
                  :TekItem="itemTek"
                  @ChakkedChild="ChakkChild"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import TekChild from "./TekChild.vue";
import Fuse from "fuse.js";
export default {
  props: ["itemBol", "indBolim"],
  components: {
    TekChild
  },
  data() {
    return {
      itemsPerChunk: 12,
      Naprovitel:[],
      darect_id:null,
      localUser: JSON.parse(localStorage.getItem("user")),
    };
  },
  computed: {
    chunkedItems() {
      const chunks = [];
      for (let i = 0; i < this.itemBol.length; i += this.itemsPerChunk) {
        chunks.push(this.itemBol.slice(i, i + this.itemsPerChunk));
      }
      return chunks;
    }
  },
  methods: {
    ChakkedType(item) {
      if (this.$store.state.bemor.id) {
        item['darect_id'] = this.darect_id 
        this.$emit("itemTek", item);
      } else {
        item.select = false;
        this.$emit("itemTek", item);
        return (item.select = false);
      }
    },
    ChakkChild(TekItem, child) {
      TekItem['darect_id'] = this.darect_id 
      this.$emit("chekkTekChild", TekItem, child);
    },
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
  },
  mounted() {
    this.getNaprovitel();
  }
};
</script>
<style>
.table-style {
  background: #fff;
}
.item-child-t {
  margin: 5px;
  display: flex;
  padding: 5px;
  background: #f0f0f03d;
  border-radius: 5px;
  border: 1px solid #ccc;
}
.tek-for-type {
  border: 1px solid #ccc;
  padding: 3px 5px;
  border-top: none;
  min-height: 30px;
}
.Tekshiruvchi-index {
  width: 530px;
}
.item-child {
  border: 1px solid rgb(46, 165, 255);
  width: 100%;
  overflow: auto;
  background: #fff;
  border-radius: 10px;
  margin-top: 5px;
  max-height: 650px;
}
.border_top {
  border-top: 1px solid #ccc;
}
.tek-item-t {
  border: 1px solid rgb(46, 165, 255);
  width: 100%;
  background: #fff;
  padding: 5px;
  border-radius: 7px;
  overflow: auto;
  /* margin-top: 5px; */
  max-height: 1200px;
}
</style>
