//state
import Vue from 'vue';
import Vuex from 'vuex';
import recordManager from './RecordManager.js';
Vue.use(Vuex);
const service = {};
const store = new Vuex.Store({
  state: {
    isValidated: true,
    isEditing: true,
    recordList: [1, 2, 3],
    markList: []
  },
  mutations: {
    actionController(state, ev) {
      var target = ev.target;
      var action = target.dataset.action;
      switch (action) {
        case "submitRecord":
          saveRecord(target.parentNode);
          break;
        case "setMark":
          setMark(parseInt(ev.target.parentNode.firstChild.value));
          break;
      }
    },
    initState() {
      getMarks();
      getRecordList();
    }
  }
});


async function saveRecord(form) {
  recordManager.setUserId('123');
  recordManager.setUserName('qwe');
  await recordManager.saveRecordAsync({
    form: form
  });
  await getRecordList();
}

async function getMarks() {
  let response = await recordManager.getMarks();
  store.state.markList = response;
}

async function getRecordList() {
  let response = await recordManager.getRecords();
  store.state.recordList = response;
}

async function setMark(type) {
  await recordManager.setMark(type);
  getMarks();
}

export default store;

