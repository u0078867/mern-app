import {getAllItems, getItems, getItem} from './entity.service';


export function getAllProjects() {
  return getAllItems('projects');
}


export function getProjects(cuids) {
  return getItems(cuids, 'projects');
}


export function getProject(cuid) {
  return getItem(cuid, 'projects');
}
