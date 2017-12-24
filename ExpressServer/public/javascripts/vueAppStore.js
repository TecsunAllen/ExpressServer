//state
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const service = {};
const store = new Vuex.Store({
  state: {
    isValidated: true,
    isEditing: true,
    recordList: [1, 2, 3],
    markList:[]
  },
  mutations: {
    mark(state,type) {
      mark(type);
    },
    initState(state){
      getMarkList();
      getRecordList();
    }
  }
});

//打卡

async function getMarkList() {
  let response =  await new Promise(function(resolve,reject){
      var xhr = new XMLHttpRequest();
      var data = JSON.stringify({
      });
      xhr.open('GET','/getData?collectionName=mark&queryInfo='+data,true);
      xhr.onload=function(ev){
        resolve(ev.currentTarget.response);
      }
      xhr.send();
  });
  console.log(response);
}

async function getRecordList() {
  let response =  await new Promise(function(resolve,reject){
      var xhr = new XMLHttpRequest();
      var data = JSON.stringify({
      });
      xhr.open('GET','/getData?collectionName=Records&queryInfo='+data,true);
      xhr.onload=function(ev){
        resolve(ev.currentTarget.response);
      }
      xhr.send();
  });
  var list = JSON.parse(response);
  store.state.recordList = list;
}

async function mark(type) {
  let response =  await new Promise(function(resolve,reject){
      var xhr = new XMLHttpRequest();
      var data = JSON.stringify({
        type:type,
        date:(new Date()).getTime()
      });
      xhr.open('GET','/insertData?collectionName=mark&data='+data,true);
      xhr.onload=function(response){
        resolve(response);
      }
      xhr.send();
  });
  console.log(response);
}

export default store;

