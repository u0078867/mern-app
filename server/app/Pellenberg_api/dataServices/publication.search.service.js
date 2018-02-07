import {getItems} from './entity.search.service';



export function getPublications(q) {
  return getItems(q, 'publications');
}
