//state
import Vue from 'vue';
import Vuex from 'vuex';
import recordManager from './RecordManager.js';
import shareManager from './ShareManager';
Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    isValidated: false,
    isEditing: false,
    recordList: [],
    markList: [],
    queryShareCodes:[],
    todayShareCodes: []
  },
  mutations: {
    actionController(state,ev,data) {
      var target = ev.target;
      var action = target.dataset.action;
      var data = ev.bindedData;
      switch (action) {
        case "submitRecord":
          saveRecord(target.parentNode);
          break;
        case "setMark":
          setMark(parseInt(ev.target.parentNode.firstChild.value));
          break;
        case "queryShare":
          queryShare(ev.target.value);
        break;
          case "favShare":
          var favCodesJson =  localStorage.getItem("favCodes") || "[]";
          if(favCodesJson=="[object Object]"){
             localStorage.setItem("favCodes","");
             favCodesJson="[]";
          }
          var favCodes = JSON.parse(favCodesJson);
          if(favCodes.indexOf(data.f_code)<0) favCodes.push(data.f_code);
          localStorage.setItem("favCodes",JSON.stringify(favCodes));
        break;
      }
    },
    initState() {
      getMarks();
      getRecordList();
      getTodayShareThumb();
      intervalShares();
    }
  }
});


function intervalShares(){
  var hours = (new Date()).getHours();
  if(hours>=9 && hours<=16){
    getTodayShareThumb();
    setTimeout(intervalShares,5000);
  }
}


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

async function queryShare(query) {
  let info = await shareManager.getShareInfo(query);
  var result = [];
  for (var i = 0; i < info.length; i++) {
    result.push({id:Math.random(), f_code:info[i].f_code, code:info[i].f_symbol,name:info[i].f_symbolName});
  }
  store.state.queryShareCodes = result;
}

async function getTodayShareThumb() {
  var favCodesJson =  localStorage.getItem("favCodes") || "[]";
  var favCodes = JSON.parse(favCodesJson);
  let infos = await shareManager.getSharesInfoBatchByCode(favCodes);
  var todayShareCodes = infos.map(function(info){
    
    return{
      id: Math.random(),
      name: info.stockName,
      code:info.stockCode,
      f_code: info.exchange+info.stockCode,
      price: info.close.toFixed(2),
      priceCL: (info.close - info.preClose).toFixed(2),
      percentCL: ((info.close - info.preClose)*100/info.preClose).toFixed(2),
      volume:info.volume,
      totalWorth:info.capitalization,
      todayWave: null
    };
  });
  store.state.todayShareCodes = todayShareCodes;
  /*for (var i = 0; i < store.state.todayShareCodes.length; i++) {
    var share = store.state.todayShareCodes[i];
    var code = share.code;
    //let info = await shareManager.getShareInfo(code);
    //let page = await shareManager.getSharePageInfoByCode(info[0].f_code);
    //let responseToday = await shareManager.getTodayWaveByCode(info[0].f_code);
    //share.name = info[0].f_symbolName;
    //Object.assign(share, page);
    //share.todayWave = responseToday.timeLine;
    share.id = Math.random();
  }*/
}

export default store;

