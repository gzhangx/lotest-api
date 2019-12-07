const keys = require('lodash/keys');
const about = require('./controllers/about');
const sender = require('./controllers/sender');
const routes = {
    '/sendSMS': {
        method: 'post',
        func: sender.sendSMS
    },
    '/': {
        method: 'get',
        func: about.version
    }
};

module.exports = {
    route: server=>{
        const rts = keys(routes);
        rts.forEach(url=>{
            const op = routes[url];
            server[op.method](url, op.func);
        });
    }
};