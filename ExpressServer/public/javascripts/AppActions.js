/*
 * action 类型
 */

export const GOTO_FOLDER = 'GOTO_FOLDER';
export const OPEN_FILE = 'OPEN_FILE';
export const SET_STATE = 'SET_STATE';
export const SEARCH_FILES = 'SEARCH_FILES';
/*
 * 其它的常量
 */

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
}

/*
 * action 创建函数
 */

export function gotoFolder(folderPath) {
  return { type: GOTO_FOLDER, folderPath: folderPath }
}


export function openFile(filePath) {
  return { type: OPEN_FILE, filePath: filePath }
}

export function setState(state) {
  return { type: SET_STATE, state: state }
}
export function searchFiles(name) {
  return { type: SEARCH_FILES, name: name }
}


export function dispatchEvents() {
  var type = arguments[0];
  var data = arguments[1];
  switch (type) {
    case "intoFolder":
      return gotoFolder(data);
    case "openFile":
      return openFile(data);
    case "searchFiles":
      return searchFiles(data);
  }
}