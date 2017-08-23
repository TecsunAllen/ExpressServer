import React, { Component ,PropTypes } from 'react';
import ReactDom from 'react-dom';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux'
import {
    HashRouter,
    Route,
    Link,
    Switch
} from 'react-router-dom';
import { createHashHistory } from 'history';

import MainContainer from './photoAnalysis.jsx';
import AppState from './AppState.js';
import {setLoading,IS_LOADING} from './AppActions.js';

// Action
const increaseAction = { type: 'increase' }

// Reducer
function counterReducer(state = AppState, action) {
  
  const count = state.count
  switch (action.type) {
    case IS_LOADING:
      return { isLoading: !state.isLoading }
    default:
      return state
  }
}

// Store

const store = createStore(counterReducer)

// Map Redux state to component props
function mapStateToProps(state) {
  return {
    isLoading: state.isLoading
  }
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return {
    onIncreaseClick: () => dispatch(setLoading())
  }
}

// Connected Component
const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(MainContainer)

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('AppContainer')
)