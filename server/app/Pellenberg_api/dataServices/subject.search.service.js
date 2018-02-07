import {getItems} from './entity.search.service';



export function getSubjects(q) {
  return getItems(q, 'subjects');
}
