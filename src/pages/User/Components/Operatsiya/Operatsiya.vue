<template>
  <div>
    <div>
      <div class="item-child-o">
        <div style="padding: 5px;">
          <b-tabs active-nav-item-class="font-weight-bold text-light bg-info">
                <b-tab
                    v-for="(itemP, indP) in operatsiyalar"
                    :title="itemP.name"

                    title-link-class="mr-2 mt-1 text-light font-weight-bold bg-success"
                    style="padding: 0px !important;"
                >
                <div class="tek-card">
                  <table class="table table-sm table-bordered striped table-style">
                    <tbody>
                      <tr
                        v-for="(item, index) in itemP.type"
                        :key="index"
                        style="width: 100%;"
                        :class="{ bg: index % 2 == 0 }"
                      >
                        <td class="oper-chek">
                          <b-form-checkbox
                            @change="ChakkedOperatsiya(item)"
                            v-model="item.select"
                            style="display: flex; width: 100%;"
                            :value="true"
                            :unchecked-value="false"
                          >
                            <div
                              style="display: flex; width: 100%; justify-content: space-between; width: 100% !important;"
                            >
                              <div>{{ item.name }}</div>
                              <div v-if="localUser.role != 'Shifokor' && localUser.role != 'Loborant'">
                                <div v-if="$store.state.bemor.citizen">
                                  {{ item.citizen_price | numFormat }}
                                </div>
                                <div v-else>{{ item.price | numFormat }}</div>
                              </div>
                            </div>
                          </b-form-checkbox>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                </b-tab>
            </b-tabs>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["operatsiyalar", "index"],
  data() {
    return {
      localUser: JSON.parse(localStorage.getItem("user")),
    };
  },
  methods: {
    ChakkedOperatsiya(item) {
      if (this.$store.state.bemor.id) {
        this.$emit("itemOper", item, this.index);
      } else {
        item.select = false;
        this.$emit("itemOper", item, this.index);
        return (item.select = false);
      }
    }
  }
};
</script>
<style>
.oper-chek .custom-control-label {
  width: 100%;
}
.item-child-o {
  border: 1px solid rgb(46, 165, 255);
  width: 100%;
  overflow: auto;
  background: #fff;
  border-radius: 10px;
  margin-top: 5px;
}
</style>
