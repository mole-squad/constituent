import * as passport from 'passport';
import * as FacebookStrategy from 'passport-facebook-token';
import * as jwt from 'jsonwebtoken';

import User from '../models/user';

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_CLIENT_ID,
  clientSecret: process.env.FACEBOOK_SECRET
},
function(token, refreshToken, profile, done) {
  process.nextTick(function() {
    User.findOne({ 'facebook.id' : profile.id }, function(err, user) {
      if (err) {
        console.log(err);
        return done(err);
      }

      if (user) {

        return done(null, user);
      } else {
        const newUser  = new User();

        newUser.facebook.id    = profile.id;
        newUser.facebook.token = token;

        if (profile.displayName) {
          newUser.facebook.name = profile.displayName;
        } else if (profile.name && profile.name.givenName && profile.name.familyName) {
          newUser.facebook.name  = `${profile.name.givenName}  ${profile.name.familyName}`;
        } else {
          newUser.facebook.name = `Facebook user ${profile.id}`;
        }

        newUser.save(function(err) {
          if (err) throw err;
          return done(null, newUser);
        });
      }
    });
  });
}));

export const facebookLogin = passport.authenticate('facebook-token');

export const getToken = (user) => {
  const secret = process.env.APP_SECRET;
  const expiresIn = getExpiration(12);
  const token = jwt.sign(user.toObject(), secret, { expiresIn });

  return { token, expiresAt: Date.now() + expiresIn * 1000 };
};

function getExpiration(noHours) : number {
  return noHours * 3600;
}