const passport = require('passport')
const { Strategy: JWTStrategy } = require('passport-jwt');
const UserModel = require('../models/user.model');

require('dotenv').config();


const cookieExtractor = (req) => {
    let token = null;

    if(req && req.cookies){
        token = req.cookies['api_token'];
    }

    return token;
}

const options = {
    jwtFromRequest: cookieExtractor,
    secretOrKey: process.env.JWT_SECRET,
}

const jwtStrategy = new JWTStrategy(options, async(payload, done) => {
    const user = await UserModel.findById(payload._id).select('-passport');

    if(!user){
        return done(null);
    }

    return done(null, user);
});

passport.use(jwtStrategy);