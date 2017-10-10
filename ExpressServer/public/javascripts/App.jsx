﻿//引用公共库
import React, { Component, PropTypes } from 'react';
import ReactDom from 'react-dom';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux'
import {
  BrowserRouter,
  Route,
  Link,
  Switch
} from 'react-router-dom';
//加载组件
import MainContainer from './FileCloud.jsx';
import Map from './Map.jsx';
//加载redux模块
import AppState from './AppState.js';
import { dispatchEvents, setState } from './AppActions.js';
import { appReducer, GET_THUMB_URL, SEARCH_FILES_URL, SCAN_FOLDER_URL, GET_SRCIMAGE_URL } from './AppReducers.js';

// 载入 css
import "../components/css/App.css";

const store = createStore(appReducer)
store.subscribe((data) => {
  console.log(store.getState());
})
const App = connect(
  (state) => {
    return {
      currentFolder: state.currentFolder,
      searchedFiles: state.searchedFiles,
      selectedFilePath: state.selectedFilePath,
      GET_THUMB_URL: GET_THUMB_URL,
      GET_SRCIMAGE_URL: GET_SRCIMAGE_URL
    }
  },
  (dispatch) => {
    return {
      eventHander: function () {
        var _argumrnts = arguments;
        switch (arguments[0]) {
          case "intoFolder":
            debugger
            var xhr = new XMLHttpRequest();
            xhr.open("get", SCAN_FOLDER_URL + arguments[1], true);
            xhr.onload = function (ev) {
              var data = JSON.parse(ev.target.response);
              dispatch(dispatchEvents(_argumrnts[0], data));
            }
            xhr.send();
            break;
          case "searchFiles":
            var xhr = new XMLHttpRequest();
            xhr.open("get", SEARCH_FILES_URL + arguments[1], true);
            xhr.onload = function (ev) {
              var data = JSON.parse(ev.target.response);
              dispatch(dispatchEvents(_argumrnts[0], data));
            }
            xhr.send();
            break;
          default:
            dispatch(dispatchEvents(arguments[0], arguments[1], arguments[2]));
        }
      }
    }
  }
)(MainContainer);

const MapApp = connect(
  (state) => {
    return {
      
    }
  },
  (dispatch) => {
    return {
    }
  }
)(Map);


ReactDom.render(
  <Provider store={store}>
    <BrowserRouter basename="" >
      <div id="APPRouterContainer">
        <Route exact path="/" component={MapApp} />
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('AppContainer')
);

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
}());
/**
 * http://www.jianshu.com/p/e3adc9b5f75c/
 */