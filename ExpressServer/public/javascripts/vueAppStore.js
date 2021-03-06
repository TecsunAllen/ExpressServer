//state
import Vue from 'vue';
import Vuex from 'vuex';
import recordManager from './RecordManager.js';
import shareManager from './ShareManager';
import $ from 'jquery';
Vue.use(Vuex);
const store = new Vuex.Store({
  state: {
    isValidated: false,
    isEditing: false,
    recordList: [],
    markList: [],
    queryShareCodes:[],
    todayShareCodes: [],
    waveData:[]
  },
  mutations: {
    actionController(state,ev) {
      var target = ev.currentTarget;
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
        case "stockDetail":
          if(ev.type == "dragstart"){
            ev.currentTarget.parentElement.draggingElement = ev.currentTarget;         
          }
          else if(ev.type=='dragover'){
            ev.preventDefault();
            $(ev.currentTarget.parentElement.draggingElement).css("position","absolute");
          }
          else if(ev.type == "drop"){
            ev.currentTarget.parentElement.insertBefore(ev.currentTarget.parentElement.draggingElement,ev.currentTarget.nextSibling);
            var f_codes= Array.from(ev.currentTarget.parentElement.children).map((element)=>{
              return element.children[0].innerText;
            });
            localStorage.setItem("favCodes",JSON.stringify(f_codes));
          }
        break;
      }
    },
    initState() {
      let infos = shareManager.getAllStockCodes();
      console.log("开始初始化数据");
      getTodayShareThumb();
      requestAnimationFrame(intervalShares());
      //getTodayStockWave();
    }
  }
});

/*  刷新数据 */
function intervalShares() {
  var lastTime = 0;
  var func;
  func = function () {
    var curTime = (new Date()).getTime();
    var hours = (new Date()).getHours();
    if (hours >= 9
      && hours <= 16
      && (new Date()).getDay() >= 1
      && (new Date()).getDay() <= 5
      &&(curTime - lastTime) > 3000) {
      getTodayShareThumb();
      lastTime = curTime;
    }
    requestAnimationFrame(func);
  };
  return func;
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
  //console.log("开始查询"+query);
  let info = await shareManager.getShareInfo(query);
  var result = [];
  for (var i = 0; i < info.length; i++) {
    result.push({id:Math.random(), f_code:info[i].f_code, code:info[i].f_symbol,name:info[i].f_symbolName});
  }
  store.state.queryShareCodes = result;
}

//同时获取多个股票的实时简略信息
async function getTodayShareThumb() {
  console.log("开始获取");
  var favCodesJson =  localStorage.getItem("favCodes") || "[\"sh000001\"]";
  var favCodes = JSON.parse(favCodesJson);
  //let fundInfos =await shareManager.getFundInfoByCodes(["110022","020026"]);
  let fundInfos =[];
  let infos = await shareManager.getSharesInfoBatchByCode(favCodes);
  infos = infos.concat(fundInfos);
  var todayShareCodes = infos.map(function(info){  
    return{
      id: Math.random(),
      name: info.stockName,
      code:info.stockCode,
      f_code: info.exchange+info.stockCode,
      price: info.close.toFixed(2),
      priceCL: (info.close - info.preClose).toFixed(2),
      percentCL: info.percentCL|| ((info.close - info.preClose)*100/info.preClose).toFixed(2),
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
async function getTodayStockWave(code) {
  let info = await shareManager.getTodayWaveByCode(code || store.state.todayShareCodes[0].f_code);
  var priceArr=info.timeLine.map((element)=>{
      return element.price;
  });
  store.state.waveData = priceArr;
}
export default store;

