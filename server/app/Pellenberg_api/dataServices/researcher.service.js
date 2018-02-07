import {getAllItems, getItems, getItem} from './entity.service';



export function getAllResearchers() {
  return getAllItems('researchers');
}


export function getResearchers(cuids) {
  return getItems(cuids, 'researchers');
}


export function getResearcher(cuid) {
  return getItem(cuid, 'researchers');
}
