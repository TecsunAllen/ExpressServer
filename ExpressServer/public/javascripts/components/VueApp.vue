<style>

</style>
<template id="template-home">
  <div>
    <lds-login v-if="!isValidated" />
    <lds-edit v-if="isEditing" />
    <lds-list v-bind:recordList='recordList' v-if="isShowList" />
  </div>
</template>
<script>
import Login from "./Login.vue";
import EditForm from "./EditForm.vue";
import RecordList from "./RecordList.vue";
export default {
  name: "mainApp",
  data() {
    return {
      isValidated: true,
      isEditing: true,
      recordList: [1,2]
    };
  },
  computed: {
    isShowList: function() {
      return this.isValidated && !this.isEditing;
    }
  },
  methods: {},
  components: {
    "lds-login": Login,
    "lds-edit": EditForm,
    "lds-list": RecordList
  }
};
</script>
