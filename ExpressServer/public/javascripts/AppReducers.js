// Reducer
import AppState from "./AppState.js";
import {OPEN_FILE, GOTO_FOLDER, SET_STATE, SEARCH_FILES } from "./AppActions.js";




export const SCAN_FOLDER_URL = "/scanFolder?folderPath=";
export const GET_THUMB_URL = "/getThumbImage?path=";
export const GET_SRCIMAGE_URL = "/getFile?path=";
export const SEARCH_FILES_URL = "/findFile?fileName=";

export function appReducer(state = AppState, action) {
  var newState;
  var data;
  switch (action.type) {
    case SET_STATE:
      return action.state;
    case GOTO_FOLDER:
      data = action.data;
      newState = Object.assign({}, state, {
        currentFolder: {
          path: data.currfolder,
          fileList: data.files,
          folderList: data.childfolders,
        },
        selectedFilePath: ""
      });
      return newState;
    case OPEN_FILE:
      var filePath = action.filePath;
      newState = Object.assign({}, state, {
        selectedFilePath: filePath
      });
      return newState;
    case SEARCH_FILES:
      data = action.data;
      newState = Object.assign({}, state, {
        searchedFiles: {
          fileList: data,
        },
        selectedFilePath: ""
      });
      return newState;
    default:
      return state;
  }
}