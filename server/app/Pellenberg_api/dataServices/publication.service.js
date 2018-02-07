import {getAllItems, getItems, getItem} from './entity.service';


export function getAllPublications() {
  return getAllItems('publications');
}


export function getPublications(cuids) {
  return getItems(cuids, 'publications');
}


export function getPublication(cuid) {
  return getItem(cuid, 'publications');
}
