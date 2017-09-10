/*
 * action 类型
 */

export const GOTO_FOLDER = 'GOTO_FOLDER';
export const OPEN_IMAGE = 'OPEN_IMAGE';
export const SET_STATE = 'SET_STATE';
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
  return { type: GOTO_FOLDER,folderPath:folderPath }
}


export function openImage(fileName) {
  return { type: OPEN_IMAGE,fileName:fileName }
}

export function setState(state) {
  return { type: SET_STATE,state:state }
}