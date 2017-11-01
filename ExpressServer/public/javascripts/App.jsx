// 载入 css
import "../stylesheets/App.css";
//引用公共库
import React from 'react';
import ReactDom from 'react-dom';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import {BrowserRouter,Route} from 'react-router-dom';
//加载组件
import MainApp from './MyLife.jsx';
//加载redux模块
import { appReducer} from './AppReducers.js';
import {AppController} from './AppController.js';
const store = createStore(appReducer);
const App = connect(
  (state) => {
    return {
      currentFolder: state.currentFolder
    };
  },
  (dispatch) => {
    return {
      eventHander: (ev,component)=>AppController(dispatch)(ev,component)
    };
  }
)(MainApp);

ReactDom.render(
  <Provider store={store}>
    <BrowserRouter basename="" >
      <div id="APPRouterContainer">
        <Route exact path="/" component={App} />
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('AppContainer')
);














































/*
(function () {
  var xhr = new XMLHttpRequest();
  xhr.open("get", SCAN_FOLDER_URL + store.getState().currentFolder.path, true);
  xhr.onload = function (ev) {
    var data = JSON.parse(ev.target.response);
    store.dispatch(dispatchEvents("intoFolder", data));
  }
  xhr.send();

  window.onresize = () => {
    store.dispatch(dispatchEvents())
  }
  window.oncontextmenu  = function (e) {
    e.preventDefault();
  }
}());*/
/**
 * http://www.jianshu.com/p/e3adc9b5f75c/
 */