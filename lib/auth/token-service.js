const jwt = require('jsonwebtoken-promisified');
const appSecret = process.env.APP_SECRET || 'change-me'; //TODO: change the 'change-me'?

module.exports = {
    sign(user) {
        const payload = {
            id: user._id,
            roles: user.roles //TODO: remove if roles aren't nessary
        };
        return jwt.signAsync(payload, appSecret);
    },
    verify(token) {
        return jwt.verfyAsync(token, appSecret);
    }
};