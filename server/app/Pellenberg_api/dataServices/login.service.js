import Models from 'MODELS_PATH/entity';


export function getUserByInstitutionId(id) {
  let Model = Models['researchers'];
  return Model.find({
    institution_id: id
  })
  .then(users => {
    if (users.length == 0) return null;
    return users[0];
  })
}
