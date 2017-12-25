<style>

</style>
<template id="template-home">
  <div v-on:click="eventHander">
    <lds-login v-if="!isValidated" />
    <lds-edit v-if="isEditing"></lds-edit>
    <lds-list v-bind:recordList='recordList' v-if="isShowList" ></lds-list>
    <lds-marklist v-bind:markList='markList'></lds-marklist>
    <div>
      <select ref='markSelect'>
        <option value="0">30分钟</option>
      </select>
      <button data-action="setMark">签到</button>
      </div>
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
    isShowList() {
      return this.isValidated;
    },
    isValidated(){
      return this.$store.state.isValidated;
    },
    isEditing(){
      return this.$store.state.isEditing;
    },
    recordList(){
      return this.$store.state.recordList;
    },
    markList(){
      return this.$store.state.markList;
    }
  },
  methods: {
    eventHander(ev){
        this.$store.commit('actionController',ev);
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
