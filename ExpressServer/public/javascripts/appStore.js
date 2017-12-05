//state
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
export default  new Vuex.Store({
    state: {
        isValidated: true,
        isEditing: true,
        recordList: [1,2,3]
    },
    mutations: {
      increment (state) {
        debugger
        state.recordList = [1,2,6];
      }
    }
  });