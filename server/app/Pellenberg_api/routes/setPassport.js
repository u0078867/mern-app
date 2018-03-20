
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { getUserByInstitutionId } from '../dataServices/login.service';
import serverConfig from '../../../config';

module.exports = function(app) {

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

  passport.use(new LocalStrategy(
    function(username, password, done) {
      getUserByInstitutionId(username)
      .then(user => {
        if (!user) {
          return done(null, false, { message: 'Incorrect username' });
        }
        if (password != serverConfig.accessKey && password != serverConfig.accessKeyAdmin) {
          return done(null, false, { message: 'Incorrect access key' });
        }
        let profile = JSON.parse(JSON.stringify(user));
        if (password == serverConfig.accessKey) {
          profile.isAdmin = false;
        }
        if (password == serverConfig.accessKeyAdmin) {
          profile.isAdmin = true;
        }
        return done(null, profile);
      })
      .catch(err => {
        return done(err);
      })
    }
  ));

  return passport.initialize();
}
