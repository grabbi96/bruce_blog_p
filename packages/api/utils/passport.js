const passport = require('passport');
const passportJWT = require('passport-jwt');

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const User = require('../models/user');

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.APP_SECRET,
    },
    (jwtPayload, cb) =>
      User.findById(jwtPayload.id)
        .then(user => cb(null, user))
        .catch(err => console.log(err) || cb(err))
  )
);
