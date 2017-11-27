// Reducer
import AppState from "./AppState.js";
export function appReducer(state = AppState, action) {
  var newState;
  switch (action.type) {
    case 'loginOn':
      newState = Object.assign({}, state, { isLogon: action.data.success });
      return newState;
    default:
      return state;
  }
}