import React, { Component ,PropTypes } from 'react';
import ReactDom from 'react-dom';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux'
import {
    HashRouter,
    hashHistory,
    Route,
    Link,
    Switch
} from 'react-router-dom';
import {} from 'react-router-redux';
import { createHashHistory } from 'history';

import MainContainer from './photoAnalysis.jsx';
import PS from './PhotoShop.jsx';
import AppState from './AppState.js';
import {setLoading,IS_LOADING} from './AppActions.js';

/*
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


class App extends Component{
  render(){
    <Provider store={store}>
      <Router>
        <Route path="/" component={PS} />
        <Route path="/(:filter)" component={App} />
      </Router>
    </Provider>
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
)*/
ReactDom.render(
  <BrowserRouter
    basename="/minooo"
    forceRefresh={false}
    keyLength={12}
    >
    <div>
      <AddressBar/>    
      <Link to="/">Home</Link>
      <Route exact path="/" component={Home} />
    </div>
  </BrowserRouter>,
  document.getElementById('AppContainer')
)
/**
 * http://www.jianshu.com/p/e3adc9b5f75c/
 */