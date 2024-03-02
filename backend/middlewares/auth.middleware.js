const passport = require('passport');
const { UnAuthorizedError } = require('../errors');

const authMiddleware = async (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user) => {
        if (err || !user) {
            if (req.cookies.api_token) {
                res.clearCookie('api_token');
            }
            throw new UnAuthorizedError('Authentication invalid');
        }

        req.user = user;
        next();
    })(req, res, next);
}

module.exports = { authMiddleware }