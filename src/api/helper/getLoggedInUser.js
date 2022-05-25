const { User } = require('../models');
const jwt = require('jsonwebtoken');

exports.getLoggedInUser = async(req) => {
    try {
        if (req.headers && req.headers.authorization) {
            var decoded;
            try {
                decoded = jwt.verify(req.headers.authorization.split(' ')[1], process.env.jwt_encryption);
                let user = await User.findOne({
                    where: { id: decoded.userData.id },
                    attributes: { exclude: ['updatedAt', 'password'] },
                    raw: true
                });
                return user;
            } catch (error) {
                console.log("error:", error);
            }
        }
    } catch (err) {
        return err;
    }
}