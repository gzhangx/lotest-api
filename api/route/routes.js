const about = require('../controllers/about');
const sender = require('../controllers/sender');

const routes = {
    '/sendSMS': {
        auth: true,
        method: 'post',
        func: sender.sendSMS,
    },
    '/version': {
        method: 'get',
        func: about.version,
    },
};

module.exports = {
    routes,
};