import {getAllItems, getItems, getItem} from './entity.service';


export function getAllDevices() {
  return getAllItems('devices');
}


export function getDevices(cuids) {
  return getItems(cuids, 'devices');
}


export function getDevice(cuid) {
  return getItem(cuid, 'devices');
}
