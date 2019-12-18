const about = require('../controllers/about');
const sender = require('../controllers/sender');
const customer = require('../controllers/customer');

const routes = {
    '/sendSMS': {
        method: 'post',
        func: sender.sendSMS,
    },
    '/saveCustomer' :{
        method: 'post',
        func: customer.saveCustomer,
    },
    '/loadCustomer' :{
        method: 'get',
        func: customer.loadCustomer,
    },
    '/version': {
        auth: false,
        method: 'get',
        func: about.version,
    },
};

module.exports = {
    routes,
};