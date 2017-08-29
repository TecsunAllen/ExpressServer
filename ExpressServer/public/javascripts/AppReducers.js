// Reducer
import AppState from './AppState.js';
import {gotoFolder,openImage,OPEN_IMAGE,GOTO_FOLDER} from './AppActions.js';

          
          
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
    case OPEN_IMAGE:
      var fileName = action.fileName;
      var newState = Object.assign({}, state,{
        currentFolder: {
          path: state.currentFolder.path,
          fileList: state.currentFolder.fileList,
          folderList: state.currentFolder.folderList,
          selectedFileName:fileName
        }
      });
      return newState;
      return newState;
    default:
      return state
  }
}