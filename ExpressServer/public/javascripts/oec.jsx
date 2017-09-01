import React, { Component ,PropTypes } from 'react';
import ReactDom from 'react-dom';
import {
    HashRouter,
    hashHistory,
    BrowserRouter,
    Route,
    Link,
    Switch
} from 'react-router-dom';
import OecModules from './OecModules.jsx';
import Meeting from './MeetingPage.jsx';
import "../components/css/App.css"; // 载入 style.css

ReactDom.render(
    <BrowserRouter basename="" >
      <div id="APPRouterContainer">
        <Route exact path="/oec" component={OecModules} />
        <Route exact path="/meeting" component={Meeting} />
      </div>
    </BrowserRouter>,
  document.getElementById('AppContainer')
)
