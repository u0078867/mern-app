import {getAllItems, getItems, getItem} from './entity.service';


export function getAllSWTools() {
  return getAllItems('swtools');
}


export function getSWTools(cuids) {
  return getItems(cuids, 'swtools');
}


export function getSWTool(cuid) {
  return getItem(cuid, 'swtools');
}
