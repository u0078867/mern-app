import {getAllItems, getItems, getItem} from './entity.service';


export function getAllSubjects() {
  return getAllItems('subjects');
}


export function getSubjects(cuids) {
  return getItems(cuids, 'subjects');
}


export function getSubject(cuid) {
  return getItem(cuid, 'subjects');
}
