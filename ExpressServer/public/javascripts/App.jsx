import React, { Component ,PropTypes } from 'react';
import ReactDom from 'react-dom';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux'
import {
    HashRouter,
    hashHistory,
    BrowserRouter,
    Route,
    Link,
    Switch
} from 'react-router-dom';
//import {} from 'react-router-redux';
import { createHashHistory } from 'history';

import MainContainer from './photoAnalysis.jsx';
import PS from './PhotoShop.jsx';
import AppState from './AppState.js';
import {gotoFolder,GOTO_FOLDER} from './AppActions.js';

import {appReducer,GET_THUMB_URL} from './AppReducers.js';
import "../components/css/PhotoExplorer.css"; // 载入 style.css
// Store
const store = createStore(appReducer)


function mapStateToProps(state) {
  return {
    currentFolder: state.currentFolder,
    GET_THUMB_URL:GET_THUMB_URL
  }
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return {
    onFolderSelect: (folderPath) => dispatch(gotoFolder(folderPath)),
    onMainComponentLoad:() => dispatch(gotoFolder()),
  }
}

const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(MainContainer)


ReactDom.render(
  <Provider store={store}>
    <BrowserRouter basename="" >
      <div id="APPRouterContainer">
        <Route exact path="/" component={App} />
        <Route exact path="/ps" component={PS} />
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('AppContainer')
)


/**
 * http://www.jianshu.com/p/e3adc9b5f75c/
 */