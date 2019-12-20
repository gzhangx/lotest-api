const get = require('lodash/get');
const pick = require('lodash/pick');

function pickUserFields(user) {
    return pick(user, ['id','username','uuid','email','idOnProvider','provider']);
}

function getUser(req) {
    return pickUserFields(get(req,'user'));
}

module.exports = {
    pickUserFields,
    getUser,
};