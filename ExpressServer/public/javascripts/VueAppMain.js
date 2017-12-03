// 导入组件
import Vue from 'vue';
import App from './components/VueApp.vue';
Vue.config.debug = true;//开启错误提示
import recordManager from './RecordManager.js';
var app = new Vue({
  name:'AppContainee',
  el: '#AppContainer',
  data:{
    state:{
      isValidated: true,
      isEditing: true,
      recordList: [1,2,3]
    }
  },
  components: {
    'lds-app': App
  }
});