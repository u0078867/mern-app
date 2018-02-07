import {getItems} from './entity.search.service';



export function getProjects(q) {
  return getItems(q, 'projects');
}
