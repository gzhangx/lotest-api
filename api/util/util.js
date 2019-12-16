const get = require('lodash/get');
const pick = require('lodash/pick');

function getUser(req) {
    return pick(get(req,'user'), ['_id','username','uuid','email','idOnProvider','provider']);
}

module.exports = {
    getUser,
};