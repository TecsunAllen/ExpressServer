// Reducer
import AppState from './AppState.js';
import { gotoFolder, GOTO_FOLDER } from './AppActions.js';

          
          
export const SCAN_FOLDER_URL = "/scanFolder?folderPath=";
export const GET_THUMB_URL = "/getThumbImage?path=";
export const GET_SRCIMAGE_URL = "/getFile?path=";


export function appReducer(state = AppState, action) {
  switch (action.type) {
    case GOTO_FOLDER:
      var folderPath = action.folderPath || state.currentFolder.path;
      var xhr = new XMLHttpRequest();
      xhr.open("get",SCAN_FOLDER_URL + folderPath,false);
      xhr.send();    
      var data = JSON.parse(xhr.response); 
      var newState = Object.assign({}, state,{
        currentFolder: {
          path: data.currfolder,
          fileList: data.files,
          folderList: data.childfolders
        }
      });
      return newState;
    default:
      return state
  }
}