// 导入组件
import Vue from 'vue';
import App from './components/VueApp.vue';
Vue.config.debug = true;//开启错误提示

new Vue({
  name:'AppContainee',
  el: '#AppContainer',
  components: {
    'lds-app': App
  }
});







