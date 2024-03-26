
const User = require('../models/user.model');

const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;


const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_KEY 
};

// Create JWT strategy for authentication
const jwtStrategy = new JwtStrategy(jwtOptions, async (payload, done) => {
    try {
      const user = await User.findById(payload.userId);
      if (user) {
        return done(null, user); 
      } else {
        return done(null, false); 
      }
    } catch (error) {
      done(error, false); 
    }
  });


passport.use(jwtStrategy);

