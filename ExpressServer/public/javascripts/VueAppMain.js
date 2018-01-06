// 导入组件
import Vue from 'vue';
import App from './components/VueApp.vue';
import router from './routes.js';
Vue.config.debug = true;//开启错误提示
import recordManager from './RecordManager.js';
import store from './vueAppStore.js';
Date.prototype.Format = function (fmt) { //author: meizz 
  var o = {
      "M+": this.getMonth() + 1, //月份 
      "d+": this.getDate(), //日 
      "h+": this.getHours(), //小时 
      "m+": this.getMinutes(), //分 
      "s+": this.getSeconds(), //秒 
      "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
      "S": this.getMilliseconds() //毫秒 
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
  if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
};


var app = new Vue({
  name:'AppContainee',
  router,
  el: '#AppContainer',
  store,
  template: '<router-view></router-view>'
});
// $watch 是一个实例方法
app.$watch('state', function (newValue, oldValue) {
  // 这个回调将在 `vm.a` 改变后调用
  console.log(newValue);
});
store.commit("initState");
