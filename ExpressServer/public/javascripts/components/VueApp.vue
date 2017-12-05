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
import recordManager from '../RecordManager.js';

export default {
  name: "mainApp",
  data() {
    return {
      isValidated: this.$store.state.isValidated,
      isEditing: this.$store.state.isEditing,
      recordList: this.$store.state.recordList
    };
  },
  computed: {
    isShowList: function() {
      return this.isValidated;
    }
  },
  methods: {

  },
  components: {
    "lds-login": Login,
    "lds-edit": EditForm,
    "lds-list": RecordList
  }
};
</script>
