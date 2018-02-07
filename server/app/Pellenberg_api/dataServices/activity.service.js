import {getAllItems, getItems, getItem} from './entity.service';


export function getAllActivities() {
  return getAllItems('activities');
}


export function getActivities(cuids) {
  return getItems(cuids, 'activities');
}


export function getActivity(cuid) {
  return getItem(cuid, 'activities');
}
