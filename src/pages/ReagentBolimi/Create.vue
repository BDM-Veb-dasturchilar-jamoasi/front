<template>
  <div>
    <reagent-ddepartment-form></reagent-ddepartment-form>
  </div>
</template>

<script>
// import axios from "axios";
import ReagentDdepartmentForm from "./Form.vue";
// import { required, minLength } from "vuelidate/lib/validators";
export default {
  name: "ReagentDdepartmentCreate",
  components: {
    ReagentDdepartmentForm
  }
  // data() {
  //   return {
  //     reagentDdepartment: {
  //       department_id: null,
  //       reagentDdepartment_id: null,
  //       count: 0
  //     },
  //     errors: null
  //   };
  // },
  // validations: {
  //   reagentDdepartment: {
  //     name: {
  //       required,
  //       minLength: minLength(4)
  //     }
  //   }
  // },
  // methods: {
  //   createReagentDdepartment() {
  //     let self = this;
  //     this.$v.$touch();
  //     if (this.$v.$invalid == false) {
  //       axios({
  //         method: "post",
  //         url: "/reagent_department/create",
  //         data: self.reagentDdepartment
  //       }).then(data => {
  //         if (data != undefined) {
  //           this.$router.push("/reagent/department");
  //         }
  //       });
  //     } else {
  //       this.errors = this.$v.reagentDdepartment;
  //     }
  //   },
  //   cancel() {
  //     this.reagentDdepartment = {
  //       department_id: null,
  //       reagentDdepartment_id: null,
  //       count: 0
  //     };
  //   }
  // }
};
</script>
<style></style>
