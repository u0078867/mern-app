
import jwt from 'jsonwebtoken';
import serverConfig from '../../../config';
import { getUserByInstitutionId } from '../dataServices/login.service';


export function authenticate(req, res) {
  let user = req.user;
  let token = jwt.sign(user, serverConfig.jwtSecret, {
    //expiresIn: 1440 // expires in 1 hour
    expiresIn: '24h',
  });
  res.status(200).json({ user, token });
}

export function replaceReqUserByLocalUser(req, res, next) {
  let reqUser = req.user;
  getUserByInstitutionId(reqUser.institution_id)
  .then(user => {
    if (!user) {
      throw new Error('Logged in user is not authorized to use this application')
    }
    let profile = JSON.parse(JSON.stringify(user));
    if (profile.isAdmin == undefined) {
      profile.isAdmin = false;
    }
    req.user = profile;
    next();
  })
  .catch(err => {
    res.status(401).json({ err });
  })
}
