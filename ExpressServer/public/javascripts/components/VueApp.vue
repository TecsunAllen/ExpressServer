<style>

</style>
<template id="template-home">
  <div>
    <lds-login v-if="!isValidated" />
    <lds-edit v-if="isEditing"></lds-edit>
    <lds-list v-bind:recordList='recordList' v-if="isShowList" ></lds-list>
    <lds-marklist v-bind:markList='markList'></lds-marklist>
    <select ref='markSelect'>
      <option value="0">30分钟健身</option>
    </select>
      <button v-on:click="mark">签到</button>
  </div>
</template>
<script>
import Login from "./Login.vue";
import EditForm from "./EditForm.vue";
import RecordList from "./RecordList.vue";
import MarkList from "./VueMarkList.vue";
import recordManager from '../RecordManager.js';

export default {
  name: "mainApp",
  data() {
    return {
    };
  },
  computed: {
    isShowList: function() {
      return this.isValidated;
    },
    isValidated:function(){
      return this.$store.state.isValidated;
    },
    isEditing:function(){
      return this.$store.state.isEditing;
    },
    recordList:function(){
      return this.$store.state.recordList;
    },
    markList:function(){
      return this.$store.state.markList;
    }
  },
  methods: {
    mark(){
        this.$store.commit('mark',parseInt(this.$refs.markSelect.value));
    }
  },
  components: {
    "lds-login": Login,
    "lds-edit": EditForm,
    "lds-list": RecordList,
    "lds-marklist":MarkList
  }
};
</script>
