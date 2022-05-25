const { ExtractJwt, Strategy } = require('passport-jwt');
const { User } = require('../models');
require('dotenv').config();


module.exports = function(passport) {
    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = process.env.jwt_encryption;

    passport.use('jwt', new Strategy(opts, async function(jwt_payload, done) {
        let err, user;
        user = await User.findOne({
                where: { id: jwt_payload.user_id }
            })
            .catch(e => {
                console.log("errr : findByUser", e);
            });
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    }));
}