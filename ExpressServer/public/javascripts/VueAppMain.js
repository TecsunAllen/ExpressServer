// 导入组件
import Vue from 'vue';
import App from './components/VueApp.vue';
Vue.config.debug = true;//开启错误提示
import recordManager from './RecordManager.js';
import store from './vueAppStore.js';
var app = new Vue({
  name:'AppContainee',
  el: '#AppContainer',
  store,
  template: '<lds-app/>',
  components: {
    'lds-app': App
  },
  render: h => h(App)
});
// $watch 是一个实例方法
app.$watch('state', function (newValue, oldValue) {
  // 这个回调将在 `vm.a` 改变后调用
  console.log(newValue);
});
store.commit("initState");
