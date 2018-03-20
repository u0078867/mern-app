import { Router } from 'express';
import * as LoginController from '../controllers/login.controller';
import passport from 'passport';
import jwt_validate from 'express-jwt';
//import serverConfig from '../../../config';
const router = new Router();


function passportAuthenticate(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) {
      return next(new Error(info.message));
    }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      next();
    });
  })(req, res, next);
}

// authenticate with username / access key
router.post('/login/authenticate',
  passportAuthenticate,
  LoginController.authenticate
);

// authenticate with token
router.get('/login/validate-token',
  LoginController.replaceReqUserByLocalUser,
  LoginController.authenticate
);

module.exports = router;
