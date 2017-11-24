import Vue from 'vue';
import Favlist from './components/Favlist.vue';
Vue.config.debug = true;//开启错误提示
/*window.onload = function () {
  new Vue({
      el: '#AppContainer',
      components: {
        'my-component': Favlist
      }
  });
};*/

/*Vue.component('my-component', {
  template: '<li>这是个待办项</li>'
});*/

new Vue({
  el: '#AppContainer',
  components: {
    'my-component': Favlist
  }
});



