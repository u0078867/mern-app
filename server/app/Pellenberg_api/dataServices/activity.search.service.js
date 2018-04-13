import {getItems, getItemsByFields} from './entity.search.service';
import Models from 'MODELS_PATH/entity';


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

export function getAllSessions() {
  let Model = Models['activities'];
  return Model.find([
    {
      $group : {
         _id : '$session',
         count: { $sum: 1 }
      }
    },
    { $addFields: { name: '$_id' } },
    { $project : { _id: 0 } },
  ])
}
