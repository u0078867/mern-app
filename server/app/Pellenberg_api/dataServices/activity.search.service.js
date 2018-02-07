import {getItems, getItemsByFields} from './entity.search.service';



export function getActivities(q) {
  return getItems(q, 'activities');
}


export function getActivitiesByFields(fieldsQ) {
  return getItemsByFields(fieldsQ, 'activities');
}


export function getActivitiesBySession(session) {
  return getActivitiesByFields([
    {
      session
    }
  ]);
}
