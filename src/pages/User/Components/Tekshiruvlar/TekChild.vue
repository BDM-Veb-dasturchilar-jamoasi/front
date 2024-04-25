<template>
  <div>
    <div style="padding: 5px;">
      <table class="table table-sm table-bordered striped table-style">
        <tbody>
          <tr
            v-for="(itemCh, indCh) in itemChild"
            :key="indCh"
            style="max-height: 30px;"
            :class="{ bg: indCh % 2 == 1 }"
          >
            <td style="width: 392px;">
              <b-form-checkbox
                @change="ChakkChild(itemCh)"
                v-model="itemCh.select"
                style="display: flex; justify-content: start;"
                :value="true"
                :unchecked-value="false"
              >
                {{ itemCh.name }}
              </b-form-checkbox>
            </td>
            <td>
              <div v-if="$store.state.bemor.citizen">
                {{ itemCh.citizen_price | numFormat }}
              </div>
              <div v-else>{{ itemCh.price | numFormat }}</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  props: ["itemChild", "TekItem"],
  data(){
    return {
      localUser: JSON.parse(localStorage.getItem("user")),
    }
  },
  methods: {
    ChakkChild(child) {
      if (this.$store.state.bemor.id) {
        this.$emit("ChakkedChild", this.TekItem, child);
      } else {
        child.select = false;
        this.$emit("ChakkedChild", this.TekItem, child);
        return (child.select = false);
      }
    }
  }
};
</script>
<style></style>
