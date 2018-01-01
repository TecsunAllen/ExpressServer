<style>

</style>
<template id="template-home">
  <div id="appMainContainer" v-on:click="eventHander">
    <div id="appTitle">
    </div>
    <div id="appBody">
    <lds-login v-if="isValidated" />
    <lds-timeAxis></lds-timeAxis>
    <div v-if="isShowList" id="calendaContainer">
      <lds-Calendar></lds-Calendar>
    </div>
    <lds-edit v-if="isEditing"></lds-edit>
    <lds-list v-bind:recordList='recordList' v-if="isShowList" ></lds-list>
    <lds-marklist v-if="isShowList" v-bind:markList='markList'></lds-marklist>
    <div v-if="isEditing">
      <select ref='markSelect'>
        <option value="0">30分钟</option>
      </select>
      <button data-action="setMark">签到</button>
    </div>
    </div>
  </div>
</template>
<style>
#appMainContainer{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display:flex;
    flex-direction: column;
}
#appTitle{
  flex:1;
}
#appBody{
  flex:15;
  overflow: auto;
}
#calendaContainer {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
}
</style>
<script>
import Login from "./Login.vue";
import EditForm from "./EditForm.vue";
import RecordList from "./RecordList.vue";
import MarkList from "./VueMarkList.vue";
import Calendar from "./VueCalendar.vue";
import TimeAxis from "./VueTimeAxis.vue";
import recordManager from "../RecordManager.js";

export default {
  name: "mainApp",
  data() {
    return {};
  },
  computed: {
    isShowList() {
      return this.isValidated;
    },
    isValidated() {
      return this.$store.state.isValidated;
    },
    isEditing() {
      return this.$store.state.isEditing;
    },
    recordList() {
      return this.$store.state.recordList;
    },
    markList() {
      return this.$store.state.markList;
    }
  },
  methods: {
    eventHander(ev) {
      this.$store.commit("actionController", ev);
    }
  },
  components: {
    "lds-login": Login,
    "lds-edit": EditForm,
    "lds-list": RecordList,
    "lds-marklist": MarkList,
    "lds-Calendar": Calendar,
    "lds-timeAxis":TimeAxis
  }
};
</script>
